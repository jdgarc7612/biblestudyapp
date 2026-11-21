// Memory Phase 2: passages in order, the reference quiz, read-aloud pieces, progress, reminders,
// the new packs and the sync tag union. Run with `npm test`.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { MEMORY_PACKS } from "../data/study/memory-packs";
import {
  addCard,
  deckSummary,
  passageMembers,
  passageOrder,
  pickNewerCard,
  practiceDays,
  previewOutcomes,
  reminderDates,
  reviewNudgeCount,
  smartMethod,
  stitchOrder,
  type MemoryCard,
} from "../lib/memory";
import { quizPrompt, referenceChoices, speechChunks, splitReference } from "../lib/memory-reference";
import { mergeSyncData, type SyncData } from "../lib/sync-merge";

const NOW = new Date("2026-11-20T18:00:00-06:00"); // 6 PM in Chicago
const HOUR = 3600_000;
const DAY = 24 * HOUR;

function deckOf(ids: string[], at: Date = NOW): MemoryCard[] {
  let deck: MemoryCard[] = [];
  for (const id of ids) deck = addCard(deck, { id, verseReference: id, verseText: `text of ${id}`, translation: "BSB" }, at).deck;
  return deck;
}

/** A card graded Good in a review at `at` (so it's out of New and due later). */
function reviewed(card: MemoryCard, at: Date): MemoryCard {
  return previewOutcomes(card, "review", "learn", at, 1).good.card;
}

// ---------------------------------------------------------------------------
// Passages

test("a passage's verses are the single-verse cards inside its range, in order", () => {
  const deck = deckOf(["psalms-23-1-6", "psalms-23-3-3", "psalms-23-1-1", "psalms-24-1-1", "psalms-23-2-3", "john-3-16-16"]);
  const whole = deck[0];
  assert.deepEqual(passageMembers(whole, deck).map((c) => c.id), ["psalms-23-1-1", "psalms-23-3-3"]);
  assert.deepEqual(passageOrder("psalms-23-1-6", deck), ["psalms-23-1-1", "psalms-23-3-3", "psalms-23-1-6"]);
});

test("a reader range of three or more verses groups the same way; two verses don't", () => {
  const deck = deckOf(["romans-8-28-30", "romans-8-29-29", "romans-8-28-28", "john-3-16-17", "john-3-16-16"]);
  assert.deepEqual(passageOrder("romans-8-28-30", deck), ["romans-8-28-28", "romans-8-29-29", "romans-8-28-30"]);
  assert.deepEqual(passageMembers(deck.find((c) => c.id === "john-3-16-17")!, deck), []);
});

test("stitchOrder gathers a passage's verses in order with the whole last, keeping everything else", () => {
  const deck = deckOf(["john-3-16-16", "psalms-23-1-6", "psalms-23-3-3", "psalms-23-1-1", "romans-8-28-28"]);
  const queue = ["john-3-16-16", "psalms-23-3-3", "psalms-23-1-6", "romans-8-28-28", "psalms-23-1-1"];
  const out = stitchOrder(queue, deck);
  assert.deepEqual(out, ["john-3-16-16", "psalms-23-1-1", "psalms-23-3-3", "psalms-23-1-6", "romans-8-28-28"]);
  assert.equal(new Set(out).size, queue.length);
});

test("stitchOrder orders verses even when the whole passage isn't in the queue", () => {
  const deck = deckOf(["psalms-23-1-6", "psalms-23-4-4", "psalms-23-2-2"]);
  assert.deepEqual(stitchOrder(["psalms-23-4-4", "psalms-23-2-2"], deck), ["psalms-23-2-2", "psalms-23-4-4"]);
});

test("stitchOrder never duplicates a verse shared by two overlapping passages", () => {
  const deck = deckOf(["psalms-23-1-6", "psalms-23-1-3", "psalms-23-2-2", "psalms-23-5-5"]);
  const queue = ["psalms-23-1-3", "psalms-23-5-5", "psalms-23-2-2", "psalms-23-1-6"];
  const out = stitchOrder(queue, deck);
  assert.equal(out.length, queue.length);
  assert.equal(new Set(out).size, queue.length);
  assert.ok(out.indexOf("psalms-23-2-2") < out.indexOf("psalms-23-1-3"));
});

