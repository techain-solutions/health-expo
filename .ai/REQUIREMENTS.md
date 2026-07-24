# Requirements

## Classification Key
`CONFIRMED`, `INFERRED`, `PROPOSED`, `OPEN QUESTION`, `CONFLICTING`, `OUT OF SCOPE`, `DEFERRED`, `REJECTED`.

## Functional Requirements
| ID | Classification | Requirement | Source |
|---|---|---|---|
| FR-001 | CONFIRMED | Replace the current WordPress site with a custom Next.js event platform; do not implement the new product as WordPress or a CRM. | Final client conversation |
| FR-002 | CONFIRMED | Provide Home, About, Exhibitors, Tickets, Fair Match, Media/Press/Influencers, Contact, approved legal/informational pages, and a static Paris 2027 page. | Approved functional spec; proposal |
| FR-003 | CONFIRMED | Homepage presents Rijswijk 2026 positioning, dates/location, represented sectors, visitor benefits, exhibitor/partner benefits, featured exhibitors, ticket and participation CTAs, and Paris 2027 coming-soon content. | Approved functional spec |
| FR-004 | CONFIRMED | Public exhibitor entries support logo, name, category/sector, short description, key information, optional media, and relevant contact/action link. | Approved functional spec; proposal |
| FR-005 | CONFIRMED | Authorized staff can add, edit, reorder, feature, activate/deactivate, and remove exhibitors. | Approved functional spec; proposal |
| FR-006 | CONFIRMED | Tickets page explains access/practical details and redirects through a configurable external ticketing URL. The site does not process ticket payment. | Approved functional spec |
| FR-007 | CONFIRMED | Fair Match is an information page with a contact or matchmaking request form; it explains the service, its benefits, and how the organizing team follows up manually. | Proposal; latest client scope clarification |
| FR-008 | CONFIRMED | Fair Match requests are forwarded to the organizing team for manual follow-up and may appear with other website form requests. The website has no appointment, availability, clinic-dashboard, or request-status workflow. | Proposal; latest client scope clarification |
| FR-009 | CONFIRMED | Provide general contact, Fair Match, media/press, influencer, and exhibitor information/participation forms with required-field validation, confirmation, and basic anti-automation protection. | Proposal; approved functional spec |
| FR-010 | CONFIRMED | Internal users authenticate and have one of three roles: Administrator, Employee/Staff, or Organizer. | Client conversation; approved functional spec |
| FR-011 | CONFIRMED | Administrator has all agreed management access, including user, exhibitor, event, media, forms/requests, predefined site information, and ticket link. | Proposal |
| FR-012 | CONFIRMED | Employee/Staff can manage only authorized day-to-day content, exhibitors, media, requests, and event information. | Proposal |
| FR-013 | CONFIRMED | Organizer has limited event-related and associated exhibitor access only. | Proposal |
| FR-014 | CONFIRMED | Unauthenticated public visitors cannot access the admin panel. | Approved functional spec |
| FR-015 | CONFIRMED | Authorized staff can manage event name, date, times, location, address, description, photos, videos, speakers, visitor information, ticket link, and publication status for Rijswijk 2026. | Proposal; original client request |
| FR-016 | OPEN QUESTION | Define where managed speakers/artists appear on the public site and what fields they require. | Original client request lacks approved public-page detail |
| FR-017 | CONFIRMED | Authorized staff can manage predefined text, image, video, button, and section-visibility fields that are explicitly included in the dashboard. | Proposal |
| FR-018 | CONFIRMED | The admin is not a general page/layout builder and cannot create arbitrary new page structures or sections. | Proposal |
| FR-019 | CONFIRMED | Display a static floor plan on desktop/mobile, allow visitors to open/download it, and allow authorized staff to replace it. | Proposal; client confirmation |
| FR-020 | CONFIRMED | Support Dutch, Turkish, English, Russian, and Arabic; Arabic uses RTL presentation. | Final client conversation; approved proposal |
| FR-021 | CONFIRMED | Reuse and restructure useful current-site text and practical/exhibitor information; remove unnecessary repetition and outdated/inconsistent content subject to approval. | Proposal |
| FR-022 | CONFIRMED | Do not automatically migrate old photos. Integrate client-provided new photos/videos, using temporary approved placeholders when needed. | Latest proposal |
| FR-023 | CONFIRMED | Paris 2027 is a static coming-soon page/section and is not independently managed as a simultaneous edition. | Approved functional spec; proposal |
| FR-024 | CONFIRMED | Legal and informational pages use client-approved content and require client/legal validation before production publication. | Approved functional spec |
| FR-025 | INFERRED | Supplied participant manual, agreement, stand-price list, and promotional PDFs are source material for content/download decisions, not automatically executable business rules. This follows the client statement that the documents may be used, but public placement was not specified. | Client conversation; supplied resources |
| FR-026 | OPEN QUESTION | Decide whether supplied participant, agreement, and price-list PDFs are downloadable publicly, represented as structured pages, or retained only as internal content references. | Supplied resources |
| FR-027 | CONFIRMED | Production work includes domain connection, production configuration, form email configuration, SSL verification, deployment, and launch support. | Proposal |
| FR-028 | OUT OF SCOPE | Ticket-purchaser or visitor-list viewing is not included without a separately approved external ticketing integration. | Approved external ticketing scope supersedes initial request |

