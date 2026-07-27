# Client Context

## Project
- Name: Health & Beauty Expo - Rijswijk 2026
- Mode: `NEW_PROJECT`
- Current planning date: 2026-07-24
- Primary audiences: visitors; exhibitors, clinics, hospital groups, brands, partners; media and influencers; internal staff.
- Main event evidence: 24-25 October 2026 at De Broodfabriek, Rijswijk.
- Final commercial evidence: custom offer accepted for USD 1,500 with an 18-day delivery statement.
- Implementation direction: custom Next.js application; no new WordPress installation and no CRM.

## Normalized Conversation

### Initial request
- CONFIRMED: Replace the existing event website and provide an internal administration area.
- CONFIRMED: Internal roles are Administrator, Employee/Staff, and Organizer.
- CONFIRMED: Manage event name, dates, times, location, address, description, media, speakers, visitor information, ticket link, and publication status.
- CONFIRMED: Manage exhibitors and show a floor plan.
- CONFIRMED: Use an external ticket link instead of taking ticket payments on the site.
- CONFIRMED: Apply a new visual identity based on logo colors.
- CONFIRMED: Reuse useful existing website content while restructuring it.
- CONFIRMED: New photos and videos will be supplied; placeholder media may be used temporarily.

### Scope evolution
- Earlier language scope was Dutch and Turkish.
- Latest approved language scope is Dutch, Turkish, English, Russian, and Arabic, including Arabic RTL.
- Earlier discussion mentioned migrating 200+ photos/videos.
- Latest proposal says old photos will not be carried over automatically; new client-provided photos/videos are integrated. This latest statement controls.
- The client requested a personal exhibitor portal after the proposal.
- The supplier clarified that exhibitor accounts, purchased-service tracking, ordering extra services, and online payment were not in the initial scope.
- CONFIRMED: The client accepted starting with the initial project and deferring the advanced exhibitor platform.
- CONFIRMED: Fair Match in this phase is a manual appointment-request workflow, not automated booking.
- CONFIRMED: The approved English/Dutch functional specification is the operational scope baseline.
- CONFIRMED: The final conversation confirms custom Next.js implementation, not WordPress or a CRM.

## Requirement Conflicts and Resolutions
| Topic | Earlier evidence | Later evidence | Classification | Resolution |
|---|---|---|---|---|
| Languages | Dutch and Turkish | Five languages: NL, TR, EN, RU, AR | CONFIRMED | Five-language scope supersedes the earlier two-language scope. |
| Media migration | Approximately 200+ legacy photos/videos | Old photos not automatically migrated; new media supplied | CONFIRMED | Reuse useful text and structured content; integrate new media and placeholders. Legacy media import requires explicit later approval. |
| Timeline/budget | USD 1,400 and 26 days in proposal | USD 1,500 and 18 days in final accepted offer | CONFIRMED | Final offer supersedes proposal figures. |
| Fair Match | Existing site describes algorithm, chat, favorites, and accounts | Approved manual request-and-confirm workflow | CONFIRMED | Existing advanced claims must not be carried into the new site. |
| Ticket/visitor viewing | Initial request mentioned viewing tickets or visitors | External ticketing with no on-site payment; approved spec omits ticket-buyer integration | OUT OF SCOPE | No ticket-buyer data is available unless a separate external platform integration is approved. |
| Exhibitor portal | Client asked for exhibitor login/dashboard | Client accepted initial scope without portal | DEFERRED | Keep for a separately scoped future phase. |
| WordPress access | Plaintext access data was supplied in chat | Security standards prohibit use of exposed secrets | CONFLICTING | Do not use it. Require credential rotation or a safe export before migration work. |

## Source Register
| Resource | Authority | Use |
|---|---|---|
| Client conversation transcript | Authoritative for explicit client approvals and chronology | Scope, changes, final stack/timeline/budget, deferred portal |
| Functional Specification EN/NL | Authoritative and client-approved | Primary functional baseline and exclusions |
| Commercial Proposal EN/NL | Authoritative for detailed included scope, subject to later conversation | Roles, event/exhibitor management, media, SEO, deployment, exclusions |
| Current public Health & Beauty Expo site | Migration reference, not automatically authoritative | Existing page inventory and text to review/rewrite |
| Healthcare Week Luxembourg 2026 site | Illustrative only | Inspiration for event navigation, exhibitor/partner presentation, press and practical information; no parity requirement |
| Official Deelnemershandleiding 2026 | Authoritative content resource | Exhibitor information and rules; not automatically software business logic |
| HB Overeenkomst NL | Authoritative client legal/commercial resource | Potential download/content source; legal publication requires client/legal approval |
| Standprijzen | Authoritative commercial content resource | Stand and sponsor information; no online purchase workflow is implied |
| Plattegrond Expo | Authoritative static media resource | Static floor-plan display/download asset |
| English and Turkish promotional PDFs | Illustrative brand/content resources | Event messaging and visual direction; not exact UI specifications |
| Team engineering/security/testing/UI/deployment standards | Project standards unless overridden | Engineering guardrails and definition of done |

## Visual and Content Observations
- The supplied floor-plan page shows a stage at the top, a central entrance at the bottom, rows of booth blocks, and catering areas on both lower sides.
- The stand-price document presents four stand packages, furniture examples, and Bronze/Silver/Gold sponsor tiers.
- The English poster presents the event as an international medical tourism exhibition at De Broodfabriek, Rijswijk, on 24-25 October 2026.
- The Turkish poster uses the same date and event positioning and emphasizes health, beauty, and wellness.
- These assets are content inputs. They do not authorize copying layouts verbatim into the website.

## Known Content Inputs
- Event date: 24-25 October 2026.
- Venue: De Broodfabriek, Rijswijk.
- Public contact information exists on the current site but must be revalidated before production.
- Static floor plan supplied.
- Participant manual, exhibitor agreement, stand-price list, and language-specific promotional artwork supplied.

## Missing or Unvalidated Information
- OPEN QUESTION: Exact event opening hours for visitors.
- OPEN QUESTION: Final external ticketing URL.
- OPEN QUESTION: Final approved logo files, color tokens, typefaces, and design sign-off process.
- OPEN QUESTION: Final exhibitor dataset and clinic list.
- OPEN QUESTION: Final speaker/artist data and where speakers appear publicly.
- OPEN QUESTION: Final copy in all five languages and named reviewer for each language.
- OPEN QUESTION: Final legal texts and legal approver.
- OPEN QUESTION: Form recipient email addresses and sender domain.
- OPEN QUESTION: Data retention/deletion rules for contact, accreditation, and Fair Match requests.
- OPEN QUESTION: Database, authentication provider, media storage, email provider, hosting, and region.
- OPEN QUESTION: Analytics/cookie tooling.
- OPEN QUESTION: Browser support matrix.
- RESOLVED 2026-07-26: The participant/exhibitor manual is a public download. The client supplied an English exhibitor manual and asked for it in a documents menu at the bottom of the website, alongside the future general terms.
- OPEN QUESTION: Whether the agreement and stand-price PDFs are public downloads or internal content references only.
- AWAITED INPUT: English agreement supplied as three separate files in the 2026-07-26 conversation and to be published as one agreement; `Flyer 1.pdf`; `Engels information stand.pdf`. None of these files have been supplied to the repository yet.
- OPEN QUESTION: Safe migration method after credential rotation.
