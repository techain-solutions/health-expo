create table public.event_editions (
  id text primary key check (id = 'rijswijk-2026'),
  title text not null check (char_length(trim(title)) between 2 and 140),
  starts_on date not null,
  ends_on date not null check (ends_on >= starts_on),
  opens_at time not null,
  closes_at time not null check (closes_at > opens_at),
  venue text not null check (char_length(trim(venue)) between 2 and 140),
  city text not null check (char_length(trim(city)) between 2 and 100),
  address text not null check (char_length(trim(address)) between 5 and 240),
  description text not null check (char_length(trim(description)) between 20 and 2000),
  visitor_information text not null default '' check (char_length(visitor_information) <= 2000),
  ticket_url text,
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.event_editions enable row level security;
revoke all on table public.event_editions from anon, authenticated;
grant select, insert, update, delete on table public.event_editions to service_role;

create trigger set_event_edition_updated_at before update on public.event_editions for each row execute function public.set_staff_profile_updated_at();

create table public.event_audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid not null,
  action text not null check (action in ('updated', 'published', 'unpublished')),
  created_at timestamptz not null default now()
);
alter table public.event_audit_events enable row level security;
revoke all on table public.event_audit_events from anon, authenticated;
grant select, insert on table public.event_audit_events to service_role;
