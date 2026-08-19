import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { serifFont } from "../../constants/fonts";
import {
  blankFractionForRepetitions,
  pickBlankIndices,
  seededShuffle,
  wordCore,
} from "../../lib/blank-words";
import { normalize, suggestGradeFromAccuracy } from "../../lib/verse-diff";
import { useAppStore, type MemoryCard } from "../../store/useAppStore";
import { Difficulty, Grade } from "../../lib/srs";
import { GradeButtons } from "./grade-buttons";

const MAX_BLANKS: Record<Difficulty, number> = { easy: 5, medium: 8, hard: 12 };
const DECOY_COUNT: Record<Difficulty, number> = { easy: 1, medium: 3, hard: 5 };

function capIndices(indices: number[], max: number): number[] {
  if (indices.length <= max) return indices;
  const step = indices.length / max;
  const picked = new Set<number>();
  for (let i = 0; i < max; i++) picked.add(indices[Math.floor(i * step)]);
  return indices.filter((i) => picked.has(i));
}

export function WordBankRecall({
  card,
  onGrade,
}: {
  card: MemoryCard;
  onGrade: (grade: Grade) => void;
}) {
  const difficulty = useAppStore((state) => state.difficulty);
  const words = useMemo(() => card.verseText.trim().split(/\s+/), [card.verseText]);

  const blankIndices = useMemo(() => {
    const fraction = blankFractionForRepetitions(card.repetitions, difficulty);
    const raw = pickBlankIndices(words.length, fraction, card.id);
    return capIndices(raw.length ? raw : [Math.floor(words.length / 2)], MAX_BLANKS[difficulty]);
  }, [words, card.repetitions, card.id, difficulty]);

  const blankSet = useMemo(() => new Set(blankIndices), [blankIndices]);

  const [filled, setFilled] = useState<Record<number, string>>({});

  const filledCount = Object.keys(filled).length;
  const isComplete = filledCount === blankIndices.length;
  const nextBlankIndex = blankIndices[filledCount];

  // Fresh options per blank — always includes that blank's correct word, so a
  // wrong guess on one blank never uses up the word another blank needs.
  const currentOptions = useMemo(() => {
    if (isComplete) return [];
    const correctWord = words[nextBlankIndex];
    const decoyPool = words.filter(
      (w, i) => i !== nextBlankIndex && wordCore(w).length > 1 && normalize(w) !== normalize(correctWord)
    );
    const decoyCount = Math.min(decoyPool.length, DECOY_COUNT[difficulty]);
    const decoys = seededShuffle(decoyPool, `${card.id}-${nextBlankIndex}-decoys`).slice(0, decoyCount);
    const combined = [correctWord, ...decoys].map((text, id) => ({ id, text }));
    return seededShuffle(combined, `${card.id}-${nextBlankIndex}-order`);
  }, [words, nextBlankIndex, isComplete, card.id, difficulty]);

  const handlePick = (text: string) => {
    if (isComplete) return;
    setFilled((prev) => ({ ...prev, [nextBlankIndex]: text }));
  };

  const correctCount = blankIndices.filter(
    (i) => filled[i] !== undefined && normalize(filled[i]) === normalize(words[i])
  ).length;
  const accuracy = blankIndices.length === 0 ? 1 : correctCount / blankIndices.length;
  const suggestedGrade = isComplete ? suggestGradeFromAccuracy(accuracy) : undefined;

  return (
    <View>
      <Text
        style={{ fontFamily: serifFont }}
        className="text-xl leading-9 text-gray-900 dark:text-gray-100"
      >
        {words.map((word, index) => {
          if (!blankSet.has(index)) {
            return <Text key={index}>{word} </Text>;
          }
          const attempt = filled[index];
          if (attempt === undefined) {
            const isNext = index === nextBlankIndex;
            return (
              <Text key={index}>
                <Text
                  style={{
                    backgroundColor: isNext ? "#4A6FA51A" : "#9CA3AF1A",
                    borderBottomWidth: 2,
                    borderBottomColor: isNext ? "#4A6FA5" : "#D1D5DB",
                    color: "transparent",
                  }}
                >
                  {" ".repeat(Math.max(wordCore(word).length, 2))}
                </Text>{" "}
              </Text>
            );
          }
          const correct = normalize(attempt) === normalize(word);
          return (
            <Text
              key={index}
              style={{
                color: correct ? "#16A34A" : "#DC2626",
                textDecorationLine: correct ? "none" : "line-through",
              }}
            >
              {attempt}{" "}
            </Text>
          );
        })}
      </Text>

      {!isComplete ? (
        <View className="flex-row flex-wrap mt-8" style={{ gap: 8 }}>
          {currentOptions.map(({ id, text }) => (
            <Pressable
              key={id}
              onPress={() => handlePick(text)}
              className="rounded-full px-4 py-2 active:opacity-70"
              style={{
                backgroundColor: "#4A6FA51A",
                borderWidth: 1,
                borderColor: "#4A6FA540",
              }}
            >
              <Text
                style={{ fontFamily: serifFont, color: "#4A6FA5" }}
                className="text-base font-medium"
              >
                {text}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View className="mt-8">
          <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500 mb-4">
            {correctCount} of {blankIndices.length} correct
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
