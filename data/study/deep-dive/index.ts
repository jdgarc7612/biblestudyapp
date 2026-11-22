import { useEffect, useState } from "react";

import type { DeepDiveChapter } from "./types";

export type { DeepDiveApplicationItem, DeepDiveChapter, DeepDiveContextItem, DeepDiveTheologyItem } from "./types";

type Loader = () => Promise<{ default: DeepDiveChapter[] }>;

/**
 * Go Deeper studies, one JSON file per book, loaded only when a reader opens one
 * (the same lazy pattern as data/original/<book>.json).
 */
const deepDiveLoaders: Record<string, Loader> = {
  matthew: () => import("./matthew.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  mark: () => import("./mark.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  luke: () => import("./luke.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  john: () => import("./john.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  acts: () => import("./acts.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  romans: () => import("./romans.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  "1corinthians": () => import("./1corinthians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  "2corinthians": () => import("./2corinthians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  galatians: () => import("./galatians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  ephesians: () => import("./ephesians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  philippians: () => import("./philippians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  colossians: () => import("./colossians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  "1thessalonians": () => import("./1thessalonians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  "2thessalonians": () => import("./2thessalonians.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  "1timothy": () => import("./1timothy.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  "2timothy": () => import("./2timothy.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  titus: () => import("./titus.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
  philemon: () => import("./philemon.json") as unknown as Promise<{ default: DeepDiveChapter[] }>,
};

/**
 * Chapters that have a Go Deeper study, so the Setting card can show its button without
 * loading the book's file. tests/deep-dive.test.ts checks this matches the JSON files.
 */
/** Chapters 1..n, for books where every chapter has a study. */
const chapters = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export const DEEP_DIVE_CHAPTERS: Record<string, readonly number[]> = {
  matthew: chapters(28),
  mark: chapters(16),
  luke: chapters(24),
  john: chapters(21),
  acts: chapters(28),
  romans: chapters(16),
  "1corinthians": chapters(16),
  "2corinthians": chapters(13),
  galatians: chapters(6),
  ephesians: chapters(6),
  philippians: chapters(4),
  colossians: chapters(4),
  "1thessalonians": chapters(5),
  "2thessalonians": chapters(3),
  "1timothy": chapters(6),
  "2timothy": chapters(4),
  titus: chapters(3),
  philemon: chapters(1),
};

export function hasDeepDive(bookId: string, chapter: number): boolean {
  return DEEP_DIVE_CHAPTERS[bookId]?.includes(chapter) ?? false;
}

const cache = new Map<string, Promise<DeepDiveChapter[]>>();

export async function loadDeepDive(bookId: string, chapter: number): Promise<DeepDiveChapter | null> {
  const loader = deepDiveLoaders[bookId];
  if (!loader || !hasDeepDive(bookId, chapter)) return null;
  let book = cache.get(bookId);
  if (!book) {
    book = loader().then((m) => m.default);
    cache.set(bookId, book);
    book.catch(() => cache.delete(bookId));
  }
  return (await book).find((c) => c.chapter === chapter) ?? null;
}

/** The chapter's study once loaded: undefined while loading, null if there is none or it failed. */
export function useDeepDive(bookId: string, chapter: number, enabled = true) {
  const [study, setStudy] = useState<DeepDiveChapter | null | undefined>(undefined);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    setStudy(undefined);
    loadDeepDive(bookId, chapter)
      .then((s) => live && setStudy(s))
      .catch(() => live && setStudy(null));
    return () => {
      live = false;
    };
  }, [bookId, chapter, enabled]);
  return study;
}
