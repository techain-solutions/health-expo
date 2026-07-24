# Feature Plan

## Planning Rules
- Only one feature may be `READY`, `IN_PROGRESS`, `AWAITING_TEST`, `FAILED`, or `IN_REPAIR`.
- Current active feature: `F-000`.
- The next feature remains locked until explicit team confirmation that F-000 passed testing.
- Feature order follows dependency and risk, not the commercial milestone wording.

## Ordered Feature Table
| ID | Feature | Status | Dependencies | Primary Requirements |
|---|---|---|---|---|
| F-000 | Runnable project foundation | READY | None | FR-001, NFR-007, SEC-001, SEC-002 |
| F-001 | Multilingual public shell and RTL | PLANNED | F-000 PASSED | FR-020, NFR-001, NFR-004, A11Y-001..005 |
| F-002 | Staff authentication and RBAC | PLANNED | F-000 PASSED | FR-010..014, SEC-003..004 |
| F-003 | Rijswijk event management and publication | PLANNED | F-002 PASSED | FR-015..018 |
| F-004 | Exhibitor management and public directory | PLANNED | F-001, F-002 PASSED | FR-004, FR-005 |
| F-005 | Public core pages and external ticket journey | PLANNED | F-001, F-003, F-004 PASSED | FR-002, FR-003, FR-006, FR-023 |
| F-006 | Media upload and management | PLANNED | F-002, F-003 PASSED | FR-017, FR-022, SEC-006 |
| F-007 | Static floor-plan management and display | PLANNED | F-002, F-005, F-006 PASSED | FR-019 |
| F-008 | Contact, participation, and accreditation requests | PLANNED | F-001, F-002, F-005 PASSED | FR-009, SEC-005, SEC-007, PRIV-001 |
| F-009 | Fair Match manual request workflow | PLANNED | F-002, F-004, F-008 PASSED | FR-007, FR-008 |
| F-010 | Media/Press content and legal/informational pages | PLANNED | F-001, F-002, F-008 PASSED | FR-002, FR-024, PRIV-003 |
| F-011 | Content migration and five-language integration | PLANNED | F-005..F-010 PASSED | FR-020..026, INT-009 |
| F-012 | SEO, accessibility, performance, and security hardening | PLANNED | F-011 PASSED | NFR-002..006, A11Y-001..005, PERF-001..003, SEC-005..009 |
| F-013 | Deployment, domain, SSL, and launch verification | PLANNED | F-012 PASSED | FR-027, INT-003, INT-008 |

## Feature Records

## F-000 - Runnable Project Foundation
- Status: READY
- Business objective: Create a safe, repeatable Next.js baseline that Codex can extend feature by feature without introducing product scope prematurely.
- User/technical story: As the delivery team, we need a runnable, tested, documented repository so every later feature can be implemented and verified consistently.
- Requirement sources: Final client stack confirmation; team engineering, structure, testing, security, deployment, and definition-of-done standards.
- Dependencies: None.
- In scope:
  - Inspect existing repository and preserve valid conventions.
  - Initialize a Next.js TypeScript application only when no app exists.
  - Repeatable install/dev/lint/typecheck/test/build commands.
  - Minimal placeholder page and health endpoint.
  - Test framework and smoke tests.
  - CI baseline.
  - Placeholder-only environment example.
  - Preserve `AGENTS.md` and `.ai` documentation.
- Out of scope:
  - Database, authentication, roles, localization, CMS models, uploads, forms, ticketing, exhibitor data, Fair Match, migration, or production deployment.
  - Product UI beyond a neutral foundation placeholder.
- Security/data considerations:
  - No secrets or production data.
  - Never use the disclosed WordPress credential.
  - Avoid environment/system detail leakage in health responses.
- Likely modules:
  - Package/tool configuration, `src/app`, health route, tests, CI workflow, environment example.
- Risks:
  - Unknown existing repository state.
  - Tool/version choices may conflict with existing conventions.
  - Accidental product-scope implementation.
