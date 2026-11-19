import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AppState, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { serifFont } from "../../constants/fonts";
import { getBookIntro } from "../../data/study/book-intros";
import { formatReference, getBook, useChapter } from "../../lib/bible";
import { useCrossReferences, useCrossReferenceText, type CrossReference } from "../../lib/cross-references";
import { localDateString } from "../../lib/date";
import { listNotes, notesCovering, type NoteEntry } from "../../lib/notes";
import { getVerseOfTheDay } from "../../lib/verse-of-the-day";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

type Study = "1" | "book" | "note";

interface Passage {
  book: string;
  chapter: number;
  start: number;
  end: number;
  reference: string;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** The text of a passage in the reader's translation (from the bundled Bible). */
function usePassageText(p: Passage | null) {
  const translation = useAppStore((s) => s.translation);
  const chapter = useChapter(translation, p?.book ?? "genesis", p?.chapter ?? 1);
  if (!p) return "";
  return chapter.verses
    .filter((v) => v.verse >= p.start && v.verse <= p.end)
    .map((v) => v.text)
    .join(" ");
}

export default function HomeScreen() {
  const router = useRouter();
  const currentReadStreak = useAppStore((s) => s.currentReadStreak);
  const currentMemoryStreak = useAppStore((s) => s.currentMemoryStreak);
  const tokenBalance = useAppStore((s) => s.tokenBalance);
  const translation = useAppStore((s) => s.translation);
  const lastStudy = useAppStore((s) => s.lastStudy);
  const verseNotes = useAppStore((s) => s.verseNotes);

  // Re-check the date when the app comes back to the foreground, so the verse
  // turns over at midnight even if the app was left open.
  const [dateKey, setDateKey] = useState(localDateString());
  useEffect(() => {
    const sub = AppState.addEventListener("change", (status) => {
      if (status === "active") setDateKey(localDateString());
    });
    return () => sub.remove();
  }, []);
  const daily = getVerseOfTheDay(new Date(`${dateKey}T12:00:00`));
  const dailyPassage: Passage = { ...daily };

  // Home follows the reader's own study once they have one; today's verse is the way in until then.
  const studyBook = lastStudy ? getBook(lastStudy.book) : undefined;
  const ownStudy: Passage | null =
    lastStudy && studyBook
      ? { ...lastStudy, reference: formatReference(studyBook.name, lastStudy.chapter, lastStudy.start, lastStudy.end) }
      : null;
  const focus = ownStudy ?? dailyPassage;
  const ownText = usePassageText(ownStudy);
  const focusText = ownStudy ? ownText : daily.text[translation];
  const sameAsDaily =
    !!ownStudy && ownStudy.book === daily.book && ownStudy.chapter === daily.chapter && ownStudy.start === daily.start;

  const allNotes = listNotes(verseNotes);
  const focusNotes = notesCovering(verseNotes, focus.book, focus.chapter, focus.start, focus.end);

  const [expanded, setExpanded] = useState(false);

  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  const open = (p: { book: string; chapter: number; start: number; end?: number }, study?: Study) =>
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: {
        book: p.book,
        chapter: String(p.chapter),
        v: String(p.start),
        ...(p.end && p.end !== p.start ? { e: String(p.end) } : {}),
        ...(study ? { study } : {}),
      },
    });

  const ask = (question: string) =>
    router.push({
      pathname: "/ai",
      params: { verseRef: focus.reference, verseText: focusText, translation, question },
    });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-start justify-between mb-5">
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-400 dark:text-gray-500">{today}</Text>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{getGreeting()}</Text>
          </View>
          <Link href="/profile" asChild>
            <Pressable
              className="flex-row items-center rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 mt-1 active:opacity-70"
              style={{ gap: 10 }}
              accessibilityLabel={`Reading streak ${currentReadStreak} days, memory streak ${currentMemoryStreak} days, ${tokenBalance} tokens`}
            >
              <Stat icon="book" color={BLUE} value={currentReadStreak} />
              <Stat icon="flame" color={EARTH} value={currentMemoryStreak} />
              <Stat icon="sparkles" color={BLUE} value={tokenBalance} />
            </Pressable>
          </Link>
        </View>

        <AskBar onAsk={(q) => router.push({ pathname: "/ai", params: { question: q } })} />

        {/* The one big card: the passage you're studying (or today's verse), with more on request. */}
        <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-5 pt-5 pb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons name={ownStudy ? "school" : "sunny"} size={14} color={EARTH} />
              <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth ml-1.5">
                {ownStudy ? "Your study" : "Today's verse"}
              </Text>
            </View>
            {focusNotes.length > 0 && (
              <Pressable
                onPress={() => open(focus, "note")}
                className="flex-row items-center active:opacity-60"
                hitSlop={8}
              >
                <Ionicons name="create-outline" size={13} color={BLUE} />
                <Text className="text-xs font-semibold text-brand-blue dark:text-blue-300 ml-1">
                  {focusNotes.length === 1 ? "Your note" : `${focusNotes.length} notes`}
                </Text>
              </Pressable>
            )}
          </View>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">{focus.reference}</Text>
          <Text
            style={{ fontFamily: serifFont }}
            className="text-[17px] leading-7 text-gray-800 dark:text-gray-100 mb-4"
            numberOfLines={expanded ? undefined : 3}
          >
            {focusText ? `“${focusText}”` : " "}
          </Text>

          <View className="flex-row" style={{ gap: 8 }}>
            <Pressable
              onPress={() => open(focus, "1")}
              className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-80"
              style={{ backgroundColor: BLUE }}
            >
              <Ionicons name="school-outline" size={16} color="#FFFFFF" />
              <Text className="text-[15px] font-semibold text-white ml-2">
                {ownStudy ? "Keep studying" : "Study this verse"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setExpanded((e) => !e)}
              accessibilityRole="button"
              accessibilityState={{ expanded }}
              className="flex-row items-center justify-center rounded-2xl px-4 py-3 bg-white/70 dark:bg-gray-900/40 active:opacity-70"
            >
              <Text className="text-[15px] font-semibold text-brand-blue dark:text-blue-300 mr-1">
                {expanded ? "Less" : "Go deeper"}
              </Text>
              <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={15} color={BLUE} />
            </Pressable>
          </View>

          {expanded && <GoDeeper passage={focus} onOpen={open} onAsk={ask} />}
        </View>

        {/* Today's verse stays one tap away once Home is following your own study. */}
        {ownStudy && !sameAsDaily && (
          <Pressable
            onPress={() => open(dailyPassage, "1")}
            className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-3.5 mt-3 active:opacity-70"
          >
            <View className="w-9 h-9 rounded-full bg-brand-earth/15 items-center justify-center mr-3">
              <Ionicons name="sunny" size={16} color={EARTH} />
            </View>
            <View className="flex-1">
              <Text className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Today&apos;s verse · {daily.reference}
              </Text>
              <Text
                style={{ fontFamily: serifFont }}
                className="text-[15px] leading-6 text-gray-800 dark:text-gray-200"
                numberOfLines={1}
              >
                {daily.text[translation]}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </Pressable>
        )}

        {allNotes.length > 0 && (
          <RecentNotes
            notes={allNotes.slice(0, 2)}
            total={allNotes.length}
            onOpen={(n) => open(n, "note")}
            onSeeAll={() => router.push("/notes")}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ icon, color, value }: { icon: keyof typeof Ionicons.glyphMap; color: string; value: number }) {
  return (
    <View className="flex-row items-center" style={{ gap: 3 }}>
      <Ionicons name={icon} size={13} color={color} />
      <Text className="text-sm font-bold text-gray-800 dark:text-gray-100">{value}</Text>
    </View>
  );
}

