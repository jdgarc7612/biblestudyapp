import test from "node:test";
import assert from "node:assert/strict";

import {
  canFinish,
  dailyQuestionLimit,
  deletedStudy,
  FREE_HINTS_PER_STUDY,
  hintsLeft,
  listStudies,
  newSoapEntry,
  passageReference,
  resumeStep,
  studiesCovering,
  WHOLE_CHAPTER,
} from "../lib/study-journal";
import { mergeSyncData, type SyncData } from "../lib/sync-merge";

const NOW = 1_764_000_000_000;

test("references for a verse range and a whole chapter", () => {
  assert.equal(passageReference({ book: "john", chapter: 3, start: 16, end: 21 }), "John 3:16-21");
  assert.equal(passageReference({ book: "psalms", chapter: 23, start: 1, end: WHOLE_CHAPTER }), "Psalm 23");
});

test("a study finishes once Observation, Application and Prayer have writing", () => {
  const e = newSoapEntry({ book: "john", chapter: 3, start: 16, end: 16 }, "BSB", NOW);
  assert.equal(canFinish(e), false);
  assert.equal(resumeStep(e), 1);
  const filled = { ...e, observation: "God gives", application: "Trust him", prayer: "Thank you" };
  assert.equal(canFinish(filled), true);
  assert.equal(canFinish({ ...filled, prayer: "   " }), false);
});

test("free hints run out after a few per study", () => {
  const e = newSoapEntry({ book: "john", chapter: 3, start: 16, end: 16 }, "BSB", NOW);
  assert.equal(hintsLeft(e), FREE_HINTS_PER_STUDY);
  assert.equal(hintsLeft({ hintsUsed: FREE_HINTS_PER_STUDY }), 0);
  assert.equal(hintsLeft({ hintsUsed: 10 }, true), Number.POSITIVE_INFINITY);
});

test("finishing a study adds one Ask AI question that day only", () => {
  assert.equal(dailyQuestionLimit(5, "2026-11-24", "2026-11-24"), 6);
  assert.equal(dailyQuestionLimit(5, "2026-11-23", "2026-11-24"), 5);
  assert.equal(dailyQuestionLimit(5, null, "2026-11-24"), 5);
});

test("deleted studies drop their writing and leave lists", () => {
  const e = { ...newSoapEntry({ book: "john", chapter: 3, start: 16, end: 18 }, "BSB", NOW), observation: "private" };
  const gone = deletedStudy(e, NOW + 1);
  assert.equal(gone.observation, "");
  assert.equal(gone.deleted, true);
  assert.equal(listStudies({ a: gone, b: e }).length, 1);
  assert.deepEqual(studiesCovering({ b: e }, "john", 3, 17, 17).map((s) => s.id), ["b"]);
  assert.deepEqual(studiesCovering({ b: e }, "john", 3, 19, 20), []);
});

test("sync keeps the newer copy of each study, deletions included, and the later bonus date", () => {
  const e = newSoapEntry({ book: "john", chapter: 3, start: 16, end: 16 }, "BSB", NOW);
  const phone = { s1: { ...e, observation: "phone", updatedAt: NOW + 5 }, s2: deletedStudy(e, NOW + 9) };
  const web = { s1: { ...e, observation: "web", updatedAt: NOW + 2 }, s2: { ...e, observation: "kept?", updatedAt: NOW + 3 } };
  const base = { updatedAt: 1, memoryDeck: [], deletedCardIds: [], memoryLists: {}, verseNotes: {}, planProgress: {}, planAnswers: {} };
  const merged = mergeSyncData(
    { ...base, studyEntries: phone, aiStudyBonusDate: "2026-11-24" } as unknown as SyncData,
    { ...base, studyEntries: web, aiStudyBonusDate: "2026-11-20" } as unknown as SyncData,
    false
  );
  assert.equal(merged.studyEntries.s1.observation, "phone");
  assert.equal(merged.studyEntries.s2.deleted, true);
  assert.equal(merged.aiStudyBonusDate, "2026-11-24");
});
