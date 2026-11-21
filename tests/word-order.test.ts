import assert from "node:assert/strict";
import { test } from "node:test";

import { cutTiles, isInOrder, MAX_TILES, orderAccuracy, scrambleTiles, tileMarks } from "../lib/word-order";

const SHORT = "Jesus wept.";
const PSALM = "The LORD is my shepherd; I shall not want.";
const LONG =
  "For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life.";

test("a short verse is ordered word by word; a long one by short phrases", () => {
  assert.deepEqual(cutTiles(SHORT).map((t) => t.text), ["Jesus", "wept."]);
  assert.equal(cutTiles(PSALM).length, 9);
  const long = cutTiles(LONG);
  assert.ok(long.length <= MAX_TILES && long.length >= 8, `${long.length} tiles`);
  // Nothing lost or reordered when cut.
  assert.equal(long.map((t) => t.text).join(" "), LONG);
  assert.deepEqual(long.map((t) => t.id), long.map((_, i) => i));
});

test("a very long passage still gets at most twelve tiles", () => {
  const passage = Array.from({ length: 160 }, (_, i) => `word${i}${i % 9 === 8 ? "," : ""}`).join(" ");
  const tiles = cutTiles(passage);
  assert.ok(tiles.length <= MAX_TILES);
  assert.equal(tiles.map((t) => t.text).join(" "), passage);
});

test("the scramble is stable for a card and never already in order", () => {
  const tiles = cutTiles(PSALM);
  const a = scrambleTiles(tiles, "psalms-23-1-1");
  assert.deepEqual(a, scrambleTiles(tiles, "psalms-23-1-1"));
  assert.equal(isInOrder(a, tiles), false);
  assert.deepEqual([...a].sort((x, y) => x.id - y.id), tiles);
  const two = cutTiles(SHORT);
  for (const seed of ["a", "b", "c", "d"]) assert.equal(isInOrder(scrambleTiles(two, seed), two), false);
});

test("order is scored by place, and repeated words are interchangeable", () => {
  const tiles = cutTiles("the way and the truth");
  // Swap the two "the" tiles: still right.
  const swapped = [tiles[3], tiles[1], tiles[2], tiles[0], tiles[4]];
  assert.ok(isInOrder(swapped, tiles));
  assert.equal(orderAccuracy(swapped, tiles), 1);
  const miss = [tiles[1], tiles[0], tiles[2], tiles[3], tiles[4]];
  assert.deepEqual(tileMarks(miss, tiles), [false, false, true, true, true]);
  assert.equal(orderAccuracy(miss, tiles), 0.6);
});
