import { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { serifFont } from "../../constants/fonts";
import { maskWord, pickBlankIndices, wordCore } from "../../lib/blank-words";
import { suggestGradeFromAccuracy } from "../../lib/verse-diff";
import type { MemoryCard } from "../../store/useAppStore";
import { Grade } from "../../lib/srs";
import { GradeButtons } from "./grade-buttons";

type WordResult = "pending" | "correct" | "incorrect";

const TIERS = [
  { label: "Warm-up", hint: "Full verse shown", fraction: 0 },
  { label: "Recall", hint: "Some words hidden", fraction: 0.5 },
  { label: "Mastery", hint: "Verse hidden", fraction: 1 },
] as const;

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
  const words = useMemo(() => card.verseText.trim().split(/\s+/), [card.verseText]);
  const tierIndex = tierIndexForRepetitions(card.repetitions);
  const tier = TIERS[tierIndex];

  const blankSet = useMemo(
    () => new Set(pickBlankIndices(words.length, tier.fraction, card.id)),
    [words.length, tier.fraction, card.id]
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
        {TIERS.map((t, i) => (
          <View key={t.label} className="flex-1 flex-row items-center" style={{ gap: 6 }}>
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