test("Smart puts a long passage together once its verses were practiced in the sitting", () => {
  const [whole] = deckOf(["psalms-23-1-6"]);
  const card = reviewed(whole, NOW);
  assert.equal(smartMethod(card, { passageWarm: true }), "stitch");
  assert.notEqual(smartMethod(card), "stitch");
  const [single] = deckOf(["john-3-16-16"]);
  assert.notEqual(smartMethod(reviewed(single, NOW), { passageWarm: true }), "stitch");
});

test("Smart sometimes asks a verse that's strong on wording for its reference", () => {
  const [base] = deckOf(["john-3-16-16"]);
  const strong = (reps: number, method: MemoryCard["log"][number]["method"] = "type") =>
    ({
      ...base,
      srs: { ...base.srs, state: 2, scheduled_days: 30, reps },
      log: [{ ...reviewed(base, NOW).log[0], grade: "good", method }],
    }) as MemoryCard;
  assert.equal(smartMethod(strong(6)), "reference");
  assert.equal(smartMethod(strong(7)), "type");
  assert.equal(smartMethod(strong(6, "reference")), "type");
});

// ---------------------------------------------------------------------------
// Reference quiz

test("splitReference reads book names with numbers and ranges", () => {
  assert.deepEqual(splitReference("1 John 5:13"), { name: "1 John", chapter: 5, start: 13, end: 13 });
  assert.deepEqual(splitReference("Psalm 23:1-6"), { name: "Psalm", chapter: 23, start: 1, end: 6 });
  assert.equal(splitReference("Psalm 23"), null);
});

test("the reference quiz has one right answer and three real, distinct near misses", () => {
  const deck = deckOf(["john-3-16-16", "romans-8-28-28"]).map((c, i) => ({ ...c, verseReference: ["John 3:16", "Romans 8:28"][i] }));
  const verses = [0, 51, 36, 36]; // John 1-3 verse counts, roughly
  const choices = referenceChoices(deck[0], deck, { chapters: 21, versesIn: (ch) => verses[ch] });
  assert.equal(choices.length, 4);
  assert.equal(choices.filter((c) => c.correct).length, 1);
  assert.equal(choices.find((c) => c.correct)!.label, "John 3:16");
  assert.equal(new Set(choices.map((c) => c.label)).size, 4);
  assert.ok(choices.some((c) => c.label === "Romans 8:28"), "another verse being memorized is a likely mix-up");
  for (const c of choices.filter((x) => !x.correct && x.label.startsWith("John"))) {
    const ref = splitReference(c.label)!;
    assert.ok(ref.chapter >= 1 && ref.chapter <= 21 && ref.end <= (verses[ref.chapter] ?? 99));
  }
  // Stable for the same card.
  assert.deepEqual(referenceChoices(deck[0], deck, { chapters: 21, versesIn: (ch) => verses[ch] }), choices);
});

test("without the book's shape, near misses never run past the passage", () => {
  const card = { id: "psalms-23-1-6", verseReference: "Psalm 23:1-6" };
  const choices = referenceChoices(card, [card]);
  for (const c of choices.filter((x) => !x.correct)) {
    const ref = splitReference(c.label)!;
    assert.equal(ref.chapter, 23);
    assert.ok(ref.end <= 6 && ref.start >= 1);
  }
});

test("quizPrompt shows a long passage's opening, ideally a whole sentence", () => {
  const short = "Jesus wept.";
  assert.deepEqual(quizPrompt(short), { text: short, cut: false });
  const long =
    "The LORD is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside quiet waters. He restores my soul; He guides me in the paths of righteousness for the sake of His name.";
  const p = quizPrompt(long);
  assert.equal(p.cut, true);
  assert.ok(long.startsWith(p.text));
  assert.match(p.text, /[.;]$/);
});

test("speechChunks splits at sentence ends and keeps every word", () => {
  const text =
    "The LORD is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside quiet waters. He restores my soul.";
  const chunks = speechChunks(text, 80);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((c) => c.length <= 80));
  assert.equal(chunks.join(" "), text);
  assert.deepEqual(speechChunks(""), []);
  const runOn = Array.from({ length: 80 }, (_, i) => `word${i}`).join(" ");
  const pieces = speechChunks(runOn, 100);
  assert.ok(pieces.every((c) => c.length <= 100));
  assert.equal(pieces.join(" "), runOn);
});

