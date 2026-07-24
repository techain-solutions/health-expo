# Project Brief

## Problem
The current WordPress website does not provide the professional multilingual event experience or controlled internal management workflow required for Health & Beauty Expo Rijswijk 2026. Existing content is repetitive and some existing Fair Match claims describe functionality that is not part of the approved build.

## Objective
Build a custom Next.js event platform that:
- Positions Health & Beauty Expo as a credible international health, beauty, wellness, and medical-tourism event.
- Serves visitors, exhibitors/clinics/partners, media/influencers, and internal staff.
- Gives authorized staff controlled management of predefined site content without source-code changes.
- Supports five languages, including complete Arabic RTL presentation.
- Replaces the current WordPress site and supports production launch on the existing domain.

## Users
- Visitors seeking event, exhibitor, ticket, venue, and practical information.
- Exhibitors, clinics, brands, hospital groups, and partners considering participation.
- Media professionals and influencers requesting accreditation.
- Administrator with full management access.
- Employee/Staff with day-to-day content and exhibitor access.
- Organizer with limited event-related access.

## Core Journeys
1. Visitor opens the homepage, explores content/exhibitors, and follows the external ticket link.
2. Prospective exhibitor reviews event information and submits a participation/information request.
3. Exhibitor reviews participating clinics in Fair Match and submits a preferred date/time request.
4. Staff reviews Fair Match or other form requests and manually confirms, proposes another time, declines, or follows up.
5. Media professional or influencer reviews criteria and submits an accreditation request.
6. Authorized staff signs in and manages only the sections permitted by their role.

## Product Boundaries
### Included
- Public pages: Home, About, Exhibitors, Tickets, Fair Match, Media/Press/Influencers, Contact, approved legal/informational pages, and static Paris 2027.
- Internal admin with three roles.
- Event, exhibitor, media, static floor plan, ticket-link, form, and predefined content management.
- Five languages: Dutch, Turkish, English, Russian, Arabic.
- Arabic RTL.
- External ticketing.
- Manual Fair Match requests.
- Responsive UI, baseline technical SEO, testing, deployment, SSL/domain connection.

### Excluded
- On-site ticket payment and e-ticket generation.
- Interactive booth allocation or drag-and-drop floor plan.
- Automated matchmaking, instant messaging, live availability, clinic dashboards, or calendar synchronization.
- Exhibitor accounts, personal dashboards, purchased-service tracking, extra-service ordering, and related payments.
- Dedicated mobile app or advanced simultaneous multi-edition administration.
- Advertising campaigns, social media management, monthly SEO, certified translations, or legal drafting/validation.
- A general-purpose drag-and-drop website builder.

## Success Criteria
- Public visitors can use all supported languages and Arabic pages render in RTL without broken layouts.
- Staff can manage approved content according to server-enforced roles.
- Event and exhibitor information can be published and updated without code changes.
- Ticket actions reliably redirect to the configured external platform.
- Forms validate input, resist basic automated abuse, store or route submissions safely, and show clear confirmation/error states.
- Fair Match requests can be reviewed and manually resolved by staff.
- Static floor plan is readable on common screen sizes and downloadable/openable.
- Site passes project lint, type, test, build, accessibility, responsive, security, and production verification checks.
- No deferred portal or automated booking functionality is introduced.

## Constraints
- CONFIRMED: Next.js custom code; no WordPress or CRM implementation.
- CONFIRMED: Final commercial offer states USD 1,500 and 18-day delivery.
- CONFIRMED: Delivery depends on timely provision/validation of content, domain access, ticket link, email configuration, and media.
- CONFIRMED: Third-party service, hosting, domain, and subscription costs are client responsibilities.
- CONFIRMED: Client validates translations, legal copy, medical claims, names, dates, and official communications.
- INFERRED: A focused full-stack application is preferable to multiple services because the scope and delivery window favor a small operational footprint. This remains subject to repository and hosting evidence.

## Assumptions
- PROPOSED: Use locale-prefixed routes and server-rendered public content for discoverability and reliable localization.
- PROPOSED: Use a relational database for roles, event content, exhibitors, clinics, form requests, and statuses.
- PROPOSED: Use managed object storage for logos, images, videos or video references, and floor-plan assets.
- PROPOSED: Use a maintained authentication solution instead of custom password cryptography.
- PROPOSED: Use a transactional email provider or verified SMTP service for form notifications.
- Each proposal is made to reduce custom infrastructure risk; none is approved until repository/hosting constraints are reviewed.

## Open Questions
See `CLIENT_CONTEXT.md` and `ARCHITECTURE.md`. Product development beyond F-000 must not silently decide unresolved hosting, auth, data retention, or content-approval questions.
