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

function render(markdown, isIndex) {
  const output = [];
  let inCode = false;
  let inList = false;
  let inAnswer = false;
  let inSection = false;
  const closeList = () => { if (inList) output.push('</ul>'); inList = false; };
  for (const line of markdown.trimEnd().split('\n')) {
    if (line.startsWith('```')) {
      closeList();
      output.push(inCode ? '</code></pre>' : '<pre><code>');
      inCode = !inCode;
    } else if (inCode) {
      output.push(`${escape(line)}\n`);
    } else if (line.startsWith('- ')) {
      if (!inList) output.push(isIndex ? '<ul class="cards">' : '<ul>');
      inList = true;
      output.push(`<li>${inline(line.slice(2))}</li>`);
    } else {
      closeList();
      if (line.startsWith('#')) {
        if (inAnswer) { output.push('</details>'); inAnswer = false; }
        if (inSection) { output.push('</section>'); inSection = false; }
        const heading = /^(#{1,3}) (.+)$/.exec(line);
        if (!heading) throw new Error(`Unsupported heading: ${line}`);
        if (heading[2] === 'Answer guide') {
          output.push('<details class="box green"><summary>Reveal answer guide</summary>');
          inAnswer = true;
        } else {
          const tone = { 'Worked example': 'cyan', 'Common misconception': 'rose', Exercise: 'amber', 'Completion rubric': 'green' }[heading[2]];
          if (tone) { output.push(`<section class="box ${tone}">`); inSection = true; }
          output.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`);
        }
      } else if (line) output.push(`<p>${inline(line)}</p>`);
    }
  }
  closeList();
  if (inAnswer) output.push('</details>');
  if (inSection) output.push('</section>');
  if (inCode) throw new Error('Unclosed code fence');
  return output.join('\n');
}

const files = ['INDEX.md'];
for (const group of groups) {
  const leaves = (await readdir(join(sources, group))).filter((name) => name.endsWith('.md')).sort();
  files.push(`${group}/INDEX.md`, ...leaves.filter((name) => name !== 'INDEX.md').map((name) => `${group}/${name}`));
}
const chapters = files.filter((name) => name.includes('CHAPTER_'));
const shortTitles = ['MODELS', 'PROMPTS', 'CONTEXT', 'AGENTS', 'LOOP', 'SKILLS', 'INTERFACES', 'TRUST', 'HARNESS', 'TESTS', 'INVESTIGATE', 'CAPSTONE'];
const diagrams = [
  ['INPUT|current evidence', 'MODEL|learned parameters', 'OUTPUT|a claim to check'],
  ['PROMPT|task and boundaries', 'TOKENS|encoded input', 'ANSWER|review for support'],
  ['INDEX|choose a topic', 'LEAF|inspect provenance', 'CONTEXT|selected evidence'],
  ['GOAL|authorized scope', 'AGENT|chooses next action', 'TOOL|runtime executes'],
  ['PROPOSE|within budget', 'EXECUTE|validated call', 'OBSERVE|continue or stop'],
  ['RULE|written intent', 'GUARD|execution boundary', 'TEST|prove refusal'],
  ['RUNTIME|requests a capability', 'INTERFACE|CLI, AXI, or MCP', 'APPLICATION|owns the behavior'],
  ['AUTHORIZE|scope the operation', 'WRITE|attempt the change', 'READ BACK|inspect actual state'],
  ['MODEL|proposes an action', 'HARNESS|enforces boundaries', 'EVIDENCE|supports a verdict'],
  ['REQUIREMENT|expected behavior', 'OBSERVATION|actual behavior', 'ASSERTION|compare independently'],
  ['FAILURE|preserve the witness', 'HYPOTHESIS|choose a narrow check', 'VERDICT|state the evidence'],
  ['DESIGN|scope and contracts', 'SIMULATE|inspect the supplied trace', 'ASSESS|pass, fail, unresolved'],
];
function diagram(index) {
  const nodes = index < 0 ? ['FOUNDATIONS|understand the model', 'AGENT SYSTEMS|understand the loop', 'QE PRACTICE|verify the evidence'] : diagrams[index];
  return `<div class="dia" role="group" aria-label="${index < 0 ? 'Learning path' : 'Concept map'}"><div class="row">${nodes.map((node, i) => {
    const [label, detail] = node.split('|');
    return `${i ? '<span class="arrow" aria-hidden="true">→</span>' : ''}<div class="node ${i === 0 ? 'mm' : i === 2 ? 'mate' : ''}">${label}<small>${detail}</small></div>`;
  }).join('')}</div><p class="caption">${index < 0 ? 'Learn the ideas first. Then design the implementation.' : 'A concept map, not a record of an executed run.'}</p></div>`;
}
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
  const menu = groups.map((group, index) => `<div class="row"><a class="tag g" href="${href(`${group}/INDEX.md`)}">${String.fromCharCode(65 + index)} · ${group.toUpperCase()}</a>${chapters.filter((chapter) => chapter.startsWith(`${group}/`)).map((chapter) => `<a class="tag ${chapter === file ? '' : 'c'}" ${chapter === file ? 'aria-current="page" ' : ''}href="${href(chapter)}">${escape(titles.get(chapter).split(' — ')[0])} · ${shortTitles[chapters.indexOf(chapter)]}</a>`).join('')}</div>`).join('\n');
  const navigation = (position) => `<nav class="box jump" aria-label="Jump to page (${position})"><div class="row"><a class="tag" href="${href('INDEX.md')}">HOME</a></div>${menu}</nav>`;
  const content = render(markdown, chapterIndex < 0).replace('</h1>', `</h1>${diagram(chapterIndex)}`);
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A beginner's guide to AI agents and evidence-based quality engineering.">
<title>${escape(title)} · Sixteen QE</title><link rel="stylesheet" href="${css}"></head>
<body><a class="skip" href="#content">Skip to content</a><div class="wrap">
<header aria-label="Presentation header"><a class="tag brand" href="${href('INDEX.md')}">SIXTEEN</a>${navigation('top')}</header>
<main id="content" tabindex="-1"><p class="eyebrow"><span class="tag">${chapterIndex < 0 ? 'AI IN AUTOMATION' : `CHAPTER ${chapterIndex + 1} OF ${chapters.length}`}</span></p>
<article>${content}</article>${neighbours}</main>${navigation('bottom')}
<footer>Sixteen · Public learning material · Try the exercise before revealing its answer.</footer>
</div></body></html>
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
