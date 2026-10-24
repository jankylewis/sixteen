# 11 — Investigate before repairing

## Objective

Use a discriminating check to locate a failure before changing code.

## Terms

- Product defect: application behavior violates the agreed requirement.
- Automation defect: the test, driver, or assertion incorrectly represents or observes the scenario.
- Environment failure: a prerequisite such as a service or permission is unavailable.
- Flaky result: inconsistent outcomes across runs whose intended conditions appear equivalent.
- Root cause: an evidenced explanation of the mechanism producing the failure.

## Understand the idea

A red test is an observation, not a diagnosis. Preserve the failing artifact and identify the exact role, version, data, action, and assertion. List plausible causes, then choose the smallest check whose outcomes distinguish them.

Changing the assertion first destroys your witness. Repeating the whole suite may produce more output without locating the cause. Use a narrow reproduction, then run broader checks after the repair to detect regressions. Investigate differences between isolated and parallel execution rather than treating “flaky” as a cause.

When repairing an automation defect, preserve product intent. When the product is wrong, report it with reproduction evidence; do not change the test to accept the defect. If the evidence does not distinguish the causes, retain an unresolved verdict.

## Worked example

The duplicate test expected one record and found two. Hypothesis A: the application allows duplicates. Hypothesis B: the query counts reservations for every reader. Inspect the query scope, then reproduce with a unique reader/book pair. A correctly scoped duplicate supports A; unrelated rows support B. Both defects can coexist, so repairing one does not eliminate the need to rerun.

## Common misconception

“It passed on retry, so it is fixed.” A retry may merely change timing or starting state.

## Exercise

A test passes alone and fails beside another test. Propose two causes and one experiment that distinguishes them without weakening the assertion.

## Check your understanding

What should a handoff say when a required read interface is unavailable?

## Answer guide

Shared reader/book fixtures and resource contention are possible causes. Use independent synthetic identities while preserving parallel execution; compare scoped state and timing. This tests the shared-data hypothesis, not every concurrency issue. If readback is unavailable, record the observed failure, missing evidence, and next check; do not assign a confident product verdict.
