# 20 — Build a minimal QE agent harness

## Outcome

A bounded harness trace, an explanation of the decision adapter used, and an evidence-based verdict.

## Know

A harness connects a decision-maker to guarded tools, observations, budgets, and completion rules. The supplied harness runs a real isolated demo and accepts one JSON action at a time through standard input. The external decision-maker can be a person or an assistant driving a terminal. No cloud model is called by the program. Its replay mode is a deterministic test adapter, not an autonomous AI agent.

## Worked example

The valid path is inspect, reserve, reserve, inspect, finish. The harness returns observations after each action and computes its verdict from the trace. Sending finish early returns unresolved. Turning on the teaching fault produces fail after readback even though the rejection response looked correct. No arbitrary shell or external destination is available.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Act as the decision-maker for the local harness. Start node tools/agent.mjs in an interactive terminal. Read each JSON observation before sending the next action. Use only inspect, reserve, and finish. Establish a baseline, attempt the duplicate scenario, and read back before finishing. Do not report success from your plan or from a replay run alone.
```

## Do

First establish the harness behavior with the scripted adapter:

```sh
npm run agent -- --replay
npm run agent -- --replay --fault=duplicate
```

Then run node tools/agent.mjs interactively. Enter {"action":"inspect"}, read the response, and choose the next action. Send one JSON line per turn; finish explicitly. If your assistant lacks interactive stdin support, conduct the human-driven session and label it as such. A future model adapter must connect this observation/action loop; it is not supplied here.

## Verify

Replay should return pass for the correct demo and fail for the seeded defect. The interactive trace should show a decision following each observation. Tests prove budget exhaustion and missing-evidence outcomes. Check that the report does not confuse deterministic replay with an actual model call.

## Deliver

A bounded harness trace, an explanation of the decision adapter used, and an evidence-based verdict.

## Exercise

What is still needed before using this harness for a real production application?

## Answer guide

A reviewed adapter with real authentication and authorization, durable recovery semantics, environment boundaries, application-specific contracts, and independent tests. Preserve unknown outcomes after uncertain writes. The local demo’s fixed loopback destination and in-memory state do not establish those production guarantees.
