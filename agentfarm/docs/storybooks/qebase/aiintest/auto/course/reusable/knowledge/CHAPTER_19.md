# 19 — Connect tools through CLI, MCP, and AXI

## Outcome

A tool contract and a comparison of successful, refused, and unavailable results.

## Know

An API is a software interface. A CLI exposes commands in a terminal. MCP lets an AI application discover and call server capabilities using a defined protocol. AXI is Sixteen’s local name for an agent-ergonomic CLI: compact structured results, explicit outcomes, and helpful next actions. These interfaces can wrap the same operation; connectivity does not grant authority or prove the result.

## Worked example

The included AXI-style adapter is deliberately small and read-only. It lists books or reads reservations from the fixed local demo. A failed connection produces unavailable with exit 1; an unknown command produces refused with exit 2; a successful empty read returns observed with an empty array. Those are different outcomes, unlike a wrapper that returns [] for every error.

## Starter prompt

Copy this into your assistant after providing the named requirement or artifact. Treat its answer as a draft until checked.

```text
Run the local AXI help command, discover the supported read operations, and inspect qe-one only. Explain outcome, scope, records, and help. If the demo is unavailable, report that error rather than inferring there are no reservations. Do not invent an installed MCP server or claim this CLI is MCP.
```

## Do

Keep npm start running in another terminal. Then run:

```sh
node tools/axi.mjs
node tools/axi.mjs books
node tools/axi.mjs inspect qe-one
node tools/axi.mjs publish
```

The last command intentionally refuses. Compare the output with the browser’s Read my reservations result for the same reader. For MCP practice, discover your actual server’s schema and map its equivalent read operation; there is no bundled MCP server in this lab.

## Verify

Confirm help advertises only supported commands. A successful read must identify its scope. Stop the demo and repeat inspect: it must report unavailable rather than return an empty success. Restart the demo afterward. Do not use a failed observation as proof of absent data.

## Deliver

A tool contract and a comparison of successful, refused, and unavailable results.

## Exercise

When does an AXI wrapper add value over the original CLI?

## Answer guide

When it removes a real ambiguity or safely coordinates a repeatable workflow, such as scoped readback and explicit failure types. Renaming a command without improving its contract adds little. MCP and AXI are interface choices; neither replaces the QE’s evidence review.

## Further reading

[MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) describes the protocol participants and capabilities. Match documentation to your installed protocol version.