// ---------------------------------------------------------------------------
// Progress and reminders

test("deckSummary counts due, learning, secure and new", () => {
  const deck = deckOf(["john-3-16-16", "romans-8-28-28", "psalms-23-1-1", "isaiah-41-10-10"]);
  const due = reviewed(deck[0], new Date(NOW.getTime() - 30 * DAY)); // due long ago
  const secure = { ...deck[1], srs: { ...deck[1].srs, state: 2, scheduled_days: 40, lapses: 0, due: new Date(NOW.getTime() + 20 * DAY).toISOString() } };
  const learning = previewOutcomes(deck[2], "review", "learn", NOW, 1).easy.card; // back in a few days
  assert.deepEqual(deckSummary([due, secure, learning, deck[3]], NOW), { due: 1, learning: 1, secure: 1, new: 1 });
});

test("practiceDays counts graded recalls per local day for the last week", () => {
  const [card] = deckOf(["john-3-16-16"], new Date(NOW.getTime() - 10 * DAY));
  const a = reviewed(card, new Date(NOW.getTime() - 2 * DAY));
  const b = previewOutcomes(a, "practice", "flashcard", new Date(NOW.getTime() - 2 * DAY + HOUR)).good.card;
  const c = previewOutcomes(b, "practice", "flashcard", NOW).good.card;
  const days = practiceDays([c], 7, NOW);
  assert.equal(days.length, 7);
  assert.equal(days[6].date, "2026-11-20");
  assert.equal(days[6].count, 1);
  assert.equal(days[4].date, "2026-11-18");
  assert.equal(days[4].count, 2);
  assert.equal(days.filter((d) => d.count > 0).length, 2);
});

test("Home reminds about due verses until a Review is finished or put away today", () => {
  const [card] = deckOf(["john-3-16-16"], new Date(NOW.getTime() - 30 * DAY));
  const due = reviewed(card, new Date(NOW.getTime() - 30 * DAY));
  assert.equal(reviewNudgeCount([due], null, null, NOW), 1);
  assert.equal(reviewNudgeCount([due], "2026-11-19", null, NOW), 1, "yesterday's review doesn't count");
  assert.equal(reviewNudgeCount([due], "2026-11-20", null, NOW), 0, "caught up today: no nagging");
  assert.equal(reviewNudgeCount([due], null, "2026-11-20", NOW), 0);
  assert.equal(reviewNudgeCount(deckOf(["john-3-16-16"]), null, null, NOW), 0, "new verses aren't due");
});

test("phone reminders go only on days with verses due, after Review is done today", () => {
  const morning = new Date("2026-11-20T06:00:00-06:00");
  const [card] = deckOf(["john-3-16-16"], new Date(morning.getTime() - 30 * DAY));
  const due = reviewed(card, new Date(morning.getTime() - 30 * DAY)); // due every day from now on
  const all = reminderDates([due], { hour: 8, minute: 0, days: 3 }, morning);
  assert.deepEqual(all.map((d) => d.toString().slice(0, 21)), ["Fri Nov 20 2026 08:00", "Sat Nov 21 2026 08:00", "Sun Nov 22 2026 08:00"]);
  const after = reminderDates([due], { hour: 8, minute: 0, days: 3, reviewDoneDate: "2026-11-20" }, morning);
  assert.equal(after[0].getDate(), 21);
  const late = reminderDates([due], { hour: 8, minute: 0, days: 2 }, NOW);
  assert.equal(late.length, 1, "8 AM today has passed");
  const later = previewOutcomes(deckOf(["romans-8-28-28"])[0], "review", "learn", morning, 1).easy.card; // back in a few days
  const quiet = reminderDates([later], { hour: 8, minute: 0, days: 2 }, morning);
  assert.equal(quiet.length, 0);
  assert.equal(reminderDates(deckOf(["john-3-16-16"]), { hour: 8, minute: 0 }, morning).length, 0, "nothing reviewed yet");
});

