# Handoff

## 2026-07-31 administration CRUD and spacing repair

- Fixed the exhibitor Edit control: it now selects the row and opens the modal locally. The previous same-route URL navigation could update the selected record while retaining the client dialog's closed state.
- Added a focused regression test to prevent reverting the Edit control to same-page navigation.
- Browser verification passed for exhibitor create/update/delete with an uploaded image; the temporary QA exhibitor and its Storage object were deleted afterwards. Event save, draft/publish/restore, request review/delete with a temporary request removed afterwards, and staff role/access updates were also exercised. The original event and staff states were restored.
- Floor-plan storage verification passed through `npm run floor-plan:test:local`. At 1440 px, the administration page uses the approved 30 px outer padding and 25 px heading separation; at 390 px it correctly changes to 18 px/12 px spacing and scrolls wide tables within their panel.
- Verification passed: `npm run lint`; `npm run typecheck`; `npm test` (16 files, 49 tests); `npm run build`; `npm run floor-plan:test:local`; `npm run requests:test:local`; and `npm run staff:test:local`.
- No database migration or environment-variable change was made. F-011 is `AWAITING_TEST`; no next feature was started.

## 2026-07-31 exhibitor, floor-plan, and admin-shell acceptance repair

- Working branch is local `main`. The completed application branch was merged locally because remote `main` still contained only the earlier prototype baseline. No push was performed.
- Migration `20260731164521_exhibitor_images.sql` creates the public `exhibitor-images` bucket (JPG/PNG/WebP, 5 MB) and adds paired image metadata to exhibitors.
- New exhibitors require an image. Existing exhibitors without one retain the initial fallback until edited. Image files are removed when their exhibitor is deleted.
- The exhibitor form is no longer rendered beside the table. “New exhibitor” opens an accessible dialog-style popup; edit URLs open the same popup with the current record and image.
- Managed exhibitor images render in the admin table, public cards, featured cards, and exhibitor detail page.
- Managed PDF floor plans render inline at a responsive height. `/api/floor-plan/download` returns the current plan as an attachment; image plans retain the large-preview action.
- Every authenticated admin business page now renders inside the shared administration shell, keeping sidebar, topbar, role context, and sign-out visible on desktop.
- CSP now permits the environment-specific Supabase origin for public images and embedded PDF frames.
- Verification passed: migration-up, database lint, lint, typecheck, 15 test files/48 tests, production build, production dependency audit (0 vulnerabilities), whitespace check, download HTTP headers, browser popup/sidebar/PDF checks, real local image create/render/delete, and Storage cleanup.
- The pre-existing local audit document and generated `next-env.d.ts` change were preserved in `stash@{0}` named `preserve-local-audit-before-main-switch` before switching branches.

## 2026-07-30 F-011 counter-audit repair

- Corrected the destructive row-action cascade. Delete buttons in both `/admin/exhibitors` and `/admin/requests` now retain red/white contrast and content-sized dimensions.
- Browser measurements: exhibitor buttons are 84×38 px and request buttons are 64×38 px, with `rgb(196, 88, 77)` backgrounds and white text.
- Replaced the per-process request counter with an atomic Supabase sliding-window function and `request_throttle_events`. Stored keys are HMAC-SHA256 digests; raw IP/e-mail identifiers are never persisted.
- The limiter applies 5 requests per network/normalized-email identity and a broader 30-request network ceiling per ten minutes.
- Runtime verification accepted five identical valid submissions and rejected the sixth with HTTP 429. The database contained the expected 11 events: six network checks and five accepted identity checks.
- Final verification passed: `npm run lint`; `npm run typecheck`; `npm test -- --run` (14 files, 46 tests); `npm run build`; `npm run requests:test:local`; `npm audit --omit=dev` (0 vulnerabilities); `git diff --check`; `npm run supabase:reset`; and `npx supabase db lint --local --level warning`.
- Removed still-illustrative programme structure/speaker surfaces until confirmed client content is available.
- Corrected the redundant home title. Confirmed the WebP hero and CSP were already active in the corrected implementation.
- Increased administration table/filter/helper/field-label typography to 10–11 px.
- The local database was reset as requested; the supplied QA Administrator was re-provisioned for browser verification. The prior Fair Match QA row was removed by the reset.
- F-011 remains `AWAITING_TEST`. No next feature was started.

## 2026-07-30 F-011 audit remediation

