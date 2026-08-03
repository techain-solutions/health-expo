# Decisions

This log is append-only. Do not rewrite earlier records; add a superseding decision.

## DEC-001 - Custom Next.js rebuild
- Status: APPROVED
- Context: The client wanted the current event site rebuilt and later explicitly confirmed the implementation technology.
- Decision: Build with custom Next.js code; do not implement the product as WordPress or a CRM.
- Source: Final client conversation, 23 July 2026.
- Consequences: Repository foundation and hosting must support Next.js. WordPress is only a migration source.
- Supersedes: Earlier unspecified "modern technology" proposal.
- Superseded by:

## DEC-002 - Five supported languages
- Status: APPROVED
- Context: Initial discussion named Dutch and Turkish; later client instruction expanded the scope.
- Decision: Support Dutch, Turkish, English, Russian, and Arabic. Arabic receives RTL adaptation.
- Source: Client conversation and final accepted offer.
- Consequences: Route/content design, testing, SEO, and visual QA must cover all five locales.
- Supersedes: Dutch-and-Turkish-only statement.
- Superseded by:

## DEC-003 - External ticketing only
- Status: APPROVED
- Context: The client chose a ticket link for this phase.
- Decision: Redirect to an externally supplied ticketing platform. Do not process payment or generate e-tickets.
- Source: Client conversation; approved functional spec.
- Consequences: No payment data, checkout, or ticket-order model is required. Ticket-buyer lists require a future integration.
- Supersedes:
- Superseded by:

## DEC-004 - Static floor plan
- Status: APPROVED
- Context: Interactive placement can wait.
- Decision: Display a static responsive floor plan with open/download and staff replacement.
- Source: Client conversation; proposal.
- Consequences: No booth coordinate editor, click map, availability, reservation, or payment workflow.
- Supersedes:
- Superseded by:

## DEC-005 - Manual Fair Match
- Status: APPROVED
- Context: The client asked whether appointment planning could be handled manually.
- Decision: Requester selects a displayed clinic and proposes date/time/contact details; staff manually confirms, proposes another time, or declines.
- Source: Client confirmation and approved functional spec.
- Consequences: Existing current-site claims about algorithms, chat, favorites, and persistent accounts must not be migrated.
- Supersedes: Existing-site advanced Fair Match description.
- Superseded by:

## DEC-006 - Exhibitor portal deferred
- Status: APPROVED
- Context: The client requested an exhibitor login/dashboard after the initial proposal, then accepted starting with the original scope.
- Decision: Exclude personal exhibitor accounts, purchased-service tracking, extra-service ordering/payment, and dashboards from this phase.
- Source: Client conversation, 22 July 2026.
- Consequences: Public exhibitor participation uses a request form; internal staff manage exhibitor data.
- Supersedes:
- Superseded by:

## DEC-007 - Rijswijk managed; Paris static
- Status: APPROVED
- Context: The client asked about Paris 2027 and multiple editions.
- Decision: Manage Rijswijk 2026 only. Paris 2027 is static coming soon.
- Source: Approved functional spec and proposal.
- Consequences: Data model may be extensible, but no simultaneous multi-edition admin UX is implemented.
- Supersedes:
- Superseded by:

## DEC-008 - Latest media migration strategy
- Status: APPROVED
- Context: Earlier discussion estimated 200+ existing photos/videos; later scope clarified that old photos would not be automatically carried over.
- Decision: Reuse/restructure useful text and structured information; integrate new client-provided photos/videos and temporary approved placeholders. Legacy photo bulk migration is not included.
- Source: Latest proposal approved by the client.
- Consequences: Migration scripts must not scrape/import the old media library by default.
- Supersedes: Broad earlier statement to transfer existing photos/videos.
- Superseded by:

## DEC-009 - Final commercial baseline
- Status: APPROVED
- Context: Proposal stated USD 1,400/26 days; later negotiation and final offer changed both.
- Decision: Record final accepted commercial offer as USD 1,500 and 18 days.
- Source: Final accepted offer and client confirmation.
- Consequences: Earlier figures are historical only. Engineering gates still require explicit testing approval.
- Supersedes: USD 1,400/26-day proposal figures.
- Superseded by:

## DEC-010 - Disclosed legacy credential is unusable
- Status: APPROVED
- Context: The source conversation contains plaintext WordPress access information.
- Decision: Treat it as compromised. Do not copy, use, store, log, or commit it. Require rotation or a safe content export.
- Source: Security standards applied to source evidence.
- Consequences: Migration cannot use that credential; the client/site owner must rotate it immediately.
- Supersedes:
- Superseded by:

## DEC-011 - Full-stack single application
- Status: PROPOSED
- Context: Next.js is confirmed, but backend/deployment topology is not.
- Decision: Use one Next.js TypeScript full-stack application with clear internal domain/service/persistence boundaries.
- Source: Team architecture proposal.
- Consequences: Lower operational overhead; later separation remains possible if evidence requires it.
- Supersedes:
- Superseded by:

