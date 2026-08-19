import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { serifFont } from "../../constants/fonts";
import { diffVerse, suggestGradeFromAccuracy } from "../../lib/verse-diff";
import { useAppStore, type MemoryCard } from "../../store/useAppStore";
import { Grade } from "../../lib/srs";
import { GradeButtons } from "./grade-buttons";

const HARD_TIME_LIMIT = 60;

export function TypingRecall({
  card,
  onGrade,
}: {
  card: MemoryCard;
  onGrade: (grade: Grade) => void;
}) {
  const difficulty = useAppStore((state) => state.difficulty);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(HARD_TIME_LIMIT);

  useEffect(() => {
    if (difficulty !== "hard" || checked) return;
    if (secondsLeft <= 0) {
      setChecked(true);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [difficulty, checked, secondsLeft]);

  const result = checked ? diffVerse(card.verseText, typed) : null;
  const suggestedGrade = result ? suggestGradeFromAccuracy(result.accuracy) : undefined;

  return (
    <View>
      {!checked ? (
        <>
          {difficulty === "easy" && (
            <Text
              style={{ fontFamily: serifFont, color: "#9CA3AF" }}
              className="text-base leading-7 mb-4 italic"
            >
              {card.verseText}
            </Text>
          )}
          {difficulty === "hard" && (
            <View className="flex-row justify-end mb-2">
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: secondsLeft <= 10 ? "#DC262615" : "#4A6FA51A" }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: secondsLeft <= 10 ? "#DC2626" : "#4A6FA5" }}
                >
                  0:{secondsLeft.toString().padStart(2, "0")}
                </Text>
              </View>
            </View>
          )}
          <TextInput
            value={typed}
            onChangeText={setTyped}
            multiline
            autoFocus
            placeholder="Type the verse from memory…"
            placeholderTextColor="#9CA3AF"
            style={{ fontFamily: serifFont, minHeight: 140 }}
            className="text-lg leading-8 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3"
          />
          <Pressable
            onPress={() => setChecked(true)}
            disabled={typed.trim().length === 0}
            className="mt-6 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
            style={{ opacity: typed.trim().length === 0 ? 0.4 : 1 }}
          >
            <Text className="text-base font-semibold text-white">Check</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text
            style={{ fontFamily: serifFont }}
            className="text-lg leading-8 text-gray-900 dark:text-gray-100"
          >
            {result!.tokens.map((token, index) => {
              if (token.type === "match") {
                return <Text key={index}>{token.expected} </Text>;
              }
              if (token.type === "missing") {
                return (
                  <Text key={index} style={{ color: "#DC2626" }}>
                    {token.expected}{" "}
                  </Text>
                );
              }
              return (
                <Text
                  key={index}
                  style={{ color: "#D97706", textDecorationLine: "line-through" }}
                >
                  {token.typed}{" "}
                </Text>
              );
            })}
          </Text>
          <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500 mt-4">
            {Math.round(result!.accuracy * 100)}% accurate · red = missed, struck = extra
          </Text>

          <View className="mt-6">
            <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
              Grade your recall
            </Text>
            <GradeButtons srsState={card} suggestedGrade={suggestedGrade} onGrade={onGrade} />
          </View>
        </>
      )}
    </View>
  );
}
