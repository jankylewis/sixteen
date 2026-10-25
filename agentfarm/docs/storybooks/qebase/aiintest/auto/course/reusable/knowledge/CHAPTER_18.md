# 18 — Define lawsets and quality gates

## Outcome

A small lawset with scope, executable enforcement, and independent verification for each enforced rule.

## Know

A lawset is Sixteen’s term for scoped operating rules; it is not an industry protocol. Written rules guide behavior. Executable guards reject prohibited operations. Quality gates collect evidence before accepting a change. HIGH-QUALITY means defensible outcomes; GREAT START establishes sound contracts early; SIMPLE-FIRST avoids unnecessary machinery. HD, uppercase Markdown, and the 200-line cap support navigable documentation but do not prove runtime correctness.

## Worked example

A prompt says “do not write before inspecting.” The supplied harness enforces that sequence and refuses a reserve action without a baseline. It also rejects unknown fields, preventing a model from adding an arbitrary destination URL. A test exercises those refusals against the real session boundary. The rule is therefore more than a sentence in a skill.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Review tools/harness.mjs and tests/harness.test.mjs. Map each rule to its guard and an observable negative test. Identify any rule that remains guidance only. Do not equate passing structural checks with safe behavior in every environment.
```

## Do

Run the harness tests directly:

```sh
node --test tests/harness.test.mjs
```

Read the cases for write-before-baseline, arbitrary commands, extra destination fields, exhausted budget, early finish, and missing final readback. Write a rule-to-evidence matrix. Propose one additional refusal case and explain what side effect must remain absent.

## Verify

An invalid request must be rejected at the execution boundary, not merely described as bad by the model. After a terminal refusal the session must not accept another action. A finish request without sufficient evidence must stay unresolved rather than become a pass.

## Deliver

A small lawset with scope, executable enforcement, and independent verification for each enforced rule.

## Exercise

Does “all files are below 200 lines” prove the agent cannot publish without permission?

## Answer guide

No. That is a documentation constraint. Publication requires a separate permission boundary and a test of its enforcement. In this lab the harness exposes no publishing tool at all. Do not claim that absence proves every future adapter will be equally constrained.
