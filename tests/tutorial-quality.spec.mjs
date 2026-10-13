import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';

// Playback/geometry are mechanical proof. Review the attached screenshots and
// the actual moving content separately before claiming visual approval.
const manifest = JSON.parse(readFileSync(new URL('../assets/tutorial/motion/native-provenance.json', import.meta.url), 'utf8'));
const locales = ['ru', 'en', 'zh'];
const ids = ['page-metadata', 'rename-title', 'repair-copy', 'move-actions', 'button-states', 'local-action', 'repeat-check'];
const route = (locale) => `/dfc-bridge/${locale}/start/visual-walkthrough/`;
const mediaSelector = '.sl-markdown-content .bridge-lesson-figure > video';
const outputFor = (id, locale) => {
  const output = manifest.clips.find((clip) => clip.id === id)?.outputs.find((item) => item.locale === locale);
  if (!output) throw new Error(`Missing native output: ${id}-${locale}`);
  return output;
};

// These tests enumerate their own viewport matrix. Do not run it twice through
// the project's mobile configuration, or duplicate the three real-time playlists.
test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Explicit desktop/mobile-width matrix runs once in the desktop project.');
  expect(manifest.complete).toBe(true);
  expect(manifest.clips.map(({ id }) => id)).toEqual(ids);
});

for (const locale of locales) {
  test(`${locale} native playlist plays all seven clips fully at normal speed without seeking`, async ({ page }, testInfo) => {
    const playlist = ids.map((id) => ({ id, ...outputFor(id, locale) }));
    test.setTimeout(Math.ceil(playlist.reduce((sum, output) => sum + output.durationSeconds, 0) * 1000) + playlist.length * 20_000 + 20_000);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ colorScheme: 'light' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route(locale));
    const videos = page.locator(mediaSelector);
    await expect(videos).toHaveCount(7);
    const playback = [];

    for (const output of playlist) {
      await test.step(`${output.id}: start → pause → resume → natural end`, async () => {
        const video = page.locator(`${mediaSelector}[src$="/${output.id}-${locale}.mp4"]`);
        await expect(video).toHaveCount(1);
        await video.scrollIntoViewIfNeeded();
        await video.evaluate((element) => { element.preload = 'metadata'; element.load(); });
        await expect.poll(() => video.evaluate((element) => element.readyState >= 1), { timeout: 15_000 }).toBe(true);
        const initial = await video.evaluate((element) => {
          element.__qualityPlayback = { seeking: 0, ratechange: 0, play: 0, pause: 0, timeupdate: 0 };
          for (const type of Object.keys(element.__qualityPlayback)) {
            element.addEventListener(type, () => { element.__qualityPlayback[type] += 1; });
          }
          return { paused: element.paused, time: element.currentTime, rate: element.playbackRate, autoplay: element.autoplay, loop: element.loop, controls: element.controls, width: element.videoWidth, height: element.videoHeight, duration: element.duration };
        });
        expect(initial).toMatchObject({ paused: true, time: 0, rate: 1, autoplay: false, loop: false, controls: true, width: output.width, height: output.height });
        expect(initial.duration).toBeCloseTo(output.durationSeconds, 1);

        const started = Date.now();
        await video.evaluate((element) => element.play());
        await expect.poll(() => video.evaluate((element) => element.currentTime), { timeout: 10_000 }).toBeGreaterThan(.4);
        const pausedAt = await video.evaluate((element) => { element.pause(); return element.currentTime; });
        // This deliberate pause tests that media time stops; it does not skip,
        // synthesize or retime any of the recorded operation.
        await page.waitForTimeout(350);
        expect(await video.evaluate((element) => element.paused)).toBe(true);
        expect(await video.evaluate((element) => element.currentTime)).toBeCloseTo(pausedAt, 2);
        await video.evaluate((element) => element.play());
        await expect.poll(() => video.evaluate((element) => {
          if (element.error) throw new Error(`Native media error ${element.error.code}: ${element.error.message}`);
          return element.ended;
        }), { timeout: Math.ceil(output.durationSeconds * 1000) + 10_000, intervals: [250] }).toBe(true);

        const result = await video.evaluate((element) => ({ ...element.__qualityPlayback, time: element.currentTime, duration: element.duration, rate: element.playbackRate, paused: element.paused, error: element.error?.message || null }));
        expect(result).toMatchObject({ seeking: 0, ratechange: 0, play: 2, rate: 1, paused: true, error: null });
        expect(result.pause).toBeGreaterThanOrEqual(2);
        expect(result.timeupdate).toBeGreaterThan(2);
        expect(result.time).toBeCloseTo(output.durationSeconds, 1);
        const elapsedSeconds = (Date.now() - started) / 1000;
        expect(elapsedSeconds).toBeGreaterThanOrEqual(output.durationSeconds - .5);
        playback.push({ id: output.id, locale, elapsedSeconds, ...result });
      });
    }
    expect(errors).toEqual([]);
    await testInfo.attach(`${locale}-normal-speed-playback.json`, { body: JSON.stringify(playback, null, 2), contentType: 'application/json' });
  });
}

