import type { TranslationId } from "./bible-types";
import verses from "../data/bible/verse-of-the-day.json";

export interface DailyVerse {
  book: string;
  chapter: number;
  start: number;
  end: number;
  reference: string;
  text: Record<TranslationId, string>;
}

const LIST = verses as DailyVerse[];

// Stepping by a number that shares no factor with the list length visits every
// verse once before repeating, while jumping around the Bible day to day instead
// of walking through it in order.
const STEP = 157;

/** Whole days since 1 Jan 1970 for the user's local calendar date. */
function localDayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}

/** The verse for the user's local day. Everyone sees the same verse on the same date. */
export function getVerseOfTheDay(date: Date = new Date()): DailyVerse {
  const day = localDayNumber(date);
  const index = (((day * STEP) % LIST.length) + LIST.length) % LIST.length;
  return LIST[index];
}
