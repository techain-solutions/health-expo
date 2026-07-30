# Project Progress

## Current State
- Project gate: `AWAITING_TEAM_TEST`
- Active feature: `F-011 - Content Migration and Five-Language Integration`
- Active feature status: `AWAITING_TEST`
- Last confirmed event: F-011 audit remediation was implemented and internally verified on 2026-07-30.
- Current blocker: Production email delivery and deployment require approved sender/recipient values, a provider API key, and production access. Final client-owned copy/assets remain required where noted.
- Delivery mode: Client authorized automatic progression through all remaining planned features on 2026-07-30. Codex will internally verify each feature, mark it passed under this standing approval, and continue sequentially; client performs one final end-to-end acceptance pass. Removed F-006 and F-010 remain excluded.

## Feature Status
| ID | Feature | Status | Dependencies | Test Result |
|---|---|---|---|---|
| F-000 | Runnable Project Foundation | PASSED | None | User approved on 2026-07-29 after 2 automated tests and manual HTTP smoke |
| F-001 | Static Design Migration, Multilingual Shell, and RTL | PASSED | F-000 PASSED | User approved on 2026-07-30 after exact design repair and browser QA |
| F-002 | Staff Authentication and RBAC | PASSED | F-000, F-001 PASSED | User explicitly approved after local three-role testing on 2026-07-30 |
| F-014 | Administrator-Managed Staff Accounts | PASSED | F-002 PASSED | User explicitly approved after local team-management testing on 2026-07-30 |
| F-003 | Rijswijk Event Management and Publication | PASSED | F-002 PASSED | Local migration, validation, draft API boundary, Auth/RLS checks, 26 tests, lint, typecheck, build, and schema lint passed under standing approval |
| F-004 | Exhibitor Management and Public Directory | PASSED | F-001, F-002 PASSED | Local migration, public active ordering boundary, role-gated administration, 28 tests, lint, typecheck, build, and schema lint passed under standing approval |
| F-005 | Public Core Pages and External Ticket Journey | PASSED | F-001, F-003, F-004 PASSED | Published event and active-exhibitor public rendering, safe ticket redirect, 30 tests, lint, typecheck, and build passed under standing approval |
| F-007 | Static Floor-Plan Management and Display | PASSED | F-002, F-005 PASSED | Local Storage migration/reference, safe upload validation, RBAC, public view/download, 32 tests, lint, typecheck, build, storage smoke, and schema lint passed under standing approval |
| F-008 | Contact, Participation, and Accreditation Requests | PASSED | F-001, F-002, F-005 PASSED | Public validation, honeypot, deduplication, persistence, staff inbox/outbox and API smoke passed under standing approval; production sender/recipient remains unconfigured |
| F-009 | Fair Match Manual Request Workflow | PASSED | F-002, F-008 PASSED | Manual-only information, validated request persistence and authorized inbox passed under standing approval |
| F-011 | Content Migration and Five-Language Integration | AWAITING_TEST | F-005, F-007, F-008, F-009 PASSED | Five-language public experience, managed exhibitors, secure request intake/outbox, metadata, responsive RTL, and audit remediation internally verified |
| F-012 | SEO, Accessibility, Performance, Security Hardening | PASSED | F-011 PASSED | SEO routes, security headers, clean build and production dependency audit passed |
| F-013 | Deployment, Domain, SSL, Launch Verification | AWAITING_EXTERNAL_DEPLOYMENT | F-012 PASSED | Vercel runbook and environment template ready; remote authority required |

## Completed Work
- Normalized client conversation, approved functional specification, proposal, supplied content resources, and team standards.
- Resolved later statements over earlier language, media-migration, timeline, budget, Fair Match, and portal statements.
- Created requirement-to-feature traceability.
- Prepared one F-000 Codex task only.

## Current Work
- F-011 is implemented and is the sole feature awaiting team acceptance testing.
- Five-language public content, managed exhibitor rendering, localized metadata, secure request intake, outbox-backed notification delivery, and staff request management are implemented locally.
- Production email delivery remains configuration-dependent; without the optional Resend variables, requests remain visible in the staff inbox and pending in the outbox.
- No next feature has been started.

## Awaiting Verification
- Team acceptance testing for F-011 in English, Dutch, Turkish, Russian, and Arabic.
- Client review of final translations, legal copy, programme, ticket URL, social links, and downloadable assets when supplied.
- Production email delivery after the Resend key, verified sender, and approved recipient are configured.
- Production Supabase migration and deployment validation.

