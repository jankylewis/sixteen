# AI agents for quality engineering

Start with the ideas. Learn to question the evidence. Then build the harness.

This book is for a new quality engineer (QE): someone learning how to investigate software quality, design tests, and explain what those tests prove. No AI account, programming language, paid service, or internal system is required for the first twelve chapters. Allow about 15–25 minutes per chapter, including the exercise.

## Your learning path

- [Part 1 — Foundations](foundations/INDEX.md): models, prompts, context, and agents.
- [Part 2 — Agent systems](agents/INDEX.md): execution loops, skills, interfaces, and trust.
- [Part 3 — Quality engineering](practice/INDEX.md): harnesses, test evidence, investigation, and a capstone.

Read in order on your first visit. On later visits, open the relevant part index and select one chapter. This is hierarchical decomposition (HD): navigate by meaningful topics instead of loading the whole knowledge store.

## The example we will use

Pocket Library is a fictional application. A signed-in reader can reserve one available book. A successful reservation must create exactly one record for that reader and book. A second reservation for the same pair must be rejected. These are teaching requirements, not observations of a running application.

Each chapter has an objective, terms, explanation, worked example, misconception, exercise, and answer guide. Try the exercise before opening the answer. A correct explanation matters more than remembering an acronym.

## What this edition delivers

This is a complete introductory learning path and paper-based capstone. It does not contain a working AI agent, browser automation framework, or deployed Pocket Library application. You will specify and inspect a harness before a later implementation course asks you to build one.

Industry terms include model, agent, API, CLI, and MCP. Sixteen uses AXI for an agent-ergonomic CLI, lawset for a collection of operating rules, and skillset for reusable task instructions. These local conventions are not universal standards.
