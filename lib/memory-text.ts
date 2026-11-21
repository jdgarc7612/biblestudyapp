/** Turns pack passages into memory cards, with the words from the person's chosen translation. */
import { useEffect, useState } from "react";

import type { PackPassage } from "../data/study/memory-packs";
import { formatReference, getBook, loadBook, verseRangeId, type TranslationId } from "./bible";
import type { NewMemoryCard } from "./memory";

/** The passage's text, or "" when every verse in it is empty in this translation. */
export async function passageText(translation: TranslationId, passage: PackPassage): Promise<string> {
  const book = await loadBook(translation, passage.book);
  const verses = book.c[passage.chapter - 1] ?? [];
  return verses
    .slice(passage.start - 1, passage.end)
    .filter((v) => v && v.trim().length > 0)
    .join(" ");
}

export function passageReference(passage: PackPassage): string {
  const book = getBook(passage.book);
  return formatReference(book?.name ?? passage.book, passage.chapter, passage.start, passage.end);
}

export function passageId(passage: PackPassage): string {
  return verseRangeId(passage.book, passage.chapter, passage.start, passage.end);
}

export async function cardForPassage(
  translation: TranslationId,
  passage: PackPassage,
  collections: string[]
): Promise<NewMemoryCard | null> {
  const text = await passageText(translation, passage);
  if (!text) return null;
  return { id: passageId(passage), verseReference: passageReference(passage), verseText: text, translation, collections };
}

/** Loads the text of several passages (for a pack's preview). */
export function usePassageTexts(translation: TranslationId, passages: PackPassage[]) {
  const key = `${translation}|${passages.map(passageId).join(",")}`;
  const [texts, setTexts] = useState<Record<string, string> | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    setTexts(null);
    setFailed(false);
    Promise.all(passages.map(async (p) => [passageId(p), await passageText(translation, p)] as const))
      .then((pairs) => live && setTexts(Object.fromEntries(pairs)))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return { texts, failed };
}
