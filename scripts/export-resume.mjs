import { chromium } from '@playwright/test';
const channel =
  process.env.PLAYWRIGHT_CHANNEL ||
  (process.platform === 'win32' ? 'msedge' : undefined);
const browser = await chromium.launch({
  headless: true,
  ...(channel ? { channel } : {}),
});
try {
  const page = await browser.newPage();
  const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4321/portfolio/';
  await page.goto(new URL('resume/', base).href, { waitUntil: 'networkidle' });
  await page.pdf({
    path: 'public/resume.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });
  console.log(
    'Exported public/resume.pdf from the shared HTML résumé. Rebuild to include it in dist.',
  );
} finally {
  await browser.close();
}
