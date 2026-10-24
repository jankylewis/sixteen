# 07 — APIs, CLIs, MCP, and AXI

## Objective

Choose an interface without confusing connectivity with intelligence or authorization.

## Terms

- API (application programming interface): a contract through which software calls another component.
- CLI (command-line interface): a program invoked with commands and arguments.
- MCP (Model Context Protocol): a protocol for exposing capabilities and context to AI applications.
- AXI: Sixteen's convention for an agent-ergonomic CLI; it is not a universal protocol or a claimed acronym expansion.
- Schema: a description of an input or output structure.

## Understand the idea

An API can be local or networked. A CLI may call an API or operate directly on files. MCP connects a host application through clients to servers. Servers can expose tools, resources, and prompt templates. A tool performs an operation; a resource supplies context; a prompt template helps structure an interaction.

MCP does not decide the application's planning loop or prove that a tool is safe. Authentication, authorization, input checks, timeouts, and output interpretation remain design responsibilities.

An AXI aims to reduce agent ambiguity with compact structured results, explicit errors, and useful next actions such as a help list. Output might use JSON or a compact notation such as TOON; readers still need a defined schema. A wrapper adds value only when it improves a real workflow contract.

```text
Agent runtime → CLI / AXI or MCP client → adapter → application
```

## Worked example

A future repository AXI could check the destination repository and account, push an authorized branch, and read back its remote commit. “Command returned zero” would remain distinct from “the intended remote branch now points to the intended commit.” This is a proposed capability, not an implemented tool in this book.

## Common misconception

“MCP replaces APIs.” An MCP server often adapts existing APIs; the underlying system still owns its behavior.

## Exercise

Design the output fields for a read-only reservation query. Include identity scope, success versus failure, records, and next actions. Do not include credentials.

## Check your understanding

Should a failed query return the same payload as a successful empty query?

## Answer guide

Use an explicit outcome, reader/book scope, observed records on success, and a typed error on failure. Include provenance or a timestamp when useful. Missing permission is an error, not an empty collection. Next actions should help investigate without granting new authority.

## Further reading

[MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) is the primary reference. Protocol details are versioned; check the version used by your actual client and server.