## Non-Functional Requirements
| ID | Classification | Requirement | Source |
|---|---|---|---|
| NFR-001 | CONFIRMED | Responsive operation on desktop, tablet, and mobile. | Approved functional spec; proposal |
| NFR-002 | CONFIRMED | Modern, lightweight experience with optimized image loading and verified links/buttons. | Proposal |
| NFR-003 | PROPOSED | Target practical WCAG 2.2 AA behavior: semantic controls, keyboard access, visible focus, labels, useful errors, sufficient contrast, alt text, and reduced-motion consideration. This is proposed by team UI standards because the client did not name a formal level. | UI/UX standards |
| NFR-004 | CONFIRMED | Verify all five language displays and Arabic RTL before launch. | Proposal |
| NFR-005 | CONFIRMED | Implement baseline technical SEO: heading hierarchy, metadata, clean URLs, appropriate event structured data, image alt text, sitemap, indexing configuration, and necessary important redirects. | Proposal |
| NFR-006 | CONFIRMED | Secure admin access and role-based permission management. | Proposal |
| NFR-007 | PROPOSED | Use automated unit/integration tests and critical end-to-end/manual flows, with lint, type, test, and build checks. This is required by team definition of done. | Testing/DoD standards |
| NFR-008 | OPEN QUESTION | Define supported browsers/devices and minimum versions. | UNKNOWN |
| NFR-009 | OPEN QUESTION | Define availability, traffic, recovery, and operational support expectations. | UNKNOWN |
| NFR-010 | CONFIRMED | No guarantee of visitor, ticket, exhibitor, or other commercial results. | Proposal |
| NFR-011 | CONFIRMED | Hosting, domain, email, and paid third-party subscription costs are client responsibilities. | Proposal |

## Security Requirements
| ID | Classification | Requirement | Source |
|---|---|---|---|
| SEC-001 | CONFIRMED | Never commit or expose secrets; use environment variables/secret management and placeholder-only `.env.example`. | Security/team standards |
| SEC-002 | CONFIRMED | Treat the legacy WordPress credential disclosed in source material as compromised; do not use or copy it. Require rotation or safe export before migration access. | Source evidence; security standards |
| SEC-003 | CONFIRMED | Enforce role authorization on the server, not only in navigation/UI. | Security standards |
| SEC-004 | PROPOSED | Use a maintained authentication/session implementation with secure cookies/tokens, expiry, revocation, logout, and enumeration-resistant errors. Required to reduce custom-auth risk. | Security standards |
| SEC-005 | CONFIRMED | Validate and sanitize all external input on the server; prevent unsafe database queries and internal error leakage. | Security standards |
| SEC-006 | CONFIRMED | Restrict uploaded file type, size, naming, and storage behavior; prevent path traversal and unsafe content handling. | Security standards |
| SEC-007 | CONFIRMED | Apply basic form abuse controls and rate limiting appropriate to contact/accreditation/Fair Match endpoints. | Proposal; security standards |
| SEC-008 | CONFIRMED | Require TLS/SSL in production and restrict cross-origin behavior to approved origins. | Proposal; security standards |
| SEC-009 | CONFIRMED | Do not log credentials, tokens, or unnecessary full personal-data payloads. | Security standards |

