# 02 — Models, assistants, and agents

## Outcome

An annotated interaction trace and a seven-term glossary that you can explain without product-specific names.

## Know

A language model generates output from supplied context using learned parameters. Training changes parameters; inference uses them. Tokens are encoded units, not reliably whole words. The context window limits what fits in an interaction. An assistant is an application around a model. In this book an agent can choose its next action from observations; a fixed workflow follows predefined control flow. A tool call is a request for runtime software to do something, not proof that it happened.

## Worked example

“I will open the page” is a plan. A browser navigation request is an action attempt. A returned page title is an observation. “The reservation is persisted” still requires inspecting a record. An assistant that chooses a read query after a timeout shows adaptive control; a script that always runs the same steps is a workflow, even if a model wrote it.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Explain this trace to a new QE: user asks to test duplicates; assistant proposes a browser click; runtime returns a timeout; assistant requests a scoped record query. Label goal, proposal, tool execution, observation, and next decision. Do not invent the query result.
```

## Do

Use the trace in the prompt. Draw five boxes and connect them in execution order. Add where authorization is checked and where the agent can stop. Keep a small glossary for model, prompt, token, context, tool, workflow, and agent. Use each term in a sentence about testing.

## Verify

Your drawing must place execution outside the model itself. It must distinguish an unavailable response from an empty successful query. Ask the assistant for a contrasting fixed workflow and inspect whether it really removes adaptive decisions.

## Deliver

An annotated interaction trace and a seven-term glossary that you can explain without product-specific names.

## Exercise

A chatbot can call a browser and adapt to failures. Must it remain “only a chatbot” because the interface is conversational?

## Answer guide

No. The interface and control flow are different dimensions. It may be a chat interface to an agent. Inspect who chooses actions, what the runtime executes, and which boundaries are enforced. A product label alone does not answer those questions.

## Further reading

[Building effective agents](https://www.anthropic.com/research/building-effective-agents) explains the workflow/agent distinction.
