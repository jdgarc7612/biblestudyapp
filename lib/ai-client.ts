import { AI_ENDPOINT, isLiveAiConfigured } from "./ai-config";
import type { TranslationId } from "./bible-types";
import { generateMockAnswer, VerseContext } from "./mock-ai";

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
  | { ok: true; answer: string; live: boolean }
  | { ok: false; message: string };

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: req.question,
        verse: req.context ? { reference: req.context.reference, text: req.context.text } : null,
        translation: req.translation,
        history: req.history.slice(-HISTORY_LIMIT),
      }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => ({}))) as { answer?: string; error?: string };
    if (res.ok && data.answer) return { ok: true, answer: data.answer, live: true };
    return {
      ok: false,
      message: data.error ?? "I couldn't get an answer just now. Please try again in a moment.",
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
