# Build and review the introductory storybook

## Read

Open `agentfarm/storybooks/qebase/aiintest/auto/index.html` in a browser. All content and navigation work without a server, JavaScript, network access, or an AI account. GitHub's repository view displays HTML source; download or clone the branch to read the rendered book locally. GitHub Pages is not configured by this change.

The [source book index](auto/INDEX.md) also works directly in GitHub.

## Edit and generate

Markdown under `agentfarm/docs/storybooks/qebase/aiintest/auto/` is the source of truth. Never edit generated HTML directly. The small renderer accepts headings, single-line paragraphs, unordered lists, links, inline code, and fenced code blocks. Do not introduce unsupported Markdown constructs without extending and testing the renderer.

From the repository root, with Node.js 22 or newer:

```sh
node agentfarm/storybooks/qebase/aiintest/auto/assets/build.mjs
node agentfarm/storybooks/qebase/aiintest/auto/assets/build.mjs --check
node agentfarm/storybooks/qebase/aiintest/auto/assets/verify.mjs
node --test agentfarm/storybooks/qebase/aiintest/auto/assets/test.mjs
```

Node is only a static publishing/checking tool here. This does not choose the future agent harness implementation language. The book has no runtime dependencies or package installation step.

## Hierarchical decomposition

The source root has a book index and three meaningful part directories. Each part has its index and four chapters. The rendered root adds one assets directory. Each directory within these book trees has at most five entries. Readers navigate one index at a time to a selected leaf. Do not flatten the book or raise the cap to avoid splitting a topic.

These Markdown indexes are authored navigation; the HTML is generated. A future generated knowledge index must instead use its owning rebuild mechanism. The local five-entry limit is a declared publishing policy, not an imported internal authority record.

## Review gates

Check source and output consistency, local links, all twelve chapter contracts, uppercase Markdown filenames, the 200-line Markdown cap, and directory fan-out. Inspect desktop and narrow-screen reading, keyboard navigation, answer disclosure, and previous/next links in a browser. Review technical claims and the public-content boundary separately; structural checks cannot certify educational accuracy or detect every private reference.

All examples are synthetic. No internal screenshots, code, business vocabulary, credentials, operational records, or production data belong in this book. The existing storybook was a structural reference only.

Open a PR after verification. Merge only after the user's explicit approval of that PR.
