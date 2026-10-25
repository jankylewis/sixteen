# 05 — Meet the runnable demo application

## Outcome

A short environment record: runtime version, start command, local URL, synthetic reader, and initial observations.

## Know

Pocket Library is supplied in the book’s lab directory. It is a learning sandbox, not a production service. It binds to loopback, stores records in memory, and resets on restart. X-Reader partitions synthetic records; it is not authentication. Two books are supplied: book-1 is available and book-2 unavailable. No login, email, external database, or AI subscription is needed to run it. Node runs JavaScript outside the browser. npm installs the pinned development packages and launches named scripts from package.json. A terminal is where you enter the commands; its current directory determines which package those commands use.

## Worked example

R1: first reservation of book-1 for a reader returns 201 and creates one record. R2: repeating that pair returns 409 without another record. R3: an unavailable book returns 409 without a record. R4: reads are reader-scoped. R5: malformed input returns 400 without mutation. These are the approved v1 contracts for the labs; do not infer them from implementation code.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Use the five Pocket Library requirements provided here. Help me prepare a manual exploration checklist. Keep X-Reader clearly labeled as a synthetic test partition, not login or authorization. Ask me for observations rather than fabricating a run.
```

## Do

Install Node.js 22 or newer and Git if needed. From the sixteen repository root, run the following commands. Keep the start command running in one terminal; use a second terminal for later tests. Open http://127.0.0.1:4173 in your browser. If the port is busy, identify your earlier demo before stopping it; do not kill an unknown service.

```sh
cd agentfarm/storybooks/qebase/aiintest/auto/lab
npm ci
npm start
```

Set Reader ID to qe-first. Click the available Reserve button, then Read my reservations. Press Ctrl+C in the server terminal and restart when you want a fresh baseline.

## Verify

Observe “Reserved” and one record for qe-first/book-1 after the first click. Verify the unavailable-book button is disabled. Record what you actually see; startup output alone does not prove the UI works. npm ci needs registry access once; the running demo stays local.

## Deliver

A short environment record: runtime version, start command, local URL, synthetic reader, and initial observations.

## Exercise

After restarting, should the old in-memory reservation still exist? What does that imply about what this demo can teach?

## Answer guide

No. This demo teaches interaction, assertions, and bounded execution; it does not prove durable storage or production authentication. State that limitation. Use a separate environment with the real persistence contract when applying these techniques to a real product.
