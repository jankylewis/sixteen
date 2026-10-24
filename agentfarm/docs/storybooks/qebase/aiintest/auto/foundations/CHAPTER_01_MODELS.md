# 01 — AI, learning, and language models

## Objective

Explain what a language model does and why its answer is not automatically evidence about software.

## Terms

- Artificial intelligence (AI): a broad field concerned with systems performing tasks associated with intelligence.
- Machine learning: methods that fit a model to examples rather than specifying every decision by hand.
- Model: a learned mathematical system that maps inputs to outputs.
- Neural network: a model built from layers of numerical operations with learned parameters.
- Large language model (LLM): a language model trained at substantial scale to work with sequences of tokens.

## Understand the idea

A rule-based program can reject a reservation when stock equals zero. A learned model might classify a defect report from examples of earlier reports. Both can help a QE, but they obtain their behavior differently.

During training, an optimization process adjusts numerical parameters to improve an objective. During inference, the system uses trained parameters to produce an output from an input. A conversation is normally inference; giving feedback in a chat does not establish that the model's weights changed.

Language models can generate explanations, code, and proposed actions. Fluency is useful, but it is not the same as access to current application state. A model can produce a convincing description of a button it has never inspected.

```text
Training examples → training process → model parameters
Current input + model parameters → inference → output
```

## Worked example

You ask, “Does Pocket Library prevent duplicate reservations?” Without a requirement or observation, the model might describe a common implementation. That is a hypothesis. Providing the written requirement establishes expected behavior. Running a test against the application supplies evidence of actual behavior. Comparing the two is the QE's task.

## Common misconception

“The model learned our application because I mentioned its name.” A name is not an implementation, a current specification, or a verified observation.

## Exercise

Label each item as a requirement, hypothesis, or observation: “Duplicates must be rejected”; “There is probably a unique constraint”; “The second request returned 409 in this recorded run.” Which item still needs an independent check of stored records?

## Check your understanding

Why can a persuasive explanation still be unsuitable as a test result?

## Answer guide

The labels are requirement, hypothesis, and observation respectively. The response code does not prove the database contains exactly one reservation; inspect the resulting state through an authorized read interface. Persuasiveness describes the answer's presentation, not its connection to observed behavior.
