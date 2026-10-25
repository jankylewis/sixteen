# 06 — Turn requirements into scenarios

## Outcome

A compact scenario matrix with R1–R5 coverage and explicit exclusions.

## Know

A scenario states a starting condition, action, expected outcome, and evidence. Positive cases show intended use; negative cases reject invalid use; boundary cases probe limits. Do not multiply near-identical cases just to increase a count. Trace each case to a requirement. The lab reader format is 1–40 letters, digits, underscores, or hyphens; this creates concrete length and character boundaries for R5.

## Worked example

For R2, the minimal scenario uses one reader and one book twice. A distinct R4 scenario uses two readers and proves one reader cannot accidentally receive the other’s records. A proposed “real user cannot impersonate another” case would be misleading: X-Reader is intentionally not an authentication system. Record that as an out-of-scope security concern, not a fabricated supported role.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Given R1–R5 and the reader-format constraint, draft at most eight distinct scenarios. Include a requirement ID, precondition, action, expected result, and independent evidence. Separate API checks from UI checks. Flag unsupported authentication assumptions. Explain which risk each case adds.
```

## Do

Write three scenarios yourself, then ask AI for gaps. Merge only justified additions. Include one unavailable-book scenario and one malformed JSON request. Mark which can run automatically against the supplied lab and which require capabilities outside it. Keep the approved scenario list beside the task brief.

## Verify

For every case, ask “what defect would this detect?” Remove duplicates that add no risk coverage. Check that a negative case also checks absence of an unintended write through a successful scoped read, rather than treating a failed query as empty state.

## Deliver

A compact scenario matrix with R1–R5 coverage and explicit exclusions.

## Exercise

AI proposes an administrator approval workflow. What must happen before you automate it?

## Answer guide

Locate an approved requirement and an actual supported role. Neither exists in this demo. Reject the proposed case for this scope rather than adding fictional UI steps. For a real product, resolve the requirement gap with its owner.
