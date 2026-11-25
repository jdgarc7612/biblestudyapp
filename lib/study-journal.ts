/**
 * The Study journal: guided ways to study one passage, written privately and kept per account.
 * SOAP (Scripture, Observation, Application, Prayer) is the first method. Plain helpers (no
 * React, no Supabase) so they can be tested.
 */
import type { TranslationId } from "./bible-types";
import type { Reflection } from "./reflect";
import { BOOKS, chapterTitle, formatReference, getBook } from "./bible";

export type StudyMethod = "soap";
export type SoapStep = "scripture" | "observation" | "application" | "prayer";

export interface SoapStepInfo {
  id: SoapStep;
  letter: string;
  title: string;
  prompt: string;
  /** A line under the prompt saying what the step is for. */
  help: string;
  placeholder: string;
  /** Questions to get going, shown behind the Hint button. Free, no AI. */
  tips: string[];
  /** Writing something here is needed to finish the study. */
  required: boolean;
}

export const SOAP_STEPS: SoapStepInfo[] = [
  {
    id: "scripture",
    letter: "S",
    title: "Scripture",
    prompt: "Read the passage slowly, maybe twice.",
    help: "Then copy out the words that stand out to you. Writing them helps them sink in.",
    placeholder: "The words that stood out to me",
    tips: [
      "Read it once straight through, then again slower.",
      "Which phrase did you read twice without meaning to?",
      "Is there a word you'd underline if this were your own Bible?",
    ],
    required: false,
  },
  {
    id: "observation",
    letter: "O",
    title: "Observation",
    prompt: "What do you notice in this passage?",
    help: "Stay with what the text actually says before deciding what it means for you.",
    placeholder: "I notice…",
    tips: [
      "Who is speaking, and to whom?",
      "Which words or ideas repeat?",
      "What does this show about God, or about Jesus?",
      "What comes just before and after it?",
    ],
    required: true,
  },
  {
    id: "application",
    letter: "A",
    title: "Application",
    prompt: "How does this apply to your life today?",
    help: "Think of one real situation, relationship or habit this speaks to.",
    placeholder: "This week I can…",
    tips: [
      "Is there a promise to trust, a command to follow, or an example to learn from?",
      "Where in your week does this meet you?",
      "Is there something to stop, start, or keep doing?",
    ],
    required: true,
  },
  {
    id: "prayer",
    letter: "P",
    title: "Prayer",
    prompt: "Write a prayer in response.",
    help: "Talk to God about what you read: thanks, confession, or asking for help to live it.",
    placeholder: "Lord…",
    tips: [
      "Thank God for something this passage shows about him.",
      "Ask for help with the application you just wrote.",
      "Pray it back in your own words.",
    ],
    required: true,
  },
];

export function soapStep(id: SoapStep): SoapStepInfo {
  return SOAP_STEPS.find((s) => s.id === id) ?? SOAP_STEPS[0];
}

export const OTHER_METHODS = ["Inductive study", "Discovery Bible Study", "Lectio divina"];

/**
 * AI hints a free reader can ask for in one study. Hints don't count toward the daily Ask AI
 * questions. Plus (not built yet) will lift this: pass `unlimited` once it exists.
 */
export const FREE_HINTS_PER_STUDY = 3;

export function hintLimit(unlimited = false): number {
  return unlimited ? Number.POSITIVE_INFINITY : FREE_HINTS_PER_STUDY;
}

export function hintsLeft(entry: Pick<StudyEntry, "hintsUsed">, unlimited = false): number {
  return Math.max(0, hintLimit(unlimited) - (entry.hintsUsed ?? 0));
}

/** Extra Ask AI questions for finishing a study, at most once a day. */
export const STUDY_BONUS_QUESTIONS = 1;

/** Today's Ask AI question limit, counting the bonus if a study was finished today. */
export function dailyQuestionLimit(base: number, bonusDate: string | null | undefined, today: string): number {
  return base + (bonusDate === today ? STUDY_BONUS_QUESTIONS : 0);
}

/**
 * One study of one passage. Entries are private; `visibility` is stored so sharing could be added
 * later. A deleted entry keeps only its passage and a `deleted` mark, so a sync doesn't bring it back.
 */
