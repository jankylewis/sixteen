# Sixteen AgentFarm

Sixteen aims to make the full AgentFarm capability set available to the world as a public, general-purpose project.

This repository currently contains the initial scaffold. Runtime components, executable skills, and storybook content are not implemented yet.

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
