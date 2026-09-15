/* eslint-disable @typescript-eslint/no-require-imports */
// Regenerates the still aircraft image shown before the 3D view loads (and on small screens until tapped).
// Run against a production server after changing the model or its default camera angle.
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-unsafe-swiftshader'] });
  const base = process.env.AIRCRAFT_TEST_URL || 'http://localhost:3002';
  try {
    const page = await browser.newPage();
    // 768px loads the 3D view automatically and gives a single-column hero with a wide viewport.
    await page.setViewport({ width: 768, height: 1000, deviceScaleFactor: 2 });
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.locator('[data-status]').scroll();
    await page.waitForSelector('[data-status="ready"]', { timeout: 30000 });
    // Transparent background, no markers or overlay: the page supplies its own gradient behind the still.
    await page.addStyleTag({ content: 'html,body,section,[data-status]{background:transparent!important} [data-status]>button,[data-status]>div{visibility:hidden!important}' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await page.$('[data-status]');
    await element.screenshot({ path: 'src/components/aircraft/aircraft-still.webp', type: 'webp', quality: 86, omitBackground: true });
    console.log('Saved src/components/aircraft/aircraft-still.webp');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
