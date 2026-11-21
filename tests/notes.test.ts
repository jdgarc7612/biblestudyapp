import test from "node:test";
import assert from "node:assert/strict";

import { selectionNoteStatus } from "../lib/notes";
import { verseRangeId } from "../lib/bible";
import type { VerseNote } from "../store/useAppStore";

const note = (reference: string, text: string): VerseNote => ({ reference, text, updatedAt: 1 });

test("selectionNoteStatus: no notes", () => {
  assert.deepEqual(selectionNoteStatus({}, "john", 3, 16, 16), { own: false, count: 0 });
});

test("selectionNoteStatus: the selection's own note", () => {
  const notes = { [verseRangeId("john", 3, 16, 16)]: note("John 3:16", "God so loved") };
  assert.deepEqual(selectionNoteStatus(notes, "john", 3, 16, 16), { own: true, count: 1 });
});

test("selectionNoteStatus: an overlapping note is counted but is not the selection's own", () => {
  const notes = { [verseRangeId("john", 3, 16, 18)]: note("John 3:16-18", "Context") };
  assert.deepEqual(selectionNoteStatus(notes, "john", 3, 16, 16), { own: false, count: 1 });
  assert.deepEqual(selectionNoteStatus(notes, "john", 3, 19, 20), { own: false, count: 0 });
});

test("selectionNoteStatus: an emptied (deleted) note does not count", () => {
  const notes = { [verseRangeId("john", 3, 16, 16)]: note("John 3:16", "") };
  assert.deepEqual(selectionNoteStatus(notes, "john", 3, 16, 16), { own: false, count: 0 });
});
