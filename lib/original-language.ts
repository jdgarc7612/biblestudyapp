/**
 * Original-language (Hebrew, Aramaic, Greek) word insight, built by
 * scripts/original/build_original_language.py from the Berean Standard Bible interlinear
 * (public domain) and STEPBible's brief lexicons (CC BY 4.0).
 *
 * Every verse is stored as the BSB's English, phrase by phrase, each phrase tagged with the
 * Strong's number of the Hebrew or Greek word behind it. One file per book, plus lexicon shards
 * of 1,000 entries, all loaded on demand and cached. Everything runs on the device: no server
 * and no AI cost.
 */
import { useEffect, useState } from "react";

import {
  lexiconLoaders,
  loadMorph,
  originalLoaders,
  type LexiconEntry,
  type OriginalBook,
} from "../data/original/loaders";
import { getBook } from "./bible";

export type { LexiconEntry };
export type Language = "H" | "G";

export interface OriginalWord {
  /** The BSB's English for this word ("[the] beginning", "shall not perish"). */
  text: string;
  /** Strong's number, or 0 when the English has no single word behind it. */
  strongs: number;
  /** Parsing, such as "Verb - Qal - Perfect - third person masculine singular". */
  morph: string;
}

export interface OriginalVerse {
  verse: number;
  words: OriginalWord[];
}

export function languageOf(bookId: string): Language {
  return getBook(bookId)?.testament === "NT" ? "G" : "H";
}

export function strongsLabel(lang: Language, strongs: number) {
  return `${lang}${strongs}`;
}

const bookCache = new Map<string, OriginalBook>();
const lexCache = new Map<string, Record<string, LexiconEntry>>();
let morphTable: string[] | null = null;

async function loadOriginalBook(bookId: string) {
  const hit = bookCache.get(bookId);
  if (hit) return hit;
  const loader = originalLoaders[bookId];
  if (!loader) throw new Error(`No original-language data for ${bookId}`);
  const data = (await loader()).default;
  bookCache.set(bookId, data);
  return data;
}

async function loadMorphTable() {
  if (!morphTable) morphTable = (await loadMorph()).default;
  return morphTable;
}

export async function lookupWord(lang: Language, strongs: number): Promise<LexiconEntry | null> {
  if (!strongs) return null;
  const shard = `${lang.toLowerCase()}${Math.floor(strongs / 1000)}`;
  let entries = lexCache.get(shard);
  if (!entries) {
    const loader = lexiconLoaders[shard];
    if (!loader) return null;
    entries = (await loader()).default;
    lexCache.set(shard, entries);
  }
  return entries[String(strongs)] ?? null;
}

/** The verses' words, in BSB English order, each linked to its Hebrew or Greek word. */
export function useOriginalWords(bookId: string, chapter: number, start: number, end: number) {
  const [verses, setVerses] = useState<OriginalVerse[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setVerses(null);
    setError(false);
    Promise.all([loadOriginalBook(bookId), loadMorphTable()])
      .then(([book, morph]) => {
        if (!active) return;
        const rows = book.c[chapter - 1] ?? [];
        const out: OriginalVerse[] = [];
        for (let v = start; v <= end; v++) {
          const tokens = rows[v - 1];
          if (!tokens || tokens.length === 0) continue;
          out.push({
            verse: v,
            words: tokens.map(([text, s = 0, m = 0]) => ({ text, strongs: s, morph: morph[m] ?? "" })),
          });
        }
        setVerses(out);
      })
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [bookId, chapter, start, end]);
  return { verses, loading: verses === null && !error, error };
}

export function useLexiconEntry(lang: Language, strongs: number) {
  const [entry, setEntry] = useState<LexiconEntry | null | undefined>(undefined);
  useEffect(() => {
    let active = true;
    setEntry(undefined);
    lookupWord(lang, strongs)
      .then((e) => active && setEntry(e))
      .catch(() => active && setEntry(null));
    return () => {
      active = false;
    };
  }, [lang, strongs]);
  return entry;
}

const CONTENT = /^(Noun|Verb|Adjective|Adverb)/;

