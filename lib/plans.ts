import { STUDY_PLANS, type PlanDay, type PlanReading, type StudyPlan } from "../data/study/plans";
import type { PlanAnswer, PlanProgress } from "../store/useAppStore";
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

/** The key for an answer: "romans-7-days/3/1" (day and question count from 1). */
export function planAnswerId(planId: string, day: number, question: number) {
  return `${planId}/${day}/${question}`;
}

export interface PlanAnswerEntry {
  id: string;
  plan: StudyPlan;
  day: number;
  question: string;
  text: string;
  updatedAt: number;
  /** The day's first reading, for sorting with verse notes in Bible order. */
  reading: PlanReading;
}

/** Every answer with text, newest first. */
export function listPlanAnswers(answers: Record<string, PlanAnswer>): PlanAnswerEntry[] {
  const out: PlanAnswerEntry[] = [];
  for (const [id, answer] of Object.entries(answers)) {
    if (!answer.text) continue;
    const [planId, dayStr, qStr] = id.split("/");
    const plan = getPlan(planId);
    const day = plan?.days[Number(dayStr) - 1];
    const question = day?.questions[Number(qStr) - 1];
    if (!plan || !day || !question) continue;
    out.push({ id, plan, day: Number(dayStr), question, text: answer.text, updatedAt: answer.updatedAt, reading: day.readings[0] });
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * One new day per calendar day: a day can be opened once it's done (to reread and edit answers),
 * and the next day opens unless a day was already finished today. Missed days don't count
 * against anyone; the next day just waits.
 */
export function isDayOpen(plan: StudyPlan, progress: PlanProgress | undefined, day: number, today: string) {
  if (progress?.done[day]) return true;
  return day === nextDay(plan, progress) && !finishedADayOn(progress, today);
}
