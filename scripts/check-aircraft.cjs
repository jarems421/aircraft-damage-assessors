/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require('puppeteer-core');
const fs = require('node:fs');
const assert = require('node:assert/strict');

const settle = () => new Promise(resolve => setTimeout(resolve, 700));
const ready = async page => {
  await page.locator('[data-status]').scroll();
  // Data-saver connections show a still image until "View in 3D" is pressed.
  const load = await page.$('::-p-text(View in 3D)');
  if (load) await load.click();
  await page.waitForSelector('[data-status="ready"]', { timeout: 30000 });
  // Centre the model as a visitor would, so markers near its lower edge are not behind the
  // phone-width contact bar fixed to the bottom of the screen.
  await page.$eval('[data-status]', el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
};
const noOverflow = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
const pressed = (page, label) => page.$eval(`button[aria-label="Select ${label}"]`, el => el.getAttribute('aria-pressed'));
const checkedAreas = page => page.$$eval('input[name="area"]:checked', els => els.map(el => el.value));
// Element-handle clicks rather than locators: locators poll inside the page and stall when JavaScript is disabled.
const click = async (page, selector) => { const handle = await page.waitForSelector(selector); await handle.click(); };
const submitTo = async (page, selector) => { await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }), click(page, selector)]); return new URL(page.url()); };
const markerLeft = page => page.$eval('button[aria-label="Select Nose & propeller"]', el => parseFloat(el.style.left));

