-- DeepWord accounts: run this once in your Supabase project (SQL Editor -> New query -> Run).
-- Safe to run again; it only adds what's missing and updates the functions.

-- Each account's synced progress: one small JSON copy of what the app saves on the device.
create table if not exists public.user_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

drop policy if exists "Read own data" on public.user_data;
create policy "Read own data" on public.user_data
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Add own data" on public.user_data;
create policy "Add own data" on public.user_data
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Update own data" on public.user_data;
create policy "Update own data" on public.user_data
  for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

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
