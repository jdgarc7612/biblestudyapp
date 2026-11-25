/**
 * Omeora study companion endpoint.
 *
 * POST /ask  { question, verse?: { reference, text }, translation?, history?: [{ role, content }] }
 *   Optional headers for signed-in readers: Authorization: Bearer <Supabase access token>,
 *   X-Timezone: <IANA zone, for when "today" starts>.
 *   -> 200 { answer, remaining? }   (remaining: free questions left today, for signed-in readers)
 *   -> 4xx/5xx { error, code? }     (code "daily_limit" when today's free questions are used up)
 *
 * POST /hint { method: "soap", step, verse: { reference, text }, translation?, draft? }
 *   A short nudge for one step of a Study journal entry. Needs a signed-in (invited) reader when
 *   accounts are set up. Hints never count toward the daily questions; the app limits how many a
 *   study gets (lib/study-journal.ts).
 *   -> 200 { hint }
 *
 * POST /reflect { kind: "plan" | "soap", passage: { reference, text }, translation?, answers: [{ prompt, text }] }
 *   Reflect with AI: one short, Scripture-first response to what the reader wrote. Same sign-in
 *   rule as /hint, and never counted toward the daily questions; the app allows 2 per study or
 *   plan day (lib/reflect.ts).
 *   -> 200 { reflection }
 *
 * The Anthropic API key lives only here, as the ANTHROPIC_API_KEY secret.
 */
import Anthropic from "@anthropic-ai/sdk";

import { type AccountQuota, accountDay, inviteGateOn, makeAccountQuota } from "./quota";
import { HINT_PROMPT, REFLECT_PROMPT, SYSTEM_PROMPT } from "./prompt";
import { BadRequest, buildReflectMessage, validateReflect, type ValidReflect } from "./reflect";

export interface Env {
  ANTHROPIC_API_KEY: string;
  /** Comma-separated list of browser origins allowed to call this endpoint. */
  ALLOWED_ORIGINS?: string;
  /** Optional model override; defaults to Claude Haiku 5.5 for the free tier. */
  MODEL?: string;
  /** Per-visitor request limiter (see wrangler.toml). Optional so local tests can run without it. */
  AI_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  /** Supabase project, for counting signed-in readers' free questions per account. */
  SUPABASE_URL?: string;
  SUPABASE_KEY?: string;
  /** Free questions per account per day (default 5, matching the app). */
  AI_DAILY_LIMIT?: string;
}

const DEFAULT_MODEL = "claude-haiku-5-5";
const MAX_QUESTION_CHARS = 1500;
const MAX_VERSE_CHARS = 4000;
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_CHARS = 2500;
const TRANSLATIONS = new Set(["WEB", "BSB", "KJV"]);

interface AskBody {
  question?: unknown;
  verse?: { reference?: unknown; text?: unknown } | null;
  translation?: unknown;
  history?: unknown;
}

export interface ValidAsk {
  question: string;
  verse?: { reference: string; text: string };
  translation?: string;
  history: { role: "user" | "assistant"; content: string }[];
}


const HINT_STEPS = new Set(["scripture", "observation", "application", "prayer"]);
const MAX_DRAFT_CHARS = 1500;

export interface ValidHint {
  step: "scripture" | "observation" | "application" | "prayer";
  verse: { reference: string; text: string };
  translation?: string;
  draft: string;
}

export function validateHint(body: {
  method?: unknown;
  step?: unknown;
  verse?: { reference?: unknown; text?: unknown } | null;
  translation?: unknown;
  draft?: unknown;
}): ValidHint {
  if (str(body.method) !== "soap") throw new BadRequest("Unknown study method.");
  const step = str(body.step);
  if (!HINT_STEPS.has(step)) throw new BadRequest("Unknown study step.");
  const reference = body.verse && typeof body.verse === "object" ? str(body.verse.reference).slice(0, 80) : "";
  const text = body.verse && typeof body.verse === "object" ? str(body.verse.text).slice(0, MAX_VERSE_CHARS) : "";
  if (!reference || !text) throw new BadRequest("Please include the passage.");
  const translation = TRANSLATIONS.has(str(body.translation)) ? str(body.translation) : undefined;
  return { step: step as ValidHint["step"], verse: { reference, text }, translation, draft: str(body.draft).slice(0, MAX_DRAFT_CHARS) };
}

