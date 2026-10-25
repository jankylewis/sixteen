# 10 — Generate and run one test

## Outcome

One executable API test, its reviewed diff, and an actual run result.

## Know

An executable test needs a test runner, setup, actions, assertions, and teardown. Node’s built-in test runner supplies test and assertion primitives for the API lab. fetch sends HTTP requests and returns responses; await waits for completion. Tests must await their reads and assertions. The supplied test is a reference solution, not an output you should blindly approve.

## Worked example

A weak generated test sends two requests and checks only that both returned something. The reference first establishes an empty collection, expects 201 then 409, and requires exactly one matching record. That expectation comes from R2, not from a value copied out of the application’s implementation.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Using R2 and app/server.mjs as the public transport setup, draft one Node test that starts an isolated server, reads the baseline, reserves book-1 twice as qe-one, checks 201 then 409, and reads back exactly one qe-one/book-1 record. Always close the server in finally. Do not change the app or claim a run until a tool actually executes it.
```

## Do

Work in a disposable learning branch. Save your generated test as tests/learner.test.mjs, then compare it with the first test in tests/api.test.mjs. Run your file explicitly. The first command below runs the supplied reference; the second runs your draft after you create it.

```sh
node --test --test-name-pattern="duplicate rejection" tests/api.test.mjs
node --test tests/learner.test.mjs
```

If you do not want to edit yet, run only the first command and annotate the reference. Do not claim that as authoring your own test.

## Verify

Read the exit code and actual assertions, not only a summary sentence. Verify the draft contains a successful readback and closes its server. Correct any invented imports or endpoint names against the files and contract. Keep the execution output with your reviewed draft.

## Deliver

One executable API test, its reviewed diff, and an actual run result.

## Exercise

AI replaces records.length === 1 with records.length >= 1 to make a failure pass. Should you accept it?

## Answer guide

No. That accepts duplicates and contradicts R2. Keep the requirement unchanged, inspect why two records appeared, and use the failing behavior as evidence. The next chapter demonstrates exactly this defect.

## Further reading

[Node test runner](https://nodejs.org/api/test.html) documents the runner used in this lab.
