# Feature Plan

## Planning Rules
- Only one feature may be `READY`, `IN_PROGRESS`, `AWAITING_TEST`, `FAILED`, or `IN_REPAIR`.
- Current active feature: `F-011` awaiting team acceptance.
- Audit remediation is limited to F-011 until it is ready for team testing.
- Feature order follows dependency and risk, not the commercial milestone wording.

## Ordered Feature Table
| ID | Feature | Status | Dependencies | Primary Requirements |
|---|---|---|---|---|
| F-000 | Runnable project foundation | PASSED | None | FR-001, NFR-007, SEC-001, SEC-002 |
| F-001 | Static design migration, multilingual shell, and RTL | PASSED | F-000 PASSED | FR-002..009, FR-019..024, NFR-001, NFR-004, A11Y-001..005 |
| F-002 | Staff authentication and RBAC | PASSED | F-000, F-001 PASSED | FR-010..014, SEC-003..004 |
| F-014 | Administrator-managed staff accounts | PASSED | F-002 PASSED | FR-010..014, SEC-003..004 |
| F-003 | Rijswijk event management and publication | PASSED | F-002 PASSED | FR-015..018 |
| F-004 | Exhibitor management and public directory | PASSED | F-001, F-002 PASSED | FR-004, FR-005 |
| F-005 | Public core pages and external ticket journey | PASSED | F-001, F-003, F-004 PASSED | FR-002, FR-003, FR-006, FR-023 |
| F-007 | Static floor-plan management and display | PLANNED | F-002, F-005 PASSED | FR-019 |
| F-008 | Contact, participation, and accreditation requests | PLANNED | F-001, F-002, F-005 PASSED | FR-009, SEC-005, SEC-007, PRIV-001 |
| F-009 | Fair Match information and request form | PLANNED | F-002, F-008 PASSED | FR-007, FR-008 |
| F-011 | Content migration and five-language integration | AWAITING_TEST | F-005, F-007, F-008, F-009 PASSED | Five locale routes, managed content, RTL, forms, metadata, and audit remediation internally verified |
| F-012 | SEO, accessibility, performance, and security hardening | PASSED | F-011 PASSED | SEO routes, security headers, lint/typecheck/build and production dependency audit passed |
| F-013 | Deployment, domain, SSL, and launch verification | AWAITING_EXTERNAL_DEPLOYMENT | F-012 PASSED | Vercel-ready build and remote environment runbook complete; remote authority is required |

## Feature Records

## F-000 - Runnable Project Foundation
- Status: PASSED
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

## F-001 - Static Design Migration, Multilingual Shell, and RTL
- Status: PASSED
- Business objective: Convert the complete approved static prototype into maintainable Next.js presentation code without introducing backend behavior.
- User/technical story: A visitor or reviewer can navigate every approved public and admin design view in the Next.js application, switch the five shell languages, review Arabic RTL, and inspect static forms and controls without sending or persisting data.
- Requirement sources: Approved `design/` prototype; FR-002..009, FR-019..024 presentation requirements; FR-020; NFR-001; NFR-004; A11Y-001..005.
- Dependencies: F-000 PASSED.
- In scope: All approved public and static admin prototype views, route-based Next.js presentation, shared components, assets/documents, language switching, directionality, responsive states, and clearly inert presentation-only controls.
- Out of scope: Supabase, databases, authentication, authorization enforcement, persistence, submissions, uploads, email, final content migration, completed translations, deployment, and every real business action.
- Security/data considerations: Forms and admin controls must not transmit data or invoke backend mutations; do not place secrets or real personal data in the static presentation.
- Likely modules: App Router pages, locale-aware public shell, shared visual components, static content data, admin preview shell, client-side presentation controls, public assets, and tests.
- Risks: Accidental activation of prototype forms; broad visual-regression surface; RTL regressions; untranslated body copy; illustrative or unverified content being mistaken for final production content.
### Acceptance Criteria
1. Every approved public prototype view has a reachable, refresh-safe Next.js route.
2. The shared header, mobile navigation, footer, imagery, documents, responsive styling, and static admin preview match the approved design.
3. Every supported locale has a reachable shell; Arabic sets RTL while the other locales remain LTR.
4. Language switching preserves the equivalent public page where available.
5. Static forms and admin controls cannot submit, persist, upload, delete, authenticate, or invoke backend behavior.
6. Navigation and presentation controls are keyboard usable, labelled, focus-visible, and responsive.
7. Required assets load from the Next.js public surface without runtime dependence on `design/dist/`.
8. Existing health, lint, typecheck, test, and build checks pass.
9. No Supabase, database, authentication, storage, email, or deployment-provider work is started.
### Automated Tests
1. Representative public and admin route rendering tests.
2. Locale resolution, direction, and language-switcher route tests.
3. Navigation component and inert-form tests.
### Manual Tests
1. Desktop/mobile review of all public and admin design views.
2. Keyboard navigation, visible focus, menus, tabs, and static form controls.
3. Arabic text, icons, numbers, and layout direction; non-Arabic LTR comparison.
4. Confirm forms and admin controls perform no network mutation or persistent action.

