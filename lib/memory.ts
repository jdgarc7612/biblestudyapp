/**
 * Memory verses: the card model and the pure rules behind adding, scheduling, practicing and
 * migrating them. No React or storage here, so it can be unit tested (tests/memory.test.ts).
 */
import { localDateString } from "./date";
import {
  dueDateOf,
  isDueSrs,
  isNewSrs,
  isSecureSrs,
  localMidnight,
  newSrs,
  scheduleAll,
  SrsStateId,
  type Grade,
  type MemorySrs,
} from "./srs";

export type MemoryMethod =
  | "smart"
  | "flashcard"
  | "blanks"
  | "firstLetter"
  | "type"
  | "listen"
  | "recite"
  | "reference"
  /** Scrambled words or phrases, put back in order. */
  | "wordOrder"
  /** A passage of three or more verses, one join at a time, then the whole. */
  | "stitch";
/** What a recall exercise actually ran as. "learn" is the guided first sitting. */
export type RecallMethod = Exclude<MemoryMethod, "smart"> | "learn";
export type SessionKind = "review" | "practice";

export interface MemoryLogEntry {
  /** ISO timestamp. */
  at: string;
  grade: Grade;
  method: RecallMethod;
  kind: SessionKind | "learn";
  /** 0..1 when the exercise measured it (self-graded flashcards don't). */
  accuracy?: number;
  /** Whether this grade changed the schedule (practice Good/Easy doesn't). */
  scheduled: boolean;
  before: { state: number; due: string; stability: number };
  after: { state: number; due: string; stability: number };
}

export interface MemoryCard {
  /** verseRangeId, e.g. "john-3-16-16" (no translation in the id). */
  id: string;
  verseReference: string;
  verseText: string;
  translation: string;
  dateAdded: string;
  book: string;
  chapter: number;
  start: number;
  end: number;
  srs: MemorySrs;
  /** Built-in pack ids ("pack-peace") and the person's own lists ("list-..."). */
  collections: string[];
  /** Recent grades, newest last, capped at MEMORY_LOG_CAP. */
  log: MemoryLogEntry[];
  /** Local date the card was first learned. */
  learnedOn?: string;
  /** Last change to this card on any device (ms); sync keeps the newer copy. */
  updatedAt: number;

  // Kept in step with `srs` so an older copy of the app reading a synced deck still works.
  /** Local date the card is due. */
  dueDate: string;
  /** Last graded review (ISO timestamp), or null. */
  lastReviewed: string | null;
  interval: number;
  repetitions: number;
  easeFactor: number;
}

export interface NewMemoryCard {
  id: string;
  verseReference: string;
  verseText: string;
  translation: string;
  collections?: string[];
}

/** A list the person named themselves. A deleted list is kept (deleted: true) so sync doesn't revive it. */
export interface MemoryList {
  name: string;
  createdAt: number;
  updatedAt: number;
  deleted?: boolean;
}

export const MEMORY_LOG_CAP = 40;
/** New verses a Review session introduces per day. */
export const DAILY_NEW_CARD_CAP = 5;

export function parseCardId(id: string): { book: string; chapter: number; start: number; end: number } | null {
  const parts = id.split("-");
  if (parts.length !== 4) return null;
  const [book, chapter, start, end] = parts;
  const nums = [chapter, start, end].map(Number);
  if (!book || nums.some((n) => !Number.isInteger(n) || n < 1)) return null;
  return { book, chapter: nums[0], start: nums[1], end: nums[2] };
}

function withMirrors(card: MemoryCard): MemoryCard {
  return {
    ...card,
    dueDate: dueDateOf(card.srs),
    lastReviewed: card.srs.last_review,
    interval: card.srs.scheduled_days,
    repetitions: card.srs.reps,
  };
}

// ---------------------------------------------------------------------------
// Migration from the SM-2 cards (persist version 1)

type LegacyCard = Partial<MemoryCard> & {
  id: string;
  interval?: number;
  easeFactor?: number;
  repetitions?: number;
  dueDate?: string;
  lastReviewed?: string | null;
};

/** A "YYYY-MM-DD" date or a full timestamp, as a Date (date-only means local noon). */
function parseLooseDate(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const d = localMidnight(value);
    d.setHours(12);
    return d;
  }
  return new Date(value);
}

/**
 * Brings any card up to the current shape. Old SM-2 cards get an FSRS state seeded from what
 * they had, so nothing goes back to New: reviewed cards enter Review with stability ~ their
 * interval, difficulty from the ease factor, and the same due date. Safe to run twice.
 */
