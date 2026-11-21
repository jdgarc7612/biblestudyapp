import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { StudyPanel, type OpenTarget, type StudyTab } from "../../../../components/read/study-panel";
import { VerseActionSheet, type SheetStatus } from "../../../../components/read/verse-action-sheet";
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
import { selectionNoteStatus } from "../../../../lib/notes";
import { copyText, shareText } from "../../../../lib/share";
import {
  chapterHighlights,
  formatVerseShare,
  highlightSwatch,
  isSaved,
  listSaved,
  selectionHighlight,
  type HighlightColor,
} from "../../../../lib/verse-marks";
import { useAppStore } from "../../../../store/useAppStore";

const READ_ENGAGEMENT_SECONDS = 20;
const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

// Stops the browser from highlighting text while dragging the action bar on the web.
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
  const scrollYRef = useRef(0);
  useEffect(() => {
    engagementLoggedRef.current = false;
    const timer = setTimeout(() => {
      engagementLoggedRef.current = true;
      logReadEngagement();
    }, READ_ENGAGEMENT_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [chapterNum, logReadEngagement]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollYRef.current = e.nativeEvent.contentOffset.y;
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
  // sheetOpen: the Study panel. actionsOpen: the bar dragged up into the larger action sheet.
  const [sheetOpen, setSheetOpen] = useState(openStudy);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [status, setStatus] = useState<SheetStatus>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showStatus = (next: SheetStatus) => {
    if (statusTimer.current) clearTimeout(statusTimer.current);
    setStatus(next);
    if (next) statusTimer.current = setTimeout(() => setStatus(null), 2600);
  };
  useEffect(() => () => {
    if (statusTimer.current) clearTimeout(statusTimer.current);
  }, []);
  const { height: windowHeight } = useWindowDimensions();
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

  // Highlights and Saved (lib/verse-marks.ts). `savedRanges` below is the Memory deck, not Saved.
  const verseHighlights = useAppStore((state) => state.verseHighlights);
  const savedVerses = useAppStore((state) => state.savedVerses);
  const setVerseHighlight = useAppStore((state) => state.setVerseHighlight);
  const saveVerse = useAppStore((state) => state.saveVerse);
  const unsaveVerse = useAppStore((state) => state.unsaveVerse);
  const setTranslation = useAppStore((state) => state.setTranslation);
  const highlightColors = useMemo(
    () => chapterHighlights(verseHighlights, bookId, chapterNum),
    [verseHighlights, bookId, chapterNum]
  );
  const bookmarkEnds = useMemo(
    () =>
      new Set(
        listSaved(savedVerses)
          .filter((s) => s.book === bookId && s.chapter === chapterNum)
          .map((s) => s.end)
      ),
    [savedVerses, bookId, chapterNum]
  );

  const savedRanges = useMemo(
    () =>
      memoryDeck
        .map((c) => parseVerseRangeId(c.id))
        .filter((r) => r !== null && r.book === bookId && r.chapter === chapterNum),
    [memoryDeck, bookId, chapterNum]
  );

  // Drag the selection bar up to open the action sheet, down to close it (or, when it's already
  // closed, to put the selection away). Works with touch and with a mouse on the web.
  const gestureRef = useRef({ expand: () => {}, collapse: () => {} });
  gestureRef.current = {
    expand: () => setActionsOpen(true),
    collapse: () => {
      if (actionsOpen) setActionsOpen(false);
      else clearSelection();
    },
  };
  const dragResponder = useRef(
    PanResponder.create({
      // Capture phase so this claims the gesture before the nested Pressable's
      // own tap handling does — a plain (bubble-phase) onMoveShouldSetPanResponder
      // never gets consulted once a child Touchable has already claimed the responder.
      onMoveShouldSetPanResponderCapture: (_, gesture) =>
        Math.abs(gesture.dy) > 12 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -20) gestureRef.current.expand();
        else if (gesture.dy > 30) gestureRef.current.collapse();
      },
    })
  ).current;

  // Where the last tapped verse sits, so opening the sheet can keep it in view.
  const tapRef = useRef<{ pageY: number; scrollY: number } | null>(null);
  const readerRef = useRef<View>(null);
  const keepSelectionInView = () => {
    const tap = tapRef.current;
    if (!actionsOpen || !tap || !readerRef.current) return;
    readerRef.current.measureInWindow((_x, y, _w, h) => {
      const verseY = tap.pageY - (scrollYRef.current - tap.scrollY);
      const overflow = verseY + 36 - (y + h);
      if (overflow > 0) scrollRef.current?.scrollTo({ y: scrollYRef.current + overflow + 16, animated: true });
    });
  };

  const prev = neighbour(bookId, chapterNum, -1);
  const next = neighbour(bookId, chapterNum, 1);

  const handleVersePress = (verseNum: number, event?: GestureResponderEvent) => {
    const pageY = event?.nativeEvent?.pageY;
    if (typeof pageY === "number") tapRef.current = { pageY, scrollY: scrollYRef.current };
    if (!selection) {
      setSelection({ anchor: verseNum, focus: verseNum });
      return;
    }
    if (selection.anchor === selection.focus && selection.anchor === verseNum) {
      setSelection(null);
      setSheetOpen(false);
      setActionsOpen(false);
      return;
    }
    setSelection({ anchor: selection.anchor, focus: verseNum });
  };

  const clearSelection = () => {
    setSelection(null);
    setSheetOpen(false);
    setActionsOpen(false);
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
  const noteStatus =
    rangeStart !== null && rangeEnd !== null
      ? selectionNoteStatus(verseNotes, bookId, chapterNum, rangeStart, rangeEnd)
      : { own: false, count: 0 };

  const selectionColor =
    rangeStart !== null && rangeEnd !== null ? selectionHighlight(highlightColors, rangeStart, rangeEnd) : null;
  const selectionHasHighlight =
    rangeStart !== null && rangeEnd !== null
      ? selectedVerses.some((v) => highlightColors.has(v.verse))
      : false;
  const isSavedSelection = isSaved(savedVerses, cardId);

  const highlightSelection = (color: HighlightColor | null) => {
    if (rangeStart === null || rangeEnd === null) return;
    setVerseHighlight(bookId, chapterNum, rangeStart, rangeEnd, color);
    showStatus(
      color
        ? { tone: "ok", text: `Highlighted ${highlightSwatch(color)?.name.toLowerCase() ?? ""}` }
        : { tone: "ok", text: "Highlight removed" }
    );
  };

  const toggleSaved = () => {
    if (!cardId) return;
    if (isSavedSelection) {
      unsaveVerse(cardId);
      showStatus({ tone: "ok", text: "Removed from Saved" });
    } else {
      saveVerse(cardId, { reference: verseReference, translation, text: selectedText });
      showStatus({ tone: "ok", text: "Saved. Find it next to your notes" });
    }
  };

  const shareMessage = () => formatVerseShare(verseReference, translation, selectedVerses);
  const copySelection = async () => {
    const result = await copyText(shareMessage());
    showStatus(
      result === "copied"
        ? { tone: "ok", text: `Copied ${verseReference} (${translation})` }
        : { tone: "error", text: "Couldn't copy here. Try Share instead." }
    );
  };
  const shareSelection = async () => {
    const result = await shareText(shareMessage());
    if (result === "shared") showStatus({ tone: "ok", text: "Shared" });
    else if (result === "copied") showStatus({ tone: "ok", text: "No share sheet here, so it's copied instead" });
    else if (result === "failed") showStatus({ tone: "error", text: "Couldn't share. Try Copy instead." });
  };

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

      <View ref={readerRef} className="flex-1" onLayout={keepSelectionInView}>
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
            // In the Memory deck (earth wash), not the Saved list.
            const inMemory = savedRanges.some((r) => r && v.verse >= r.start && v.verse <= r.end);
            const highlight = highlightSwatch(highlightColors.get(v.verse));
            const bookmarked = bookmarkEnds.has(v.verse);
            const inSelection =
              rangeStart !== null && rangeEnd !== null && v.verse >= rangeStart && v.verse <= rangeEnd;
            return (
              <Text
                key={v.verse}
                onPress={(ev) => handleVersePress(v.verse, ev)}
                style={
                  inSelection
                    ? { backgroundColor: "#4A6FA533" }
                    : highlight
                      ? { backgroundColor: highlight.wash }
                      : inMemory
                        ? { backgroundColor: "#C19A6B33" }
                        : undefined
                }
              >
                <Text className="text-xs font-bold text-brand-earth">{v.verse} </Text>
                {v.text}
                {highlight && inMemory && !inSelection ? (
                  <Text accessibilityLabel="In Memory" className="text-xs">
                    {" "}<Ionicons name="albums" size={11} color={EARTH} />
                  </Text>
                ) : null}
                {noted ? (
                  <Text accessibilityLabel="You have a note here" className="text-xs text-brand-blue">
                    {" "}✎
                  </Text>
                ) : null}
                {bookmarked ? (
                  <Text accessibilityLabel="Saved" className="text-xs">
                    {" "}<Ionicons name="bookmark" size={11} color={BLUE} />
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
      {selection && actionsOpen ? (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setActionsOpen(false)}
          accessibilityRole="button"
          accessibilityLabel={`Hide extra actions for ${verseReference}`}
        />
      ) : null}
      </View>

      {selection ? (
        <View
          className={`border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 ${actionsOpen ? "rounded-t-3xl" : ""}`}
          style={[NO_SELECT, actionsOpen ? styles.sheetShadow : null]}
        >
        <View {...dragResponder.panHandlers}>
          <Pressable
            onPress={() => setActionsOpen((open) => !open)}
            hitSlop={{ top: 6, bottom: 2 }}
            className="items-center pt-2 pb-0.5 active:opacity-60"
            accessibilityRole="button"
            accessibilityLabel={
              actionsOpen ? `Hide extra actions for ${verseReference}` : `Show more actions for ${verseReference}`
            }
            accessibilityState={{ expanded: actionsOpen }}
          >
            <View className="flex-row items-center">
              <View className="rounded-full bg-gray-300 dark:bg-gray-600" style={{ width: 36, height: 4 }} />
            </View>
            <View className="flex-row items-center mt-0.5">
              <Ionicons name={actionsOpen ? "chevron-down" : "chevron-up"} size={12} color="#9CA3AF" />
              <Text className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 ml-0.5">
                {actionsOpen ? "Less" : "More"}
              </Text>
            </View>
          </Pressable>
        <View className="flex-row items-center px-4 pt-1 pb-3">
          <Pressable
            onPress={clearSelection}
            hitSlop={8}
            className="p-1 mr-2 active:opacity-60"
            accessibilityRole="button"
            accessibilityLabel={`Clear selection of ${verseReference}`}
          >
            <Ionicons name="close" size={20} color="#9CA3AF" />
          </Pressable>
          <Pressable
            onPress={() => openStudyPanel()}
            className="flex-1 mr-1 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel={`Open the study panel for ${verseReference}`}
          >
            <Text className="text-sm font-semibold text-brand-blue" numberOfLines={1}>
              {verseReference}
            </Text>
            <Text className="text-[10px] text-gray-400 dark:text-gray-500" numberOfLines={1}>Original words, cross-refs, context, notes</Text>
          </Pressable>
          <View className="flex-row" style={{ gap: 2 }}>
            <BarAction
              icon={isInDeck ? "albums" : "albums-outline"}
              label={isInDeck ? "In Memory" : "Memorize"}
              color={EARTH}
              onPress={() => toggleMemoryDeck()}
              accessibilityLabel={
                isInDeck ? `Remove ${verseReference} from Memory` : `Add ${verseReference} to Memory`
              }
              accessibilityState={{ selected: isInDeck }}
            />
            <BarAction
              icon={noteStatus.own ? "create" : "create-outline"}
              label={noteStatus.own ? "Edit note" : noteStatus.count ? `Notes · ${noteStatus.count}` : "Note"}
              color={BLUE}
              dot={noteStatus.count > 0}
              onPress={() => openStudyPanel("note")}
              accessibilityLabel={
                noteStatus.own
                  ? `Edit your note on ${verseReference}`
                  : noteStatus.count
                    ? `Write a note on ${verseReference}. You have ${noteStatus.count} ${noteStatus.count === 1 ? "note" : "notes"} on these verses`
                    : `Write a note on ${verseReference}`
              }
            />
            <BarAction
              icon="chatbubble-ellipses-outline"
              label="Ask AI"
              color={BLUE}
              onPress={() => goToAI()}
              accessibilityLabel={`Ask AI about ${verseReference}`}
            />
            <BarAction
              icon="school"
              label="Study"
              color={BLUE}
              filled
              onPress={() => openStudyPanel()}
              accessibilityLabel={`Study ${verseReference}: original words, cross-references, context`}
            />
          </View>
        </View>
        </View>
        {actionsOpen && cardId && rangeStart !== null && rangeEnd !== null ? (
          <VerseActionSheet
            reference={verseReference}
            previewText={selectedText}
            translation={translation}
            bookId={bookId}
            chapter={chapterNum}
            start={rangeStart}
            end={rangeEnd}
            highlight={selectionColor}
            anyHighlight={selectionHasHighlight}
            saved={isSavedSelection}
            status={status}
            maxHeight={Math.round(windowHeight * 0.45)}
            onHighlight={highlightSelection}
            onToggleSave={toggleSaved}
            onCopy={copySelection}
            onShare={shareSelection}
            onReadIn={setTranslation}
          />
        ) : null}
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

const styles = StyleSheet.create({
  sheetShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
});

/** One action on the verse selection bar: an icon with a short word under it, so nothing is a guess. */
function BarAction({
  icon,
  label,
  color,
  onPress,
  accessibilityLabel,
  accessibilityState,
  dot = false,
  filled = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityState?: { selected?: boolean };
  dot?: boolean;
  filled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8 }}
      className="items-center justify-center rounded-xl px-1 py-1 active:opacity-60"
      style={{ minWidth: 50 }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
    >
      <View
        className="items-center justify-center rounded-full"
        style={{ width: 30, height: 26, backgroundColor: filled ? color : "transparent" }}
      >
        <Ionicons name={icon} size={filled ? 16 : 20} color={filled ? "#FFFFFF" : color} />
        {dot && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 1,
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: EARTH,
            }}
          />
        )}
      </View>
      <Text className="text-[10px] font-semibold mt-0.5" style={{ color }} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
