// Run with `npm test` (TZ is pinned to America/Chicago so the local-date checks mean something).
import test from "node:test";
import assert from "node:assert/strict";

import { localDateString } from "../lib/date";
import {
  addCard,
  buildReviewQueue,
  cardStatus,
  DAILY_NEW_CARD_CAP,
  isDue,
  isPerfectSession,
  migrateCard,
  previewOutcomes,
  type MemoryCard,
} from "../lib/memory";
import { dueDateOf, isDueSrs, SrsStateId } from "../lib/srs";

const NOW = new Date("2026-11-20T18:00:00-06:00"); // 6 PM in Chicago

const legacy = (over: Record<string, unknown> = {}) => ({
  id: "john-3-16-16",
  verseReference: "John 3:16",
  verseText: "For God so loved the world...",
  translation: "BSB",
  dateAdded: "2026-11-01",
  interval: 0,
  easeFactor: 2.5,
  repetitions: 0,
  dueDate: "2026-11-01",
  lastReviewed: null,
  ...over,
});

function fresh(id = "john-3-16-16", text = "For God so loved the world"): MemoryCard {
  const r = addCard([], { id, verseReference: id, verseText: text, translation: "BSB" }, NOW);
  return r.deck[0];
}

test("timezone for these tests is America/Chicago", () => {
  assert.equal(Intl.DateTimeFormat().resolvedOptions().timeZone, "America/Chicago");
});

// --- Migration -------------------------------------------------------------

test("migration: a never-reviewed card stays New", () => {
  const card = migrateCard(legacy(), NOW);
  assert.equal(card.srs.state, SrsStateId.New);
  assert.equal(card.srs.reps, 0);
  assert.equal(cardStatus(card, NOW), "new");
  assert.deepEqual([card.book, card.chapter, card.start, card.end], ["john", 3, 16, 16]);
});

test("migration: a reviewed card keeps its progress and future due date", () => {
  const card = migrateCard(
    legacy({ repetitions: 4, interval: 30, easeFactor: 2.6, dueDate: "2026-12-10", lastReviewed: "2026-11-10" }),
    NOW
  );
  assert.equal(card.srs.state, SrsStateId.Review);
  assert.equal(card.srs.reps, 4);
  assert.equal(card.srs.scheduled_days, 30);
  assert.equal(card.srs.stability, 30);
  assert.ok(card.srs.difficulty < 5, "easier than default ease");
  assert.equal(dueDateOf(card.srs), "2026-12-10");
  assert.equal(card.dueDate, "2026-12-10");
  assert.equal(cardStatus(card, NOW), "secure");
  assert.equal(card.id, "john-3-16-16", "ids never change");
});

test("migration: an overdue card is still due, not reset", () => {
  const card = migrateCard(
    legacy({ repetitions: 2, interval: 6, dueDate: "2026-11-15", lastReviewed: "2026-11-09" }),
    NOW
  );
  assert.equal(card.srs.state, SrsStateId.Review);
  assert.ok(isDue(card, NOW));
  assert.equal(dueDateOf(card.srs), "2026-11-15");
});

test("migration: a lapsed SM-2 card (reps reset, but reviewed) is not New", () => {
  const card = migrateCard(legacy({ repetitions: 0, interval: 1, dueDate: "2026-11-21", lastReviewed: "2026-11-20" }), NOW);
  assert.notEqual(card.srs.state, SrsStateId.New);
  assert.equal(card.srs.lapses, 1);
});

test("migration: hard ease maps to a high difficulty, and running it twice changes nothing", () => {
  const once = migrateCard(legacy({ repetitions: 3, interval: 10, easeFactor: 1.3, dueDate: "2026-11-25", lastReviewed: "2026-11-15" }), NOW);
  assert.equal(once.srs.difficulty, 10);
  assert.deepEqual(migrateCard(once, NOW), once);
});

// --- Local dates -------------------------------------------------------------

test("due dates use the local calendar, not UTC", () => {
  // 9 PM Nov 20 in Chicago is already Nov 21 in UTC.
  const late = new Date("2026-11-20T21:00:00-06:00");
  assert.equal(late.toISOString().slice(0, 10), "2026-11-21");
  assert.equal(localDateString(late), "2026-11-20");

  const card = migrateCard(legacy({ repetitions: 2, interval: 6, dueDate: "2026-11-21", lastReviewed: "2026-11-15" }), late);
  assert.equal(isDueSrs(card.srs, late), false, "due tomorrow locally, so not due at 9 PM tonight");
  assert.equal(isDueSrs(card.srs, new Date("2026-11-21T00:05:00-06:00")), true);
});

test("a review late in the evening schedules from the local date", () => {
  const late = new Date("2026-11-20T23:30:00-06:00");
  const card = migrateCard(legacy({ repetitions: 3, interval: 10, dueDate: "2026-11-20", lastReviewed: "2026-11-10" }), late);
  const good = previewOutcomes(card, "review", "type", late).good.card;
  assert.ok(good.dueDate > "2026-11-20", `next due ${good.dueDate} is after tonight's local date`);
  assert.equal(good.dueDate, localDateString(new Date(good.srs.due)));
});

// --- Practice vs Review ------------------------------------------------------

