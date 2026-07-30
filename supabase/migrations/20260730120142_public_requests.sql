create type public.public_request_type as enum ('contact', 'participation', 'media');
create type public.public_request_status as enum ('new', 'reviewed');

create table public.public_requests (
  id uuid primary key default gen_random_uuid(),
  request_type public.public_request_type not null,
  email text not null check (char_length(email) <= 254),
  payload jsonb not null,
  status public.public_request_status not null default 'new',
  dedupe_key text not null unique,
  created_at timestamptz not null default now()
);
create table public.request_notification_outbox (
  id bigint generated always as identity primary key,
  request_id uuid not null unique references public.public_requests(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  created_at timestamptz not null default now()
);
alter table public.public_requests enable row level security;
alter table public.request_notification_outbox enable row level security;
revoke all on public.public_requests, public.request_notification_outbox from anon, authenticated;
grant select, insert, update on public.public_requests to service_role;
grant select, insert, update on public.request_notification_outbox to service_role;
