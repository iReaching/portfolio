import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('project discovery, filters and case study links work', async ({
  page,
}) => {
  await page.goto('/portfolio/');
  await expect(page.locator('h1')).toContainText('Practical software.');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await page
    .getByRole('button', { name: 'Game development', exact: true })
    .click();
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await expect(page.getByRole('status').first()).toContainText('1 project');
  await page.getByRole('button', { name: 'All projects', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(3);
  await page
    .getByRole('heading', { name: 'CondoLink', exact: true })
    .getByRole('link')
    .click();
  await expect(page).toHaveURL(/projects\/condolink\//);
  await expect(page.locator('h1')).toHaveText('CondoLink');
  await expect(page.locator('a[href*="condolink.click"]')).toHaveCount(0);
});
test('booking illustration validates conflicts and supports staff review/reset', async ({
  page,
}) => {
  await page.goto('/portfolio/projects/condolink/');
  await page.locator('#booking-demo > summary').click();
  await page
    .getByRole('button', { name: 'Request booking', exact: true })
    .click();
  await expect(page.locator('#booking-status')).toContainText('submitted');
  await page
    .getByRole('button', { name: 'Request booking', exact: true })
    .click();
  await expect(page.locator('#booking-status')).toContainText('already has');
  await page.getByRole('radio', { name: 'Staff', exact: true }).check();
  await expect(
    page.getByRole('button', { name: 'Request booking', exact: true }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Approve booking for' }).click();
  await expect(page.locator('#booking-requests')).toContainText('Approved');
  await page.getByRole('button', { name: 'Reset sample', exact: true }).click();
  await expect(page.locator('#booking-requests')).toContainText(
    'No requests yet',
  );
});
test('mobile navigation supports keyboard dismissal and usable links', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/portfolio/');
  await page.locator('#navigation > summary').click();
  await expect(page.locator('#navigation')).toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  await expect(page.locator('#navigation')).not.toHaveAttribute('open');
  await expect(page.locator('#navigation > summary')).toBeFocused();
  await page.locator('#navigation > summary').click();
  await page.locator('[data-section="experience"]').click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator('#navigation')).not.toHaveAttribute('open');
});
test('theme choice persists, system changes apply, and pages pass accessibility checks', async ({
  page,
}) => {
  await page.goto('/portfolio/');
  for (const theme of ['light', 'dark']) {
    await page.getByLabel('Color theme', { exact: true }).selectOption(theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  await page.getByLabel('Color theme', { exact: true }).selectOption('system');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
test('résumé and case studies have accessible content and metadata', async ({
  page,
}) => {
  for (const route of [
    'resume/',
    'projects/condolink/',
    'projects/portfolio-website/',
    'projects/slimeout/',
  ]) {
    await page.goto('/portfolio/' + route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://ireaching.github.io/portfolio/' + route,
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
});
test('layouts fit narrow phones, tablets and desktop without clipping content', async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ['', 'resume/', 'projects/condolink/']) {
      await page.goto('/portfolio/' + path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      expect(overflow, path + ' overflows at ' + width).toBe(false);
    }
  }
});
test('core content, navigation and résumé remain usable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto('/portfolio/');
  await expect(page.locator('#navigation-links')).toBeVisible();
  await expect(page.locator('.project-card:visible')).toHaveCount(3);
  await expect(page.locator('#project-filters')).toBeHidden();
  await page.locator('#navigation-links a', { hasText: 'Résumé' }).click();
  await expect(page.locator('h1')).toHaveText('Andrei Rosca');
  await context.close();
});
test('reduced motion keeps content visible and video stays opt-in', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/portfolio/');
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
  await expect(page.locator('#demo-reel-video')).toHaveAttribute(
    'preload',
    'none',
  );
  expect(
    await page
      .locator('#demo-reel-video')
      .evaluate((video: HTMLVideoElement) => video.paused),
  ).toBe(true);
  await expect(page.locator('#demo-reel-video')).not.toHaveAttribute(
    'autoplay',
  );
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
});

for (const denied of [false, true]) {
  test(`copy email ${denied ? 'announces a permission failure' : 'confirms the copied address'}`, async ({
    page,
  }) => {
    await page.addInitScript((deny) => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (value: string) => {
            if (deny) throw new Error('Permission denied');
            (window as unknown as { copiedEmail: string }).copiedEmail = value;
          },
        },
      });
    }, denied);
    await page.goto('/portfolio/');
    await page
      .getByRole('button', { name: 'Copy email address', exact: true })
      .click();
    await expect(page.locator('#copy-status')).toContainText(
      denied ? 'Copy unavailable' : 'Email address copied',
    );
    if (!denied)
      expect(
        await page.evaluate(
          () => (window as unknown as { copiedEmail: string }).copiedEmail,
        ),
      ).toBe('09roscaandrei@gmail.com');
  });
}
