import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import johnData from "../../data/bible/john.json";
import { serifFont } from "../../constants/fonts";
import { useAppStore } from "../../store/useAppStore";

export default function ChapterScreen() {
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const router = useRouter();
  const chapterNum = Number(chapter);
  const chapterData = johnData.chapters.find((c) => c.chapter === chapterNum);

  const memoryDeck = useAppStore((state) => state.memoryDeck);
  const addToMemoryDeck = useAppStore((state) => state.addToMemoryDeck);
  const removeFromMemoryDeck = useAppStore((state) => state.removeFromMemoryDeck);

  const [selectedVerse, setSelectedVerse] = useState<{ verse: number; text: string } | null>(
    null
  );

  if (!chapterData) return null;

  const hasPrev = chapterNum > 1;
  const hasNext = chapterNum < johnData.chapters.length;

  const cardId = selectedVerse ? `john-${chapterNum}-${selectedVerse.verse}` : null;
  const isInDeck = cardId ? memoryDeck.some((c) => c.id === cardId) : false;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top", "bottom"]}>
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable onPress={() => router.back()} hitSlop={12} className="p-1 active:opacity-60">
          <Ionicons name="chevron-back" size={24} color="#4A6FA5" />
        </Pressable>
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          {johnData.name} {chapterNum}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{ fontFamily: serifFont }}
          className="text-lg leading-8 text-gray-900 dark:text-gray-100"
        >
          {chapterData.verses.map((v) => {
            const id = `john-${chapterNum}-${v.verse}`;
            const saved = memoryDeck.some((c) => c.id === id);
            return (
              <Text
                key={v.verse}
                onPress={() => setSelectedVerse({ verse: v.verse, text: v.text })}
                style={saved ? { backgroundColor: "#C19A6B33" } : undefined}
              >
                <Text className="text-xs font-bold text-brand-earth">{v.verse} </Text>
                {v.text}{" "}
              </Text>
            );
          })}
        </Text>
      </ScrollView>

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

      <Modal
        visible={selectedVerse !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedVerse(null)}
      >
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "#00000066" }}
          onPress={() => setSelectedVerse(null)}
        >
          <Pressable
            className="bg-white dark:bg-gray-900 rounded-t-3xl px-6 pt-6"
            style={{ paddingBottom: 36 }}
          >
            {selectedVerse && (
              <>
                <Text className="text-sm font-semibold text-brand-blue mb-2">
                  {johnData.name} {chapterNum}:{selectedVerse.verse}
                </Text>
                <Text
                  style={{ fontFamily: serifFont }}
                  className="text-base leading-7 text-gray-900 dark:text-gray-100 mb-6"
                >
                  “{selectedVerse.text}”
                </Text>
                <View className="flex-row mb-3" style={{ gap: 8 }}>
                  <Pressable
                    onPress={() => {
                      const verse = selectedVerse;
                      setSelectedVerse(null);
                      router.push({
                        pathname: "/ai",
                        params: {
                          verseRef: `${johnData.name} ${chapterNum}:${verse.verse}`,
                          verseText: verse.text,
                          autoAsk: "insights",
                        },
                      });
                    }}
                    className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-70"
                    style={{ backgroundColor: "#4A6FA51A", borderWidth: 1, borderColor: "#4A6FA540" }}
                  >
                    <Ionicons name="sparkles" size={16} color="#4A6FA5" />
                    <Text className="text-sm font-semibold text-brand-blue ml-1.5">
                      Get Insights
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      const verse = selectedVerse;
                      setSelectedVerse(null);
                      router.push({
                        pathname: "/ai",
                        params: {
                          verseRef: `${johnData.name} ${chapterNum}:${verse.verse}`,
                          verseText: verse.text,
                        },
                      });
                    }}
                    className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-70"
                    style={{ backgroundColor: "#4A6FA51A", borderWidth: 1, borderColor: "#4A6FA540" }}
                  >
                    <Ionicons name="chatbubble-ellipses" size={16} color="#4A6FA5" />
                    <Text className="text-sm font-semibold text-brand-blue ml-1.5">Ask AI</Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => {
                    if (!cardId) return;
                    if (isInDeck) {
                      removeFromMemoryDeck(cardId);
                    } else {
                      addToMemoryDeck({
                        id: cardId,
                        verseReference: `${johnData.name} ${chapterNum}:${selectedVerse.verse}`,
                        verseText: selectedVerse.text,
                        translation: johnData.translation,
                      });
                    }
                    setSelectedVerse(null);
                  }}
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
                  onPress={() => setSelectedVerse(null)}
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
