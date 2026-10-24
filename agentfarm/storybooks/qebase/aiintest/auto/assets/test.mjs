import assert from 'node:assert/strict';
import { cp, mkdtemp, appendFile, unlink, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const book = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docs = resolve(book, '../../../../docs/storybooks/qebase/aiintest/auto');

async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'sixteen-book-check-'));
  const output = join(root, 'storybooks/qebase/aiintest/auto');
  const source = join(root, 'docs/storybooks/qebase/aiintest/auto');
  try {
    await cp(book, output, { recursive: true });
    await cp(docs, source, { recursive: true });
    await run({ output, source });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function runCheck(output, script, args = []) {
  const result = spawnSync(process.execPath, [join(output, 'assets', script), ...args], {
    encoding: 'utf8', timeout: 10000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  return result;
}

test('valid published book passes structural and regeneration checks', async () => {
  await fixture(async ({ output }) => {
    for (const [script, args] of [['verify.mjs', []], ['build.mjs', ['--check']]]) {
      const result = runCheck(output, script, args);
      assert.equal(result.status, 0, result.stderr);
    }
  });
});

test('a missing chapter is rejected through its inbound links', async () => {
  await fixture(async ({ output }) => {
    await unlink(join(output, 'foundations/CHAPTER_01_MODELS.html'));
    const result = runCheck(output, 'verify.mjs');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /ENOENT|Missing file/);
  });
});

test('hand-edited HTML is rejected as stale generated output', async () => {
  await fixture(async ({ output }) => {
    await appendFile(join(output, 'index.html'), '<p>Unreviewed edit</p>');
    const result = runCheck(output, 'build.mjs', ['--check']);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Stale generated page/);
  });
});

test('a sixth entry is rejected rather than silently flattening HD', async () => {
  await fixture(async ({ output, source }) => {
    await writeFile(join(source, 'foundations/EXTRA.md'), '# Extra\n');
    const result = runCheck(output, 'verify.mjs');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /HD fan-out exceeded/);
  });
});

test('over-limit Markdown is rejected', async () => {
  await fixture(async ({ output, source }) => {
    await appendFile(join(source, 'foundations/CHAPTER_01_MODELS.md'), '\nextra line'.repeat(201));
    const result = runCheck(output, 'verify.mjs');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Markdown line cap/);
  });
});
