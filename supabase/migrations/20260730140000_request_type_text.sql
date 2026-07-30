-- `alter type ... add value` is not reliably visible to the rest of a migration
-- run, so the 'fair_match' value added by 20260730121039 never reached the
-- database and every Fair Match submission failed with 22P02. A text column
-- with a check constraint accepts new request types in a single statement.

alter table public.public_requests
  alter column request_type type text using request_type::text;

alter table public.public_requests
  add constraint public_requests_request_type_check
  check (request_type in ('contact', 'participation', 'media', 'fair_match'));

drop type if exists public.public_request_type;

-- Same treatment for the status enum so future states stay cheap to add.
alter table public.public_requests
  alter column status drop default;

alter table public.public_requests
  alter column status type text using status::text;

alter table public.public_requests
  alter column status set default 'new';

alter table public.public_requests
  add constraint public_requests_status_check
  check (status in ('new', 'reviewed'));

drop type if exists public.public_request_status;

-- PRIV-002: authorized staff must be able to purge personal data on request.
grant delete on public.public_requests to service_role;
grant delete on public.request_notification_outbox to service_role;

create index if not exists public_requests_created_at_idx
  on public.public_requests (created_at desc);

create index if not exists public_requests_status_idx
  on public.public_requests (status);

-- B-8: the outbox needs delivery bookkeeping so failed sends can be retried.
alter table public.request_notification_outbox
  add column if not exists attempts integer not null default 0,
  add column if not exists last_error text,
  add column if not exists sent_at timestamptz;
