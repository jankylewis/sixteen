import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createSession } from '../tools/harness.mjs';

async function replay(options, actions) {
  const session = await createSession(options);
  try {
    const results = [];
    for (const action of actions) results.push(await session.step({ action }));
    return results;
  } finally { await session.close(); }
}
const complete = ['inspect', 'reserve', 'reserve', 'inspect', 'finish'];

test('the same evidence contract distinguishes good and defective behavior', async () => {
  assert.equal((await replay({}, complete)).at(-1).outcome, 'pass');
  assert.equal((await replay({ fault: true }, complete)).at(-1).outcome, 'fail');
});
test('early completion and missing final readback remain unresolved', async () => {
  assert.equal((await replay({}, ['finish'])).at(-1).outcome, 'unresolved');
  assert.equal((await replay({}, ['inspect', 'reserve', 'reserve', 'finish'])).at(-1).outcome, 'unresolved');
});
test('budget exhaustion stops further actions', async () => {
  const results = await replay({ budget: 1 }, ['inspect', 'reserve', 'inspect']);
  assert.equal(results[1].outcome, 'unresolved');
  assert.equal(results[2].outcome, 'refused');
});
test('write before baseline and arbitrary commands are refused', async () => {
  assert.equal((await replay({}, ['reserve']))[0].outcome, 'refused');
  assert.equal((await replay({}, ['publish']))[0].outcome, 'refused');
  const session = await createSession();
  try {
    assert.equal((await session.step({ action: 'inspect', url: 'https://example.com' })).outcome, 'refused');
    assert.equal((await session.step({ action: 'inspect' })).outcome, 'refused');
  } finally { await session.close(); }
});

test('external decision adapter reports actual observations and an evidence-based verdict', () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('../tools/agent.mjs', import.meta.url))], {
    input: complete.map((action) => JSON.stringify({ action })).join('\n') + '\n', encoding: 'utf8', timeout: 10000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  const messages = result.stdout.trim().split('\n').map((line) => JSON.parse(line));
  assert.equal(messages[0].modelCalled, false);
  assert.equal(messages.at(-1).outcome, 'pass');
  assert.equal(messages.at(-1).trace.at(-1).count, 1);
});

test('CLI refuses malformed proposals and unsupported AXI operations', () => {
  const invalid = spawnSync(process.execPath, [fileURLToPath(new URL('../tools/agent.mjs', import.meta.url))], {
    input: '{bad}\n', encoding: 'utf8', timeout: 10000,
  });
  assert.ifError(invalid.error);
  assert.equal(JSON.parse(invalid.stdout.trim().split('\n').at(-1)).outcome, 'refused');
  const unsupported = spawnSync(process.execPath, [fileURLToPath(new URL('../tools/axi.mjs', import.meta.url)), 'publish'], {
    encoding: 'utf8', timeout: 10000,
  });
  assert.ifError(unsupported.error);
  assert.equal(unsupported.status, 2);
  assert.equal(JSON.parse(unsupported.stdout).outcome, 'refused');
});