## DEC-012 - Relational persistence
- Status: PROPOSED
- Context: Roles, content, exhibitors, requests, ordering, and status history are relational.
- Decision: Use PostgreSQL; choose ORM/query layer after repository inspection.
- Source: Team default stack and domain fit.
- Consequences: Requires migration and backup strategy.
- Supersedes:
- Superseded by:

## DEC-013 - Managed authentication and object storage
- Status: PROPOSED
- Context: Secure staff access and media handling are required; providers are unknown.
- Decision: Prefer a maintained auth solution and managed object storage/CDN rather than custom password cryptography or repository-local uploads.
- Source: Security and deployment standards.
- Consequences: Provider, region, cost, and ownership require approval before F-002/F-006.
- Supersedes:
- Superseded by:

## DEC-014 - Fair Match request forwarding only
- Status: APPROVED
- Context: The original proposal and later client clarification define Fair Match as an information page and contact/matchmaking request forwarded to the organizing team.
- Decision: Fair Match has no clinic appointment selection, availability, confirmation, rescheduling, decline, clinic dashboard, or request-status workflow. It is handled as a website form request for manual offline follow-up.
- Source: Proposal Health Beauty Expo - EN, pages 3 and 13; latest client scope clarification.
- Consequences: Remove the dedicated Fair Match admin queue and appointment controls. Show Fair Match submissions only in the general form-request area.
- Supersedes: DEC-005 - Manual Fair Match.
- Superseded by:

## DEC-015 - F-000 foundation toolchain
- Status: APPROVED
- Context: No application, root package manager, lockfile, tests, or CI configuration existed when F-000 began.
- Decision: Use npm with a committed lockfile, Next.js 16 App Router and TypeScript, Node.js 22 for local/CI execution, ESLint for linting, and Vitest for lightweight smoke tests. Keep standard Next.js build output compatible with Vercel without adding provider configuration during F-000.
- Source: F-000 acceptance criteria and repository inspection on 29 July 2026.
- Consequences: Later features inherit repeatable `dev`, `lint`, `typecheck`, `test`, and `build` commands. Supabase and provider deployment configuration remain deferred to their approved features.
- Supersedes:
- Superseded by:

## DEC-016 - Locale routes and static administration preview
- Status: APPROVED
- Context: The approved prototype dispatched views and language changes in one standalone document, while F-001 requires refresh-safe Next.js routes and equivalent-page language switching without adding backend behavior.
- Decision: Use one locale-prefixed App Router catch-all for public presentation pages and one administration-preview catch-all under `/admin`. Keep shared shells and typed page data in React components; keep all forms and business-effect controls inert.
- Source: F-001 acceptance criteria and implementation inspection on 29 July 2026.
- Consequences: `/en`, `/nl`, `/tr`, `/ru`, and `/ar` preserve equivalent page paths; Arabic applies RTL at the localized application wrapper. Administration roles demonstrate navigation visibility only and provide no authentication or authorization.
- Supersedes:
- Superseded by:

## DEC-017 - Remove managed media and managed informational-content features
- Status: APPROVED
- Context: The client explicitly decided not to implement the planned general media-management feature or the managed Media/Press and legal/informational-content feature.
- Decision: Remove F-006 and F-010 from the implementation plan without renumbering the remaining feature IDs.
- Source: Client direction, 30 July 2026.
- Consequences: No general media upload/library workflow and no managed Media/Press or legal-content editor/publication workflow will be implemented. Existing static F-001 presentation pages remain unchanged. F-007 owns only the narrowly scoped floor-plan replacement behavior, and F-011 depends explicitly on F-005, F-007, F-008, and F-009.
- Supersedes: The general media/object-storage portion of DEC-013; maintained authentication remains proposed.
- Superseded by:

## DEC-018 - Supabase authentication and relational staff roles
- Status: APPROVED
- Context: F-002 requires maintained authentication, server-enforced roles, local development now, and environment-based replacement with remote Supabase later.
- Decision: Use Supabase Auth email/password sessions through `@supabase/ssr`, a protected `staff_profiles` table keyed to `auth.users`, tracked SQL migrations, RLS self-read, and server-side route authorization. Disable public signup and provision staff through a server-only administrative workflow.
- Source: Client direction and F-002 implementation, 30 July 2026.
- Consequences: Local development uses the Supabase CLI stack and ignored `.env.local` values. Vercel later receives only approved remote environment values. Missing, inactive, malformed, or unauthorized staff profiles fail closed. Recovery, MFA, production invitation UX, and user-management UI remain outside F-002.
- Supersedes: The authentication-provider uncertainty in DEC-013 and the F-002 portion of DEC-011/DEC-012.
- Superseded by:

