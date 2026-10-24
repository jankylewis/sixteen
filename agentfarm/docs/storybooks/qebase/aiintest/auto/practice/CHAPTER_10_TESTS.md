# 10 — Tests, assertions, and evidence

## Objective

Design a test whose assertion can fail when the requirement is violated.

## Terms

- Test case: preconditions, actions, and expected outcomes for a scenario.
- Assertion: an executable comparison of an observation with an expectation.
- Oracle: the basis for deciding the expected result, such as an approved requirement.
- Fixture: controlled data or setup used by a test.
- False positive: here, a test reports success even though the intended behavior is wrong.

## Understand the idea

An agent can draft a test, but the requirement must remain an independent basis for the expected outcome. Deriving the expected value from the same buggy calculation you are testing creates agreement without verification.

Use stable identity and isolated data. Establish the starting state before acting. Assert the relevant property on the correct object. “No enabled Reserve button matched” can mean the page never loaded; locate the intended control first, then inspect its disabled state if that is the requirement.

Choose the layer where the behavior lives. A unit test exercises a small component. An integration test exercises a boundary between components. An end-to-end test exercises a user-visible path. When a defect crosses a process or network boundary, a mocked unit test alone may miss it.

## Worked example

Start with no reservation for reader R and book B. Reserve once, then attempt the same pair again. Check the specified rejection behavior and independently query that exactly one record exists for R/B. Do not assert a particular HTTP status unless the API contract actually specifies it. A record for a different reader is not evidence for R.

## Common misconception

“Green means trustworthy.” A test might never reach its assertion, inspect the wrong object, or accept every possible result.

## Exercise

Describe a deliberately defective implementation that your duplicate test must catch. Then explain why merely checking that a warning appeared is insufficient.

## Check your understanding

What evidence supports a claim that a regression test detects the original defect?

## Answer guide

An implementation that displays a warning but inserts a second record must fail the record-count assertion. Run the test against the defect before the fix, observe the relevant failure, then observe a pass with the fix. Avoid skipped tests or weakened assertions. Preserve the failing-first evidence and the execution scope.
