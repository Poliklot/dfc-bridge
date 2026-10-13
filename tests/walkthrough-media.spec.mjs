import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, existsSync } from 'node:fs';

const base = '/dfc-bridge';
const route = (locale) => `${base}/${locale}/start/visual-walkthrough/`;
const figures = '.sl-markdown-content .bridge-lesson-figure';
const opener = '[data-bridge-media-open]';
const dialog = '.bridge-media-dialog';
const nativeManifest = new URL('../assets/tutorial/motion/native-provenance.json', import.meta.url);
const motion = JSON.parse(readFileSync(existsSync(nativeManifest) ? nativeManifest : new URL('../assets/tutorial/motion/provenance.json', import.meta.url), 'utf8'));

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
    expect(firstLead?.text).toMatch(locale === 'ru' ? /^Макет:/u : locale === 'zh' ? /设计|稿|看看/u : /design|look/iu);
    expect(introduction.some(({ text, beforeImage }) => !beforeImage && /frontend|前(?:后)?端/iu.test(text))).toBe(true);
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
    const continuous = motion.schemaVersion === 3;
    expect(motion.schemaVersion).toBe(continuous ? 3 : 2);
    expect(motion.kind).toBe(continuous ? 'annotated-native-continuous-recording' : 'annotated-native-step-sequence');
    if (continuous) expect(motion.complete).toBe(true);
    expect(motion.clips).toHaveLength(7);
    await expect(videos).toHaveCount(motion.clips.length);
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
      width: video.getAttribute('width'),
      height: video.getAttribute('height'),
    })));
    const expected = motion.clips.map(({ outputs }) => outputs.find((output) => output.locale === locale));
    expect(inventory.map(({ src }) => src.split('/assets/tutorial/motion/')[1])).toEqual(expected.map(({ file }) => file));
    const narrative = await page.locator('.sl-markdown-content').innerText();
    if (continuous) {
      expect(narrative).toMatch(/непрерывн|continuous|连续/iu);
      expect(narrative).toMatch(locale === 'ru' ? /подсветк[\s\S]*(?:добав|поверх)/iu : locale === 'en' ? /(?:editorial|added)[\s\S]*highlights|highlights[\s\S]*(?:editorial|added)/iu : /高亮[\s\S]*(?:后加|添加)|(?:后加|添加)[\s\S]*高亮/u);
      if (motion.clips.every(({ sourceCapture }) => !sourceCapture.actionFollowingCursorCaptured)) expect(narrative).toMatch(locale === 'ru' ? /(?:курсор|указатель)[\s\S]*(?:не\s+(?:запис|виден|двиг|след)|не сопровож)|без\s+движущегося\s+курсор/iu : locale === 'en' ? /(?:cursor|pointer)[\s\S]*(?:not\s+(?:captured|recorded|visible|move)|does not follow)|no\s+(?:moving|action-following|automation)\s+(?:cursor|pointer)/iu : /光标[\s\S]*(?:未|没有|不可见|不随)|(?:未|没有)[\s\S]*光标/u);
    } else {
      const disclosure = locale === 'ru' ? /курсор[\s\S]*подсветк[\s\S]*добавлен/iu : locale === 'en' ? /cursor[\s\S]*highlights[\s\S]*added/iu : /光标[\s\S]*高亮[\s\S]*后加/u;
      expect(narrative).toMatch(disclosure);
      expect(narrative).toMatch(/пошаг|step|分步|步骤/iu);
    }
    for (const [index, item] of inventory.entries()) {
      expect(item.controls && item.inline && item.paused).toBe(true);
      expect(item.autoplay || item.loop).toBe(false);
      expect(['none', 'metadata']).toContain(item.preload);
      expect(item.name?.trim()).toBeTruthy();
      expect(item.caption.trim().length).toBeGreaterThan(10);
      expect([Number(item.width), Number(item.height)]).toEqual([expected[index].width, expected[index].height]);
      expect((await request.get(item.src)).ok()).toBe(true);
      expect((await request.get(item.poster)).ok()).toBe(true);
    }
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await expect.poll(() => videos.evaluateAll((items, expectedWidth) => innerWidth === expectedWidth && items.every((video) => {
        const article = video.closest('.sl-markdown-content').getBoundingClientRect();
        const figure = video.closest('figure').getBoundingClientRect();
        const frame = video.getBoundingClientRect();
        const style = getComputedStyle(video);
        const contentWidth = frame.width - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
        const contentHeight = frame.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);
        const sourceWidth = Number(video.getAttribute('width'));
        const sourceHeight = Number(video.getAttribute('height'));
        const horizontalBorder = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return frame.left >= article.left - 1 && frame.right <= article.right + 1
          && frame.width <= figure.width + 1 && contentWidth <= sourceWidth + .5
          && Math.abs(frame.width - Math.min(sourceWidth + horizontalBorder, article.width)) < 1
          && Math.abs(contentWidth / contentHeight - sourceWidth / sourceHeight) < .01
          && ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].every((side) => parseFloat(style[side]) === 0);
      }), width), `${locale}: each action preserves its subject-fit ratio without upscaling at ${width}px`).toBe(true);
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
    await expect(modal.locator('#bridge-media-title')).not.toContainText(/GIF/iu);
    await expect(video.locator('..').locator('a[download][href$=".gif"]')).toHaveCount(1);
    await expect(fullVideo).toHaveAttribute('src', await video.getAttribute('src'));
    await expect(fullVideo).toHaveAttribute('poster', await video.getAttribute('poster'));
    await expect.poll(() => fullVideo.evaluate((element) => element.readyState >= 1)).toBe(true);
    expect(await fullVideo.evaluate((element) => element.controls && element.paused && !element.autoplay)).toBe(true);
    expect(await video.evaluate((element) => element.paused)).toBe(true);
    await expect(modal.locator('[data-zoom-controls]')).toBeVisible();
    await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'true');
    expect(await fullVideo.evaluate((element) => getComputedStyle(element).transitionProperty)).toBe('none');
    const identity = await fullVideo.elementHandle();
    const fittedWidth = await fullVideo.evaluate((element) => element.getBoundingClientRect().width);
    await fullVideo.evaluate((element) => { element.currentTime = Math.min(1, element.duration / 4); });
    await expect.poll(() => fullVideo.evaluate((element) => element.readyState >= 2)).toBe(true);
    await fullVideo.evaluate((element) => element.play());
    await expect.poll(() => fullVideo.evaluate((element) => element.currentTime)).toBeGreaterThan(.5);
    const timeBeforeZoom = await fullVideo.evaluate((element) => element.currentTime);
    await modal.locator('[data-zoom-in]').click();
    await expect.poll(() => fullVideo.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(fittedWidth);
    await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'false');
    expect(await identity.evaluate((element) => element === document.querySelector('.bridge-media-video') && !element.paused)).toBe(true);
    expect(await fullVideo.evaluate((element) => element.currentTime)).toBeGreaterThanOrEqual(timeBeforeZoom);
    await modal.locator('[data-actual-size]').click();
    expect(await fullVideo.evaluate((element) => Math.abs(element.getBoundingClientRect().width - element.videoWidth))).toBeLessThan(1);
    await expect(modal.locator('[data-actual-size]')).toHaveText('100%');
    await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'false');
    expect(await identity.evaluate((element) => element === document.querySelector('.bridge-media-video') && !element.paused)).toBe(true);
    expect(await fullVideo.evaluate((element) => element.currentTime)).toBeGreaterThanOrEqual(timeBeforeZoom);
    await fullVideo.evaluate((element) => /** @type {HTMLVideoElement} */ (element).pause());
    const pausedTime = await fullVideo.evaluate((element) => element.currentTime);
    await modal.locator('[data-zoom-out]').click();
    await modal.locator('[data-fit]').click();
    expect(await identity.evaluate((element) => element === document.querySelector('.bridge-media-video') && element.paused)).toBe(true);
    expect(await fullVideo.evaluate((element) => element.currentTime)).toBeCloseTo(pausedTime, 3);
    await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'true');
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await expect.poll(() => fullVideo.evaluate((element, expectedWidth) => {
        const frame = element.closest('.bridge-media-stage').getBoundingClientRect();
        const pixels = element.getBoundingClientRect();
        return innerWidth === expectedWidth && frame.left >= -.5 && frame.right <= innerWidth + .5
          && pixels.left >= frame.left + 23 && pixels.right <= frame.right - 23
          && pixels.top >= frame.top + 23 && pixels.bottom <= frame.bottom - 23
          && pixels.width <= element.videoWidth + .5 && pixels.height <= element.videoHeight + .5
          && Math.abs(pixels.width / pixels.height - element.videoWidth / element.videoHeight) < .01;
      }, width), `${locale}: video keeps its native ratio without clipping or upscaling at ${width}px`).toBe(true);
      await modal.locator('[data-actual-size]').click();
      expect(await fullVideo.evaluate((element) => Math.abs(element.getBoundingClientRect().width - element.videoWidth))).toBeLessThan(1);
      await expect(modal.locator('[data-actual-size]')).toHaveText('100%');
      await expect(modal.locator('[data-fit]')).toHaveAttribute('aria-pressed', 'false');
      expect(await identity.evaluate((element) => element === document.querySelector('.bridge-media-video') && element.paused)).toBe(true);
      expect(await fullVideo.evaluate((element) => element.currentTime)).toBeCloseTo(pausedTime, 3);
      if (width <= 390) expect(await fullVideo.evaluate((element) => {
        const stage = element.closest('.bridge-media-stage');
        return stage.scrollWidth > stage.clientWidth && element.videoWidth > stage.clientWidth;
      })).toBe(true);
      await modal.locator('[data-fit]').click();
    }
    await fullVideo.evaluate((element) => element.play());
    await expect.poll(() => fullVideo.evaluate((element) => element.currentTime)).toBeGreaterThan(0);
    const playback = await fullVideo.elementHandle();
    await page.keyboard.press('Escape');
    await expect(button).toBeFocused();
    await expect(modal.locator('video')).toHaveCount(0);
    expect(await playback.evaluate((element) => element.paused)).toBe(true);
    await playback.dispose();
    await identity.dispose();
    expect(await video.evaluate((element) => element.paused)).toBe(true);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.reload();
    expect(await videos.evaluateAll((items) => items.every((element) => element.paused && !element.autoplay && !element.loop))).toBe(true);
  });
}

