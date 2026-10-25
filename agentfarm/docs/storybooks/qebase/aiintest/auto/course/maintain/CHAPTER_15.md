# 15 — Run in CI and read the results

## Outcome

A CI report linking the commit, run, tested scope, and any unresolved environment differences.

## Know

Continuous integration (CI) executes checks in a controlled remote environment when changes are proposed. A local pass does not guarantee the same runtime, browser installation, or filesystem assumptions exist in CI. Exit codes determine job success; retained logs and traces explain failures. A pipeline summary is not a substitute for checking which tests actually ran.

## Worked example

A pipeline runs npm test successfully but never installs Chromium or runs test:ui. It has not verified the browser journey. The supplied workflow includes separate API/harness, fault-proof, and browser steps, with browser traces uploaded when present. The fault proof expects a deliberate inner red run while requiring the overall proof command to succeed.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Review .github/workflows/storybook.yml. List which learner behaviors are actually executed and which artifacts survive a failure. Check Node version, npm ci, browser installation, and test commands. Do not call UI coverage complete if only API checks ran.
```

## Do

Run the same local commands before pushing your learning branch:

```sh
npm ci
npm test
npm run prove
npm run test:ui
```

Then open the PR Checks tab and inspect the job for your exact commit. If you have no push access, review the workflow and local outputs; label remote execution as not performed. Do not publish to someone else’s repository without authorization.

## Verify

Check the tested commit, all named steps, test counts, and failures. Download a trace only from your own synthetic run; do not share raw artifacts from sensitive systems. Distinguish “workflow configured” from “workflow passed on this commit.”

## Deliver

A CI report linking the commit, run, tested scope, and any unresolved environment differences.

## Exercise

Can you report a new change as CI-green because the previous commit passed?

## Answer guide

No. Read the status attached to the new head commit. If the job is queued, running, or blocked, say so. The old result can be historical context but cannot certify the new artifact.
