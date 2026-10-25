# Sixteen AgentFarm

Sixteen aims to make the full AgentFarm capability set available to the world as a public, general-purpose project.

This repository contains the initial scaffold and a practical QE storybook with a local learning lab. Runtime components and executable skills are not implemented yet.

## Structure

```text
agentfarm/
  docs/
  hubs/
    sixteen_devskillhub/
      base/
      cda/
      cca/
  storybooks/
    qebase/
```

All Markdown documentation lives in `agentfarm/docs/`, with uppercase basenames and a lowercase `.md` extension.

The development skill hub reserves `base/` for shared skills and conventions, `cda/` for Codex adaptations, and `cca/` for Claude Code adaptations. The `qebase/` directory reserves space for the quality engineering storybook. Empty directories are tracked with `.gitkeep` files.

Read [VISION.md](VISION.md) for the public boundary and [DEVELOPMENT.md](DEVELOPMENT.md) for the initial contribution conventions.

## Learn AI-assisted quality engineering

Start with the [AI agents for QE storybook](storybooks/qebase/aiintest/auto/INDEX.md): 21 chapters from AI task briefs to a tested automation change, with a runnable demo, API/browser tests, and a bounded harness lab. The rendered edition lives at `agentfarm/storybooks/qebase/aiintest/auto/index.html`; see [build and review instructions](storybooks/qebase/aiintest/BUILD.md).
