import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
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

import { TranslationPill } from "../../../../components/read/translation-picker";
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
  const { book: bookParam, chapter } = useLocalSearchParams<{ book: string; chapter: string }>();
  const book = getBook(bookParam);
  const chapterNum = Number(chapter);
  if (!book || !Number.isInteger(chapterNum) || chapterNum < 1 || chapterNum > book.chapters) {
    return <Redirect href="/read" />;
  }
  return <ChapterReader key={`${book.id}-${chapterNum}`} bookId={book.id} chapterNum={chapterNum} />;
}

function ChapterReader({ bookId, chapterNum }: { bookId: string; chapterNum: number }) {
  const router = useRouter();
  const book = getBook(bookId)!;
  const translation = useAppStore((state) => state.translation);
  const setLastRead = useAppStore((state) => state.setLastRead);
  const chapterData = useChapter(translation, bookId, chapterNum);

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
  const [selection, setSelection] = useState<{ anchor: number; focus: number } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

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

  const goToAI = (autoAsk?: "insights") => {
    clearSelection();
    router.push({
      pathname: "/ai",
      params: {
        verseRef: verseReference,
        verseText: selectedText,
        translation,
        ...(autoAsk ? { autoAsk } : {}),
      },
    });
  };

  const toggleMemoryDeck = () => {
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
    clearSelection();
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
        <View className="h-4" />
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
        >
          {chapterData.verses.map((v) => {
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
                {v.text}{" "}
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
          <Pressable onPress={() => setSheetOpen(true)} className="flex-1 active:opacity-70">
            <Text className="text-sm font-semibold text-brand-blue" numberOfLines={1}>
              {verseReference}
            </Text>
            <Text className="text-[10px] text-gray-400 dark:text-gray-500">Swipe up for more</Text>
          </Pressable>
          <View className="flex-row" style={{ gap: 4 }}>
            <Pressable
              onPress={toggleMemoryDeck}
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
              onPress={() => setSheetOpen(true)}
              hitSlop={8}
              className="p-2 active:opacity-60"
              accessibilityLabel="More options"
            >
              <Ionicons name="chevron-up" size={20} color="#9CA3AF" />
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

      <Modal
        visible={sheetOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setSheetOpen(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "#00000066" }}
          onPress={() => setSheetOpen(false)}
        >
          <Pressable
            className="bg-white dark:bg-gray-900 rounded-t-3xl px-6 pt-6"
            style={{ paddingBottom: 36 }}
          >
            {selection && (
              <>
                <Text className="text-sm font-semibold text-brand-blue mb-2">{verseReference}</Text>
                <Text
                  style={{ fontFamily: serifFont }}
                  className="text-base leading-7 text-gray-900 dark:text-gray-100 mb-6"
                >
                  “{selectedText}”
                </Text>
                <View className="flex-row mb-3" style={{ gap: 8 }}>
                  <Pressable
                    onPress={() => goToAI("insights")}
                    className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-70"
                    style={{ backgroundColor: "#4A6FA51A", borderWidth: 1, borderColor: "#4A6FA540" }}
                  >
                    <Ionicons name="sparkles" size={16} color="#4A6FA5" />
                    <Text className="text-sm font-semibold text-brand-blue ml-1.5">
                      Get Insights
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => goToAI()}
                    className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-70"
                    style={{ backgroundColor: "#4A6FA51A", borderWidth: 1, borderColor: "#4A6FA540" }}
                  >
                    <Ionicons name="chatbubble-ellipses" size={16} color="#4A6FA5" />
                    <Text className="text-sm font-semibold text-brand-blue ml-1.5">Ask AI</Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={toggleMemoryDeck}
                  className="rounded-2xl py-4 items-center mb-3 active:opacity-80"
                  style={{ backgroundColor: isInDeck ? "#DC262615" : "#4A6FA5" }}
                >
                  <Text
                    className="text-base font-semibold"
                    style={{ color: isInDeck ? "#DC2626" : "#FFFFFF" }}
                  >
                    {isInDeck ? "Remove from Memory Deck" : "Add to Memory Deck"}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSheetOpen(false)}
                  className="items-center py-2 active:opacity-60"
                >
                  <Text className="text-sm font-medium text-gray-400 dark:text-gray-500">
                    Cancel
                  </Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
