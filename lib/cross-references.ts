/**
 * Cross-references from OpenBible.info (CC BY), built by scripts/crossrefs/build_cross_references.py.
 * One small file per book, loaded the first time a verse in that book is studied, then cached.
 * Everything runs on the device: no server and no AI cost.
 */
import { useEffect, useState } from "react";

import { crossRefLoaders, type CrossRefBook } from "../data/crossrefs/loaders";
import { BOOKS, formatReference, loadBook, type BookMeta, type TranslationId } from "./bible";

export interface CrossReference {
  book: BookMeta;
  chapter: number;
  verse: number;
  /** Last verse of a range; equals `verse` for a single verse. */
  endChapter: number;
  endVerse: number;
  /** "Romans 5:8" or "Psalm 23:1-4". */
  label: string;
}

const cache = new Map<string, CrossRefBook>();
const inflight = new Map<string, Promise<CrossRefBook>>();

function loadCrossRefBook(bookId: string): Promise<CrossRefBook> {
  const cached = cache.get(bookId);
  if (cached) return Promise.resolve(cached);
  const pending = inflight.get(bookId);
  if (pending) return pending;
  const loader = crossRefLoaders[bookId];
  if (!loader) return Promise.reject(new Error(`Unknown book: ${bookId}`));
  const promise = loader()
    .then((mod) => {
      const data = ((mod as { default?: CrossRefBook }).default ?? mod) as CrossRefBook;
      cache.set(bookId, data);
      inflight.delete(bookId);
      return data;
    })
    .catch((err) => {
      inflight.delete(bookId);
      throw err;
    });
  inflight.set(bookId, promise);
  return promise;
}

function decode(ref: string): CrossReference | null {
  const [start, end] = ref.split("-");
  const [b, c, v] = start.split(".").map(Number);
  const book = BOOKS[b];
  if (!book) return null;
  let endChapter = c;
  let endVerse = v;
  if (end) {
    const parts = end.split(".").map(Number);
    if (parts.length === 2) [endChapter, endVerse] = parts;
    else endVerse = parts[0];
  }
  const label =
    endChapter === c
      ? formatReference(book.name, c, v, endVerse)
      : `${formatReference(book.name, c, v)}-${endChapter}:${endVerse}`;
  return { book, chapter: c, verse: v, endChapter, endVerse, label };
}

/** The best cross-references for a verse range, strongest links first, without repeats. */
export function crossReferencesFor(data: CrossRefBook, chapter: number, start: number, end = start) {
  const row = data.c[chapter - 1] ?? [];
  const lists: string[][] = [];
  for (let v = start; v <= end; v++) lists.push(row[v - 1] ? row[v - 1].split(" ") : []);
  // Interleave the verses' lists so a range shows the best link of each verse first.
  const seen = new Set<string>();
  const out: CrossReference[] = [];
  const longest = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < longest; i++) {
    for (const list of lists) {
      const ref = list[i];
      if (!ref || seen.has(ref)) continue;
      seen.add(ref);
      const decoded = decode(ref);
      if (decoded) out.push(decoded);
    }
  }
  return out;
}

export function useCrossReferences(bookId: string, chapter: number, start: number | null, end: number | null) {
  const [data, setData] = useState<CrossRefBook | undefined>(() => cache.get(bookId));
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setError(false);
    if (cache.has(bookId)) {
      setData(cache.get(bookId));
      return;
    }
    loadCrossRefBook(bookId)
      .then((d) => active && setData(d))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [bookId]);
  const refs = data && start !== null ? crossReferencesFor(data, chapter, start, end ?? start) : [];
  return { refs, loading: !data && !error, error };
}

/** The text of a cross-reference in the reader's translation (loads that book if needed). */
export async function crossReferenceText(ref: CrossReference, translation: TranslationId) {
  const book = await loadBook(translation, ref.book.id);
  const parts: string[] = [];
  for (let c = ref.chapter; c <= ref.endChapter; c++) {
    const verses = book.c[c - 1] ?? [];
    const from = c === ref.chapter ? ref.verse : 1;
    const to = c === ref.endChapter ? ref.endVerse : verses.length;
    for (let v = from; v <= to; v++) if (verses[v - 1]) parts.push(verses[v - 1]);
  }
  return parts.join(" ");
}

export function useCrossReferenceText(ref: CrossReference | null, translation: TranslationId) {
  const [text, setText] = useState<string | null>(null);
  const key = ref ? `${ref.label}:${translation}` : "";
  useEffect(() => {
    if (!ref) return;
    let active = true;
    setText(null);
    crossReferenceText(ref, translation)
      .then((t) => active && setText(t))
      .catch(() => active && setText(""));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return text;
}
