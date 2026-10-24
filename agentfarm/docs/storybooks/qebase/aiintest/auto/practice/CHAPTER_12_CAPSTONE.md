# 12 — Design your first QE agent

## Objective

Combine the fundamentals into an inspectable investigation plan and evidence-based verdict.

## Terms

- Acceptance criteria: explicit conditions for considering a task complete.
- Evidence bundle: the scoped artifacts supporting a conclusion.
- Unresolved: the available evidence cannot support a pass/fail conclusion for the intended check.
- Regression gate: checks that must pass before a change is accepted.

## Understand the idea

This is a paper exercise. You do not need a model subscription, browser driver, or running application. Design the behavior first; later implementation should preserve this contract.

The goal is to investigate duplicate reservations in a disposable Pocket Library environment. The requirement is exactly one record per reader/book pair. The permitted tools are requirement inspection, test execution, scoped record reading, and evidence writing. Publishing and merging are outside the exercise's authority.

Set a budget of eight tool actions. Stop earlier if permission or required evidence is missing. Use a synthetic reader and book, establish their starting state, and keep a trace of what was requested and observed. Ask the model to explain evidence without allowing it to invent absent results.

## Worked example

This synthetic transcript is supplied for analysis, not claimed as a real run:

```text
1. Requirement: duplicate reader/book pair must be rejected.
2. Baseline query for reader R/book B: zero records.
3. First reservation request: success receipt.
4. Second reservation request: duplicate warning.
5. Query for reader R/book B: two distinct reservation IDs.
```

The warning does not rescue the result. The scoped final read contradicts the required cardinality. If the environment and query contract are trustworthy, the supplied scenario demonstrates a defect. In a real investigation, retain the actual records and provenance in sanitized evidence.

## Common misconception

“A complete plan is a completed test.” Planning artifacts, simulated traces, and executed results must be labeled separately.

## Exercise

Produce a one-page design with five sections: goal and permission scope; input and tool contracts; loop and stopping rules; assertions and evidence; verdict and next action. Then evaluate the transcript above and a variant where step 5 is a permission error.

## Check your understanding

How will you know your future harness enforces the design? Which action would require new authorization in this exercise?

## Answer guide

The first transcript supports failure of the duplicate requirement within the stated assumptions. The permission-error variant is unresolved for stored cardinality; the warning alone cannot prove a pass. Tests should exercise refused destinations, malformed tool inputs, exhausted budgets, uncertain writes, and honest unresolved reporting. Publishing or merging is not authorized here.

## Completion rubric

- You distinguish requirements, hypotheses, simulated evidence, and real observations.
- Your assertions can fail when duplicate records exist.
- Your runtime boundary refuses unauthorized actions and enforces the budget.
- Your recovery plan reads state before repeating uncertain writes.
- Your report names limitations and an actionable next step.

Meet all five before beginning implementation. The next course can build a minimal harness, add real adapters, run a failing-first test, and verify the served application. This introductory edition does not claim those implementations already exist.