- Status: `AWAITING_TEST`.
- Implemented production-oriented public content in English, Dutch, Turkish, Russian, and Arabic; managed exhibitor rendering and filtering; localized metadata and event structured data; truthful programme/ticket fallbacks; and Arabic RTL document semantics.
- Hardened request intake with origin, body-size, schema, consent, honeypot, and bounded rate-limit validation.
- Added database-first notification outbox processing with an optional Resend adapter. Without approved delivery configuration, requests remain available in the staff inbox and notifications remain pending.
- Preserved the staff request workflow and exhibitor CRUD, and repaired responsive request-table payload rendering.
- Migration `20260730140000_request_type_text.sql` converts request type/status storage to constrained text, adds request indexes and delete authorization, and adds outbox attempt fields.
- Optional environment variables: `RESEND_API_KEY`, `FORM_NOTIFICATION_FROM`, and `FORM_NOTIFICATION_TO`.
- Verification passed: `npm run lint`; `npm run typecheck`; `npm test` (14 files, 43 tests); `npm run build`; `npm audit --omit=dev` (0 vulnerabilities); `git diff --check`; `npm run supabase:reset`; `npx supabase db lint --local --level warning`; and `npm run requests:test:local` (Fair Match insert/read/delete).
- Local HTTP checks passed for validation errors, origin rejection, rate limiting, payload limits, malformed JSON, CSP, localized metadata/alternate links, Arabic RTL, and unknown exhibitor 404 behavior.
- In-app browser checks passed for the English home, Arabic contact at 390×844 without overflow, exhibitor no-result filtering, and the no-ticket-URL state.
- Not run: production deployment, production Supabase migration, hosted CI, or real email delivery. These require production authority plus an approved API key, verified sender, and recipient.
- Client acceptance remains required for translations, legal content, final programme, ticketing URL, social links, and downloadable assets.
- Known risks: outbox retries are opportunistic rather than scheduled; translation and legal accuracy require client approval.
- Manual verification: review all locales; submit each form; check the staff inbox; configure staging email and verify outbox delivery/retries; exercise request filters/status/notes/deletion; exercise exhibitor CRUD; install final client content; deploy to staging and repeat smoke, responsive, accessibility, and RTL checks.
- No next feature was started.

## 2026-07-30 autonomous progression update
- F-004 was internally verified and passed under DEC-021: local Supabase exhibitor persistence, active/featured/order controls, role-gated administration, and public active-only reads are implemented.
- F-005 was internally verified and passed under DEC-021: public home, directory/detail and tickets routes consume only published event data and active exhibitors through server-only service boundaries. `/go/tickets` permits only HTTP(S) configured ticket destinations and otherwise falls back locally; no payment form is present.
- F-005 verification: `npm run lint`, `npm run typecheck`, `npm test` (10 files/30 tests), `npm run build`, and `git diff --check` passed.
- F-007 is active. It must provide one safe, replaceable static floor-plan reference and public view/download only; do not build booths, allocation, reservations, payments, or a general media library.

## 2026-07-30 floor-plan completion
- F-007 passed under DEC-021. Migration `20260730115219_floor_plan.sql` creates a public `floor-plans` Storage bucket limited to PDF/JPEG/PNG/WebP at 10 MB plus a server-only floor-plan reference.
- Admin and Staff can replace the asset; Organizer can view it only. Public pages render/open/download the current managed asset and retain the approved bundled fallback until the first upload.
- Local verification reset the database, provisioned roles, uploaded the bundled plan through the Storage API, read the reference, confirmed the public page output, and passed schema lint, lint, typecheck, 11 test files/32 tests, build, and whitespace checks.
- F-008 is active. Keep notification delivery provider-neutral and use a privileged persistent outbox until client supplies an approved sender/recipient/retention policy.

## Current State
- Gate: `AWAITING_TEAM_TEST`
- Active feature: `F-014 - Administrator-Managed Staff Accounts`
- Status: `AWAITING_TEST`
- F-000, F-001, and F-002 were explicitly approved. F-014 implementation and internal verification are complete; team acceptance is required.

## F-014 Implementation Summary
- Added the Administrator-only `/admin/team` route and navigation item. Staff and Organizer direct requests receive the existing server-generated 403 response.
- Added labelled, keyboard-accessible account creation for only `staff` and `organizer`, with server-side validation of name, email, role, and a minimum 12-character initial password.
- Added server-authorized role change plus deactivate/reactivate controls for ordinary staff accounts.
- Kept every Administrator record visible but protected: the UI exposes no control to create, promote, edit, deactivate, or reactivate an Administrator; server actions reject this even if a request is forged.
- Added a dedicated server-only Supabase service-role client. The secret remains outside browser code and is used only after the current authenticated user is confirmed as an Administrator.
- Added the tracked `staff_account_events` audit table. It records only actor UUID, target UUID, action, and timestamp for create, role change, deactivation, and reactivation; passwords and form payloads are never recorded.
- The local workflow uses an Administrator-supplied initial password so it is functional without a remote sender. Production invitation email remains deliberately unimplemented until remote Supabase email configuration is approved.

