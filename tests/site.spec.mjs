import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, existsSync } from 'node:fs';

const base = '/dfc-bridge';
const nativeManifest = new URL('../assets/tutorial/motion/native-provenance.json', import.meta.url);
const walkthroughMotion = JSON.parse(readFileSync(existsSync(nativeManifest) ? nativeManifest : new URL('../assets/tutorial/motion/provenance.json', import.meta.url), 'utf8'));

for (const locale of ['ru', 'en', 'zh']) {
  test(`${locale} home has no overflow and no serious accessibility violations`, async ({ page }) => {
    await page.goto(`${base}/${locale}/`);
    await expect(page.locator('h1#_top')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.bridge-handoff-map')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    const result = await new AxeBuilder({ page }).analyze();
    expect(result.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
  });
}

for (const locale of ['ru', 'en', 'zh']) {
  test(`${locale} custom routes keep the locale document language`, async ({ page }) => {
    for (const route of ['check/', 'rules/', 'tags/']) {
      await page.goto(`${base}/${locale}/${route}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale === 'zh' ? 'zh-CN' : locale);
      await expect(page.locator('main')).toBeVisible();
    }
  });
}

test('primary quick-start action is keyboard operable', async ({ page }) => {
  await page.goto(`${base}/ru/`);
  const quickStart = page.locator('.bridge-actions .bridge-button-primary');
  await quickStart.focus();
  await expect(quickStart).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(`${base}/ru/start/designer-quick-start/?$`));
});

test('check hub exposes three clear review paths', async ({ page }) => {
  await page.goto(`${base}/ru/check/`);
  await expect(page.locator('h1')).toHaveCount(1);
  const paths = page.locator('.check-hub-hero nav a');
  await expect(paths).toHaveCount(3);
  await expect(paths.nth(1)).toHaveAttribute('href', `${base}/ru/check/designer-checklist/`);
  await expect(paths.nth(2)).toHaveAttribute('href', `${base}/ru/check/full-review/`);
  await paths.first().click();
  await expect(page.locator('#figma-page-check')).toBeVisible();
  await expect(page.locator('.plugin-brief-cta')).toHaveAttribute('href', /figma\.com\/community\/plugin\//);
});

test('tag registry filters and rule deep links resolve', async ({ page }) => {
  await page.goto(`${base}/ru/tags/`);
  await expect(page.locator('h1')).toHaveCount(1);
  await page.locator('[data-tag-search]').fill('модальное окно');
  await expect(page.locator('[data-tag]:visible')).toHaveCount(1);
  await page.goto(`${base}/ru/rules/#motion.driver-missing`);
  const target = page.locator('#motion\\.driver-missing');
  await expect(target).toBeVisible();
  await expect(page.locator('[data-rule-search]')).toHaveValue('motion.driver-missing');
});

test('reduced motion disables nonessential animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/ru/`);
  const duration = await page.locator('.bridge-handoff-map').evaluate((element) => getComputedStyle(element).animationDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
});

for (const locale of ['ru', 'en', 'zh']) {
  test(`${locale} visual introduction explains a handoff without exercises and keeps accessible evidence`, async ({ page, request }) => {
    await page.goto(`${base}/${locale}/start/visual-walkthrough/`);
    await expect(page.locator('h1')).toHaveCount(1);
    const narrative = await page.locator('.sl-markdown-content').innerText();
    expect(narrative).not.toMatch(/упражнен|трениров|\bexercises?\b|for practice|练习/iu);
    for (const role of locale === 'zh' ? ['前端', '后端', 'AI'] : locale === 'ru' ? ['frontend', 'backend', 'ИИ'] : ['frontend', 'backend', 'AI']) {
      expect(narrative.toLowerCase()).toContain(role.toLowerCase());
    }
    const figures = page.locator('.bridge-lesson-figure');
    expect(await figures.count()).toBe(20);
    const chapterNumbers = await page.locator('.sl-markdown-content h2').evaluateAll((items) => items.map((h) => h.textContent.trim().match(/^(\d+)\./)?.[1]).filter(Boolean));
    expect(chapterNumbers).toEqual(['1', '2', '3', '4', '5']);
    const storyAssets = await page.locator('.bridge-lesson-figure > img').evaluateAll((items) => items.map((img) => img.getAttribute('src').split('/').at(-1)));
    expect(storyAssets).toEqual([
      'figma-before-overview.png', 'tree-desktop.png', 'tree-mobile.png', 'figma-before-hero-desktop.png', 'figma-before-hero-mobile.png',
      `contexts-${locale}.svg`, `identity-${locale}.svg`,
      'hero-1440.png', 'hero-375.png', 'figma-kit-modals.png', `interactions-${locale}.svg`,
      'figma-final-overview.png', 'assistant-ready-summary-local.png',
    ]);
    const readySummary = figures.filter({ has: page.locator('img[src$="assistant-ready-summary-local.png"]') });
    await expect(readySummary.locator('figcaption')).toContainText(locale === 'ru' ? 'Ранний отчёт страницы 02' : locale === 'zh' ? '页面 02 的较早报告' : 'Earlier page-02 report');
    await expect(readySummary.locator('figcaption a')).toHaveAttribute('href', /\/screenshots\/assistant-ready-result-local\.png$/u);
    const heroDetails = figures.filter({ has: page.locator('img[src$="figma-before-hero-desktop.png"], img[src$="figma-before-hero-mobile.png"]') });
    await expect(heroDetails).toHaveCount(2);
    await expect(heroDetails.locator('a[href$="figma-before-overview.png"]')).toHaveCount(1);
    const storyMedia = await figures.evaluateAll((items) => items.map((figure) => figure.querySelector(':scope > img, :scope > video').getAttribute('src').split('/').at(-1)));
    expect(storyMedia).toEqual([
      'figma-before-overview.png', 'tree-desktop.png', 'tree-mobile.png', 'figma-before-hero-desktop.png', 'figma-before-hero-mobile.png',
      `page-metadata-${locale}.mp4`, `contexts-${locale}.svg`,
      `rename-title-${locale}.mp4`, `repair-copy-${locale}.mp4`, `move-actions-${locale}.mp4`, `identity-${locale}.svg`,
      'hero-1440.png', 'hero-375.png', 'figma-kit-modals.png',
      `button-states-${locale}.mp4`, `interactions-${locale}.svg`, `local-action-${locale}.mp4`,
      `repeat-check-${locale}.mp4`, 'figma-final-overview.png', 'assistant-ready-summary-local.png',
    ]);
    const comments = figures.locator('.bridge-lesson-comment');
    await expect(comments).toHaveCount(3);
    expect(await comments.evaluateAll((items) => items.map((comment) => ({
      speaker: comment.querySelector('img').getAttribute('src').split('/').at(-1),
      evidence: comment.nextElementSibling.getAttribute('src').split('/').at(-1),
      isCapture: comment.closest('figure').classList.contains('bridge-lesson-screenshot'),
      isMotion: comment.closest('figure').classList.contains('bridge-lesson-motion'),
    })))).toEqual([
      { speaker: 'handoff-penguin-frontend-display.png', evidence: 'figma-before-hero-mobile.png', isCapture: true, isMotion: false },
      { speaker: 'handoff-penguin-ai-display.png', evidence: `local-action-${locale}.mp4`, isCapture: false, isMotion: true },
      { speaker: 'handoff-penguin-backend-display.png', evidence: 'figma-final-overview.png', isCapture: true, isMotion: false },
    ]);
    for (const image of await comments.locator('img').all()) {
      await expect(image).toHaveAttribute('alt', '');
      await expect(image).toHaveAttribute('aria-hidden', 'true');
      await expect(image).toHaveAttribute('draggable', 'false');
    }
    const chapters = await page.locator('.sl-markdown-content h2').evaluateAll((items) => Object.fromEntries(items.flatMap((heading, index) => {
      const number = heading.textContent.trim().match(/^(\d+)\./)?.[1];
      if (!number) return [];
      const range = document.createRange();
      range.setStartAfter(heading);
      if (items[index + 1]) range.setEndBefore(items[index + 1]);
      else range.setEndAfter(heading.closest('.sl-markdown-content').lastChild);
      return [[number, range.toString()]];
    })));
    // The story's evidence must retain the actual two source inconsistencies,
    // then explain shared appearance separately from page-owned actions/targets.
    // Chinese explains the removed word instead of repeating two full Cyrillic
    // titles. Their exact source values are checked by the native asset guard.
    const headingCopy = locale === 'zh'
      ? ['понятных', '改了内容，不是换行']
      : ['Мастерская понятных макетов', 'Мастерская макетов'];
    for (const heading of headingCopy) expect(chapters['1']).toContain(heading);
    // Differences are design decisions to represent explicitly, not a ban on
    // intentional copy/layout choices. The repaired example is only one path.
    const designChoices = {
      ru: { 1: ['Короче текст, кнопки под картинкой — можно', 'согласовать вариант текста и описать перенос'], 3: ['Это не единственный путь', 'согласованный продуктовый вариант', 'описанная трансформация'], 5: ['Отдельная копия', 'это решение'] },
      en: { 1: ['Shorter text, buttons below the image—allowed', 'Agree on the copy variant and describe the move'], 3: ['not the only way', 'agreed product variant', 'declared transformation'], 5: ['Separate copy', 'this solution'] },
      zh: { 1: ['都可以', '约定文案变体'], 3: ['此例统一文案和父级，也可另定方案。', '约定的产品变体', '声明的响应式变换'], 5: ['独立副本', '此方案'] },
    };
    for (const [chapter, phrases] of Object.entries(designChoices[locale])) {
      for (const phrase of phrases) expect(chapters[chapter]).toContain(phrase);
    }
    expect(narrative).not.toMatch(/Красивее — не значит понятнее|Prettier is not clearer|好看不等于清楚/u);
    for (const layer of ['hero-title', 'hero-actions', 'hero-copy', 'workshop-art']) expect(chapters['3']).toContain(layer);
    for (const source of ['UI-kit', 'Modals', 'button-primary', 'button-secondary', '[modal=contact-modal]']) expect(chapters['4']).toContain(source);
    // The story stays visual-first: optional component syntax is closed, not
    // another essay above the figures. Native state/property guards live in
    // check-tutorial-assets; these short terms retain the explanation's scope.
    const notes = page.locator('.sl-markdown-content details');
    await expect(notes).toHaveCount(1);
    expect(await notes.getAttribute('open')).toBeNull();
    await expect(notes.locator('img')).toHaveCount(0);
    for (const property of ['State=default/hover/pressed/disabled', 'Focus visible=true', '[modal=contact-modal]']) {
      await expect(notes).toContainText(property);
    }
    expect(narrative).not.toContain('State=default/hover/pressed/disabled');
    const stateScope = {
      ru: ['не DFC-теги или виды страницы', 'не работающий прототип', 'Фокус независим', 'сочетаться с hover и pressed', 'Условие отключения', 'владелец', 'контракте реализации', 'Загрузки нет'],
      en: ['not DFC tags or page views', 'not a working prototype', 'Focus is independent', 'coexist with hover and pressed', 'condition and owner', 'implementation contract', 'No loading state'],
      zh: ['不是 DFC 标签或页面视图', '不是可运行原型', '焦点独立', 'hover、pressed 同时出现', '禁用条件与负责人', '实现契约', '不加加载态'],
    };
    for (const phrase of stateScope[locale]) await expect(notes).toContainText(phrase);
    const summary = notes.locator('summary');
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(notes).toHaveAttribute('open', '');
    await expect(notes.locator('code', { hasText: 'State=default/hover/pressed/disabled' })).toBeVisible();
    await page.keyboard.press('Space');
    expect(await notes.getAttribute('open')).toBeNull();
    for (const layer of ['hero-title', 'hero-actions']) expect(chapters['5']).toContain(layer);
    expect(chapters['5']).not.toMatch(/contact-button-mobile|выключен Auto Layout|Auto Layout is disabled|缺失 Auto Layout/u);
    expect(chapters['5']).toMatch(/2[^→\n]*→\s*0/u);
    const checkedScope = {
      ru: ['Только 375/1440', 'проверенную область макета', 'не готовое приложение'],
      en: ['Checked 375/1440 only', 'checked design scope', 'not a finished application'],
      zh: [/(?:只检查|仅)\s+375\/1440/u, '只指检查范围', '不是应用完成'],
    };
    for (const phrase of checkedScope[locale]) expect(chapters['5']).toMatch(phrase);
    const images = page.locator('.bridge-lesson-figure > img');
    await images.evaluateAll((items) => items.forEach((img) => { img.loading = 'eager'; }));
    await expect.poll(() => images.evaluateAll((items) => items.every((img) => img.complete && img.naturalWidth > 0 && img.alt.length > 0))).toBe(true);
    const assets = await figures.locator('figcaption a').evaluateAll((links) => [...new Set(links.map((link) => link.href))]);
    for (const asset of assets) expect((await request.get(asset)).ok(), asset).toBe(true);
    const file = page.locator('.sl-markdown-content a[href$="dfc-bridge-workshop.fig"]').first();
    const response = await request.get(await file.getAttribute('href'));
    expect(response.ok()).toBe(true);
    expect((await response.body()).subarray(0, 4).toString('hex')).toBe('504b0304');
    const result = await new AxeBuilder({ page }).analyze();
    expect(result.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${locale}: ${width}px`).toBe(true);
      const breathingRoom = await page.locator('.bridge-lesson-figure > img').evaluateAll((items) => items.every((img) => {
        const style = getComputedStyle(img);
        return ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].every((side) => Number.parseFloat(style[side]) >= 12);
      }));
      expect(breathingRoom, `${locale}: presentation image insets at ${width}px`).toBe(true);
      const nativeMotionInsets = Object.fromEntries(walkthroughMotion.clips.flatMap((clip) => clip.outputs.map(({ file, height }) => [file.split('/').at(-1), (clip.nativeTransform || clip.frames[0].nativeTransform).top / height])));
      const compactSpeech = await comments.evaluateAll((items, motionInsets) => items.every((comment) => {
        const bounds = comment.getBoundingClientRect();
        const speaker = comment.querySelector('img').getBoundingClientRect();
        const speech = comment.querySelector('p').getBoundingClientRect();
        const capture = comment.nextElementSibling;
        const frame = capture.getBoundingClientRect();
        const sourceTop = frame.top + (capture.tagName === 'VIDEO'
          ? frame.height * motionInsets[capture.getAttribute('src').split('/').at(-1)]
          : Number.parseFloat(getComputedStyle(capture).paddingTop));
        return bounds.height <= 160 && speaker.width >= 48 && speaker.width <= 64
          && speech.bottom <= speaker.top && speaker.bottom <= sourceTop + 1;
      }), nativeMotionInsets);
      expect(compactSpeech, `${locale}: compact speech above the speaker without covering source pixels at ${width}px`).toBe(true);
    }
  });

  test(`${locale} reader can reach the lesson from home, quick start and recipes`, async ({ page }) => {
    await page.goto(`${base}/${locale}/`);
    const lesson = page.locator(`a[href="${base}/${locale}/start/visual-walkthrough/"]`).first();
    await expect(lesson).toBeVisible();
    await lesson.click();
    await expect(page).toHaveURL(new RegExp(`${base}/${locale}/start/visual-walkthrough/?$`));
    for (const route of ['start/designer-quick-start/', 'examples/']) {
      await page.goto(`${base}/${locale}/${route}`);
      const content = page.locator('.sl-markdown-content');
      await expect(content.locator(`a[href="${base}/${locale}/start/visual-walkthrough/"]`).first()).toBeVisible();
      expect(await content.locator('.bridge-lesson-figure').count()).toBe(route === 'examples/' ? 8 : 1);
      const result = await new AxeBuilder({ page }).analyze();
      expect(result.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  });

  test(`${locale} illustrated guides preserve images and the lesson path`, async ({ page }) => {
    const routes = [
      'guides/design-rules', 'guides/layer-naming-and-identity', 'guides/responsive-breakpoints',
      'guides/interactions-and-targets', 'guides/wrapper-policy', 'guides/height-and-overflow',
      'quality/common-designer-mistakes', 'reference/validation-and-autochecks', 'project/team-adoption',
      'guides/components-and-ui-kit', 'guides/page-routing-and-views', 'reference/variation-axes',
    ];
    for (const route of routes) {
      await page.goto(`${base}/${locale}/${route}/`);
      const content = page.locator('.sl-markdown-content');
      const image = content.locator('.bridge-lesson-figure img');
      await expect(image).toHaveCount(1);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((img) => img.decode());
      expect(await image.evaluate((img) => img.alt.length > 0 && img.naturalWidth > 0 && Number(img.getAttribute('width')) > 0 && Number(img.getAttribute('height')) > 0)).toBe(true);
      await expect(content.locator(`a[href="${base}/${locale}/start/visual-walkthrough/"]`).first()).toBeVisible();
      await page.setViewportSize({ width: 320, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${locale}: ${route}`).toBe(true);
    }
  });
}
