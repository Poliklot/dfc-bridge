import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const catalog = JSON.parse(readFileSync(`${root}/validator/rules.json`, 'utf8'));

const issues = [];
const catalogIds = catalog.rules.map((rule) => rule.id);
const catalogIdSet = new Set(catalogIds);

if (catalogIdSet.size !== catalogIds.length) {
  issues.push('validator/rules.json содержит повторяющиеся идентификаторы правил');
}

const stripCodeAndKnownNames = (value) =>
  value
    .replace(/`[^`]*`/gu, ' ')
    .replace(/<[^>]*>/gu, ' ')
    .replace(/\b(?:DFC Bridge|Figma|Escape|Lottie|kebab-case)\b/giu, ' ');

const untranslatedPhrasePattern =
  /(?:\b[A-Za-z][A-Za-z-]{2,}\b(?:[\s,;:()—–-]+|$)){4,}/gu;

// Same layer-tag grammar as check-validator-contracts.mjs. Compare literal
// examples, not translated prose or the number/order of repeated mentions.
const tagTokens = (value) =>
  [...new Set(value.match(/\[[a-z][a-z0-9-]*(?:=[^\]\r\n]*)?\]/gu) || [])].sort();

for (const locale of ['ru', 'zh']) {
  const source = `src/data/rules.${locale}.json`;
  const localization = JSON.parse(readFileSync(`${root}/${source}`, 'utf8'));
  if (!localization || typeof localization !== 'object' || Array.isArray(localization)) {
    issues.push(`${source}: ожидается объект локализаций по идентификаторам правил`);
    continue;
  }

  for (const id of catalogIds) {
    if (!Object.hasOwn(localization, id)) issues.push(`${source} ${id}: отсутствует локализация`);
  }
  for (const id of Object.keys(localization)) {
    if (!catalogIdSet.has(id)) {
      issues.push(`${source} ${id}: лишняя локализация без соответствующего правила в каталоге`);
    }
  }

  for (const rule of catalog.rules) {
    if (!Object.hasOwn(localization, rule.id)) continue;
    const entry = localization[rule.id];
    const label = `${source} ${rule.id}`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      issues.push(`${label}: ожидается объект с полями title, description и fix`);
      continue;
    }

    if (Object.keys(entry).sort().join(',') !== 'description,fix,title') {
      issues.push(`${label}: ожидаются только поля title, description и fix`);
    }

    for (const field of ['title', 'description', 'fix']) {
      const value = entry[field];
      const minimumLength = locale === 'ru' ? (field === 'title' ? 5 : 20) : (field === 'title' ? 2 : 8);
      if (typeof value !== 'string' || value.trim().length < minimumLength) {
        issues.push(`${label}.${field}: перевод отсутствует или слишком короткий`);
        continue;
      }

      if (locale === 'ru') {
        const minimumRussianLetters = field === 'title' ? 3 : 8;
        if ((value.match(/[А-ЯЁа-яё]/gu) ?? []).length < minimumRussianLetters) {
          issues.push(`${label}.${field}: в переводе недостаточно русского текста`);
        }
        const untranslated = stripCodeAndKnownNames(value).match(untranslatedPhrasePattern);
        if (untranslated) {
          issues.push(`${label}.${field}: проверьте непереведённый английский фрагмент «${untranslated[0].trim()}»`);
        }
      } else if ((value.match(/[\u3400-\u9fff]/gu) || []).length < 2) {
        issues.push(`${label}.${field}: в переводе недостаточно китайского текста`);
      }

      if (field !== 'title') {
        if (value.trim() === rule[field].trim()) {
          issues.push(`${label}.${field}: вместо перевода скопирован английский оригинал`);
        }
        const expectedTags = tagTokens(rule[field]);
        const actualTags = tagTokens(value);
        if (JSON.stringify(actualTags) !== JSON.stringify(expectedTags)) {
          issues.push(`${label}.${field}: буквальные теги должны совпадать с оригиналом; ожидаются ${JSON.stringify(expectedTags)}, получены ${JSON.stringify(actualTags)}`);
        }
      }
    }
  }
}

if (issues.length > 0) {
  console.error(`Проверка локализации правил нашла ${issues.length} проблем:\n`);
  console.error(issues.join('\n'));
  process.exit(1);
}

console.log(`Локализации правил RU/ZH проверены: по ${catalogIds.length} из ${catalogIds.length}.`);