## F-014 Routes and Authorization
- Management route: `/admin/team`.
- Administrator: can list and manage Staff/Organizer accounts.
- Staff and Organizer: `/admin/team` returns the custom forbidden response.
- Unauthenticated `/admin/team`: redirects to `/admin/login` with a safe return path.

## F-014 Files Created and Modified
- Created: `supabase/migrations/202607300002_staff_account_events.sql`, `src/lib/supabase/service.ts`, `src/lib/auth/staff-management.ts`, `src/lib/auth/staff-management-input.ts`, and `src/lib/auth/staff-management.test.ts`.
- Created: `src/app/admin/team-actions.ts` and `src/test/server-only.ts`.
- Modified: `src/lib/site.ts`, `src/lib/supabase/database.types.ts`, `src/lib/auth/permissions.ts`, `src/lib/auth/permissions.test.ts`, `src/app/admin/[[...page]]/page.tsx`, `src/components/admin-preview.tsx`, `src/app/admin/admin.css`, `vitest.config.ts`, `package.json`, and `package-lock.json`.
- Modified documentation/environment: `.env.example`, `README.md`, `.ai/CODEX_NEXT_PROMPT.md`, `.ai/FEATURE_PLAN.md`, `.ai/PROGRESS.md`, `.ai/HANDOFF.md`, `.ai/ARCHITECTURE.md`, and `.ai/DECISIONS.md`.

## F-014 Database, Migration, and Environment Changes
- Migration `202607300002_staff_account_events.sql` creates the RLS-protected audit table and grants its access only to `service_role`.
- `SUPABASE_SERVICE_ROLE_KEY` is now required in the secure server runtime for the F-014 server actions as well as the provisioning script. It remains absent from all browser bundles and has no `NEXT_PUBLIC_` prefix.
- No remote Supabase project, sender, Site URL, allowed redirect URL, or email template was configured. No real outbound email is sent locally.

## F-014 Commands and Exact Results
- `npm ci` — passed; 403 locked packages installed and 404 audited. Full audit retains 9 documented development-only ESLint-chain advisories.
- `npm run lint` — passed; no ESLint findings.
- `npm run typecheck` — passed; no TypeScript diagnostics.
- `npm test` — passed; 7 files and 24 tests passed.
- `npm run supabase:reset` — passed; both F-002 and F-014 migrations applied.
- `npm run staff:provision:test-local` — passed; three loopback-only role accounts provisioned.
- `npm run staff:test:local` — passed; Administrator, Staff, and Organizer Auth/RLS checks and rejected self-role mutation verified.
- `npx supabase db lint --local --level warning` — passed; no schema errors.
- Browser lifecycle — passed: Administrator created an Organizer, changed it to Staff, deactivated it (login rejected), reactivated it, and the reactivated Staff received the server-generated forbidden page at `/admin/team`.
- Audit verification — passed; four lifecycle audit events recorded for the browser-created test account.
- `npm run build` — passed; Next.js 16.2.12 production build succeeded.
- `npm audit --omit=dev` — passed; 0 production vulnerabilities.
- `git diff --check` — passed; no whitespace errors.

## F-014 Tests Not Run
- Hosted GitHub Actions was not run because changes were not pushed.
- Remote Supabase and Vercel checks, verified transactional sender, email invitation/resend flow, password recovery, and MFA were not run because remote ownership/configuration is not available and they are outside F-014.
- A dedicated screen-reader session was not run; native form labels, status/alert messaging, headings, keyboard-accessible controls, and responsive browser behavior were checked.

## F-014 Known Limitations and Risks
- The client must share locally created initial passwords via a secure out-of-band channel; the application never shows them after submission.
- A real invitation flow must wait for remote Supabase Auth email sender/template, Site URL, and redirect-url configuration.
- Account deletion, password recovery, MFA, self-service profiles, and administrator delegation are intentionally excluded.
- The existing administration business controls outside team access remain static until their separately gated features.

