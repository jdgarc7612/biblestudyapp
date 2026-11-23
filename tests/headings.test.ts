import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { placeHeadings, type BookHeadings } from "../lib/headings";

const books = JSON.parse(fs.readFileSync("data/bible/books.json", "utf8")) as { id: string; chapters: number }[];
const load = (dir: string, id: string) => JSON.parse(fs.readFileSync(`data/bible/${dir}/${id}.json`, "utf8"));

test("headings: every book has a file, chapters exist, and each heading lands on a BSB verse", () => {
  let total = 0;
  for (const book of books) {
    const headings = load("headings", book.id) as BookHeadings;
    const bsb = load("bsb", book.id) as { c: string[][] };
    for (const [ch, entries] of Object.entries(headings)) {
      const verses = bsb.c[Number(ch) - 1];
      assert.ok(verses, `${book.id} ${ch} is not a chapter`);
      for (const [verse, text, level] of entries) {
        assert.ok(text.trim().length > 0, `${book.id} ${ch}:${verse} has an empty heading`);
        assert.ok([0, 1, 2].includes(level), `${book.id} ${ch}:${verse} bad level`);
        assert.ok(verses[verse - 1], `${book.id} ${ch}:${verse} is not a BSB verse`);
        total++;
      }
    }
  }
  assert.ok(total > 3000, `only ${total} headings`);
});

test("headings: Genesis 1 opens with The Creation", () => {
  const gen = load("headings", "genesis") as BookHeadings;
  assert.deepEqual(gen["1"][0], [1, "The Creation", 1]);
});

test("placeHeadings: moves past verses a translation leaves out and drops ones past the end", () => {
  const placed = placeHeadings(
    [
      [1, "Start", 1],
      [4, "Skipped verse", 1],
      [9, "Too far", 1],
    ],
    [1, 2, 3, 5, 6]
  );
  assert.deepEqual(placed.get(1)?.map((h) => h.text), ["Start"]);
  assert.deepEqual(placed.get(5)?.map((h) => h.text), ["Skipped verse"]);
  assert.equal([...placed.values()].flat().length, 2);
});

test("placeHeadings: nothing to place without verses or headings", () => {
  assert.equal(placeHeadings([], [1, 2]).size, 0);
  assert.equal(placeHeadings(undefined, [1, 2]).size, 0);
  assert.equal(placeHeadings([[1, "A", 1]], []).size, 0);
});
