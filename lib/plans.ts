import { STUDY_PLANS, type PlanDay, type PlanReading, type StudyPlan } from "../data/study/plans";
import type { PlanProgress } from "../store/useAppStore";
import { chapterTitle, formatReference, getBook } from "./bible";

export type { PlanDay, PlanReading, StudyPlan };
export { STUDY_PLANS };

const PLANS_BY_ID = new Map(STUDY_PLANS.map((p) => [p.id, p]));

export function getPlan(id: string | null | undefined): StudyPlan | undefined {
  return id ? PLANS_BY_ID.get(id) : undefined;
}

/** "John 3:1-21", "Psalm 23" or "Romans 9–11". */
export function readingsLabel(readings: PlanReading[]): string {
  const first = readings[0];
  const book = getBook(first.book);
  if (!book) return "";
  if (readings.length === 1) return readingLabel(first);
  const last = readings[readings.length - 1];
  const sameBook = readings.every((r) => r.book === first.book && r.start == null);
  if (sameBook) return `${chapterTitle(book.name, first.chapter)}–${last.chapter}`;
  return readings.map(readingLabel).join("; ");
}

export function readingLabel(r: PlanReading): string {
  const book = getBook(r.book);
  if (!book) return "";
  return r.start == null ? chapterTitle(book.name, r.chapter) : formatReference(book.name, r.chapter, r.start, r.end ?? r.start);
}

/** Days done, as day numbers from 1. */
export function doneDays(progress: PlanProgress | undefined): number[] {
  return progress ? Object.keys(progress.done).map(Number).sort((a, b) => a - b) : [];
}

/** The first day not yet done (1-based), or null once every day is done. */
export function nextDay(plan: StudyPlan, progress: PlanProgress | undefined): number | null {
  for (let d = 1; d <= plan.days.length; d++) if (!progress?.done[d]) return d;
  return null;
}

/** True when a day of this plan was marked done on `today`. */
export function finishedADayOn(progress: PlanProgress | undefined, today: string) {
  return !!progress && Object.values(progress.done).includes(today);
}
