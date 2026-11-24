-- Study journal bonus: finishing a SOAP study earns one extra Ask AI question that day.
-- Safe to run more than once. Already included in schema.sql for new projects.
--
-- ai_usage gets a "bonus" column. The two quota functions now return questions minus bonus, so
-- the AI worker allows one more question on a day with a bonus without any change of its own.

alter table public.ai_usage add column if not exists bonus integer not null default 0;

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
    (select questions - bonus from public.ai_usage where user_id = uid and day = p_day), 0);
end;
$$;

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
  returning questions - bonus into n;
  -- Old days are no longer needed.
  delete from public.ai_usage where user_id = uid and day < utc_today - 7;
  return n;
end;
$$;

-- Records that the signed-in person finished a study today: one bonus question, at most one a day.
-- Returns the day's count (questions minus bonus), like the functions above.
create or replace function public.claim_study_bonus(p_day date)
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
  if p_day is null or abs(p_day - utc_today) > 1 then
    p_day := utc_today;
  end if;
  insert into public.ai_usage (user_id, day, questions, bonus)
  values (uid, p_day, 0, 1)
  on conflict (user_id, day) do update set bonus = 1
  returning questions - bonus into n;
  return n;
end;
$$;

revoke execute on function public.claim_study_bonus(date) from public, anon;
grant execute on function public.claim_study_bonus(date) to authenticated;