### Acceptance Criteria
1. A clean checkout can install dependencies with the documented locked command and start the app locally.
2. The root page renders a neutral project placeholder without implementing any later feature.
3. A health endpoint returns HTTP 200 and a minimal machine-readable healthy response without secret/configuration detail.
4. Documented lint, typecheck, test, and production build commands complete successfully.
5. At least one automated smoke test verifies the health behavior and/or root rendering.
6. CI runs install, lint, typecheck, tests, and build on pull requests/pushes using the repository package manager.
7. `.env.example` contains placeholders only; no credential from supplied source material appears anywhere in tracked files.
8. `AGENTS.md` and all required `.ai` files remain present.
9. `PROGRESS.md` and `HANDOFF.md` are updated to `AWAITING_TEST` with exact command results.
10. No F-001 or later functionality is started.
### Automated Tests
1. Health endpoint success and response-shape test.
2. Root/app smoke test.
3. CI configuration syntax/build validation through the normal workflow or local equivalents.
### Manual Tests
1. Fresh install from lockfile.
2. Start development server and open root page.
3. Request health endpoint and inspect response.
4. Run lint, typecheck, test, and build commands.
5. Search tracked files for known secret patterns and confirm no real credentials are present.

## F-001 - Multilingual Public Shell and RTL
- Status: PLANNED
- Business objective: Establish the common five-language visitor experience.
- User/technical story: A visitor can select NL/TR/EN/RU/AR and use a responsive navigation shell; Arabic is presented RTL.
- Requirement sources: FR-020; approved spec; UI standards.
- Dependencies: F-000 PASSED.
- In scope: Locale routing, language switcher, directionality, shared header/footer, fallback/404 behavior, responsive states.
- Out of scope: Final page content, admin translations, content migration.
- Security/data considerations: Do not place secrets or user data in locale messages.
- Likely modules: Routing middleware/config, message catalogs, layout, navigation, locale utilities.
- Risks: RTL regressions; untranslated strings; locale SEO behavior.
### Acceptance Criteria
1. Every supported locale has a reachable route and localized shell labels.
2. Arabic sets correct RTL direction while other locales remain LTR.
3. Language switching preserves the equivalent path where available.
4. Navigation is keyboard usable and responsive.
5. Unknown locale handling is deterministic and tested.
### Automated Tests
1. Locale resolution and direction tests.
2. Language switcher route tests.
3. Navigation component tests.
### Manual Tests
1. Desktop/mobile shell in all locales.
2. Keyboard navigation and visible focus.
3. Arabic text, icons, numbers, and menu alignment.

## F-002 - Staff Authentication and RBAC
- Status: PLANNED
- Business objective: Secure internal management access.
- User/technical story: Staff signs in and sees only actions allowed by Administrator, Employee, or Organizer permissions.
- Requirement sources: FR-010..014; SEC-003..004.
- Dependencies: F-000 PASSED and architecture decision for auth/data.
- In scope: Sign-in/out, protected admin shell, role model, server authorization, account provisioning baseline, unauthorized/forbidden states.
- Out of scope: Public exhibitor accounts, self-service signup, social login unless approved.
- Security/data considerations: Maintained auth, secure sessions, least privilege, no account enumeration, audit-relevant events.
- Likely modules: Auth adapter/config, user/role persistence, middleware/server guards, admin shell.
- Risks: Role ambiguity for Organizer; recovery/provisioning details unknown.
### Acceptance Criteria
1. Unauthenticated users cannot access admin routes.
2. Each role can access only its approved baseline sections.
3. Server-side checks reject direct unauthorized requests.
4. Sign-out revokes/ends the active session.
5. Authorization paths have automated tests.
### Automated Tests
1. Authentication integration tests.
2. Role permission matrix tests.
3. Unauthorized/forbidden request tests.
### Manual Tests
1. Login/logout for each role.
2. Direct URL access attempts.
3. Session expiry/revocation behavior.

## F-003 - Rijswijk Event Management and Publication
- Status: PLANNED
- Business objective: Let staff manage the primary edition without code changes.
- User/technical story: Authorized staff edits Rijswijk 2026 event fields and controls draft/published visibility.
- Requirement sources: FR-015..018.
- Dependencies: F-002 PASSED.
- In scope: Event model, edit form, validation, publication state, permission rules, public read model/API.
- Out of scope: Multiple independently managed editions; final public page design; media binary upload.
- Security/data considerations: Server validation, role checks, safe rich text strategy.
- Likely modules: Event domain/model, admin forms, repository/service, public selector.
- Risks: Speaker public fields unresolved; time-zone/date formatting.
### Acceptance Criteria
1. Authorized roles can edit only permitted event fields.
2. Invalid dates/times/URLs are rejected with useful errors.
3. Draft data is not publicly exposed as published content.
4. Published updates appear through the public read boundary.
5. Unauthorized updates are rejected.
### Automated Tests
1. Event validation tests.
2. Publication visibility tests.
3. Role authorization integration tests.
### Manual Tests
1. Edit/save/reload.
2. Draft versus published view.
3. Error and permission states.

