import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { DEEP_DIVE_CHAPTERS, hasDeepDive, loadDeepDive } from "../data/study/deep-dive";
import type { DeepDiveChapter } from "../data/study/deep-dive/types";

const DIR = "data/study/deep-dive";
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
const books = Object.fromEntries(
  files.map((f) => [f.replace(/\.json$/, ""), JSON.parse(fs.readFileSync(`${DIR}/${f}`, "utf8")) as DeepDiveChapter[]])
);

const text = (v: unknown) => typeof v === "string" && v.trim().length > 0;

test("deep dive: every entry has a valid structure", () => {
  assert.ok(files.length > 0, "no deep-dive files");
  for (const [book, chapters] of Object.entries(books)) {
    assert.ok(Array.isArray(chapters) && chapters.length > 0, `${book}.json should be a non-empty array`);
    for (const c of chapters) {
      const where = `${book} ${c.chapter}`;
      assert.equal(c.book, book, `${where}: book field should match its file`);
      assert.ok(Number.isInteger(c.chapter) && c.chapter > 0, `${where}: bad chapter`);
      assert.ok(c.context.length > 0 && c.theology.length > 0 && c.application.length > 0, `${where}: a tab is empty`);
      for (const i of c.context) {
        assert.ok(text(i.heading) && text(i.body), `${where}: context item missing heading or body`);
        if (i.s !== undefined) assert.ok(i.v !== undefined, `${where}: "${i.heading}" has a Strong's number but no verse`);
      }
      for (const i of c.theology) assert.ok(text(i.title) && text(i.body), `${where}: theology item missing title or body`);
      for (const i of c.application) {
        assert.ok(text(i.title) && text(i.body) && text(i.question), `${where}: application item missing a field`);
        assert.ok(i.question.trim().endsWith("?"), `${where}: "${i.title}" question should end with "?"`);
      }
    }
  }
});

test("deep dive: no duplicate chapters, and the index matches the files", () => {
  for (const [book, chapters] of Object.entries(books)) {
    const nums = chapters.map((c) => c.chapter);
    assert.equal(new Set(nums).size, nums.length, `${book} has a chapter twice`);
    assert.deepEqual([...(DEEP_DIVE_CHAPTERS[book] ?? [])].sort((a, b) => a - b), [...nums].sort((a, b) => a - b), `${book} index`);
  }
  for (const book of Object.keys(DEEP_DIVE_CHAPTERS)) assert.ok(books[book], `index lists ${book} but there is no ${book}.json`);
});

test("deep dive: every Strong's number is in its verse", () => {
  for (const [book, chapters] of Object.entries(books)) {
    const original = JSON.parse(fs.readFileSync(`data/original/${book}.json`, "utf8")) as {
      c: [string, number, number][][][];
    };
    for (const c of chapters) {
      for (const i of c.context) {
        if (i.v === undefined) continue;
        const verse = original.c[c.chapter - 1]?.[i.v - 1];
        assert.ok(verse, `${book} ${c.chapter}:${i.v} does not exist`);
        if (i.s !== undefined) assert.ok(verse.some((t) => t[1] === i.s), `${book} ${c.chapter}:${i.v} has no Strong's ${i.s}`);
      }
    }
  }
});

test("deep dive: loader finds a chapter and nothing where there is no study", async () => {
  assert.ok(hasDeepDive("acts", 2));
  assert.ok(!hasDeepDive("acts", 29));
  const acts2 = await loadDeepDive("acts", 2);
  assert.equal(acts2?.chapter, 2);
  assert.equal((await loadDeepDive("john", 3))?.chapter, 3);
  assert.equal(await loadDeepDive("acts", 29), null);
  assert.equal((await loadDeepDive("genesis", 1))?.chapter, 1);
  assert.equal(await loadDeepDive("notabook", 1), null);
});
