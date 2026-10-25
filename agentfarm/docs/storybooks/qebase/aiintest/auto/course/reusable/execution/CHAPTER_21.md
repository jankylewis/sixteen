# 21 — Capstone: requirement to reviewed PR

## Outcome

A reviewed test change, scenario and investigation notes, regression output, and a PR or explicitly local review package. This is the course completion artifact.

## Know

The capstone combines the QE workflow rather than asking you to recite terms. Your assignment is to automate R3, the unavailable-book requirement, with AI assistance and independent evidence. The supplied suite already contains a reference check; write and review your own scenario before consulting it. Work on your own authorized branch. Publishing a branch and merging it are separate actions.

## Worked example

A weak handoff says “AI wrote the test; all good.” A reviewable handoff links R3, records the observed disabled control, shows a direct API attempt rejected without a record, explains the assertion’s defect sensitivity, and names the exact commit and checks. It also states that this sandbox does not implement real login or durable storage.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Help me deliver R3 from requirement to a reviewable change. First draft a bounded task brief and scenario. Inspect the running demo, capture its actual UI locator, and propose a test with independent no-write readback. Wait for evidence before assigning a verdict. Keep application behavior unchanged, preserve existing tests, and do not merge without my approval.
```

## Do

Create a learning branch in a repository you may write to. Produce the scenario, live notes, isolated test, and a failing-first demonstration in a disposable copy where unavailable-book prevention is deliberately removed. Restore the product and run all labs. Review the diff and commit metadata before pushing. Open a PR only where authorized; if remote access is unavailable, prepare a local review package and label publication incomplete.

## Verify

Use five gates: requirement traceability; live observation; isolated executable test; relevant red then green evidence; and an honest reviewed handoff. The test must show zero scoped records after the rejected unavailable-book attempt. It must not pass because its read query failed. Confirm the final diff retains duplicate-prevention coverage.

## Deliver

A reviewed test change, scenario and investigation notes, regression output, and a PR or explicitly local review package. This is the course completion artifact.

## Exercise

Your capstone passes locally but the remote job is queued. What should the handoff say, and may the agent merge this book’s PR?

## Answer guide

Report local results and remote status separately. Do not infer a remote pass. This book’s PR remains subject to the user’s explicit approval; completing an exercise does not grant merge authority. A useful QE report makes both the achieved result and its limits easy to inspect.
