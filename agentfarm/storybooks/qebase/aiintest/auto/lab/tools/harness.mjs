import { startLibrary } from '../app/server.mjs';

export async function createSession({ fault = false, budget = 5 } = {}) {
  if (!Number.isInteger(budget) || budget < 1 || budget > 8) throw new Error('Budget must be 1–8');
  const app = await startLibrary({ fault });
  const trace = [];
  let stopped = false;
  function verdict() {
    const writes = trace.filter((entry) => entry.action === 'reserve');
    const baseline = trace[0];
    const last = trace.at(-1);
    if (baseline?.action !== 'inspect' || baseline.count !== 0 || writes.length !== 2 ||
        writes[0].status !== 201 || writes[1].status !== 409 || last?.action !== 'inspect') return 'unresolved';
    return last.count === 1 ? 'pass' : 'fail';
  }
  async function step(proposal) {
    if (stopped) return { outcome: 'refused', reason: 'Session stopped' };
    if (!proposal || typeof proposal !== 'object' || Array.isArray(proposal) ||
        Object.keys(proposal).length !== 1 || !['inspect', 'reserve', 'finish'].includes(proposal.action)) {
      stopped = true; return { outcome: 'refused', reason: 'Expected only action: inspect, reserve, or finish' };
    }
    if (proposal.action === 'finish') { stopped = true; return { outcome: verdict(), trace: [...trace] }; }
    if (trace.length >= budget) { stopped = true; return { outcome: 'unresolved', reason: 'Tool budget exhausted', trace: [...trace] }; }
    if (proposal.action === 'reserve' && !trace.some((entry) => entry.action === 'inspect')) {
      stopped = true; return { outcome: 'refused', reason: 'Inspect the baseline before writing' };
    }
    try {
      const response = await fetch(`${app.url}/api/reservations`, {
        method: proposal.action === 'reserve' ? 'POST' : 'GET',
        headers: { 'X-Reader': 'qe-agent', 'Content-Type': 'application/json' },
        ...(proposal.action === 'reserve' ? { body: JSON.stringify({ book: 'book-1' }) } : {}),
        signal: AbortSignal.timeout(3000), redirect: 'error',
      });
      const value = await response.json();
      if (proposal.action === 'inspect' && (!response.ok || !Array.isArray(value) || value.some((record) => record.reader !== 'qe-agent' || record.book !== 'book-1'))) {
        stopped = true; return { outcome: 'unresolved', reason: 'Readback contract failed' };
      }
      const observation = { action: proposal.action, status: response.status, ...(Array.isArray(value) ? { count: value.length } : { message: value.message ?? value.error }) };
      trace.push(observation);
      return { outcome: 'observed', observation, remaining: budget - trace.length };
    } catch {
      stopped = true; return { outcome: 'unresolved', reason: 'Tool response unavailable; write outcome may be unknown' };
    }
  }
  return { step, close: app.close };
}
