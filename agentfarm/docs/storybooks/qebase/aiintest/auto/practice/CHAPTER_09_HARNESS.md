# 09 — What a harness does

## Objective

Identify the software responsibilities surrounding a model before choosing implementation tools.

## Terms

- Agent harness: in this book, the runtime and supporting software that manages agent execution.
- State: information needed to describe and continue the current work.
- Trace: a record of relevant requests, actions, observations, and decisions.
- Checkpoint: saved progress from which execution can be assessed or resumed.
- Evaluation: a systematic check of behavior against specified criteria.

## Understand the idea

The model proposes. The harness controls the execution environment. It assembles context, advertises tools, validates calls, enforces permissions and budgets, records results, handles failures, and decides when an action can proceed. A test harness runs tests; an agent harness manages agent execution. They may work together, but neither name implies correctness.

```text
User goal → context + policy → model proposal
                                  ↓
Report ← evidence store ← observation ← guarded tool execution
```

Start with one agent and a small tool set. Persist only what recovery requires. After interruption, inspect which actions completed before replaying them. A checkpoint saying “write requested” is not a receipt proving completion.

Concurrency adds ownership requirements. Two agents editing the same test can overwrite each other. Assign disjoint work or serialize the writes. Shared durable state needs explicit transactional or coordination guarantees; separate prompts do not create isolation.

## Worked example

A minimal Pocket Library investigation harness exposes read_requirement, inspect_page, run_test, and read_reservations. Those are illustrative names, not commands available in this repository. It records the application version and synthetic identity, rejects destinations outside the sandbox, and stops after a fixed time or step limit. It allows no production writes.

## Common misconception

“A better prompt replaces a harness.” A prompt cannot by itself enforce process isolation, transactional writes, or filesystem permissions.

## Exercise

Draw five boxes: context, model, tool guard, application, evidence. Place the budget, permission check, and recovery checkpoint. Explain what happens after a crash during a reservation request.

## Check your understanding

Which component must reject an unauthorized tool call even if the model insists?

## Answer guide

The runtime's tool boundary must enforce authorization. Recovery reads the checkpoint and actual application state before retrying an uncertain write. Budget enforcement belongs in executable runtime control. A model may help explain a result, but cannot override those boundaries through text.
