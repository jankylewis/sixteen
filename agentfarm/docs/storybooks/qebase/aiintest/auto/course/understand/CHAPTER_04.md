# 04 — Review AI work before trusting it

## Outcome

A corrected manual scenario and a review checklist you will reuse for generated code.

## Know

An oracle is the basis for expected behavior, normally a requirement or independently derived contract. A hypothesis is a possible explanation; an observation is what a tool returned under recorded conditions. Hallucinations are generated claims unsupported by the relevant evidence. Review is an active comparison against an oracle, not a confidence rating. Readback inspects the result after a write and must be able to disagree with the write request.

## Worked example

Bad draft: click Reserve twice; if a duplicate warning appears, pass. Hidden problem: the backend could show the warning while inserting a second record. Better draft: establish zero scoped records, perform both attempts, check their specified responses, then query the same reader/book and require exactly one record. We will make this hidden defect real in Chapter 11.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Review this draft against R2: “Click twice and pass if the duplicate warning appears.” Find what it fails to prove. Rewrite the precondition and final assertion using an independent read. Distinguish requirements from your suggestions. Do not claim the application has a defect yet.
```

## Do

Create a review checklist with traceability, identity scope, starting state, meaningful assertion, and evidence. Apply it to the weak draft before reading the assistant answer. Compare reviews and retain disagreements. A model agreement is useful feedback but is not independent execution proof.

## Verify

The revised case must fail if two records exist despite a warning. It must state how to identify the correct reader and book. Ask what happens if the read query fails; “zero records” is not an acceptable interpretation of a failed read.

## Deliver

A corrected manual scenario and a review checklist you will reuse for generated code.

## Exercise

Why is asking a second AI “is this test correct?” insufficient by itself?

## Answer guide

Both models may inherit the same assumptions and never execute the test. Use the requirement and a deliberately failing behavior as independent witnesses. Reviewers help find weaknesses; observable regression behavior establishes detection.
