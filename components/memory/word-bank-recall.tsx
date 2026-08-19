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
import type { MemoryCard } from "../../store/useAppStore";
import { Grade } from "../../lib/srs";
import { GradeButtons } from "./grade-buttons";

const MAX_BLANKS = 8;

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
  const words = useMemo(() => card.verseText.trim().split(/\s+/), [card.verseText]);

  const blankIndices = useMemo(() => {
    const fraction = blankFractionForRepetitions(card.repetitions);
    const raw = pickBlankIndices(words.length, fraction, card.id);
    return capIndices(raw.length ? raw : [Math.floor(words.length / 2)], MAX_BLANKS);
  }, [words, card.repetitions, card.id]);

  const blankSet = useMemo(() => new Set(blankIndices), [blankIndices]);

  const bank = useMemo(() => {
    const blanks = blankIndices.map((i) => words[i]);
    const usedNorm = new Set(blanks.map(normalize));
    const decoyPool = words.filter(
      (w, i) => !blankSet.has(i) && wordCore(w).length > 1 && !usedNorm.has(normalize(w))
    );
    const decoyCount = Math.min(decoyPool.length, blanks.length, 4);
    const decoys = seededShuffle(decoyPool, `${card.id}-decoys`).slice(0, decoyCount);
    const combined = [...blanks, ...decoys].map((text, id) => ({ id, text }));
    return seededShuffle(combined, `${card.id}-bank`);
  }, [words, blankIndices, blankSet, card.id]);

  const [filled, setFilled] = useState<Record<number, string>>({});
  const [usedBankIds, setUsedBankIds] = useState<Set<number>>(new Set());

  const filledCount = Object.keys(filled).length;
  const isComplete = filledCount === blankIndices.length;
  const nextBlankIndex = blankIndices[filledCount];

  const handlePick = (bankId: number, text: string) => {
    if (isComplete || usedBankIds.has(bankId)) return;
    setFilled((prev) => ({ ...prev, [nextBlankIndex]: text }));
    setUsedBankIds((prev) => new Set(prev).add(bankId));
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
          {bank.map(({ id, text }) => {
            const used = usedBankIds.has(id);
            return (
              <Pressable
                key={id}
                onPress={() => handlePick(id, text)}
                disabled={used}
                className="rounded-full px-4 py-2 active:opacity-70"
                style={{
                  backgroundColor: used ? "#F3F4F6" : "#4A6FA51A",
                  borderWidth: 1,
                  borderColor: used ? "#E5E7EB" : "#4A6FA540",
                  opacity: used ? 0.4 : 1,
                }}
              >
                <Text
                  style={{ fontFamily: serifFont, color: used ? "#9CA3AF" : "#4A6FA5" }}
                  className="text-base font-medium"
                >
                  {text}
                </Text>
              </Pressable>
            );
          })}
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
