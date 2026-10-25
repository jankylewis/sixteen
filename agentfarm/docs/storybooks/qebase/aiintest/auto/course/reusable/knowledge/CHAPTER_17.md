# 17 — Package the workflow as skills

## Outcome

A reusable skill draft and a behavioral trial record on a different scenario.

## Know

A skill is reusable task guidance, sometimes accompanied by scripts and references. It should state when it applies, inputs, sequence, stop conditions, and evidence outputs. A skillset groups related skills. Sixteen plans shared and provider-specific variants; this course teaches the workflow contract without claiming those future installed skills already exist. Instructions are useful only when the agent actually loads and follows them.

## Worked example

Weak skill: “Always make excellent tests.” Useful skill: “Before authoring, read the approved scenario, inspect the live interface, establish isolated data, run the test, prove the assertion catches a defect, and report limits.” It names observable work. Provider adaptations should explain actual tools and invocation differences rather than duplicate the shared rule text.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Draft a QE automation skill from Chapters 6–14. Include trigger, required inputs, live inspection, isolated setup, authoring, failing-first proof, and evidence handoff. State what happens when a required tool is unavailable. Use generic terminology and reference the shared workflow rather than copying it into every provider variant.
```

## Do

Write the draft in your notebook. Give the skill plus one new scenario to an assistant and observe whether it asks for missing evidence or invents it. Use the unavailable-book scenario so the exercise tests transfer beyond duplicate prevention. Keep the resulting artifact and review its behavior; merely checking headings is not skill validation.

## Verify

The assistant must identify R3, observe the unavailable control, and preserve a no-record readback for an API attempt. If browser tools are unavailable, it must state that live UI investigation is incomplete. It must not pretend a text file inspection is a live browser run.

## Deliver

A reusable skill draft and a behavioral trial record on a different scenario.

## Exercise

How does HD help a growing skillset?

## Answer guide

Provide a small topic index, choose one branch, then load the needed leaf. Keep shared rules authoritative in one place. Repair stale indexes through their owner or generator. Do not flatten the whole store into every prompt or raise the directory cap to avoid organizing it.
