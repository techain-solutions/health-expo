# Test Plan

## Test Strategy
Use the smallest reliable layer for each behavior while protecting critical visitor, admin, localization, form, and deployment journeys. A feature becomes `PASSED` only after explicit team/user approval.

## Unit Tests
Cover:
- Validation schemas and transformations.
- Locale resolution and RTL direction.
- Permission/capability decisions.
- Publication and visibility rules.
- Exhibitor ordering/activation.
- Fair Match status transitions.
- Ticket URL and safe-link rules.
- Floor-plan upload type/size/name rules.
- Content completeness and redirect mapping.
- Error handling and email retry/failure decisions.

## Integration Tests
Cover:
- Database repositories and migrations.
- Authentication/session/provider integration.
- Server authorization at route/action boundaries.
- Admin CRUD for event and exhibitors.
- Form persistence plus email adapter behavior.
- Fair Match creation and staff resolution.
- Floor-plan storage adapter behavior when an external adapter is selected.
- Static floor-plan replacement/download.
- Public read isolation from drafts/inactive records.

## End-to-End Tests
Critical journeys:
1. Visitor changes locale and navigates Home -> Exhibitors -> Tickets -> external link.
2. Arabic visitor uses RTL navigation and a public form.
3. Administrator signs in, edits/publishes event data, and signs out.
4. Employee/Organizer encounters correct allowed and forbidden actions.
5. Staff manages an exhibitor and public visibility updates correctly.
6. Visitor submits contact/accreditation/participation request; staff reviews it.
7. Visitor submits Fair Match request; staff confirms/reschedules/declines.
8. Staff replaces static floor plan; visitor opens/downloads it.
9. Production smoke test across public, admin, forms, health, and locale routes.

## Required Negative/Boundary Cases
- Missing, malformed, oversized, or malicious input.
- Empty and maximum-length values.
- Unauthorized and forbidden access.
- Direct requests bypassing hidden UI controls.
- Duplicate/idempotent submissions.
- Inactive exhibitor or clinic.
- Draft/unapproved content exposure.
- Invalid external URL.
- Storage/email/provider failure.
- Expired/revoked session.
- Missing locale translation.
- Arabic mixed text/numbers/URLs.
- Upload path traversal or unsupported content.
- Cross-user/role data access.

## Manual UI and Accessibility Checks
For each UI feature document:
- Environment and test data.
- Desktop, tablet, and mobile viewport/device.
- Keyboard path and visible focus.
- Labels, validation, preserved input, loading, success, empty, permission, network, and server-error states.
- Contrast and touch targets.
- Screen-reader status/heading/landmark spot checks.
- Arabic RTL layout and component exceptions.
- Screenshots for relevant final UI and known differences.

## Security Testing
- Secret scan and dependency audit per repository tooling.
- Authentication and session configuration review.
- Horizontal/vertical privilege escalation tests.
- Rate-limit and spam-control tests.
- Upload validation and storage authorization tests.
- Unsafe rich-text/output tests.
- TLS/CORS/security-header checks in production.
- Log review for credential/token/personal-data leakage.
- Confirm disclosed legacy WordPress credential is absent and unused.

## Data and Environment Testing
- Migration apply and rollback/recovery notes.
- Seed/test data separated from production.
- Preview and production configuration isolation.
- Backup before destructive migration.
- Form retention/deletion behavior after policy approval.
- Import idempotency and source provenance.
- Floor-plan replace/reference integrity.

## F-000 Required Commands
Codex must report actual repository commands. At minimum, the equivalent of:
- Locked dependency install.
- Development start smoke check.
- Lint.
- Typecheck.
- Unit/integration tests.
- Production build.
- Secret-pattern/tracked-file check.

## Definition of Done
For an implementation to be `AWAITING_TEST`:
- All applicable acceptance criteria are implemented.
- Exclusions remain excluded.
- Automated tests are added and exact results reported.
- Relevant existing tests, lint, typecheck, and build pass, or failures are documented.
- Manual test steps are documented.
- Security/privacy/accessibility checks are proportional to the feature.
- Environment variables/migrations/operational changes are documented.
- `PROGRESS.md` and `HANDOFF.md` are updated.
- No next feature is started.

For `PASSED`:
- An authorized user explicitly confirms testing passed against the active feature acceptance criteria.

## F-011 Counter-Audit Regression Checks

- Verify delete controls on both exhibitor and request tables retain red backgrounds, white text, full labels, and content-sized dimensions.
- Verify five valid requests for one identity are accepted and the sixth returns 429 across shared application instances.
- Verify throttle records contain only HMAC digests and timestamps, never raw IP or e-mail values.
- Verify the 30-request network ceiling and 5-request network/e-mail identity limit use a ten-minute sliding window.
- Verify the home title contains the brand once, the hero loads WebP, CSP is present, and no unconfirmed programme sessions or speakers are published.
