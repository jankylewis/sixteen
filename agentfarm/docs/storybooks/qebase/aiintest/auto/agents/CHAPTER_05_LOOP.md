# 05 — The action and observation loop

## Objective

Trace one agent iteration and choose a safe stopping condition.

## Terms

- Tool call: a requested operation with named arguments.
- Observation: the result returned after an operation or inspection.
- Budget: a limit on steps, elapsed time, cost, or other resources.
- Retry: another attempt after a failure or uncertain response.
- Idempotency: a property where repeating an operation has the same intended effect as performing it once.

## Understand the idea

An agent receives a goal and relevant context. It proposes an action. The runtime checks the request, performs an authorized operation, and returns an observation. The next decision depends on that observation. A completion claim should be checked against acceptance criteria.

```text
Goal → propose → validate → execute → observe → decide
          ↑                                  |
          └──────── within budget ────────────┘
                                or stop and report
```

Tool failure and task failure are different. A browser timeout may mean the page never loaded, or that the response arrived after the wait expired. A missing response to a write leaves its outcome uncertain. Repeating a non-idempotent write can create duplicate effects.

Set explicit limits and stop when evidence is insufficient, permission is missing, or the budget is exhausted. Preserve partial progress with an honest status. Do not translate “stopped” into “passed.”

## Worked example

The reservation tool times out after clicking Reserve. Before clicking again, inspect reservations for the synthetic reader/book pair. If exactly one exists, the write may have succeeded despite the lost response. If the read is also unavailable, report an unknown outcome; do not pretend that no write occurred.

## Common misconception

“Retry until green is recovery.” Repetition without understanding effects can hide defects or corrupt test state.

## Exercise

Draft a six-step trace with one timeout. Mark the write, the independent read, the budget, and the final status. Include what happens when the read cannot complete.

## Check your understanding

Can an empty tool response prove there are zero reservations?

## Answer guide

No. Distinguish a successful query returning an empty collection from a transport failure or missing output. A sound trace inspects state after the uncertain write and stops as unresolved if no trustworthy read is possible. Retry only with a justified policy and a bounded number of attempts.
