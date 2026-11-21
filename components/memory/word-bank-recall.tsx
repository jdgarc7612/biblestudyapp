import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { blankFractionForDifficulty, pickBlankIndices, seededShuffle, wordCore } from "../../lib/blank-words";
import { normalize } from "../../lib/verse-diff";

export type BlankLevel = "light" | "more" | "all";
const LEVEL_DIFFICULTY = { light: "easy", more: "medium", all: "hard" } as const;

// Options shown per blank: the right word plus up to this many decoys from the same passage.
const MAX_DECOYS = 5;

/** Fill in the blanks from a word bank. Calls onComplete(accuracy) once every blank is filled. */
export function WordBankRecall({
  text,
  seed,
  level,
  onComplete,
}: {
  text: string;
  seed: string;
  level: BlankLevel;
  onComplete: (accuracy: number) => void;
}) {
  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  const blankIndices = useMemo(() => {
    const fraction = blankFractionForDifficulty(LEVEL_DIFFICULTY[level], seed);
    const raw = pickBlankIndices(words.length, fraction, seed).filter((i) => /[\p{L}\p{N}]/u.test(words[i]));
    return raw.length ? raw : [Math.floor(words.length / 2)];
  }, [words, seed, level]);
  const blankSet = useMemo(() => new Set(blankIndices), [blankIndices]);

  const [filled, setFilled] = useState<string[]>([]);
  const isComplete = filled.length === blankIndices.length;
  const nextBlankIndex = blankIndices[filled.length];

  // Fresh options per blank, always including that blank's word, so a wrong guess never uses
  // up the word another blank needs.
  const options = useMemo(() => {
    if (isComplete) return [];
    const correct = words[nextBlankIndex];
    const pool = words.filter(
      (w, i) => i !== nextBlankIndex && wordCore(w).length > 1 && normalize(w) !== normalize(correct)
    );
    const unique = Array.from(new Map(pool.map((w) => [normalize(w), w])).values());
    const decoys = seededShuffle(unique, `${seed}-${nextBlankIndex}-decoys`).slice(0, MAX_DECOYS);
    return seededShuffle([correct, ...decoys], `${seed}-${nextBlankIndex}-order`);
  }, [words, nextBlankIndex, isComplete, seed]);

  const isRight = (k: number) => normalize(filled[k]) === normalize(words[blankIndices[k]]);
  const correctCount = filled.filter((_, k) => isRight(k)).length;

  useEffect(() => {
    if (isComplete) onComplete(blankIndices.length ? correctCount / blankIndices.length : 1);
  }, [isComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View>
      <Text
        style={{ fontFamily: serifFont }}
        className="text-xl leading-9 text-gray-900 dark:text-gray-100"
        accessibilityLabel={
          isComplete
            ? `${correctCount} of ${blankIndices.length} blanks correct.`
            : `Blank ${filled.length + 1} of ${blankIndices.length}. Choose the missing word below.`
        }
      >
        {words.map((word, index) => {
          if (!blankSet.has(index)) return <Text key={index}>{word} </Text>;
          const k = blankIndices.indexOf(index);
          if (k >= filled.length) {
            const isNext = index === nextBlankIndex;
            return (
              <Text key={index}>
                <Text
                  style={{
                    backgroundColor: isNext ? "#4A6FA51F" : "#9CA3AF1F",
                    borderBottomWidth: 2,
                    borderBottomColor: isNext ? "#4A6FA5" : "#9CA3AF80",
                    color: "transparent",
                  }}
                >
                  {" ".repeat(Math.max(wordCore(word).length, 3))}
                </Text>{" "}
              </Text>
            );
          }
          if (isRight(k)) {
            return (
              <Text key={index} style={{ color: "#15803D", fontWeight: "600" }}>
                {word}{" "}
              </Text>
            );
          }
          // A miss: the pick struck through, then the right word, so it isn't color alone.
          return (
            <Text key={index}>
              <Text style={{ color: "#DC2626", textDecorationLine: "line-through" }}>{filled[k]}</Text>
              <Text style={{ color: "#15803D", fontWeight: "600", textDecorationLine: "underline" }}> {word}</Text>{" "}
            </Text>
          );
        })}
      </Text>

      {!isComplete ? (
        <>
          <View className="flex-row flex-wrap mt-8" style={{ gap: 8 }}>
            {options.map((option, i) => (
              <Pressable
                key={`${nextBlankIndex}-${i}`}
                onPress={() => setFilled((f) => [...f, option])}
                accessibilityRole="button"
                accessibilityLabel={`Choose ${wordCore(option)}`}
                className="rounded-full px-4 py-2.5 active:opacity-70"
                style={{ backgroundColor: "#4A6FA51A", borderWidth: 1, borderColor: "#4A6FA540" }}
              >
                <Text style={{ fontFamily: serifFont, color: "#4A6FA5" }} className="text-base font-medium">
                  {wordCore(option)}
                </Text>
              </Pressable>
            ))}
          </View>
          <View className="flex-row items-center justify-between mt-5">
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              Blank {filled.length + 1} of {blankIndices.length}
            </Text>
            {filled.length > 0 && (
              <Pressable
                onPress={() => setFilled((f) => f.slice(0, -1))}
                accessibilityRole="button"
                accessibilityLabel="Undo last word"
                hitSlop={10}
                className="flex-row items-center active:opacity-60"
              >
                <Ionicons name="arrow-undo" size={14} color="#4A6FA5" />
                <Text className="text-sm font-semibold text-brand-blue ml-1">Undo</Text>
              </Pressable>
            )}
          </View>
        </>
      ) : (
        <ResultLine
          ok={correctCount === blankIndices.length}
          text={`${correctCount} of ${blankIndices.length} correct${
            correctCount < blankIndices.length ? " · misses are struck through, with the right word after" : ""
          }`}
        />
      )}
    </View>
  );
}

export function ResultLine({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View className="flex-row items-start mt-6" accessibilityLiveRegion="polite">
      <Ionicons
        name={ok ? "checkmark-circle" : "information-circle"}
        size={18}
        color={ok ? "#15803D" : "#C19A6B"}
        style={{ marginTop: 1 }}
      />
      <Text className="flex-1 text-sm font-semibold text-gray-600 dark:text-gray-300 ml-2">{text}</Text>
    </View>
  );
}
