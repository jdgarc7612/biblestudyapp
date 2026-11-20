import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { StudyPanel, type OpenTarget, type StudyTab } from "../../../../components/read/study-panel";
import { SettingCard } from "../../../../components/read/setting-card";
import { TranslationPill } from "../../../../components/read/translation-picker";
import { contextNoteForChapter } from "../../../../data/study/context-notes";
import { serifFont } from "../../../../constants/fonts";
import {
  BOOKS,
  chapterTitle,
  formatReference,
  getBook,
  parseVerseRangeId,
  useChapter,
  verseRangeId,
} from "../../../../lib/bible";
import { localDateString } from "../../../../lib/date";
import { useAppStore } from "../../../../store/useAppStore";

const READ_ENGAGEMENT_SECONDS = 20;

// Stops the browser from highlighting text while swiping the action bar on the web.
const NO_SELECT = Platform.OS === "web" ? ({ userSelect: "none" } as object) : undefined;

export async function generateStaticParams(): Promise<{ book: string; chapter: string }[]> {
  return BOOKS.flatMap((b) =>
    Array.from({ length: b.chapters }, (_, i) => ({ book: b.id, chapter: String(i + 1) }))
  );
}

/** The chapter before/after this one, crossing into the neighbouring book when needed. */
function neighbour(bookId: string, chapter: number, step: 1 | -1) {
  const index = BOOKS.findIndex((b) => b.id === bookId);
  const book = BOOKS[index];
  if (!book) return null;
  const next = chapter + step;
  if (next >= 1 && next <= book.chapters) return { book, chapter: next };
  const other = BOOKS[index + step];
  if (!other) return null;
  return { book: other, chapter: step === 1 ? 1 : other.chapters };
}

export default function ChapterScreen() {
  const { book: bookParam, chapter, v, e, study, w } = useLocalSearchParams<{
    book: string;
    chapter: string;
    /** Verse (and optional end verse) to select when the chapter opens. */
    v?: string;
    e?: string;
    /** Opens the study panel on that verse: "words", "1" (cross-references), "book" or "note". */
    study?: string;
    /** With study=words: the Strong's number of the word to open on. */
    w?: string;
  }>();
  const book = getBook(bookParam);
  const chapterNum = Number(chapter);
  if (!book || !Number.isInteger(chapterNum) || chapterNum < 1 || chapterNum > book.chapters) {
    return <Redirect href="/read" />;
  }
  const verse = Number(v);
  const endVerse = Number(e);
  const initial =
    Number.isInteger(verse) && verse > 0
      ? { anchor: verse, focus: Number.isInteger(endVerse) && endVerse >= verse ? endVerse : verse }
      : null;
  return (
    <ChapterReader
      key={`${book.id}-${chapterNum}-${v ?? ""}-${e ?? ""}`}
      bookId={book.id}
      chapterNum={chapterNum}
      initialSelection={initial}
      openStudy={!!study && !!initial}
      studyTab={study === "book" ? "book" : study === "note" ? "note" : study === "1" ? "connections" : "words"}
      initialWord={Number(w) > 0 ? Number(w) : undefined}
    />
  );
}