## Failed Tests and Repairs
- A temporary attempt to override the development-only `brace-expansion` advisory with version 5.0.8 made ESLint fail because older `minimatch` expects the CommonJS v1 API. The incompatible override was removed. Production dependencies are clean under `npm audit --omit=dev`; the remaining full-audit advisory is limited to the lint toolchain and currently has no non-breaking npm-proposed fix.
- The first Ruby workflow parse command used an unavailable `safe_load_file` method. The equivalent `YAML.safe_load(File.read(...))` check passed.
- The first F-001 Vitest run could not resolve the `@` source alias. The alias was added to `vitest.config.ts`; the final run passed all 6 tests.
- The first mobile-menu keyboard check exposed a native `<summary>` role mismatch. Explicit button semantics and Enter/Space handling were added; the final browser check passed.
- Team testing found that the migration had retained Material Symbols styling without loading the approved Google Fonts resource and had substituted Unicode glyphs in React views. The exact `Material Symbols Rounded` resource and original design icon names were restored; public and admin browser screenshots confirmed rendered icons rather than ligature text.
- A follow-up fidelity review found that `next/font`, emoji flags, `<details>` markup, and Google stylesheet ordering still produced measurable shell differences. The migration now uses the prototype’s exact `DM Sans`, `Manrope`, and `Noto Sans Arabic` families, the original SVG flag sprite, the original button/listbox structure and keyboard behavior, and a pinned Google Material Symbols font resource that preserves the source CSS cascade.
- The first F-002 provisioning check failed because current Supabase defaults do not auto-grant new public tables to `service_role`; the migration now grants only the explicit profile operations required by the server-only provisioning workflow, and reset/provisioning passed.
- The first email/password sign-in check failed because disabling `auth.email.enable_signup` disables the email provider itself in the local Auth server. The email provider remains enabled while global `auth.enable_signup = false` blocks self-registration; all three provisioned roles then signed in successfully.
- The first post-Supabase lint run inspected generated `supabase/.temp` runtime bundles. ESLint now ignores Supabase CLI runtime directories; application and tracked configuration lint cleanly.
- The first F-002 build rejected a non-function export from a `"use server"` module. The display-only error string moved to the login page, leaving the server-action module with async exports only; the final build passed.
- The first F-014 Vitest run could not resolve Next.js’s `server-only` marker through the new server-action import graph. Added the explicit `server-only` package and a Vitest-only no-op alias; production Next.js retains the server-only marker and all final tests pass.
- The first post-`npm ci` build invocation encountered an already-running Next.js build lock. The prior build process completed normally; a clean subsequent production build passed.

## Blockers
- Security action: rotate the disclosed legacy WordPress credential or provide a safe export before migration.
- Later features: approve remote Supabase ownership/region, production account recovery/MFA/invitation policy, floor-plan file storage, email, hosting, and retention.
- Content: provide/validate ticket URL, final event times, brand assets, exhibitors/clinics, translations, legal copy, and form recipients.

## Change Requests
- 2026-07-30 - Client removed F-006 Media Upload and Management and F-010 Media/Press and Legal/Informational Pages from the implementation plan; their existing F-001 static presentation screens remain unchanged and will not receive the removed management workflows.
- 2026-07-30 - Client requested a later Administrator-managed staff-account feature. Added F-014: the initial Administrator remains provisioned only by the server-side script; thereafter an Administrator may invite/create, assign only `staff` or `organizer`, deactivate, and reactivate other staff accounts through a future non-technical interface. No F-014 implementation was started.
- 2026-07-30 - Client authorized automatic feature acceptance and sequential implementation for every remaining planned feature, with one final client test at the end. This standing approval does not restore removed F-006/F-010 or authorize deferred/out-of-scope work.
- The requested exhibitor portal is recorded as DEFERRED, not active scope.
- 2026-07-24 - Scope clarification: Fair Match remains an information/request form forwarded to the organizing team for manual follow-up. Appointment booking, availability, clinic dashboards, and request-status management are not included.
- 2026-07-26 - Client request: publish the supplied English exhibitor manual in a documents menu at the bottom of the website, in the place where the general terms will later be added. Implemented in the client-approval prototype only. The client also asked for a three-part English agreement, a flyer, and an English stand-information document; those files have not been supplied and are recorded as awaited inputs in `CLIENT_CONTEXT.md`.

## Next Eligible Feature
- None. Do not start another feature until F-011 receives explicit team approval.

