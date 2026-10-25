# 12 — Make execution reliable

## Outcome

A browser test run, any retained failure trace, and a short reliability review.

## Know

Browser automation must wait for observable conditions rather than arbitrary sleep durations. Playwright locators identify controls and its web assertions retry while waiting for a condition. A retry of an observation is different from repeating a write. In this lab tests use retries: 0 so an intermittent failure is visible. Fresh servers keep parallel tests independent.

## Worked example

Bad draft: click Reserve, sleep two seconds, read a cached success label. Improved draft: click the exact accessible button, await the status Reserved, click again, await Duplicate reservation, then query actual scoped records. If the first write times out, inspect state before deciding whether to repeat it.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Review tests/browser.spec.mjs. Explain each locator, awaited assertion, and independent readback. Identify where a fixed sleep or an unscoped selector would weaken the test. Keep retries disabled and preserve R2 while improving diagnostics.
```

## Do

Install the matching browser once, then execute the supplied browser test. A browser download needs network access; the test itself uses the local demo.

```sh
npx playwright install chromium
npm run test:ui
```

Run it again with two workers and repeated cases to check the isolated setup, not to erase a failure:

```sh
npm run test:ui -- --workers=2 --repeat-each=2
```

## Verify

Both runs must pass without retries. If a run fails, retain its trace in test-results before investigating. Confirm the unavailable control exists and is disabled. The record query must use qe-browser, matching the page input. Repetition supports stability for these conditions only.

## Deliver

A browser test run, any retained failure trace, and a short reliability review.

## Exercise

Why can a long fixed sleep both slow the suite and still fail occasionally?

## Answer guide

It waits even when the condition is already ready, yet can still expire before slower environments are ready. Wait for the intended state with a bounded timeout. Increasing sleeps does not repair wrong identity, missing data, or an actual product defect.

## Further reading

[Playwright installation](https://playwright.dev/docs/intro) and [web assertions](https://playwright.dev/docs/test-assertions) describe setup and observable-state assertions.
