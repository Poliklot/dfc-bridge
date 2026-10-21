import { test, expect } from '@playwright/test';
import { parseHandoff } from '../validator/handoff.mjs';

for (const [locale, heading] of [
  ['en', 'Saved developer snapshot (0.10.0 candidate)'],
  ['ru', 'Сохранённый снимок для разработчика (кандидат 0.10.0)'],
  ['zh', '保存给开发者的快照（0.10.0 候选版）'],
]) {
  test(`${locale}: saved-snapshot instructions expose the contract without claiming runtime approval`, async ({ page, request }) => {
    await page.goto(`/dfc-bridge/${locale}/reference/transfer-contract/`);
    await page.getByRole('heading', { name: heading, exact: true }).scrollIntoViewIfNeeded();
    await expect(page.locator('main')).toContainText('node bin/dfc-bridge.mjs check snapshot.json');
    await expect(page.locator('main')).toContainText('not-checked');
    await expect(page.locator('main')).toContainText('partial');
    const schemaLink = page.locator('main a[href$="handoff.schema.json"]');
    const schema = await request.get(await schemaLink.getAttribute('href'));
    expect(schema.ok()).toBe(true);
    expect((await schema.json()).properties.format.const).toBe('dfc-bridge-handoff');
    const example = await request.get(await page.locator('main a[href$="handoff.valid.json"]').getAttribute('href'));
    expect(example.ok()).toBe(true);
    expect((await parseHandoff(await example.text())).scope.completeness).toBe('full');
    await expect(page.locator('main')).toContainText('node bin/dfc-bridge.mjs components snapshot.json --expect State=Focus');
    const components = await request.get(await page.locator('main a[href$="handoff-components.valid.json"]').getAttribute('href'));
    expect(components.ok()).toBe(true);
    const saved = await parseHandoff(await components.text());
    expect(saved.schemaVersion).toBe(2);
    expect(saved.componentInspection.families[0].variants).toHaveLength(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