test("practice Good and Easy never lengthen the interval", () => {
  const card = migrateCard(legacy({ repetitions: 3, interval: 12, dueDate: "2026-11-28", lastReviewed: "2026-11-16" }), NOW);
  const out = previewOutcomes(card, "practice", "flashcard", NOW, 1);
  for (const g of ["good", "easy"] as const) {
    assert.equal(out[g].scheduled, false);
    assert.deepEqual(out[g].card.srs, card.srs);
    assert.equal(out[g].card.log.at(-1)?.kind, "practice");
  }
  assert.ok(out.hard.card.srs.due <= card.srs.due, "practice Hard never moves the due date later");
  assert.equal(out.again.scheduled, true);
  assert.equal(out.again.card.srs.state, SrsStateId.Relearning);
  assert.equal(out.again.card.srs.lapses, 1);
});

test("review Good does lengthen the interval", () => {
  const card = migrateCard(legacy({ repetitions: 3, interval: 12, dueDate: "2026-11-20", lastReviewed: "2026-11-08" }), NOW);
  const out = previewOutcomes(card, "review", "type", NOW, 1);
  assert.ok(out.good.card.srs.scheduled_days >= 12);
  assert.ok(out.good.card.srs.scheduled_days <= 365);
  assert.equal(out.good.scheduled, true);
});

test("learning a new card moves it into FSRS learning and records the day", () => {
  const out = previewOutcomes(fresh(), "practice", "learn", NOW, 0.95);
  assert.equal(out.good.card.srs.state, SrsStateId.Learning);
  assert.equal(out.good.card.learnedOn, "2026-11-20");
  assert.equal(out.good.card.log.length, 1);
});

test("the review log is capped", () => {
  let card = migrateCard(legacy({ repetitions: 3, interval: 12, dueDate: "2026-11-20", lastReviewed: "2026-11-08" }), NOW);
  for (let i = 0; i < 60; i++) card = previewOutcomes(card, "practice", "flashcard", NOW, 1).good.card;
  assert.equal(card.log.length, 40);
});

// --- Adding ----------------------------------------------------------------

test("adding the same verse twice keeps one card", () => {
  const one = addCard([], { id: "john-3-16-16", verseReference: "John 3:16", verseText: "For God...", translation: "BSB" }, NOW);
  assert.equal(one.added, true);
  const two = addCard(one.deck, { id: "john-3-16-16", verseReference: "John 3:16", verseText: "For God...", translation: "KJV" }, NOW);
  assert.equal(two.added, false);
  assert.equal(two.reason, "duplicate");
  assert.equal(two.deck.length, 1);
});

test("adding a pack verse already in the deck tags it instead of duplicating", () => {
  const one = addCard([], { id: "john-3-16-16", verseReference: "John 3:16", verseText: "For God...", translation: "BSB" }, NOW);
  const two = addCard(one.deck, { id: "john-3-16-16", verseReference: "John 3:16", verseText: "x", translation: "BSB", collections: ["pack-gospel"] }, NOW);
  assert.equal(two.deck.length, 1);
  assert.deepEqual(two.deck[0].collections, ["pack-gospel"]);
});

test("empty verses can't be added", () => {
  const r = addCard([], { id: "matthew-17-21-21", verseReference: "Matthew 17:21", verseText: "   ", translation: "BSB" }, NOW);
  assert.equal(r.added, false);
  assert.equal(r.reason, "empty");
  assert.equal(r.deck.length, 0);
});

// --- Sessions ----------------------------------------------------------------

test("review queue: due cards plus today's new allowance, interleaved", () => {
  let deck: MemoryCard[] = [];
  for (let i = 1; i <= 8; i++) deck.push(migrateCard(legacy({ id: `psalms-119-${i}-${i}`, repetitions: 2, interval: 6, dueDate: "2026-11-19", lastReviewed: "2026-11-13" }), NOW));
  for (let i = 1; i <= 7; i++) deck = addCard(deck, { id: `john-1-${i}-${i}`, verseReference: `John 1:${i}`, verseText: "In the beginning", translation: "BSB" }, NOW).deck;
  deck.push(migrateCard(legacy({ id: "romans-8-28-28", repetitions: 3, interval: 30, dueDate: "2026-12-20", lastReviewed: "2026-11-20" }), NOW));

  const queue = buildReviewQueue(deck, NOW);
  const newIds = queue.filter((id) => id.startsWith("john"));
  assert.equal(newIds.length, DAILY_NEW_CARD_CAP);
  assert.equal(queue.length, 8 + DAILY_NEW_CARD_CAP);
  assert.ok(!queue.includes("romans-8-28-28"), "not-yet-due cards stay out of Review");
  assert.ok(!queue[0].startsWith("john"), "new cards are spread out, not all first");
});

test("perfect session: Good or Easy at 98%+, self-graded counts by grade", () => {
  assert.equal(isPerfectSession([{ grade: "good", accuracy: 1 }, { grade: "easy" }]), true);
  assert.equal(isPerfectSession([{ grade: "good", accuracy: 0.95 }]), false);
  assert.equal(isPerfectSession([{ grade: "hard", accuracy: 1 }]), false);
  assert.equal(isPerfectSession([]), false);
});