## F-004 - Exhibitor Management and Public Directory
- Status: PLANNED
- Business objective: Present exhibitors professionally and make the list maintainable.
- User/technical story: Staff manages exhibitor records; visitors browse active exhibitors in configured order.
- Requirement sources: FR-004, FR-005.
- Dependencies: F-001 and F-002 PASSED.
- In scope: Exhibitor data, categories, active/featured/order fields, admin CRUD, public list/detail/card behavior.
- Out of scope: Exhibitor login, service purchases, automated clinic matching.
- Security/data considerations: Permission checks, URL validation, output encoding.
- Likely modules: Exhibitor domain, admin table/forms, public cards/listing.
- Risks: Final dataset/field completeness; large media.
### Acceptance Criteria
1. Staff can create/edit/reorder/feature/activate/deactivate/remove exhibitors according to role.
2. Public pages show only active exhibitors in configured order.
3. Required fields and URLs validate.
4. Empty, loading, error, and no-results states are usable.
5. Authorization and ordering are tested.
### Automated Tests
1. CRUD/validation tests.
2. Ordering/visibility tests.
3. Permission tests.
### Manual Tests
1. Admin CRUD and reorder.
2. Public directory desktop/mobile.
3. Missing optional media/contact behavior.

## F-005 - Public Core Pages and External Ticket Journey
- Status: PLANNED
- Business objective: Deliver the main visitor-facing event experience.
- User/technical story: Visitors understand the event, browse key information, and reach the external ticket provider.
- Requirement sources: FR-002, FR-003, FR-006, FR-023.
- Dependencies: F-001, F-003, F-004 PASSED.
- In scope: Home, About, Tickets, Contact information/map placeholder integration boundary, static Paris 2027; dynamic event/featured exhibitor data; external ticket CTA.
- Out of scope: Contact form submission (F-008), legal pages (F-010), final migration (F-011).
- Security/data considerations: Safe external links; no payment data.
- Likely modules: Public routes, page sections, metadata, ticket-link component.
- Risks: Missing final copy/brand assets/ticket URL.
### Acceptance Criteria
1. Each core page is reachable in every locale.
2. Homepage contains agreed sections and data.
3. Ticket CTA uses the configured external URL and no payment form exists.
4. Paris 2027 is clearly static coming soon.
5. Responsive and keyboard behavior is verified.
### Automated Tests
1. Route/render tests.
2. Ticket URL and safe-link tests.
3. Locale coverage tests.
### Manual Tests
1. Full visitor journey in five locales.
2. Desktop/tablet/mobile.
3. External ticket redirection.

## F-006 - Media Upload and Management
- Status: PLANNED
- Business objective: Let staff safely manage supplied visual content.
- User/technical story: Authorized staff uploads/references and assigns approved media without code changes.
- Requirement sources: FR-017, FR-022, SEC-006.
- Dependencies: F-002 and F-003 PASSED plus storage decision.
- In scope: Media metadata, image upload, video policy, validation, storage adapter, alt text, assignment to approved content.
- Out of scope: Bulk legacy-photo import unless separately approved; video transcoding unless approved.
- Security/data considerations: Type/size limits, generated names, access control, malware-risk handling, metadata privacy.
- Likely modules: Storage adapter, media domain, admin uploader/library.
- Risks: Storage/provider unknown; large media; AI placeholder licensing.
### Acceptance Criteria
1. Only allowed media types/sizes are accepted.
2. Unauthorized upload/delete is rejected.
3. Uploaded media receives required metadata/alt-text support.
4. Delete/replace behavior does not leave broken public references.
5. Errors are safe and actionable.
### Automated Tests
1. Validation boundary tests.
2. Storage adapter integration tests.
3. Permission and reference-integrity tests.
### Manual Tests
1. Upload valid/invalid files.
2. Replace/delete assigned media.
3. Public rendering and alt text.

