import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppStore } from "../../store/useAppStore";
import { isDue, Grade } from "../../lib/srs";
import { WordBankRecall } from "../../components/memory/word-bank-recall";
import { FirstLetterRecall } from "../../components/memory/first-letter-recall";
import { TypingRecall } from "../../components/memory/typing-recall";

export default function ReviewScreen() {
  const router = useRouter();
  const memoryDeck = useAppStore((state) => state.memoryDeck);
  const studyMode = useAppStore((state) => state.studyMode);
  const typeSubMode = useAppStore((state) => state.typeSubMode);
  const reviewCard = useAppStore((state) => state.reviewCard);
  const awardPerfectRecallBonus = useAppStore((state) => state.awardPerfectRecallBonus);

  const queue = useMemo(() => {
    const due = memoryDeck.filter((c) => isDue(c.dueDate));
    const pool = due.length > 0 ? due : memoryDeck;
    return pool.map((c) => c.id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [index, setIndex] = useState(0);
  const currentCard = memoryDeck.find((c) => c.id === queue[index]);
  const sessionGrades = useRef<Grade[]>([]);
  const perfectBonusChecked = useRef(false);

  const handleGrade = (grade: Grade) => {
    if (!currentCard) return;
    reviewCard(currentCard.id, grade);
    sessionGrades.current.push(grade);
    setIndex((i) => i + 1);
  };

  const isComplete = queue.length === 0 || index >= queue.length;

  useEffect(() => {
    if (!isComplete || queue.length === 0 || perfectBonusChecked.current) return;
    perfectBonusChecked.current = true;
    const allEasy = sessionGrades.current.length > 0 && sessionGrades.current.every((g) => g === "easy");
    if (allEasy) awardPerfectRecallBonus();
  }, [isComplete, queue.length, awardPerfectRecallBonus]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top", "bottom"]}>
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable onPress={() => router.back()} hitSlop={12} className="p-1 active:opacity-60">
          <Ionicons name="close" size={24} color="#4A6FA5" />
        </Pressable>
        <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500">
          {isComplete ? " " : `${index + 1} of ${queue.length}`}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {isComplete ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-16 h-16 rounded-full bg-brand-blue/10 items-center justify-center mb-5">
            <Ionicons name="checkmark" size={30} color="#4A6FA5" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Review complete
          </Text>
          <Text className="text-base text-gray-400 dark:text-gray-500 text-center mb-8">
            {queue.length === 0
              ? "No verses in your deck yet."
              : `You reviewed ${queue.length} ${queue.length === 1 ? "verse" : "verses"}.`}
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="rounded-2xl bg-brand-blue px-8 py-4 active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">Done</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {currentCard && (
            <>
              <Text className="text-sm font-semibold text-brand-blue mb-4">
                {currentCard.verseReference}
              </Text>
              {studyMode === "type" && typeSubMode === "freeType" && (
                <TypingRecall card={currentCard} onGrade={handleGrade} />
              )}
              {studyMode === "type" && typeSubMode === "firstLetter" && (
                <FirstLetterRecall card={currentCard} onGrade={handleGrade} />
              )}
              {studyMode === "blanks" && (
                <WordBankRecall card={currentCard} onGrade={handleGrade} />
              )}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
