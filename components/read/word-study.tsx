import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { formatReference, getBook, type TranslationId } from "../../lib/bible";
import { useCrossReferenceText, type CrossReference } from "../../lib/cross-references";
import {
  formatMorph,
  grammarNote,
  languageOf,
  parseSampleRef,
  pickKeyWord,
  strongsLabel,
  useLexiconEntry,
  useOriginalWords,
  type Language,
  type OriginalWord,
} from "../../lib/original-language";
import type { OpenTarget } from "./study-panel";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";
const EARTH_TEXT = "#8A6A44";

interface Props {
  bookId: string;
  chapter: number;
  start: number;
  end: number;
  reference: string;
  translation: TranslationId;
  /** A Strong's number to open on (from a context note's "word to notice"). */
  initialWord?: number;
  onOpen: (t: OpenTarget) => void;
  onAsk: (question?: string) => void;
}

/** The study panel's Words tab: the verse word by word, each word opening its Hebrew or Greek. */
export function WordStudy(props: Props) {
  const lang = languageOf(props.bookId);
  const { verses, loading, error } = useOriginalWords(props.bookId, props.chapter, props.start, props.end);
  const [selected, setSelected] = useState<{ strongs: number; word: OriginalWord } | null>(null);

  // Open on the word a context note pointed to, or else on the verse's least common key word.
  useEffect(() => {
    if (!verses) return;
    let active = true;
    const find = (s: number) => {
      for (const v of verses) for (const w of v.words) if (w.strongs === s) return w;
      return null;
    };
    const choose = async () => {
      const s = props.initialWord && find(props.initialWord) ? props.initialWord : await pickKeyWord(lang, verses);
      const w = s ? find(s) : null;
      if (active) setSelected(w ? { strongs: s, word: w } : null);
    };
    choose();
    return () => {
      active = false;
    };
  }, [verses, lang, props.initialWord]);

  if (loading) {
    return (
      <View className="py-8 items-center">
        <ActivityIndicator color={BLUE} />
      </View>
    );
  }
  if (error || !verses || verses.length === 0) {
    return (
      <Text className="text-sm text-gray-500 dark:text-gray-400 py-4 leading-5">
        {error
          ? "The original-language words didn't load. Check your connection and try again."
          : "There are no original-language words for this verse."}
      </Text>
    );
  }

  const langName = lang === "G" ? "Greek" : "Hebrew";
  const multi = verses.length > 1;

  return (
    <View>
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-5">
        Tap a word to see the {langName} behind it
        {props.translation !== "BSB" ? ". Words follow the Berean Standard Bible." : "."}
      </Text>
      <View className="rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-3 mb-4">
        <Text style={{ fontFamily: serifFont }} className="text-[17px] leading-8 text-gray-800 dark:text-gray-200">
          {verses.map((v) => (
            <Text key={v.verse}>
              {multi ? <Text className="text-xs font-bold text-brand-earth">{v.verse} </Text> : null}
              {v.words.map((w, i) => {
                const active = selected?.word === w;
                const tappable = w.strongs > 0;
                return (
                  <Text key={i}>
                    <Text
                      onPress={tappable ? () => setSelected({ strongs: w.strongs, word: w }) : undefined}
                      accessibilityRole={tappable ? "button" : undefined}
                      style={
                        active
                          ? { backgroundColor: `${BLUE}26`, color: BLUE, fontWeight: "600" }
                          : tappable
                            ? { textDecorationLine: "underline", textDecorationColor: "#D1D5DB", textDecorationStyle: "dotted" }
                            : undefined
                      }
                    >
                      {w.text}
                    </Text>{" "}
                  </Text>
                );
              })}
            </Text>
          ))}
        </Text>
      </View>

      {selected ? (
        <WordCard
          key={`${selected.strongs}-${selected.word.text}`}
          lang={lang}
          word={selected.word}
          bookId={props.bookId}
          chapter={props.chapter}
          start={props.start}
          end={props.end}
          reference={props.reference}
          translation={props.translation}
          onOpen={props.onOpen}
          onAsk={props.onAsk}
        />
      ) : null}

      <Text className="text-[11px] text-gray-300 dark:text-gray-600 mt-4 leading-4">
        Word links from the Berean interlinear (public domain). Lexicon from STEPBible.org (CC BY) and
        Strong&apos;s, BDB and Thayer&apos;s (public domain).
      </Text>
    </View>
  );
}