## F-014 Manual Verification Checklist
1. Sign in as the script-provisioned Administrator and open `/admin/team`.
2. Confirm the bootstrap Administrator row is labelled protected and has no editable role or state controls.
3. Create a Staff and an Organizer using unique non-production emails and secure initial passwords.
4. Sign out before testing each newly created account; confirm its role badge/navigation matches the assigned role.
5. As Staff or Organizer, directly open `/admin/team` and confirm the custom access-denied page.
6. As Administrator, change Staff to Organizer (or the reverse), sign in again as that account, and confirm the adjusted navigation.
7. Deactivate an account, confirm its login is rejected, reactivate it, and confirm a fresh login succeeds.
8. Test desktop and 390×844 mobile layouts, tab order, labels, validation, success/error messages, and absence of horizontal overflow.

## F-002 Implementation Summary
- Added the Supabase CLI local stack with a tracked migration for `staff_profiles`, a strict `staff_role` enum, active-state enforcement, RLS self-read, and no authenticated role mutation.
- Added Supabase SSR browser/server clients and a Next.js 16 Proxy that refreshes Auth cookies for administration routes.
- Added a server-side authentication data-access boundary using `auth.getUser()` plus the database-backed profile; missing, inactive, malformed, or mismatched profiles fail closed.
- Replaced the static role selector with the authenticated staff identity and stored role.
- Added real email/password sign-in, current-session sign-out, generic invalid-login feedback, a disabled missing-configuration state, and a server-generated 403 page.
- Enforced the role matrix on every known administration page: Administrator has all current presentation routes, Staff cannot access ticketing, and Organizer is limited to dashboard/event/exhibitors.
- Kept all event, exhibitor, media, request, ticketing, upload, and publication controls presentation-only; F-003 and later behavior was not started.
- Added server-only staff provisioning plus loopback-only generated test-account and Auth/RLS verification helpers. No password or token is committed or printed.

## F-002 Routes and Authorization
- Public login: `/admin/login`.
- Protected administration: `/admin`, `/admin/dashboard`, `/admin/event`, `/admin/exhibitors`, `/admin/media`, `/admin/requests`, `/admin/ticketing`.
- Unauthenticated known administration routes redirect to `/admin/login` with a safe administration-only return path.
- Authenticated users without an active valid staff profile, and roles requesting a disallowed route, receive the custom server-generated 403 response.

## F-002 Files Created and Modified
- Created: `supabase/config.toml`, `supabase/.gitignore`, `supabase/seed.sql`, `supabase/migrations/202607300001_staff_auth_rbac.sql`.
- Created: `scripts/sync-local-supabase-env.mjs`, `scripts/provision-staff.mjs`, `scripts/provision-local-test-staff.mjs`, `scripts/check-local-auth.mjs`.
- Created: `src/proxy.ts`, `src/lib/supabase/config.ts`, `client.ts`, `server.ts`, `proxy.ts`, and `database.types.ts`.
- Created: `src/lib/auth/permissions.ts`, `session.ts`, `dal.ts`, `permissions.test.ts`, and `session.test.ts`.
- Created: `src/app/admin/auth-actions.ts`, `src/app/admin/login/page.tsx`, and `src/app/admin/forbidden.tsx`.
- Modified: `src/app/admin/[[...page]]/page.tsx`, `src/app/admin/admin.css`, `src/components/admin-preview.tsx`, `src/components/static-presentation.test.tsx`.
- Modified: `package.json`, `package-lock.json`, `next.config.ts`, `eslint.config.mjs`, `.env.example`, `.gitignore`, and `README.md`.
- Modified documentation: `.ai/CODEX_NEXT_PROMPT.md`, `.ai/FEATURE_PLAN.md`, `.ai/PROGRESS.md`, `.ai/HANDOFF.md`, `.ai/ARCHITECTURE.md`, `.ai/REQUIREMENTS.md`, and `.ai/DECISIONS.md`.

