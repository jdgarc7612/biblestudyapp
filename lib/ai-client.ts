import { AI_ENDPOINT, isLiveAiConfigured } from "./ai-config";
import type { TranslationId } from "./bible-types";
import { generateMockAnswer, VerseContext } from "./mock-ai";
import { getSupabase } from "./supabase";

export interface AskHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface AskRequest {
  question: string;
  context?: VerseContext;
  translation: TranslationId;
  history: AskHistoryItem[];
}

export type AskResult =
  /** remaining: today's free questions left on the account (signed-in readers only). */
  | { ok: true; answer: string; live: boolean; remaining?: number }
  | { ok: false; message: string; limitReached?: boolean };

/** Signed-in readers send their sign-in, so the daily limit follows the account. */
async function accountHeaders(): Promise<Record<string, string>> {
  const supabase = getSupabase();
  if (!supabase) return {};
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return {};
  let timeZone = "";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    // Leave it to the server (UTC).
  }
  return { Authorization: `Bearer ${token}`, ...(timeZone ? { "X-Timezone": timeZone } : {}) };
}

const TIMEOUT_MS = 45_000;
const HISTORY_LIMIT = 8;

/**
 * Asks the study companion. Uses the live endpoint when one is configured,
 * otherwise falls back to the built-in offline answers.
 */
export async function askStudyCompanion(req: AskRequest): Promise<AskResult> {
  if (!isLiveAiConfigured) {
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    return { ok: true, answer: generateMockAnswer(req.question, req.context), live: false };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${AI_ENDPOINT}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await accountHeaders()) },
      body: JSON.stringify({
        question: req.question,
        verse: req.context ? { reference: req.context.reference, text: req.context.text } : null,
        translation: req.translation,
        history: req.history.slice(-HISTORY_LIMIT),
      }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => ({}))) as {
      answer?: string;
      error?: string;
      code?: string;
      remaining?: number;
    };
    if (res.ok && data.answer) {
      return {
        ok: true,
        answer: data.answer,
        live: true,
        remaining: typeof data.remaining === "number" ? data.remaining : undefined,
      };
    }
    return {
      ok: false,
      message: data.error ?? "I couldn't get an answer just now. Please try again in a moment.",
      limitReached: data.code === "daily_limit",
    };
  } catch {
    return {
      ok: false,
      message: controller.signal.aborted
        ? "That took too long to answer. Please try again."
        : "I couldn't reach the study companion. Check your connection and try again.",
    };
  } finally {
    clearTimeout(timer);
  }
}

export interface HintRequest {
  step: "scripture" | "observation" | "application" | "prayer";
  reference: string;
  text: string;
  translation: TranslationId;
  /** What the reader has written on this step so far. */
  draft: string;
}

export type HintResult =
  | { ok: true; hint: string; live: boolean }
  | { ok: false; message: string; signedOut?: boolean };

/**
 * A short hint for one step of a Study journal entry. Never counts toward the daily questions.
 * Without a live endpoint it returns nothing from the AI (the screen shows its own questions).
 */
export async function getStudyHint(req: HintRequest): Promise<HintResult> {
  if (!isLiveAiConfigured) {
    await new Promise((r) => setTimeout(r, 500));
    return {
      ok: true,
      live: false,
      hint: `Look again at ${req.reference}. Which words would you underline, and why do you think they're there?`,
    };
  }
  const headers = await accountHeaders();
  if (!headers.Authorization) return { ok: false, message: "Sign in to get hints on this passage.", signedOut: true };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(`${AI_ENDPOINT}/hint`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        method: "soap",
        step: req.step,
        verse: { reference: req.reference, text: req.text },
        translation: req.translation,
        draft: req.draft,
      }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => ({}))) as { hint?: string; error?: string; code?: string };
    if (res.ok && data.hint) return { ok: true, hint: data.hint, live: true };
    return {
      ok: false,
      message: data.error ?? "I couldn't get a hint just now. Please try again.",
      signedOut: data.code === "signed_out",
    };
  } catch {
    return { ok: false, message: "I couldn't reach the study companion. Check your connection and try again." };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Tells the account that a study was finished today, which adds one Ask AI question for the day
 * (supabase/study-bonus.sql). Safe to call more than once a day. Guests keep the bonus on the device.
 */
export async function claimStudyBonus(day: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  const { data } = await supabase.auth.getSession();
  if (!data.session) return;
  try {
    await supabase.rpc("claim_study_bonus", { p_day: day });
  } catch {
    // The day's bonus still shows on this device; the account just won't count it.
  }
}
