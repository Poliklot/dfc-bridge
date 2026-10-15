import { fromMarkdown } from 'mdast-util-from-markdown';

function textContent(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  if (node.type === 'break') return ' ';
  // Images and raw HTML (including compatibility anchors) are not summaries.
  return node.children?.map(textContent).join('') || '';
}

export function readMarkdownContent(markdown, { source, locale, descriptions } = {}) {
  const tree = fromMarkdown(markdown);
  const headings = tree.children.filter((node) => node.type === 'heading' && node.depth === 1);
  if (headings.length !== 1) {
    throw new Error(`Expected exactly one H1 in ${source}; found ${headings.length}.`);
  }

  const heading = headings[0];
  // Remove the parsed title only, not leading anchors/comments or a code sample
  // which happens to contain a line starting with '#'. Positions retain both.
  const body = (markdown.slice(0, heading.position.start.offset)
    + markdown.slice(heading.position.end.offset)).replace(/^\n+/u, '');
  const paragraph = tree.children
    .filter((node) => node.type === 'paragraph')
    .map((node) => textContent(node).replace(/\s+/gu, ' ').trim())
    .find((text) => text && !text.startsWith('|'));
  const fallback = locale === 'ru' ? 'Документация DFC Bridge.'
    : locale === 'zh' ? 'DFC Bridge 中文文档。' : 'DFC Bridge documentation.';

  return {
    title: textContent(heading).trim(),
    body,
    description: descriptions?.[locale] || Array.from(paragraph || fallback).slice(0, 220).join(''),
  };
}
