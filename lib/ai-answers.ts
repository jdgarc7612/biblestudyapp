/**
 * Ask AI answers that are kept: the pure rules, apart from the screens so they can be tested.
 *
 * Every answer the study companion gives is kept with its question (and the verses it was asked
 * about, when there were any) in `aiAnswers`, keyed by id. They live in the synced user_data JSON
 * (lib/sync-merge.ts), so a reader finds them on any device once signed in, and on this device
 * while browsing as a guest. Reopening a kept answer reads it from here: it never calls the AI and
 * never counts against the free daily questions.
 *
 * Size: the whole user_data JSON is sent on every sync, so history is capped. Saved answers are
 * always kept; of the rest, the newest MAX_UNSAVED_ANSWERS stay. A deleted answer is kept as a
 * small tombstone (no text) so a sync with an older copy doesn't bring it back.
 */
import { findReferences, verseRangeId, parseVerseRangeId, type TranslationId } from "./bible";

export const MAX_UNSAVED_ANSWERS = 100;
export const MAX_ANSWER_TOMBSTONES = 200;

export interface AiAnswer {
  question: string;
  answer: string;
  /** The passage as shown when it was asked, e.g. "John 3:16-17". */
  reference?: string;
  /** The verse range id ("john-3-16-17") when the question was about verses. */
  rangeId?: string;
  translation?: TranslationId;
  askedAt: number;
  updatedAt: number;
  saved?: boolean;
  savedAt?: number;
  /** True once deleted; the text is dropped and only the id and time stay. */
  deleted?: boolean;
}

export interface AnswerEntry extends AiAnswer {
  id: string;
  book?: string;
  chapter?: number;
  start?: number;
  end?: number;
}

export interface AnswerPassage {
  reference: string;
  rangeId?: string;
}

/**
 * The passage a question is about: the verses it was asked from (the Read tab or Home's verse),
 * otherwise a question that opens "About John 3:16: ..." or names exactly one verse.
 * A whole chapter keeps its reference but gets no range, so it adds no verse marker.
 */
export function answerPassage(question: string, contextReference?: string): AnswerPassage | null {
  const fromContext = contextReference ? findReferences(contextReference)[0] : undefined;
  let ref = fromContext;
  if (!ref) {
    const about = question.match(/^About ([^:]+(?::\d+(?:\s*[-–]\s*\d+)?)?):/);
    ref = about ? findReferences(about[1])[0] : undefined;
  }
  if (!ref) {
    const found = findReferences(question);
    const withVerse = found.filter((r) => r.verse !== undefined);
    if (found.length === 1 && withVerse.length === 1) ref = withVerse[0];
  }
  if (!ref) return contextReference ? { reference: contextReference } : null;
  const reference = contextReference ?? ref.text.replace(/\s+/g, " ");
  if (ref.verse === undefined) return { reference };
  const end = Math.max(ref.verse, ref.endVerse ?? ref.verse);
  return { reference, rangeId: verseRangeId(ref.book.id, ref.chapter, ref.verse, end) };
}

/** Saved answers, the newest unsaved ones and the newest tombstones; everything else goes. */
export function pruneAnswers(
  answers: Record<string, AiAnswer>,
  maxUnsaved = MAX_UNSAVED_ANSWERS,
  maxTombstones = MAX_ANSWER_TOMBSTONES
): Record<string, AiAnswer> {
  const entries = Object.entries(answers).filter(([, a]) => a && typeof a.updatedAt === "number");
  const live = entries.filter(([, a]) => !a.deleted);
  const unsaved = live
    .filter(([, a]) => !a.saved)
    .sort(([, a], [, b]) => b.askedAt - a.askedAt)
    .slice(0, maxUnsaved);
  const tombstones = entries
    .filter(([, a]) => a.deleted)
    .sort(([, a], [, b]) => b.updatedAt - a.updatedAt)
    .slice(0, maxTombstones);
  const keep = new Set([...live.filter(([, a]) => a.saved), ...unsaved, ...tombstones].map(([id]) => id));
  if (keep.size === Object.keys(answers).length) return answers;
  return Object.fromEntries(entries.filter(([id]) => keep.has(id)));
}

export function addAnswer(
  answers: Record<string, AiAnswer>,
  id: string,
  entry: Pick<AiAnswer, "question" | "answer" | "reference" | "rangeId" | "translation">,
  now: number
): Record<string, AiAnswer> {
  const clean: AiAnswer = { question: entry.question, answer: entry.answer, askedAt: now, updatedAt: now };
  if (entry.reference) clean.reference = entry.reference;
  if (entry.rangeId) clean.rangeId = entry.rangeId;
  if (entry.translation) clean.translation = entry.translation;
  return pruneAnswers({ ...answers, [id]: clean });
}

export function setAnswerSaved(
  answers: Record<string, AiAnswer>,
  id: string,
  saved: boolean,
  now: number
): Record<string, AiAnswer> {
  const existing = answers[id];
  if (!existing || existing.deleted || !!existing.saved === saved) return answers;
  const next: AiAnswer = { ...existing, saved, updatedAt: now };
  if (saved) next.savedAt = now;
  else delete next.savedAt;
  return pruneAnswers({ ...answers, [id]: next });
}