export function migrateCard(raw: LegacyCard, now: Date = new Date()): MemoryCard {
  const parsed = parseCardId(raw.id);
  const place = {
    book: raw.book ?? parsed?.book ?? "",
    chapter: raw.chapter ?? parsed?.chapter ?? 0,
    start: raw.start ?? parsed?.start ?? 0,
    end: raw.end ?? parsed?.end ?? 0,
  };
  const base = {
    id: raw.id,
    verseReference: raw.verseReference ?? raw.id,
    verseText: raw.verseText ?? "",
    translation: raw.translation ?? "BSB",
    dateAdded: raw.dateAdded ?? localDateString(now),
    ...place,
    collections: Array.isArray(raw.collections) ? raw.collections : [],
    log: Array.isArray(raw.log) ? raw.log : [],
    learnedOn: raw.learnedOn,
    easeFactor: raw.easeFactor ?? 2.5,
  };

  if (raw.srs && typeof raw.srs.due === "string") {
    return withMirrors({
      ...base,
      srs: raw.srs,
      updatedAt: raw.updatedAt ?? 0,
      dueDate: "",
      lastReviewed: null,
      interval: 0,
      repetitions: 0,
    });
  }

  const repetitions = raw.repetitions ?? 0;
  const interval = raw.interval ?? 0;
  const lastReviewed = raw.lastReviewed ?? null;
  const dueDay = raw.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(raw.dueDate) ? raw.dueDate : null;

  let srs: MemorySrs;
  if (repetitions === 0 && !lastReviewed) {
    srs = newSrs(dueDay ? localMidnight(dueDay) : now);
  } else {
    const ease = raw.easeFactor ?? 2.5;
    // SM-2 ease 2.5 ~ FSRS difficulty 5; the floor of 1.3 ~ 10 (hardest).
    const difficulty = Math.min(10, Math.max(1, 5 + ((2.5 - ease) * 5) / 1.2));
    const lapsed = repetitions === 0; // SM-2 resets repetitions on a failed review
    const days = Math.max(1, interval);
    const last = lastReviewed ? parseLooseDate(lastReviewed) : now;
    srs = {
      due: (dueDay ? localMidnight(dueDay) : now).toISOString(),
      stability: lapsed ? 1 : days,
      difficulty: Math.round(difficulty * 100) / 100,
      elapsed_days: 0,
      scheduled_days: days,
      learning_steps: 0,
      reps: Math.max(1, repetitions),
      lapses: lapsed ? 1 : 0,
      state: SrsStateId.Review,
      last_review: last.toISOString(),
    };
  }
  return withMirrors({
    ...base,
    srs,
    updatedAt: raw.updatedAt ?? (lastReviewed ? parseLooseDate(lastReviewed).getTime() : 0),
    dueDate: "",
    lastReviewed: null,
    interval: 0,
    repetitions: 0,
  });
}

// ---------------------------------------------------------------------------
// Adding

export type AddResult = { deck: MemoryCard[]; added: boolean; reason?: "duplicate" | "empty" | "bad-id" };

/**
 * Adds a card unless it's already in the deck (then any new collection tags are merged in) or
 * its text is empty (BSB and WEB leave a few verses empty on purpose).
 */
export function addCard(deck: MemoryCard[], input: NewMemoryCard, now: Date = new Date()): AddResult {
  const text = input.verseText.trim();
  if (!text) return { deck, added: false, reason: "empty" };
  const place = parseCardId(input.id);
  if (!place) return { deck, added: false, reason: "bad-id" };

  const existing = deck.find((c) => c.id === input.id);
  if (existing) {
    const extra = (input.collections ?? []).filter((c) => !existing.collections.includes(c));
    if (extra.length === 0) return { deck, added: false, reason: "duplicate" };
    return {
      deck: deck.map((c) =>
        c.id === input.id ? { ...c, collections: [...c.collections, ...extra], updatedAt: now.getTime() } : c
      ),
      added: false,
      reason: "duplicate",
    };
  }

  const card = withMirrors({
    id: input.id,
    verseReference: input.verseReference,
    verseText: text,
    translation: input.translation,
    dateAdded: localDateString(now),
    ...place,
    srs: newSrs(now),
    collections: input.collections ?? [],
    log: [],
    updatedAt: now.getTime(),
    dueDate: "",
    lastReviewed: null,
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
  });
  return { deck: [...deck, card], added: true };
}

// ---------------------------------------------------------------------------
// Grading

