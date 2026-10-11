import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const base = '/dfc-bridge';
const route = (locale) => `${base}/${locale}/start/visual-walkthrough/`;
const figures = '.sl-markdown-content .bridge-lesson-figure';
const opener = '[data-bridge-media-open]';
const dialog = '.bridge-media-dialog';

for (const locale of ['ru', 'en', 'zh']) {
  test(`${locale} fullscreen evidence is keyboard operable and restores focus`, async ({ page }) => {
    await page.goto(route(locale));
    const first = page.locator(figures).first();
    const button = first.locator(opener);
    const preview = first.locator(':scope > img');
    const modal = page.locator(dialog);
    await expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('open', '');
    await expect(modal.locator('[data-close]')).toBeFocused();
    const image = modal.locator('.bridge-media-image');
    await expect(image).toHaveAttribute('src', await preview.evaluate((element) => element.currentSrc || element.src));
    await expect(image).toHaveAttribute('alt', await preview.getAttribute('alt'));
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
    await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'true');
    const fittedWidth = await image.evaluate((element) => element.getBoundingClientRect().width);
    await modal.locator('[data-zoom-in]').focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => image.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(fittedWidth);
    await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'false');
    await modal.locator('[data-actual-size]').focus();
    await page.keyboard.press('Space');
    expect(await image.evaluate((element) => Math.abs(element.getBoundingClientRect().width - element.naturalWidth))).toBeLessThan(1);
    await modal.locator('[data-fit]').focus();
    await page.keyboard.press('Enter');
    await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'true');
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await expect.poll(() => image.evaluate((element) => {
        const frame = element.closest('.bridge-media-stage').getBoundingClientRect();
        const pixels = element.getBoundingClientRect();
        return frame.left >= -.5 && frame.right <= innerWidth + .5
          && pixels.left >= frame.left + 23 && pixels.right <= frame.right - 23
          && pixels.top >= frame.top + 23 && pixels.bottom <= frame.bottom - 23;
      }), `${locale}: fit preserves visible source pixels and the inspection matte at ${width}px`).toBe(true);
    }
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
    await expect(button).toBeFocused();
    await expect(modal.locator('.bridge-media-canvas > *')).toHaveCount(0);
    await page.keyboard.press('Space');
    await expect(modal).toBeVisible();
    await modal.locator('[data-close]').click();
    await expect(button).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`${route(locale)}?$`));
    // The explanatory capture is inspectable; the three penguins stay silent,
    // decorative and outside the media opener inventory.
    const explanatory = page.locator(`${figures} > img:not([aria-hidden="true"]), ${figures} > video`);
    await expect(page.locator(`${figures} ${opener}`)).toHaveCount(await explanatory.count());
    await expect(page.locator('.bridge-lesson-comment')).toHaveCount(3);
    await expect(page.locator('.bridge-lesson-comment').locator(opener)).toHaveCount(0);
    await expect(page.locator('.bridge-lesson-penguin.bridge-media-preview')).toHaveCount(0);
  });

  test(`${locale} import action and paired native layer trees remain readable`, async ({ page, request }) => {
    await page.goto(route(locale));
    const download = page.locator('.sl-markdown-content a[download="dfc-bridge-workshop.fig"]');
    await expect(download).toHaveCount(1);
    await expect(download).toBeVisible();
    const response = await request.get(await download.getAttribute('href'));
    expect(response.ok()).toBe(true);
    expect((await response.body()).subarray(0, 4).toString('hex')).toBe('504b0304');
    const downloaded = page.waitForEvent('download');
    await download.click();
    expect((await downloaded).suggestedFilename()).toBe('dfc-bridge-workshop.fig');
    await expect(page.locator('.sl-markdown-content ol').first().locator(':scope > li')).toHaveCount(3);
    const firstImage = page.locator(figures).first();
    const introduction = await page.locator('.sl-markdown-content').evaluate((content) => {
      const firstFigure = content.querySelector('.bridge-lesson-figure');
      const paragraphs = [...content.querySelectorAll(':scope > p')];
      return paragraphs.map((paragraph) => ({
        text: paragraph.textContent,
        beforeImage: Boolean(paragraph.compareDocumentPosition(firstFigure) & Node.DOCUMENT_POSITION_FOLLOWING),
      }));
    });
    const firstLead = introduction.find(({ beforeImage }) => beforeImage);
    expect(firstLead?.text).toMatch(locale === 'ru' ? /^Посмотрим на макет/u : locale === 'zh' ? /设计|稿|看看/u : /design|look/iu);
    expect(introduction.some(({ text, beforeImage }) => !beforeImage && /frontend|前端/iu.test(text))).toBe(true);
    await expect(firstImage).toBeVisible();
    const pair = page.locator('.bridge-lesson-tree-pair');
    await expect(pair).toHaveCount(1);
    const trees = pair.locator('.bridge-lesson-figure > img');
    await expect(trees).toHaveCount(2);
    const sources = await trees.evaluateAll((items) => items.map((image) => image.getAttribute('src')));
    expect(sources[0]).toMatch(/tree-desktop\.png$/u);
    expect(sources[1]).toMatch(/tree-mobile\.png$/u);
    expect(sources[0]).not.toBe(sources[1]);
    await trees.evaluateAll((items) => items.forEach((image) => { image.loading = 'eager'; }));
    await expect.poll(() => trees.evaluateAll((items) => items.every((image) => image.complete && image.naturalWidth > 0 && image.alt))).toBe(true);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      const layout = await trees.evaluateAll((items) => items.map((image) => {
        const bounds = image.getBoundingClientRect();
        return { left: bounds.left, top: bounds.top, right: bounds.right, bottom: bounds.bottom, width: bounds.width };
      }));
      expect(layout.every(({ width }) => width > 150)).toBe(true);
      if (width >= 640) {
        expect(Math.abs(layout[0].top - layout[1].top)).toBeLessThan(1);
        expect(layout[0].right).toBeLessThanOrEqual(layout[1].left);
      } else {
        expect(layout[0].bottom).toBeLessThan(layout[1].top);
      }
    }
  });

  test(`${locale} real correction sequences play only on request, including reduced motion`, async ({ page, request }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route(locale));
    const videos = page.locator(`${figures} > video`);
    await expect(videos).toHaveCount(2);
    const inventory = await videos.evaluateAll((items) => items.map((video) => ({
      src: video.getAttribute('src'),
      poster: video.getAttribute('poster'),
      name: video.getAttribute('aria-label'),
      controls: video.controls,
      inline: video.playsInline,
      preload: video.preload,
      paused: video.paused,
      autoplay: video.hasAttribute('autoplay'),
      loop: video.hasAttribute('loop'),
      caption: video.closest('figure').querySelector('figcaption').textContent,
    })));
    expect(inventory.map(({ src }) => src.split('/').at(-1)).sort()).toEqual(['move-actions.mp4', 'rename-title.mp4']);
    for (const item of inventory) {
      expect(item.controls && item.inline && item.paused).toBe(true);
      expect(item.autoplay || item.loop).toBe(false);
      expect(['none', 'metadata']).toContain(item.preload);
      expect(item.name?.trim()).toBeTruthy();
      expect(item.caption).toMatch(/пошаг|step|分步|步骤/iu);
      expect((await request.get(item.src)).ok()).toBe(true);
      expect((await request.get(item.poster)).ok()).toBe(true);
    }
    const video = videos.first();
    const button = video.locator('..').locator(opener);
    const modal = page.locator(dialog);
    await video.evaluate((element) => element.play());
    await expect.poll(() => video.evaluate((element) => element.paused)).toBe(false);
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(modal).toBeVisible();
    const fullVideo = modal.locator('.bridge-media-video');
    await expect(fullVideo).toHaveAttribute('src', await video.getAttribute('src'));
    await expect(fullVideo).toHaveAttribute('poster', await video.getAttribute('poster'));
    await expect.poll(() => fullVideo.evaluate((element) => element.readyState >= 1)).toBe(true);
    expect(await fullVideo.evaluate((element) => element.controls && element.paused && !element.autoplay)).toBe(true);
    expect(await video.evaluate((element) => element.paused)).toBe(true);
    await expect(modal.locator('[data-image-controls]')).toBeHidden();
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await expect.poll(() => fullVideo.evaluate((element, expectedWidth) => {
        const frame = element.closest('.bridge-media-stage').getBoundingClientRect();
        const pixels = element.getBoundingClientRect();
        return innerWidth === expectedWidth && frame.left >= -.5 && frame.right <= innerWidth + .5
          && pixels.left >= frame.left && pixels.right <= frame.right + .5
          && pixels.width <= element.videoWidth + .5 && pixels.height <= element.videoHeight + .5
          && Math.abs(pixels.width / pixels.height - element.videoWidth / element.videoHeight) < .01;
      }, width), `${locale}: video keeps its native ratio without clipping or upscaling at ${width}px`).toBe(true);
    }
    await fullVideo.evaluate((element) => element.play());
    await expect.poll(() => fullVideo.evaluate((element) => element.currentTime)).toBeGreaterThan(0);
    const playback = await fullVideo.elementHandle();
    await page.keyboard.press('Escape');
    await expect(button).toBeFocused();
    await expect(modal.locator('video')).toHaveCount(0);
    expect(await playback.evaluate((element) => element.paused)).toBe(true);
    await playback.dispose();
    expect(await video.evaluate((element) => element.paused)).toBe(true);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.reload();
    expect(await videos.evaluateAll((items) => items.every((element) => element.paused && !element.autoplay && !element.loop))).toBe(true);
  });
}
