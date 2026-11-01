import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import standaloneCode from 'ajv/dist/standalone/index.js';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('..', import.meta.url));
for (const name of ['bridge', 'contract-association']) {
  const source = new URL(`../validator/${name}.schema.json`, import.meta.url);
  const output = new URL(`../validator/${name}-validator.mjs`, import.meta.url);
  const schema = JSON.parse(readFileSync(source, 'utf8'));
  const ajv = new Ajv2020({ strict: true, strictRequired: false, allErrors: false, code: { source: true, esm: true, lines: true } });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  let sourceCode = standaloneCode(ajv, validate);
  if (name === 'bridge') {
    sourceCode += `\nexport const bridgeSchema = ${JSON.stringify(schema)};\n`;
    sourceCode += `export const supportedVersions = ${JSON.stringify({ contractVersion: schema.$defs.bridge.properties.contractVersion.const, methodologyVersion: JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version, rulesVersion: JSON.parse(readFileSync(new URL('../validator/rules.json', import.meta.url), 'utf8')).version })};\n`;
  }
  // Ajv formats and unicode length helpers are bundled at build time. The
  // distributed validator imports neither Ajv nor a Node runtime module.
  const result = await build({
    absWorkingDir: root,
    stdin: { contents: sourceCode, resolveDir: root, sourcefile: `${name}-standalone.mjs`, loader: 'js' },
    bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2020', legalComments: 'eof',
  });
  // Bundled Ajv helpers retain compiler-only .code strings referring to their
  // original module. Standalone runtime never reads those compiler annotations.
  const bundled = result.outputFiles[0].text.replace(/^\s*\w+\.code = '[^\n]*require\([^\n]*';\n/gmu, '');
  const notices = ['ajv', 'ajv-formats', 'fast-deep-equal'].map(packageName => `/* Bundled ${packageName} runtime helpers\n${readFileSync(new URL(`../node_modules/${packageName}/LICENSE`, import.meta.url), 'utf8')}\n*/\n`).join('');
  const code = `// Generated from ${name}.schema.json with pinned Ajv/formats; do not edit.\n` + notices + bundled;
  if (/\brequire\s*\(|\bimport\s*\(|\bfrom\s+["']/u.test(code)) throw new Error('The browser/headless validator must be self-contained.');
  if (process.argv.includes('--check')) {
    if (readFileSync(output, 'utf8') !== code) throw new Error('Run node scripts/build-contract-association-validator.mjs');
  } else writeFileSync(output, code);
}
