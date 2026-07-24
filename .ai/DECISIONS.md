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
