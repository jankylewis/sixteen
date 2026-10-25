# AI in test automation

One small application. Twenty-one chapters. Learn to use AI to create, verify, and maintain trustworthy tests.

## Start here

You are a QE learning to apply AI, not a model researcher. Begin with four short foundations chapters, explore the local demo, and run your first automated test by Chapter 10. Each chapter contains a starter prompt, practical task, independent verification, deliverable, and exercise with an answer guide. Budget 20–40 minutes per chapter; installation and capstone work may take longer.

An AI assistant is useful for the prompts but is not bundled or required to run the demo. If you rehearse without one, label the work as manual practice. Never fabricate a tool result or claim a scripted replay called a model.

## Five parts

- [Part 1 — Understand your AI assistant](course/understand/INDEX.md): chapters 1–4.
- [Part 2 — Investigate before automating](course/investigate/INDEX.md): chapters 5–8.
- [Part 3 — Build your first trustworthy test](course/automate/INDEX.md): chapters 9–12.
- [Part 4 — Diagnose and maintain](course/maintain/INDEX.md): chapters 13–16.
- [Part 5 — Make the workflow reusable with agents](course/reusable/INDEX.md): chapters 17–21.

## Your working materials

The runnable lab is at agentfarm/storybooks/qebase/aiintest/auto/lab/ in this repository. Chapter 5 gives installation and startup steps. Use Node.js 22 or newer, npm, Git, a terminal, and a browser. API exercises need no external service. The browser test uses Playwright Chromium, installed once. This JavaScript teaching lab does not select Sixteen’s future backend language.

Keep commands and observations in your own learning notebook. Store temporary test outputs in ignored learning-output or test-results directories; do not publish secrets, unrelated browser captures, or production data. All scenarios use fictional books and synthetic readers.

## Course requirements

- R1: the first reservation of available book-1 by a valid reader returns 201 and creates one record.
- R2: a second reservation for that same pair returns 409 and creates no additional record.
- R3: unavailable book-2 returns 409 and creates no record.
- R4: GET reservations returns only records for the supplied synthetic X-Reader.
- R5: malformed JSON, invalid reader IDs, unknown books, or unexpected fields return 400 without a write. Reader IDs contain 1–40 letters, digits, underscores, or hyphens.

X-Reader is test-data partitioning, not authentication. Data is in memory and disappears on restart. This sandbox deliberately does not teach production identity, capacity allocation, or durable storage.

## Finish with evidence

Your capstone is a test change with scenario traceability, live investigation, meaningful assertions, relevant failing-first proof, and a reviewable handoff. A high test count, confident AI answer, or generated plan is not a substitute. Publishing and merging require the repository owner’s authorization.
