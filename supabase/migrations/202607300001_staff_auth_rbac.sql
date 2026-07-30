create type public.staff_role as enum (
  'administrator',
  'staff',
  'organizer'
);

create table public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (
    char_length(trim(display_name)) between 2 and 100
  ),
  role public.staff_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.staff_profiles is
  'Server-authoritative application role and status for provisioned staff.';

alter table public.staff_profiles enable row level security;

revoke all on table public.staff_profiles from anon, authenticated;
grant select on table public.staff_profiles to authenticated;
grant select, insert, update, delete on table public.staff_profiles to service_role;

create policy "Staff can read only their own profile"
on public.staff_profiles
for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.set_staff_profile_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_staff_profile_updated_at
before update on public.staff_profiles
for each row execute function public.set_staff_profile_updated_at();
