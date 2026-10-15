import { test, expect } from '@playwright/test';

const base = '/dfc-bridge';
for (const [locale, language] of [['en', 'en'], ['ru', 'ru'], ['zh', 'zh-CN']]) {
  test(`${locale}: official identities and JSON-LD agree with visible content`, async ({ page }, testInfo) => {
    for (const suffix of ['', 'check/']) {
      await page.goto(`${base}/${locale}/${suffix}`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBe(`https://poliklot.github.io${base}/${locale}/${suffix}`);
      const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'];
      const document = graph.find((node) => node['@type'] === 'WebPage');
      expect(document.url).toBe(canonical);
      expect(document.inLanguage).toBe(language);
      expect(document.name).toBe(await page.locator('meta[property="og:title"]').getAttribute('content'));
      const methodology = graph.find((node) => node['@type'] === 'CreativeWork');
      expect(methodology.name).toBe('DFC Bridge');
      expect(methodology.alternateName).toBe('Design Frontend Contract');
      expect(methodology.sameAs).toBe('https://github.com/Poliklot/dfc-bridge');
      if (suffix) {
        await expect(page.locator('main')).toContainText('DFC Bridge Assistant');
        const plugin = graph.find((node) => node['@type'] === 'SoftwareApplication');
        expect(plugin.url).toBe('https://www.figma.com/community/plugin/1654485530503673254');
        expect(plugin['@id']).not.toBe(methodology['@id']);
        expect(plugin.offers).toBeUndefined();
        expect(plugin.aggregateRating).toBeUndefined();
        await page.locator('.plugin-brief-copy').screenshot({ path: testInfo.outputPath('assistant.png') });
      } else {
        await expect(page.locator('#about-dfc-bridge + p')).toContainText('Design Frontend Contract');
        await expect(page.locator('main')).toContainText('DFC Bridge Assistant');
        await page.locator('.bridge-home-definition').screenshot({ path: testInfo.outputPath('definition.png') });
      }
    }
  });
}

test('Chinese compatibility anchors do not leak into metadata or duplicate the title', async ({ page }) => {
  for (const [route, anchor] of [
    ['guides/motion-and-scroll/', '动作和长卷轴合约'],
    ['guides/wrapper-policy/', '包装器'],
    ['project/brand-system/', 'dfc-bridge品牌体系'],
    ['quality/hard-cases-and-edge-cases/', '硬案例和边缘案例'],
    ['reference/transfer-contract/', 'dfc-bridge-转让合约'],
  ]) {
    await page.goto(`${base}/zh/${route}`);
    await expect(page.locator('h1')).toHaveCount(1);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description.length).toBeGreaterThan(20);
    expect(description).not.toMatch(/<\/?[a-z]|<!--/iu);
    expect(await page.evaluate((id) => Boolean(document.getElementById(id)), anchor)).toBe(true);
  }
});
