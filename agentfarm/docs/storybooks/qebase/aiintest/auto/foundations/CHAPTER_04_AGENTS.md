# 04 — Chatbots, workflows, and agents

## Objective

Identify who chooses the next action and who can execute it.

## Terms

- Chat interface: a conversational way for a person to interact with a system.
- Workflow: a process whose control flow is substantially specified in code.
- Agent: in this book, a system where a model can choose actions toward a goal using observations.
- Tool: a callable capability exposed by the surrounding application.
- Autonomy: the permitted scope of decisions and actions without further human direction.

## Understand the idea

These categories can overlap. A chatbot can be the interface to an agent. A workflow can contain a model step. An agent can call a deterministic workflow as one tool. The useful question is not the product label but who chooses the next step and what permissions it has.

The model can propose a tool call. Runtime software validates and executes it, then returns an observation. The model does not obtain filesystem or browser access merely by describing a command. This distinction lets you place controls at the execution boundary.

Start with a fixed workflow when the sequence is known. Use agent decisions where observation genuinely needs to affect the next action. More autonomy introduces more possible paths to verify.

## Worked example

A fixed script opens Pocket Library, signs in, reserves a book, and checks the result. An investigative agent sees an unexpected sign-in error and chooses to inspect the session before deciding whether the reservation test can proceed. The second system is adaptive, but it must still stop if authentication is unavailable rather than invent a test result.

## Common misconception

“More agents means more intelligence.” Additional agents add communication, ownership, and verification work. They can also repeat the same mistaken assumption.

## Exercise

Classify these systems: a model drafts a test plan; a fixed pipeline calls a model to summarize failures; a model chooses among log inspection and browser tools based on results. State what extra information would change your classification.

## Check your understanding

Does an agent's plan grant permission to publish its changes?

## Answer guide

The examples are a model interaction, a workflow containing a model, and an agent under this book's definition. The first could be part of an agent if additional action selection exists. A plan is a proposal; authorization comes from the user and enforced system policy.

## Further reading

[Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents) distinguishes predefined workflows from model-directed agents. Terminology varies across products; inspect behavior rather than relying on labels.
