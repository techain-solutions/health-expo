# Codex Task

## Role
You are the implementation engineer for one gated feature. Inspect first, preserve repository conventions, implement only the active feature, provide evidence, and stop for team testing.

## Repository Context
Health & Beauty Expo Rijswijk 2026 is a new custom Next.js event platform that will later contain a five-language public site and a role-protected admin panel. No product functionality is authorized in this task. The repository may be empty or may contain existing work; inspect it before deciding whether to initialize or adapt.

## Required Reading
Read in this order:
1. `AGENTS.md`
2. `.ai/CODEX_NEXT_PROMPT.md`
3. `.ai/PROGRESS.md`
4. `.ai/HANDOFF.md`
5. `.ai/REQUIREMENTS.md`
6. `.ai/FEATURE_PLAN.md`
7. `.ai/ARCHITECTURE.md`
8. `.ai/DECISIONS.md`
9. `.ai/TEST_PLAN.md`

Then inspect:
- Existing source tree and nested `AGENTS.md` files.
- Package manager and lockfile.
- Existing scripts, TypeScript/Next.js configuration, tests, CI, environment files, and git status.
- Existing code conventions and relevant recent history when available.

## Current Gate
- Starting gate: `READY_FOR_CODEX`
- At implementation start: update F-000 to `IN_PROGRESS`.
- At implementation completion: update F-000 to `AWAITING_TEST`.
- Never mark F-000 `PASSED`.

## Active Feature
`F-000 - Runnable Project Foundation`

## Business Objective
Create a safe, repeatable, runnable Next.js TypeScript baseline so later product features can be implemented one at a time with consistent tests and CI.

## Requirements
- FR-001: Custom Next.js foundation; not WordPress or CRM.
- NFR-007: Repeatable lint, typecheck, test, and build evidence.
- SEC-001: No secrets; placeholder-only environment example.
- SEC-002: The legacy WordPress credential disclosed in project source is compromised and must never be used, copied, stored, logged, or committed.
- F-000 acceptance criteria in `.ai/FEATURE_PLAN.md`.

## In Scope
- Inspect and preserve an existing valid Next.js application when present.
- When no application exists, initialize a current stable Next.js TypeScript application at repository root without deleting `AGENTS.md` or `.ai`.
- Follow the existing package manager; when none exists, use npm and commit its lockfile.
- Configure repeatable scripts for:
  - development
  - lint
  - typecheck
  - test
  - production build
- Add a minimal neutral root placeholder that identifies the project but does not implement product pages or design.
- Add a minimal health endpoint, preferably `/api/health`, returning HTTP 200 and machine-readable status only.
- Configure a lightweight test framework consistent with the repository. If none exists, use Vitest with the minimum required Next.js/TypeScript support.
- Add at least one meaningful automated smoke test for root and/or health behavior.
- Add a GitHub Actions CI baseline that performs locked install, lint, typecheck, tests, and build.
- Add/update `.gitignore` and `.env.example` with placeholders only.
- Document local commands and any required runtime version in the existing README or a minimal README when none exists.
- Update `.ai/PROGRESS.md` and `.ai/HANDOFF.md` with exact evidence.

## Out of Scope
Do not implement, scaffold, seed, or mock:
- Localization or locale routes.
- Arabic RTL.
- Authentication, users, roles, or admin routes.
- Database, ORM, migrations, or data models.
- Media/object storage.
- Event, exhibitor, speaker, ticket, floor-plan, page, or request models.
- Public product pages beyond the neutral placeholder.
- Forms, email, Fair Match, SEO content, migration, analytics, or deployment-provider configuration.
- Any F-001 or later acceptance criterion.
- Unrelated dependency upgrades or refactors.

## Dependencies
- None.
- Repository state is UNKNOWN and must be inspected.
- Do not choose database/auth/storage/email/hosting providers in this feature.

## Acceptance Criteria
1. A clean checkout can install dependencies using the documented locked command and run the application locally.
2. The root page renders a neutral project placeholder without later product functionality.
3. The health endpoint returns HTTP 200 and minimal JSON such as `{ "status": "ok" }`; it exposes no version, environment, secret, hostname, database, or internal diagnostic detail.
4. Documented lint, typecheck, test, and production build commands succeed.
5. Automated smoke coverage verifies health and/or root behavior.
6. CI runs locked install, lint, typecheck, tests, and build on pull requests and pushes.
7. `.env.example` contains placeholders only; no real credential or supplied secret exists in tracked files.
8. `AGENTS.md` and all required `.ai` files remain present.
9. `PROGRESS.md` and `HANDOFF.md` contain exact commands/results and F-000 is `AWAITING_TEST`.
10. No later feature is started.

## Implementation Instructions
- Make the smallest coherent foundation change.
- Preserve established structure, scripts, and dependencies when they already satisfy the criteria.
- Do not overwrite existing application code without evidence that initialization is necessary.
- Pin/lock dependencies according to repository convention.
- Keep the root placeholder intentionally plain and accessible.
- Keep the health response deterministic and free of sensitive diagnostics.
- Ensure CI uses the same package manager and scripts as local development.
- Add comments only for non-obvious decisions.
- Do not add packages for trivial tasks.
- Review the final diff for unrelated changes.

## Security and Data Rules
- Do not open, test, or use the legacy WordPress credential from source material.
- Do not include any real user name, password, token, email-provider key, database URL, domain credential, or production data.
- Use placeholders such as `YOUR_VALUE_HERE`.
- Do not log full environment values.
- Secret-scan or search tracked files using available repository tooling; report the command and result without echoing sensitive values.
- If an existing repository contains a secret, stop and report it safely without reproducing the value.

## Required Tests
Run and report exact commands and output summaries for:
1. Locked dependency install from a clean state when feasible.
2. Lint.
3. Typecheck.
4. Automated tests.
5. Production build.
6. Root page manual smoke test.
7. Health endpoint manual smoke test with status/body.
8. Tracked-file secret check.
9. CI configuration validation through execution where available or a documented local-equivalent review.

Do not say "all tests pass" without execution evidence. Report unrun checks and reasons.

## Documentation Updates
Update:
- `.ai/PROGRESS.md`
  - gate to `AWAITING_TEAM_TEST`
  - F-000 status to `AWAITING_TEST`
  - commands and exact results
  - blockers/limitations
  - activity log
- `.ai/HANDOFF.md`
  - summary
  - files changed
  - environment/runtime changes
  - tests run/results
  - tests not run/reasons
  - manual checklist
  - known issues
  - exact next human action
- README only as needed for runnable commands.
- `.ai/DECISIONS.md` only when a material, previously unknown foundation choice was made; append a new decision rather than rewriting history.

## Stop Condition
Stop when F-000 is implementation-complete, documented, and marked `AWAITING_TEST`. Do not mark it `PASSED`. Do not begin F-001, prepare locale code, or alter the next prompt for implementation.

## Required Final Response
Provide:
- F-000 implementation summary.
- Files created/modified.
- Database/migration changes: state explicitly none.
- Environment changes and safe example variables.
- Commands run and exact results, including pass/fail counts when available.
- Tests not run and reasons.
- Known limitations/risks.
- Numbered manual test checklist.
- Final gate and feature status.
- Confirmation that no F-001 or later work was started.
