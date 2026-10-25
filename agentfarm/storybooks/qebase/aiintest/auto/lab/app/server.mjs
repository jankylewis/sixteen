import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const page = await readFile(new URL('./index.html', import.meta.url));
const books = [{ id: 'book-1', title: 'The Test Garden', available: true },
  { id: 'book-2', title: 'The Missing Moon', available: false }];
function json(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(value));
}

export async function startLibrary({ port = 0, fault = false } = {}) {
  const reservations = [];
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    if (request.method === 'GET' && url.pathname === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(page); return;
    }
    if (request.method === 'GET' && url.pathname === '/api/books') {
      json(response, 200, books); return;
    }
    if (url.pathname !== '/api/reservations') { json(response, 404, { error: 'Not found' }); return; }
    const reader = request.headers['x-reader'];
    if (typeof reader !== 'string' || !/^[a-zA-Z0-9_-]{1,40}$/.test(reader)) {
      json(response, 400, { error: 'Supply a synthetic X-Reader (1–40 letters, digits, _ or -)' }); return;
    }
    if (request.method === 'GET') {
      json(response, 200, reservations.filter((item) => item.reader === reader)); return;
    }
    if (request.method !== 'POST') { json(response, 405, { error: 'Method not allowed' }); return; }
    let body = '';
    try {
      for await (const chunk of request) {
        body += chunk.toString();
        if (Buffer.byteLength(body) > 4096) { json(response, 413, { error: 'Body too large' }); return; }
      }
      const value = JSON.parse(body);
      if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length !== 1 || typeof value.book !== 'string') {
        json(response, 400, { error: 'Expected only a book string' }); return;
      }
      const book = books.find((item) => item.id === value.book);
      if (!book) { json(response, 400, { error: 'Unknown book' }); return; }
      if (!book.available) { json(response, 409, { error: 'Book unavailable' }); return; }
      const duplicate = reservations.some((item) => item.reader === reader && item.book === book.id);
      if (!duplicate || fault) reservations.push({ id: reservations.length + 1, reader, book: book.id });
      json(response, duplicate ? 409 : 201, duplicate ? { error: 'Duplicate reservation' } : { message: 'Reserved' });
    } catch (error) {
      if (error instanceof SyntaxError) json(response, 400, { error: 'Malformed JSON' });
      else { response.destroy(); }
    }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve); });
  const address = server.address();
  return { url: `http://127.0.0.1:${address.port}`, close: () => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve()); server.closeIdleConnections();
  }) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const app = await startLibrary({ port: 4173, fault: process.argv.includes('--fault=duplicate') });
  console.log(`Pocket Library: ${app.url} (synthetic local data; restart to reset)`);
  process.on('SIGINT', async () => { await app.close(); process.exit(0); });
}