const STEP_ASKS: Record<ValidHint["step"], string> = {
  scripture: "I'm on the Scripture step: reading slowly and copying out the words that stand out.",
  observation: "I'm on the Observation step: noticing what the passage says.",
  application: "I'm on the Application step: working out how it applies to my life today.",
  prayer: "I'm on the Prayer step: writing a prayer in response.",
};

export function buildHintMessage(hint: ValidHint): string {
  const label = hint.translation ? ` (${hint.translation})` : "";
  const parts = [
    `I'm doing a SOAP study of ${hint.verse.reference}${label}:\n<passage>\n${hint.verse.text}\n</passage>`,
    STEP_ASKS[hint.step],
  ];
  if (hint.draft) parts.push(`What I've written so far:\n<draft>\n${hint.draft}\n</draft>`);
  parts.push("Give me a hint for this step.");
  return parts.join("\n\n");
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");


export function validateAsk(body: AskBody): ValidAsk {
  const question = str(body.question);
  if (!question) throw new BadRequest("Please include a question.");
  if (question.length > MAX_QUESTION_CHARS) {
    throw new BadRequest(`Questions can be up to ${MAX_QUESTION_CHARS} characters.`);
  }

  let verse: ValidAsk["verse"];
  if (body.verse && typeof body.verse === "object") {
    const reference = str(body.verse.reference).slice(0, 80);
    const text = str(body.verse.text).slice(0, MAX_VERSE_CHARS);
    if (reference && text) verse = { reference, text };
  }

  const translation = TRANSLATIONS.has(str(body.translation)) ? str(body.translation) : undefined;

  const history: ValidAsk["history"] = [];
  if (Array.isArray(body.history)) {
    for (const m of body.history.slice(-MAX_HISTORY_MESSAGES)) {
      if (!m || typeof m !== "object") continue;
      const role = (m as { role?: unknown }).role;
      const content = str((m as { content?: unknown }).content).slice(0, MAX_HISTORY_CHARS);
      if ((role === "user" || role === "assistant") && content) history.push({ role, content });
    }
  }
  // The conversation must start with the reader, and roles must alternate.
  while (history.length && history[0].role !== "user") history.shift();
  const alternating: ValidAsk["history"] = [];
  for (const m of history) {
    const last = alternating[alternating.length - 1];
    if (last && last.role === m.role) last.content += `\n\n${m.content}`;
    else alternating.push({ ...m });
  }
  if (alternating.length && alternating[alternating.length - 1].role === "user") alternating.pop();

  return { question, verse, translation, history: alternating };
}

export function buildMessages(ask: ValidAsk): Anthropic.MessageParam[] {
  const parts: string[] = [];
  if (ask.verse) {
    const label = ask.translation ? ` (${ask.translation})` : "";
    parts.push(
      `I'm reading ${ask.verse.reference}${label}:\n<passage>\n${ask.verse.text}\n</passage>`
    );
  } else if (ask.translation) {
    parts.push(`(I usually read the ${ask.translation}.)`);
  }
  parts.push(ask.question);
  return [...ask.history, { role: "user", content: parts.join("\n\n") }];
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin");
  const allowed = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Timezone",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && allowed.includes(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(data: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method === "GET" && url.pathname === "/") {
      return json({ ok: true, service: "deepword-ai" }, 200, cors);
    }
    if (request.method !== "POST" || !["/ask", "/hint", "/reflect"].includes(url.pathname)) {
      return json({ error: "Not found." }, 404, cors);
    }
    // Browsers must come from an allowed site. (The phone apps send no Origin header.)
    if (origin && !cors["Access-Control-Allow-Origin"]) {
      return json({ error: "This site isn't allowed to use the study companion." }, 403, cors);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: "The study companion isn't set up yet." }, 503, cors);
    }

    if (env.AI_LIMITER) {
      const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
      const { success } = await env.AI_LIMITER.limit({ key: ip });
      if (!success) {
        return json({ error: "That's a lot of questions at once. Please wait a minute and try again." }, 429, cors);
      }
    }

    if (url.pathname === "/hint") return handleHint(request, env, cors);
    if (url.pathname === "/reflect") return handleReflect(request, env, cors);

    let ask: ValidAsk;
    try {
      ask = validateAsk((await request.json()) as AskBody);
    } catch (err) {
      const message = err instanceof BadRequest ? err.message : "That request couldn't be read.";
      return json({ error: message }, 400, cors);
    }

    // Signed-in readers: today's free questions are counted on their account, not the device.
    let quota: AccountQuota | null = null;
    let used = 0;
    const limit = Math.max(1, Number(env.AI_DAILY_LIMIT) || 5);
    const token = (request.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
    if (!token && env.SUPABASE_URL && env.SUPABASE_KEY && (await inviteGateOn(env.SUPABASE_URL, env.SUPABASE_KEY))) {
      return json(
        { error: "This test is invite-only. Please sign in to ask a question.", code: "signed_out" },
        401,
        cors
      );
    }
    if (token && env.SUPABASE_URL && env.SUPABASE_KEY) {
      quota = makeAccountQuota(env.SUPABASE_URL, env.SUPABASE_KEY, token, accountDay(request.headers.get("X-Timezone")));
      const check = await quota.used();
      if (check === "signed_out") {
        return json({ error: "Please sign in again to keep asking.", code: "signed_out" }, 401, cors);
      }
      if (check === "unavailable") {
        return json({ error: "Something went wrong. Please try again." }, 503, cors);
      }
      used = check;
      if (used >= limit) {
        return json(
          {
            error: `That's all ${limit} of today's questions. You get ${limit} more tomorrow.`,
            code: "daily_limit",
            remaining: 0,
          },
          429,
          cors
        );
      }
    }

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 2, timeout: 60_000 });
    try {
      const response = await client.messages.create({
        model: env.MODEL || DEFAULT_MODEL,
        max_tokens: 4000,
        output_config: { effort: "medium" },
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        messages: buildMessages(ask),
      });

      if (response.stop_reason === "refusal") {
        return json(
          {
            answer:
              "I'm not able to help with that one here. If it's weighing on you, it could be a good conversation to have with a pastor or someone you trust.",
          },
          200,
          cors
        );
      }

      const answer = response.content
        .flatMap((block) => (block.type === "text" ? [block.text] : []))
        .join("\n\n")
        .trim();
      if (!answer) return json({ error: "No answer came back. Please try again." }, 502, cors);
      if (quota) {
        // Counted only once an answer comes back, so a failed request never costs a question.
        const count = await quota.record();
        const remaining = Math.max(0, limit - (typeof count === "number" ? count : used + 1));
        return json({ answer, remaining }, 200, cors);
      }
      return json({ answer }, 200, cors);
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) {
        return json({ error: "The study companion is busy right now. Please try again shortly." }, 429, cors);
      }
      if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
        console.error("Anthropic credentials problem", err.status);
        return json({ error: "The study companion isn't set up correctly yet." }, 503, cors);
      }
      if (err instanceof Anthropic.APIError) {
        console.error("Anthropic API error", err.status, err.message);
      } else {
        console.error("Unexpected error", err);
      }
      return json({ error: "Something went wrong. Please try again." }, 502, cors);
    }
  },
};

