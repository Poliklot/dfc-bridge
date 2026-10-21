import { readFileSync, writeFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import standaloneCode from 'ajv/dist/standalone/index.js';

const source = new URL('../validator/handoff.schema.json', import.meta.url);
const output = new URL('../validator/handoff-validator.mjs', import.meta.url);
const ajv = new Ajv2020({ strict: true, allErrors: false, code: { source: true, esm: true, lines: true } });
const validate = ajv.compile(JSON.parse(readFileSync(source, 'utf8')));
const code = '// Generated from handoff.schema.json; do not edit.\n' + standaloneCode(ajv, validate);
if (/\brequire\(/u.test(code)) throw new Error('The browser/headless validator must be self-contained.');
if (process.argv.includes('--check')) {
  if (readFileSync(output, 'utf8') !== code) throw new Error('Run node scripts/build-handoff-validator.mjs');
} else writeFileSync(output, code);
