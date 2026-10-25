const [command, reader = 'qe-one', ...extra] = process.argv.slice(2);
const help = ['node tools/axi.mjs books', 'node tools/axi.mjs inspect qe-one'];
if (!command) console.log(JSON.stringify({ outcome: 'help', help }));
else if (!['books', 'inspect'].includes(command) || extra.length || !/^[a-zA-Z0-9_-]{1,40}$/.test(reader)) {
  console.log(JSON.stringify({ outcome: 'refused', reason: 'Unknown command or invalid synthetic reader', help })); process.exitCode = 2;
} else {
  try {
    const response = await fetch(`http://127.0.0.1:4173/api/${command === 'books' ? 'books' : 'reservations'}`, {
      headers: { 'X-Reader': reader }, signal: AbortSignal.timeout(3000), redirect: 'error',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const records = await response.json();
    if (!Array.isArray(records)) throw new Error('Expected a record array');
    console.log(JSON.stringify({ outcome: 'observed', scope: { command, reader }, records, help }));
  } catch (error) {
    console.log(JSON.stringify({ outcome: 'unavailable', reason: error.message, help: ['Start the local demo with npm start', ...help] })); process.exitCode = 1;
  }
}