(async () => {
  fs.mkdirSync('screenshots/aircraft', { recursive: true });
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-unsafe-swiftshader'] });
  const base = process.env.AIRCRAFT_TEST_URL || 'http://localhost:3002';
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    for (const width of [1440, 1024, 768, 390]) {
      await page.setViewport({ width, height: 1000, isMobile: width === 390, hasTouch: width === 390 });
      await page.goto(base, { waitUntil: 'networkidle0' });
      if (width === 390) {
        await page.locator('[data-status]').scroll();
        await page.waitForSelector('[data-status="ready"]', { timeout: 30000 });
        assert.equal(await page.$('::-p-text(View in 3D)'), null, 'Phones load the 3D view without a tap');
      }
      await ready(page);
      if (width === 1440) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: 'screenshots/aircraft/hero-desktop.png' });
      }
      assert.equal(await noOverflow(page), true, `Home overflow at ${width}`);
      await page.locator('button[aria-label="Select Landing gear"]').click();
      await page.locator('button[aria-label="Select Tail"]').click();
      assert.deepEqual(await checkedAreas(page), ['gear', 'tail'], 'Markers select multiple areas');
      await page.locator('button[aria-label="Select Landing gear"]').click();
      assert.deepEqual(await checkedAreas(page), ['tail'], 'A second marker press deselects');
      await click(page, 'label:has(input[name="area"][value="wing"])');
      assert.equal(await pressed(page, 'Wings'), 'true', 'Checkbox updates marker');
      assert.equal(await pressed(page, 'Tail'), 'true');
      if (width === 1440) {
        const viewport = await page.$('[data-status]');
        const hideMarkers = await page.addStyleTag({ content: '[data-status] > button { visibility: hidden !important; }' });
        await settle();
        const highlighted = await viewport.screenshot({ path: 'screenshots/aircraft/highlight.png' });
        await click(page, 'label:has(input[name="area"][value="wing"])');
        await click(page, 'label:has(input[name="area"][value="tail"])');
        await settle();
        const plain = await viewport.screenshot();
        assert.equal(Buffer.from(highlighted).equals(Buffer.from(plain)), false, 'Selected areas tint the model');
        await hideMarkers.evaluate(el => el.remove());
      }

      await page.locator('button[aria-label="Toggle view from above"]').click(); await settle();
      if (width === 1440) await (await page.$('[data-status]')).screenshot({ path: 'screenshots/aircraft/aircraft-top.png' });
      await page.locator('button[aria-label="Reset view"]').click(); await settle();
      if (width === 1440) {
        for (let i = 0; i < 4; i++) await page.locator('button[aria-label="Rotate right"]').click();
        await settle();
        await (await page.$('[data-status]')).screenshot({ path: 'screenshots/aircraft/aircraft-side.png' });
        await page.locator('button[aria-label="Reset view"]').click(); await settle();
      }
      const canvas = await page.$('[data-status] canvas');
      await canvas.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      if (width === 1440) await (await page.$('[data-status]')).screenshot({ path: 'screenshots/aircraft/drag-before.png' });
      const before = await markerLeft(page);
      const box = await canvas.boundingBox();
      if (width === 390) {
        const client = await page.createCDPSession();
        const touch = { x: box.x + box.width / 2, y: box.y + box.height * .75 };
        await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touch] });
        for (let step = 1; step <= 8; step++) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...touch, x: touch.x + step * 8 }] });
        await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await client.detach();
      } else {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height * .75);
        await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 + 90, box.y + box.height * .75, { steps: 10 }); await page.mouse.up();
      }
      await settle();
      if (width === 1440) await (await page.$('[data-status]')).screenshot({ path: 'screenshots/aircraft/drag-after.png' });
      assert.ok(Math.abs(before - await markerLeft(page)) > 2, 'Drag should rotate the aircraft');
      await page.locator('button[aria-label="Reset view"]').click(); await settle();
      await (await page.$('form[aria-label="Aircraft damage areas"]')).screenshot({ path: `screenshots/aircraft/explorer-${width}.png` });

      await page.goto(base + '/damage-assessment', { waitUntil: 'networkidle0' });
      await ready(page);
      assert.equal(await noOverflow(page), true, `Damage assessment overflow at ${width}`);
      await page.locator('button[aria-label="Select Cabin & fuselage"]').click();
      await click(page, 'label:has(input[value="wing"])');
      assert.deepEqual(await checkedAreas(page), ['cabin', 'wing']);
      assert.equal(await pressed(page, 'Wings'), 'true', 'List updates markers');
      await settle();
      await (await page.$('.damage-locator')).screenshot({ path: `screenshots/aircraft/locator-${width}.png` });
      console.log(`PASS ${width}: multi-select markers/checkboxes, controls, drag, both explorers`);
    }
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(base + '/damage-assessment', { waitUntil: 'networkidle0' });
    await ready(page);
    await page.locator('button[aria-label="Select Landing gear"]').click();
    await page.locator('button[aria-label="Select Tail"]').click();
    const url = await submitTo(page, '.damage-locator button[type="submit"]');
    assert.equal(url.pathname, '/contact');
    assert.deepEqual(url.searchParams.getAll('area'), ['gear', 'tail']);
    assert.deepEqual(await page.$$eval('input[name="damageArea"]:checked', els => els.map(el => el.value)), ['gear', 'tail']);
    assert.equal(await page.$eval('#serviceRequired', el => el.value), 'damage-assessment');
    console.log('PASS multiple damage areas carried into the enquiry form');

    /**
     * The propeller belongs to the damage assessment model; the homepage hero leaves it still so the
     * drifting sky carries the movement. Comparing frames after the camera has settled isolates the
     * blades: any remaining change is the propeller, and no change means nothing is animating.
     */
    const stillAfterCamera = async page => {
      const view = await page.$('[data-status]');
      const hideMarkers = await page.addStyleTag({ content: '[data-status] > button { visibility: hidden !important; }' });
      await click(page, 'button[aria-label="Rotate right"]');
      await new Promise(resolve => setTimeout(resolve, 450));
      const first = await view.screenshot();
      await new Promise(resolve => setTimeout(resolve, 90));
      const second = await view.screenshot();
      await hideMarkers.evaluate(el => el.remove());
      return Buffer.from(first).equals(Buffer.from(second));
    };
    await page.goto(base + '/damage-assessment', { waitUntil: 'networkidle0' });
    await ready(page);
    assert.equal(await stillAfterCamera(page), false, 'Propeller keeps turning after the camera settles');
    await settle(); await settle();
    const view = await page.$('[data-status]');
    const resting = await view.screenshot();
    await new Promise(resolve => setTimeout(resolve, 400));
    assert.equal(Buffer.from(resting).equals(Buffer.from(await view.screenshot())), true, 'Scene stops rendering once the blades wind down');
    // Choosing a damage area also turns the blades. The tint it applies is static, so any change
    // between two frames taken afterwards is the propeller rather than the highlight.
    await page.goto(base + '/damage-assessment', { waitUntil: 'networkidle0' });
    await ready(page);
    const hidden = await page.addStyleTag({ content: '[data-status] > button { visibility: hidden !important; }' });
    await click(page, 'label:has(input[name="area"][value="wing"])');
    await new Promise(resolve => setTimeout(resolve, 260));
    const afterPick = await (await page.$('[data-status]')).screenshot();
    await new Promise(resolve => setTimeout(resolve, 90));
    assert.equal(Buffer.from(afterPick).equals(Buffer.from(await (await page.$('[data-status]')).screenshot())), false, 'Choosing an area turns the blades');
    await hidden.evaluate(el => el.remove());

    await page.goto(base, { waitUntil: 'networkidle0' });
    await ready(page);
    assert.equal(await stillAfterCamera(page), true, 'The homepage model has no propeller spin');
    console.log('PASS propeller turns on the damage assessment model only, and everything settles to a stop');

    await page.goto(base, { waitUntil: 'networkidle0' });
    await ready(page);
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.focus('button[aria-label="Rotate right"]'); await page.keyboard.press('Enter');
    await page.$eval('[data-status] canvas', canvas => canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
    await page.waitForSelector('[data-status="fallback"]');
    assert.match(await page.$eval('[role="status"] p', el => el.textContent), /unavailable/);
    await click(page, 'label:has(input[name="area"][value="nose"])');
    await page.locator('[role="status"] button').click();
    await page.waitForSelector('[data-status="ready"]');
    assert.equal(await pressed(page, 'Nose & propeller'), 'true', 'Selection survives retry');
    console.log('PASS reduced motion, keyboard, context loss, fallback selection, retry');

    const noWebGL = await browser.newPage();
    await noWebGL.evaluateOnNewDocument(() => { HTMLCanvasElement.prototype.getContext = function() { return null; }; });
    await noWebGL.goto(base + '/damage-assessment', { waitUntil: 'networkidle0' });
    await noWebGL.locator('[data-status]').scroll();
    await noWebGL.waitForSelector('[data-status="fallback"]');
    await click(noWebGL, 'label:has(input[value="tail"])');
    assert.deepEqual(await checkedAreas(noWebGL), ['tail']);
    console.log('PASS unavailable WebGL fallback');

    const noJS = await browser.newPage();
    await noJS.setJavaScriptEnabled(false);
    await noJS.goto(base, { waitUntil: 'networkidle0' });
    assert.ok(await noJS.$('[data-status] img'), 'Still image is in server-rendered HTML');
    await click(noJS, 'label:has(input[name="area"][value="cabin"])');
    await click(noJS, 'label:has(input[name="area"][value="wing"])');
    let noJsUrl = await submitTo(noJS, 'form[aria-label="Aircraft damage areas"] button[type="submit"]');
    assert.deepEqual(noJsUrl.searchParams.getAll('area'), ['cabin', 'wing']);
    assert.deepEqual(await noJS.$$eval('input[name="damageArea"]:checked', els => els.map(el => el.value)), ['cabin', 'wing']);
    await noJS.goto(base + '/damage-assessment', { waitUntil: 'networkidle0' });
    await click(noJS, 'label:has(input[value="tail"])');
    noJsUrl = await submitTo(noJS, '.damage-locator button[type="submit"]');
    assert.deepEqual(noJsUrl.searchParams.getAll('area'), ['tail']);
    console.log('PASS no-JavaScript multi-area selection on both pages');
    assert.deepEqual(errors, [], 'Browser errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
