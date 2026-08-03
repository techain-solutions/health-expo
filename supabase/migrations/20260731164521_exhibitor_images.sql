insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'exhibitor-images',
  'exhibitor-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.exhibitors
  add column image_path text,
  add column image_content_type text;

alter table public.exhibitors
  add constraint exhibitors_image_path_check
    check (image_path is null or image_path ~ '^[0-9a-f-]{36}/profile[.](jpg|png|webp)$'),
  add constraint exhibitors_image_content_type_check
    check (image_content_type is null or image_content_type in ('image/jpeg', 'image/png', 'image/webp')),
  add constraint exhibitors_image_pair_check
    check ((image_path is null) = (image_content_type is null));
