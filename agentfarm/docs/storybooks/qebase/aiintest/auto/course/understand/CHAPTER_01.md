# 01 — Where AI helps a QE

## Outcome

A one-page workflow map in your learning notebook, with a human review point and an evidence artifact at each stage.

## Know

Quality engineering is the work of investigating risks, designing useful checks, and explaining what the evidence supports. Test automation turns some checks into executable programs. AI can help draft, explore, implement, and diagnose; the QE still owns the requirement interpretation and the verdict. A generated test is a proposal until someone runs and reviews it. In this course you will work on Pocket Library, a tiny local reservation application, rather than memorize tool names.

## Worked example

A weak AI answer says: “I tested reservations and everything works.” Ask where the run happened and what artifact supports the claim. If there is no execution record, relabel it as a proposed plan. Useful assistance would list duplicate-reservation risks and identify the state query needed to verify them. This prevents a polished explanation from replacing testing.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Act as my QE planning assistant. For a library where one reader may reserve an available book once, map the work from requirement review to regression testing. For each step, name what you can draft, what I must review, and what evidence requires a real tool run. Do not claim execution.
```

## Do

Write down how you currently receive a requirement and report a result. Send the starter prompt to any available AI assistant. Compare its answer with your workflow. Mark each suggestion as draft, observation, or decision. If no assistant is available, annotate the worked example; that is rehearsal, not an AI execution.

## Verify

Look for an independent evidence source beside every completion claim. A proposed screenshot, fabricated log, or sentence saying “passed” is not evidence. Ensure the plan includes actual behavior and stored state, not only UI appearance.

## Deliver

A one-page workflow map in your learning notebook, with a human review point and an evidence artifact at each stage.

## Exercise

An assistant gives you twenty cases in ten seconds. Which two checks should happen before those cases enter the automation backlog?

## Answer guide

Check their traceability to an agreed requirement and their distinct risk coverage. Volume and speed do not show that a case is meaningful, feasible, or correct. Record assumptions for clarification rather than converting them into requirements.
