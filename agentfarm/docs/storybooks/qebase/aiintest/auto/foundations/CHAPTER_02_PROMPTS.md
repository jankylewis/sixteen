# 02 — Tokens, prompts, and uncertainty

## Objective

Write a bounded request and distinguish output format from factual correctness.

## Terms

- Token: a unit used by a model's tokenizer; it may be a word fragment, punctuation, or other encoded content.
- Prompt: the instructions and input supplied for a model interaction.
- Embedding: a numerical representation used to compare or process items; similarity is not proof of truth.
- Context window: the model's bounded capacity for a request's context and, depending on the model, generated output.
- Hallucination: plausible generated content unsupported by, or inconsistent with, the relevant evidence.

## Understand the idea

Text becomes token IDs before model processing. Tokens are not reliably one word each. Instructions, conversation, retrieved material, and tool results all consume space. Exact accounting depends on the model and interface.

An autoregressive language model generates a sequence by repeatedly predicting a next token from the available context. Attention is a mechanism for combining information from different positions. This can support useful reasoning, but it does not guarantee that a generated statement matches the world.

A decoding setting such as temperature can affect output variation when the model supports it. Lower variation does not establish correctness or complete reproducibility. A schema can ensure an answer has a field called “verdict”; it cannot ensure that the verdict is justified.

## Worked example

Weak request: “Test reservations.” Better request: “Using only the requirement below, draft three duplicate-reservation scenarios. For each, state preconditions, action, expected result, and needed evidence. Do not claim execution. List missing information.” Then supply the requirement from the book index.

The improved request names the task, source, output shape, and boundary. It still needs review: the model might assume a reader role or response code the requirement never specified.

## Common misconception

“Valid JSON means a valid result.” Syntax and evidence are different checks.

## Exercise

Rewrite “Fix the failing test” into a request that asks for investigation first, identifies the available evidence, and forbids weakening the assertion simply to obtain a pass.

## Check your understanding

If two identical prompts produce the same wrong assertion, has repetition validated it?

## Answer guide

A useful request names the failing run, test, requirement, and environment; asks for competing explanations and a discriminating check; and permits changes only after the defect is located. Repetition measures consistency here, not correctness. Check the assertion against an independently stated requirement and known failing behavior.