export interface GradeOutcome {
  card: MemoryCard;
  /** Whether the schedule moved. */
  scheduled: boolean;
}

function snapshotSrs(srs: MemorySrs) {
  return { state: srs.state, due: srs.due, stability: Math.round(srs.stability * 100) / 100 };
}

/**
 * What each grade does to a card in this session, given the same `now` for all four.
 *
 * - Review, and a new card's first sitting (Learn): the FSRS result.
 * - Practice: extra rehearsal must never push a verse further out. Good and Easy only log the
 *   recall. Again sends the card back to relearning. Hard applies only when it doesn't move the
 *   due date later.
 */
export function previewOutcomes(
  card: MemoryCard,
  kind: SessionKind,
  method: RecallMethod,
  now: Date,
  accuracy?: number
): Record<Grade, GradeOutcome> {
  const next = scheduleAll(card.srs, now);
  const learning = isNewSrs(card.srs);
  const out = {} as Record<Grade, GradeOutcome>;
  for (const grade of Object.keys(next) as Grade[]) {
    let srs = next[grade];
    let scheduled = true;
    if (kind === "practice" && !learning) {
      if (grade === "good" || grade === "easy") scheduled = false;
      if (grade === "hard" && new Date(srs.due).getTime() > new Date(card.srs.due).getTime()) scheduled = false;
      if (!scheduled) srs = card.srs;
    }
    const entry: MemoryLogEntry = {
      at: now.toISOString(),
      grade,
      method,
      kind: learning ? "learn" : kind,
      ...(accuracy === undefined ? {} : { accuracy: Math.round(accuracy * 1000) / 1000 }),
      scheduled,
      before: snapshotSrs(card.srs),
      after: snapshotSrs(srs),
    };
    out[grade] = {
      scheduled,
      card: withMirrors({
        ...card,
        srs,
        log: [...card.log, entry].slice(-MEMORY_LOG_CAP),
        learnedOn: card.learnedOn ?? (learning ? localDateString(now) : undefined),
        updatedAt: now.getTime(),
      }),
    };
  }
  return out;
}

// ---------------------------------------------------------------------------
// Status, sorting and sessions

export type CardStatus = "new" | "due" | "learning" | "secure" | "growing";

export function cardStatus(card: MemoryCard, now: Date = new Date()): CardStatus {
  if (isNewSrs(card.srs)) return "new";
  if (isDueSrs(card.srs, now)) return "due";
  if (card.srs.state === SrsStateId.Learning || card.srs.state === SrsStateId.Relearning) return "learning";
  if (isSecureSrs(card.srs)) return "secure";
  return "growing";
}

export const isDue = (card: MemoryCard, now: Date = new Date()) => isDueSrs(card.srs, now);
export const isNew = (card: MemoryCard) => isNewSrs(card.srs);
export const isSecure = (card: MemoryCard) => isSecureSrs(card.srs);

const STATUS_ORDER: Record<CardStatus, number> = { due: 0, learning: 1, new: 2, growing: 3, secure: 4 };

/** Due first, then learning, then new, then the rest (soonest first). */
export function sortDeck(deck: MemoryCard[], now: Date = new Date()): MemoryCard[] {
  return [...deck].sort((a, b) => {
    const sa = STATUS_ORDER[cardStatus(a, now)];
    const sb = STATUS_ORDER[cardStatus(b, now)];
    if (sa !== sb) return sa - sb;
    if (sa === STATUS_ORDER.new) return a.dateAdded.localeCompare(b.dateAdded);
    return a.srs.due.localeCompare(b.srs.due);
  });
}

export function newLearnedToday(deck: MemoryCard[], now: Date = new Date()): number {
  const today = localDateString(now);
  return deck.filter((c) => c.learnedOn === today).length;
}

export function newRemainingToday(deck: MemoryCard[], now: Date = new Date()): number {
  const room = Math.max(0, DAILY_NEW_CARD_CAP - newLearnedToday(deck, now));
  return Math.min(room, deck.filter(isNew).length);
}

/**
 * Today's Review queue: every due card (most overdue first) plus up to today's new-card
 * allowance, with the new ones spread through the due ones rather than all at the start.
 */
