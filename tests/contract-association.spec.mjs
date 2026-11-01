import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createContractAssociation, inspectContractAssociation } from '../validator/contract-association.mjs';

const base = '/dfc-bridge';
const locales = {
  en: {
    heading: 'Bind a saved snapshot to an authored contract',
    packageHeading: 'Attached package report',
    localOnly: 'not a published plugin button or an available Assistant CLI command',
    derivedOnly: 'not another authored contract or evidence of a live Figma connection',
    noNetwork: 'does not fetch external references or send design data to a model',
    schemaLabel: 'association schema', byteLimit: '2 MiB',
  },
  ru: {
    heading: 'Связать сохранённый снимок с авторским контрактом',
    packageHeading: 'Отчёт пакета с привязанным контрактом',
    localOnly: 'не опубликованная кнопка плагина или доступная команда Assistant CLI',
    derivedOnly: 'не второй авторский контракт и не доказательство живой связи с Figma',
    noNetwork: 'не загружает внешние ссылки и не отправляет дизайн модели',
    schemaLabel: 'схема связи', byteLimit: '2 МиБ',
  },
  zh: {
    heading: '将保存的快照与作者契约绑定',
    packageHeading: '附带契约的包报告',
    localOnly: '并不表示插件已发布对应按钮或 Assistant CLI 已提供对应命令',
    derivedOnly: '它不是另一份作者契约，也不是实时连接 Figma 的证据',
    noNetwork: '不会自动获取外部引用，也不会把设计发送给模型',
    schemaLabel: '关联模式', byteLimit: '2 MiB',
  },
};

// Select only the new section, not matching words elsewhere in the long
// transfer guide. Starlight wraps accessible headings in separate divs.
async function associationSection(page) {
  return page.locator('#contract-association').evaluate(anchor => {
    let current = anchor.closest('p').nextElementSibling;
    let headings = 0;
    const parts = [];
    while (current) {
      if (current.querySelector('h2') && ++headings > 1) break;
      parts.push(current.textContent);
      current = current.nextElementSibling;
    }
    return parts.join('\n').replace(/\s+/gu, ' ');
  });
}