function ChapterReader({
  bookId,
  chapterNum,
  initialSelection,
  openStudy,
  studyTab: routeTab,
  initialWord: routeWord,
}: {
  bookId: string;
  chapterNum: number;
  initialSelection: { anchor: number; focus: number } | null;
  openStudy: boolean;
  studyTab: StudyTab;
  initialWord?: number;
}) {
  const router = useRouter();
  const book = getBook(bookId)!;
  const translation = useAppStore((state) => state.translation);
  const setLastRead = useAppStore((state) => state.setLastRead);
  const chapterData = useChapter(translation, bookId, chapterNum);
  const contextNote = contextNoteForChapter(bookId, chapterNum);

  useEffect(() => {
    setLastRead({ book: bookId, chapter: chapterNum });
  }, [bookId, chapterNum, setLastRead]);

  const memoryDeck = useAppStore((state) => state.memoryDeck);
  const addToMemoryDeck = useAppStore((state) => state.addToMemoryDeck);
  const removeFromMemoryDeck = useAppStore((state) => state.removeFromMemoryDeck);
  const logReadEngagement = useAppStore((state) => state.logReadEngagement);
  const lastReadDate = useAppStore((state) => state.lastReadDate);
  const readToday = lastReadDate === localDateString();

  const engagementLoggedRef = useRef(false);
  useEffect(() => {
    engagementLoggedRef.current = false;
    const timer = setTimeout(() => {
      engagementLoggedRef.current = true;
      logReadEngagement();
    }, READ_ENGAGEMENT_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [chapterNum, logReadEngagement]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (engagementLoggedRef.current) return;
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 40) {
      engagementLoggedRef.current = true;
      logReadEngagement();
    }
  };

  const handleMarkAsRead = () => {
    engagementLoggedRef.current = true;
    logReadEngagement();
  };

  // `anchor` is the first verse tapped; `focus` is the most recently tapped verse.
  // The selected range is always [min(anchor, focus), max(anchor, focus)].
  const [selection, setSelection] = useState<{ anchor: number; focus: number } | null>(initialSelection);
  const [sheetOpen, setSheetOpen] = useState(openStudy);
  // Which tab (and word) the study panel opens on. A context note's "word to notice" sets both.
  const [studyTab, setStudyTab] = useState<StudyTab>(routeTab);
  const [initialWord, setInitialWord] = useState<number | undefined>(routeWord);
  const openStudyPanel = (tab: StudyTab = "words", word?: number) => {
    setStudyTab(tab);
    setInitialWord(word);
    setSheetOpen(true);
  };
  const studyWord = (verseNum: number, word: number) => {
    setSelection({ anchor: verseNum, focus: verseNum });
    openStudyPanel("words", word);
  };

  const verseNotes = useAppStore((state) => state.verseNotes);
  const setLastStudy = useAppStore((state) => state.setLastStudy);
  const studyStart = selection ? Math.min(selection.anchor, selection.focus) : null;
  const studyEnd = selection ? Math.max(selection.anchor, selection.focus) : null;
  useEffect(() => {
    if (sheetOpen && studyStart !== null && studyEnd !== null) {
      setLastStudy({ book: bookId, chapter: chapterNum, start: studyStart, end: studyEnd });
    }
  }, [sheetOpen, studyStart, studyEnd, bookId, chapterNum, setLastStudy]);
  const notedRanges = useMemo(
    () =>
      Object.entries(verseNotes)
        .filter(([, note]) => note.text)
        .map(([id]) => parseVerseRangeId(id))
        .filter((r) => r !== null && r.book === bookId && r.chapter === chapterNum),
    [verseNotes, bookId, chapterNum]
  );

  // Bring a linked verse into view. Verses flow as one paragraph, so this estimates its position
  // from how far through the chapter it is, then leaves a little room above it.
  const scrollRef = useRef<ScrollView>(null);
  const textTopRef = useRef(0);
  const scrolledRef = useRef(false);
  const scrollToInitialVerse = (textHeight: number) => {
    if (scrolledRef.current || !initialSelection || chapterData.verses.length === 0) return;
    scrolledRef.current = true;
    const lastVerse = chapterData.verses[chapterData.verses.length - 1].verse;
    const fraction = (initialSelection.anchor - 1) / Math.max(1, lastVerse);
    const y = textTopRef.current + textHeight * fraction - 140;
    if (y > 80) setTimeout(() => scrollRef.current?.scrollTo({ y, animated: true }), 50);
  };

  const savedRanges = useMemo(
    () =>
      memoryDeck
        .map((c) => parseVerseRangeId(c.id))
        .filter((r) => r !== null && r.book === bookId && r.chapter === chapterNum),
    [memoryDeck, bookId, chapterNum]
  );

  const swipeResponder = useRef(
    PanResponder.create({
      // Capture phase so this claims the gesture before the nested Pressable's
      // own tap handling does — a plain (bubble-phase) onMoveShouldSetPanResponder
      // never gets consulted once a child Touchable has already claimed the responder.
      onMoveShouldSetPanResponderCapture: (_, gesture) =>
        Math.abs(gesture.dy) > 12 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -20) setSheetOpen(true);
      },
    })
  ).current;

  const prev = neighbour(bookId, chapterNum, -1);
  const next = neighbour(bookId, chapterNum, 1);

  const handleVersePress = (verseNum: number) => {
    if (!selection) {
      setSelection({ anchor: verseNum, focus: verseNum });
      return;
    }
    if (selection.anchor === selection.focus && selection.anchor === verseNum) {
      setSelection(null);
      setSheetOpen(false);
      return;
    }
    setSelection({ anchor: selection.anchor, focus: verseNum });
  };

  const clearSelection = () => {
    setSelection(null);
    setSheetOpen(false);
  };

  const rangeStart = selection ? Math.min(selection.anchor, selection.focus) : null;
  const rangeEnd = selection ? Math.max(selection.anchor, selection.focus) : null;

  const selectedVerses =
    rangeStart !== null && rangeEnd !== null
      ? chapterData.verses.filter((v) => v.verse >= rangeStart && v.verse <= rangeEnd)
      : [];
  const selectedText = selectedVerses.map((v) => v.text).join(" ");
  const verseReference =
    rangeStart !== null && rangeEnd !== null
      ? formatReference(book.name, chapterNum, rangeStart, rangeEnd)
      : "";
  const cardId =
    rangeStart !== null && rangeEnd !== null
      ? verseRangeId(bookId, chapterNum, rangeStart, rangeEnd)
      : null;
  const isInDeck = cardId ? memoryDeck.some((c) => c.id === cardId) : false;

  const goToAI = (autoAsk?: "insights", question?: string) => {
    clearSelection();
    router.push({
      pathname: "/ai",
      params: {
        verseRef: verseReference,
        verseText: selectedText,
        translation,
        ...(autoAsk ? { autoAsk } : {}),
        ...(question ? { question } : {}),
      },
    });
  };

  const openPassage = (target: OpenTarget) => {
    setSheetOpen(false);
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: {
        book: target.bookId,
        chapter: String(target.chapter),
        v: String(target.verse),
        ...(target.endVerse && target.endVerse !== target.verse ? { e: String(target.endVerse) } : {}),
        ...(target.study ? { study: target.study } : {}),
        ...(target.word ? { w: String(target.word) } : {}),
      },
    });
  };

  const toggleMemoryDeck = (keepSelection = false) => {
    if (!cardId) return;
    if (isInDeck) {
      removeFromMemoryDeck(cardId);
    } else {
      addToMemoryDeck({
        id: cardId,
        verseReference,
        verseText: selectedText,
        translation,
      });
    }
    if (!keepSelection) clearSelection();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/read"))}
          hitSlop={12}
          accessibilityLabel="Back"
          className="p-1 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={24} color="#4A6FA5" />
        </Pressable>
        <View className="flex-row items-center" style={{ gap: 10 }}>
          <Link href={{ pathname: "/read/[book]", params: { book: bookId } }} asChild>
            <Pressable hitSlop={8} accessibilityLabel={`${chapterTitle(book.name, chapterNum)}. Choose a chapter`} className="active:opacity-60">
              <Text className="text-base font-semibold text-gray-900 dark:text-white">
                {chapterTitle(book.name, chapterNum)}
              </Text>
            </Pressable>
          </Link>
          <TranslationPill compact />
        </View>
        <Pressable
          onPress={handleMarkAsRead}
          hitSlop={8}
          className="p-1 active:opacity-60"
          accessibilityLabel={readToday ? "Marked as read today" : "Mark as Read"}
        >
          <Ionicons
            name={readToday ? "checkmark-circle" : "checkmark-circle-outline"}
            size={22}
            color={readToday ? "#16A34A" : "#9CA3AF"}
          />
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        <Text
          style={{ fontFamily: serifFont }}
          className="text-3xl text-gray-900 dark:text-white mb-1"
        >
          {chapterTitle(book.name, chapterNum)}
        </Text>
        {chapterData.title ? (
          <Text
            style={{ fontFamily: serifFont }}
            className="text-base italic text-gray-500 dark:text-gray-400 mt-2 mb-2 leading-6"
          >
            {chapterData.title}
          </Text>
        ) : null}
        {contextNote ? <SettingCard note={contextNote} bookId={bookId} onWord={studyWord} /> : null}
        <View className="h-4" onLayout={(ev) => (textTopRef.current = ev.nativeEvent.layout.y)} />
        {chapterData.loading ? (
          <View className="py-16 items-center">
            <ActivityIndicator color="#4A6FA5" />
          </View>
        ) : chapterData.error ? (
          <View className="py-16 items-center">
            <Text className="text-base text-gray-500 dark:text-gray-400 mb-4 text-center">
              This chapter didn&apos;t load. Check your connection and try again.
            </Text>
            <Pressable
              onPress={chapterData.retry}
              className="rounded-xl px-5 py-2.5 active:opacity-80"
              style={{ backgroundColor: "#4A6FA5" }}
            >
              <Text className="text-sm font-semibold text-white">Try again</Text>
            </Pressable>
          </View>
        ) : (
        <Text
          style={{ fontFamily: serifFont }}
          className="text-lg leading-8 text-gray-900 dark:text-gray-100"
          onLayout={(ev) => scrollToInitialVerse(ev.nativeEvent.layout.height)}
        >
          {chapterData.verses.map((v) => {
            const noted = notedRanges.some((r) => r && v.verse === r.end);
            const saved = savedRanges.some((r) => r && v.verse >= r.start && v.verse <= r.end);
            const inSelection =
              rangeStart !== null && rangeEnd !== null && v.verse >= rangeStart && v.verse <= rangeEnd;
            return (
              <Text
                key={v.verse}
                onPress={() => handleVersePress(v.verse)}
                style={
                  inSelection
                    ? { backgroundColor: "#4A6FA533" }
                    : saved
                      ? { backgroundColor: "#C19A6B33" }
                      : undefined
                }
              >
                <Text className="text-xs font-bold text-brand-earth">{v.verse} </Text>
                {v.text}
                {noted ? (
                  <Text accessibilityLabel="You have a note here" className="text-xs text-brand-blue">
                    {" "}✎
                  </Text>
                ) : null}{" "}
              </Text>
            );
          })}
        </Text>
        )}
        {!chapterData.loading && !chapterData.error && (
          <Text className="text-[11px] text-gray-300 dark:text-gray-600 mt-8">
            {translation} · Public domain
          </Text>
        )}
      </ScrollView>

      {selection ? (
        <View
          {...swipeResponder.panHandlers}
          className="flex-row items-center px-4 py-3 border-t border-gray-100 dark:border-gray-800"
          style={NO_SELECT}
        >
          <Pressable
            onPress={clearSelection}
            hitSlop={8}
            className="p-1 mr-2 active:opacity-60"
            accessibilityLabel="Clear selection"
          >
            <Ionicons name="close" size={20} color="#9CA3AF" />
          </Pressable>
          <Pressable onPress={() => openStudyPanel()} className="flex-1 active:opacity-70">
            <Text className="text-sm font-semibold text-brand-blue" numberOfLines={1}>
              {verseReference}
            </Text>
            <Text className="text-[10px] text-gray-400 dark:text-gray-500" numberOfLines={1}>Original words, cross-refs, context, notes</Text>
          </Pressable>
          <View className="flex-row" style={{ gap: 4 }}>
            <Pressable
              onPress={() => toggleMemoryDeck()}
              hitSlop={8}
              className="p-2 active:opacity-60"
              accessibilityLabel={isInDeck ? "Remove from Memory Deck" : "Add to Memory Deck"}
            >
              <Ionicons
                name={isInDeck ? "bookmark" : "bookmark-outline"}
                size={20}
                color="#C19A6B"
              />
            </Pressable>
            <Pressable
              onPress={() => goToAI("insights")}
              hitSlop={8}
              className="p-2 active:opacity-60"
              accessibilityLabel="Get Insights"
            >
              <Ionicons name="sparkles-outline" size={20} color="#4A6FA5" />
            </Pressable>
            <Pressable
              onPress={() => goToAI()}
              hitSlop={8}
              className="p-2 active:opacity-60"
              accessibilityLabel="Ask AI"
            >
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#4A6FA5" />
            </Pressable>
            <Pressable
              onPress={() => openStudyPanel()}
              hitSlop={8}
              className="flex-row items-center rounded-full px-3 py-1.5 ml-1 active:opacity-70"
              style={{ backgroundColor: "#4A6FA5" }}
              accessibilityLabel="Study this verse"
            >
              <Ionicons name="school-outline" size={15} color="#FFFFFF" />
              <Text className="text-xs font-semibold text-white ml-1">Study</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="flex-row items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-gray-800">
          <Pressable
            disabled={!prev}
            onPress={() =>
              prev &&
              router.replace({
                pathname: "/read/[book]/[chapter]",
                params: { book: prev.book.id, chapter: String(prev.chapter) },
              })
            }
            className="flex-row items-center px-4 py-2 rounded-xl active:opacity-60"
            style={{ opacity: prev ? 1 : 0.3 }}
          >
            <Ionicons name="chevron-back" size={16} color="#4A6FA5" />
            <Text className="text-sm font-semibold text-brand-blue ml-1">
              {prev ? `${prev.book.short} ${prev.chapter}` : "Previous"}
            </Text>
          </Pressable>
          <Pressable
            disabled={!next}
            onPress={() =>
              next &&
              router.replace({
                pathname: "/read/[book]/[chapter]",
                params: { book: next.book.id, chapter: String(next.chapter) },
              })
            }
            className="flex-row items-center px-4 py-2 rounded-xl active:opacity-60"
            style={{ opacity: next ? 1 : 0.3 }}
          >
            <Text className="text-sm font-semibold text-brand-blue mr-1">
              {next ? `${next.book.short} ${next.chapter}` : "Next"}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#4A6FA5" />
          </Pressable>
        </View>
      )}

      {selection && cardId && rangeStart !== null && rangeEnd !== null && (
        <StudyPanel
          visible={sheetOpen}
          onClose={() => setSheetOpen(false)}
          bookId={bookId}
          chapter={chapterNum}
          start={rangeStart}
          end={rangeEnd}
          noteId={cardId}
          reference={verseReference}
          text={selectedText}
          translation={translation}
          isInDeck={isInDeck}
          onToggleDeck={() => toggleMemoryDeck(true)}
          onInsights={() => goToAI("insights")}
          onAsk={(question) => goToAI(undefined, question)}
          onOpen={openPassage}
          initialTab={studyTab}
          initialWord={initialWord}
        />
      )}
    </SafeAreaView>
  );
}
