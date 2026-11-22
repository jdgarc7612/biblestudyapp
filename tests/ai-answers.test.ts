import test from "node:test";
import assert from "node:assert/strict";

import {
  addAnswer,
  answerPassage,
  answersCovering,
  answersFromChat,
  chapterAnswerMarks,
  displayQuestion,
  deleteAnswer,
  listAnswers,
  mergeAnswers,
  MAX_UNSAVED_ANSWERS,
  noteWithAnswer,
  plainAnswer,
  pruneAnswers,
  searchAnswers,
  setAnswerSaved,
  type AiAnswer,
} from "../lib/ai-answers";
import { mergeSyncData, type SyncData } from "../lib/sync-merge";

const q = (question: string, at: number, extra: Partial<AiAnswer> = {}): AiAnswer => ({
  question,
  answer: `Answer to ${question}`,
  askedAt: at,
  updatedAt: at,
  ...extra,
});

test("answerPassage: verses from the Reader become a range", () => {
  assert.deepEqual(answerPassage("What does this mean?", "John 3:16-17"), {
    reference: "John 3:16-17",
    rangeId: "john-3-16-17",
  });
  assert.deepEqual(answerPassage("Explain", "1 John 4:8"), { reference: "1 John 4:8", rangeId: "1john-4-8-8" });
});

test("answerPassage: an 'About ...:' question or a single named verse", () => {
  assert.equal(answerPassage("About Romans 8:28: is this a promise?")?.rangeId, "romans-8-28-28");
  assert.equal(answerPassage("Explain John 3:16 like I'm new to this.")?.rangeId, "john-3-16-16");
  // A whole chapter keeps its reference without a verse marker.
  assert.deepEqual(answerPassage("About Psalm 23: why is it loved?"), { reference: "Psalm 23" });
  // Two passages, or none: not tied to a verse.
  assert.equal(answerPassage("Compare John 1:1 and Genesis 1:1"), null);
  assert.equal(answerPassage("What does the Bible say about hope?"), null);
});

test("addAnswer keeps only the fields given and stamps the time", () => {
  const out = addAnswer({}, "a1", { question: "Q", answer: "A", reference: undefined, rangeId: "john-3-16-16" }, 5);
  assert.deepEqual(out.a1, { question: "Q", answer: "A", rangeId: "john-3-16-16", askedAt: 5, updatedAt: 5 });
});

test("history keeps every saved answer and the newest unsaved ones", () => {
  let answers: Record<string, AiAnswer> = {};
  for (let i = 0; i < MAX_UNSAVED_ANSWERS + 5; i++) answers[`a${i}`] = q(`q${i}`, i + 1);
  answers = setAnswerSaved(answers, "a0", true, 1000);
  answers = pruneAnswers(answers);
  const live = listAnswers(answers);
  assert.equal(live.length, MAX_UNSAVED_ANSWERS + 1);
  assert.ok(answers.a0?.saved, "the oldest answer stays because it's saved");
  assert.equal(answers.a1, undefined, "an old unsaved answer goes");
  assert.ok(answers[`a${MAX_UNSAVED_ANSWERS + 4}`]);
});

test("save, unsave and delete", () => {
  let answers: Record<string, AiAnswer> = { a: q("Q", 1) };
  answers = setAnswerSaved(answers, "a", true, 2);
  assert.equal(answers.a.saved, true);
  assert.equal(answers.a.savedAt, 2);
  assert.deepEqual(listAnswers(answers, true).map((a) => a.id), ["a"]);
  answers = setAnswerSaved(answers, "a", false, 3);
  assert.equal(answers.a.saved, false);
  assert.equal(answers.a.savedAt, undefined);
  answers = deleteAnswer(answers, "a", 4);
  assert.equal(answers.a.deleted, true);
  assert.equal(answers.a.answer, "", "a deleted answer keeps no text");
  assert.equal(listAnswers(answers).length, 0);
  assert.equal(setAnswerSaved(answers, "a", true, 5), answers, "a deleted answer can't be saved");
});

