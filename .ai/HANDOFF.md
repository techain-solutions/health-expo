# Handoff

## Current State
- Gate: `READY_FOR_CODEX`
- Active feature: `F-000 - Runnable Project Foundation`
- Status: `READY`
- Only F-000 is authorized.

## Completed Planning Work
- Created the full AI project scaffold.
- Consolidated approved scope and later-over-earlier decisions.
- Created ordered feature plan and requirement traceability.
- Prepared a self-contained Codex prompt for F-000.
- Recorded unresolved architecture/content/privacy questions.
- Recorded the disclosed legacy credential as compromised without copying it.

## Files Created
- `AGENTS.md`
- `.ai/CLIENT_CONTEXT.md`
- `.ai/PROJECT_BRIEF.md`
- `.ai/REQUIREMENTS.md`
- `.ai/FEATURE_PLAN.md`
- `.ai/ARCHITECTURE.md`
- `.ai/DECISIONS.md`
- `.ai/TEST_PLAN.md`
- `.ai/PROGRESS.md`
- `.ai/HANDOFF.md`
- `.ai/CODEX_NEXT_PROMPT.md`

## Application Files Changed
- None. This is a planning/scaffold package, not an implementation.

## Tests Reported
- None run. No repository implementation was supplied or changed.

## Tests Still Required
All F-000 acceptance criteria and commands listed in `FEATURE_PLAN.md`, `TEST_PLAN.md`, and `CODEX_NEXT_PROMPT.md`.

## Issues and Risks
- A legacy WordPress credential was disclosed in the source conversation. It must be rotated immediately and must not be used.
- Existing repository state is UNKNOWN.
- Database, authentication, storage, email, hosting, region, and retention are unapproved.
- Final ticket URL, event opening hours, brand assets, exhibitors/clinics, translations, legal copy, and email recipients are missing or unvalidated.
- Current-site Fair Match text describes excluded advanced functionality and must not be migrated.
- Final commercial timeline does not override feature testing gates.

## Decisions
See `DECISIONS.md`. Key approved decisions are custom Next.js, five languages, external ticketing, static floor plan, Fair Match request forwarding only (DEC-014), deferred exhibitor portal, and static Paris 2027.

## Exact Next Human Action
1. Place this scaffold at the repository root without overwriting existing valid code.
2. Rotate the exposed legacy WordPress credential or arrange a safe export.
3. Give Codex `.ai/CODEX_NEXT_PROMPT.md`.
4. After Codex reports F-000 as `AWAITING_TEST`, run the manual checklist and respond with explicit approval such as `TEST PASSED` or provide failure evidence.

## Exact Next Codex Action
Read `AGENTS.md` and all required `.ai` files, inspect the repository, implement only F-000, run and report exact checks, update `PROGRESS.md` and `HANDOFF.md`, set F-000 to `AWAITING_TEST`, and stop.