## Privacy and Data Requirements
| ID | Classification | Requirement | Source |
|---|---|---|---|
| PRIV-001 | PROPOSED | Collect only fields necessary for the submitted request and state their purpose. This is proposed by privacy standards; exact field lists need approval. | Security/privacy standards |
| PRIV-002 | OPEN QUESTION | Define retention, deletion, export, and access rules for contact, accreditation, exhibitor, and Fair Match requests. | UNKNOWN |
| PRIV-003 | CONFIRMED | Privacy/cookie/legal text requires client or legal-advisor validation before launch. | Approved functional spec |
| PRIV-004 | CONFIRMED | Medical claims and treatment information must be supplied or validated by exhibitors and the organization. | Proposal |
| PRIV-005 | OPEN QUESTION | Define analytics and cookie-consent tooling, or confirm no non-essential analytics at launch. | UNKNOWN |

## Accessibility Requirements
| ID | Classification | Requirement | Source |
|---|---|---|---|
| A11Y-001 | PROPOSED | Navigation, forms, dialogs, uploads, admin tables, and language controls are keyboard operable with visible focus. | UI/UX standards |
| A11Y-002 | PROPOSED | All form controls have programmatic labels; errors are specific and announced; input survives correctable errors. | UI/UX standards |
| A11Y-003 | PROPOSED | Images have meaningful alt text or are marked decorative; floor-plan download has an accessible name and text alternative/context. | UI/UX standards |
| A11Y-004 | PROPOSED | Arabic directionality applies at document/component level without reversing numbers, media, or controls incorrectly. | UI/UX standards; language requirement |
| A11Y-005 | PROPOSED | Color contrast and touch targets are checked against practical AA expectations. | UI/UX standards |

## Performance Requirements
| ID | Classification | Requirement | Source |
|---|---|---|---|
| PERF-001 | CONFIRMED | Optimize images/media and avoid unnecessary client-side code. | Proposal |
| PERF-002 | PROPOSED | Prevent major layout shifts and paginate large admin/public datasets when justified. | UI/UX standards |
| PERF-003 | OPEN QUESTION | Define measurable performance budgets and monitoring thresholds. | UNKNOWN |

## Integration and Platform Requirements
| ID | Classification | Requirement | Source |
|---|---|---|---|
| INT-001 | CONFIRMED | External ticketing integration is a configurable outbound link, not embedded payment. | Approved functional spec |
| INT-002 | OPEN QUESTION | Select ticketing platform URL and whether campaign/locale parameters are needed. | UNKNOWN |
| INT-003 | OPEN QUESTION | Select email delivery provider and verified sender/recipient configuration. | UNKNOWN |
| INT-004 | OPEN QUESTION | Select map provider/embedding approach. | UNKNOWN |
| INT-005 | OPEN QUESTION | Select relational database and ORM/query layer. | UNKNOWN |
| INT-006 | OPEN QUESTION | Select authentication provider/library and account provisioning/recovery workflow. | UNKNOWN |
| INT-007 | OPEN QUESTION | Select media storage/CDN and video upload versus external video-link policy. | UNKNOWN |
| INT-008 | OPEN QUESTION | Select hosting platform, database/storage region, preview environment, and production ownership. | UNKNOWN |
| INT-009 | CONFIRMED | Migration must use a rotated credential, safe export, or public content capture; never the disclosed credential. | Security requirement |
| INT-010 | OPEN QUESTION | Define form email/admin synchronization and retry behavior when email delivery fails. | UNKNOWN |

## Explicit Exclusions
| ID | Classification | Exclusion |
|---|---|---|
| OS-001 | OUT OF SCOPE | On-site ticket payment and e-ticket generation |
| OS-002 | OUT OF SCOPE | Booth reservation/payment system |
| OS-003 | OUT OF SCOPE | Interactive drag-and-drop floor plan |
| OS-004 | OUT OF SCOPE | Automatic matching algorithm, instant messaging, favorites, or B2B social platform |
| OS-005 | OUT OF SCOPE | Live booking calendar, automatic availability, clinic dashboards, appointment/request-status management, or calendar synchronization |
| OS-006 | DEFERRED | Exhibitor registration accounts, personal dashboard, purchased-service tracking, extra-service ordering/payment |
| OS-007 | OUT OF SCOPE | Dedicated mobile app |
| OS-008 | OUT OF SCOPE | Advanced simultaneous multi-edition administration |
| OS-009 | OUT OF SCOPE | Advertising campaigns, social media management, monthly SEO, or backlink acquisition |
| OS-010 | OUT OF SCOPE | Legal drafting/validation and certified professional translation |
| OS-011 | OUT OF SCOPE | Third-party subscription, hosting, domain, and paid-service fees |
| OS-012 | OUT OF SCOPE | General-purpose page builder or arbitrary drag-and-drop layout editor |
