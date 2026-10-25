# 07 — Explore with browser tools and MCP

## Outcome

A live manual walkthrough and a locator notebook with source, time, and page identity.

## Know

A selector identifies an element for automation. Prefer observable roles and accessible names when they express the intended control. A browser tool or MCP server may expose a page snapshot, inspection, click, and screenshot. MCP standardizes capability exchange; the tool names and permissions depend on your installed server. Do not paste fictional MCP calls. List capabilities and use the actual tool schema.

## Worked example

An AI guesses #submit-book. The page actually exposes a button named “Reserve The Test Garden.” The guess has no evidence. Inspect the local page and find its label. A read of the supplied HTML can help explain implementation, but a live observation confirms the control is on the loaded page. If no browser connector is installed, perform the same exploration manually and record that fact.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Explore only http://127.0.0.1:4173 using the browser tools available in this session. First list the relevant capabilities. Capture the reader input label, available Reserve button name, unavailable button state, and result region. Do not invent selectors. Use synthetic reader qe-explore and report evidence for each observation.
```

## Do

Start the demo from Chapter 5. Inspect the page through your assistant’s actual browser connector, or browser developer tools if unavailable. Verify the input label Reader ID, role button/name Reserve The Test Garden, and role status. Observe the unavailable button before attempting a click. Record one exact locator per intended element; keep screenshots free of unrelated user tabs.

## Verify

Check each locator identifies exactly the intended element. A locator that returns zero elements cannot prove a button is disabled. Locate the specific unavailable control, then inspect its disabled property. The runnable UI test in Chapter 12 uses these observed accessible names.

## Deliver

A live manual walkthrough and a locator notebook with source, time, and page identity.

## Exercise

Your agent says “element not found, therefore disabled.” How do you correct the investigation?

## Answer guide

First establish page load and the intended element’s existence. Then inspect its property. Missing and disabled are different states. If the page cannot be loaded, report an environment or access limitation instead of a product verdict.