for (const [locale, copy] of Object.entries(locales)) {
  test(`${locale}: association instructions retain accessible scope, readonly-source example and non-release limitations`, async ({ page, request }) => {
    await page.goto(`${base}/${locale}/reference/transfer-contract/#contract-association`);
    const heading = page.getByRole('heading', { name: copy.heading, exact: true, level: 2 });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
    const permalink = heading.locator('..').getByRole('link');
    await permalink.focus();
    await expect(permalink).toBeFocused();
    await permalink.press('Enter');
    const expectedHash = '#' + await heading.getAttribute('id');
    await expect.poll(() => decodeURIComponent(new URL(page.url()).hash)).toBe(expectedHash);
    const packageHeading = page.getByRole('heading', { name: copy.packageHeading, exact: true, level: 3 });
    await packageHeading.scrollIntoViewIfNeeded();
    await expect(packageHeading).toBeVisible();

    const text = await associationSection(page);
    for (const expected of [copy.localOnly, copy.derivedOnly, copy.noNetwork,
      'Node.js 22.12', 'contexts.json', 'contextId', 'rootId',
      'bridge.lifecycle.contractRevision', 'bridge.source.documentId',
      'snapshotRevision', 'contractSha256', 'bridge.lifecycle.sourceRevision',
      'handoffReady: false', 'readinessClaim: none', 'decisionVerified: false',
      'dfc-bridge-attached-package-manifest', 'snapshotPackage', 'authoredContract',
      'provided-authored', 'declared-empty', 'not-provided', 'not-attached',
      'missing', 'stale', 'invalid', 'partial', 'unverified', 'linked', copy.byteLimit, '64']) {
      expect(text).toContain(expected);
    }
    expect(text).toMatch(/200[,. ]?000/u);
    // The canonical guide demonstrates the pure repository helper, not a
    // promised released Assistant command or an in-browser contract editor.
    expect(text).toContain("await readFile('snapshot.json', 'utf8')");
    expect(text).toContain("await readFile('contract.json', 'utf8')");
    expect(text).toContain("await writeFile('association.json'");
    expect(text).toContain("flag: 'wx'");
    expect(text).not.toMatch(/writeFile\(['"](?:snapshot|contract)\.json/u);
    expect(text).not.toContain('node bin/dfc-bridge.mjs contract-bind');

    const schemaLink = page.getByRole('link', { name: copy.schemaLabel, exact: true });
    await expect(schemaLink).toHaveAttribute('href', `${base}/schema/contract-association.schema.json`);
    for (const name of ['handoff.valid.json', 'bridge-associated-contract.valid.json', 'contract-association.valid.json']) {
      const link = page.locator(`main a[href$="/${name}"]`).first();
      await expect(link).toHaveAttribute('href', `${base}/data/${name}`);
      expect((await link.innerText()).trim()).not.toBe('');
      const response = await request.get(await link.getAttribute('href'));
      expect(response.ok()).toBe(true);
      expect(response.headers()['content-type']).toContain('application/json');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

// Independent from canonicalHandoffJSON/the bundled SHA implementation: these
// synthetic full JSON fixtures have ordinary JSON keys and finite JSON values.
function independentlyCanonical(value) {
  if (Array.isArray(value)) return '[' + value.map(independentlyCanonical).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + independentlyCanonical(value[key])).join(',') + '}';
  return JSON.stringify(value);
}

test('public association fixtures and schema aliases preserve exact bytes and independently verifiable linkage', async ({ request }) => {
  const downloaded = {};
  for (const name of ['handoff.valid.json', 'bridge-associated-contract.valid.json', 'contract-association.valid.json']) {
    const response = await request.get(`${base}/data/${name}`);
    expect(response.ok()).toBe(true);
    const body = await response.body();
    expect(body.equals(await readFile(new URL(`../validator/examples/${name}`, import.meta.url)))).toBe(true);
    downloaded[name] = body.toString('utf8');
  }
  for (const name of ['bridge.schema.json', 'contract-association.schema.json']) {
    const original = await readFile(new URL(`../validator/${name}`, import.meta.url));
    for (const directory of ['schema', 'data']) {
      const response = await request.get(`${base}/${directory}/${name}`);
      expect(response.ok()).toBe(true);
      expect(response.headers()['content-type']).toContain('application/json');
      expect((await response.body()).equals(original)).toBe(true);
    }
  }

  const snapshotText = downloaded['handoff.valid.json'];
  const contractText = downloaded['bridge-associated-contract.valid.json'];
  const associationText = downloaded['contract-association.valid.json'];
  const contract = JSON.parse(contractText), association = JSON.parse(associationText);
  const independentDigest = createHash('sha256').update(independentlyCanonical(contract), 'utf8').digest('hex');
  expect(independentDigest).toBe(association.contractSha256);
  // Publishing must not rewrite $schema to a local alias: it participates in
  // the full contract digest. Aliases above are served separately, byte-exact.
  const bridgeSchema = JSON.parse(await readFile(new URL('../validator/bridge.schema.json', import.meta.url), 'utf8'));
  expect(contract.$schema).toBe(bridgeSchema.$id);
  expect(new URL(contract.$schema).protocol).toBe('https:');

  const created = await createContractAssociation(snapshotText, contractText, { contexts: association.contexts });
  expect(created.association).toEqual(association);
  const report = await inspectContractAssociation(snapshotText, contractText, associationText);
  expect(report.status).toBe('linked');
  expect(report.handoffReady).toBe(false);
  expect(report.readinessClaim).toBe('none');
  expect(report.nativeSourceRevision).toBe(contract.bridge.source.revision);
  expect(report.lifecycleSourceRevision).toBe(contract.bridge.lifecycle.sourceRevision);
  expect(report.contractRevision).toBe(contract.bridge.lifecycle.contractRevision);
  expect(report.questionRefs).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'contact-action', blocking: true, status: 'open' })]));

  const mutableSnapshot = JSON.parse(snapshotText);
  const before = JSON.stringify([mutableSnapshot, contract, association]);
  const immutableInputReport = await inspectContractAssociation(mutableSnapshot, contract, association);
  expect(immutableInputReport.status).toBe('linked');
  expect(JSON.stringify([mutableSnapshot, contract, association])).toBe(before);
  contract.bridge.openQuestions[0].question += ' Changed only after publication.';
  const stale = await inspectContractAssociation(snapshotText, contract, associationText);
  expect(stale.status).toBe('stale');
  expect(stale.handoffReady).toBe(false);
  expect(stale.errors[0].code).toBe('contract-digest-mismatch');
});
