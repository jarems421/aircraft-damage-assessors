/* eslint-disable @typescript-eslint/no-require-imports */
// Verifies the enquiry pipeline end to end without sending real email.
// Starts its own production server pointed at a local stand-in for the Resend API, then checks
// validation, spam and rate limits, attachments, both emails, the no-JavaScript path and the browser flow.
// Run after `npm run build`: npm run test:enquiry
const http = require('node:http');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const puppeteer = require('puppeteer-core');

const MOCK_PORT = 3999, SITE_PORT = 3003, SITE = `http://localhost:${SITE_PORT}`;
const sent = [];

function crc32(buffer) {
  let crc = ~0;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}
/** A PNG of random pixels, so it stays large after compression and exercises the browser downscaling. */
function makePng(width, height) {
  const stride = 1 + width * 3;
  const raw = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) crypto.randomFillSync(raw, y * stride + 1, width * 3);
  const chunk = (type, data) => {
    const length = Buffer.alloc(4); length.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
    return Buffer.concat([length, body, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0)),
  ]);
}
function enquiryBody(overrides = {}, files = []) {
  const form = new FormData();
  const fields = { fullName: 'Test Enquirer', email: 'enquirer@example.com', serviceRequired: 'damage-assessment', aircraftType: 'Cessna 172', aircraftRegistration: '5Y-TST', aircraftLocation: 'Naivasha', incidentDescription: 'Damage to the wing after a heavy landing; please advise on assessment.', ...overrides };
  for (const [key, value] of Object.entries(fields)) if (value !== null) form.append(key, value);
  form.append('damageArea', 'wing');
  form.append('damageArea', 'gear');
  for (const file of files) form.append('photos', new Blob([file.data], { type: file.type }), file.name);
  return form;
}
const post = (form, { ip = 'test', accept = 'application/json' } = {}) =>
  fetch(`${SITE}/api/enquiry`, { method: 'POST', body: form, redirect: 'manual', headers: { Accept: accept, 'x-forwarded-for': ip } });