## F-002 Database, Migration, and Environment Changes
- Local database: Supabase PostgreSQL 17 through CLI 2.110.0.
- Migration: creates `public.staff_role`, `public.staff_profiles`, update timestamp trigger, explicit grants, RLS, and an own-profile select policy.
- Seed: deliberately contains no login-capable user or password.
- `.env.example`: documents `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and server-only `SUPABASE_SERVICE_ROLE_KEY` placeholders.
- `.env.local`: generated from the running local stack, permission-restricted and ignored by Git.
- `.auth-test.local.json`: contains random loopback-only role-test credentials, permission-restricted and ignored by Git.
- Remote Supabase and Vercel values: none created or configured.

## F-002 Commands and Exact Results
- `npm install @supabase/ssr@0.12.4 @supabase/supabase-js@2.111.0` — passed; 10 packages added.
- `npm install --save-dev supabase@2.110.0` — passed; 8 packages added.
- `npx supabase init` — passed; local configuration created.
- `npm run supabase:start` — passed; local API, Auth, PostgreSQL, and Studio started and the migration/seed applied.
- `npm run supabase:env` — passed; ignored `.env.local` generated without printing secrets.
- `npm run supabase:reset` — passed after the final migration repair; database recreated, migration applied, seed applied, containers restarted.
- `npm run staff:provision:test-local` — passed; three loopback-only role accounts provisioned.
- `npm run staff:test:local` — passed for Administrator, Staff, and Organizer; authentication, single-row RLS isolation, active profile, and rejected self-role mutation verified.
- `npm ci` — passed; 402 locked packages installed and 403 audited.
- `npm run lint && npm run typecheck && npm test && npm run build` — passed; ESLint had no findings, TypeScript had no diagnostics, Vitest passed 6 files/16 tests, and Next.js 16.2.12 built all public/admin/Auth routes plus Proxy.
- `npx supabase db lint --local --level warning` — passed; no schema errors.
- `npm audit --omit=dev` — passed; zero production vulnerabilities.
- `git diff --check` — passed.
- Candidate private-key/JWT/service-key scan excluding ignored local runtime files — passed with no matches.
- HTTP smoke checks — `/admin` returned 307 to login, `/admin/login` 200, `/en` 200, and `/api/health` 200 with exact `{"status":"ok"}`.
- In-app browser checks — passed real login/logout for all three roles, Administrator ticketing access, Staff requests access plus ticketing 403, Organizer reduced navigation plus requests 403, generic invalid-login feedback, no account enumeration, and responsive 390×844 layouts without horizontal overflow.

## F-002 Tests Not Run
- Hosted GitHub Actions was not run because changes were not pushed; every workflow command passed locally.
- Remote Supabase migration/authentication and Vercel environment/deployment checks were not run because remote access and F-013 are not approved.
- Password recovery, MFA, invitation UX, public signup, and user-management UI were not tested because they are outside F-002.
- A dedicated screen-reader session was not run; semantic labels, alerts/status, headings, focusable controls, keyboard-accessible native forms, and mobile navigation were checked.

## F-002 Known Limitations and Risks
- The remote Supabase project, region, ownership, recovery policy, MFA, and production invitation process still need approval.
- Next.js custom `forbidden()` uses the documented experimental `authInterrupts` option to return the required 403 page.
- The local Supabase stack requires Docker and is development-only; it must not be exposed publicly.
- Existing administration business fields/actions remain static, including the retained media presentation route for F-001 design continuity.
- General media management F-006 and managed Media/Press/legal content F-010 remain removed.
- Full `npm audit` retains the previously documented development-only ESLint-chain advisories; production audit is clean.

## F-002 Manual Verification Checklist
1. Start Docker, then run `npm ci`, `npm run supabase:start`, `npm run supabase:env`, and `npm run supabase:reset`.
2. Provision one account for each role using the documented server-only `staff:provision` command and non-production passwords.
3. Start `npm run dev`; open `/admin` in a signed-out browser and confirm redirect to `/admin/login`.
4. Submit an invalid login and confirm the generic error does not reveal whether the account exists.
5. Sign in as Administrator; verify every current administration route is visible and `/admin/ticketing` opens.
6. Sign in as Employee / Staff; verify requests opens and direct `/admin/ticketing` returns the 403 page.
7. Sign in as Organizer; verify only dashboard, event, and exhibitors are shown and direct `/admin/requests` returns the 403 page.
8. Sign out from desktop and mobile navigation, then revisit `/admin` and confirm return to login.
9. At 390×844, verify the login form, administration menu button, sidebar, sign-out, and forbidden page remain keyboard usable without horizontal overflow.
10. Confirm `/en` still renders and `/api/health` returns HTTP 200 with exact `{"status":"ok"}`.

## F-001 Implementation Summary
- Replaced the neutral root placeholder with the approved Health & Beauty Expo presentation.
- Converted the standalone public prototype into typed React components with a shared header, navigation, language selector, mobile menu, footer, documents area, reusable presentation sections, cards, and static forms.
- Added deterministic English, Dutch, Turkish, Russian, and Arabic locale routes. The Arabic application wrapper uses `dir="rtl"`; other locales use LTR.
- Converted the standalone administration prototype into a clearly labelled static preview with dashboard, event, exhibitors, media, form-request, and ticketing-link views.
- Added static role-preview switching for Administrator, Employee / Staff, and Organizer. It changes only visible preview navigation and does not authenticate or authorize.
- Copied approved source assets and downloads from `design/` into `public/`; no runtime code depends on `design/` or `design/dist/`.
- Prevented form transmission and persistent mutation. Forms intercept submit locally, and save/upload/delete/export/purchase/authentication-style controls are disabled, inert, or labelled as previews.
- Repaired icon fidelity after team testing: loaded the same Google `Material Symbols Rounded` family and variation resource as `design/`, and restored the prototype’s original icon names across public and administration components.

## F-001 Icon Repair Evidence
- Added reusable `src/components/material-icon.tsx` markup using the prototype’s `material-symbols-rounded` class.
- Replaced Unicode arrow, chevron, location, search, dashboard, event, storefront, media, inbox, upload, edit, delete, menu, logout, and notification substitutes with their matching design ligatures.
- `npm run lint && npm run typecheck && npm test && npm run build` — passed cleanly; Vitest passed 4 files and 7 tests.
- Live browser checks at `/en/about` and `/admin` confirmed Material Symbols rendered visually instead of displaying ligature names or Unicode substitutes.
- Follow-up exact-fidelity repair removed `next/font` substitutions and emoji flags, restored the prototype’s direct `DM Sans`, `Manrope`, and `Noto Sans Arabic` families, copied its SVG flag sprite into React, and matched its button/listbox behavior.
- Side-by-side source/migration measurement confirmed identical language-control geometry: trigger 87.73×40, flag 21×14, caret 16×16, menu 178 px wide, and identical x/y coordinates, gaps, font families, and font sizes.
- The Material Symbols WOFF2 remains a Google Fonts resource but is referenced directly so Next.js head ordering cannot override the original `styles.css` icon sizes.

## F-001 Routes Delivered
- Root: `/`
- Locale shells: `/en`, `/nl`, `/tr`, `/ru`, `/ar`
- Public pages under every locale: `/about`, `/exhibitors`, `/exhibitors/nova-medical-group`, `/program`, `/tickets`, `/visit`, `/floor-plan`, `/fair-match`, `/participate`, `/participant-info`, `/media`, `/contact`, `/paris-2027`
- Legal/informational pages under every locale: `/legal/privacy`, `/legal/cookies`, `/legal/terms`, `/legal/visitors`, `/legal/exhibitors`
- Administration preview: `/admin`, `/admin/dashboard`, `/admin/event`, `/admin/exhibitors`, `/admin/media`, `/admin/requests`, `/admin/ticketing`

## F-001 Files Created and Modified
- Created: `src/lib/site.ts`, `src/lib/site.test.ts`.
- Created: `src/components/public-shell.tsx`, `src/components/public-pages.tsx`, `src/components/static-form.tsx`, `src/components/admin-preview.tsx`, `src/components/static-presentation.test.tsx`.
- Created: `src/app/public.css`, `src/app/[locale]/[[...slug]]/page.tsx`, `src/app/admin/layout.tsx`, `src/app/admin/admin.css`, `src/app/admin/[[...page]]/page.tsx`.
- Created: approved runtime assets and documents under `public/assets/`, `public/downloads/`, and `public/og.png`.
- Modified: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/page.test.tsx`, `vitest.config.ts`, `README.md`, `.ai/FEATURE_PLAN.md`, `.ai/PROGRESS.md`, `.ai/HANDOFF.md`, `.ai/DECISIONS.md`.