export function buildReviewQueue(deck: MemoryCard[], now: Date = new Date()): string[] {
  const due = deck.filter((c) => isDue(c, now)).sort((a, b) => a.srs.due.localeCompare(b.srs.due));
  const fresh = deck
    .filter(isNew)
    .sort((a, b) => a.dateAdded.localeCompare(b.dateAdded))
    .slice(0, newRemainingToday(deck, now));
  if (fresh.length === 0) return due.map((c) => c.id);
  const gap = Math.max(1, Math.floor(due.length / (fresh.length + 1)));
  const out: string[] = [];
  let f = 0;
  due.forEach((card, i) => {
    out.push(card.id);
    if ((i + 1) % gap === 0 && f < fresh.length) out.push(fresh[f++].id);
  });
  while (f < fresh.length) out.push(fresh[f++].id);
  return out;
}

/** How many verses a card spans. */
export const verseSpan = (card: Pick<MemoryCard, "start" | "end">) => Math.max(1, card.end - card.start + 1);

/** Passages this long can be practiced in order, one join at a time. */
export const STITCH_MIN_VERSES = 3;

export const canStitch = (card: Pick<MemoryCard, "start" | "end">) => verseSpan(card) >= STITCH_MIN_VERSES;

/**
 * How Smart picks a method for a card it isn't introducing for the first time.
 * `passageWarm`: verses of this passage were already practiced in this sitting, so a long
 * passage is put together join by join.
 */
export function smartMethod(card: MemoryCard, opts: { passageWarm?: boolean } = {}): Exclude<MemoryMethod, "smart"> {
  if (opts.passageWarm && canStitch(card)) return "stitch";
  const last = card.log[card.log.length - 1];
  const weak = last ? last.grade === "again" || last.grade === "hard" || (last.accuracy ?? 1) < 0.9 : false;
  if (card.srs.state === SrsStateId.Relearning || weak) return "blanks";
  if (card.srs.state === SrsStateId.Learning || card.srs.scheduled_days < 7) return "firstLetter";
  // Now and then, a verse that's strong on wording is asked for its address instead.
  const recentReference = card.log.slice(-3).some((e) => e.method === "reference");
  if (card.srs.scheduled_days >= 14 && !recentReference && card.srs.reps % 3 === 0) return "reference";
  // Now and then, a mid-strength verse is put back in order: a lighter change of pace.
  const recentOrder = card.log.slice(-3).some((e) => e.method === "wordOrder");
  if (card.srs.scheduled_days < 21 && !recentOrder && card.srs.reps % 4 === 1) return "wordOrder";
  if (card.srs.scheduled_days < 21) return "flashcard";
  return "type";
}

// ---------------------------------------------------------------------------
// Long passages: the whole and its verses

/**
 * The single-verse cards inside a passage card (same book and chapter, within its range), in
 * verse order. Grouping comes from the ids, so a reader range and a pack work the same way.
 */
export function passageMembers(whole: MemoryCard, deck: MemoryCard[]): MemoryCard[] {
  if (!canStitch(whole)) return [];
  return deck
    .filter(
      (c) =>
        c.id !== whole.id &&
        c.book === whole.book &&
        c.chapter === whole.chapter &&
        c.start === c.end &&
        c.start >= whole.start &&
        c.end <= whole.end
    )
    .sort((a, b) => a.start - b.start);
}

/** A passage session: its verses in order, then the whole passage. */
export function passageOrder(wholeId: string, deck: MemoryCard[]): string[] {
  const whole = deck.find((c) => c.id === wholeId);
  if (!whole) return [];
  return [...passageMembers(whole, deck).map((c) => c.id), whole.id];
}

/**
 * Reorders a session queue so a long passage reads as one work: wherever any of its verses or
 * the whole passage appear, they're gathered at the first one's place, verses in order and the
 * whole passage last. Everything else keeps its order. No ids are added or dropped.
 */
