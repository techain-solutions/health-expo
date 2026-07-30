-- Shared, privacy-preserving request throttling for serverless deployments.
-- Only keyed HMAC digests are stored; raw IP and email values never reach this table.

create table public.request_throttle_events (
  id bigint generated always as identity primary key,
  key_hash text not null check (key_hash ~ '^[0-9a-f]{64}$'),
  occurred_at timestamptz not null default now()
);

create index request_throttle_events_key_time_idx
  on public.request_throttle_events (key_hash, occurred_at);

alter table public.request_throttle_events enable row level security;

revoke all on public.request_throttle_events from anon, authenticated;
grant select, insert, delete on public.request_throttle_events to service_role;
grant usage, select on sequence public.request_throttle_events_id_seq to service_role;

create or replace function public.take_request_rate_limit(
  p_key_hash text,
  p_now timestamptz default now(),
  p_window_seconds integer default 600,
  p_maximum_requests integer default 5
)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  oldest_request timestamptz;
  request_total integer;
begin
  if p_key_hash !~ '^[0-9a-f]{64}$'
    or p_window_seconds < 1
    or p_maximum_requests < 1
  then
    raise exception 'invalid request throttle arguments';
  end if;

  -- Serialize checks for one identity so concurrent serverless instances cannot
  -- all pass the limit before their events are inserted.
  perform pg_advisory_xact_lock(hashtextextended(p_key_hash, 0));

  delete from public.request_throttle_events
  where occurred_at <= p_now - make_interval(secs => p_window_seconds);

  select count(*), min(occurred_at)
    into request_total, oldest_request
  from public.request_throttle_events
  where key_hash = p_key_hash;

  if request_total >= p_maximum_requests then
    return query
      select false,
        greatest(
          1,
          ceil(extract(epoch from (
            oldest_request + make_interval(secs => p_window_seconds) - p_now
          )))::integer
        );
    return;
  end if;

  insert into public.request_throttle_events (key_hash, occurred_at)
  values (p_key_hash, p_now);

  return query select true, 0;
end;
$$;

revoke all on function public.take_request_rate_limit(text, timestamptz, integer, integer)
  from public, anon, authenticated;
grant execute on function public.take_request_rate_limit(text, timestamptz, integer, integer)
  to service_role;
