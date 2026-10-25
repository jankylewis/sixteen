# 16 — Maintain tests as the product changes

## Outcome

A maintenance record containing the requirement delta, observed UI change, minimal diff, and regression evidence.

## Know

Maintenance starts with a requirement delta. A changed UI label may require a locator update without changing business assertions. A changed reservation policy may require new scenarios and new expected state. Separate these changes. A selector repair must not silently loosen the duplicate invariant or make a test select the wrong control.

## Worked example

Product changes the available button label from Reserve The Test Garden to Reserve book. The old accessible-name locator now fails. Updating that locator may be correct after observing the new page; replacing it with “first button on the page” is fragile. If the product also changes duplicate policy, request an explicit contract version rather than assuming the label change implies new behavior.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Given a proposed label-only change, identify which locator must change and which R1–R5 assertions must remain unchanged. Require a live observation of the new accessible name. Produce a minimal maintenance plan and regression scope, not a blind global replacement.
```

## Do

Use a disposable learning branch or copy. Change only the available button text, run the browser test to observe the locator failure, then update its exact accessible-name locator. Run the browser and API suites. Restore the course files afterward or keep the exercise in your own branch. The supplied book remains on the original label contract.

## Verify

The first failure should be at the old locator, not an unrelated startup error. After the locator update, the duplicate readback assertion must still execute. Compare the diff: only the intended UI label and its matching locator should change for this exercise.

## Deliver

A maintenance record containing the requirement delta, observed UI change, minimal diff, and regression evidence.

## Exercise

When is changing test data a legitimate part of maintenance?

## Answer guide

When the approved preconditions or valid data contract changed, or the fixture was demonstrably wrong. Explain that reason and preserve the intended risk. Do not change a duplicate pair into two different readers merely to bypass a new failure.
