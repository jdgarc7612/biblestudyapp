/**
 * Memory scheduling: FSRS through the MIT-licensed ts-fsrs package.
 *
 * ts-fsrs 5.4.2 (pinned in package.json) runs FSRS-6 with its default weights. Settings:
 * 90% desired retention, fuzz on so intervals spread a little, and at most 365 days between
 * reviews so Bible wording is refreshed at least yearly.
 *
 * The person still grades with Again / Hard / Good / Easy. Calendar days ("due today") always
 * use the device's local date (lib/date.ts), never the UTC date.
 */
import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card,
  type Grade as FsrsGrade,
} from "ts-fsrs";

import { localDateString } from "./date";

export type Grade = "again" | "hard" | "good" | "easy";
export const GRADES: Grade[] = ["again", "hard", "good", "easy"];

/** FSRS card states, stored as numbers: 0 New, 1 Learning, 2 Review, 3 Relearning. */
export const SrsStateId = { New: 0, Learning: 1, Review: 2, Relearning: 3 } as const;

/** One card's FSRS state, as it is saved and synced (dates as ISO strings). */
export interface MemorySrs {
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number;
  /** Full timestamp of the last graded review, or null for a new card. */
  last_review: string | null;
}

const RATING: Record<Grade, FsrsGrade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

export const DESIRED_RETENTION = 0.9;
export const MAXIMUM_INTERVAL_DAYS = 365;

const scheduler = fsrs(
  generatorParameters({
    request_retention: DESIRED_RETENTION,
    enable_fuzz: true,
    maximum_interval: MAXIMUM_INTERVAL_DAYS,
  })
);

function toFsrs(srs: MemorySrs): Card {
  return {
    due: new Date(srs.due),
    stability: srs.stability,
    difficulty: srs.difficulty,
    elapsed_days: srs.elapsed_days,
    scheduled_days: srs.scheduled_days,
    learning_steps: srs.learning_steps,
    reps: srs.reps,
    lapses: srs.lapses,
    state: srs.state as State,
    last_review: srs.last_review ? new Date(srs.last_review) : undefined,
  };
}

function fromFsrs(card: Card): MemorySrs {
  return {
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    learning_steps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.last_review ? card.last_review.toISOString() : null,
  };
}

export function newSrs(now: Date = new Date()): MemorySrs {
  return fromFsrs(createEmptyCard(now));
}

/** What each grade would do to a card right now. */
export function scheduleAll(srs: MemorySrs, now: Date): Record<Grade, MemorySrs> {
  const preview = scheduler.repeat(toFsrs(srs), now);
  const out = {} as Record<Grade, MemorySrs>;
  for (const grade of GRADES) out[grade] = fromFsrs(preview[RATING[grade]].card);
  return out;
}

// ---------------------------------------------------------------------------
// Calendar days (always the device's local date)

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Local midnight at the start of a "YYYY-MM-DD" date. */
export function localMidnight(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** The local calendar date a card is due. */
export function dueDateOf(srs: MemorySrs): string {
  return localDateString(new Date(srs.due));
}

export function isNewSrs(srs: MemorySrs): boolean {
  return srs.state === SrsStateId.New;
}

/** Due today or earlier, by the local calendar. New cards are never "due"; they're new. */
export function isDueSrs(srs: MemorySrs, now: Date = new Date()): boolean {
  return !isNewSrs(srs) && dueDateOf(srs) <= localDateString(now);
}

export function daysUntil(srs: MemorySrs, now: Date = new Date()): number {
  const due = localMidnight(dueDateOf(srs));
  const today = localMidnight(localDateString(now));
  return Math.round((due.getTime() - today.getTime()) / 86400000);
}

/**
 * "Secure for now": in the Review state, at most two lapses, and the next review is three
 * weeks or more away. It doesn't mean never forgotten.
 */
export function isSecureSrs(srs: MemorySrs): boolean {
  return srs.state === SrsStateId.Review && srs.lapses <= 2 && srs.scheduled_days >= 21;
}

/** "10m", "1d", "3w", "4mo": how long until the given due time. */
export function formatWait(fromNow: Date, due: string): string {
  const minutes = Math.max(0, Math.round((new Date(due).getTime() - fromNow.getTime()) / 60000));
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  if (minutes < 60 * 20) return `${Math.round(minutes / 60)}h`;
  const days = Math.max(1, Math.round(minutes / 1440));
  if (days < 14) return `${days}d`;
  if (days < 60) return `${Math.round(days / 7)}w`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${Math.round(days / 365)}y`;
}

/** The same wait spelled out for screen readers: "10 minutes", "3 days". */
export function formatWaitSpoken(fromNow: Date, due: string): string {
  const short = formatWait(fromNow, due);
  const n = parseInt(short, 10);
  const unit = short.replace(String(n), "");
  const words: Record<string, string> = { m: "minute", h: "hour", d: "day", w: "week", mo: "month", y: "year" };
  const word = words[unit] ?? "day";
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}
