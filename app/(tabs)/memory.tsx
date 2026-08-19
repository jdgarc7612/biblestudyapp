import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppStore, StudyMode, TypeSubMode } from "../../store/useAppStore";
import { daysUntilDue, isDue } from "../../lib/srs";

const MODES: { mode: StudyMode; label: string; description: string }[] = [
  {
    mode: "blanks",
    label: "Fill in the Blanks",
    description: "Tap the missing words in the right order",
  },
  {
    mode: "type",
    label: "Type It Out",
    description: "Type each word, or just its first letter",
  },
];

const TYPE_SUBMODES: { mode: TypeSubMode; label: string; description: string }[] = [
  {
    mode: "firstLetter",
    label: "First Letter",
    description: "Type just the first letter of each word",
  },
  {
    mode: "freeType",
    label: "Free Type",
    description: "Type the entire verse from memory",
  },
];

function dueLabel(card: { repetitions: number; dueDate: string }) {
  if (card.repetitions === 0) return "New";
  if (isDue(card.dueDate)) return "Due today";
  const days = daysUntilDue(card.dueDate);
  return `Due in ${days} ${days === 1 ? "day" : "days"}`;
}

export default function MemoryScreen() {
  const router = useRouter();
  const memoryDeck = useAppStore((state) => state.memoryDeck);
  const studyMode = useAppStore((state) => state.studyMode);
  const setStudyMode = useAppStore((state) => state.setStudyMode);
  const typeSubMode = useAppStore((state) => state.typeSubMode);
  const setTypeSubMode = useAppStore((state) => state.setTypeSubMode);
  const removeFromMemoryDeck = useAppStore((state) => state.removeFromMemoryDeck);

  const [sheetOpen, setSheetOpen] = useState(false);

  const dueCount = memoryDeck.filter((c) => isDue(c.dueDate)).length;
  const activeSubMode = TYPE_SUBMODES.find((s) => s.mode === typeSubMode)!;

  if (memoryDeck.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
        <View className="flex-1 items-center justify-center px-10">
          <View className="w-16 h-16 rounded-full bg-brand-earth/15 items-center justify-center mb-5">
            <Ionicons name="albums" size={28} color="#C19A6B" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Your deck is empty
          </Text>
          <Text className="text-base text-gray-400 dark:text-gray-500 text-center">
            While reading, tap any verse and choose “Add to Memory Deck” to start building your
            collection.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-1">
          Memory
        </Text>
        <Text className="text-base text-gray-400 dark:text-gray-500 mb-6">
          {dueCount > 0
            ? `${dueCount} ${dueCount === 1 ? "verse" : "verses"} due today`
            : "All caught up — nothing due today"}
        </Text>

        <Pressable
          onPress={() => router.push("/memory/review")}
          className="rounded-2xl bg-brand-blue py-4 items-center mb-8 active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">
            {dueCount > 0 ? `Review ${dueCount} due` : `Practice all ${memoryDeck.length}`}
          </Text>
        </Pressable>

        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
          Study method
        </Text>
        <View style={{ gap: 8 }} className="mb-8">
          {MODES.map(({ mode, label, description }) => {
            const active = studyMode === mode;
            const isType = mode === "type";
            return (
              <Pressable
                key={mode}
                onPress={() => {
                  setStudyMode(mode);
                  if (isType) setSheetOpen(true);
                }}
                className="flex-row items-center rounded-2xl px-4 py-3 active:opacity-80"
                style={{
                  backgroundColor: active ? "#4A6FA51A" : "transparent",
                  borderWidth: 1,
                  borderColor: active ? "#4A6FA5" : "#E5E7EB",
                }}
              >
                <View className="flex-1">
                  <Text
                    className="text-sm font-semibold text-gray-900 dark:text-white"
                    style={active ? { color: "#4A6FA5" } : undefined}
                  >
                    {label}
                  </Text>
                  <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {isType ? `${activeSubMode.label} · ${activeSubMode.description}` : description}
                  </Text>
                </View>
                {isType && (
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={active ? "#4A6FA5" : "#9CA3AF"}
                    style={{ marginRight: active ? 8 : 0 }}
                  />
                )}
                {active && <Ionicons name="checkmark-circle" size={20} color="#4A6FA5" />}
              </Pressable>
            );
          })}
        </View>

        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
          Your deck ({memoryDeck.length})
        </Text>
        <View style={{ gap: 8 }}>
          {memoryDeck.map((card) => (
            <View
              key={card.id}
              className="flex-row items-center rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-3"
            >
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                  {card.verseReference}
                </Text>
                <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {dueLabel(card)}
                </Text>
              </View>
              <Pressable
                onPress={() => removeFromMemoryDeck(card.id)}
                hitSlop={8}
                className="p-2 active:opacity-60"
              >
                <Ionicons name="trash-outline" size={18} color="#9CA3AF" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

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
            <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-4">
              Select mode
            </Text>
            {TYPE_SUBMODES.map(({ mode, label, description }, i) => {
              const selected = typeSubMode === mode;
              return (
                <Pressable
                  key={mode}
                  onPress={() => {
                    setTypeSubMode(mode);
                    setSheetOpen(false);
                  }}
                  className="flex-row items-center py-4 active:opacity-70"
                  style={
                    i < TYPE_SUBMODES.length - 1
                      ? { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" }
                      : undefined
                  }
                >
                  <View className="flex-1">
                    <Text
                      className="text-base font-semibold text-gray-900 dark:text-white"
                      style={selected ? { color: "#4A6FA5" } : undefined}
                    >
                      {label}
                    </Text>
                    <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {description}
                    </Text>
                  </View>
                  {selected ? (
                    <Ionicons name="checkmark-circle" size={20} color="#4A6FA5" />
                  ) : (
                    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                  )}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