## F-002 - Staff Authentication and RBAC
- Status: PASSED
- Business objective: Secure internal management access.
- User/technical story: Staff signs in and sees only actions allowed by Administrator, Employee, or Organizer permissions.
- Requirement sources: FR-010..014; SEC-003..004.
- Dependencies: F-000 and F-001 PASSED.
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

## F-014 - Administrator-Managed Staff Accounts
- Status: PASSED
- Business objective: Let the client manage day-to-day staff access without terminal commands while retaining a safe initial administrator bootstrap.
- User/technical story: An authenticated Administrator can invite a staff member, select the permitted role, review active accounts, change a role, or deactivate access from the administration interface.
- Requirement sources: Client direction, 30 July 2026; FR-010..014; SEC-003..004.
- Dependencies: F-002 PASSED and an approved remote Supabase email/invitation configuration for production use.
- In scope: Administrator-only staff-account list; invitation/create flow; role selection limited to `staff` and `organizer`; activation/deactivation; secure server-side account and profile operations; safe invitation/resend and error states; audit-relevant account events.
- Out of scope: Creating the first Administrator through the interface; public or self-service signup; Administrator role assignment by a client user; social login; MFA, password-recovery policy, billing/organisation tenancy, and user self-service profile editing unless separately approved.
- Security/data considerations: The initial Administrator remains provisioned by the server-only script. Every user-management action must be enforced server-side, use the Supabase service role only in server code, prevent privilege escalation, avoid account enumeration, and revoke/deactivate access promptly.
- Likely modules: Admin staff-management route and forms, service-role account adapter, `staff_profiles` administration policy/migration, invitation-email adapter/configuration, audit event boundary, and RBAC tests.
- Risks: Production email sender/domain, invitation validity, resend/rate-limit policy, recovery/MFA policy, and remote Supabase ownership remain client decisions.
### Acceptance Criteria
1. Only an authenticated `administrator` can access the staff-account management screen or its server actions.
2. The first Administrator is created only by the existing server-side provisioning workflow; the UI cannot create or promote another Administrator.
3. An Administrator can invite/create a `staff` or `organizer` account from a labelled, validated interface without using a terminal.
4. An invited user can securely establish access through the approved Supabase invitation/password flow.
5. An Administrator can view non-sensitive account status, update a permitted role, and deactivate/reactivate a managed account; deactivated users cannot access protected administration routes.
6. Direct requests, malformed input, duplicate-email behavior, and privilege-escalation attempts fail safely without leaking account details.
7. Account-management actions are covered by automated authorization and integration tests, including negative paths.
### Automated Tests
1. Administrator-only route/action authorization and direct-request rejection tests.
2. Invitation/create, allowed-role validation, duplicate-email, and safe-error tests.
3. Role-update, activation/deactivation, and deactivated-session access tests.
4. Privilege-escalation prevention tests, including attempts to create or promote an Administrator.
### Manual Tests
1. Create or invite a Staff and an Organizer account from the administrator interface and complete their first sign-in.
2. Verify each new account sees only its permitted administration sections.
3. Change a permitted role and verify access changes after session refresh.
4. Deactivate an account and verify protected-route access is denied; reactivate and verify the approved recovery flow.
5. Review desktop/mobile keyboard labels, validation, generic error messages, and invitation/resend behavior.

