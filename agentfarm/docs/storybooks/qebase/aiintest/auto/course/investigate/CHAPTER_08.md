# 08 — Prepare trustworthy test data

## Outcome

A fixture plan describing ownership, initial state, cleanup, and parallel behavior.

## Know

Tests must control the state they rely on. A fixture is repeatable setup for a scenario. Isolation prevents one test from modifying another’s assumptions. The lab uses reader IDs to scope records, but restarting a shared server resets everybody’s state. For automated tests, each scenario starts its own server on an operating-system-assigned port and closes it afterward. This avoids global reset races.

## Worked example

Two tests share qe-one and assume zero records. Whichever runs second may see a duplicate before its intended action. Retrying may reverse their order and hide the collision. Independent servers give each test a fresh record collection. On a real shared service, use unique scoped data and clean up only what your test owns.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Review this setup: two parallel tests use reader qe-one on one server and each resets all reservations. Identify the interference risk. Propose isolation using one disposable server per test. Preserve the duplicate scenario within each test; do not use a new reader between its first and second requests.
```

## Do

Restart the manual demo and read qe-data before writing. Reserve book-1, switch to qe-other, and read again. Record the expected isolation. Inspect tests/api.test.mjs to see scenario start and finally cleanup. Do not run a global reset against another person’s environment. Use the provided test-owned server approach for the automated labs.

## Verify

Baseline and readback must share the same reader/book identity. Verify qe-other sees an empty successful collection, not a transport failure. Confirm teardown executes even after an assertion failure by checking the finally block and the failing-first run in Chapter 11.

## Deliver

A fixture plan describing ownership, initial state, cleanup, and parallel behavior.

## Exercise

Would giving each request a different random reader make a duplicate test safer?

## Answer guide

No. It removes the duplicate condition. Isolation belongs between scenarios, while the two duplicate attempts must use the same pair within one scenario. A green result after changing that identity no longer proves R2.