function WordCard({
  lang,
  word,
  bookId,
  chapter,
  start,
  end,
  reference,
  translation,
  onOpen,
  onAsk,
}: {
  lang: Language;
  word: OriginalWord;
  bookId: string;
  chapter: number;
  start: number;
  end: number;
  reference: string;
  translation: TranslationId;
  onOpen: (t: OpenTarget) => void;
  onAsk: (question?: string) => void;
}) {
  const entry = useLexiconEntry(lang, word.strongs);
  if (entry === undefined) {
    return (
      <View className="py-6 items-center">
        <ActivityIndicator color={BLUE} />
      </View>
    );
  }
  if (entry === null) return null;

  const langName = lang === "G" ? "Greek" : entry.a ? "Aramaic" : "Hebrew";
  const testament = lang === "G" ? "New" : "Old";
  const grammar = grammarNote(lang, word.morph);
  const elsewhere = entry.x
    .map(parseSampleRef)
    .filter((r) => !(r.bookId === bookId && r.chapter === chapter && r.verse >= start && r.verse <= end))
    .slice(0, 3);
  const englishWord = word.text.replace(/[.,;:!?“”‘’()[\]]/g, "").trim();

  return (
    <View className="rounded-2xl px-4 py-4" style={{ backgroundColor: `${EARTH}14` }}>
      <View className="flex-row items-start justify-between mb-1">
        <Text
          style={{ fontFamily: serifFont, writingDirection: lang === "H" ? "rtl" : "ltr" }}
          className="text-3xl text-gray-900 dark:text-white"
        >
          {entry.l}
        </Text>
        <View className="rounded-full px-2.5 py-1 ml-3 mt-1" style={{ backgroundColor: `${EARTH}2E` }}>
          <Text className="text-[11px] font-semibold" style={{ color: EARTH_TEXT }}>
            {langName} · {strongsLabel(lang, word.strongs)}
          </Text>
        </View>
      </View>
      <Text className="text-base text-gray-700 dark:text-gray-300 mb-3">
        <Text className="italic">{entry.t}</Text>
        {entry.g ? <Text className="font-semibold text-gray-900 dark:text-white">{`  “${entry.g}”`}</Text> : null}
      </Text>

      {entry.d ? (
        <Section label="Meaning">
          <Text className="text-[15px] leading-6 text-gray-700 dark:text-gray-300">{entry.d}</Text>
        </Section>
      ) : null}

      {word.morph ? (
        <Section label="Form here">
          <Text className="text-sm leading-5 text-gray-700 dark:text-gray-300">{formatMorph(word.morph)}</Text>
          {grammar ? (
            <Text className="text-sm leading-5 text-gray-500 dark:text-gray-400 mt-1">{grammar}</Text>
          ) : null}
        </Section>
      ) : null}

      <Section label={`Used ${entry.n.toLocaleString()} time${entry.n === 1 ? "" : "s"} in the ${testament} Testament`}>
        {entry.r.length > 0 ? (
          <>
            <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">The BSB translates it as</Text>
            <View className="flex-row flex-wrap" style={{ gap: 6 }}>
              {entry.r.map(([w, n]) => (
                <View key={w} className="flex-row items-center rounded-full bg-white dark:bg-gray-800 px-3 py-1.5">
                  <Text className="text-xs font-semibold text-gray-800 dark:text-gray-200">{w}</Text>
                  <Text className="text-xs text-gray-400 dark:text-gray-500 ml-1">{n}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </Section>

      {elsewhere.length > 0 && (
        <Section label="Elsewhere">
          <View style={{ gap: 6 }}>
            {elsewhere.map((r) => (
              <SampleRow key={`${r.bookId}.${r.chapter}.${r.verse}`} sample={r} strongs={word.strongs} translation={translation} onOpen={onOpen} />
            ))}
          </View>
        </Section>
      )}

      <Pressable
        onPress={() =>
          onAsk(
            `In ${reference}, “${englishWord}” translates the ${langName} word ${entry.l} (${entry.t}${
              entry.g ? `, “${entry.g}”` : ""
            }). What does this word mean, and how does knowing it deepen the meaning of the verse?`
          )
        }
        className="flex-row items-center justify-center rounded-2xl py-3 mt-1 active:opacity-70"
        style={{ backgroundColor: `${BLUE}14` }}
      >
        <Ionicons name="sparkles" size={14} color={BLUE} />
        <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">
          Ask what this word adds
        </Text>
      </Pressable>
    </View>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="mb-4">
      <Text className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
        {label}
      </Text>
      {children}
    </View>
  );
}

function SampleRow({
  sample,
  strongs,
  translation,
  onOpen,
}: {
  sample: { bookId: string; chapter: number; verse: number };
  strongs: number;
  translation: TranslationId;
  onOpen: (t: OpenTarget) => void;
}) {
  const book = getBook(sample.bookId)!;
  const ref: CrossReference = {
    book,
    chapter: sample.chapter,
    verse: sample.verse,
    endChapter: sample.chapter,
    endVerse: sample.verse,
    label: formatReference(book.name, sample.chapter, sample.verse),
  };
  const text = useCrossReferenceText(ref, translation);
  return (
    <Pressable
      onPress={() => onOpen({ bookId: sample.bookId, chapter: sample.chapter, verse: sample.verse, study: "words", word: strongs })}
      className="rounded-xl bg-white dark:bg-gray-800 px-3 py-2.5 active:opacity-70"
    >
      <Text className="text-xs font-semibold text-brand-blue dark:text-blue-300 mb-0.5">{ref.label}</Text>
      {text === null ? (
        <View className="h-3 w-3/4 rounded bg-gray-100 dark:bg-gray-700 mt-1" />
      ) : (
        <Text style={{ fontFamily: serifFont }} className="text-sm leading-5 text-gray-700 dark:text-gray-300" numberOfLines={2}>
          {text}
        </Text>
      )}
    </Pressable>
  );
}
