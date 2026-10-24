# 06 — Instructions, skills, and laws

## Objective

Explain which rules guide an agent and which controls actually prevent an action.

## Terms

- Instruction: a direction supplied to the system or agent.
- Skill: reusable task instructions, sometimes packaged with scripts or references.
- Skillset: in Sixteen, a collection of related skills.
- Lawset: in Sixteen, a collection of operating rules with stated scope.
- Guard: executable validation that permits or rejects an operation.

## Understand the idea

Provider runtimes define how instruction sources are prioritized; do not assume identical behavior across products. Retrieved pages and tool output are evidence to inspect, not automatically new instructions. A skill must declare when it applies and what supporting capabilities it requires.

A rule saying “verify after writing” is guidance until the workflow checks for a readback. A rule saying “only use the test environment” needs a guard that checks the actual destination. Writing a policy document is not evidence that every agent loaded or followed it.

Sixteen's engineering principles include HIGH-QUALITY: support claims with evidence; GREAT START: establish sound contracts before consumers depend on them; SIMPLE-FIRST: choose the smallest design that meets the requirement; and HD: organize and retrieve by meaningful hierarchical topics.

This book chooses at most five entries per directory and a 200-line cap for Markdown. These are explicit local navigation conventions, not universal properties of AI. All Markdown lives under the documentation tree with uppercase basenames.

## Worked example

A reservation-testing skill requires a known reader, isolated test data, and independent state inspection. If the inspection tool is unavailable, the skill reports that limitation. It must not replace record verification with “the button was clicked” and call that equivalent.

## Common misconception

“The rule is in a file, so it is enforced.” Test the control with a prohibited input and observe its refusal.

## Exercise

Write one rule, one enforcement point, and one negative test for restricting writes to a disposable test environment.

## Check your understanding

What evidence shows that a guard works rather than merely exists?

## Answer guide

Example: allow only an explicitly configured test destination; validate the resolved destination at the tool boundary; submit a different destination and assert refusal with no side effect. Also exercise the permitted path. A test that reads the same policy string and declares it valid cannot establish enforcement.
