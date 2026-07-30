-- F-002 intentionally does not commit login-capable users or passwords.
-- Start the stack, sync `.env.local`, then provision local staff with the
-- server-only `npm run staff:provision` workflow documented in README.md.
insert into public.event_editions (id, title, starts_on, ends_on, opens_at, closes_at, venue, city, address, description, visitor_information, ticket_url, publication_status)
values ('rijswijk-2026', 'Health & Beauty Expo Rijswijk 2026', '2026-10-24', '2026-10-25', '10:00', '18:00', 'De Broodfabriek', 'Rijswijk', 'Volmerlaan 12, 2288 GD Rijswijk', 'An international meeting point for health, beauty, wellness and medical tourism.', 'Plan your visit early and check the official event information before travelling.', null, 'draft')
on conflict (id) do nothing;

insert into public.exhibitors (name, slug, category, description, website_url, is_active, is_featured, display_order) values
('Nova Medical Group','nova-medical-group','Medical tourism','International patient care and medical tourism services.','https://example.test',true,true,10),
('Althea Aesthetics','althea-aesthetics','Aesthetic medicine','Evidence-led aesthetic medicine and professional training.','https://example.test',true,false,20),
('Lumen Skin Science','lumen-skin-science','Skincare','Professional skincare innovation for clinics and consumers.',null,false,false,30)
on conflict (slug) do nothing;
