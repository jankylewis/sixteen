# Build and review the practical QE storybook

## Read and learn

Open `agentfarm/storybooks/qebase/aiintest/auto/index.html` in a browser, or start at the [Markdown course index](auto/INDEX.md). The reader itself works offline without JavaScript or a model account. GitHub displays HTML source; clone the branch to open the rendered edition. GitHub Pages is not configured.

The course has 21 chapters in five parts, from AI task briefs through a reviewed automation change. Every chapter includes Know, a worked example, a starter prompt, Do, Verify, Deliver, an exercise, and an answer guide. Chapter 5 starts the supplied demo; Chapter 10 runs the first API test; Chapter 12 runs a browser test.

## Run the learning lab

Prerequisites: Node.js 22 or newer, npm, Git, and a browser. From the repository root:

```sh
cd agentfarm/storybooks/qebase/aiintest/auto/lab
npm ci
npm start
```

Open `http://127.0.0.1:4173`. Use synthetic readers only. The app runs on loopback with in-memory state and no real authentication. Restarting resets the data. Keep this terminal open for manual exercises; the automated tests create their own isolated servers.

In another terminal, from the lab directory:

```sh
npm test
npm run prove
npx playwright install chromium
npm run test:ui
npm run test:book
npm run agent -- --replay
npm run agent -- --replay --fault=duplicate
```

The fault proof deliberately runs a failing implementation, verifies the relevant readback failure, then runs the unchanged tests against correct behavior. Its overall success means the test detected the fault; it does not relabel the faulty run as green.

The harness accepts interactive JSON action proposals from an external decision-maker. Replay is scripted and makes no model call. There is no bundled cloud model or MCP server. The read-only AXI-style CLI supplies a concrete tool-contract example. These JavaScript learning fixtures do not decide the future Sixteen backend language.

## Publish the reader

Markdown under `agentfarm/docs/storybooks/qebase/aiintest/auto/` is canonical. Do not edit generated HTML. The renderer supports headings, single-line paragraphs, unordered lists, links, inline code, and fenced code blocks. From the repository root:

```sh
node agentfarm/storybooks/qebase/aiintest/auto/assets/build.mjs
node agentfarm/storybooks/qebase/aiintest/auto/assets/build.mjs --check
node agentfarm/storybooks/qebase/aiintest/auto/assets/verify.mjs
node --test agentfarm/storybooks/qebase/aiintest/auto/assets/test.mjs
```

The source has a root index and a course directory containing five parts. The final part has two subtopic indexes so no authored directory exceeds five entries. Generated pages mirror that hierarchy. The verifier excludes ignored dependency and output directories, not authored content. Markdown names are uppercase with a lowercase extension and at most 200 lines.

## Pixel presentation and evidence

The reader uses a dark purple grid, Press Start 2P headings, monospace body text, chunky colored frames, navigation tags, and concept maps. The local font comes from [Google Fonts: Press Start 2P](https://github.com/google/fonts/tree/main/ofl/pressstart2p), with the original SIL license at `assets/typography/OFL.txt`.

Browser tests exercise the demo journey and traverse all 21 chapters at desktop and mobile widths. They check the local pixel font, keyboard skip link, expandable answers, forward/back navigation, and horizontal overflow. Screenshots and failure traces go to ignored `lab/test-results/`; CI uploads synthetic browser artifacts for review. Structural gates cannot prove educational effectiveness or exhaustive accessibility.

Review public content and actual generated output before publication. No internal business knowledge, screenshots, credentials, runtime logs, or copied product implementations belong here. Open or update the PR after verification; merge only after the user's explicit approval of that PR.
