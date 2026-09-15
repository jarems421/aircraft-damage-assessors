/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const viewports = [
  { name: '1440_desktop', width: 1440, height: 900 },
  { name: '1024_laptop', width: 1024, height: 768 },
  { name: '768_tablet', width: 768, height: 1024 },
  { name: '390_mobile', width: 390, height: 844 },
];

const pages = [
  { path: '/', name: 'home' },
  { path: '/damage-assessment', name: 'damage_assessment' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
];

async function capture() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Listen to console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  for (const vp of viewports) {
    console.log(`Setting viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await page.setViewport({ width: vp.width, height: vp.height });

    for (const p of pages) {
      const url = `http://localhost:3001${p.path}`;
      console.log(`Navigating to ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle0' });

      const filename = `${p.name}_${vp.name}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);
      await page.screenshot({ path: filepath, fullPage: vp.name === '1440_desktop' });
      console.log(`Captured: ${filename}`);
    }
  }

  // Mobile Menu interaction test on 390px
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
  const menuButton = await page.$('button[aria-label*="navigation menu"]');
  if (menuButton) {
    console.log('Clicking mobile hamburger menu...');
    await menuButton.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_menu_open.png') });
    console.log('Captured: mobile_menu_open.png');
  }

  // Contact form submission test on 1440px
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/contact', { waitUntil: 'networkidle0' });
  await page.type('#fullName', 'Captain John Miller');
  await page.type('#companyName', 'Aviation Underwriting Syndicate');
  await page.type('#email', 'j.miller@aviationunderwriters.com');
  await page.type('#telephone', '+44 20 7946 0912');
  await page.type('#aircraftType', 'King Air 350');
  await page.type('#aircraftRegistration', 'G-JMLS');
  await page.type('#aircraftLocation', 'Farnborough Airport (EGLF), Hangar 2');
  await page.type('#incidentDate', '2026-09-14');
  await page.type('#insurerOrBroker', 'Lloyds Broker Syndicate');
  await page.type('#incidentDescription', 'Runway excursion resulting in nose gear collapse and lower fuselage skin deformation.');
  
  const submitButton = await page.$('button[type="submit"]');
  if (submitButton) {
    console.log('Submitting contact form...');
    await submitButton.click();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'contact_form_submitted.png') });
    console.log('Captured: contact_form_submitted.png');
  }

  await browser.close();
  console.log('Visual QA capture complete. All screenshots saved to:', OUTPUT_DIR);
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
