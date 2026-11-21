import test from "node:test";
import assert from "node:assert/strict";

import {
  applyHighlight,
  chapterHighlights,
  formatVerseShare,
  isSaved,
  listSaved,
  mergeByUpdatedAt,
  selectionHighlight,
  type SavedVerse,
  type VerseHighlight,
} from "../lib/verse-marks";
import { mergeSyncData, type SyncData } from "../lib/sync-merge";

const john = (start: number, end: number) => ({ book: "john", chapter: 3, start, end });

function data(over: Partial<SyncData>): SyncData {
  return {
    updatedAt: 1,
    memoryDeck: [],
    deletedCardIds: [],
    memoryLists: {},
    memoryMethod: "smart",
    verseNotes: {},
    planProgress: {},
    planAnswers: {},
    milestonesAchieved: [],
    onboardingBonusesClaimed: [],
    ...over,
  } as unknown as SyncData;
}

test("a highlight shows on each verse of its range", () => {
  const h = applyHighlight({}, john(16, 17), "yellow", 10);
  const colors = chapterHighlights(h, "john", 3);
  assert.equal(colors.get(16), "yellow");
  assert.equal(colors.get(17), "yellow");
  assert.equal(colors.get(18), undefined);
  assert.equal(chapterHighlights(h, "john", 4).size, 0);
});

test("overlapping ranges from two devices: the most recently changed range wins, ties by id", () => {
  const h: Record<string, VerseHighlight> = {
    "john-3-16-18": { color: "yellow", updatedAt: 5 },
    "john-3-17-17": { color: "green", updatedAt: 9 },
    "john-3-18-19": { color: "pink", updatedAt: 2 },
  };
  const colors = chapterHighlights(h, "john", 3);
  assert.equal(colors.get(16), "yellow");
  assert.equal(colors.get(17), "green");
  assert.equal(colors.get(18), "yellow"); // yellow (5) is newer than pink (2)
  assert.equal(colors.get(19), "pink");
  const tie = chapterHighlights(
    { "john-3-1-2": { color: "green", updatedAt: 3 }, "john-3-2-3": { color: "pink", updatedAt: 3 } },
    "john",
    3
  );
  assert.equal(tie.get(2), "pink"); // same time: the later id in sort order, on every device
});

test("recoloring or removing part of a range trims the old range", () => {
  let h = applyHighlight({}, john(16, 18), "yellow", 1);
  h = applyHighlight(h, john(17, 17), "green", 2);
  let colors = chapterHighlights(h, "john", 3);
  assert.deepEqual([colors.get(16), colors.get(17), colors.get(18)], ["yellow", "green", "yellow"]);
  assert.equal(h["john-3-16-18"].color, null); // tombstone so a sync can't bring it back
  assert.equal(selectionHighlight(colors, 16, 18), null);
  assert.equal(selectionHighlight(colors, 17, 17), "green");

  h = applyHighlight(h, john(16, 17), null, 3);
  colors = chapterHighlights(h, "john", 3);
  assert.equal(colors.get(16), undefined);
  assert.equal(colors.get(17), undefined);
  assert.equal(colors.get(18), "yellow");
});

test("a removed highlight stays removed after a sync with an older copy", () => {
  const phone = applyHighlight({}, john(16, 16), "yellow", 100);
  const laptop = applyHighlight(phone, john(16, 16), null, 200);
  const merged = mergeSyncData(
    data({ updatedAt: 100, verseHighlights: phone } as Partial<SyncData>),
    data({ updatedAt: 200, verseHighlights: laptop } as Partial<SyncData>),
    false
  );
  assert.equal(chapterHighlights(merged.verseHighlights, "john", 3).size, 0);
  // Either order of local/remote gives the same result.
  const other = mergeSyncData(
    data({ updatedAt: 200, verseHighlights: laptop } as Partial<SyncData>),
    data({ updatedAt: 100, verseHighlights: phone } as Partial<SyncData>),
    false
  );
  assert.equal(chapterHighlights(other.verseHighlights, "john", 3).size, 0);
  // A newer color on the other device wins over an older removal.
  const recolored = mergeByUpdatedAt(laptop, applyHighlight({}, john(16, 16), "pink", 300));
  assert.equal(chapterHighlights(recolored, "john", 3).get(16), "pink");
});

const savedEntry = (over: Partial<SavedVerse> = {}): SavedVerse => ({
  reference: "John 3:16",
  translation: "BSB",
  text: "For God so loved the world",
  savedAt: 10,
  updatedAt: 10,
  ...over,
});

test("saved verses merge by newest change; an unsave syncs and old copies don't revive it", () => {
  const phone = { "john-3-16-16": savedEntry() };
  const laptop = { "john-3-16-16": savedEntry({ removed: true, updatedAt: 50 }), "romans-8-28-28": savedEntry({ reference: "Romans 8:28", savedAt: 40, updatedAt: 40 }) };
  const merged = mergeSyncData(
    data({ savedVerses: phone } as Partial<SyncData>),
    data({ savedVerses: laptop } as Partial<SyncData>),
    false
  );
  assert.equal(isSaved(merged.savedVerses, "john-3-16-16"), false);
  assert.equal(isSaved(merged.savedVerses, "romans-8-28-28"), true);
  assert.deepEqual(listSaved(merged.savedVerses).map((s) => s.id), ["romans-8-28-28"]);
  const back = JSON.parse(JSON.stringify(merged)) as SyncData; // a round trip through user_data
  assert.equal(back.savedVerses["john-3-16-16"].removed, true);
  // Saved is not Memory.
  assert.equal(merged.memoryDeck.length, 0);
});

test("older copies without highlights or saved verses still merge", () => {
  const merged = mergeSyncData(data({}), data({}), false);
  assert.deepEqual(merged.verseHighlights, {});
  assert.deepEqual(merged.savedVerses, {});
});

test("copy/share text carries the reference, translation and every verse", () => {
  assert.equal(
    formatVerseShare("John 3:16", "BSB", [{ verse: 16, text: "For God so loved the world… " }]),
    "John 3:16 (BSB)\nFor God so loved the world…"
  );
  assert.equal(
    formatVerseShare("Romans 8:28-29", "KJV", [
      { verse: 28, text: "And we know that all things work together for good." },
      { verse: 29, text: "For whom he did foreknow…" },
    ]),
    "Romans 8:28-29 (KJV)\n28 And we know that all things work together for good.\n29 For whom he did foreknow…"
  );
  assert.equal(formatVerseShare("Matthew 17:21", "BSB", []), "Matthew 17:21 (BSB)");
});
