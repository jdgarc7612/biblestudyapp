import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { serifFont } from "../../constants/fonts";
import { buildProgressiveTokens } from "../../lib/blank-words";
import type { MemoryCard } from "../../store/useAppStore";
import { Grade } from "../../lib/srs";
import { GradeButtons } from "./grade-buttons";

export function ProgressiveRecall({
  card,
  onGrade,
}: {
  card: MemoryCard;
  onGrade: (grade: Grade) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const tokens = buildProgressiveTokens(card.verseText, card.repetitions, card.id);

  return (
    <View>
      <Text style={{ fontFamily: serifFont }} className="text-xl leading-9 text-gray-900 dark:text-gray-100">
        {tokens.map((token, index) => (
          <Text
            key={index}
            style={
              token.isBlank && !revealed
                ? { color: "#9CA3AF" }
                : undefined
            }
          >
            {revealed ? card.verseText.trim().split(/\s+/)[index] : token.display}{" "}
          </Text>
        ))}
      </Text>

      {!revealed ? (
        <Pressable
          onPress={() => setRevealed(true)}
          className="mt-8 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Show Answer</Text>
        </Pressable>
      ) : (
        <View className="mt-8">
          <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
            How well did you recall it?
          </Text>
          <GradeButtons srsState={card} onGrade={onGrade} />
        </View>
      )}
    </View>
  );
}