test("merge: newest change wins and a deletion isn't brought back", () => {
  const local = deleteAnswer({ a: q("A", 1), b: q("B", 2) }, "a", 10);
  const remote = setAnswerSaved({ a: q("A", 1), b: q("B", 2), c: q("C", 3) }, "b", true, 9);
  const merged = mergeAnswers(local, remote);
  assert.equal(merged.a.deleted, true);
  assert.equal(merged.b.saved, true);
  assert.ok(merged.c);
  assert.deepEqual(mergeAnswers(undefined, undefined), {});
});

test("sync merge carries aiAnswers from both devices", () => {
  const base = { updatedAt: 1 } as SyncData;
  const merged = mergeSyncData(
    { ...base, aiAnswers: { a: q("A", 1) } } as SyncData,
    { ...base, updatedAt: 2, aiAnswers: { b: q("B", 2) } } as SyncData,
    false
  );
  assert.deepEqual(Object.keys(merged.aiAnswers).sort(), ["a", "b"]);
});

test("search matches every word across question, answer and reference", () => {
  const list = listAnswers({
    a: q("What is grace?", 1, { reference: "Ephesians 2:8" }),
    b: q("Why did Jesus weep?", 2),
  });
  assert.deepEqual(searchAnswers(list, "grace ephesians").map((a) => a.id), ["a"]);
  assert.deepEqual(searchAnswers(list, "  ").length, 2);
  assert.deepEqual(searchAnswers(list, "WEEP").map((a) => a.id), ["b"]);
});

test("Reader marks sit on the last verse asked about", () => {
  const answers = {
    a: q("A", 1, { rangeId: "john-3-16-18" }),
    b: q("B", 2, { rangeId: "john-3-18-18" }),
    c: q("C", 3, { rangeId: "john-4-1-1" }),
    d: { ...q("D", 4, { rangeId: "john-3-5-5" }), deleted: true },
  };
  const marks = chapterAnswerMarks(answers, "john", 3);
  assert.deepEqual([...marks.keys()], [18]);
  assert.deepEqual(marks.get(18)?.sort(), ["a", "b"]);
  assert.deepEqual(answersCovering(answers, "john", 3, 17).map((a) => a.id), ["a"]);
});

test("noteWithAnswer appends plain text once", () => {
  const entry = { question: "What is love?", answer: "**Love** is patient.\n\n\n## More\nSee 1 Corinthians 13." };
  assert.equal(plainAnswer(entry.answer), "Love is patient.\n\nMore\nSee 1 Corinthians 13.");
  const first = noteWithAnswer("", entry);
  assert.equal(first.added, true);
  assert.ok(first.text.startsWith("Ask AI: What is love?\nLove is patient."));
  const withMine = noteWithAnswer("My thought.", entry);
  assert.ok(withMine.text.startsWith("My thought.\n\nAsk AI:"));
  assert.deepEqual(noteWithAnswer(withMine.text, entry), { text: withMine.text, added: false });
});

test("answersFromChat turns the old on-device conversation into history", () => {
  const out = answersFromChat([
    { id: "u1", role: "user", content: "About John 1:1: who is the Word?", createdAt: "2026-11-20T10:00:00Z" },
    { id: "r1", role: "assistant", content: "Jesus.", createdAt: "2026-11-20T10:00:05Z" },
    { id: "r0", role: "assistant", content: "A second reply with no new question", createdAt: "2026-11-20T10:01:00Z" },
    { id: "u2", role: "user", content: "Hope?", verseReference: "Romans 15:13", createdAt: "2026-11-20T11:00:00Z" },
    { id: "r2", role: "assistant", content: "Yes.", createdAt: "2026-11-20T11:00:05Z" },
  ]);
  assert.deepEqual(Object.keys(out).sort(), ["r1", "r2"]);
  assert.equal(out.r1.rangeId, "john-1-1-1");
  assert.equal(out.r2.reference, "Romans 15:13");
  assert.equal(out.r2.askedAt, Date.parse("2026-11-20T11:00:05Z"));
});

test("displayQuestion drops an 'About <passage>:' prefix shown beside the passage", () => {
  assert.equal(displayQuestion({ question: "About John 3:16: is it for everyone?", reference: "John 3:16" }), "is it for everyone?");
  assert.equal(displayQuestion({ question: "About John 3:16: x" }), "About John 3:16: x");
  assert.equal(displayQuestion({ question: "Why?", reference: "John 3:16" }), "Why?");
});
