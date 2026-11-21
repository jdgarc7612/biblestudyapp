import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AppState, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { serifFont } from "../../constants/fonts";
import { getBookIntro } from "../../data/study/book-intros";
import { chapterTitle, formatReference, getBook, useChapter, verseRangeId } from "../../lib/bible";
import { useCrossReferences, useCrossReferenceText, type CrossReference } from "../../lib/cross-references";
import { localDateString } from "../../lib/date";
import { listNotes, notesCovering, type NoteEntry } from "../../lib/notes";
import { finishedADayOn, getPlan, nextDay, readingsLabel } from "../../lib/plans";
import { isDue, reviewNudgeCount } from "../../lib/memory";
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
  const lastRead = useAppStore((s) => s.lastRead);
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const addToMemoryDeck = useAppStore((s) => s.addToMemoryDeck);
  const reviewDoneDate = useAppStore((s) => s.memoryReviewDoneDate);
  const nudgeDismissedDate = useAppStore((s) => s.memoryNudgeDismissedDate);
  const dismissMemoryNudge = useAppStore((s) => s.dismissMemoryNudge);
  const verseNotes = useAppStore((s) => s.verseNotes);
  const activePlan = getPlan(useAppStore((s) => s.activePlanId));
  const planProgress = useAppStore((s) => (activePlan ? s.planProgress[activePlan.id] : undefined));

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

  // Home follows a guided study first, then the reader's own study; today's verse is the way in until then.
  const planDayNumber = activePlan ? nextDay(activePlan, planProgress) : null;
  const planDay = activePlan && planDayNumber ? activePlan.days[planDayNumber - 1] : null;
  const planDoneToday = finishedADayOn(planProgress, dateKey);
  const planStudy: Passage | null = planDay
    ? {
        book: planDay.readings[0].book,
        chapter: planDay.readings[0].chapter,
        start: planDay.readings[0].start ?? 1,
        // A whole chapter: every verse (the reader's text stops at the chapter's end).
        end: planDay.readings[0].end ?? 999,
        reference: readingsLabel(planDay.readings),
      }
    : null;
  const studyBook = lastStudy ? getBook(lastStudy.book) : undefined;
  const ownStudy: Passage | null =
    planStudy ??
    (lastStudy && studyBook
      ? { ...lastStudy, reference: formatReference(studyBook.name, lastStudy.chapter, lastStudy.start, lastStudy.end) }
      : null);
  const focus = ownStudy ?? dailyPassage;
  const ownText = usePassageText(ownStudy);
  const focusText = ownStudy ? ownText : daily.text[translation];
  const openPlan = () =>
    activePlan &&
      router.push({
        pathname: "/study/plans/[id]",
        params: { id: activePlan.id, ...(planDayNumber ? { day: String(planDayNumber) } : {}) },
      });
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

        <ReviewNudge
          count={reviewNudgeCount(memoryDeck, reviewDoneDate, nudgeDismissedDate, new Date())}
          onReview={() => router.push("/memory/review")}
          onDismiss={dismissMemoryNudge}
        />

        <AskBar onAsk={(q) => router.push({ pathname: "/ai", params: { question: q } })} />

        {/* The one big card: the passage you're studying (or today's verse), with more on request. */}
        <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-5 pt-5 pb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons name={planDay ? "map" : ownStudy ? "school" : "sunny"} size={14} color={EARTH} />
              <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth ml-1.5">
                {planDay
                  ? planDoneToday
                    ? `Done for today · Day ${planDayNumber} tomorrow`
                    : `Guided study · Day ${planDayNumber} of ${activePlan!.days.length}`
                  : ownStudy
                    ? "Your study"
                    : "Today's verse"}
              </Text>
            </View>
            {focusNotes.length > 0 && (
              <Pressable
                onPress={() => open(focusNotes[0], "note")}
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
          {planDay && (
            <Pressable onPress={openPlan} className="-mt-1 mb-2 active:opacity-60" hitSlop={6}>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {planDay.title} · {activePlan!.title}
              </Text>
            </Pressable>
          )}
          <Text
            style={{ fontFamily: serifFont }}
            className="text-[17px] leading-7 text-gray-800 dark:text-gray-100 mb-4"
            numberOfLines={expanded && !planDay ? undefined : 3}
          >
            {focusText ? `“${focusText}”` : " "}
          </Text>

          <View className="flex-row" style={{ gap: 8 }}>
            <Pressable
              onPress={() => (planDay ? openPlan() : open(focus, "1"))}
              className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-80"
              style={{ backgroundColor: BLUE }}
            >
              <Ionicons name={planDay ? "book-outline" : "school-outline"} size={16} color="#FFFFFF" />
              <Text className="text-[15px] font-semibold text-white ml-2">
                {planDay
                  ? planDoneToday
                    ? "See your plan"
                    : "Today's reading"
                  : ownStudy
                    ? "Keep studying"
                    : "Study this verse"}
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

          {expanded &&
            (planDay ? (
              <GoDeeper
                passage={focus}
                onOpen={open}
                onAsk={(q) => router.push({ pathname: "/ai", params: { question: `About ${focus.reference}: ${q}` } })}
                questions={planDay.questions}
                questionsLabel="Reflect on today's reading"
              />
            ) : (
              <GoDeeper passage={focus} onOpen={open} onAsk={ask} />
            ))}
        </View>

        {/* Today's verse stays one tap away once Home is following your own study. */}
        {ownStudy && !sameAsDaily && (
          <Pressable
            onPress={() => open(dailyPassage, "1")}
            accessibilityLabel={`Today's verse, ${daily.reference}`}
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

        {/* Guided studies: one tap to browse plans until you're following one. */}
        {!activePlan && (
          <Pressable
            onPress={() => router.push("/study")}
            className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-3.5 mt-3 active:opacity-70"
          >
            <View className="w-9 h-9 rounded-full bg-brand-blue/10 items-center justify-center mr-3">
              <Ionicons name="map-outline" size={16} color={BLUE} />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">Start a guided study</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                A few minutes a day through John, Romans, the Psalms and more
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </Pressable>
        )}

        <PickUp
          lastRead={lastRead}
          dueCount={memoryDeck.filter((c) => isDue(c)).length}
          deckSize={memoryDeck.length}
          suggestion={focusText && !planDay ? { reference: focus.reference, text: focusText } : null}
          onRead={(book, chapter) =>
            router.push({ pathname: "/read/[book]/[chapter]", params: { book, chapter: String(chapter) } })
          }
          onRecap={(title) =>
            router.push({
              pathname: "/ai",
              params: { question: `Give me a short recap of ${title} so I can pick up where I left off.` },
            })
          }
          onMemory={() => router.push({ pathname: "/study", params: { tab: "memory" } })}
          onAddSuggestion={() =>
            addToMemoryDeck({
              id: verseRangeId(focus.book, focus.chapter, focus.start, focus.end),
              verseReference: focus.reference,
              verseText: focusText,
              translation,
            })
          }
        />

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

/**
 * Once a day, while memory verses are due and Review hasn't been finished today. It goes away
 * after Review (even if a missed verse comes back later) or when put away for the day.
 */
function ReviewNudge({ count, onReview, onDismiss }: { count: number; onReview: () => void; onDismiss: () => void }) {
  if (count === 0) return null;
  const verses = `${count} memory ${count === 1 ? "verse is" : "verses are"}`;
  return (
    <View
      className="flex-row items-center rounded-2xl bg-brand-earth/10 dark:bg-brand-earth/15 border border-brand-earth/25 pl-4 pr-2 py-3 mb-4"
      accessibilityRole="summary"
    >
      <View className="w-9 h-9 rounded-full items-center justify-center mr-3" style={{ backgroundColor: EARTH }}>
        <Ionicons name="albums" size={16} color="#FFFFFF" />
      </View>
      <Pressable onPress={onReview} accessibilityRole="button" accessibilityLabel={`${verses} ready for review. Start review`} className="flex-1 active:opacity-70">
        <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">{verses} ready</Text>
        <Text className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">A few minutes keeps them fresh</Text>
      </Pressable>
      <Pressable
        onPress={onReview}
        accessibilityRole="button"
        accessibilityLabel="Start review"
        className="rounded-full px-4 py-2 ml-2 active:opacity-80"
        style={{ backgroundColor: BLUE }}
      >
        <Text className="text-sm font-semibold text-white">Review</Text>
      </Pressable>
      <Pressable onPress={onDismiss} accessibilityRole="button" accessibilityLabel="Not today. Hide this reminder until tomorrow" hitSlop={8} className="p-2 ml-1 active:opacity-60">
        <Ionicons name="close" size={16} color="#9CA3AF" />
      </Pressable>
    </View>
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

/** Where to pick back up: the chapter you were reading, and your memory verses. */
function PickUp({
  lastRead,
  dueCount,
  deckSize,
  suggestion,
  onRead,
  onRecap,
  onMemory,
  onAddSuggestion,
}: {
  lastRead: { book: string; chapter: number } | null;
  dueCount: number;
  deckSize: number;
  suggestion: { reference: string; text: string } | null;
  onRead: (book: string, chapter: number) => void;
  onRecap: (title: string) => void;
  onMemory: () => void;
  onAddSuggestion: () => void;
}) {
  const readBook = lastRead ? getBook(lastRead.book) : undefined;
  const title = lastRead && readBook ? chapterTitle(readBook.name, lastRead.chapter) : null;
  const theme = lastRead ? getBookIntro(lastRead.book)?.theme : undefined;

  return (
    <View className="mt-6">
      <Text className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2.5">
        {title ? "Pick up where you left off" : "Get started"}
      </Text>
      <View className="rounded-2xl border border-gray-100 dark:border-gray-800">
        {/* Reading */}
        <Pressable
          onPress={() => (lastRead ? onRead(lastRead.book, lastRead.chapter) : onRead("john", 1))}
          className="flex-row items-center px-4 py-3.5 active:opacity-70"
        >
          <View className="w-9 h-9 rounded-full bg-brand-blue/10 items-center justify-center mr-3">
            <Ionicons name="book" size={16} color={BLUE} />
          </View>
          <View className="flex-1 mr-2">
            <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">
              {title ? `Continue ${title}` : "Start with the Gospel of John"}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400" numberOfLines={1}>
              {title ? theme ?? "Back to your place" : "A good first book: the life of Jesus"}
            </Text>
          </View>
          {title ? (
            <Pressable
              onPress={() => onRecap(title)}
              hitSlop={6}
              accessibilityLabel={`Recap ${title}`}
              className="flex-row items-center rounded-full bg-brand-earth/15 px-3 py-1.5 active:opacity-70"
            >
              <Ionicons name="sparkles" size={12} color={EARTH} />
              <Text className="text-xs font-semibold text-brand-earth ml-1">Recap</Text>
            </Pressable>
          ) : (
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          )}
        </Pressable>

        <View className="h-px bg-gray-100 dark:bg-gray-800 ml-16" />

        {/* Memory verses */}
        <Pressable onPress={onMemory} className="flex-row items-center px-4 py-3.5 active:opacity-70">
          <View className="w-9 h-9 rounded-full bg-brand-earth/15 items-center justify-center mr-3">
            <Ionicons name="albums" size={16} color={EARTH} />
          </View>
          <View className="flex-1 mr-2">
            <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">
              {dueCount
                ? `Review ${dueCount} memory ${dueCount === 1 ? "verse" : "verses"}`
                : deckSize
                  ? "Memory verses: all caught up"
                  : "Memorize your first verse"}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400" numberOfLines={1}>
              {dueCount
                ? "Due today"
                : deckSize
                  ? `${deckSize} in your deck`
                  : suggestion
                    ? `Start with ${suggestion.reference}`
                    : "Pick a verse in the Reader"}
            </Text>
          </View>
          {!deckSize && suggestion ? (
            <Pressable
              onPress={onAddSuggestion}
              hitSlop={6}
              accessibilityLabel={`Add ${suggestion.reference} to your memory verses`}
              className="flex-row items-center rounded-full px-3 py-1.5 active:opacity-80"
              style={{ backgroundColor: BLUE }}
            >
              <Ionicons name="add" size={13} color="#FFFFFF" />
              <Text className="text-xs font-semibold text-white ml-0.5">Add</Text>
            </Pressable>
          ) : (
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          )}
        </Pressable>
      </View>
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
  questions: givenQuestions,
  questionsLabel = "Questions to explore",
}: {
  passage: Passage;
  onOpen: (p: { book: string; chapter: number; start: number; end?: number }, study?: Study) => void;
  onAsk: (question: string) => void;
  /** A guided study's own questions, in place of the general ones. */
  questions?: string[];
  questionsLabel?: string;
}) {
  const { refs } = useCrossReferences(passage.book, passage.chapter, passage.start, passage.end);
  const book = getBook(passage.book)!;
  const intro = getBookIntro(passage.book);
  // A whole-chapter reading opens the study panel on its first verse.
  const anchor = passage.end >= 999 ? { ...passage, end: passage.start } : passage;
  const questions = givenQuestions ?? [
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
            {refs.length > 3 && passage.end < 999 && (
              <Pressable onPress={() => onOpen(anchor, "1")} className="py-1 active:opacity-60">
                <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">
                  See all {refs.length} →
                </Text>
              </Pressable>
            )}
          </View>
        </>
      )}

      <DeeperLabel>{questionsLabel}</DeeperLabel>
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
          onPress={() => onOpen(anchor, "book")}
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
