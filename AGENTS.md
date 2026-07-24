# AGENTS.md

## Purpose
This repository is developed one feature at a time. Codex implements only the feature named in `.ai/CODEX_NEXT_PROMPT.md`; the project team controls test approval and feature progression.

## Required Reading
Before changing code:
1. Read this file.
2. Read `.ai/CODEX_NEXT_PROMPT.md`.
3. Read `.ai/PROGRESS.md`, `.ai/HANDOFF.md`, `.ai/REQUIREMENTS.md`, `.ai/FEATURE_PLAN.md`, `.ai/ARCHITECTURE.md`, `.ai/DECISIONS.md`, and `.ai/TEST_PLAN.md`.
4. Inspect the existing repository, package scripts, conventions, tests, configuration, and recent relevant history.

## Scope Guardrails
- Implement one active feature only.
- Do not begin the next feature, even when the current implementation is complete.
- Preserve existing conventions and compatibility.
- Prefer the smallest change that satisfies confirmed acceptance criteria.
- Avoid unrelated refactors, formatting churn, broad dependency upgrades, or new architecture.
- Do not create functionality listed as out of scope or deferred.
- Do not add unapproved paid services or integrations.
- Keep business logic separate from delivery, UI, and persistence concerns where practical.

## Security and Data
- Never commit or copy credentials, API keys, tokens, private certificates, or production data.
- Use placeholders such as `YOUR_API_KEY` in `.env.example`.
- A legacy WordPress credential appeared in source material. It is compromised by disclosure and must not be used, copied, logged, or stored. Migration access requires a newly rotated credential or a safe export.
- Validate external input at trust boundaries.
- Enforce authorization on the server.
- Do not log passwords, tokens, full form payloads, or unnecessary personal data.
- Apply least privilege and safe upload restrictions.

## Quality and Tests
- Use the repository formatter, linter, type checker, test tools, and build process.
- Add tests for new behavior and relevant negative paths.
- Report exact commands and exact results.
- Document tests not run and why.
- For UI work, verify keyboard use, focus, labels, errors, responsive layouts, and Arabic RTL behavior where applicable.

## Documentation Updates
After implementation:
- Update `.ai/PROGRESS.md`.
- Update `.ai/HANDOFF.md`.
- Record material architecture decisions in `.ai/DECISIONS.md` without rewriting history.
- Document environment variables, migrations, APIs, and operational steps.

## Status and Stop Condition
- At task start, set the active feature to `IN_PROGRESS`.
- After implementation and internal test execution, set it to `AWAITING_TEST`, never `PASSED`.
- Only explicit team/user approval can mark a feature `PASSED`.
- Stop after the active feature is ready for team testing. Do not start or prepare implementation for the next feature.

## Required Final Report
Report:
- Implementation summary.
- Files created and modified.
- Database, migration, and environment changes.
- Commands run and exact test results.
- Tests not run and reasons.
- Known limitations and risks.
- Manual verification checklist.
- Active feature status.
- Confirmation that no next feature was started.
