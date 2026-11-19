# DeepWord study companion (AI endpoint)

A small Cloudflare Worker that answers Ask AI questions with Claude (`claude-haiku-5-5`).
The app sends the question (and the passage, if the person asked from the reader) to
`POST /ask`; the Worker adds the study-companion instructions in `src/prompt.ts`, calls the
Claude API and sends back the answer.

The Anthropic API key lives only here, as a Cloudflare secret. It is never in the app,
in this repository or in the web build.

Until this is set up, the app keeps working: Ask AI shows its built-in preview answers.

## Switching it on (about 15 minutes, no terminal needed)

You need three things: an Anthropic API key, a free Cloudflare account, and access to this
repository's settings on GitHub.

1. **Anthropic key.** In the Anthropic Console (console.anthropic.com), create an API key.
   While you're there, set a monthly spend limit under Billing, so a surprise can never cost
   more than you chose.
2. **Cloudflare.** Create a free Cloudflare account. Open **Workers & Pages** once so it asks
   you to choose your `workers.dev` subdomain. Then:
   - Copy your **Account ID** (shown on the Workers & Pages overview page).
   - Under **My Profile → API Tokens**, create a token from the **Edit Cloudflare Workers**
     template and copy it.
3. **GitHub secrets.** In this repository, open **Settings → Secrets and variables →
   Actions** and add three repository secrets:
   - `ANTHROPIC_API_KEY`
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. **Deploy.** Open the **Actions** tab, pick **Deploy AI worker**, and press
   **Run workflow**. When it finishes, the log of the Deploy step shows the address, which looks
   like `https://deepword-ai.<your-subdomain>.workers.dev`.
5. **Point the app at it.** Back in **Settings → Secrets and variables → Actions**, open the
   **Variables** tab and add a repository variable named `EXPO_PUBLIC_AI_ENDPOINT` with that
   address. Then run **Deploy web to GitHub Pages** from the Actions tab (or push to `main`).

To check it's alive, open the address in a browser: it should show `"ok":true`.

For the phone apps, set the same `EXPO_PUBLIC_AI_ENDPOINT` value in the EAS build
environment (or in a local `.env` file) before building.

## What protects the key and the bill

- The key is a Cloudflare secret, read from the environment at request time.
- Browsers may call the endpoint only from the sites listed in `ALLOWED_ORIGINS` in
  `wrangler.toml` (the GitHub Pages site and the local dev server). Add a site there if the
  web app moves.
- Each visitor can ask at most 10 questions a minute (`[[ratelimits]]` in `wrangler.toml`).
- Questions, passages and chat history are size-limited before anything reaches Claude.
- The app itself allows 5 questions a day per device. That limit lives on the device, so it
  guides normal use; the spend limit in the Anthropic Console is the real ceiling.

## Changing how it answers

The instructions Claude follows are in `src/prompt.ts`: Scripture as the final standard,
verses cited for every claim, disputed questions presented fairly, and the core of the
Apostles' Creed as common ground. Edit that file and the Worker redeploys itself when the
change reaches `main` (once the secrets above exist).

To try a different model, add `MODEL = "<model id>"` under `[vars]` in `wrangler.toml`.

## For developers

```sh
cd server/ai-worker
npm install
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .dev.vars   # never commit this file (it's gitignored)
npm run dev                                       # http://localhost:8787
npm run check                                     # type check and a dry-run build
```

Then start the app with `EXPO_PUBLIC_AI_ENDPOINT=http://localhost:8787 npx expo start --clear`
(`--clear` matters: the address is baked in when the app is built, and a cached build keeps the old one).

The API: `POST /ask` with JSON
`{"question": "...", "verse": {"reference": "John 3:16", "text": "..."} | null,
"translation": "BSB" | "WEB" | "KJV", "history": [{"role": "user" | "assistant", "content": "..."}]}`
returns `{"answer": "..."}` or `{"error": "a message safe to show people"}`.
