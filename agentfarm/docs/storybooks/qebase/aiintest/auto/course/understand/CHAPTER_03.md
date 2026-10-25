# 03 — Give AI a clear task

## Outcome

A reusable task-brief template and one filled example for duplicate prevention.

## Know

A useful task brief includes goal, evidence, scope, constraints, output format, and completion criteria. Context is the material the assistant can actually access, not everything you know. Retrieval selects relevant stored material; it can return stale documents. Persistent notes help only when loaded and checked. Supply the smallest relevant requirement and failure artifact before adding a whole repository. Never include credentials or raw production data in a learning prompt.

## Worked example

“Automate the library” invites assumptions about authentication, stock, and technology. “Draft a duplicate-reservation test for R2; use synthetic reader qe-one; inspect stored records; do not modify application code” defines a reviewable task. A timeout should be reported as unresolved unless readback establishes the effect. JSON output can make a result easy to parse without making it true.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Goal: draft one API test for R2. Evidence: R2 says a second reservation for the same reader/book returns 409 and leaves one stored record. Scope: local disposable demo only. Constraints: no application edits; do not weaken assertions. Output: preconditions, requests, expected responses, independent readback, and unknowns. Completion: a reviewed draft, not a claimed execution.
```

## Do

Send the brief, then deliberately omit the response code in a second version. Compare whether the assistant flags the missing contract or invents a code. Save the stronger prompt and one example of an unsupported assumption. Later chapters will provide the real API and the exact executable test.

## Verify

Check that every expected value comes from the supplied requirement. If the assistant fills a gap, ask it to label the assumption explicitly. Do not approve a plan whose definition of success is only “no error occurred.”

## Deliver

A reusable task-brief template and one filled example for duplicate prevention.

## Exercise

Add a stop condition for missing readback access without telling the assistant to abandon all useful investigation.

## Answer guide

Allow it to collect available responses and record the missing capability, but require an unresolved stored-state verdict. It may propose the next check. It cannot substitute a success toast for the missing independent witness.
