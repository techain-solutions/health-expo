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
Every item below is PROPOSED because no repository/provider evidence has yet approved it.

### Application Boundary
- One Next.js TypeScript full-stack application.
- Supabase backend
- Resend for emails
- App Router with server-rendered public pages and server-side mutations/actions or route handlers.
- Shared domain/service modules for event, exhibitors, requests, media, and permissions.
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
  - `MediaAsset`.
  - `FloorPlan`.
  - `ClinicEligibility` or exhibitor clinic flag.
  - `Request`, specialized request detail, status history.
  - `ManagedPage`, localized page content, publication state.
  - `SiteSetting`.
- Use migrations, constraints, timestamps, stable identifiers, and soft delete only where justified.
- Exact ORM/query layer remains UNKNOWN until repository convention is known.

### Authentication and Authorization
- Use a maintained framework/provider rather than custom password storage.
- Server-enforced policy checks map Administrator, Employee, and Organizer to explicit capabilities.
- Initial staff accounts are provisioned by an administrator or deployment process; public self-registration is excluded.
- Exact provider, password recovery, MFA, session duration, and user invitation flow remain UNKNOWN.

### Media Storage
- Managed object storage/CDN with database metadata.
- Images are uploaded with file/size limits and optimized derivatives where supported.
- Video policy should prefer approved external-hosted links unless direct upload/storage cost and limits are confirmed.
- Exact provider, retention, and deletion behavior remain UNKNOWN.

### Forms and Email
- Persist a request before sending notification so an email outage does not lose the submission.
- Transactional email adapter with verified sender domain and configurable recipients.
- Rate limiting, anti-automation control, server validation, and safe logging.
- Exact provider and retry/alert behavior remain UNKNOWN.

### Localization
- Translation keys for shared UI.
- Database/content records for managed localized content.
- Explicit locale fallbacks; missing critical translations should be visible to staff and blocked from publication where appropriate.
- `dir="rtl"` for Arabic with component-level exceptions only where semantically necessary.
- Client review is required for legal, medical, commercial, names, dates, and official text.

### Deployment
- PROPOSED: Vercel-compatible deployment for the Next.js application, with managed PostgreSQL and object storage.
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
2. Database and ORM.
3. Authentication provider, account provisioning, recovery, MFA, and session policy.
4. Role capability matrix, especially Organizer limits.
5. Object storage/CDN and direct-video policy.
6. Email provider, sender, recipients, retries, and alerts.
7. Hosting platform, region, environment ownership, and backups.
8. Request retention/deletion/export policy.
9. Rich-text editing/sanitization approach.
10. Analytics/cookies.
11. Browser/device support and performance budgets.
12. Event time zone and exact opening hours.

## F-000 Constraint
F-000 must not decide or implement database, authentication, storage, email, localization, or product data models. It may create extension seams and document unknowns, but only the runnable Next.js foundation is authorized.
