import { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { serifFont } from "../../constants/fonts";
import { maskWord, pickBlankIndices, wordCore } from "../../lib/blank-words";
import { suggestGradeFromAccuracy } from "../../lib/verse-diff";
import { useAppStore, type MemoryCard } from "../../store/useAppStore";
import { Difficulty, Grade } from "../../lib/srs";
import { GradeButtons } from "./grade-buttons";

type WordResult = "pending" | "correct" | "incorrect";

const TIER_LABELS = ["Warm-up", "Recall", "Mastery"] as const;

function hintForFraction(fraction: number): string {
  if (fraction <= 0) return "Full verse shown";
  if (fraction >= 1) return "Verse hidden";
  return "Some words hidden";
}

const TIER_FRACTIONS: Record<Difficulty, [number, number, number]> = {
  easy: [0, 0.2, 0.4],
  medium: [0, 0.5, 1],
  hard: [0.3, 0.65, 1],
};

function tierIndexForRepetitions(repetitions: number): 0 | 1 | 2 {
  if (repetitions <= 0) return 0;
  if (repetitions <= 2) return 1;
  return 2;
}

export function FirstLetterRecall({
  card,
  onGrade,
}: {
  card: MemoryCard;
  onGrade: (grade: Grade) => void;
}) {
  const difficulty = useAppStore((state) => state.difficulty);
  const words = useMemo(() => card.verseText.trim().split(/\s+/), [card.verseText]);
  const tierIndex = tierIndexForRepetitions(card.repetitions);
  const tierFraction = TIER_FRACTIONS[difficulty][tierIndex];
  const tier = { label: TIER_LABELS[tierIndex], hint: hintForFraction(tierFraction) };

  const blankSet = useMemo(
    () => new Set(pickBlankIndices(words.length, tierFraction, card.id)),
    [words.length, tierFraction, card.id]
  );

  const [results, setResults] = useState<WordResult[]>(() => words.map(() => "pending"));
  const [typed, setTyped] = useState("");

  const currentIndex = results.findIndex((r) => r === "pending");
  const isComplete = currentIndex === -1;

  const handleChangeText = (text: string) => {
    if (text.length === 0 || currentIndex === -1) {
      setTyped("");
      return;
    }
    const letter = text[text.length - 1];
    const expected = wordCore(words[currentIndex]).slice(0, 1).toLowerCase();
    const correct = letter.toLowerCase() === expected;
    setResults((prev) => {
      const next = [...prev];
      next[currentIndex] = correct ? "correct" : "incorrect";
      return next;
    });
    setTyped("");
  };

  const correctCount = results.filter((r) => r === "correct").length;
  const accuracy = words.length === 0 ? 1 : correctCount / words.length;
  const suggestedGrade = isComplete ? suggestGradeFromAccuracy(accuracy) : undefined;

  return (
    <View>
      <View className="flex-row items-center mb-6" style={{ gap: 6 }}>
        {TIER_LABELS.map((label, i) => (
          <View key={label} className="flex-1 flex-row items-center" style={{ gap: 6 }}>
            <View
              className="flex-1 rounded-full"
              style={{
                height: 4,
                backgroundColor: i <= tierIndex ? "#4A6FA5" : "#E5E7EB",
              }}
            />
          </View>
        ))}
      </View>
      <Text className="text-xs font-semibold text-brand-blue uppercase tracking-wide mb-1">
        {tier.label}
      </Text>
      <Text className="text-xs text-gray-400 dark:text-gray-500 mb-6">{tier.hint}</Text>

      <Text
        style={{ fontFamily: serifFont }}
        className="text-xl leading-9 text-gray-900 dark:text-gray-100"
      >
        {words.map((word, index) => {
          const result = results[index];
          const isFocused = index === currentIndex;

          if (result === "pending") {
            const masked = blankSet.has(index);
            return (
              <Text key={index}>
                <Text
                  style={{
                    color: masked ? "#9CA3AF" : undefined,
                    borderBottomWidth: isFocused ? 2 : 0,
                    borderBottomColor: "#4A6FA5",
                  }}
                >
                  {masked ? maskWord(word) : word}
                </Text>{" "}
              </Text>
            );
          }

          const correct = result === "correct";
          return (
            <Text
              key={index}
              style={{
                color: correct ? "#16A34A" : "#DC2626",
                textDecorationLine: correct ? "none" : "line-through",
              }}
            >
              {word}{" "}
            </Text>
          );
        })}
      </Text>

      {!isComplete ? (
        <View className="mt-8 items-center">
          <Text className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            Word {currentIndex + 1} of {words.length} · type its first letter
          </Text>
          <TextInput
            value={typed}
            onChangeText={handleChangeText}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            style={{ fontFamily: serifFont }}
            className="w-16 h-16 text-center text-2xl font-semibold rounded-2xl border-2 border-brand-blue text-gray-900 dark:text-white"
          />
        </View>
      ) : (
        <View className="mt-8">
          <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500 mb-4">
            {correctCount} of {words.length} correct
          </Text>
          <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
            How well did you recall it?
          </Text>
          <GradeButtons srsState={card} suggestedGrade={suggestedGrade} onGrade={onGrade} />
        </View>
      )}
    </View>
  );
}
