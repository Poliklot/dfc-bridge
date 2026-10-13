import { test, expect } from '@playwright/test';

const base = '/dfc-bridge';
const route = 'start/designer-quick-start/';
const groups = {
  ru: ['Начать', 'Подготовить макет', 'Расширенные сценарии', 'Проверка качества', 'Справочник', 'Команда и проект'],
  en: ['Start', 'Prepare a design', 'Advanced topics', 'Quality checks', 'Reference', 'Team and project'],
  zh: ['开始', '准备设计', '进阶主题', '质量检查', '参考资料', '团队与项目'],
};
const menuLabels = { ru: 'Меню', en: 'Menu', zh: '菜单' };

async function expectLocalizedSidebar(page, locale) {
  await expect(page.locator('html')).toHaveAttribute('lang', locale === 'zh' ? 'zh-CN' : locale);
  const sidebar = page.locator('#starlight__sidebar');
  const toggle = page.locator('button[popovertarget="starlight__sidebar"]');
  if (await toggle.isVisible()) {
    await expect(toggle).toHaveAccessibleName(menuLabels[locale]);
    await toggle.click();
    await expect(page.locator('#starlight__sidebar:popover-open')).toBeVisible();
  }
  await expect(sidebar).toBeVisible();
  const headings = sidebar.locator('.top-level > li > details > summary .large');
  // Assert rendered labels, not source dictionaries: locale paths (zh) and
  // Starlight translation language tags (zh-CN) are different contracts.
  await expect(headings).toHaveText(groups[locale]);
  for (const heading of await headings.all()) await expect(heading).toBeVisible();
  await expect(sidebar.locator('[aria-current="page"]')).toHaveAttribute('href', `${base}/${locale}/${route}`);
  const links = await sidebar.locator('.top-level a[href]').evaluateAll((items) => items.map((link) => link.getAttribute('href')));
  expect(links.length).toBeGreaterThan(0);
  expect(links.every((href) => href.startsWith(`${base}/${locale}/`))).toBe(true);
}

for (const locale of Object.keys(groups)) {
  test(`${locale} sidebar has six localized groups and locale-scoped links`, async ({ page }) => {
    await page.goto(`${base}/${locale}/${route}`);
    await expectLocalizedSidebar(page, locale);
    const advanced = page.locator('#starlight__sidebar .top-level > li > details').nth(2);
    await expect(advanced).not.toHaveAttribute('open', '');
    await advanced.locator('summary').click();
    await expect(advanced.locator('a').first()).toBeVisible();
    await advanced.locator('summary').click();
    await expect(advanced.locator('a').first()).toBeHidden();
    const toggle = page.locator('button[popovertarget="starlight__sidebar"]');
    if (await toggle.isVisible()) {
      await page.keyboard.press('Escape');
      await expect(page.locator('#starlight__sidebar')).toBeHidden();
      await expect(toggle).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('#starlight__sidebar:popover-open')).toBeVisible();
    }
  });
}

test('language picker keeps the article and updates every sidebar group', async ({ page }) => {
  await page.goto(`${base}/ru/${route}`);
  await expectLocalizedSidebar(page, 'ru');
  for (const locale of ['en', 'zh', 'ru']) {
    // Desktop uses the header picker; narrow screens use the mobile menu.
    const picker = page.locator('bridge-language-select select:visible, starlight-lang-select select:visible');
    await expect(picker).toHaveCount(1);
    await picker.selectOption(`${base}/${locale}/${route}`);
    await expect(page).toHaveURL(new URL(`${base}/${locale}/${route}`, page.url()).href);
    await expectLocalizedSidebar(page, locale);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
});
