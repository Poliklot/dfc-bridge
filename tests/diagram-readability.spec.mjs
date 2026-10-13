import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Geometry and keyboard operation are mechanical checks, not editorial approval.
// Read the attached, unmodified figure captures before accepting the explanation.
const manifest = JSON.parse(readFileSync(new URL('../validator/site-content.json', import.meta.url), 'utf8'));
const base = '/dfc-bridge';
const assetBase = `${base}/assets/tutorial/diagrams/`;
const newConcepts = ['dfc-bridge-coverage-map', 'data-contract-pipeline', 'motion-scroll-storyboard', 'delivery-lifecycle'];
const refreshedConcepts = [...newConcepts, 'roles', 'scope'];
const imageSelector = '.sl-markdown-content .bridge-lesson-figure > img[src*="/assets/tutorial/diagrams/"]';

function illustratedPages(locale) {
  return manifest.pages.flatMap(({ route, source }) => {
    const authored = readFileSync(new URL(`../${source[locale]}`, import.meta.url), 'utf8');
    const files = [...authored.matchAll(/<img\b[^>]*\bsrc="[^"]*assets\/tutorial\/diagrams\/([^"/]+\.svg)"/gu)].map((match) => match[1]);
    return files.length ? [{ route, files }] : [];
  });
}

async function expectImageGeometry(image, label) {
  await image.scrollIntoViewIfNeeded();
  await image.evaluate((element) => element.decode());
  const geometry = await image.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const parent = element.closest('figure').getBoundingClientRect();
    return {
      naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight,
      width: Number(element.getAttribute('width')), height: Number(element.getAttribute('height')),
      contentWidth: rect.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth),
      contentHeight: rect.height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth),
      left: rect.left, right: rect.right, parentLeft: parent.left, parentRight: parent.right,
    };
  });
  expect(geometry.naturalWidth, label).toBeGreaterThan(0);
  expect(geometry.naturalHeight, label).toBeGreaterThan(0);
  expect(geometry.width, `${label}: authored dimensions match the exported SVG`).toBe(geometry.naturalWidth);
  expect(geometry.height, `${label}: authored dimensions match the exported SVG`).toBe(geometry.naturalHeight);
  expect(geometry.contentWidth, label).toBeGreaterThan(0);
  expect(Math.abs(geometry.contentHeight - geometry.contentWidth * geometry.naturalHeight / geometry.naturalWidth), `${label}: no stretched preview`).toBeLessThan(1);
  expect(geometry.left, label).toBeGreaterThanOrEqual(geometry.parentLeft - .5);
  expect(geometry.right, label).toBeLessThanOrEqual(geometry.parentRight + .5);
}

async function captureFigure(page, figure, name, width, theme, testInfo) {
  await figure.scrollIntoViewIfNeeded();
  const initial = await figure.boundingBox();
  expect(initial.height, `${name}: bounded figure, not an entire article`).toBeLessThan(2400);
  // Preserve the real header and controls. Only increase height so the caption
  // fits; never hide chrome or replace content to manufacture a clean capture.
  await page.setViewportSize({ width, height: Math.max(1000, Math.ceil(initial.height) + 200) });
  const chromeBottom = await page.locator('header, mobile-starlight-toc > nav').evaluateAll((elements) => Math.max(0, ...elements
    .map((element) => element.getBoundingClientRect())
    .filter((rect) => rect.width > 0 && rect.height > 0)
    .map((rect) => rect.bottom)));
  await figure.evaluate((element, inset) => {
    window.scrollBy({ top: element.getBoundingClientRect().top - inset - 24, behavior: 'instant' });
  }, chromeBottom);
  await page.mouse.move(width - 1, 1);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const bounds = await figure.boundingBox();
  expect(bounds.y, `${name}: below fixed header and mobile table of contents`).toBeGreaterThanOrEqual(chromeBottom + 20);
  expect(bounds.y + bounds.height, `${name}: caption fits`).toBeLessThanOrEqual(page.viewportSize().height);
  const path = testInfo.outputPath(`${name}-${width}-${theme}.png`);
  // The focused fullscreen control can paint outside the figure's border box.
  // Preserve that real focus ring rather than cutting it off or hiding focus.
  const viewport = page.viewportSize();
  const x = Math.max(0, Math.floor(bounds.x - 8));
  const y = Math.max(0, Math.floor(bounds.y - 8));
  const right = Math.min(viewport.width, Math.ceil(bounds.x + bounds.width + 8));
  const bottom = Math.min(viewport.height, Math.ceil(bounds.y + bounds.height + 8));
  await page.screenshot({ path, clip: { x, y, width: right - x, height: bottom - y }, animations: 'allow' });
  await testInfo.attach(`${name}-${width}-${theme}`, { path, contentType: 'image/png' });
}