/** One short hint for a Study journal step. Never counted toward the daily questions. */
async function handleHint(request: Request, env: Env, cors: Record<string, string>): Promise<Response> {
  let hint: ValidHint;
  try {
    hint = validateHint((await request.json()) as Parameters<typeof validateHint>[0]);
  } catch (err) {
    const message = err instanceof BadRequest ? err.message : "That request couldn't be read.";
    return json({ error: message }, 400, cors);
  }

  const notReader = await requireReader(request, env, cors, "get hints");
  if (notReader) return notReader;

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 2, timeout: 30_000 });
  try {
    const response = await client.messages.create({
      model: env.MODEL || DEFAULT_MODEL,
      max_tokens: 600,
      output_config: { effort: "low" },
      system: [{ type: "text", text: HINT_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: buildHintMessage(hint) }],
    });
    const text = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("\n\n")
      .trim();
    if (response.stop_reason === "refusal" || !text) {
      return json({ error: "No hint came back. Try the questions above instead." }, 502, cors);
    }
    return json({ hint: text }, 200, cors);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return json({ error: "The study companion is busy right now. Please try again shortly." }, 429, cors);
    }
    console.error("Hint error", err instanceof Anthropic.APIError ? err.status : err);
    return json({ error: "Something went wrong. Please try again." }, 502, cors);
  }
}