## F-003 - Rijswijk Event Management and Publication
- Status: PASSED
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
- Status: PASSED
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
- Status: PASSED
- Business objective: Deliver the main visitor-facing event experience.
- User/technical story: Visitors understand the event, browse key information, and reach the external ticket provider.
- Requirement sources: FR-002, FR-003, FR-006, FR-023.
- Dependencies: F-001, F-003, F-004 PASSED.
- In scope: Home, About, Tickets, Contact information/map placeholder integration boundary, static Paris 2027; dynamic event/featured exhibitor data; external ticket CTA.
- Out of scope: Contact form submission (F-008), managed Media/Press or legal-content editing, and final migration (F-011).
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

## F-007 - Static Floor-Plan Management and Display
- Status: PASSED
- Business objective: Give visitors a usable static venue plan without interactive booth allocation.
- User/technical story: Visitors view/download the plan; authorized staff replaces it.
- Requirement sources: FR-019.
- Dependencies: F-002, F-005 PASSED.
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
- Status: PASSED
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

## F-009 - Fair Match Information and Request Form
- Status: PASSED
- Business objective: Explain Fair Match and route a simple request to the organizing team for manual offline follow-up.
- User/technical story: A visitor reads how the service works and submits approved contact/request details; the organizing team follows up outside the website.
- Requirement sources: FR-007, FR-008; proposal and latest client scope clarification.
- Dependencies: F-002, F-008 PASSED.
- In scope: Fair Match information page, contact or matchmaking request form, validation, email forwarding, and inclusion with authorized staff form requests.
- Out of scope: Clinic selection/list management for matching, preferred appointment dates/times, availability engine, appointment booking, status actions, clinic dashboards, chat, favorites, algorithmic matching, and calendar synchronization.
- Security/data considerations: Personal-data minimization, authorization for staff request viewing, rate limiting, and safe email forwarding.
- Likely modules: Fair Match content, form validation, shared request record, email adapter.
- Risks: Final request fields, recipient, privacy notice, and notification wording remain client decisions.
### Acceptance Criteria
1. Public page accurately explains the manual Fair Match process without booking or availability claims.
2. Requester can submit the approved contact/request fields.
3. The request is validated, recorded with other website requests, and forwarded to the nominated organizing-team recipient.
4. The admin has no Fair Match appointment, status, confirmation, rescheduling, or decline workflow.
### Automated Tests
1. Request validation and forwarding tests.
2. Authorization tests for staff viewing website requests.
3. Rate-limit and notification adapter tests.
### Manual Tests
1. Submit a Fair Match request and verify it reaches the nominated recipient.
2. Verify the staff request list has no appointment-management actions.
3. Verify no misleading automated-booking claims are visible.

## F-011 - Content Migration and Five-Language Integration
- Status: AWAITING_TEST
- Business objective: Replace placeholders with approved, coherent event content.
- User/technical story: Visitors receive accurate, validated content across all five languages.
- Requirement sources: FR-020..026, INT-009.
- Dependencies: F-005, F-007, F-008, F-009 PASSED.
- In scope: Useful current text, exhibitor/practical data, supplied assets, redirects, translation import, Arabic review, content provenance.
- Out of scope: Automatic old-photo import; unapproved legal/medical claims; certified translation.
- Security/data considerations: Rotated/safe migration access only; remove metadata/secret leakage; preserve privacy.
- Likely modules: Import scripts, seed/content files, redirect map, and static supplied-asset integration.
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
- Status: PASSED
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
- Status: AWAITING_EXTERNAL_DEPLOYMENT
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
