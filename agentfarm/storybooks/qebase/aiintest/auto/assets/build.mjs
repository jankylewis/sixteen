import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const book = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sources = resolve(book, '../../../../docs/storybooks/qebase/aiintest/auto');
const checkOnly = process.argv.includes('--check');
const groups = ['foundations', 'agents', 'practice'];
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const target = (value) => value.replace(/INDEX\.md$/, 'index.html').replace(/\.md$/, '.html');

function inline(value) {
  return escape(value).replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      if (!/^(https:\/\/|[A-Za-z0-9_.\/])/u.test(href) || href.includes(':') && !href.startsWith('https://')) {
        throw new Error(`Unsupported link: ${href}`);
      }
      return `<a href="${target(href)}">${label}</a>`;
    });
}

function render(markdown) {
  const output = [];
  let inCode = false;
  let inList = false;
  let inAnswer = false;
  const closeList = () => { if (inList) output.push('</ul>'); inList = false; };
  for (const line of markdown.trimEnd().split('\n')) {
    if (line.startsWith('```')) {
      closeList();
      output.push(inCode ? '</code></pre>' : '<pre><code>');
      inCode = !inCode;
    } else if (inCode) {
      output.push(`${escape(line)}\n`);
    } else if (line.startsWith('- ')) {
      if (!inList) output.push('<ul>');
      inList = true;
      output.push(`<li>${inline(line.slice(2))}</li>`);
    } else {
      closeList();
      if (line.startsWith('#')) {
        if (inAnswer) { output.push('</details>'); inAnswer = false; }
        const heading = /^(#{1,3}) (.+)$/.exec(line);
        if (!heading) throw new Error(`Unsupported heading: ${line}`);
        if (heading[2] === 'Answer guide') {
          output.push('<details><summary>Reveal answer guide</summary>');
          inAnswer = true;
        } else output.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`);
      } else if (line) output.push(`<p>${inline(line)}</p>`);
    }
  }
  closeList();
  if (inAnswer) output.push('</details>');
  if (inCode) throw new Error('Unclosed code fence');
  return output.join('\n');
}

const files = ['INDEX.md'];
for (const group of groups) {
  const leaves = (await readdir(join(sources, group))).filter((name) => name.endsWith('.md')).sort();
  files.push(`${group}/INDEX.md`, ...leaves.filter((name) => name !== 'INDEX.md').map((name) => `${group}/${name}`));
}
const chapters = files.filter((name) => name.includes('CHAPTER_'));
const titles = new Map();
for (const file of files) titles.set(file, (await readFile(join(sources, file), 'utf8')).split('\n')[0].slice(2));
let count = 0;
for (const file of files) {
  const markdown = await readFile(join(sources, file), 'utf8');
  const destination = join(book, target(file));
  const href = (other) => relative(dirname(destination), join(book, target(other))).split(sep).join('/');
  const css = relative(dirname(destination), join(book, 'assets/style.css')).split(sep).join('/');
  const title = titles.get(file);
  const chapterIndex = chapters.indexOf(file);
  const neighbours = chapterIndex < 0 ? '' : `<nav class="steps" aria-label="Chapter navigation">${
    chapterIndex > 0 ? `<a rel="prev" href="${href(chapters[chapterIndex - 1])}">← ${escape(titles.get(chapters[chapterIndex - 1]))}</a>` : '<span>Start of course</span>'
  }${chapterIndex + 1 < chapters.length ? `<a rel="next" href="${href(chapters[chapterIndex + 1])}">${escape(titles.get(chapters[chapterIndex + 1]))} →</a>` : `<a href="${href('INDEX.md')}">Return to learning path →</a>`}</nav>`;
  const groupLinks = groups.map((group, index) => `<a ${file.startsWith(`${group}/`) ? 'aria-current="location" ' : ''}href="${href(`${group}/INDEX.md`)}">0${index + 1} · ${group}</a>`).join('\n');
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A beginner's guide to AI agents and evidence-based quality engineering.">
<title>${escape(title)} · Sixteen QE</title><link rel="stylesheet" href="${css}"></head>
<body><a class="skip" href="#content">Skip to content</a>
<header><a class="brand" href="${href('INDEX.md')}">SIXTEEN <span>/ QE FIELD GUIDE</span></a><span class="edition">01 · AI IN AUTOMATION</span></header>
<div class="layout"><aside><p class="eyebrow">LEARNING PATH</p><nav aria-label="Parts"><a href="${href('INDEX.md')}">Course overview</a>${groupLinks}</nav><p class="aside-note">Understand → investigate → verify</p><p class="aside-note">Synthetic examples. No account required.</p></aside>
<main id="content" tabindex="-1"><p class="eyebrow">${chapterIndex < 0 ? 'YOUR FIELD GUIDE' : `CHAPTER ${chapterIndex + 1} OF ${chapters.length} · READ + PRACTISE`}</p>
<article>${render(markdown)}</article>${neighbours}</main></div>
<footer>Sixteen · Public learning material · Try the exercise before revealing its answer.</footer>
</body></html>
`;
  if (checkOnly) {
    const actual = await readFile(destination, 'utf8');
    if (actual !== html) throw new Error(`Stale generated page: ${destination}`);
  } else {
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html);
  }
  count += 1;
}
console.log(`${checkOnly ? 'Verified' : 'Built'} ${count} pages from Markdown sources.`);
