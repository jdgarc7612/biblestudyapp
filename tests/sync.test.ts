import test from "node:test";
import assert from "node:assert/strict";

import { addCard, migrateCard, previewOutcomes, type MemoryCard } from "../lib/memory";
import { mergeSyncData, type SyncData } from "../lib/sync-merge";

const NOW = new Date("2026-11-20T12:00:00-06:00");

function data(deck: MemoryCard[], over: Partial<SyncData> = {}): SyncData {
  return {
    updatedAt: 1,
    memoryDeck: deck,
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

const add = (deck: MemoryCard[], id: string, collections?: string[]) =>
  addCard(deck, { id, verseReference: id, verseText: "Text", translation: "BSB", collections }, NOW).deck;

test("two devices merge decks; FSRS state, log and collections survive", () => {
  let phone = add([], "john-3-16-16", ["pack-gospel"]);
  phone = [previewOutcomes(phone[0], "review", "learn", NOW, 1).good.card];
  const laptop = add([], "romans-8-28-28", ["list-abc"]);

  const merged = mergeSyncData(
    data(phone, { memoryLists: { "list-abc": { name: "Work", createdAt: 1, updatedAt: 1 } } }),
    data(laptop),
    false
  );
  const back = JSON.parse(JSON.stringify(merged)) as SyncData; // a round trip through user_data
  const john = back.memoryDeck.find((c) => c.id === "john-3-16-16")!;
  assert.equal(back.memoryDeck.length, 2);
  assert.equal(john.srs.state, phone[0].srs.state);
  assert.equal(john.srs.due, phone[0].srs.due);
  assert.equal(john.log.length, 1);
  assert.deepEqual(john.collections, ["pack-gospel"]);
  assert.deepEqual(back.memoryDeck.find((c) => c.id === "romans-8-28-28")!.collections, ["list-abc"]);
  assert.equal(back.memoryLists["list-abc"].name, "Work");
});

test("the more recently changed copy of a card wins", () => {
  const base = add([], "john-3-16-16")[0];
  const later = previewOutcomes(base, "review", "learn", new Date(NOW.getTime() + 60_000), 1).good.card;
  const merged = mergeSyncData(data([base]), data([later]), false);
  assert.equal(merged.memoryDeck[0].srs.reps, 1);
});

test("deleted cards stay deleted", () => {
  const deck = add(add([], "john-3-16-16"), "psalms-23-1-6");
  const merged = mergeSyncData(data(deck), data(deck, { deletedCardIds: ["psalms-23-1-6"] }), false);
  assert.deepEqual(merged.memoryDeck.map((c) => c.id), ["john-3-16-16"]);
});

test("an old SM-2 card from another device is brought up to date when merged", () => {
  const old = {
    id: "isaiah-41-10-10",
    verseReference: "Isaiah 41:10",
    verseText: "Do not fear",
    translation: "WEB",
    dateAdded: "2026-11-01",
    interval: 6,
    easeFactor: 2.5,
    repetitions: 2,
    dueDate: "2026-11-24",
    lastReviewed: "2026-11-18",
  } as unknown as MemoryCard;
  const merged = mergeSyncData(data([]), data([old]), true);
  const card = merged.memoryDeck[0];
  assert.equal(card.srs.reps, 2);
  assert.equal(card.dueDate, "2026-11-24");
  assert.deepEqual(migrateCard(card), card);
});

test("deleted lists stay deleted", () => {
  const merged = mergeSyncData(
    data([], { memoryLists: { "list-a": { name: "A", createdAt: 1, updatedAt: 5, deleted: true } } }),
    data([], { memoryLists: { "list-a": { name: "A", createdAt: 1, updatedAt: 2 } } }),
    false
  );
  assert.equal(merged.memoryLists["list-a"].deleted, true);
});
