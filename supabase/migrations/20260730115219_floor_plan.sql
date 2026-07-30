insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'floor-plans',
  'floor-plans',
  true,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table public.floor_plan_assets (
  id text primary key check (id = 'current'),
  storage_path text not null check (storage_path ~ '^current[.](pdf|jpg|png|webp)$'),
  content_type text not null check (content_type in ('application/pdf', 'image/jpeg', 'image/png', 'image/webp')),
  original_name text not null check (char_length(original_name) between 1 and 180),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.floor_plan_assets enable row level security;
revoke all on public.floor_plan_assets from anon, authenticated;
grant select, insert, update, delete on public.floor_plan_assets to service_role;
