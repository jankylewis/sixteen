# 13 — Investigate a red test

## Outcome

A failure dossier: expected behavior, actual witness, hypotheses, discriminating check, conclusion, and limitation.

## Know

A red result is an observation, not a root cause. Classify competing explanations: product behavior, automation logic, test data, or environment. A discriminating check produces different observations under competing hypotheses. Preserve the exact run and scope before editing anything. An unresolved result is appropriate when the evidence cannot distinguish causes.

## Worked example

You see two records. Hypothesis A is duplicate insertion. Hypothesis B is a query counting all readers. Read the scoped response and inspect its identities. If both records belong to the same reader/book in a fresh server, the duplicate hypothesis is stronger. If the query included unrelated readers, investigate automation scope. Both faults could coexist.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Investigate the failing output from npm run prove. List product, automation, data, and environment hypotheses. For each, name a discriminating observation. Use the supplied records and API contract; do not change code yet. Mark facts, hypotheses, and missing evidence explicitly.
```

## Do

Run the targeted faulty test and capture its output. The command is intentionally red:

```sh
LAB_FAULT=duplicate node --test --test-name-pattern="duplicate rejection" tests/api.test.mjs
```

This environment-prefix syntax is for macOS/Linux shells. On PowerShell set $env:LAB_FAULT="duplicate" before the command and remove it afterward. Record which assertion failed and which earlier checks passed.

## Verify

Your diagnosis must explain both the correct-looking rejection and the incorrect stored state. Do not label every red result a “flake.” If your actual failure is an unavailable port or missing dependency, diagnose that observed failure first rather than copying the example verdict.

## Deliver

A failure dossier: expected behavior, actual witness, hypotheses, discriminating check, conclusion, and limitation.

## Exercise

The test passes alone but fails in parallel. What do you compare first?

## Answer guide

Compare starting state, shared identities, shared reset operations, port ownership, and resource timing. Preserve parallel execution while isolating one suspected cause. “Passed alone” narrows the conditions; it does not prove the product or test is universally correct.