(async () => {
  const mock = http.createServer((request, response) => {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      sent.push({ auth: request.headers.authorization, ...JSON.parse(body) });
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ id: `mock-${sent.length}` }));
    });
  });
  await new Promise(resolve => mock.listen(MOCK_PORT, resolve));

  // stdio is discarded: an unread pipe fills up and stalls the server.
  const server = spawn(`npx next start -p ${SITE_PORT}`, {
    shell: true,
    stdio: 'ignore',
    env: { ...process.env, RESEND_API_KEY: 'test-key', RESEND_API_BASE: `http://localhost:${MOCK_PORT}`, ENQUIRY_TO: 'company@example.com', ENQUIRY_FROM: 'enquiries@example.com' },
  });
  let browser;
  try {
    for (let i = 0; i < 40; i++) {
      try { if ((await fetch(SITE)).ok) break; } catch { await new Promise(resolve => setTimeout(resolve, 500)); }
    }

    let response = await post(enquiryBody({ incidentDescription: 'short' }), { ip: 'a' });
    assert.equal(response.status, 400, 'Short description rejected');
    response = await post(enquiryBody({ email: 'not-an-email' }), { ip: 'b' });
    assert.equal(response.status, 400, 'Invalid email rejected');
    response = await post(enquiryBody({ serviceRequired: 'made-up-service' }), { ip: 'c' });
    assert.equal(response.status, 400, 'Unknown service rejected');
    response = await post(enquiryBody({ companyWebsite: 'https://spam.example' }), { ip: 'd' });
    assert.equal(response.status, 400, 'Honeypot rejected');
    response = await post(enquiryBody({}, [{ name: 'notes.txt', type: 'text/plain', data: Buffer.from('hello') }]), { ip: 'e' });
    assert.equal(response.status, 400, 'Unsupported file type rejected');
    response = await post(enquiryBody({}, [{ name: 'huge.png', type: 'image/png', data: Buffer.alloc(3.5 * 1024 * 1024) }]), { ip: 'f' });
    assert.equal(response.status, 400, 'Oversized file rejected');
    assert.equal(sent.length, 0, 'Rejected enquiries send no email');
    console.log('PASS validation, honeypot, file type and size limits');

    const photo = makePng(160, 160);
    response = await post(enquiryBody({}, [{ name: 'damage photo.png', type: 'image/png', data: photo }]), { ip: 'g' });
    const result = await response.json();
    assert.equal(response.status, 200, 'Valid enquiry accepted');
    assert.equal(result.ok, true);
    assert.equal(sent.length, 2, 'Company email and confirmation sent');
    const [company, confirmation] = sent;
    assert.equal(company.auth, 'Bearer test-key');
    assert.deepEqual(company.to, ['company@example.com']);
    assert.equal(company.reply_to, 'enquirer@example.com');
    assert.match(company.subject, /Aircraft damage assessment — Test Enquirer/);
    assert.match(company.text, /Wings, Landing gear/);
    assert.match(company.text, /5Y-TST/);
    assert.equal(company.attachments.length, 1);
    assert.equal(company.attachments[0].filename, 'damage-photo.png', 'Attachment name is sanitised');
    assert.equal(Buffer.from(company.attachments[0].content, 'base64').equals(photo), true, 'Attachment arrives intact');
    assert.deepEqual(confirmation.to, ['enquirer@example.com']);
    assert.equal(confirmation.reply_to, 'company@example.com');
    assert.equal(confirmation.attachments, undefined, 'Confirmation carries no attachments');
    assert.match(confirmation.text, /received your enquiry/);
    console.log('PASS enquiry email with attachment, and visitor confirmation');

    sent.length = 0;
    response = await post(enquiryBody(), { ip: 'h', accept: 'text/html' });
    assert.equal(response.status, 303, 'Browsers without JavaScript are redirected');
    assert.match(response.headers.get('location'), /\/contact\?sent=1/);
    assert.equal(sent.length, 2);
    console.log('PASS no-JavaScript form post and redirect');

    sent.length = 0;
    for (let i = 0; i < 3; i++) assert.equal((await post(enquiryBody(), { ip: 'flood' })).status, 200);
    assert.equal((await post(enquiryBody(), { ip: 'flood' })).status, 429, 'Fourth enquiry rate limited');
    assert.equal(sent.length, 6, 'Rate limited enquiry sends no email');
    console.log('PASS rate limiting');

    sent.length = 0;
    browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-unsafe-swiftshader'] });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(`${SITE}/contact?service=aircraft-recovery&area=tail`, { waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('#serviceRequired', el => el.value), 'aircraft-recovery');
    assert.equal(await page.$eval('#damageArea-tail', el => el.checked), true);
    await page.type('#fullName', 'Browser Test');
    await page.type('#email', 'browser@example.com');
    await page.type('#incidentDescription', 'Tail damage after a ground handling incident. Please advise.');
    const large = makePng(900, 900);
    require('node:fs').writeFileSync('screenshots/large-photo.png', large);
    await (await page.$('#photos')).uploadFile('screenshots/large-photo.png');
    await page.waitForSelector('.file-list li');
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector('.form-sent', { timeout: 20000 });
    await page.screenshot({ path: 'screenshots/enquiry-sent.png', fullPage: true });
    assert.equal(sent.length, 2, 'Browser submission sends both emails');
    const attachment = Buffer.from(sent[0].attachments[0].content, 'base64');
    assert.ok(attachment.length < large.length / 2, `Large photo downscaled in the browser (${large.length} -> ${attachment.length} bytes)`);
    assert.equal(sent[0].attachments[0].filename.endsWith('.jpg'), true, 'Downscaled photo sent as JPEG');
    assert.match(sent[0].text, /Tail/);
    assert.deepEqual(errors, [], 'Browser errors');
    console.log('PASS browser submission, photo downscaling and sent confirmation');
  } finally {
    if (browser) await browser.close();
    // `npx` starts the server in a child process, so kill the whole tree on Windows.
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' });
    else server.kill();
    mock.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