## F-001 Database, Migration, and Environment Changes
- Database and migrations: none.
- Supabase: not installed, scaffolded, mocked, or configured.
- Authentication, storage, email, and backend actions: none.
- Environment: no new values; `.env.example` remains comments/placeholders only.
- Deployment: standard Next.js output remains Vercel-compatible. No Vercel project, provider configuration, hosted values, domain, or deployment was created because those remain out of scope.

## F-001 Commands and Exact Results
- `npm run lint && npm run typecheck && npm test && npm run build` — passed. ESLint exited 0 with no findings; TypeScript exited 0 with no diagnostics; Vitest passed 4 files and 8 tests; Next.js 16.2.12 compiled successfully and emitted `/`, `/[locale]/[[...slug]]`, `/admin/[[...page]]`, and `/api/health`.
- Representative `curl` route matrix — passed. All 27 checked root, locale, public, legal, and administration URLs returned HTTP 200.
- `curl -sS -i http://localhost:3000/api/health` — passed with HTTP 200 and exact body `{"status":"ok"}`.
- `npm start` after the production build — passed; Next.js became ready on port 3000. Production root smoke returned HTTP 200 with the approved hero heading, and health returned HTTP 200 with exact body `{"status":"ok"}`.
- In-app browser QA — passed at representative desktop and 390×844 mobile sizes: English LTR, Arabic RTL, responsive shell, keyboard-operated mobile menu, language-route preservation (`/ar/fair-match` to `/nl/fair-match`), native legal navigation, local-only form notice, and Organizer navigation restriction.
- `npm audit --omit=dev` — passed; 0 production vulnerabilities.
- Repository-candidate assignment-like secret and private-key-header scans — passed; no matches.
- `git diff --check` — passed; no whitespace errors.
- `npm audit` — reports 9 high development-only advisories through ESLint's `minimatch`/`brace-expansion` chain; npm's complete fix requires the breaking ESLint 10 upgrade already documented under F-000.

