create table public.exhibitors (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 140),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null check (char_length(trim(category)) between 2 and 80),
  description text not null check (char_length(trim(description)) between 20 and 1000),
  website_url text,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  display_order integer not null default 0 check (display_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.exhibitors enable row level security;
revoke all on public.exhibitors from anon, authenticated;
grant select, insert, update, delete on public.exhibitors to service_role;
create trigger set_exhibitor_updated_at before update on public.exhibitors for each row execute function public.set_staff_profile_updated_at();
