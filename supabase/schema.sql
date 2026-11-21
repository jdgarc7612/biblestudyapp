-- Omeora accounts: run this once in your Supabase project (SQL Editor -> New query -> Run).
-- Safe to run again; it only adds what's missing and updates the functions.

-- ---------------------------------------------------------------------------------------------
-- Invite-only test gate (see docs/accounts-setup.md, "Invite-only test").
-- While the gate is on, only invited emails can make an account, and only they (plus the
-- organizer in admin_email) can read or save synced progress or use AI questions.
-- ---------------------------------------------------------------------------------------------

-- Who is invited. Emails are always stored lowercased and trimmed.
create table if not exists public.beta_invites (
  email text primary key check (email = lower(btrim(email)) and email like '%_@_%'),
  created_at timestamptz not null default now()
);

create or replace function public.beta_normalize_invite()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.email := lower(btrim(new.email));
  return new;
end;
$$;

drop trigger if exists beta_invites_normalize on public.beta_invites;
create trigger beta_invites_normalize
  before insert or update on public.beta_invites
  for each row execute function public.beta_normalize_invite();

-- One row of settings. ends_on is the last day of the test, in time_zone.
create table if not exists public.beta_settings (
  id integer primary key default 1 check (id = 1),
  enabled boolean not null default true,
  ends_on date not null default date '2026-12-20',
  time_zone text not null default 'America/Chicago',
  admin_email text
);

insert into public.beta_settings (id) values (1) on conflict (id) do nothing;

-- Only the functions below read these tables; the app can't read or change them directly.
alter table public.beta_invites enable row level security;
alter table public.beta_settings enable row level security;
revoke all on public.beta_invites from anon, authenticated;
revoke all on public.beta_settings from anon, authenticated;

-- The moment the test ends: the end of ends_on in the test's time zone.
create or replace function public.beta_ends_at()
returns timestamptz
language sql
stable
security definer
set search_path = ''
as $$
  select ((s.ends_on + 1)::timestamp at time zone s.time_zone)
  from public.beta_settings s where s.id = 1;
$$;

-- True when this email may use Omeora right now.
create or replace function public.beta_allows(p_email text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  s public.beta_settings;
  e text := lower(btrim(coalesce(p_email, '')));
begin
  select * into s from public.beta_settings where id = 1;
  if not found or not s.enabled then
    return true;
  end if;
  -- The organizer always gets in, so they can extend the test or turn the gate off.
  if s.admin_email is not null and e = lower(btrim(s.admin_email)) then
    return true;
  end if;
  if now() >= public.beta_ends_at() then
    return false;
  end if;
  return exists (select 1 from public.beta_invites i where i.email = e);
end;
$$;

-- The same check for whoever is signed in.
create or replace function public.beta_allows_me()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.beta_allows(auth.jwt() ->> 'email');
$$;

create or replace function public.beta_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select s.admin_email is not null
        and lower(btrim(s.admin_email)) = lower(btrim(coalesce(auth.jwt() ->> 'email', '')))
     from public.beta_settings s where s.id = 1),
    false);
$$;

-- What the app needs to show the right screen. Anyone may ask; it says nothing about
-- other people.
create or replace function public.beta_status()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  s public.beta_settings;
  e text := lower(btrim(coalesce(auth.jwt() ->> 'email', '')));
begin
  select * into s from public.beta_settings where id = 1;
  if not found then
    return jsonb_build_object('enabled', false);
  end if;
  return jsonb_build_object(
    'enabled', s.enabled,
    'ends_on', s.ends_on,
    'ends_at', public.beta_ends_at(),
    'ended', now() >= public.beta_ends_at(),
    'invited', e <> '' and exists (select 1 from public.beta_invites i where i.email = e),
    'is_admin', public.beta_is_admin()
  );
end;
$$;

-- Organizer tools (the Invite testers screen in Profile). Only admin_email may call them.
create or replace function public.beta_require_admin()
returns void
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.beta_is_admin() then
    raise exception 'Only the test organizer can do that.' using errcode = '42501';
  end if;
end;
$$;

create or replace function public.list_beta_invites()
returns table (email text, created_at timestamptz)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  perform public.beta_require_admin();
  return query select i.email, i.created_at from public.beta_invites i order by i.created_at desc;
end;
$$;