## F-007 - Static Floor-Plan Management and Display
- Status: PLANNED
- Business objective: Give visitors a usable static venue plan without interactive booth allocation.
- User/technical story: Visitors view/download the plan; authorized staff replaces it.
- Requirement sources: FR-019.
- Dependencies: F-002, F-005, F-006 PASSED.
- In scope: Admin replacement, public responsive preview, open/download action, metadata.
- Out of scope: Clickable booths, drag/drop, reservation, availability.
- Security/data considerations: Safe upload/download headers and file validation.
- Likely modules: Floor-plan setting, media reference, public viewer/download endpoint.
- Risks: Readability on mobile; source PDF/image size.
### Acceptance Criteria
1. Staff can replace the active plan.
2. Public page shows the active plan responsively.
3. Open/download works with accessible naming.
4. Previous/invalid files cannot be exposed accidentally.
5. No interactive booth allocation exists.
### Automated Tests
1. Active-plan selection tests.
2. Authorization/upload tests.
3. Download response tests.
### Manual Tests
1. Mobile zoom/open/download.
2. Replace and verify cache update.
3. Keyboard/screen-reader labels.

## F-008 - Contact, Participation, and Accreditation Requests
- Status: PLANNED
- Business objective: Capture actionable inbound requests safely.
- User/technical story: A visitor submits a relevant form and staff receives/reviews it.
- Requirement sources: FR-009; privacy/security requirements.
- Dependencies: F-001, F-002, F-005 PASSED plus email/data decisions.
- In scope: General contact, exhibitor participation/info, media, influencer forms; validation; persistence/admin review; email notification; anti-spam; statuses.
- Out of scope: Fair Match-specific clinic workflow (F-009); ticket purchases.
- Security/data considerations: Rate limiting, minimal fields, CSRF/abuse protection, retention, redacted logs.
- Likely modules: Request domain, forms, API/actions, admin inbox, email adapter.
- Risks: Retention and provider unknown; email failure behavior.
### Acceptance Criteria
1. Each form validates required and invalid inputs on client and server.
2. Correctable errors preserve safe input.
3. Successful requests are recorded and visible to authorized staff.
4. Email notification failures do not silently lose the recorded request.
5. Duplicate/automated abuse controls are present.
### Automated Tests
1. Validation and submission integration tests.
2. Rate-limit/anti-spam tests.
3. Email failure and authorization tests.
### Manual Tests
1. Submit each form in supported locales.
2. Invalid, duplicate, network-error, and success states.
3. Staff review and status handling.

## F-009 - Fair Match Manual Request Workflow
- Status: PLANNED
- Business objective: Enable manual clinic appointment coordination without building an automated booking platform.
- User/technical story: A requester selects a listed clinic and preferred time; staff manually resolves the request.
- Requirement sources: FR-007, FR-008; final client confirmation.
- Dependencies: F-002, F-004, F-008 PASSED.
- In scope: Clinic flag/list, Fair Match page/form, preferred date/time, staff status actions, notes, email notifications.
- Out of scope: Availability engine, live slots, chat, favorites, algorithmic matching, clinic dashboard, calendar sync.
- Security/data considerations: Personal-data minimization, authorization, status-transition validation, rate limiting.
- Likely modules: Clinic/Fair Match domain, public form, admin queue, email templates.
- Risks: Allowed appointment date/time rules unknown; notification wording/recipient.
### Acceptance Criteria
1. Public page lists only eligible active clinics.
2. Requester can submit clinic, preferred date/time, and approved contact fields.
3. Staff can confirm, propose another time, or decline.
4. Status transitions are authorized, recorded, and reflected consistently.
5. No live availability or automated matching is presented.
### Automated Tests
1. Request validation and clinic eligibility.
2. Status transition/permission tests.
3. Notification adapter tests.
### Manual Tests
1. Submit and resolve each outcome.
2. Invalid/inactive clinic and past date.
3. Verify no misleading automated-booking claims.

## F-010 - Media/Press Content and Legal/Informational Pages
- Status: PLANNED
- Business objective: Publish readable accreditation and approved legal/practical content.
- User/technical story: Visitors understand criteria and policies; staff can update predefined approved content.
- Requirement sources: FR-002, FR-024, PRIV-003.
- Dependencies: F-001, F-002, F-008 PASSED.
- In scope: Media/Press/Influencer content layout, legal/info page content model, draft/publish, approval markers.
- Out of scope: Legal authorship/validation; certified translation.
- Security/data considerations: Publish only approved content; safe rich text.
- Likely modules: Managed pages/content blocks, public routes, admin editor.
- Risks: Current media text may contain copied/inaccurate references; legal approval missing.
### Acceptance Criteria
1. Media criteria are structured and readable in all locales.
2. Accreditation CTA connects to F-008 form.
3. Legal/info pages publish only approved content.
4. Draft/unapproved content is not publicly exposed.
5. Long content remains accessible/responsive.
### Automated Tests
1. Publication-state tests.
2. Safe content rendering tests.
3. Route/locale tests.
### Manual Tests
1. Long-content readability.
2. Legal approval workflow.
3. Links and forms.

