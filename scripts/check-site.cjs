/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require('puppeteer-core');
const fs = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-unsafe-swiftshader'] });
  const base = process.env.AIRCRAFT_TEST_URL || 'http://localhost:3002';
  const routes = ['/', '/about', '/damage-assessment', '/services', '/contact', '/privacy', '/terms', '/cookies'];
  fs.mkdirSync('screenshots/redesign', { recursive: true });
  const errors = [];
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const titles = new Set();
    for (const width of [1440, 1024, 768, 390]) {
      await page.setViewport({ width, height: 1000, isMobile: width === 390, hasTouch: width === 390 });
      for (const route of routes) {
        const response = await page.goto(base + route, { waitUntil: 'networkidle0' });
        assert.equal(response.status(), 200, route);
        if (route === '/') {
          await page.locator('[data-status]').scroll();
          const load = await page.$('::-p-text(View in 3D)');
          if (load) await load.click();
          await page.waitForSelector('[data-status="ready"]');
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        }
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${route}: overflow at ${width}`);
        assert.equal(await page.$$eval('h1', elements => elements.length), 1, `${route}: single h1`);
        assert.ok(await page.$eval('meta[name="description"]', element => element.content.length > 20));
        assert.ok(await page.$('meta[property="og:title"]'));
        if (width === 1440) titles.add(await page.title());
        const copy = await page.$eval('body', element => element.innerText);
        assert.doesNotMatch(copy, /independent|structural condition|structural survey|line.item cost|latent damage|repair man.hour/i);
        await page.screenshot({ path: `screenshots/redesign/${route === '/' ? 'home' : route.slice(1)}-${width}.png`, fullPage: true });
      }
      console.log(`PASS all 8 routes at ${width}: rendered, no overflow, metadata, copy`);
    }
    assert.equal(titles.size, routes.length, 'Unique page titles');
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.locator('button[aria-label="Open navigation menu"]').click();
    assert.equal(await page.$eval('#mobile-navigation', element => element.hidden), false);
    await page.focus('#mobile-navigation a'); await page.keyboard.press('Escape');
    assert.equal(await page.$eval('#mobile-navigation', element => element.hidden), true);
    await page.locator('button[aria-label="Open navigation menu"]').click();
    await page.locator('#mobile-navigation a[href="/services"]').click();
    await page.waitForFunction(() => location.pathname === '/services');
    assert.equal(await page.$eval('#mobile-navigation', element => element.hidden), true);
    console.log('PASS mobile navigation, Escape and route selection');
    await page.goto(base + '/contact?service=pre-purchase-inspections', { waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('#serviceRequired', el => el.value), 'pre-purchase-inspections');
    assert.match(await page.$eval('.contact-layout aside h2', el => el.textContent), /pre-purchase inspection/i, 'Heading follows the chosen service');
    await page.goto(base + '/contact?service=aircraft-recovery', { waitUntil: 'networkidle0' });
    assert.match(await page.$eval('.contact-layout aside h2', el => el.textContent), /aircraft recovery/i);
    await page.goto(base + '/contact', { waitUntil: 'networkidle0' });
    assert.match(await page.$eval('.contact-layout aside h2', el => el.textContent), /Request an assessment/, 'Default heading without a service');
    await page.goto(base + '/contact?service=pre-purchase-inspections', { waitUntil: 'networkidle0' });
    const sendingEnabled = await page.$eval('.enquiry-form', form => form.getAttribute('action') === '/api/enquiry');
    if (sendingEnabled) {
      assert.ok(await page.$('#photos'), 'Photo upload field is present when sending is enabled');
      assert.match(await page.$eval('button[type="submit"]', el => el.textContent), /Send enquiry/);
      console.log('PASS service preselection and sending-enabled form configuration');
    } else {
      await page.locator('button[type="submit"]').click();
      assert.equal(await page.$('.form-review'), null, 'Required fields should block preview');
      let outgoing = 0;
      const track = request => { if (request.method() === 'POST') outgoing++; };
      page.on('request', track);
      await page.type('#fullName', 'Preview test');
      await page.type('#email', 'preview@example.com');
      await page.type('#aircraftType', 'Generic light aircraft');
      await page.type('#incidentDescription', 'An enquiry for website testing only.');
      await page.locator('button[type="submit"]').click();
      await page.waitForSelector('.form-review');
      assert.match(await page.$eval('.form-review', el => el.textContent), /Nothing has been sent/);
      assert.equal(outgoing, 0, 'Preview must not send a request');
      await page.type('#fullName', ' amended');
      assert.equal(await page.$('.form-review'), null, 'Editing clears a stale preview');
      console.log('PASS service preselection, validation, enquiry preview and no transmission');
    }
    await page.goto(base + '/contact', { waitUntil: 'networkidle0' });
    assert.ok(await page.$('a[href="mailto:avionicsplus@gmail.com"]'), 'Contact email is published');
    assert.ok(await page.$('a[href="tel:+254713971662"]'), 'Contact telephone is published');
    for (const route of ['/privacy', '/terms', '/cookies']) {
      await page.goto(base + route, { waitUntil: 'networkidle0' });
      assert.ok(await page.$$eval('.legal-doc h2', els => els.length > 3), `${route}: legal sections`);
      assert.match(await page.$eval('.pending-note', el => el.textContent), /Draft for review/, `${route}: draft notice`);
    }
    console.log('PASS published contact details and legal drafts');
    await page.goto(base, { waitUntil: 'networkidle0' });
    assert.equal(await page.$$eval('.hero-facts > div', els => els.length), 3, 'Hero credentials');
    assert.match(await page.$eval('.hero-facts', el => el.innerText), /Qatar[\s\S]*East Africa[\s\S]*five working days/, 'Hero facts match the confirmed information');
    const structured = JSON.parse(await page.$eval('script[type="application/ld+json"]', el => el.textContent));
    assert.equal(structured.name, 'Aircraft Damage Assessors Ltd');
    assert.equal(structured.telephone, '+254713971662');
    assert.equal(structured.areaServed.name, 'East Africa');
    assert.equal(structured.hasOfferCatalog.itemListElement.length, 5, 'All five services described for search engines');
    assert.ok(await page.$('a[href="https://wa.me/254713971662"]'), 'WhatsApp link');
    await page.setViewport({ width: 390, height: 900, isMobile: true, hasTouch: true });
    await page.goto(base, { waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('.mobile-contact-bar', el => getComputedStyle(el).display), 'grid', 'Quick contact bar shows on phones');
    assert.equal(await page.$eval('.mobile-contact-bar a[href^="tel:"]', el => el.getBoundingClientRect().height >= 44), true, 'Touch target size');
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(base, { waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('.mobile-contact-bar', el => getComputedStyle(el).display), 'none', 'Quick contact bar hidden on desktop');
    if (sendingEnabled) {
      await page.goto(base + '/contact', { waitUntil: 'networkidle0' });
      assert.ok(await page.$('.upload-drop input[type="file"]'), 'Styled upload area wraps the file input');
      assert.match(await page.$eval('.upload-drop', el => el.innerText), /Choose photos/);
    }
    console.log('PASS hero credentials, search data, WhatsApp, quick contact bar and upload control');
    await page.goto(base, { waitUntil: 'networkidle0' });
    assert.equal(await page.$$eval('.hero-sky svg', els => els.length), 18, 'Drifting hero planes');
    assert.equal(await page.$eval('.hero-sky', el => el.getAttribute('aria-hidden')), 'true', 'Decoration hidden from screen readers');
    assert.equal(await page.$eval('.hero-sky', el => getComputedStyle(el).pointerEvents), 'none', 'Decoration never blocks clicks');
    await page.waitForFunction(() => document.querySelector('.hero-sky')?.dataset.ready === 'true');
    const restingSky = await page.$eval('.hero-sky svg', el => el.getBoundingClientRect().top);
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
    await new Promise(resolve => setTimeout(resolve, 200));
    const scrolledSky = await page.$eval('.hero-sky svg', el => el.getBoundingClientRect().top);
    assert.notEqual(Math.round(restingSky - scrolledSky), 400, 'Planes drift at their own pace as the page scrolls');
    console.log('PASS hero sky planes: decorative, scroll-driven, out of the way');
    await page.setJavaScriptEnabled(false);
    await page.goto(base + '/contact', { waitUntil: 'networkidle0' });
    if (sendingEnabled) {
      assert.equal(await page.$eval('.enquiry-form', form => form.getAttribute('action')), '/api/enquiry');
      assert.equal(await page.$eval('button[type="submit"]', el => el.disabled), false, 'Form remains submittable without JS');
    } else {
      assert.equal(await page.$eval('button[type="submit"]', el => el.disabled), true, 'Preview is disabled without JS');
    }
    assert.deepEqual(errors, [], 'Browser errors');
    console.log('PASS no-JavaScript form protection; browser console clean');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
