create table public.staff_account_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid not null,
  target_user_id uuid not null,
  action text not null check (action in ('created', 'role_changed', 'deactivated', 'reactivated')),
  created_at timestamptz not null default now()
);

comment on table public.staff_account_events is
  'Server-written operational audit records for administrator-managed staff accounts.';

alter table public.staff_account_events enable row level security;

revoke all on table public.staff_account_events from anon, authenticated;
grant select, insert on table public.staff_account_events to service_role;