/**
 * The word in these verses most worth a first look: the least common noun, verb or adjective
 * that isn't a name. Rare words tend to be the ones a translation can't fully carry.
 */
export async function pickKeyWord(lang: Language, verses: OriginalVerse[]): Promise<number> {
  const seen = new Set<number>();
  let best = 0;
  let bestCount = Infinity;
  for (const v of verses) {
    for (const w of v.words) {
      if (!w.strongs || seen.has(w.strongs) || !CONTENT.test(w.morph)) continue;
      seen.add(w.strongs);
      const e = await lookupWord(lang, w.strongs);
      if (!e || e.p) continue;
      if (e.n < bestCount) {
        best = w.strongs;
        bestCount = e.n;
      }
    }
  }
  return best;
}

/** "Verb - Qal - Perfect - third person masculine singular" as "Verb · Qal · Perfect · 3rd person masculine singular". */
export function formatMorph(morph: string) {
  return morph
    .replace(/\s+-\s+/g, " · ")
    .replace(/\|/g, "+")
    .replace(/\bfirst person\b/gi, "1st person")
    .replace(/\bsecond person\b/gi, "2nd person")
    .replace(/\bthird person\b/gi, "3rd person");
}

/**
 * Plain-English notes on the grammar that most often changes how a verse reads.
 * Kept modest on purpose: a tense or stem colours meaning, it rarely settles it alone.
 */
const GRAMMAR: { lang: Language; test: RegExp; note: string }[] = [
  { lang: "G", test: /\bPerfect\b/, note: "Perfect tense: a completed action whose results still stand." },
  { lang: "G", test: /\bAorist\b.*\bImperative\b/, note: "Aorist command: a direct call to act, often decisively." },
  { lang: "G", test: /\bPresent\b.*\bImperative\b/, note: "Present command: keep doing this, as an ongoing habit." },
  { lang: "G", test: /\bAorist\b/, note: "Aorist tense: the action viewed as a whole, usually told as a past event." },
  { lang: "G", test: /\bImperfect\b/, note: "Imperfect tense: ongoing or repeated action in the past." },
  { lang: "G", test: /\bPresent\b.*\bParticiple\b/, note: "Present participle: an action happening alongside, or describing someone by what they keep doing." },
  { lang: "G", test: /\bPresent\b/, note: "Present tense: action viewed as in progress or ongoing." },
  { lang: "G", test: /\bFuture\b/, note: "Future tense: something that will happen, often a promise." },
  { lang: "G", test: /\bSubjunctive\b/, note: "Subjunctive mood: what may or should happen, often after 'that' or 'if'." },
  { lang: "H", test: /\bNiphal\b/, note: "Niphal stem: usually passive or reflexive (was done, did to oneself)." },
  { lang: "H", test: /\bPiel\b/, note: "Piel stem: often an intensified or deliberate form of the action." },
  { lang: "H", test: /\bHiphil\b/, note: "Hiphil stem: usually causative (to cause or make something happen)." },
  { lang: "H", test: /\bHithpael\b/, note: "Hithpael stem: usually reflexive or repeated (to do to or among oneself)." },
  { lang: "H", test: /\bJussive\b/, note: "Jussive: a wish or mild command ('let it be', 'may it be')." },
  { lang: "H", test: /\bImperative\b/, note: "Imperative: a direct command." },
  { lang: "H", test: /\bParticiple\b/, note: "Participle: ongoing action, or a person described by what they do." },
  { lang: "H", test: /\bConsecutive imperfect\b/, note: "Narrative form: carries a story forward ('and then...')." },
  { lang: "H", test: /\bconstruct\b/, note: "Construct form: joined to the next word, like English 'of' ('face of the deep')." },
];

export function grammarNote(lang: Language, morph: string): string | null {
  return GRAMMAR.find((g) => g.lang === lang && g.test.test(morph))?.note ?? null;
}

/** "john.3.16" → { bookId, chapter, verse } */
export function parseSampleRef(ref: string) {
  const [bookId, c, v] = ref.split(".");
  return { bookId, chapter: Number(c), verse: Number(v) };
}