for (const locale of locales) for (const width of [1440, 390, 320]) for (const theme of ['light', 'dark']) {
  test(`${locale} tutorial quality at ${width}px in ${theme}`, async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ colorScheme: theme });
    await page.goto(route(locale));
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect(page.locator('[data-bridge-media-open]')).toHaveCount(20);
    await page.evaluate(() => document.fonts.ready);
    const videos = page.locator(mediaSelector);
    await expect(videos).toHaveCount(7);
    const images = page.locator('.sl-markdown-content .bridge-lesson-figure > img');
    await images.evaluateAll((items) => items.forEach((image) => { image.loading = 'eager'; }));
    await expect.poll(() => images.evaluateAll((items) => items.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);

    // Read actual decoded metadata and wait for a playable frame. Metadata alone
    // leaves Chromium's loading spinner over the poster in review screenshots.
    // No play, seek or rate change occurs in these poster-review cases.
    await videos.evaluateAll(async (items) => {
      await Promise.all(items.map((video) => new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error(`Playable-frame timeout: ${video.src}`)), 15_000);
        video.addEventListener('canplay', () => { clearTimeout(timeout); resolve(); }, { once: true });
        video.addEventListener('error', () => { clearTimeout(timeout); reject(new Error(`Media failed: ${video.src}`)); }, { once: true });
        video.preload = 'auto';
        video.load();
      })));
      await Promise.all(items.map((video) => {
        const image = new Image(); image.src = video.poster; return image.decode();
      }));
    });

    const geometry = await page.locator('.sl-markdown-content .bridge-lesson-figure > img, .sl-markdown-content .bridge-lesson-figure > video').evaluateAll((items) => items.map((element) => {
      const rect = element.getBoundingClientRect();
      const parent = element.closest('figure').getBoundingClientRect();
      const style = getComputedStyle(element);
      const contentWidth = rect.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
      const contentHeight = rect.height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);
      return {
        file: element.getAttribute('src').split('/').at(-1), kind: element.tagName,
        htmlWidth: Number(element.getAttribute('width')), htmlHeight: Number(element.getAttribute('height')),
        nativeWidth: element.videoWidth || element.naturalWidth, nativeHeight: element.videoHeight || element.naturalHeight,
        contentWidth, contentHeight, left: rect.left, right: rect.right, parentLeft: parent.left, parentRight: parent.right,
        paused: element.tagName === 'VIDEO' ? element.paused : null,
      };
    }));
    for (const item of geometry) {
      expect([item.htmlWidth, item.htmlHeight], item.file).toEqual([item.nativeWidth, item.nativeHeight]);
      expect(item.contentWidth, `${item.file}: positive content width`).toBeGreaterThan(0);
      expect(item.contentHeight, `${item.file}: positive content height`).toBeGreaterThan(0);
      expect(item.contentWidth, `${item.file}: no horizontal upscaling`).toBeLessThanOrEqual(item.nativeWidth + .5);
      expect(item.contentHeight, `${item.file}: no vertical upscaling`).toBeLessThanOrEqual(item.nativeHeight + .5);
      expect(Math.abs(item.contentWidth / item.contentHeight - item.nativeWidth / item.nativeHeight), `${item.file}: native ratio`).toBeLessThan(.01);
      expect(item.left, `${item.file}: viewport left`).toBeGreaterThanOrEqual(-.5);
      expect(item.right, `${item.file}: viewport right`).toBeLessThanOrEqual(width + .5);
      expect(item.left, `${item.file}: figure left`).toBeGreaterThanOrEqual(item.parentLeft - .5);
      expect(item.right, `${item.file}: figure right`).toBeLessThanOrEqual(item.parentRight + .5);
      if (item.kind === 'VIDEO') {
        const output = ids.map((id) => outputFor(id, locale)).find(({ file }) => file.endsWith(`/${item.file}`));
        expect(output, item.file).toBeTruthy();
        expect([item.nativeWidth, item.nativeHeight], item.file).toEqual([output.width, output.height]);
        expect(item.paused, `${item.file}: poster remains paused`).toBe(true);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    const reviewTargets = [
      ...['desktop', 'mobile'].map((kind) => [`hero-${kind}`, page.locator('.bridge-lesson-figure').filter({ has: page.locator(`img[src$="figma-before-hero-${kind}.png"]`) })]),
      ...['button-states', 'local-action', 'repeat-check'].map((id) => [id, page.locator('.bridge-lesson-figure').filter({ has: page.locator(`video[src$="/${id}-${locale}.mp4"]`) })]),
    ];
    for (const [name, target] of reviewTargets) {
      await expect(target).toHaveCount(1);
      await target.scrollIntoViewIfNeeded();
      let bounds = await target.boundingBox();
      expect(bounds.width, name).toBeLessThanOrEqual(width);
      expect(bounds.height, `${name}: bounded review image, not a whole-page capture`).toBeLessThan(2200);
      // Keep the real page chrome intact. Fit one complete figure at the same
      // responsive width, then scroll below the fixed header instead of hiding it.
      // A tall hero pair cannot be captured reliably as one element on mobile.
      await page.setViewportSize({ width, height: Math.max(1000, Math.ceil(bounds.height) + 200) });
      await target.evaluate((element) => {
        const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom || 0;
        window.scrollBy({ top: element.getBoundingClientRect().top - Math.max(0, headerBottom) - 24, behavior: 'instant' });
      });
      await page.mouse.move(width - 1, 1);
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      bounds = await target.boundingBox();
      const headerBottom = await page.locator('header').first().evaluate((element) => element.getBoundingClientRect().bottom);
      expect(bounds.y, `${name}: below fixed header`).toBeGreaterThanOrEqual(headerBottom + 20);
      expect(bounds.y + bounds.height, `${name}: full figure fits viewport`).toBeLessThanOrEqual(page.viewportSize().height);
      const openerBounds = await target.locator('[data-bridge-media-open]').boundingBox();
      expect(openerBounds.y + openerBounds.height, `${name}: complete inspection control inside figure`).toBeLessThanOrEqual(bounds.y + bounds.height + .5);
      const path = testInfo.outputPath(`${locale}-${width}-${theme}-${name}.png`);
      // Chromium may keep fading its native loading indicator after canplay.
      // Wait for the real paused pixels to settle; do not hide/disable controls
      // or animations to manufacture a clean acceptance image.
      let previous;
      let stableFrames = 0;
      await expect.poll(async () => {
        const current = await target.screenshot({ animations: 'allow' });
        stableFrames = previous?.equals(current) ? stableFrames + 1 : 0;
        previous = current;
        return stableFrames;
      }, { timeout: 15_000, intervals: [250], message: `${name}: three identical paused screenshots after media readiness` }).toBeGreaterThanOrEqual(2);
      writeFileSync(path, previous);
      await testInfo.attach(`${locale}-${width}-${theme}-${name}`, { path, contentType: 'image/png' });
    }
    await testInfo.attach('native-geometry.json', { body: JSON.stringify(geometry, null, 2), contentType: 'application/json' });
  });
}
