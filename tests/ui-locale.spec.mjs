import { test, expect } from '@playwright/test';

const base = '/dfc-bridge';
const labels = {
  ru: { copy: 'Копировать', copied: 'Скопировано!', anchor: 'Заголовок раздела «', stars: 'Звёзды на GitHub', badge: 'Звёзды' },
  en: { copy: 'Copy to clipboard', copied: 'Copied!', anchor: 'Section titled “', stars: 'GitHub stars', badge: 'Stars' },
  zh: { copy: '复制到剪贴板', copied: '复制成功！', anchor: '标题为“', stars: 'GitHub 星标', badge: '星标' },
};

for (const [locale, expected] of Object.entries(labels)) {
  test(`${locale} code controls and heading links use the page language`, async ({ page }) => {
    await page.goto(`${base}/${locale}/start/designer-quick-start/`);
    const copyButtons = page.locator('.expressive-code .copy button');
    expect(await copyButtons.count()).toBeGreaterThan(0);
    for (const button of await copyButtons.all()) {
      await expect(button).toHaveAttribute('title', expected.copy);
      await expect(button).toHaveAttribute('data-copied', expected.copied);
    }
    const anchorLabels = await page.locator('.sl-heading-wrapper .sl-anchor-link .sr-only').allTextContents();
    expect(anchorLabels.length).toBeGreaterThan(0);
    expect(anchorLabels.every((label) => label.startsWith(expected.anchor))).toBe(true);
  });

  test(`${locale} shared social labels stay localized on docs and custom routes`, async ({ page }) => {
    for (const route of ['', 'start/designer-quick-start/', 'rules/', 'tags/', 'check/']) {
      await page.goto(`${base}/${locale}/${route}`);
      const badges = page.locator('.bridge-github-stars-link');
      expect(await badges.count()).toBeGreaterThan(0);
      // Both the header and native mobile-sidebar copy need the same label.
      for (const stars of await badges.all()) {
        await expect(stars).toHaveAttribute('aria-label', expected.stars);
        await expect(stars.locator('img')).toHaveAttribute('alt', expected.stars);
        const badgeUrl = new URL(await stars.locator('img').getAttribute('src'));
        expect(badgeUrl.searchParams.get('label')).toBe(expected.badge);
      }
    }
  });
}
