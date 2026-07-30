# Health & Beauty Expo

Next.js 16 application for the Health & Beauty Expo public website and secured
staff administration. Public business forms and administration business controls
remain presentation-only until their gated features are implemented.

## Requirements

- Node.js 22.x through 24.x
- npm 10 or newer
- Docker Desktop or another Docker-compatible runtime

## Local Supabase setup

Install locked dependencies and start the local Supabase stack:

```bash
npm ci
npm run supabase:start
npm run supabase:env
```

`supabase:start` applies the tracked migrations and seed file. `supabase:env`
writes the local API URL, publishable key, and server-only service-role key to
the ignored `.env.local` file. Never commit that file.

Recreate the local database from migrations:

```bash
npm run supabase:reset
```

Public self-signup is disabled. Provision a local staff account by supplying its
password only through the process environment:

```bash
STAFF_PROVISION_PASSWORD='YOUR_LOCAL_PASSWORD' npm run staff:provision -- \
  --email staff@example.test \
  --name 'Example Staff' \
  --role staff
```

Allowed roles are `administrator`, `staff`, and `organizer`. Do not put a real
password in documentation, shell history, source control, or shared logs. The
first Administrator is intentionally created only through this secure script.

## Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Staff sign-in is available
at [http://localhost:3000/admin/login](http://localhost:3000/admin/login), and
the health endpoint is
[http://localhost:3000/api/health](http://localhost:3000/api/health).

Representative public routes remain:

- `/`, `/en`, `/nl`, `/tr`, `/ru`, `/ar`
- `/{locale}/about`, `/exhibitors`, `/program`, `/tickets`, `/visit`,
  `/floor-plan`, `/fair-match`, `/participate`, `/participant-info`, `/media`,
  `/contact`, `/paris-2027`, and `/legal/*`

## Staff permissions

| Section | Administrator | Employee / Staff | Organizer |
|---|---:|---:|---:|
| Dashboard | Yes | Yes | Yes |
| Event | Yes | Yes | Yes |
| Exhibitors | Yes | Yes | Yes |
| Static media presentation | Yes | Yes | No |
| Form requests | Yes | Yes | No |
| Ticketing configuration presentation | Yes | No | No |
| Team access management | Yes | No | No |

Identity and route permissions are active. Event, exhibitor, media, request, and
ticketing mutations are still intentionally inactive.

## Staff-account management

After an Administrator signs in, open [http://localhost:3000/admin/team](http://localhost:3000/admin/team).
The Administrator can create `staff` and `organizer` accounts with a name,
email, and initial password; switch them between those two roles; and deactivate
or reactivate them. Never send the initial password through an insecure channel
and do not store it after sharing it with the team member.

Administrator accounts are visible as protected records but cannot be created,
promoted, edited, deactivated, or reactivated through the interface. All team
actions are server-authorized and recorded as minimal operational audit events.

The local workflow uses an Administrator-supplied initial password because it
does not depend on a real outbound email provider. When remote Supabase access
is approved, configure a verified sender, Site URL, allowed redirect URLs, and
the invitation email template before replacing this with a Supabase email-invite
flow. No production invitation email is sent by the local application today.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run staff:test:local
npx supabase db lint --local --level warning
```

The local role test uses ignored, loopback-only generated accounts. Recreate
them after `supabase:reset` with:

```bash
npm run staff:provision:test-local
```

## Remote Supabase and Vercel later

When remote access is approved, configure the Vercel project with the remote
values for:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Apply the tracked migrations to the linked remote Supabase project through the
reviewed deployment workflow. `SUPABASE_SERVICE_ROLE_KEY` is required by the
server-only provisioning script and F-014 team-management actions. It must never
be exposed to browser code. Remote project creation and Vercel deployment remain
outside F-014.
# Health & Beauty Expo

## Vercel deployment

The project is ready for a standard Next.js Vercel deployment. Configure the following values in Vercel before deploying:

- `NEXT_PUBLIC_SUPABASE_URL` — the approved remote Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — remote browser publishable key.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only remote service key; never expose it as `NEXT_PUBLIC_*`.
- `NEXT_PUBLIC_SITE_URL` — final HTTPS public domain.

Apply the tracked `supabase/migrations` files to the remote project before switching these values. The local stack remains the default development environment; `npm run supabase:env` writes ignored local values.

## Form notifications

Public requests are saved before notification is attempted and remain available in the staff inbox. Optional email delivery uses:

```text
RESEND_API_KEY=YOUR_API_KEY
FORM_NOTIFICATION_FROM=Health Expo <notifications@YOUR_VERIFIED_DOMAIN>
FORM_NOTIFICATION_TO=YOUR_APPROVED_RECIPIENT
```

If these values are absent, the request is still accepted and its outbox item remains pending. Configure all three values in staging or production before testing real delivery.

## Clean local bootstrap

```bash
npm ci
npm run supabase:start
npm run supabase:env
npm run supabase:reset
STAFF_PROVISION_PASSWORD='REPLACE_WITH_A_LOCAL_PASSWORD' npm run staff:provision -- --email admin@example.test --name 'Local Admin' --role administrator
npm run requests:test:local
npm run dev
```

Use local-only credentials for provisioning. Never reuse credentials from source material.