## F-001 Tests Not Run
- `npm ci` was not repeated for F-001 because no dependency or lockfile change was needed for the migration; the locked installation passed under F-000.
- Hosted GitHub Actions was not run because the repository changes were not pushed; every workflow command passed locally.
- A dedicated screen-reader session was not run. Semantic DOM snapshots, labels, headings, roles, disabled states, direction, focus-visible styling, and representative keyboard paths were checked.
- Vercel deployment, hosted environment checks, final production content validation, and external ticket/social/contact destinations were not run because they are unapproved or intentionally absent.

## F-001 Known Limitations and Risks
- Only the shared shell labels are translated. Prototype body copy remains English where final Dutch, Turkish, Russian, and Arabic translations were not supplied.
- Exhibitors, programme entries, photographs, and some business copy remain illustrative client-validation content and need final approval.
- Legal copy is a labelled draft, not legal advice. Ticket and social destinations remain inactive until approved URLs are supplied.
- Arabic RTL is applied at the locale application wrapper because a single static root layout cannot change the document element per catch-all route.
- Forms provide a local preview notice only. Administration role switching demonstrates visual scope only and is not security enforcement.
- The disclosed legacy WordPress credential remains unusable and must be rotated or replaced with a safe export before any future migration.
- Full `npm audit` retains the known development-only ESLint-chain advisories; production dependencies report zero vulnerabilities.

## F-001 Manual Verification Checklist
1. Start with `npm run dev` and open `/`, `/en`, and at least one representative content route.
2. Check `/nl`, `/tr`, and `/ru`; change languages on a nested route and confirm the equivalent path is preserved.
3. Open `/ar/fair-match`; confirm RTL layout, Arabic shell labels, mobile navigation, and readable focus treatment.
4. Review every public page and each legal/informational route at desktop and mobile widths.
5. Use keyboard-only navigation for the primary navigation, mobile menu, language selector, legal links, and a representative form.
6. Submit a static form with non-sensitive preview text; confirm only the local “no information was stored or transmitted” notice appears and the URL does not change.
7. Review `/admin` and every administration route; switch among all three preview roles and confirm Organizer has the reduced navigation.
8. Confirm save/upload/delete/export/purchase/authentication-style controls remain disabled, inert, or explicitly labelled as static previews.
9. Open the document links in the footer and verify supplied PDFs load.
10. Confirm `/api/health` returns HTTP 200 with exact JSON `{"status":"ok"}`.

## F-000 Implementation Summary
- Initialized a current stable Next.js 16 App Router project in TypeScript at the repository root using npm.
- Added an intentionally neutral, accessible project placeholder at `/`.
- Added `GET /api/health`, returning only `{"status":"ok"}` with HTTP 200.
- Added repeatable development, lint, typecheck, test, start, and production-build scripts.
- Added Vitest smoke coverage for the root placeholder and health response.
- Added a GitHub Actions workflow that runs locked install, lint, typecheck, tests, and build on pushes and pull requests.
- Added a safe `.env.example`; F-000 requires no environment values.
- Added patched production transitive overrides for PostCSS and Sharp after the production audit identified advisories in the versions bundled by Next.js.
- Preserved the static client-approval prototype under `design/`; it was not converted into product UI because later features remain locked.