create or replace function public.add_beta_invite(p_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  e text := lower(btrim(coalesce(p_email, '')));
begin
  perform public.beta_require_admin();
  if e !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'That email address doesn''t look right.' using errcode = '22023';
  end if;
  insert into public.beta_invites (email) values (e) on conflict (email) do nothing;
end;
$$;

create or replace function public.remove_beta_invite(p_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.beta_require_admin();
  delete from public.beta_invites where email = lower(btrim(coalesce(p_email, '')));
end;
$$;

-- Turn the gate on or off, or move the last day of the test.
create or replace function public.set_beta_settings(p_enabled boolean, p_ends_on date)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.beta_require_admin();
  update public.beta_settings
  set enabled = coalesce(p_enabled, enabled), ends_on = coalesce(p_ends_on, ends_on)
  where id = 1;
end;
$$;

-- Supabase Auth calls this before it makes any new account (email code, Google or Apple).
-- Switch it on in Authentication -> Auth Hooks -> "Before User Created".
create or replace function public.beta_before_user_created(event jsonb)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  e text := event -> 'user' ->> 'email';
begin
  if public.beta_allows(e) then
    return '{}'::jsonb;
  end if;
  if exists (select 1 from public.beta_settings s where s.id = 1 and s.enabled)
     and now() >= public.beta_ends_at() then
    return jsonb_build_object('error', jsonb_build_object(
      'http_code', 403,
      'message', 'Thanks for trying Omeora. This private test has ended.'));
  end if;
  return jsonb_build_object('error', jsonb_build_object(
    'http_code', 403,
    'message', 'This test is invite-only. If you were invited, use that email, or ask Josh to add you.'));
end;
$$;

revoke execute on function public.beta_normalize_invite() from public, anon, authenticated;
revoke execute on function public.beta_ends_at() from public, anon, authenticated;
revoke execute on function public.beta_allows(text) from public, anon, authenticated;
revoke execute on function public.beta_require_admin() from public, anon, authenticated;
revoke execute on function public.beta_before_user_created(jsonb) from public, anon, authenticated;
revoke execute on function public.beta_allows_me() from public, anon;
revoke execute on function public.beta_is_admin() from public, anon;
revoke execute on function public.beta_status() from public;
revoke execute on function public.list_beta_invites() from public, anon;
revoke execute on function public.add_beta_invite(text) from public, anon;
revoke execute on function public.remove_beta_invite(text) from public, anon;
revoke execute on function public.set_beta_settings(boolean, date) from public, anon;
grant execute on function public.beta_allows_me() to authenticated;
grant execute on function public.beta_is_admin() to authenticated;
grant execute on function public.beta_status() to anon, authenticated;
grant execute on function public.list_beta_invites() to authenticated;
grant execute on function public.add_beta_invite(text) to authenticated;
grant execute on function public.remove_beta_invite(text) to authenticated;
grant execute on function public.set_beta_settings(boolean, date) to authenticated;
grant usage on schema public to supabase_auth_admin;
grant execute on function public.beta_before_user_created(jsonb) to supabase_auth_admin;

-- Each account's synced progress: one small JSON copy of what the app saves on the device.
-- While the invite gate is on, only allowed people can read or save it. Deleting stays open,
-- and deleting an account removes it anyway.
create table if not exists public.user_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

drop policy if exists "Read own data" on public.user_data;
create policy "Read own data" on public.user_data
  for select to authenticated
  using ((select auth.uid()) = user_id and (select public.beta_allows_me()));

drop policy if exists "Add own data" on public.user_data;
create policy "Add own data" on public.user_data
  for insert to authenticated
  with check ((select auth.uid()) = user_id and (select public.beta_allows_me()));

drop policy if exists "Update own data" on public.user_data;
create policy "Update own data" on public.user_data
  for update to authenticated
  using ((select auth.uid()) = user_id and (select public.beta_allows_me()))
  with check ((select auth.uid()) = user_id and (select public.beta_allows_me()));

drop policy if exists "Delete own data" on public.user_data;
create policy "Delete own data" on public.user_data
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Free AI questions asked per account per day. Nobody can read or change this table directly;
-- only the two functions below touch it, and only for the signed-in person.
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  questions integer not null default 0,
  primary key (user_id, day)
);

alter table public.ai_usage enable row level security;
revoke all on public.ai_usage from anon, authenticated;

-- How many free questions the signed-in person has asked on a given day.
create or replace function public.ai_questions_used(p_day date)
returns integer
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  if not public.beta_allows_me() then
    raise exception 'This test is invite-only.' using errcode = '42501';
  end if;
  return coalesce(
    (select questions from public.ai_usage where user_id = uid and day = p_day), 0);
end;
$$;

-- Adds one question to today's count and returns the new count.
create or replace function public.record_ai_question(p_day date)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  utc_today date := (now() at time zone 'utc')::date;
  n integer;
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  if not public.beta_allows_me() then
    raise exception 'This test is invite-only.' using errcode = '42501';
  end if;
  -- "Today" can differ from UTC by at most a day, whatever the time zone.
  if p_day is null or abs(p_day - utc_today) > 1 then
    p_day := utc_today;
  end if;
  insert into public.ai_usage (user_id, day, questions)
  values (uid, p_day, 1)
  on conflict (user_id, day) do update set questions = public.ai_usage.questions + 1
  returning questions into n;
  -- Old days are no longer needed.
  delete from public.ai_usage where user_id = uid and day < utc_today - 7;
  return n;
end;
$$;

-- Deletes the signed-in person's account. Their synced data and AI counts go with it
-- (the "on delete cascade" above).
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  delete from auth.users where id = uid;
end;
$$;

revoke execute on function public.ai_questions_used(date) from public, anon;
revoke execute on function public.record_ai_question(date) from public, anon;
revoke execute on function public.delete_my_account() from public, anon;
grant execute on function public.ai_questions_used(date) to authenticated;
grant execute on function public.record_ai_question(date) to authenticated;
grant execute on function public.delete_my_account() to authenticated;

-- Feedback from testers and readers (Profile -> Send feedback). Anyone can send one, signed in
-- or not; nobody can read them back through the app. Read them in the dashboard
-- (Table Editor -> feedback). Feedback linked to an account is deleted with the account.
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid default auth.uid() references auth.users (id) on delete cascade,
  kind text not null default 'other'
    check (kind in ('confusing', 'broken', 'idea', 'love', 'other')),
  message text not null check (char_length(message) between 1 and 4000),
  reply_email text check (char_length(reply_email) <= 200),
  screen text check (char_length(screen) <= 200),
  app_version text check (char_length(app_version) <= 40),
  platform text check (char_length(platform) <= 40)
);

alter table public.feedback enable row level security;
revoke all on public.feedback from anon, authenticated;
-- The app may only add rows, and only these columns; user_id always comes from the sign-in.
grant insert (kind, message, reply_email, screen, app_version, platform)
  on public.feedback to anon, authenticated;

drop policy if exists "Send feedback" on public.feedback;
create policy "Send feedback" on public.feedback
  for insert to anon, authenticated
  with check (user_id is not distinct from (select auth.uid()));
