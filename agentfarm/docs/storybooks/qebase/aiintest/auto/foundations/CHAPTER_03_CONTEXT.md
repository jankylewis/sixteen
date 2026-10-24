# 03 — Context, retrieval, and memory

## Objective

Select relevant evidence without treating stored text as authority.

## Terms

- Context: the information available to the model for the current interaction.
- Retrieval: selecting stored information relevant to a query.
- Retrieval-augmented generation (RAG): supplying retrieved material to help generate an answer.
- Persistent memory: information saved outside the current call and later made available again.
- Provenance: where information came from, when, and under what conditions.

## Understand the idea

The surrounding application may resend conversation history or retrieve saved notes. That is different from the model independently remembering every past interaction. A saved fact cannot influence a call unless the system makes it available or it is already represented in the trained model.

More text is not automatically better context. An outdated specification can conflict with the current one. A summary can omit the role, environment, or unresolved limitation that made a result meaningful. Retrieval can select a relevant-looking document that is wrong for this version.

Use HD to navigate: open an index, choose a relevant branch, and read the referenced leaf. If an index is stale, repair or rebuild it through its owning mechanism. Do not silently guess a path. For this introductory book the indexes are authored files; generated indexes in a future harness must be rebuilt rather than hand-edited.

```text
Question → topic index → selected evidence → checked context → answer
```

## Worked example

A note says “duplicate reservations passed.” A useful record says which version, reader role, initial state, actions, observed responses, and record count were checked. It also says whether concurrent requests were tested. That lets the next QE judge relevance rather than assume universal coverage.

## Common misconception

“It is in memory, so it is true.” Memory preserves claims, including mistaken and stale ones.

## Exercise

Write a five-line handoff for a duplicate-reservation investigation. Include a requirement reference, observed result, environment identity without credentials, unresolved question, and next check.

## Check your understanding

Would storing an entire raw conversation necessarily produce a better handoff?

## Answer guide

A good handoff distinguishes expected from observed behavior, records a reproducible scope, and points to sanitized evidence. For example: “Serial duplicate rejected; concurrent behavior untested; next run two requests against the same synthetic reader/book pair.” A raw conversation can contain secrets, obsolete hypotheses, and irrelevant detail. Preserve the useful facts and limitations instead.
