import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { BOOKS, chapterTitle, getBook, useChapter, type BookMeta } from "../../lib/bible";
import { localDateString } from "../../lib/date";
import { getPlan, isDayOpen, nextDay, readingLabel } from "../../lib/plans";
import { passageReference, WHOLE_CHAPTER, type Passage } from "../../lib/study-journal";
import { getVerseOfTheDay } from "../../lib/verse-of-the-day";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

/** Picks what to study: a few suggestions, or any book, chapter and verses. */
export function PassagePicker({ onPick }: { onPick: (p: Passage) => void }) {
  const lastRead = useAppStore((s) => s.lastRead);
  const activePlanId = useAppStore((s) => s.activePlanId);
  const planProgress = useAppStore((s) => s.planProgress);
  const [book, setBook] = useState<BookMeta | null>(null);
  const [chapter, setChapter] = useState<number | null>(null);

  const suggestions = useMemo(() => {
    const out: { icon: keyof typeof Ionicons.glyphMap; label: string; sub: string; passage: Passage }[] = [];
    const plan = getPlan(activePlanId);
    if (plan) {
      const progress = planProgress[plan.id];
      const n = nextDay(plan, progress);
      const day = n ? plan.days[n - 1] : null;
      const r = day?.readings[0];
      if (r && n && isDayOpen(plan, progress, n, localDateString())) {
        const chapterOnly = r.start == null;
        out.push({
          icon: "map",
          label: readingLabel(r),
          sub: `Today's reading in ${plan.title}`,
          passage: { book: r.book, chapter: r.chapter, start: r.start ?? 1, end: chapterOnly ? WHOLE_CHAPTER : (r.end ?? r.start ?? 1) },
        });
      }
    }
    const v = getVerseOfTheDay();
    out.push({ icon: "sunny", label: v.reference, sub: "Verse of the day", passage: { book: v.book, chapter: v.chapter, start: v.start, end: v.end } });
    const b = getBook(lastRead?.book);
    if (lastRead && b) {
      out.push({
        icon: "book",
        label: chapterTitle(b.name, lastRead.chapter),
        sub: "Where you left off reading",
        passage: { book: lastRead.book, chapter: lastRead.chapter, start: 1, end: WHOLE_CHAPTER },
      });
    }
    return out;
  }, [activePlanId, planProgress, lastRead]);

  if (book && chapter) {
    return <VersePicker book={book} chapter={chapter} onBack={() => setChapter(null)} onPick={onPick} />;
  }

  if (book) {
    return (
      <View>
        <BackRow label="All books" onPress={() => setBook(null)} />
        <Text style={{ fontFamily: serifFont }} className="text-2xl text-gray-900 dark:text-white mb-4">
          {book.name}
        </Text>
        <View className="flex-row flex-wrap" style={{ gap: 10 }}>
          {Array.from({ length: book.chapters }, (_, i) => i + 1).map((c) => (
            <Pressable
              key={c}
              onPress={() => setChapter(c)}
              accessibilityLabel={`${book.name} chapter ${c}`}
              className="w-14 h-14 rounded-2xl items-center justify-center active:opacity-70"
              style={{ backgroundColor: "#4A6FA50D" }}
            >
              <Text className="text-base font-semibold" style={{ color: BLUE }}>
                {c}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View>
      <Label>Suggested</Label>
      <View className="rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
        {suggestions.map((s, i) => (
          <Pressable
            key={s.sub}
            onPress={() => onPick(s.passage)}
            accessibilityRole="button"
            accessibilityLabel={`Study ${s.label}. ${s.sub}`}
            className={`flex-row items-center px-4 py-3.5 active:opacity-70 ${i > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""}`}
          >
            <View className="w-9 h-9 rounded-full bg-brand-earth/15 items-center justify-center mr-3">
              <Ionicons name={s.icon} size={16} color={EARTH} />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">{s.label}</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>

      <Label>Or choose a passage</Label>
      {(["OT", "NT"] as const).map((t) => (
        <View key={t} className="mb-5">
          <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">
            {t === "OT" ? "Old Testament" : "New Testament"}
          </Text>
          <View className="flex-row flex-wrap" style={{ gap: 8 }}>
            {BOOKS.filter((b) => b.testament === t).map((b) => (
              <Pressable
                key={b.id}
                onPress={() => setBook(b)}
                accessibilityLabel={b.name}
                className="rounded-full px-3 py-1.5 bg-brand-blue/10 dark:bg-blue-300/15 active:opacity-70"
              >
                <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">{b.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

/** Tap a first verse, then a last one. A study can be one verse or a short passage. */
function VersePicker({
  book,
  chapter,
  onBack,
  onPick,
}: {
  book: BookMeta;
  chapter: number;
  onBack: () => void;
  onPick: (p: Passage) => void;
}) {
  const translation = useAppStore((s) => s.translation);
  const text = useChapter(translation, book.id, chapter);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);

  const tap = (v: number) => {
    if (start === null || end !== null) {
      setStart(v);
      setEnd(null);
    } else if (v < start) {
      setEnd(start);
      setStart(v);
    } else {
      setEnd(v);
    }
  };
  const last = end ?? start;
  const inRange = (v: number) => start !== null && last !== null && v >= start && v <= last;
  const passage = start !== null ? { book: book.id, chapter, start, end: last ?? start } : null;

  return (
    <View>
      <BackRow label={book.name} onPress={onBack} />
      <Text style={{ fontFamily: serifFont }} className="text-2xl text-gray-900 dark:text-white mb-1">
        {chapterTitle(book.name, chapter)}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Tap the first verse, then the last. A few verses is plenty.
      </Text>

      <Pressable
        onPress={() => onPick(passage ?? { book: book.id, chapter, start: 1, end: WHOLE_CHAPTER })}
        className="flex-row items-center justify-center rounded-2xl py-3.5 mb-5 active:opacity-80"
        style={{ backgroundColor: BLUE }}
      >
        <Ionicons name="create-outline" size={16} color="#FFFFFF" />
        <Text className="text-[15px] font-semibold text-white ml-2">
          {passage ? `Study ${passageReference(passage)}` : `Study all of ${chapterTitle(book.name, chapter)}`}
        </Text>
      </Pressable>

      {text.loading && text.verses.length === 0 ? (
        <ActivityIndicator color={BLUE} style={{ marginVertical: 24 }} />
      ) : (
        <View style={{ gap: 4 }}>
          {text.verses.map((v) => {
            const on = inRange(v.verse);
            return (
              <Pressable
                key={v.verse}
                onPress={() => tap(v.verse)}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                accessibilityLabel={`Verse ${v.verse}`}
                className={`flex-row rounded-xl px-3 py-2 active:opacity-70 ${on ? "bg-brand-blue/15 dark:bg-brand-blue/30" : ""}`}
              >
                <Text className="text-xs font-semibold text-brand-earth w-7 pt-1">{v.verse}</Text>
                <Text style={{ fontFamily: serifFont }} className="flex-1 text-[16px] leading-7 text-gray-800 dark:text-gray-200">
                  {v.text}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

function BackRow({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} className="flex-row items-center self-start mb-3 active:opacity-60">
      <Ionicons name="chevron-back" size={16} color={BLUE} />
      <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-0.5">{label}</Text>
    </Pressable>
  );
}

function Label({ children }: { children: string }) {
  return <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mb-2">{children}</Text>;
}