## DEC-019 - Initial administrator bootstrap and later delegated staff management
- Status: APPROVED
- Context: The client needs a non-technical way to create operational staff accounts, but initial privileged access must not be self-created through the product interface.
- Decision: Keep the first Administrator bootstrap in the existing server-only provisioning script. Plan F-014 for an Administrator-only interface that can create/invite and manage `staff` and `organizer` accounts, but cannot create or promote another Administrator.
- Source: Client direction, 30 July 2026.
- Consequences: The client can delegate ordinary staff access after an initial Administrator exists. The future feature requires server-side service-role operations, enforced authorization, invitation/email configuration, safe deactivation, and privilege-escalation tests. It is not part of F-002 and remains locked pending explicit team approval.
- Supersedes:
- Superseded by:

## DEC-020 - Local initial-password workflow for delegated staff accounts
- Status: APPROVED
- Context: F-014 must be functionally testable with local Supabase before remote email and sender configuration are available.
- Decision: The bootstrap Administrator remains script-provisioned. The F-014 Administrator-only interface creates only `staff` and `organizer` accounts with a validated, administrator-supplied initial password, then permits only those two roles to be changed and accounts to be deactivated/reactivated. A service-role server boundary records minimal account lifecycle audit events. It does not create or promote Administrators.
- Source: Client direction to proceed with F-014, 30 July 2026.
- Consequences: Local account delivery requires sharing the initial password through a secure out-of-band channel. A production invitation workflow requires later remote Supabase email sender, template, Site URL, and redirect configuration; it is not silently simulated. The service-role key is now required by the secure server runtime for this approved F-014 feature and must never reach browser code.
- Supersedes: The server-key runtime limitation stated for F-002 in DEC-018.
- Superseded by:

## DEC-021 - Standing sequential feature authorization
- Status: APPROVED
- Context: The client requested that implementation continue feature by feature without waiting for individual approval, with final client testing after all planned work.
- Decision: Treat internal verification as sufficient to move each remaining planned feature from implementation to passed under the client's standing authorization, then begin the next eligible planned feature. Continue to preserve scope gates, safety requirements, and removed/deferred exclusions.
- Source: Client direction, 30 July 2026.
- Consequences: Codex documents internal evidence per feature and progresses automatically. F-006 and F-010 remain removed; any new material scope, credential, provider, legal, or production decision still requires client direction.
- Supersedes: Per-feature manual acceptance requirement for remaining planned features.
- Superseded by:

## DEC-022 - Locale dictionaries own public presentation copy
- Status: APPROVED
- Context: F-011 requires five public languages, correct Arabic RTL behavior, and removal of prototype or fabricated presentation content while preserving managed business data.
- Decision: Source public presentation copy from typed per-locale dictionaries. Keep exhibitors and event values database-backed. Represent missing client-controlled programme, ticketing, legal, social, or download content truthfully as unavailable or pending rather than fabricating it.
- Source: F-011 acceptance audit, 30 July 2026.
- Consequences: Locale coverage is consistent and testable. Final translations, legal copy, external URLs, and client assets still require client acceptance.
- Supersedes:
- Superseded by:

## DEC-023 - Database-first request notification delivery
- Status: APPROVED
- Context: Public requests must not be lost when an external email provider is unavailable or unconfigured.
- Decision: Commit public requests before notification. Store notification work in the outbox and optionally deliver it through Resend only when an approved API key, verified sender, and recipient are configured. Missing provider configuration leaves the notification pending and the request available in the staff inbox. Store request types and workflow statuses as constrained text to avoid stale application-enum failures.
- Source: F-011 acceptance audit, 30 July 2026.
- Consequences: Form acceptance is independent of third-party email availability. Production operators must configure and verify delivery. Retries are bounded and opportunistic; a scheduled worker may be approved later if stricter latency is required.
- Supersedes:
- Superseded by:

## DEC-024 - Shared privacy-preserving request throttling
- Status: APPROVED
- Context: A process-local counter does not enforce consistent limits across serverless instances and a strict low per-IP limit can unfairly block visitors behind shared networks.
- Decision: Enforce public-request limits through an atomic Supabase sliding-window function. Store only HMAC-SHA256 key digests and timestamps. Apply five requests per normalized e-mail/network identity plus a broader thirty-request network ceiling over ten minutes.
- Source: F-011 counter-audit, 30 July 2026.
- Consequences: Limits survive application restarts and concurrent instances; shared networks receive more headroom; raw IP/e-mail identifiers are not stored in the throttle table. The service-role secret remains server-only and doubles as the HMAC key.
- Supersedes: The process-local request limiter introduced during the first F-011 audit repair.
- Superseded by:

## DEC-025 - Dedicated public exhibitor-image storage
- Status: APPROVED
- Context: Acceptance testing requires every newly managed exhibitor to receive an image uploaded by non-technical staff and displayed on public cards and detail pages.
- Decision: Use a dedicated public Supabase Storage bucket limited to JPG, PNG, and WebP files up to 5 MB. Store only the controlled object path and content type on the exhibitor row; perform upload, replacement, and deletion through the server-only service-role boundary.
- Source: Client acceptance-repair request, 31 July 2026.
- Consequences: New exhibitors require an image, existing legacy rows can be repaired through edit, public rendering uses the environment-specific Storage origin, and CSP explicitly permits that configured origin.
- Supersedes:
- Superseded by:
