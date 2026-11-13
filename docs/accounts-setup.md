# Switching on accounts (no terminal needed)

DeepWord's accounts run on **Supabase**: sign-in, plus one small saved copy of each person's
progress. Until you do the steps below, the app works exactly as before, as a guest on each
device, and the Profile page says accounts are coming soon.

**Cost.** Supabase's free plan covers sign-in for up to 50,000 monthly users and a 500 MB
database (each account's progress is a few kilobytes). The one catch: a free project pauses
after a week with no visits, and you wake it with one click in the dashboard. Move to the
$25/month plan when real users arrive and it can't pause. Check supabase.com/pricing for the
current numbers.

## 1. Create the project (5 minutes)

1. Sign up at supabase.com and create a new project. Name it `deepword`, pick a strong
   database password (save it in your password manager), and choose a US Central or US East
   region.
2. When it's ready, open **SQL Editor**, click **New query**, paste everything in
   [`supabase/schema.sql`](../supabase/schema.sql) and press **Run**. It should say
   "Success. No rows returned."
3. Open **Project Settings → API Keys** and copy the **Publishable key** (it starts with
   `sb_publishable_`; older projects call it the `anon` key). Then open **Project Settings →
   Data API** and copy the **Project URL** (`https://<something>.supabase.co`).
   Both are safe to put in the app. Never copy the **secret** (service role) key anywhere.

## 2. Email codes (10 minutes)

People sign in by typing a 6-digit code from an email; there are no passwords to manage.

1. **Authentication → Sign In / Providers → Email:** make sure Email is on. Leave
   "Confirm email" on.
2. **Authentication → Emails → Templates:** in both **Magic Link** and **Confirm signup**,
   replace the body with something like:
   `Your DeepWord code is {{ .Token }}. It expires in an hour.`
   The `{{ .Token }}` part is the code; without it the email only has a link, which the app
   doesn't use.
3. **Send emails from your own address.** Supabase's built-in sender only allows a few emails
   an hour and is meant for testing. You already use Resend, whose free plan covers 3,000
   emails a month:
   - In Resend, add and verify a domain you own, then create an API key with "Sending access".
   - In Supabase, **Authentication → Emails → SMTP Settings**, turn on custom SMTP:
     host `smtp.resend.com`, port `465`, username `resend`, password = that Resend API key,
     sender email e.g. `hello@yourdomain.com`, sender name `DeepWord`.

## 3. Where sign-in may return to (2 minutes)

**Authentication → URL Configuration:**

- **Site URL:** `https://jdgarc7612.github.io/biblestudyapp/`
- **Redirect URLs** (add each one):
  - `https://jdgarc7612.github.io/biblestudyapp/**`
  - `http://localhost:8081/**`
  - `biblestudyapp://**`
  - `exp://**` (only needed while testing in Expo Go)

## 4. Point the app at it (3 minutes)

In GitHub, open the repository's **Settings → Secrets and variables → Actions → Variables**
tab and add:

| Name | Value |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | the Project URL from step 1 |
| `EXPO_PUBLIC_SUPABASE_KEY` | the Publishable key from step 1 |
| `EXPO_PUBLIC_AUTH_PROVIDERS` | leave out for email only; later `google`, `apple` or `apple,google` |

Then on the **Actions** tab run **Deploy AI worker** and **Deploy web to GitHub Pages** (or
merge to `main`, which runs both). The worker picks up the same two values, so signed-in
readers' 5 free questions a day are counted on their account and can't be reset by
reinstalling. Guests still get 5 a day per device.

For phone builds later, the same three values go in the EAS build environment.

## 5. Optional: Continue with Google

1. In Google Cloud Console, create a project, set up the **OAuth consent screen** (app name
   DeepWord, your support email), then **Credentials → Create credentials → OAuth client ID →
   Web application**. Under **Authorized redirect URIs** add
   `https://<your-project>.supabase.co/auth/v1/callback` (Supabase shows this exact address on
   its Google provider page).
2. In Supabase, **Authentication → Sign In / Providers → Google:** turn it on and paste the
   client ID and secret.
3. Add `google` to `EXPO_PUBLIC_AUTH_PROVIDERS` and redeploy.

On iPhone, Apple's rules say an app offering Google sign-in must offer Sign in with Apple too,
so the app hides the Google button on iPhone until Apple is switched on as well.

## 6. Optional: Sign in with Apple

This needs the Apple Developer Program ($99/year), which you'll need for the App Store anyway.

1. In the Apple Developer site, under **Identifiers**, create an App ID for DeepWord (for
   example `com.yourname.deepword`) with **Sign in with Apple** ticked. Set the same value as
   `ios.bundleIdentifier` in `app.json` when the app gets its real name and icon.
2. In Supabase, **Authentication → Sign In / Providers → Apple:** turn it on and add that App
   ID under **Client IDs**. That's enough for iPhones, which use Apple's own sign-in sheet.
3. For the website and Android, Apple sign-in goes through Apple's web page and needs a
   **Services ID** and a **Sign in with Apple key**. Supabase's Apple page walks through
   these and makes the secret from them. That secret expires every 6 months, so put a
   reminder in your calendar.
4. Add `apple` to `EXPO_PUBLIC_AUTH_PROVIDERS` and redeploy.

## What's built but not yet tested against a real project

These are written to Supabase's and Apple's documented behaviour, but nothing here has a live
Supabase project yet, so test each once you finish steps 1 to 4:

- Email code sign-in, sign-out and **Delete account** (deletes the account and everything
  synced to it).
- Sync between two devices, and a guest's progress moving into the account on first sign-in.
- The per-account AI limit (needs the AI worker switched on too).
- Google and Apple sign-in, and Apple's sheet on a real iPhone (needs a development build,
  not Expo Go, once the bundle ID is set).

One more before the App Store: when someone who used Sign in with Apple deletes their
account, Apple asks apps to also revoke the Apple sign-in. That needs a small server step
not built yet; it's a launch item, not needed for testing.
