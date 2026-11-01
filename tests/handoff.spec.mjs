import { test, expect } from '@playwright/test';
import { parseHandoff } from '../validator/handoff.mjs';
import { parseContentBindings } from '../validator/content-bindings.mjs';
import { parseVisualTransferRequest, parseVisualPreviewPacket } from '../validator/visual-assets.mjs';

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
    const example = await request.get(await page.locator('main a[href$="handoff.valid.json"]').first().getAttribute('href'));
    expect(example.ok()).toBe(true);
    expect((await parseHandoff(await example.text())).scope.completeness).toBe('full');
    await expect(page.locator('main')).toContainText('node bin/dfc-bridge.mjs components snapshot.json --expect State=Focus');
    const components = await request.get(await page.locator('main a[href$="handoff-components.valid.json"]').first().getAttribute('href'));
    expect(components.ok()).toBe(true);
    const saved = await parseHandoff(await components.text());
    expect(saved.schemaVersion).toBe(2);
    expect(saved.componentInspection.families[0].variants).toHaveLength(2);
    await expect(page.locator('main')).toContainText('node bin/dfc-bridge.mjs content snapshot.json bindings.json');
    const bindings = await request.get(await page.locator('main a[href$="content-bindings.valid.json"]').getAttribute('href'));
    expect(bindings.ok()).toBe(true);
    expect(parseContentBindings(await bindings.text(), saved.revision).groups[0].sources).toHaveLength(2);
    await expect(page.locator('main')).toContainText('node bin/dfc-bridge.mjs visual-request snapshot.json');
    await expect(page.locator('main')).toContainText('visualReady');
    const visual = await request.get(await page.locator('main a[href$="handoff-visuals.valid.json"]').getAttribute('href'));
    expect(visual.ok()).toBe(true);
    expect((await parseHandoff(await visual.text())).schemaVersion).toBe(3);
    await expect(page.locator('main')).toContainText('node bin/dfc-bridge.mjs package before.json');
    await expect(page.locator('main')).toContainText("node bin/dfc-bridge.mjs record before.json '21:3' 0");
    await expect(page.locator('main')).toContainText("node bin/dfc-bridge.mjs diff before.json after.json --id '21:3'");
    await expect(page.locator('main')).toContainText('declared-by-caller');
    await expect(page.locator('main')).toContainText('handoffReady');
    const sectionPackage = await request.get(await page.locator('main a[href$="handoff-package.valid.json"]').getAttribute('href'));
    expect(sectionPackage.ok()).toBe(true);
    const sectionSnapshot = await parseHandoff(await sectionPackage.text());
    expect(sectionSnapshot.schemaVersion).toBe(4);
    expect(sectionSnapshot.sourceBindings.find(entry => entry.id === '21:3').styles).toHaveLength(2);
    await expect(page.locator('main')).toContainText('visual-preview-request snapshot.json');
    await expect(page.locator('main')).toContainText('visual-review snapshot.json preview.json');
    await expect(page.locator('main')).toContainText('automaticCleanupAllowed: false');
    await expect(page.locator('main')).toContainText('fully-covered-paint-review');
    const previewRequest = await request.get(await page.locator('main a[href$="visual-preview-request.valid.json"]').getAttribute('href'));
    const preview = await request.get(await page.locator('main a[href$="visual-preview.valid.json"]').getAttribute('href'));
    expect(previewRequest.ok() && preview.ok()).toBe(true);
    expect(parseVisualTransferRequest(await previewRequest.text()).format).toBe('dfc-bridge-visual-preview-request');
    expect(parseVisualPreviewPacket(await preview.text()).preview).not.toBeNull();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
