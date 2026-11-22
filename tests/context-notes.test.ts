import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { CONTEXT_NOTES } from "../data/study/context-notes";

test("context notes: one Setting card per chapter", () => {
  const seen = new Set<string>();
  for (const n of CONTEXT_NOTES) {
    const key = `${n.book} ${n.chapter} ${n.start ?? ""}`;
    assert.ok(!seen.has(key), `duplicate note for ${key}`);
    seen.add(key);
    assert.ok(n.title && n.setting, `empty note for ${key}`);
  }
});

test("context notes: every word to notice is in its verse", () => {
  const books: Record<string, { c: [string, number, number][][][] }> = {};
  for (const n of CONTEXT_NOTES) {
    books[n.book] ??= JSON.parse(fs.readFileSync(`data/original/${n.book}.json`, "utf8"));
    for (const w of n.words) {
      const verse = books[n.book].c[n.chapter - 1]?.[w.v - 1] ?? [];
      assert.ok(verse.some((t) => t[1] === w.s), `${n.book} ${n.chapter}:${w.v} has no Strong's ${w.s}`);
    }
  }
});
