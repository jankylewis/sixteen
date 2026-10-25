# 11 — Make assertions that detect defects

## Outcome

A failing-before/passing-after evidence pair with the unchanged assertion identified.

## Know

A passing test is useful only if it can detect the defect it claims to prevent. Mutation testing deliberately changes behavior to probe the test’s sensitivity. This lab has a named teaching fault: duplicate insertion remains enabled even while the response says Duplicate reservation. The fault is explicit and disabled by default. It changes product behavior, not the test expectation.

## Worked example

The defective server returns the expected 409 for the second request but inserts a second record. A status-only test remains green. The independent count assertion reports two instead of one. Restoring correct behavior makes the same unchanged test pass. This is stronger evidence than running the correct application repeatedly.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Run the supplied duplicate-fault proof. Explain which assertions fail and why the 409 assertion still passes. Do not edit the tests, skip failures, or relax cardinality. Report the faulty and correct runs separately, including their actual exit outcomes.
```

## Do

From the lab directory run:

```sh
npm run prove
```

Read the full output. The helper first runs the same API suite with the named defect, checks that the readback failure is present, and then runs the correct implementation. The helper itself exits successfully only when it observed the expected red and green outcomes. This does not mean the intentionally defective run passed.

## Verify

Find the message “readback must contain exactly one reservation” in the faulty run and the final PROVEN GREEN line. Confirm no assertion or fixture was changed between runs. Inspect tools/prove.mjs if the summary is ambiguous. This demonstrates this defect family, not exhaustive mutation coverage.

## Deliver

A failing-before/passing-after evidence pair with the unchanged assertion identified.

## Exercise

If the faulty run fails because the server cannot import a module, have you proved duplicate detection?

## Answer guide

No. That is an execution failure before the intended witness. The proof must fail because readback found the duplicate. The helper checks for the relevant assertion message as well as a nonzero exit, so an unrelated failure is not accepted as detection evidence.
