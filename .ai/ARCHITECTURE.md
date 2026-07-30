# Architecture

## Confirmed Decisions
- CONFIRMED: The product is a custom Next.js/supabase website and is not implemented as a new WordPress installation or CRM.
- CONFIRMED: It includes a public multilingual site and a private staff administration area.
- CONFIRMED: Five locales are NL, TR, EN, RU, and AR; Arabic requires RTL.
- CONFIRMED: Ticketing is an external-link integration.
- CONFIRMED: Fair Match is a manual request-and-resolution workflow.
- CONFIRMED: The floor plan is static and replaceable, not interactive.
- CONFIRMED: Internal roles are Administrator, Employee/Staff, and Organizer.
- CONFIRMED: Rijswijk 2026 is the managed edition; Paris 2027 is static coming soon.
- CONFIRMED: New supplied media is integrated; old photos are not automatically imported.
- CONFIRMED: Production includes domain/SSL/deployment support, while paid third-party costs are client-owned.

## Proposed Architecture
Items explicitly approved by a recorded decision are marked accordingly; remaining provider and later-feature details stay proposed or unknown.

### Application Boundary
- One Next.js TypeScript full-stack application.
- Supabase backend (APPROVED for local development and future remote replacement)
- Resend for emails
- App Router with server-rendered public pages and server-side mutations/actions or route handlers.
- Shared domain/service modules for event, exhibitors, requests, and permissions.
- Reason: The scope and delivery window favor one deployable unit while retaining clear internal boundaries.

### Frontend
- Locale-prefixed public routes such as `/{locale}/...`.
- Separate `/admin` route group protected by server-side authorization.
- Server components by default; client components only where interaction requires them.
- Accessible component primitives and design tokens derived from approved brand assets.
- No general-purpose page builder.

### Backend
- Next.js server features for application APIs and mutations.
- Explicit validation schemas at every external boundary.
- Service layer for business rules; persistence adapters isolated from UI.
- Idempotent form submission handling where practical.

### Data
- PostgreSQL relational database.
- Candidate entities:
  - `User`, `Role`, `Session` or provider mappings.
  - `EventEdition`.
  - `LocalizedEventContent`.
  - `Speaker`.
  - `Exhibitor`, `ExhibitorCategory`, localized exhibitor content.
  - `FloorPlan`.
  - `ClinicEligibility` or exhibitor clinic flag.
  - `Request`, specialized request detail, status history.
  - `SiteSetting`.
- Use migrations, constraints, timestamps, stable identifiers, and soft delete only where justified.
- Exact ORM/query layer remains UNKNOWN until repository convention is known.

### Authentication and Authorization
- APPROVED: Supabase Auth email/password sessions through `@supabase/ssr`; no custom password storage.
- APPROVED: A protected `staff_profiles` table stores the active application role and is readable only by its owning authenticated user through RLS.
- Server-enforced policy checks map Administrator, Employee, and Organizer to explicit administration routes.
- Initial staff accounts are provisioned through a server-only administrative process; public self-registration is excluded.
- APPROVED for F-014: the bootstrap Administrator can use a server-authorized `/admin/team` interface to create and manage only `staff` and `organizer` accounts. Service-role Auth administration stays in server-only code; minimal account lifecycle events are recorded for operations review.
- Password recovery, MFA, production email invitations, and final session policy remain deferred beyond F-014.

### Floor-Plan File Storage
- Only the active static floor-plan file requires a privileged replacement boundary.
- The file uses strict type/size validation, safe generated naming, and database metadata where applicable.
- General image/video upload, media-library management, and direct video storage are excluded.
- Exact floor-plan storage provider, retention, and replacement behavior remain UNKNOWN.

### Forms and Email
- Persist a request before sending notification so an email outage does not lose the submission.
- Transactional email adapter with verified sender domain and configurable recipients.
- Public request throttling uses atomic Supabase sliding-window events keyed by server-side HMAC digests. A 5-request identity/network limit is paired with a broader 30-request network ceiling to reduce shared-NAT false positives while preserving abuse protection.
- Rate limiting, anti-automation control, server validation, and safe logging.
- Exact provider and retry/alert behavior remain UNKNOWN.

### Localization
- Translation keys for shared UI.
- Database/content records for managed localized content.
- Explicit locale fallbacks; missing critical translations should be visible to staff and blocked from publication where appropriate.
- `dir="rtl"` for Arabic with component-level exceptions only where semantically necessary.
- Client review is required for legal, medical, commercial, names, dates, and official text.

### Deployment
- PROPOSED: Vercel-compatible deployment for the Next.js application, with managed PostgreSQL and narrowly scoped floor-plan file storage if repository-managed static delivery is insufficient.
- Local, preview/staging, and production environments.
- Locked dependencies, repeatable build, reviewed migrations, health endpoint, structured error monitoring, and rollback notes.
- Hosting, region, database, storage, email, DNS ownership, and monitoring provider remain UNKNOWN.

## Security Boundaries
- Public pages may read only published/active content.
- Admin routes require authentication and server authorization.
- Public forms accept untrusted input and must validate/rate-limit before persistence.
- Upload endpoints are privileged and restrict type/size/path/name.
- External ticket links are configured by authorized staff and validated.
- Logs exclude secrets and unnecessary personal payloads.
- Legacy WordPress access may use only a newly rotated credential or safe export. The disclosed credential must never enter repository/configuration/history.

## Data Classification
- Public: Published event/exhibitor/page content and approved media.
- Internal operational: Draft content, role assignments, request status/history.
- Personal: Names, email, phone, organization, social/media profile data, appointment preferences.
- Sensitive operational: Credentials, tokens, provider keys, admin session data.
- Potentially sensitive claims: Medical/treatment content requiring client/exhibitor validation.

## Unknown Decisions Blocking Later Features
1. Existing repository state and package manager.
2. Query/ORM strategy for later business tables beyond the approved Supabase client.
3. Production account provisioning, recovery, MFA, and final session policy.
4. Role capability matrix, especially Organizer limits.
5. Floor-plan file storage and replacement policy.
6. Email provider, sender, recipients, retries, and alerts.
7. Hosting platform, region, environment ownership, and backups.
8. Request retention/deletion/export policy.
9. Rich-text editing/sanitization approach.
10. Analytics/cookies.
11. Browser/device support and performance budgets.
12. Event time zone and exact opening hours.

## F-000 Constraint
F-000 must not decide or implement database, authentication, storage, email, localization, or product data models. It may create extension seams and document unknowns, but only the runnable Next.js foundation is authorized.
