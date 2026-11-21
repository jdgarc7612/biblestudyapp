import assert from "node:assert/strict";
import { test } from "node:test";

import { addCard, migrateCard, smartMethod, type MemoryCard } from "../lib/memory";
import {
  challengeProgress,
  cleanChallengeName,
  decodeChallenge,
  encodeChallenge,
  isChallengeId,
  joinedChallenge,
  newChallengeId,
  type MemoryChallenge,
} from "../lib/memory-challenge";
import { mergeSyncData, type SyncData } from "../lib/sync-merge";

const NOW = new Date("2026-11-21T15:00:00Z");
const PEACE = ["john-14-27-27", "isaiah-26-3-3", "philippians-4-6-7"];

const card = (id: string, collections: string[] = []): MemoryCard =>
  addCard([], { id, verseReference: id, verseText: "Words of the verse.", translation: "BSB", collections }, NOW).deck[0];

// ---------------------------------------------------------------------------
// Word order in Smart

test("Smart now and then picks Word order for a mid-strength verse, never back to back", () => {
  const base = card("john-3-16-16");
  const mid = (reps: number, method: MemoryCard["log"][number]["method"] = "flashcard") =>
    ({
      ...base,
      srs: { ...base.srs, state: 2, scheduled_days: 10, reps },
      log: [{ at: NOW.toISOString(), grade: "good", method, kind: "review", scheduled: true, before: {}, after: {} }],
    }) as unknown as MemoryCard;
  assert.equal(smartMethod(mid(5)), "wordOrder");
  assert.equal(smartMethod(mid(6)), "flashcard");
  assert.equal(smartMethod(mid(5, "wordOrder")), "flashcard");
  // A weak verse still gets the heavier cues.
  const weak = { ...mid(5), log: [{ ...mid(5).log[0], grade: "again" }] } as MemoryCard;
  assert.equal(smartMethod(weak), "blanks");
});

// ---------------------------------------------------------------------------
// Challenges

test("a challenge code round-trips, holds references only, and survives a link", () => {
  const id = newChallengeId(() => 0.42);
  assert.ok(isChallengeId(id));
  const code = encodeChallenge({ id, name: "Our family: Peace ✝", verses: PEACE });
  assert.match(code, /^OM1[A-Za-z0-9_-]+$/);
  assert.deepEqual(decodeChallenge(code), { id, name: "Our family: Peace ✝", verses: PEACE });
  assert.deepEqual(decodeChallenge(`  https://example.org/memory/join?c=${code}&x=1 `)?.verses, PEACE);
  // No verse text travels in the code.
  assert.ok(!Buffer.from(code.slice(3), "base64url").toString().includes("Words"));
});

test("a bad or tampered code is refused", () => {
  const id = newChallengeId(() => 0.1);
  const code = encodeChallenge({ id, name: "Peace", verses: PEACE });
  assert.equal(decodeChallenge(""), null);
  assert.equal(decodeChallenge("hello"), null);
  assert.equal(decodeChallenge(code.slice(0, code.length - 6)), null);
  assert.equal(decodeChallenge(encodeChallenge({ id, name: "x", verses: ["notaverse"] })), null);
  assert.equal(decodeChallenge(encodeChallenge({ id, name: "x", verses: [] })), null);
  assert.equal(decodeChallenge(encodeChallenge({ id: "challenge-!!", name: "x", verses: PEACE })), null);
  assert.equal(decodeChallenge(code, (book) => book !== "isaiah"), null);
  const many = Array.from({ length: 31 }, (_, i) => `psalms-${i + 1}-1-1`);
  assert.equal(decodeChallenge(encodeChallenge({ id, name: "x", verses: many })), null);
  assert.equal(cleanChallengeName("  Line\none\u0007  "), "Line one");
});

test("joining adds the verses to the other person's own deck: tagged, never duplicated", () => {
  const invite = decodeChallenge(encodeChallenge({ id: newChallengeId(() => 0.7), name: "Peace", verses: PEACE }))!;
  // They already had John 14:27, with progress of their own.
  const mine = { ...card("john-14-27-27", ["pack-peace"]), srs: { ...card("john-14-27-27").srs, reps: 4, state: 2 } };
  let deck: MemoryCard[] = [mine];
  for (const id of invite.verses) {
    deck = addCard(deck, { id, verseReference: id, verseText: "Their own translation.", translation: "WEB", collections: [invite.id] }, NOW).deck;
  }
  assert.equal(deck.length, 3);
  const kept = deck.find((c) => c.id === "john-14-27-27")!;
  assert.deepEqual(kept.collections, ["pack-peace", invite.id]);
  assert.equal(kept.srs.reps, 4);
  assert.equal(kept.verseText, mine.verseText);
  assert.ok(deck.every((c) => c.collections.includes(invite.id)));

  const record = joinedChallenge(invite, undefined, 1000);
  assert.equal(record.role, "joined");
  const progress = challengeProgress(record, deck, NOW);
  assert.equal(progress.total, 3);
  assert.equal(progress.inDeck, 3);
  assert.equal(progress.notStarted, 2);
});

const challenge = (over: Partial<MemoryChallenge> = {}): MemoryChallenge => ({
  id: "challenge-abcd2345",
  name: "Peace",
  verses: PEACE,
  role: "started",
  createdAt: 1000,
  updatedAt: 1000,
  ...over,
});

const sync = (over: Partial<SyncData>): SyncData =>
  ({ updatedAt: 1, memoryDeck: [], deletedCardIds: [], memoryLists: {}, memoryChallenges: {}, ...over }) as SyncData;

test("challenges sync between devices: added on either side, newer copy wins", () => {
  const a = challenge();
  const b = challenge({ id: "challenge-zzzz2345", name: "Hope", role: "joined" });
  const merged = mergeSyncData(sync({ memoryChallenges: { [a.id]: a } }), sync({ memoryChallenges: { [b.id]: b } }), false);
  assert.deepEqual(Object.keys(merged.memoryChallenges).sort(), [a.id, b.id].sort());

  const renamed = challenge({ name: "Peace for the week", updatedAt: 2000 });
  const again = mergeSyncData(sync({ memoryChallenges: { [a.id]: a } }), sync({ memoryChallenges: { [a.id]: renamed } }), false);
  assert.equal(again.memoryChallenges[a.id].name, "Peace for the week");

  // An older copy of the app that doesn't know challenges doesn't wipe them.
  const old = mergeSyncData(sync({ memoryChallenges: { [a.id]: a } }), { ...sync({}), memoryChallenges: undefined } as unknown as SyncData, true);
  assert.ok(old.memoryChallenges[a.id]);
});

test("leaving a challenge on one device takes its tag off the cards, and keeps their progress", () => {
  const c = challenge();
  const tagged = { ...card("john-14-27-27", [c.id, "pack-peace"]), updatedAt: 5000 };
  const left = challenge({ left: true, updatedAt: 3000 });
  const merged = mergeSyncData(
    sync({ memoryDeck: [tagged], memoryChallenges: { [c.id]: c } }),
    sync({ memoryDeck: [migrateCard(tagged)], memoryChallenges: { [c.id]: left } }),
    false
  );
  assert.equal(merged.memoryChallenges[c.id].left, true);
  assert.deepEqual(merged.memoryDeck[0].collections, ["pack-peace"]);
  assert.equal(merged.memoryDeck.length, 1);
  // Re-joining later brings it back.
  const back = joinedChallenge(c, merged.memoryChallenges[c.id], 9000);
  assert.equal(back.left, undefined);
  assert.equal(back.role, "started");
});
