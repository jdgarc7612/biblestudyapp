/** Turns pack passages into memory cards, with the words from the person's chosen translation. */
import { useEffect, useState } from "react";

import type { PackPassage } from "../data/study/memory-packs";
import { formatReference, getBook, isTranslationId, loadBook, verseRangeId, type TranslationId } from "./bible";
import { parseCardId, type MemoryCard, type NewMemoryCard } from "./memory";

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

/**
 * A passage card's verses, each on its own, from the translation the card was saved in (empty
 * verses left out). Used to put a long passage together one join at a time.
 */
export function useCardVerses(card: Pick<MemoryCard, "book" | "chapter" | "start" | "end" | "translation">) {
  const translation: TranslationId = isTranslationId(card.translation) ? card.translation : "BSB";
  const key = `${translation}|${card.book}|${card.chapter}|${card.start}|${card.end}`;
  const [verses, setVerses] = useState<{ verse: number; text: string }[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    setVerses(null);
    setFailed(false);
    loadBook(translation, card.book)
      .then((book) => {
        if (!live) return;
        const chapter = book.c[card.chapter - 1] ?? [];
        const out: { verse: number; text: string }[] = [];
        for (let v = card.start; v <= card.end; v++) {
          const text = chapter[v - 1];
          if (text && text.trim()) out.push({ verse: v, text: text.trim() });
        }
        setVerses(out);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return { verses, failed };
}

/** New cards for each verse of a passage card, tagged with the passage's collections. */
export async function memberCardsFor(card: MemoryCard): Promise<NewMemoryCard[]> {
  const translation: TranslationId = isTranslationId(card.translation) ? card.translation : "BSB";
  const out: NewMemoryCard[] = [];
  for (let v = card.start; v <= card.end; v++) {
    const next = await cardForPassage(translation, { book: card.book, chapter: card.chapter, start: v, end: v }, card.collections);
    if (next) out.push(next);
  }
  return out;
}

/** New cards for these verse ids (e.g. a shared challenge), in this translation. Empty verses are skipped. */
export async function cardsForIds(translation: TranslationId, ids: string[], collections: string[]): Promise<NewMemoryCard[]> {
  const out: NewMemoryCard[] = [];
  for (const id of ids) {
    const place = parseCardId(id);
    if (!place) continue;
    const card = await cardForPassage(translation, place, collections);
    if (card) out.push(card);
  }
  return out;
}
