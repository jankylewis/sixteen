# Development conventions

## Organization

- Group implementation by meaningful concern under `agentfarm/`.
- Keep all Markdown in `agentfarm/docs/`; use uppercase basenames with `.md` extensions.
- Keep shared development skills in `hubs/sixteen_devskillhub/base/` and provider adaptations in `cda/` and `cca/` alongside it.
- Keep quality engineering storybook assets in `storybooks/qebase/`; their Markdown documentation belongs in `docs/`.
- Choose a skill packaging mechanism before adding executable skills so Markdown source placement remains consistent with this layout.

## Changes and verification

- Develop on a focused branch and review the exact diff before merging into `main`.
- Keep one writer per changed tree and freeze changes during verification.
- Add a failing regression test at the affected behavior boundary for each defect fix.
- Test observable behavior using independent evidence. Verify the running consumer surface when a change affects it.
- Report completed checks and unresolved gaps accurately; do not infer success from missing evidence.
- Review every published artifact against [the public boundary](VISION.md).

## Initial scaffold checks

Verify the expected directories are tracked, all Markdown is under `agentfarm/docs/`, relative documentation links resolve, and the commit contains only public material. No application build or test suite exists yet.
