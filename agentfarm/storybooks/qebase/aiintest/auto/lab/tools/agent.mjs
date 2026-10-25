import { createInterface } from 'node:readline';
import { createSession } from './harness.mjs';

const session = await createSession({ fault: process.argv.includes('--fault=duplicate') });
const emit = (value) => console.log(JSON.stringify(value));
try {
  if (process.argv.includes('--replay')) {
    emit({ mode: 'scripted replay', modelCalled: false });
    for (const action of ['inspect', 'reserve', 'reserve', 'inspect', 'finish']) emit(await session.step({ action }));
  } else {
    emit({ mode: 'external decision adapter', help: ['Send one JSON line: {"action":"inspect"}', 'Then choose reserve, inspect, or finish from the observation.'], modelCalled: false });
    const input = createInterface({ input: process.stdin });
    let ended = false;
    for await (const line of input) {
      let proposal;
      try { proposal = JSON.parse(line); }
      catch { emit({ outcome: 'refused', reason: 'Malformed JSON' }); ended = true; break; }
      const result = await session.step(proposal); emit(result);
      if (result.outcome !== 'observed') { ended = true; break; }
    }
    input.close();
    if (!ended) emit({ outcome: 'unresolved', reason: 'Input ended before completion' });
  }
} finally { await session.close(); }
