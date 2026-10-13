import { test, expect } from '@playwright/test';

const base = '/dfc-bridge';
const copy = {
  ru: {
    lang: 'ru', title: 'Страница не найдена · DFC Bridge', eyebrow: '404 · путь не найден',
    heading: 'Здесь нет страницы.',
    description: 'Адрес мог измениться. Вернитесь к карте DFC Bridge и продолжите с нужной задачи.',
    action: 'Открыть DFC Bridge', footer: 'Страница не найдена · Вернуться к документации DFC Bridge.',
    languages: 'Выбрать язык',
  },
  en: {
    lang: 'en', title: 'Page not found · DFC Bridge', eyebrow: '404 · path not found',
    heading: 'There is no page here.',
    description: 'The address may have changed. Return to the DFC Bridge overview and choose your next task.',
    action: 'Open DFC Bridge', footer: 'Page not found · Return to the DFC Bridge documentation.',
    languages: 'Choose a language',
  },
  zh: {
    lang: 'zh-CN', title: '页面未找到 · DFC Bridge', eyebrow: '404 · 路径未找到',
    heading: '这里没有页面。',
    description: '地址可能已更改。请返回 DFC Bridge 概览，选择要继续的任务。',
    action: '打开 DFC Bridge', footer: '页面未找到 · 返回 DFC Bridge 文档。',
    languages: '选择语言',
  },
};

async function expectNotFound(page, locale) {
  const expected = copy[locale];
  await expect(page.locator('html')).toHaveAttribute('lang', expected.lang);
  await expect(page).toHaveTitle(expected.title);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText(expected.heading);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('section > p').first()).toHaveText(expected.eyebrow);
  await expect(page.locator('section > p').last()).toHaveText(expected.description);
  const home = page.locator('section > a');
  await expect(home).toContainText(expected.action);
  await expect(home).toHaveAttribute('href', `${base}/${locale}/`);
  await expect(page.locator('footer > p')).toHaveText(expected.footer);
  await expect(page.locator('footer nav')).toHaveAttribute('aria-label', expected.languages);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://poliklot.github.io${base}/404.html`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
}

for (const locale of Object.keys(copy)) {
  test(`${locale} missing page localizes all error copy and returns to its home`, async ({ page }) => {
    const response = await page.goto(`${base}/${locale}/missing-localization-test/`);
    expect(response.status()).toBe(404);
    await expectNotFound(page, locale);
    const home = page.locator('section > a');
    await home.focus();
    await expect(home).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new URL(`${base}/${locale}/`, page.url()).href);
    await expect(page.locator('h1#_top')).toBeVisible();
  });
}

test('unlocalized paths and explicit 404 keep a safe Russian default', async ({ page }) => {
  for (const route of [
    `${base}/404.html`,
    `${base}/missing/?locale=zh#/en/`,
    `${base}/guide/zh/missing/`,
    `${base}/zh-CN/missing/`,
    `${base}/english/missing/`,
    '/zh/missing-outside-site-base/',
  ]) {
    const response = await page.goto(route);
    expect(response.status()).toBe(route.endsWith('404.html') ? 200 : 404);
    await expectNotFound(page, 'ru');
  }
});

test.describe('404 without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('static fallback stays readable and offers all three language homes', async ({ page }) => {
    const response = await page.goto(`${base}/zh/missing-no-script-test/`);
    expect(response.status()).toBe(404);
    // GitHub Pages serves a single static 404 document for every missing URL.
    // Without JS it cannot infer the route, so all locales remain reachable.
    await expectNotFound(page, 'ru');
    const links = page.locator('footer nav a');
    await expect(links).toHaveCount(3);
    await expect(links).toHaveText(['Русский', 'English', '中文']);
    for (const locale of Object.keys(copy)) {
      const link = links.filter({ hasText: { ru: 'Русский', en: 'English', zh: '中文' }[locale] });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `${base}/${locale}/`);
      await expect(link).toHaveAttribute('lang', copy[locale].lang);
      await expect(link).toHaveAttribute('hreflang', copy[locale].lang);
    }
    await links.last().click();
    await expect(page).toHaveURL(new URL(`${base}/zh/`, page.url()).href);
    await expect(page.locator('h1#_top')).toBeVisible();
  });
});