## Completed Planning Work
- Created the full AI project scaffold.
- Consolidated approved scope and later-over-earlier decisions.
- Created ordered feature plan and requirement traceability.
- Prepared a self-contained Codex prompt for F-000.
- Recorded unresolved architecture/content/privacy questions.
- Recorded the disclosed legacy credential as compromised without copying it.
- Refined the static client-approval prototype with a premium public landing-page direction; this remains separate from the gated Next.js implementation.
- Aligned the client-approval prototype with the supplied client documents: Fair Match now follows the confirmed clinic-selection + preferred date/time manual flow, a Featured Exhibitors section was added, real venue/contact data was populated (flagged to confirm before launch), and stand copy matches the price list. Decorative photography remains temporary direction imagery pending client-supplied photos. Still separate from the gated Next.js implementation; no product feature status changed.
- Refocused the static admin client-approval prototype to only the requested management areas: event information, exhibitors, photos/videos, website-form requests, and an external ticketing link. No product feature status changed.
- Published the client-supplied English exhibitor manual in the prototype and added the requested footer Documents menu, including the placeholder route for the general terms. The three-part English agreement, the flyer, and the English stand-information document were requested by the client but not supplied; they remain awaited inputs. No product feature status changed.
- Replaced all decorative character icons in the public and admin client-approval prototypes with Google Material Symbols. This remains separate from the gated Next.js implementation; no product feature status changed.

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
- Created: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts`, `eslint.config.mjs`, `vitest.config.ts`, `.env.example`, `.github/workflows/ci.yml`.
- Created: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/page.test.tsx`, `src/app/api/health/route.ts`, `src/app/api/health/route.test.ts`.
- Updated: `.gitignore`, `README.md`, `.ai/FEATURE_PLAN.md`, `.ai/PROGRESS.md`, `.ai/HANDOFF.md`, `.ai/DECISIONS.md`.

## Database, Migration, and Environment Changes
- Database and migrations: none.
- Supabase: not installed or configured; database work is explicitly out of scope for F-000.
- Environment: no runtime values are required. `.env.example` contains comments only and no secrets.
- Runtime: Node.js 22.x is documented; npm is the selected package manager.
- Deployment: the standard Next.js build is Vercel-compatible, but no provider project, production environment, domain, or deployment configuration was created because deployment is F-013.

## Commands and Exact Results
- `npm ci` — passed; 384 packages installed from `package-lock.json`.
- `npm run lint` — passed; ESLint exited 0 with no findings.
- `npm run typecheck` — passed; TypeScript exited 0 with no diagnostics.
- `npm test` — passed; 2 test files and 2 tests passed.
- `npm run build` — passed; Next.js 16.2.12 compiled successfully and produced `/`, `/_not-found`, and `/api/health`.
- `npm run dev` — passed; local server became ready at `http://localhost:3000`.
- Root HTTP smoke with `curl` — passed; HTTP 200 and the neutral heading/copy were present.
- Health HTTP smoke with `curl` — passed; HTTP 200 with exact body `{"status":"ok"}`.
- `npm audit --omit=dev` — passed; 0 production vulnerabilities.
- Assignment-like secret/private-key header search using `git grep -IlE` — passed; no matching tracked files.
- `ruby -e "require 'yaml'; YAML.safe_load(File.read('.github/workflows/ci.yml'), permitted_classes: [], aliases: false)"` — passed; workflow parsed successfully.
- `git diff --check` — passed; no whitespace errors.

## Tests Not Run
- Hosted GitHub Actions was not run because the changes were not pushed; all workflow commands passed locally and the YAML parsed.
- A Vercel deployment was not run because production deployment is locked until F-013.
- Full responsive, keyboard, screen-reader, and Arabic RTL product UI testing was not applicable to the neutral F-000 placeholder. Later product UI and RTL remain locked.

## Issues and Risks
- A legacy WordPress credential was disclosed in the source conversation. It must be rotated immediately and must not be used.
- `npm audit` including development dependencies reports 9 high advisories through ESLint's older `minimatch`/`brace-expansion` chain. npm proposes a breaking ESLint 10 update. A direct patched override was tested and rejected because it breaks ESLint; production dependencies report zero vulnerabilities.
- At the end of F-000 the repository contained only the neutral foundation; F-001 has now replaced that placeholder with the static localized public and administration presentation.
- CI still needs its first hosted run after push.
- Database, authentication, storage, email, hosting, region, and retention are unapproved.
- Final ticket URL, event opening hours, brand assets, exhibitors/clinics, translations, legal copy, and email recipients are missing or unvalidated.
- Current-site Fair Match text describes excluded advanced functionality and must not be migrated.
- Final commercial timeline does not override feature testing gates.

## Decisions
See `DECISIONS.md`. Key approved decisions are custom Next.js, five languages, external ticketing, static floor plan, Fair Match request forwarding only (DEC-014), deferred exhibitor portal, and static Paris 2027.

## Exact Next Human Action
1. Run the F-014 manual verification checklist above against the script-provisioned local Administrator.
2. Explicitly report F-014 as passed or provide the exact failing role, route, viewport, and expected result.
3. Keep remote Supabase email/invitation configuration pending; local Supabase remains the approved environment until access is supplied.

## Exact Next Codex Action
Stop. Do not start F-003 or any other feature until the team explicitly passes F-014 and supplies a replacement gated prompt.
