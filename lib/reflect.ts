/**
 * Reflect with AI: one short, Scripture-first response to what a reader wrote in a guided study
 * day or a SOAP study. It runs only when they tap, because it sends their private writing to the
 * AI. Plain helpers (no React, no Supabase) so they can be tested.
 */

/**
 * Reflections a reader can ask for on one study or one plan day. They never use the daily Ask AI
 * questions. The second is only offered once their writing has changed since the first.
 */
export const REFLECTIONS_PER_ITEM = 2;

/** A reflection kept with the writing it answered, so reopening never calls the AI again. */
export interface Reflection {
  text: string;
  at: number;
  /** A short fingerprint of the writing it answered (never the writing itself). */
  basis: string;
}

/** A plan day's reflection, synced in user_data under planReflections["plan-id/day"]. */
export interface PlanReflection extends Reflection {
  used: number;
  updatedAt: number;
}

export interface ReflectAnswer {
  /** The question or step the reader answered, e.g. "Observation: What do you notice?". */
  prompt: string;
  text: string;
}

export function planReflectionId(planId: string, day: number) {
  return `${planId}/${day}`;
}

/** djb2 over the answers, so we can tell whether the writing changed without storing it twice. */
export function writingFingerprint(answers: ReflectAnswer[]): string {
  const joined = answers.map((a) => a.text.trim()).join("␞");
  let h = 5381;
  for (let i = 0; i < joined.length; i++) h = ((h << 5) + h + joined.charCodeAt(i)) | 0;
  return `${joined.length.toString(36)}-${(h >>> 0).toString(36)}`;
}

export function hasWriting(answers: ReflectAnswer[]): boolean {
  return answers.some((a) => a.text.trim().length > 0);
}

export type ReflectState =
  /** Nothing written yet. */
  | "empty"
  /** Can ask (first time, or the writing changed and one is left). */
  | "ready"
  /** Has a reflection on exactly this writing. */
  | "current"
  /** Writing changed, but both reflections are used. */
  | "used_up";

export function reflectState(answers: ReflectAnswer[], saved: Reflection | undefined, used: number): ReflectState {
  if (!hasWriting(answers)) return saved ? "current" : "empty";
  if (!saved) return used < REFLECTIONS_PER_ITEM ? "ready" : "used_up";
  if (saved.basis === writingFingerprint(answers)) return "current";
  return used < REFLECTIONS_PER_ITEM ? "ready" : "used_up";
}