const EXAMPLE_QUESTIONS = ["What is grace?", "Who wrote Hebrews?", "Why did Jesus speak in parables?"];

/** Ask the study companion anything, straight from Home. */
function AskBar({ onAsk }: { onAsk: (question: string) => void }) {
  const [text, setText] = useState("");
  const submit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setText("");
    onAsk(trimmed);
  };
  return (
    <View className="mb-4">
      <View
        className="flex-row items-center rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-4 pr-1.5"
        style={{ shadowColor: "#1F2937", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 }}
      >
        <Ionicons name="sparkles" size={17} color={EARTH} />
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => submit(text)}
          placeholder="Ask anything about the Bible…"
          placeholderTextColor="#9CA3AF"
          returnKeyType="send"
          accessibilityLabel="Ask a question about the Bible"
          className="flex-1 py-3.5 ml-2.5 text-base text-gray-900 dark:text-gray-100"
        />
        <Pressable
          onPress={() => submit(text)}
          disabled={!text.trim()}
          accessibilityLabel="Ask"
          className="w-9 h-9 rounded-xl items-center justify-center active:opacity-80"
          style={{ backgroundColor: text.trim() ? BLUE : "#E5E7EB" }}
        >
          <Ionicons name="arrow-up" size={18} color={text.trim() ? "#FFFFFF" : "#9CA3AF"} />
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2.5 -mx-5"
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      >
        {EXAMPLE_QUESTIONS.map((q) => (
          <Pressable
            key={q}
            onPress={() => submit(q)}
            className="rounded-full bg-gray-50 dark:bg-gray-800 px-3.5 py-1.5 active:opacity-70"
          >
            <Text className="text-[13px] text-gray-600 dark:text-gray-300">{q}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

/** The latest notes, so what you've written stays close at hand. */
function RecentNotes({
  notes,
  total,
  onOpen,
  onSeeAll,
}: {
  notes: NoteEntry[];
  total: number;
  onOpen: (n: NoteEntry) => void;
  onSeeAll: () => void;
}) {
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between mb-2.5">
        <Text className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Recent notes
        </Text>
        <Pressable onPress={onSeeAll} hitSlop={8} className="active:opacity-60">
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">
            {total > notes.length ? `See all ${total}` : "My notes"} →
          </Text>
        </Pressable>
      </View>
      <View style={{ gap: 8 }}>
        {notes.map((n) => (
          <Pressable
            key={n.id}
            onPress={() => onOpen(n)}
            className="flex-row rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-3 active:opacity-70"
          >
            <View className="w-1 rounded-full bg-brand-earth/60 mr-3" />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 mb-0.5">{n.reference}</Text>
              <Text
                style={{ fontFamily: serifFont }}
                className="text-[15px] leading-6 text-gray-800 dark:text-gray-200"
                numberOfLines={2}
              >
                {n.text}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/** What opens under "Go deeper": linked passages, questions and the book's background. */
function GoDeeper({
  passage,
  onOpen,
  onAsk,
}: {
  passage: Passage;
  onOpen: (p: { book: string; chapter: number; start: number; end?: number }, study?: Study) => void;
  onAsk: (question: string) => void;
}) {
  const { refs } = useCrossReferences(passage.book, passage.chapter, passage.start, passage.end);
  const book = getBook(passage.book)!;
  const intro = getBookIntro(passage.book);
  const questions = [
    `What did ${passage.reference} mean to its first readers?`,
    `How does ${passage.reference} point to Jesus?`,
    `How can I live out ${passage.reference} this week?`,
  ];

  return (
    <View className="mt-5 pt-4 border-t border-brand-blue/15">
      {refs.length > 0 && (
        <>
          <DeeperLabel>Connected passages</DeeperLabel>
          <View style={{ gap: 6 }} className="mb-4">
            {refs.slice(0, 3).map((r) => (
              <ConnectedRow
                key={r.label}
                reference={r}
                onPress={() => onOpen({ book: r.book.id, chapter: r.chapter, start: r.verse, end: r.endChapter === r.chapter ? r.endVerse : undefined })}
              />
            ))}
            {refs.length > 3 && (
              <Pressable onPress={() => onOpen(passage, "1")} className="py-1 active:opacity-60">
                <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">
                  See all {refs.length} →
                </Text>
              </Pressable>
            )}
          </View>
        </>
      )}

      <DeeperLabel>Questions to explore</DeeperLabel>
      <View style={{ gap: 6 }} className="mb-4">
        {questions.map((q) => (
          <Pressable
            key={q}
            onPress={() => onAsk(q)}
            className="flex-row items-center rounded-xl bg-white/70 dark:bg-gray-900/40 px-3 py-2.5 active:opacity-70"
          >
            <Ionicons name="sparkles" size={13} color={EARTH} />
            <Text className="flex-1 text-sm text-gray-800 dark:text-gray-100 ml-2 leading-5">{q}</Text>
          </Pressable>
        ))}
      </View>

      {intro && (
        <Pressable
          onPress={() => onOpen(passage, "book")}
          className="flex-row items-center rounded-xl bg-white/70 dark:bg-gray-900/40 px-3 py-2.5 active:opacity-70"
        >
          <Ionicons name="library-outline" size={15} color={BLUE} />
          <View className="flex-1 ml-2">
            <Text className="text-sm font-semibold text-gray-900 dark:text-white">About {book.name}</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400" numberOfLines={1}>
              {intro.theme}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={15} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
}

function DeeperLabel({ children }: { children: string }) {
  return (
    <Text className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
      {children}
    </Text>
  );
}

function ConnectedRow({ reference, onPress }: { reference: CrossReference; onPress: () => void }) {
  const translation = useAppStore((s) => s.translation);
  const text = useCrossReferenceText(reference, translation);
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl bg-white/70 dark:bg-gray-900/40 px-3 py-2.5 active:opacity-70"
    >
      <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">{reference.label}</Text>
      <Text
        style={{ fontFamily: serifFont }}
        className="text-sm leading-5 text-gray-700 dark:text-gray-300"
        numberOfLines={1}
      >
        {text ?? " "}
      </Text>
    </Pressable>
  );
}