// ---------------------------------------------------------------------------
// Packs

test("new packs resolve to real, non-empty verses in BSB, WEB and KJV", () => {
  const books = new Set(JSON.parse(readFileSync("data/bible/books.json", "utf8")).map((b: { id: string }) => b.id));
  const ids = new Set<string>();
  for (const pack of MEMORY_PACKS) {
    assert.ok(!ids.has(pack.id));
    ids.add(pack.id);
    assert.doesNotMatch(pack.title, /topical memory|\bTMS\b|fighter verses/i);
    for (const p of pack.passages) {
      assert.ok(books.has(p.book), `${pack.id}: ${p.book}`);
      for (const t of ["bsb", "web", "kjv"]) {
        const book = JSON.parse(readFileSync(`data/bible/${t}/${p.book}.json`, "utf8")) as { c: string[][] };
        const verses = (book.c[p.chapter - 1] ?? []).slice(p.start - 1, p.end).filter((v) => v && v.trim());
        assert.ok(verses.length > 0, `${pack.id} ${p.book} ${p.chapter}:${p.start} in ${t}`);
      }
    }
  }
  for (const id of ["pack-hope", "pack-promises", "pack-prayer"]) assert.ok(ids.has(id));
});

test("adding a pack verse that's already in the deck only tags it", () => {
  const [card] = deckOf(["philippians-4-6-7"]);
  const reviewedCard = reviewed({ ...card, collections: ["pack-peace"] }, NOW);
  const r = addCard([reviewedCard], { id: "philippians-4-6-7", verseReference: "x", verseText: "x", translation: "BSB", collections: ["pack-prayer"] }, NOW);
  assert.equal(r.added, false);
  assert.equal(r.deck.length, 1);
  assert.deepEqual(r.deck[0].collections, ["pack-peace", "pack-prayer"]);
  assert.deepEqual(r.deck[0].srs, reviewedCard.srs);
});

// ---------------------------------------------------------------------------
// Sync

function data(deck: MemoryCard[], over: Partial<SyncData> = {}): SyncData {
  return { updatedAt: 1, memoryDeck: deck, deletedCardIds: [], memoryLists: {}, ...over } as SyncData;
}

test("a list tag added on another device survives the merge", () => {
  const [card] = deckOf(["john-3-16-16"]);
  const phone = { ...card, collections: ["pack-gospel", "list-a"], updatedAt: 100 };
  const laptop = { ...reviewed(card, NOW), collections: ["pack-gospel"], updatedAt: 200 };
  const merged = pickNewerCard(phone, laptop);
  assert.equal(merged.srs.reps, laptop.srs.reps);
  assert.deepEqual(merged.collections, ["pack-gospel", "list-a"]);
});

test("a deleted list's tag isn't brought back by the merge", () => {
  const [card] = deckOf(["john-3-16-16"]);
  const local = data([{ ...card, collections: ["list-a"], updatedAt: 100 }], {
    memoryLists: { "list-a": { name: "A", createdAt: 1, updatedAt: 1 } },
  });
  const remote = data([{ ...card, collections: [], updatedAt: 200 }], {
    memoryLists: { "list-a": { name: "A", createdAt: 1, updatedAt: 5, deleted: true } },
  });
  const merged = mergeSyncData(local, remote, false);
  assert.deepEqual(merged.memoryDeck[0].collections, []);
});

test("the review-done date and reminder setting merge sensibly", () => {
  const local = data([], { memoryReviewDoneDate: "2026-11-20", memoryReminder: { enabled: true, hour: 7, minute: 0, updatedAt: 50 } });
  const remote = data([], { memoryReviewDoneDate: "2026-11-19", memoryReminder: { enabled: false, hour: 8, minute: 0, updatedAt: 10 } });
  const merged = mergeSyncData(local, remote, true);
  assert.equal(merged.memoryReviewDoneDate, "2026-11-20");
  assert.deepEqual(merged.memoryReminder, local.memoryReminder);
  const old = mergeSyncData(data([]), data([]), false);
  assert.equal(old.memoryReviewDoneDate, null);
  assert.equal(old.memoryReminder.enabled, false);
});
