import { useEffect, useState } from "react";

import { headingLoaders } from "../data/bible/headings/loaders";

/**
 * Section headings from the Berean Standard Bible (scripts/bible/build_headings.py).
 * Chapter number -> [verse the heading sits above, heading, level].
 * level 1 = section, 2 = sub-section, 0 = one of the five books of the Psalms.
 */
export type HeadingEntry = [number, string, number];
export type BookHeadings = Record<string, HeadingEntry[]>;

export interface ChapterHeading {
  verse: number;
  text: string;
  level: number;
}

const cache = new Map<string, BookHeadings>();
const inflight = new Map<string, Promise<BookHeadings>>();

export function loadHeadings(bookId: string): Promise<BookHeadings> {
  const cached = cache.get(bookId);
  if (cached) return Promise.resolve(cached);
  const pending = inflight.get(bookId);
  if (pending) return pending;
  const loader = headingLoaders[bookId];
  if (!loader) return Promise.resolve({});
  const promise = loader()
    .then((mod) => {
      const data = ((mod as { default?: BookHeadings }).default ?? mod) as BookHeadings;
      cache.set(bookId, data);
      inflight.delete(bookId);
      return data;
    })
    .catch(() => {
      // Headings are a reading aid; the chapter still reads fine without them.
      inflight.delete(bookId);
      return {} as BookHeadings;
    });
  inflight.set(bookId, promise);
  return promise;
}

/**
 * Places each heading above the first verse shown at or after its verse. The BSB's headings
 * are used for every translation (verse numbers line up); a verse a translation leaves empty
 * passes its heading on to the next verse, and a heading past the last verse is dropped.
 */
export function placeHeadings(
  entries: HeadingEntry[] | undefined,
  shownVerses: number[]
): Map<number, ChapterHeading[]> {
  const placed = new Map<number, ChapterHeading[]>();
  if (!entries?.length || shownVerses.length === 0) return placed;
  for (const [verse, text, level] of entries) {
    const at = shownVerses.find((v) => v >= verse);
    if (at === undefined) continue;
    const list = placed.get(at) ?? [];
    list.push({ verse: at, text, level });
    placed.set(at, list);
  }
  return placed;
}

/** The headings of one chapter (empty until the book's small headings file loads). */
export function useChapterHeadings(bookId: string, chapter: number): HeadingEntry[] {
  const [book, setBook] = useState<BookHeadings | undefined>(() => cache.get(bookId));

  useEffect(() => {
    let active = true;
    const cached = cache.get(bookId);
    setBook(cached);
    if (cached) return;
    loadHeadings(bookId).then((data) => active && setBook(data));
    return () => {
      active = false;
    };
  }, [bookId]);

  return book?.[String(chapter)] ?? [];
}
