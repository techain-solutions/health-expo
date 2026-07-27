# Health & Beauty Expo Prototype Review

## Purpose

This package validates the visual direction, page structure, multilingual behavior, administration model, and principal visitor journeys before any Next.js, database, authentication, storage, or email implementation begins.

It must not be presented as a working production system. Forms, uploads, saves, login, notifications, permissions, and status changes are static interaction demonstrations.

## What this prototype proves

- Professional responsive public direction for Health & Beauty Expo Rijswijk 2026.
- Public journeys for visitors, exhibitors, media/influencers, Fair Match, tickets, the static floor plan, contact, and informational pages.
- Fair Match shown as the agreed manual flow: the page lists participating clinics, and the request form lets a visitor choose a clinic and propose a preferred date and time for the organizing team to confirm, reschedule or decline by hand.
- A five-language flag selector covering English, Dutch, Turkish, Russian, and Arabic.
- Arabic right-to-left layout behavior.
- Administration concepts for event details, exhibitors, client-supplied photos/videos, website-form requests, and the external ticketing link.
- Distinct navigation previews for Administrator, Employee/Staff, and Organizer.
- Static floor-plan preview, open, download, and replacement concepts.
- External ticket-link behavior without on-site payment.

## Cofounder review checklist

1. Review the public homepage at desktop and mobile widths.
2. Review every navigation destination and confirm that the information architecture feels appropriate for the client.
3. Switch through all five languages using the flag selector. Only navigation, footer labels and the homepage hero are translated — every other page shows English body copy under translated navigation. Decide whether to translate before sharing, or to tell the client explicitly that this is a navigation-level preview.
4. Review Arabic direction, especially navigation, buttons, dates, phone numbers, and mixed Latin/Arabic content. Note that untranslated English sentences render with their closing punctuation on the wrong side under right-to-left, which resolves itself once the copy is translated.
5. Open the admin preview and switch between the three roles.
6. Confirm whether the proposed Employee/Staff and Organizer navigation limits match the intended responsibilities.
7. Confirm the Fair Match flow: choose a clinic from the participating-clinic list, propose a preferred date and time, then manual confirm/reschedule/decline by the team — no booking calendar, availability, clinic dashboard, or appointment-status workflow.
8. Confirm that all temporary stock images are clearly understood as placeholders for new client-supplied photography.
9. Review participant, agreement, and price-list downloads. They must not be published without organizer and legal approval.
10. Review the unresolved items below before sharing a final direction with the client.

## Client approval questions

1. Do you approve the navy, turquoise, sky-blue, coral, and warm-neutral visual direction?
2. Can you provide the original logo as SVG, EPS, AI, or a transparent high-resolution PNG?
3. Do you approve the proposed public pages and navigation?
4. Please confirm the responsibilities of Administrator, Employee/Staff, and Organizer.
5. Please supply approved new photos and videos. No old WordPress photos are intended for automatic migration.
6. Please provide the official address, public contact details, ticket platform URL, final exhibitor records, form recipients, and legal copy.
7. Who will approve the five translated versions before launch?
8. Please send the temporary exhibitor list as a structured file, and the three-part English agreement for the `Documents` menu.
9. Please confirm the Instagram and Facebook profile URLs, and the public phone number — the current `+31 (0)570 238 100` carries the Deventer dialling code rather than a Rijswijk one.

## Content that is intentionally illustrative

- Speaker names, portraits, organisations, and biographies.
- Exhibitor names, logos, descriptions, stands, and contact details. The temporary exhibitor list supplied on 26 July is **not** yet integrated; it is still needed as a structured list.
- Dashboard counts, users, requests, status history, and activity.
- Generated editorial hero imagery and stock photography, both used as direction-only placeholders and self-hosted in `assets/`.
- Ticket state, address, contact recipients, and certain public contact values.
- Translation completion percentages.

## Confirmed exclusions

- No internal ticket checkout, payment, or e-ticket generation.
- No booth reservation or interactive floor-plan editor.
- No automated Fair Match algorithm, booking, availability, clinic dashboard, appointment-status management, chat, or calendar synchronization.
- No exhibitor self-service account or dashboard in this phase.
- No arbitrary drag-and-drop page builder.
- No real backend behavior in this prototype.
