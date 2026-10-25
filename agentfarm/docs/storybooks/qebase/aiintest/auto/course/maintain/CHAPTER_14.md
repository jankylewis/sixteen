# 14 — Repair without hiding the defect

## Outcome

A repair explanation and a regression record that names what was preserved.

## Know

A repair should restore the requirement while retaining a test that detects the original defect. Review the smallest relevant diff first. A product defect belongs in product behavior; an automation defect belongs in the test or driver. Editing fixtures is justified only by a changed contract or an incorrect fixture, not by a wish to obtain green output.

## Worked example

The lab intentionally keeps the duplicate fault as a teaching switch. Do not delete the fault or weaken the test to complete the course. In an actual faulty implementation, the repair would prevent insertion when a matching reservation exists. In this lab, compare the fault branch with the default behavior and explain that difference.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Explain the minimal product repair for duplicate insertion without changing R2 or its test. Show why the guard must protect the write itself. Treat the lab fault switch as an intentional teaching feature to retain. Run the same regression suite against both modes and report the evidence.
```

## Do

Inspect the duplicate condition and insertion statement in app/server.mjs. Trace both modes on paper. Run npm run prove and npm test. If you authored a learner test, run it too. For a code-edit exercise, use a disposable copy of the app and intentionally remove duplicate prevention, then restore it; keep this course checkout unchanged.

## Verify

The unchanged readback assertion must fail on the faulty behavior and pass after restoration. Review the diff for skipped tests, broadened assertions, changed identities, and new retries. Confirm other requirements still pass before proposing a merge.

## Deliver

A repair explanation and a regression record that names what was preserved.

## Exercise

AI changes expected status 409 to 201 and says “the implementation is the source of truth.” What is wrong?

## Answer guide

The approved requirement defines expected behavior. Implementation is evidence of actual behavior. Changing the expectation to match the defect erases the test’s purpose. If product intent truly changes, obtain that requirement change explicitly and update the test with traceability.
