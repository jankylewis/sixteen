import assert from 'node:assert/strict';
import test from 'node:test';
import { startLibrary } from '../app/server.mjs';

async function scenario(run) {
  const app = await startLibrary({ fault: process.env.LAB_FAULT === 'duplicate' });
  const request = (path, options = {}, reader = 'qe-one') => fetch(`${app.url}${path}`, {
    ...options, headers: { 'X-Reader': reader, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(3000),
  });
  try { await run(request); } finally { await app.close(); }
}
const reserve = (book = 'book-1') => ({ method: 'POST', body: JSON.stringify({ book }) });

test('duplicate rejection leaves exactly one scoped record', async () => {
  await scenario(async (request) => {
    assert.deepEqual(await (await request('/api/reservations')).json(), []);
    assert.equal((await request('/api/reservations', reserve())).status, 201);
    assert.equal((await request('/api/reservations', reserve())).status, 409);
    const records = await (await request('/api/reservations')).json();
    assert.equal(records.length, 1, 'readback must contain exactly one reservation');
    assert.equal(records[0].reader, 'qe-one');
    assert.equal(records[0].book, 'book-1');
  });
});

test('different readers have isolated reservations', async () => {
  await scenario(async (request) => {
    await request('/api/reservations', reserve(), 'qe-one');
    assert.deepEqual(await (await request('/api/reservations', {}, 'qe-two')).json(), []);
    assert.equal((await request('/api/reservations', reserve(), 'qe-two')).status, 201);
    const records = await (await request('/api/reservations', {}, 'qe-two')).json();
    assert.equal(records.length, 1);
    assert.equal(records[0].reader, 'qe-two');
  });
});

test('invalid input and unavailable books do not create records', async () => {
  await scenario(async (request) => {
    assert.equal((await request('/api/reservations', reserve('book-2'))).status, 409);
    assert.equal((await request('/api/reservations', reserve('missing'))).status, 400);
    assert.equal((await request('/api/reservations', { method: 'POST', body: '{' })).status, 400);
    assert.equal((await request('/api/reservations', { method: 'POST', body: 'null' })).status, 400);
    assert.equal((await request('/api/reservations', reserve(), '')).status, 400);
    assert.equal((await request('/api/reservations', { method: 'POST', body: JSON.stringify({ book: 'book-1', admin: true }) })).status, 400);
    assert.deepEqual(await (await request('/api/reservations')).json(), []);
  });
});

test('concurrent requests preserve one record', async () => {
  await scenario(async (request) => {
    const responses = await Promise.all([request('/api/reservations', reserve()), request('/api/reservations', reserve())]);
    assert.deepEqual(responses.map((response) => response.status).sort(), [201, 409]);
    assert.equal((await (await request('/api/reservations')).json()).length, 1);
  });
});
