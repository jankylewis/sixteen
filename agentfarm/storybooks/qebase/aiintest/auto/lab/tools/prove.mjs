import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const suite = fileURLToPath(new URL('../tests/api.test.mjs', import.meta.url));
for (const faulty of [true, false]) {
  const result = spawnSync(process.execPath, ['--test', suite], {
    env: { ...process.env, LAB_FAULT: faulty ? 'duplicate' : '' }, encoding: 'utf8', timeout: 20000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  if (faulty) {
    assert.equal(result.status, 1, 'The defect must produce a test failure');
    assert.match(result.stdout + result.stderr, /readback must contain exactly one reservation/);
    console.log('PROVEN RED: duplicate insertion was caught by independent readback.');
  } else {
    assert.equal(result.status, 0, 'The correct implementation must pass');
    console.log('PROVEN GREEN: correct behavior passes the same suite.');
  }
}
