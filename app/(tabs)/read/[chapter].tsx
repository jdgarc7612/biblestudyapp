import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import johnData from "../../../data/bible/john.json";
import { serifFont } from "../../../constants/fonts";
import { localDateString } from "../../../lib/date";
import { useAppStore } from "../../../store/useAppStore";

const READ_ENGAGEMENT_SECONDS = 20;

function parseCardRange(id: string): { chapter: number; start: number; end: number } | null {
  const parts = id.split("-");
  if (parts.length !== 4 || parts[0] !== "john") return null;
  const [, chapter, start, end] = parts;
  return { chapter: Number(chapter), start: Number(start), end: Number(end) };
}

export default function ChapterScreen() {
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const router = useRouter();
  const chapterNum = Number(chapter);
  const chapterData = johnData.chapters.find((c) => c.chapter === chapterNum);

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
    () => memoryDeck.map((c) => parseCardRange(c.id)).filter((r) => r !== null),
    [memoryDeck]
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

  if (!chapterData) return null;

  const hasPrev = chapterNum > 1;
  const hasNext = chapterNum < johnData.chapters.length;

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
      ? rangeStart === rangeEnd
        ? `${johnData.name} ${chapterNum}:${rangeStart}`
        : `${johnData.name} ${chapterNum}:${rangeStart}-${rangeEnd}`
      : "";
  const cardId =
    rangeStart !== null && rangeEnd !== null ? `john-${chapterNum}-${rangeStart}-${rangeEnd}` : null;
  const isInDeck = cardId ? memoryDeck.some((c) => c.id === cardId) : false;

  const goToAI = (autoAsk?: "insights") => {
    clearSelection();
    router.push({
      pathname: "/ai",
      params: {
        verseRef: verseReference,
        verseText: selectedText,
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
        translation: johnData.translation,
      });
    }
    clearSelection();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable onPress={() => router.back()} hitSlop={12} className="p-1 active:opacity-60">
          <Ionicons name="chevron-back" size={24} color="#4A6FA5" />
        </Pressable>
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          {johnData.name} {chapterNum}
        </Text>
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
          className="text-lg leading-8 text-gray-900 dark:text-gray-100"
        >
          {chapterData.verses.map((v) => {
            const saved = savedRanges.some(
              (r) => r.chapter === chapterNum && v.verse >= r.start && v.verse <= r.end
            );
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
      </ScrollView>

      {selection ? (
        <View
          {...swipeResponder.panHandlers}
          className="flex-row items-center px-4 py-3 border-t border-gray-100 dark:border-gray-800"
          style={{ userSelect: "none" }}
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
          <Link
            href={{ pathname: "/read/[chapter]", params: { chapter: String(chapterNum - 1) } }}
            replace
            asChild
          >
            <Pressable
              disabled={!hasPrev}
              className="flex-row items-center px-4 py-2 rounded-xl"
              style={{ opacity: hasPrev ? 1 : 0.3 }}
            >
              <Ionicons name="chevron-back" size={16} color="#4A6FA5" />
              <Text className="text-sm font-semibold text-brand-blue ml-1">Previous</Text>
            </Pressable>
          </Link>
          <Link
            href={{ pathname: "/read/[chapter]", params: { chapter: String(chapterNum + 1) } }}
            replace
            asChild
          >
            <Pressable
              disabled={!hasNext}
              className="flex-row items-center px-4 py-2 rounded-xl"
              style={{ opacity: hasNext ? 1 : 0.3 }}
            >
              <Text className="text-sm font-semibold text-brand-blue mr-1">Next</Text>
              <Ionicons name="chevron-forward" size={16} color="#4A6FA5" />
            </Pressable>
          </Link>
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