## F-011 - Content Migration and Five-Language Integration
- Status: PLANNED
- Business objective: Replace placeholders with approved, coherent event content.
- User/technical story: Visitors receive accurate, validated content across all five languages.
- Requirement sources: FR-020..026, INT-009.
- Dependencies: F-005 through F-010 PASSED.
- In scope: Useful current text, exhibitor/practical data, supplied assets, redirects, translation import, Arabic review, content provenance.
- Out of scope: Automatic old-photo import; unapproved legal/medical claims; certified translation.
- Security/data considerations: Rotated/safe migration access only; remove metadata/secret leakage; preserve privacy.
- Likely modules: Import scripts, seed/content files, redirect map, media import.
- Risks: Missing/invalid source data, translation quality, outdated current-site content, exposed credential.
### Acceptance Criteria
1. Migration uses safe access/export and documents provenance.
2. Approved content replaces placeholders in all locales.
3. No advanced Fair Match claims from the old site remain.
4. Critical names, dates, legal, medical, and commercial text has named client review evidence.
5. Important old URLs redirect appropriately.
### Automated Tests
1. Import/idempotency tests.
2. Required locale/content completeness checks.
3. Redirect tests.
### Manual Tests
1. Side-by-side content review.
2. Five-language and RTL review.
3. Broken-link/media audit.

## F-012 - SEO, Accessibility, Performance, and Security Hardening
- Status: PLANNED
- Business objective: Make the completed product production-ready.
- User/technical story: Visitors and staff receive a fast, accessible, secure experience that search engines can understand.
- Requirement sources: NFR-002..006, A11Y, PERF, SEC.
- Dependencies: F-011 PASSED.
- In scope: Metadata, sitemap, robots/indexing, event structured data, redirects, accessibility audit/fixes, responsive audit, media performance, security review, rate limits, error/log review.
- Out of scope: Monthly SEO, paid acquisition, unsupported commercial guarantees.
- Security/data considerations: Full proportional checklist.
- Likely modules: Metadata, middleware/headers, observability, audit tests.
- Risks: Late cross-cutting changes; third-party limitations.
### Acceptance Criteria
1. Applicable lint/type/test/build checks pass.
2. Critical pages pass documented keyboard, focus, labels, contrast, and RTL checks.
3. Metadata, sitemap, indexing, structured data, and redirects are verified.
4. Media and layout-shift risks are measured and addressed.
5. Security checklist controls/tests and remaining risks are documented.
### Automated Tests
1. Accessibility checks for critical pages.
2. SEO metadata/structured-data tests.
3. Security and regression tests.
### Manual Tests
1. Device/browser matrix.
2. Screen-reader/keyboard spot checks.
3. Performance and security verification.

## F-013 - Deployment, Domain, SSL, and Launch Verification
- Status: PLANNED
- Business objective: Launch the approved site safely with recoverable operations.
- User/technical story: The team deploys preview and production, connects the domain, verifies email/SSL, and can roll back.
- Requirement sources: FR-027, deployment standards.
- Dependencies: F-012 PASSED and client access/configuration.
- In scope: Environments, variables, migrations, production deployment, domain/DNS, SSL, form email, health/monitoring, backup/rollback, launch checklist.
- Out of scope: Third-party fees and ongoing operations not contracted.
- Security/data considerations: Secret manager, least privilege, production data protection, logs.
- Likely modules: Hosting config, deployment docs/scripts, observability.
- Risks: DNS/access delays, provider/region unknown, email reputation.
### Acceptance Criteria
1. Preview and production environments use isolated configuration.
2. Required variables/migrations/build/start steps are documented.
3. Domain and TLS are verified.
4. Critical public/admin/form journeys pass production smoke tests.
5. Backup/rollback and ownership are documented.
### Automated Tests
1. Deployment build and health smoke checks.
2. Migration verification.
3. Production-safe configuration checks.
### Manual Tests
1. Domain/SSL and all locale routes.
2. Form email delivery.
3. Admin access/role checks.
4. Rollback readiness.
