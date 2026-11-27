import test from "node:test";
import assert from "node:assert/strict";

import {
  clampTextSize,
  DEFAULT_TEXT_SIZE,
  getReadingTheme,
  readingThemeColors,
  scrollForVerse,
  swipeDirection,
  TEXT_SIZES,
  verseAtScroll,
} from "../lib/reading-prefs";
import { dailyQuestionLimit } from "../lib/study-journal";
import { mergeSyncData, type SyncData } from "../lib/sync-merge";

test("text size clamps to the steps, with Standard as the default", () => {
  assert.equal(TEXT_SIZES[DEFAULT_TEXT_SIZE].fontSize, 18);
  assert.equal(clampTextSize(undefined), DEFAULT_TEXT_SIZE);
  assert.equal(clampTextSize(-3), 0);
  assert.equal(clampTextSize(99), TEXT_SIZES.length - 1);
  assert.equal(clampTextSize(1.4), 1);
});

test("a theme you don't own reads as Classic, and Classic has no colors", () => {
  assert.equal(readingThemeColors("parchment", [], false), null);
  assert.equal(readingThemeColors("default", [], true), null);
  assert.equal(readingThemeColors("parchment", ["parchment"], false)?.background, "#F6EFE1");
  assert.equal(readingThemeColors("parchment", ["parchment"], true)?.background, "#1E1A15");
  assert.equal(getReadingTheme("nope").id, "default");
});

test("verse position round-trips between scroll and verse", () => {
  const top = 300;
  const height = 3000;
  const last = 30;
  for (const verse of [1, 5, 17, 30]) {
    const y = scrollForVerse(verse, top, height, last);
    assert.equal(verseAtScroll(y, top, height, last), verse);
  }
  assert.equal(verseAtScroll(0, top, height, last), 1);
  assert.equal(verseAtScroll(99999, top, height, last), last);
});

test("only a mostly sideways swipe pages", () => {
  assert.equal(swipeDirection(-90, 10), "next");
  assert.equal(swipeDirection(90, 10), "prev");
  assert.equal(swipeDirection(-90, 80), null); // diagonal: scrolling
  assert.equal(swipeDirection(-40, 5), null); // too short, slow
  assert.equal(swipeDirection(-40, 5, -0.8), "next"); // short flick
});

test("the shop's extra question adds to today's limit only on the day it was bought", () => {
  assert.equal(dailyQuestionLimit(5, null, "2026-11-27", "2026-11-27"), 6);
  assert.equal(dailyQuestionLimit(5, "2026-11-27", "2026-11-27", "2026-11-27"), 7);
  assert.equal(dailyQuestionLimit(5, null, "2026-11-28", "2026-11-27"), 5);
});

test("sync keeps every bought theme and the newest shop day", () => {
  const local = { updatedAt: 1, ownedReadingThemes: ["dusk"], aiShopBonusDate: "2026-11-26" } as unknown as SyncData;
  const remote = { updatedAt: 2, ownedReadingThemes: ["parchment"], aiShopBonusDate: "2026-11-27" } as unknown as SyncData;
  const merged = mergeSyncData(local, remote, false);
  assert.deepEqual([...merged.ownedReadingThemes].sort(), ["dusk", "parchment"]);
  assert.equal(merged.aiShopBonusDate, "2026-11-27");
});