test('a queued close event cannot clear a newly opened evidence session', async ({ page }) => {
  await page.goto(route('ru'));
  const images = page.locator(`${figures} > img`);
  const videos = page.locator(`${figures} > video`);
  const sources = [images.nth(0), images.nth(1), videos.nth(0), videos.nth(1), images.nth(0)];
  const modal = page.locator(dialog);
  const sourceButton = (source) => source.locator('..').locator(opener);
  await sourceButton(sources[0]).click();
  await expect(modal).toBeVisible();
  for (const nextSource of sources.slice(1)) {
    const currentVideos = modal.locator('.bridge-media-video');
    const previousVideo = await currentVideos.count() ? await currentVideos.elementHandle() : null;
    if (previousVideo) {
      await previousVideo.evaluate((video) => video.play());
      expect(await previousVideo.evaluate((video) => video.paused)).toBe(false);
    }
    const nextButton = sourceButton(nextSource);
    // Intentionally reopen in the same task, before the native queued close
    // event can run. Cover image→image, image→video, video→video, video→image.
    await nextButton.evaluate((button) => {
      document.querySelector('.bridge-media-dialog').close();
      button.click();
    });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await expect(modal).toHaveAttribute('open', '');
    await expect(modal.locator('.bridge-media-canvas > *')).toHaveCount(1);
    const isVideo = await nextSource.evaluate((media) => media.tagName === 'VIDEO');
    const nextMedia = modal.locator(isVideo ? '.bridge-media-video' : '.bridge-media-image');
    expect(await nextMedia.evaluate((media) => media.currentSrc || media.src)).toBe(await nextSource.evaluate((media) => media.currentSrc || media.src));
    await expect(modal.locator('[data-close]')).toBeFocused();
    if (previousVideo) {
      expect(await previousVideo.evaluate((video) => video.paused)).toBe(true);
      await previousVideo.dispose();
    }
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
    await expect(modal.locator('.bridge-media-canvas > *')).toHaveCount(0);
    await expect(nextButton).toBeFocused();
    await nextButton.click();
    await expect(modal).toBeVisible();
  }
  await page.keyboard.press('Escape');
  await expect(modal.locator('.bridge-media-canvas > *')).toHaveCount(0);
  await expect(sourceButton(sources.at(-1))).toBeFocused();
});
