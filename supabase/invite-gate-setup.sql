-- Omeora invite-only test: one-time setup. Run this AFTER schema.sql.
-- 1. Replace PUT-YOUR-EMAIL-HERE with the email you sign in to Omeora with (keep the quotes).
-- 2. Click Run. You become the organizer and the first invited tester.
-- Safe to run again. Add everyone else from the app: Profile -> Invite testers.
do $$
declare
  my_email text := lower(btrim('PUT-YOUR-EMAIL-HERE'));
begin
  if my_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'Put your own email address between the quotes first, then run this again.';
  end if;
  update public.beta_settings set admin_email = my_email where id = 1;
  insert into public.beta_invites (email) values (my_email) on conflict (email) do nothing;
end $$;