/**
 * Hints and reflections are for signed-in readers (and, while the test is invite-only, invited
 * ones). Returns a response to send back when the reader can't go on, or null when they can.
 */
async function requireReader(
  request: Request,
  env: Env,
  cors: Record<string, string>,
  what: string
): Promise<Response | null> {
  if (!env.SUPABASE_URL || !env.SUPABASE_KEY) return null;
  const token = (request.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return json({ error: `Please sign in to ${what}.`, code: "signed_out" }, 401, cors);
  const check = await makeAccountQuota(
    env.SUPABASE_URL,
    env.SUPABASE_KEY,
    token,
    accountDay(request.headers.get("X-Timezone"))
  ).used();
  if (check === "signed_out") return json({ error: `Please sign in again to ${what}.`, code: "signed_out" }, 401, cors);
  if (check === "unavailable") return json({ error: "Something went wrong. Please try again." }, 503, cors);
  return null;
}

/** Reflect with AI on what the reader wrote. Never counted toward the daily questions. */
async function handleReflect(request: Request, env: Env, cors: Record<string, string>): Promise<Response> {
  let reflect: ValidReflect;
  try {
    reflect = validateReflect((await request.json()) as Parameters<typeof validateReflect>[0]);
  } catch (err) {
    const message = err instanceof BadRequest ? err.message : "That request couldn't be read.";
    return json({ error: message }, 400, cors);
  }
  const notReader = await requireReader(request, env, cors, "reflect with AI");
  if (notReader) return notReader;

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 2, timeout: 45_000 });
  try {
    const response = await client.messages.create(reflectRequest(reflect, env.MODEL || DEFAULT_MODEL));
    const text = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("\n\n")
      .trim();
    if (response.stop_reason === "refusal" || !text) {
      return json({ error: "No reflection came back. Please try again." }, 502, cors);
    }
    return json({ reflection: text }, 200, cors);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return json({ error: "The study companion is busy right now. Please try again shortly." }, 429, cors);
    }
    console.error("Reflect error", err instanceof Anthropic.APIError ? err.status : err);
    return json({ error: "Something went wrong. Please try again." }, 502, cors);
  }
}

/** The Claude request for a reflection (shared with scripts/test-reflect.mjs). */
export function reflectRequest(reflect: ValidReflect, model: string): Anthropic.MessageCreateParamsNonStreaming {
  return {
    model,
    max_tokens: 1200,
    output_config: { effort: "low" },
    system: [{ type: "text", text: REFLECT_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: buildReflectMessage(reflect) }],
  };
}