for (const locale of manifest.locales) {
  test(`${locale} registered diagram figures preserve localized evidence, proportions and keyboard inspection`, async ({ page }, testInfo) => {
    test.setTimeout(240_000);
    const width = testInfo.project.name === 'mobile' ? 390 : 1440;
    const widths = testInfo.project.name === 'desktop' ? [1440, 320] : [390];
    const pages = illustratedPages(locale);
    expect(pages.length, 'The manifest must identify illustrated authored pages').toBeGreaterThan(0);
    const inspected = new Set();
    await page.emulateMedia({ colorScheme: 'light' });
    for (const { route, files } of pages) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(`${base}/${locale}/${route}/`);
      expect(response.status(), route).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      const images = page.locator(imageSelector);
      await expect(images).toHaveCount(files.length);
      for (const [index, file] of files.entries()) {
        expect(file.endsWith(`-${locale}.svg`), `${locale}: ${route} uses its own localized SVG`).toBe(true);
        const image = images.nth(index);
        const label = `${locale}/${route}: ${file}`;
        await expect(image).toHaveAttribute('src', `${assetBase}${file}`);
        await expect(image).toHaveAttribute('alt', /\S/u);
        await expectImageGeometry(image, label);
        const figure = image.locator('..');
        const caption = figure.locator(':scope > figcaption');
        await expect(caption).toBeVisible();
        const explanation = await caption.evaluate((element) => {
          const copy = element.cloneNode(true);
          copy.querySelectorAll('button, a').forEach((control) => control.remove());
          return copy.textContent;
        });
        // Presence is testable; meaning is editorial. A fixed character minimum
        // would reject concise Chinese captions without improving their quality.
        expect(explanation, `${label}: authored explanation beyond inspection controls`).toMatch(/\p{L}/u);
        const concept = file.slice(0, -`-${locale}.svg`.length);
        const opener = figure.locator('[data-bridge-media-open]');
        await expect(opener).toHaveAttribute('aria-haspopup', 'dialog');
        // Brief introductory captions use the shared fullscreen button alone.
        // Detailed captions also link directly to the asset; verify the resolved
        // destination rather than requiring a particular URL spelling.
        const fullsize = caption.locator('a[href]');
        if (newConcepts.includes(concept)) await expect(fullsize).toHaveCount(1);
        for (const link of await fullsize.all()) {
          await expect(link).toHaveText(/\S/u);
          expect(await link.evaluate((element) => element.href), `${label}: full-size link opens the same SVG`).toBe(await image.evaluate((element) => element.currentSrc));
        }
        if (newConcepts.includes(concept) && !inspected.has(concept)) {
          await opener.focus();
          await page.keyboard.press('Enter');
          const dialog = page.locator('.bridge-media-dialog');
          await expect(dialog).toBeVisible();
          await expect(dialog.locator('[data-close]')).toBeFocused();
          const expanded = dialog.locator('.bridge-media-image');
          await expect(expanded).toHaveAttribute('src', await image.evaluate((element) => element.currentSrc));
          await expect(expanded).toHaveAttribute('alt', await image.getAttribute('alt'));
          await expect.poll(() => expanded.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
          await page.keyboard.press('Escape');
          await expect(dialog).not.toBeVisible();
          await expect(opener).toBeFocused();
          for (const captureWidth of widths) for (const theme of ['light', 'dark']) {
            await page.setViewportSize({ width: captureWidth, height: 1000 });
            await page.emulateMedia({ colorScheme: theme });
            await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
            await expectImageGeometry(image, `${label}: ${captureWidth}px ${theme}`);
            await captureFigure(page, figure, `${concept}-${locale}`, captureWidth, theme, testInfo);
          }
          await page.setViewportSize({ width, height: 1000 });
          await page.emulateMedia({ colorScheme: 'light' });
          await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
          inspected.add(concept);
        }
      }
      // Exercise the same authored page at narrow widths and both real themes,
      // without another navigation or duplicate screenshot for reused diagrams.
      for (const checkWidth of widths) for (const theme of ['light', 'dark']) {
        await page.setViewportSize({ width: checkWidth, height: 844 });
        await page.emulateMedia({ colorScheme: theme });
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        for (const [index, file] of files.entries()) await expectImageGeometry(images.nth(index), `${file}: ${checkWidth}px ${theme}`);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${locale}/${route}: ${checkWidth}px ${theme} overflow`).toBe(true);
      }
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme: 'light' });
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    }
    expect([...inspected].sort(), 'Every new concept is embedded and keyboard-inspected').toEqual([...newConcepts].sort());
  });

  test(`${locale} refreshed SVG labels render inside their actual exported viewport`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Intrinsic SVG geometry is independent of the documentation viewport.');
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 1440, height: 1200 });
    const receipts = [];
    for (const concept of refreshedConcepts) {
      const file = `${concept}-${locale}.svg`;
      const response = await page.goto(`${assetBase}${file}`);
      expect(response.status(), file).toBe(200);
      await expect(page.locator('svg')).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      const receipt = await page.locator('svg').evaluate((svg) => {
        const viewport = svg.getBoundingClientRect();
        const candidates = [...svg.querySelectorAll('text'), ...svg.querySelectorAll('foreignObject *')];
        const labels = candidates.filter((element) => (element.tagName === 'text' || !element.childElementCount) && element.textContent.trim()).flatMap((element) => {
          const bounds = element.getBoundingClientRect();
          // draw.io includes an unused switch fallback. Its zero-size text is
          // not a rendered label and must not be confused with visible pixels.
          if (!bounds.width || !bounds.height) return [];
          return [{ text: element.textContent.trim(), left: bounds.left - viewport.left, top: bounds.top - viewport.top, right: bounds.right - viewport.left, bottom: bounds.bottom - viewport.top }];
        });
        return { width: viewport.width, height: viewport.height, nativeTextCount: svg.querySelectorAll('text').length, foreignObjectCount: svg.querySelectorAll('foreignObject').length, labels };
      });
      expect(receipt.labels.length, `${file}: real rendered labels`).toBeGreaterThan(3);
      if (newConcepts.includes(concept)) {
        expect(receipt.nativeTextCount, `${file}: SVG-native text remains inspectable`).toBeGreaterThan(3);
        expect(receipt.foreignObjectCount, `${file}: no viewer-dependent HTML label fallback`).toBe(0);
      }
      for (const label of receipt.labels) {
        const context = `${file}: ${label.text}`;
        expect(label.text, context).not.toMatch(/Text is not SVG|Not supported by viewer|\[Object\]/iu);
        expect(label.left, context).toBeGreaterThanOrEqual(-.5);
        expect(label.top, context).toBeGreaterThanOrEqual(-.5);
        expect(label.right, context).toBeLessThanOrEqual(receipt.width + .5);
        expect(label.bottom, context).toBeLessThanOrEqual(receipt.height + .5);
      }
      receipts.push({ file, ...receipt });
    }
    await testInfo.attach(`${locale}-svg-label-geometry.json`, { body: JSON.stringify(receipts, null, 2), contentType: 'application/json' });
  });
}