export function deleteAnswer(answers: Record<string, AiAnswer>, id: string, now: number): Record<string, AiAnswer> {
  const existing = answers[id];
  if (!existing || existing.deleted) return answers;
  return pruneAnswers({
    ...answers,
    [id]: { question: "", answer: "", askedAt: existing.askedAt, updatedAt: now, deleted: true },
  });
}

/** Combines two copies by id; the more recently changed copy of each wins, then the caps apply. */
export function mergeAnswers(
  local: Record<string, AiAnswer> | undefined,
  remote: Record<string, AiAnswer> | undefined
): Record<string, AiAnswer> {
  const out: Record<string, AiAnswer> = { ...(remote ?? {}) };
  for (const [id, entry] of Object.entries(local ?? {})) {
    if (!entry || typeof entry.updatedAt !== "number") continue;
    if (!out[id] || entry.updatedAt > out[id].updatedAt) out[id] = entry;
  }
  return pruneAnswers(out);
}

/** Every answer that isn't deleted, newest first, with its passage split out. */
export function listAnswers(answers: Record<string, AiAnswer>, savedOnly = false): AnswerEntry[] {
  const out: AnswerEntry[] = [];
  for (const [id, a] of Object.entries(answers)) {
    if (!a || a.deleted || (savedOnly && !a.saved)) continue;
    const range = a.rangeId ? parseVerseRangeId(a.rangeId) : null;
    out.push(range ? { ...a, id, ...range } : { ...a, id });
  }
  return out.sort((x, y) => (savedOnly ? (y.savedAt ?? 0) - (x.savedAt ?? 0) : 0) || y.askedAt - x.askedAt);
}

/** Answers where every word of the query appears in the question, the answer or the reference. */
export function searchAnswers<T extends AiAnswer>(entries: T[], query: string): T[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return entries;
  return entries.filter((a) => {
    const hay = `${a.question}\n${a.answer}\n${a.reference ?? ""}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

/** For the Read tab: verse number -> ids of answers about verses ending there (where the marker sits). */
export function chapterAnswerMarks(
  answers: Record<string, AiAnswer>,
  book: string,
  chapter: number
): Map<number, string[]> {
  const marks = new Map<number, string[]>();
  for (const a of listAnswers(answers)) {
    if (a.book !== book || a.chapter !== chapter || a.end === undefined) continue;
    marks.set(a.end, [...(marks.get(a.end) ?? []), a.id]);
  }
  return marks;
}

/** Answers about any verse that overlaps start-end of this chapter, newest first. */
export function answersCovering(
  answers: Record<string, AiAnswer>,
  book: string,
  chapter: number,
  start: number,
  end = start
): AnswerEntry[] {
  return listAnswers(answers).filter(
    (a) => a.book === book && a.chapter === chapter && (a.start ?? 0) <= end && (a.end ?? 0) >= start
  );
}

/** The question as shown under its passage: "About John 3:16: Why?" reads "Why?" next to John 3:16. */
export function displayQuestion(entry: Pick<AiAnswer, "question" | "reference">): string {
  if (!entry.reference) return entry.question;
  const prefix = `About ${entry.reference}:`;
  return entry.question.startsWith(prefix) ? entry.question.slice(prefix.length).trim() || entry.question : entry.question;
}

/** The answer as plain text: no **bold** markers or heading marks. */
export function plainAnswer(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** The note text after adding an answer to it (unchanged when the answer is already in the note). */
export function noteWithAnswer(existing: string, entry: Pick<AiAnswer, "question" | "answer">): { text: string; added: boolean } {
  const body = plainAnswer(entry.answer);
  const current = existing.trim();
  if (body && current.includes(body)) return { text: current, added: false };
  const block = `Ask AI: ${entry.question.trim()}\n${body}`;
  return { text: current ? `${current}\n\n${block}` : block, added: true };
}

/**
 * Answers from the conversation kept on this device before history existed: each answer paired
 * with the question just before it. Ids come from the answer messages, so running it twice
 * adds nothing new.
 */
export function answersFromChat(
  messages: { id: string; role: "user" | "assistant"; content: string; verseReference?: string; createdAt: string }[]
): Record<string, AiAnswer> {
  const out: Record<string, AiAnswer> = {};
  let lastQuestion: (typeof messages)[number] | null = null;
  for (const m of messages) {
    if (m.role === "user") {
      lastQuestion = m;
      continue;
    }
    if (!lastQuestion || !m.content) continue;
    const at = Date.parse(m.createdAt) || Date.now();
    const passage = answerPassage(lastQuestion.content, lastQuestion.verseReference);
    const entry: AiAnswer = { question: lastQuestion.content, answer: m.content, askedAt: at, updatedAt: at };
    if (passage?.reference) entry.reference = passage.reference;
    if (passage?.rangeId) entry.rangeId = passage.rangeId;
    out[m.id] = entry;
    lastQuestion = null;
  }
  return pruneAnswers(out);
}
