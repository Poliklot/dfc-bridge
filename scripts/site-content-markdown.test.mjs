import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { readMarkdownContent } from './site-content-markdown.mjs';

for (const [locale, title, paragraph] of [
  ['en', 'Design handoff', 'Use **stable names** and [real targets](targets.md).'],
  ['ru', 'Передача макета', 'Используйте **стабильные имена** и [настоящие цели](targets.md).'],
  ['zh', '设计交付', '使用**稳定名称**和[真实目标](targets.md)。'],
]) {
  test(`${locale}: title and description ignore compatibility anchors and comments`, () => {
    const raw = `<!-- Published compatibility anchor follows. -->\n<a id="old-title"></a>\n\n# ${title}\n\n<a id="old-intro"></a>\n\n${paragraph}\n`;
    const actual = readMarkdownContent(raw, { source: 'fixture.md', locale });
    assert.equal(actual.title, title);
    assert.equal(actual.description, paragraph.replace(/\*\*/gu, '').replace(/\[([^\]]+)\]\([^)]+\)/gu, '$1'));
    assert(actual.body.includes('<a id="old-title"></a>'));
    assert(actual.body.includes('<a id="old-intro"></a>'));
    assert(actual.body.includes('<!-- Published compatibility anchor follows. -->'));
    assert(!actual.body.includes(`# ${title}`));
    assert(actual.body.includes(paragraph));
  });
}

test('title at file start and an anchor after it preserve the authored body', () => {
  const actual = readMarkdownContent('# Title\n\n<a id="intro"></a>\n\nA useful summary.\n', { locale: 'en' });
  assert.equal(actual.body, '<a id="intro"></a>\n\nA useful summary.\n');
  assert.equal(actual.description, 'A useful summary.');
});

test('code, images, HTML media and lists are not mistaken for title or summary', () => {
  const raw = '# Real title\n\n```md\n# Example heading\n```\n\n![Preview](preview.png)\n\n<figure>\n<figcaption>Not the introduction.</figcaption>\n</figure>\n\n- A list item\n\nA **real** summary with `bridge` and &amp; entities.\n';
  const actual = readMarkdownContent(raw, { locale: 'en' });
  assert.equal(actual.title, 'Real title');
  assert.equal(actual.description, 'A real summary with bridge and & entities.');
  assert(actual.body.includes('# Example heading'));
  assert(actual.body.includes('<figure>'));
});

test('explicit descriptions win and fallback stays localized', () => {
  for (const [locale, fallback] of [['en', 'DFC Bridge documentation.'], ['ru', 'Документация DFC Bridge.'], ['zh', 'DFC Bridge 中文文档。']]) {
    assert.equal(readMarkdownContent('# Title\n', { locale }).description, fallback);
    assert.equal(readMarkdownContent('# Title\n\nAutomatic.\n', { locale, descriptions: { [locale]: 'Explicit description.' } }).description, 'Explicit description.');
  }
});

test('exactly one real top-level title is required', () => {
  for (const raw of ['No heading.', '# One\n\n# Two\n', '```md\n# Example only\n```']) {
    assert.throws(() => readMarkdownContent(raw, { source: 'fixture.md' }), /Expected exactly one H1 in fixture.md/u);
  }
});

test('description truncation does not split a Unicode character', () => {
  const actual = readMarkdownContent(`# Title\n\n${'😀'.repeat(221)}\n`);
  assert.equal(Array.from(actual.description).length, 220);
  assert.equal(actual.description, '😀'.repeat(220));
});

test('every registered EN/RU/ZH source produces text metadata and removes only its title', () => {
  const manifest = JSON.parse(readFileSync(new URL('../validator/site-content.json', import.meta.url), 'utf8'));
  for (const entry of manifest.pages) for (const locale of manifest.locales) {
    const source = entry.source[locale];
    const raw = readFileSync(new URL(`../${source}`, import.meta.url), 'utf8').replace(/\r\n?/gu, '\n');
    const actual = readMarkdownContent(raw, { source, locale, descriptions: entry.description });
    assert(actual.title, `${source}: title`);
    assert(actual.description, `${source}: description`);
    assert(!/<\/?[a-z][\s>]/iu.test(actual.description), `${source}: HTML leaked into description`);
    const authoredAnchors = raw.match(/<a\s+id=[^>]+><\/a>/gu) || [];
    for (const anchor of authoredAnchors) assert(actual.body.includes(anchor), `${source}: preserved ${anchor}`);
  }
});