export function stitchOrder(queue: string[], deck: MemoryCard[]): string[] {
  const byId = new Map(deck.map((c) => [c.id, c]));
  const inQueue = new Set(queue);
  const placed = new Set<string>();
  const groupAt = new Map<string, string[]>();
  const wholes = queue.map((id) => byId.get(id)).filter((c): c is MemoryCard => !!c && canStitch(c));
  // Wholes whose verses are queued but which aren't due themselves still group those verses.
  for (const card of deck) if (canStitch(card) && !inQueue.has(card.id)) wholes.push(card);
  for (const whole of wholes) {
    const members = passageMembers(whole, deck).filter((c) => inQueue.has(c.id) && !placed.has(c.id));
    const group = [...members.map((c) => c.id), ...(inQueue.has(whole.id) && !placed.has(whole.id) ? [whole.id] : [])];
    if (group.length < 2) continue;
    const first = queue.find((id) => group.includes(id))!;
    groupAt.set(first, group);
    group.forEach((id) => placed.add(id));
  }
  const out: string[] = [];
  for (const id of queue) {
    const group = groupAt.get(id);
    if (group) out.push(...group);
    else if (!placed.has(id)) out.push(id);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Progress and reminders

export interface DeckSummary {
  due: number;
  learning: number;
  secure: number;
  new: number;
}

/** Counts for the progress view. Learning covers everything on its way to Secure. */
export function deckSummary(deck: MemoryCard[], now: Date = new Date()): DeckSummary {
  const out: DeckSummary = { due: 0, learning: 0, secure: 0, new: 0 };
  for (const card of deck) {
    const status = cardStatus(card, now);
    if (status === "due") out.due++;
    else if (status === "new") out.new++;
    else if (status === "secure") out.secure++;
    else out.learning++;
  }
  return out;
}

/** The last `days` local dates (oldest first) with how many recalls were graded on each. */
export function practiceDays(deck: MemoryCard[], days = 7, now: Date = new Date()): { date: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const card of deck) {
    for (const entry of card.log) {
      const date = localDateString(new Date(entry.at));
      counts.set(date, (counts.get(date) ?? 0) + 1);
    }
  }
  const out: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const date = localDateString(d);
    out.push({ date, count: counts.get(date) ?? 0 });
  }
  return out;
}

/**
 * How many due verses to remind about on Home today: 0 once a Review session has been finished
 * today (a verse missed in it comes back later without another nudge) or the reminder was put
 * away for today.
 */
export function reviewNudgeCount(
  deck: MemoryCard[],
  reviewDoneDate: string | null | undefined,
  dismissedDate: string | null | undefined,
  now: Date = new Date()
): number {
  const today = localDateString(now);
  if (reviewDoneDate === today || dismissedDate === today) return 0;
  return deck.filter((c) => isDue(c, now)).length;
}

/**
 * When to send phone reminders over the next `days` days: at the chosen time on each day that
 * has verses due, skipping today once Review is done and any time already past.
 */
export function reminderDates(
  deck: MemoryCard[],
  opts: { hour: number; minute: number; reviewDoneDate?: string | null; days?: number },
  now: Date = new Date()
): Date[] {
  const today = localDateString(now);
  const dueDays = deck.filter((c) => !isNew(c)).map((c) => dueDateOf(c.srs));
  const out: Date[] = [];
  for (let i = 0; i < (opts.days ?? 7); i++) {
    const at = new Date(now);
    at.setDate(at.getDate() + i);
    at.setHours(opts.hour, opts.minute, 0, 0);
    const day = localDateString(at);
    if (at.getTime() <= now.getTime()) continue;
    if (day === today && opts.reviewDoneDate === today) continue;
    if (!dueDays.some((d) => d <= day)) continue;
    out.push(at);
  }
  return out;
}

/**
 * A Review session earns the perfect-recall bonus when every graded recall was Good or Easy
 * and, where accuracy was measured, at least 98%.
 */
export function isPerfectSession(entries: { grade: Grade; accuracy?: number }[]): boolean {
  return (
    entries.length > 0 &&
    entries.every((e) => (e.grade === "good" || e.grade === "easy") && (e.accuracy === undefined || e.accuracy >= 0.98))
  );
}

// ---------------------------------------------------------------------------
// Sync

/**
 * The more recently changed copy of a card (both normalized first). Its schedule and log win;
 * list and pack tags from both copies are kept, so a tag added on the other device stays.
 */
export function pickNewerCard(a: MemoryCard, b: MemoryCard): MemoryCard {
  const newer = newerCopy(a, b);
  const older = newer === a ? b : a;
  const extra = older.collections.filter((c) => !newer.collections.includes(c));
  return extra.length ? { ...newer, collections: [...newer.collections, ...extra] } : newer;
}

function newerCopy(a: MemoryCard, b: MemoryCard): MemoryCard {
  if (a.updatedAt !== b.updatedAt) return a.updatedAt > b.updatedAt ? a : b;
  const ra = a.srs.last_review ?? "";
  const rb = b.srs.last_review ?? "";
  if (ra !== rb) return ra > rb ? a : b;
  return b.srs.reps > a.srs.reps ? b : a;
}

export function mergeLists(
  a: Record<string, MemoryList> = {},
  b: Record<string, MemoryList> = {}
): Record<string, MemoryList> {
  const out = { ...b };
  for (const [id, list] of Object.entries(a)) {
    if (!out[id] || list.updatedAt > out[id].updatedAt) out[id] = list;
  }
  return out;
}
