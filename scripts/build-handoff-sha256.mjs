import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('..', import.meta.url));
const output = new URL('../validator/handoff-sha256.mjs', import.meta.url);
const result = await build({
  absWorkingDir: root,
  stdin: { contents: "export { sha256 } from '@noble/hashes/sha2.js';", resolveDir: root },
  bundle: true, write: false, format: 'iife', globalName: 'DFCBridgeSHA256',
  platform: 'browser', target: 'es2020', legalComments: 'eof',
});
const code = '// Generated from pinned @noble/hashes; see handoff-sha256.LICENSE. Do not edit.\n' + result.outputFiles[0].text + '\nexport const sha256 = DFCBridgeSHA256.sha256;\n';
const license = readFileSync(new URL('../node_modules/@noble/hashes/LICENSE', import.meta.url), 'utf8');
for (const [target, content] of [[output, code], [new URL('../validator/handoff-sha256.LICENSE', import.meta.url), license]]) {
  if (process.argv.includes('--check')) {
    if (readFileSync(target, 'utf8') !== content) throw new Error('Run node scripts/build-handoff-sha256.mjs');
  } else writeFileSync(target, content);
}
