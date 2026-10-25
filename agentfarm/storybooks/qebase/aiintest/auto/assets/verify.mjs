import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const book = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sources = resolve(book, '../../../../docs/storybooks/qebase/aiintest/auto');
const required = ['Outcome', 'Know', 'Worked example', 'Starter prompt', 'Do', 'Verify', 'Deliver', 'Exercise', 'Answer guide'];
let links = 0;
let chapters = 0;
let pages = 0;
const stylesheet = await readFile(join(book, 'assets/style.css'), 'utf8');
assert(!stylesheet.includes('@import'), 'The offline reader must not import remote styles');
for (const match of stylesheet.matchAll(/url\('([^']+)'\)/g)) {
  assert(!match[1].includes(':'), 'Font assets must be local');
  assert((await stat(resolve(book, 'assets', match[1]))).isFile(), 'Missing local font');
}
const font = await readFile(join(book, 'assets/typography/PressStart2P-Regular.ttf'));
assert.equal(font.readUInt32BE(0), 0x00010000, 'Expected a TrueType font');
assert((await readFile(join(book, 'assets/typography/OFL.txt'), 'utf8')).includes('SIL OPEN FONT LICENSE'), 'Missing font license');

async function walk(root) {
  const entries = (await readdir(root, { withFileTypes: true })).filter((entry) => !['node_modules', 'test-results', 'learning-output', 'playwright-report'].includes(entry.name));
  assert(entries.length <= 5, `HD fan-out exceeded: ${root}`);
  const files = [];
  for (const entry of entries) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

async function checkLink(file, href) {
  if (/^https:\/\//.test(href)) return;
  assert(!href.includes(':'), `Unexpected link scheme in ${file}: ${href}`);
  const [path, fragment] = href.split('#');
  const destination = path ? resolve(dirname(file), path) : file;
  assert((await stat(destination)).isFile(), `Missing file: ${destination}`);
  if (fragment) {
    const target = await readFile(destination, 'utf8');
    assert(target.includes(`id="${fragment}"`), `Missing fragment: ${href}`);
  }
  links += 1;
}

for (const file of await walk(sources)) {
  assert(/\/[A-Z0-9_]+\.md$/.test(file), `Markdown naming violation: ${file}`);
  const source = await readFile(file, 'utf8');
  assert(source.trimEnd().split('\n').length <= 200, `Markdown line cap: ${file}`);
  for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) await checkLink(file, match[1]);
  if (file.includes('/CHAPTER_')) {
    chapters += 1;
    for (const heading of required) assert(source.includes(`\n## ${heading}\n`), `Missing ${heading}: ${file}`);
    assert(source.split(/\s+/).length >= 250, `Chapter lacks introductory depth: ${file}`);
  }
}
for (const file of await walk(book)) {
  if (!file.endsWith('.html') || file.includes('/lab/')) continue;
  pages += 1;
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1>/g) ?? []).length, 1, `Expected one title: ${file}`);
  assert(html.includes('lang="en"') && html.includes('name="viewport"'), `Missing page metadata: ${file}`);
  assert(!html.includes('<script'), `Reading should not need scripts: ${file}`);
  if (file.includes('/CHAPTER_')) {
    assert(html.includes('<summary>Reveal answer guide</summary>'), `Missing answer disclosure: ${file}`);
    assert(html.includes('aria-label="Chapter navigation"'), `Missing sequential navigation: ${file}`);
  }
  for (const match of html.matchAll(/href="([^"]+)"/g)) await checkLink(file, match[1]);
}
assert.equal(chapters, 21, 'Expected twenty-one chapters');
assert.equal(pages, 29, 'Expected twenty-one chapters and eight indexes');
console.log(`PASS: ${chapters} chapter contracts; ${pages} HTML pages; ${links} local links; HD and Markdown limits.`);
