# 09 — Choose the right test layer

## Outcome

A two-layer automation plan with a reason for each chosen layer.

## Know

A unit test checks a small component; an API or integration test checks a boundary; a UI test checks a browser interaction. The layer should match the behavior you need to prove. Duplicate storage is best witnessed through requests and state readback. Button accessibility and disabled state need UI evidence. A fake backend can test a frontend response branch but cannot prove the actual backend prevents duplicates.

## Worked example

An AI generates ten browser tests for response codes. This adds browser setup without strengthening those API contracts. Use a compact API suite for R1–R5 and a browser test for the visible reservation journey. Preserve a readback even in that browser test: a green toast alone can miss a backend defect.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
For each approved Pocket Library scenario, recommend API or browser coverage and justify the witness. Keep one browser journey for the visible reservation behavior. Identify any claim a mocked backend would fail to support. Do not optimize only for test count.
```

## Do

Open tests/api.test.mjs and tests/browser.spec.mjs without modifying them. Map each assertion to a requirement. Sketch where requests cross the real HTTP boundary and where browser selectors operate. Mark the supplied server’s in-memory limitation so readers do not confuse this integration with production persistence.

## Verify

An API test must make actual HTTP requests to the started server; it should not call the private duplicate-check function. The UI test must use the rendered controls. Check whether its state query scopes the same reader used in the page.

## Deliver

A two-layer automation plan with a reason for each chosen layer.

## Exercise

Where would you test a bug caused by the server returning the wrong status while storing the right record?

## Answer guide

At the API boundary: assert the response and independently inspect records. A unit test of the storage collection would miss the response mapping defect. Use a UI test as well only if you need to prove how the wrong response affects the user.