export interface StudyEntry {
  method: StudyMethod;
  book: string;
  chapter: number;
  start: number;
  end: number;
  /** "John 3:16-21", as shown when the study began. */
  reference: string;
  translation: TranslationId;
  scripture: string;
  observation: string;
  application: string;
  prayer: string;
  /** AI hints already shown, by step, so reopening a study never calls the AI again. */
  hints: Partial<Record<SoapStep, string>>;
  hintsUsed: number;
  /** Reflect with AI on the finished study (lib/reflect.ts), and how many were asked for. */
  reflection?: Reflection;
  reflectionsUsed?: number;
  createdAt: number;
  updatedAt: number;
  finishedAt: number | null;
  visibility: "private";
  deleted?: boolean;
}

export interface Passage {
  book: string;
  chapter: number;
  start: number;
  end: number;
}

/** `end` for a study of a whole chapter, whatever its length. */
export const WHOLE_CHAPTER = 999;

export function passageReference(p: Passage): string {
  const book = getBook(p.book);
  if (!book) return "";
  if (p.start <= 1 && p.end >= WHOLE_CHAPTER) return chapterTitle(book.name, p.chapter);
  return formatReference(book.name, p.chapter, p.start, p.end);
}

export function makeStudyId(now: number = Date.now()): string {
  return `study-${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function newSoapEntry(p: Passage, translation: TranslationId, now: number = Date.now()): StudyEntry {
  return {
    method: "soap",
    book: p.book,
    chapter: p.chapter,
    start: p.start,
    end: Math.max(p.start, p.end),
    reference: passageReference(p),
    translation,
    scripture: "",
    observation: "",
    application: "",
    prayer: "",
    hints: {},
    hintsUsed: 0,
    createdAt: now,
    updatedAt: now,
    finishedAt: null,
    visibility: "private",
  };
}

/** True once each required step has some writing. */
export function canFinish(entry: Pick<StudyEntry, SoapStep>): boolean {
  return SOAP_STEPS.every((s) => !s.required || entry[s.id].trim().length > 0);
}

/** The first step with nothing written yet, to pick a study back up there. */
export function resumeStep(entry: StudyEntry): number {
  if (entry.finishedAt) return 0;
  const i = SOAP_STEPS.findIndex((s) => s.required && !entry[s.id].trim());
  return i < 0 ? SOAP_STEPS.length - 1 : i;
}

export interface StudyListItem extends StudyEntry {
  id: string;
}

/** Every study not deleted, newest change first. */
export function listStudies(entries: Record<string, StudyEntry> | undefined): StudyListItem[] {
  return Object.entries(entries ?? {})
    .filter(([, e]) => e && !e.deleted)
    .map(([id, e]) => ({ ...e, id }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Studies of this chapter whose verses overlap start-end. */
export function studiesCovering(
  entries: Record<string, StudyEntry> | undefined,
  book: string,
  chapter: number,
  start: number,
  end: number
): StudyListItem[] {
  return listStudies(entries).filter((e) => e.book === book && e.chapter === chapter && e.start <= end && e.end >= start);
}

/** Marks a study deleted: its writing is dropped and only a small mark stays for syncing. */
export function deletedStudy(entry: StudyEntry, now: number): StudyEntry {
  return {
    ...entry,
    scripture: "",
    observation: "",
    application: "",
    prayer: "",
    hints: {},
    reflection: undefined,
    deleted: true,
    updatedAt: now,
  };
}

/** A short first line of what was written, for lists. */
export function studyPreview(entry: Pick<StudyEntry, SoapStep>): string {
  const text = entry.application.trim() || entry.observation.trim() || entry.prayer.trim() || entry.scripture.trim();
  return text.replace(/\s+/g, " ").slice(0, 140);
}

const BOOK_INDEX = new Map(BOOKS.map((b, i) => [b.id, i]));

/** Bible order, for anywhere studies are listed by passage. */
export function byStudyPassage(a: Passage, b: Passage) {
  return (BOOK_INDEX.get(a.book) ?? 0) - (BOOK_INDEX.get(b.book) ?? 0) || a.chapter - b.chapter || a.start - b.start;
}

/** Fixed hints for when the AI isn't available (offline build, or signed out). */
export function offlineHint(step: SoapStep): string {
  return soapStep(step).tips.join("\n");
}

/** The study's writing, step by step, for Reflect with AI. */
export function studyReflectAnswers(entry: Pick<StudyEntry, SoapStep>) {
  return SOAP_STEPS.map((s) => ({ prompt: `${s.title}: ${s.prompt}`, text: entry[s.id] }));
}
