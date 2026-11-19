import { useEffect, useState } from "react";

import booksJson from "../data/bible/books.json";
import { bookLoaders } from "../data/bible/loaders";
import type { BookMeta, BookText, TranslationId } from "./bible-types";

export { DEFAULT_TRANSLATION } from "./bible-types";
export type { BookMeta, BookText, TranslationId } from "./bible-types";

export interface TranslationInfo {
  id: TranslationId;
  name: string;
  blurb: string;
}

export const TRANSLATIONS: TranslationInfo[] = [
  {
    id: "WEB",
    name: "World English Bible",
    blurb: "Modern, readable English. Uses the name “Yahweh” in the Old Testament.",
  },
  {
    id: "BSB",
    name: "Berean Standard Bible",
    blurb: "Clear, accurate modern English that closely follows the original languages.",
  },
  {
    id: "KJV",
    name: "King James Version",
    blurb: "The classic 1611 translation (1769 text) loved for its beauty and memorability.",
  },
];

export function getTranslation(id: TranslationId): TranslationInfo {
  return TRANSLATIONS.find((t) => t.id === id) ?? TRANSLATIONS[0];
}

export function isTranslationId(value: unknown): value is TranslationId {
  return value === "WEB" || value === "BSB" || value === "KJV";
}

export const BOOKS = booksJson as BookMeta[];
const BOOKS_BY_ID = new Map(BOOKS.map((b) => [b.id, b]));

export function getBook(id: string | undefined | null): BookMeta | undefined {
  return id ? BOOKS_BY_ID.get(id) : undefined;
}

/** "John 3", or "Psalm 23": one psalm is singular, as printed Bibles write it. */
export function chapterTitle(bookName: string, chapter: number) {
  return `${bookName === "Psalms" ? "Psalm" : bookName} ${chapter}`;
}

/** "John 3:16" or "Romans 8:28-30". */
export function formatReference(bookName: string, chapter: number, start: number, end = start) {
  const base = chapterTitle(bookName, chapter);
  return start === end ? `${base}:${start}` : `${base}:${start}-${end}`;
}

/** The memory-card id for a verse range, e.g. "john-3-16-16". */
export function verseRangeId(bookId: string, chapter: number, start: number, end: number) {
  return `${bookId}-${chapter}-${start}-${end}`;
}

export function parseVerseRangeId(
  id: string
): { book: string; chapter: number; start: number; end: number } | null {
  const parts = id.split("-");
  if (parts.length !== 4 || !getBook(parts[0])) return null;
  const [book, chapter, start, end] = parts;
  return { book, chapter: Number(chapter), start: Number(start), end: Number(end) };
}

// ---------------------------------------------------------------------------
// Loading text

const cache = new Map<string, BookText>();
const inflight = new Map<string, Promise<BookText>>();

function cacheKey(translation: TranslationId, bookId: string) {
  return `${translation}:${bookId}`;
}

export function getCachedBook(translation: TranslationId, bookId: string): BookText | undefined {
  return cache.get(cacheKey(translation, bookId));
}

export function loadBook(translation: TranslationId, bookId: string): Promise<BookText> {
  const key = cacheKey(translation, bookId);
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);
  const pending = inflight.get(key);
  if (pending) return pending;

  const loader = bookLoaders[translation]?.[bookId];
  if (!loader) return Promise.reject(new Error(`Unknown book: ${bookId}`));

  const promise = loader()
    .then((mod) => {
      const data = ((mod as { default?: BookText }).default ?? mod) as BookText;
      cache.set(key, data);
      inflight.delete(key);
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });
  inflight.set(key, promise);
  return promise;
}

export interface ChapterVerse {
  verse: number;
  text: string;
}

export interface ChapterState {
  verses: ChapterVerse[];
  title?: string;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

function toChapter(book: BookText | undefined, chapter: number) {
  const raw = book?.c[chapter - 1];
  if (!raw) return null;
  return {
    verses: raw.map((text, i) => ({ verse: i + 1, text })).filter((v) => v.text.length > 0),
    title: book?.t?.[String(chapter)],
  };
}

/** Loads one chapter of one translation. Cached books render synchronously. */
export function useChapter(translation: TranslationId, bookId: string, chapter: number): ChapterState {
  const [book, setBook] = useState<BookText | undefined>(() => getCachedBook(translation, bookId));
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const cached = getCachedBook(translation, bookId);
    setBook(cached);
    setError(false);
    if (cached) return;
    loadBook(translation, bookId)
      .then((data) => active && setBook(data))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [translation, bookId, attempt]);

  const parsed = toChapter(book, chapter);
  return {
    verses: parsed?.verses ?? [],
    title: parsed?.title,
    loading: !book && !error,
    error,
    retry: () => setAttempt((n) => n + 1),
  };
}

// ---------------------------------------------------------------------------
// Finding references in text (used to make AI answers tappable)

const NAME_LOOKUP: [string, BookMeta][] = (() => {
  const entries: [string, BookMeta][] = [];
  const add = (name: string, book: BookMeta) => entries.push([name, book]);
  for (const b of BOOKS) {
    add(b.name, b);
    add(b.short, b);
  }
  const extra: Record<string, string> = {
    Psalm: "psalms",
    "Song of Solomon": "songofsongs",
    "1 Thes": "1thessalonians",
    "2 Thes": "2thessalonians",
    Revelations: "revelation",
  };
  for (const [name, id] of Object.entries(extra)) {
    const b = getBook(id);
    if (b) add(name, b);
  }
  // Longest names first so "1 John" wins over "John".
  return entries.sort((a, b) => b[0].length - a[0].length);
})();

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const REFERENCE_RE = new RegExp(
  `\\b(${NAME_LOOKUP.map(([n]) => escapeRe(n).replace(/ /g, "\\s+")).join("|")})\\.?\\s+(\\d{1,3})(?::(\\d{1,3})(?:\\s*[-–]\\s*(\\d{1,3}))?)?`,
  "g"
);

export interface FoundReference {
  index: number;
  length: number;
  text: string;
  book: BookMeta;
  chapter: number;
  verse?: number;
}

export function findReferences(text: string): FoundReference[] {
  const found: FoundReference[] = [];
  for (const m of text.matchAll(REFERENCE_RE)) {
    const name = m[1].replace(/\s+/g, " ");
    const book = NAME_LOOKUP.find(([n]) => n === name)?.[1];
    const chapter = Number(m[2]);
    if (!book || chapter < 1 || chapter > book.chapters) continue;
    found.push({
      index: m.index ?? 0,
      length: m[0].length,
      text: m[0],
      book,
      chapter,
      verse: m[3] ? Number(m[3]) : undefined,
    });
  }
  return found;
}