## Activity Log
- 2026-07-24 - NEW_PROJECT intake completed from supplied conversation, specifications, proposals, resources, and standards.
- 2026-07-24 - Security note recorded: disclosed legacy WordPress credential must not be used and requires rotation.
- 2026-07-24 - Project gate set to `READY_FOR_CODEX`; F-000 set to `READY`.
- 2026-07-24 - Static client-approval prototype aligned with the proposal’s internal-admin scope; no product feature status changed.
- 2026-07-24 - Public client-approval prototype visually elevated with bespoke editorial expo photography and refined premium landing-page art direction; no product feature status changed.
- 2026-07-24 - Replaced the portrait-style public hero with a cinematic landscape campaign treatment after design feedback; no product feature status changed.
- 2026-07-24 - Refined the public sector widgets into spaced, bordered rectangular cards after visual design feedback; no product feature status changed.
- 2026-07-24 - Corrected hero secondary-call-to-action contrast for the dark cinematic background after visual design feedback; no product feature status changed.
- 2026-07-24 - Replaced public-sector cards with an integrated numbered editorial ribbon after visual design feedback; no product feature status changed.
- 2026-07-24 - Aligned the client-approval prototype with the supplied client documents: corrected Fair Match to the confirmed flow (participating-clinic list + choose-clinic + preferred date/time, manual confirm), added the spec-required Featured Exhibitors section, populated real venue/contact data (De Broodfabriek, Volmerlaan 12, 2288 GD Rijswijk; info@expofuar.nl; +31 (0)570 238 100) with a map link, and corrected stand-package copy to the price list; decorative photography remains temporary direction imagery pending client-supplied photos; no product feature status changed.
- 2026-07-24 - Refocused the static admin client-approval prototype to the requested management areas only: event information, exhibitors, photos/videos, website-form requests, and external ticketing link. Removed speakers, floor plan, page-content builder, user management, settings, and project-scope previews; no product feature status changed.
- 2026-07-27 - Added the client-supplied English exhibitor manual to the client-approval prototype as `design/downloads/participant-manual-2026-en.pdf` and introduced a footer Documents menu holding the manual, the already-published PDFs, and a link to the general-terms page. Labels translated for all five languages. No product feature status changed; F-000 remains `READY`.
- 2026-07-27 - Replaced decorative character icons in the public and admin client-approval prototypes with Google Material Symbols, including navigation, actions, status, search, location, downloads, and administration controls. No product feature status changed; F-000 remains `READY`.
- 2026-07-29 - Started F-000 and set its status to `IN_PROGRESS`.
- 2026-07-29 - Added the Next.js 16 TypeScript foundation, neutral root placeholder, minimal health route, Vitest smoke tests, npm scripts, locked dependencies, CI workflow, safe environment example, and local run documentation.
- 2026-07-29 - Verified `npm ci`, lint, typecheck, 2/2 tests, production build, root and health HTTP 200 responses, workflow YAML parsing, tracked-file secret patterns, diff whitespace, and a production dependency audit with zero vulnerabilities.
- 2026-07-29 - Set the project gate to `AWAITING_TEAM_TEST` and F-000 to `AWAITING_TEST`; no later feature was started.
- 2026-07-29 - User explicitly confirmed `TEST PASSED for F-000`. F-000 was marked `PASSED` and the gate moved to `AWAITING_NEXT_FEATURE_PROMPT`; no later feature was started.
- 2026-07-29 - At the user's direction, replaced the completed F-000 prompt with F-001 for complete static design migration into Next.js. Expanded the F-001 presentation scope to all approved public and admin prototype views while explicitly excluding Supabase and real actions. Gate set to `READY_FOR_CODEX`; implementation has not started.
- 2026-07-29 - Started F-001 and set it to `IN_PROGRESS`.
- 2026-07-29 - Migrated the complete approved public and administration prototype into typed Next.js routes and reusable shells, copied the approved assets/documents to `public/`, and added five-locale shell routing with Arabic RTL.
- 2026-07-29 - Kept every form and business-effect control inert, added route/locale/static-presentation tests, and verified 27 representative URLs, the exact health response, responsive desktop/mobile layouts, keyboard navigation, language route preservation, administration role preview, and static form behavior.
- 2026-07-29 - Final verification passed: lint, typecheck, 4 test files/6 tests, production build, production dependency audit with zero vulnerabilities, secret-pattern scan, and whitespace check. Gate set to `AWAITING_TEAM_TEST`; F-001 set to `AWAITING_TEST`. No F-002 or backend work was started.
- 2026-07-29 - Team requested an F-001 icon-fidelity repair. F-001 moved to `IN_REPAIR`; the app was matched to the exact Google `Material Symbols Rounded` resource, original public icon names, and original administration icon names from `design/`.
- 2026-07-29 - Icon repair verification passed: lint and typecheck clean, 4 test files/7 tests passed, production build passed, and live public/admin browser screenshots showed rendered Material Symbols. F-001 returned to `AWAITING_TEST`; no later feature was started.
- 2026-07-29 - Team requested a stricter `/design` fidelity repair. F-001 moved to `IN_REPAIR`; source and migrated pages were served side-by-side at the same desktop viewport.
- 2026-07-29 - Restored exact typography families/weights, source SVG flags, language button/listbox markup, focus movement, arrow-key handling, Escape/Tab closing, outside-click behavior, and mobile menu state behavior. Measured source/migrated language controls matched exactly: trigger 87.73×40, flag 21×14, caret 16×16, menu width 178, identical coordinates and spacing.
- 2026-07-29 - Final fidelity repair verification passed: lint and typecheck clean, 4 test files/8 tests passed, production build passed, production audit reported zero vulnerabilities, CSS diff contained only Next public-path/safety/adaptation changes, and public/admin comparisons matched the approved typography and icon layout. F-001 returned to `AWAITING_TEST`.
- 2026-07-30 - Removed F-006 and F-010 from the feature plan at the client's direction. Updated F-007 and F-011 dependencies without renumbering the remaining feature IDs; no application code or later feature implementation was started.
- 2026-07-30 - User explicitly approved F-001 and directed Codex to start F-002. F-001 was marked `PASSED`; F-002 and the project gate moved to `IN_PROGRESS` / `CODEX_IMPLEMENTATION`.
- 2026-07-30 - Implemented F-002 with local Supabase Auth, tracked staff-role migration and RLS, SSR cookie clients, session-refresh Proxy, server-side route authorization, login/logout/forbidden states, safe provisioning scripts, and environment-based remote replacement.
- 2026-07-30 - Verified local database reset and schema lint, three-role Auth/RLS integration, role immutability, 6 test files/16 tests, lint, typecheck, production build, unauthenticated redirects, exact 403 responses, sign-out, generic invalid-login feedback, desktop/mobile layouts, public routes, and health. F-002 moved to `AWAITING_TEST`; F-003 was not started.
- 2026-07-30 - User explicitly confirmed F-002 testing passed and authorized the next planned F-014. F-002 moved to `PASSED`; F-014 moved to `IN_PROGRESS`. No other feature was started.
- 2026-07-30 - Implemented F-014 with protected `/admin/team`, Administrator-only server actions, service-role-only Auth management, validated local initial-password account creation for Staff/Organizer, allowed-role updates, deactivation/reactivation, and minimal lifecycle audit events. The bootstrap Administrator remains script-provisioned and UI-protected.
- 2026-07-30 - Verified migration reset/schema lint, local account/RLS checks, 7 test files/24 tests, lint, production build, production audit, and real browser creation, role update, deactivation denial, reactivation, and Staff `/admin/team` 403. F-014 moved to `AWAITING_TEST`; no other feature was started.
- 2026-07-30 - User explicitly confirmed F-014 testing passed and authorized F-003. F-014 moved to `PASSED`; F-003 moved to `IN_PROGRESS`. No other feature was started.
- 2026-07-30 - Implemented F-003 event model, draft/publication state, server-side validation, role-gated actions, audit table, and draft-only public API boundary. Internal migration, Auth/RLS, lint, typecheck, 26 tests, build, schema lint, and draft API checks passed; advanced to `PASSED` under DEC-021. F-004 moved to `IN_PROGRESS`.
- 2026-07-30 - Completed F-011 acceptance-audit remediation: five-language public content and metadata, managed exhibitor presentation, Arabic RTL, secure request intake, persistent notification outbox with optional delivery, request-management refinements, truthful missing-content states, and security/performance repairs. Local tests, build, database reset/lint/integration, HTTP checks, responsive browser checks, dependency audit, and whitespace checks passed. F-011 moved to `AWAITING_TEST`; no next feature was started.
- 2026-07-30 - Completed the F-011 counter-audit repair: restored visible destructive-button contrast and sizing in both admin tables, moved request throttling from process memory to atomic HMAC-keyed Supabase sliding windows, removed remaining illustrative programme blocks, corrected the home title, and increased small admin table typography. F-011 remains `AWAITING_TEST`; no next feature was started.
