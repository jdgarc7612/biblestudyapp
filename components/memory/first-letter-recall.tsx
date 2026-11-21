import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { serifFont } from "../../constants/fonts";
import { maskWord, pickBlankIndices, wordCore } from "../../lib/blank-words";
import { ResultLine } from "./word-bank-recall";

export type LetterTier = 0 | 1 | 2;

/** Warm-up hides a few words, Recall about half, Mastery all of them. Only hidden words are tested. */
export const TIERS: { label: string; fraction: number; hint: string }[] = [
  { label: "Warm-up", fraction: 0.25, hint: "A few words hidden" },
  { label: "Recall", fraction: 0.55, hint: "About half hidden" },
  { label: "Mastery", fraction: 1, hint: "Every word hidden" },
];

const hasLetters = (w: string) => /[\p{L}\p{N}]/u.test(w);

/** Type the first letter of each hidden word, in order. Calls onComplete(accuracy) at the end. */
export function FirstLetterRecall({
  text,
  seed,
  tier,
  onComplete,
}: {
  text: string;
  seed: string;
  tier: LetterTier;
  onComplete: (accuracy: number) => void;
}) {
  const words = useMemo(() => text.trim().split(/\s+/), [text]);
  const hidden = useMemo(() => {
    const picked = pickBlankIndices(words.length, TIERS[tier].fraction, `${seed}-fl`).filter((i) => hasLetters(words[i]));
    if (picked.length) return picked;
    const fallback = words.findIndex((w, i) => i >= Math.floor(words.length / 2) && wordCore(w).length > 2);
    return [fallback >= 0 ? fallback : words.findIndex(hasLetters)].filter((i) => i >= 0);
  }, [words, seed, tier]);
  const hiddenSet = useMemo(() => new Set(hidden), [hidden]);

  const [results, setResults] = useState<boolean[]>([]);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<TextInput>(null);
  const isComplete = results.length >= hidden.length;
  const current = hidden[results.length];
  const correctCount = results.filter(Boolean).length;

  const answer = (letter: string | null) => {
    if (isComplete) return;
    const expected = wordCore(words[current]).slice(0, 1).toLowerCase();
    setResults((r) => [...r, letter !== null && letter.toLowerCase() === expected]);
    setTyped("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (isComplete) onComplete(hidden.length ? correctCount / hidden.length : 1);
  }, [isComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View>
      <Text
        style={{ fontFamily: serifFont }}
        className="text-xl leading-9 text-gray-900 dark:text-gray-100"
        accessibilityLabel={
          isComplete
            ? `${correctCount} of ${hidden.length} hidden words correct.`
            : `Hidden word ${results.length + 1} of ${hidden.length}. Type its first letter.`
        }
      >
        {words.map((word, index) => {
          if (!hiddenSet.has(index)) return <Text key={index}>{word} </Text>;
          const k = hidden.indexOf(index);
          if (k >= results.length) {
            const focused = index === current;
            return (
              <Text key={index}>
                <Text
                  style={{
                    color: "#9CA3AF",
                    borderBottomWidth: focused ? 2 : 0,
                    borderBottomColor: "#4A6FA5",
                    backgroundColor: focused ? "#4A6FA51F" : undefined,
                  }}
                >
                  {maskWord(word)}
                </Text>{" "}
              </Text>
            );
          }
          const ok = results[k];
          return (
            <Text
              key={index}
              style={{
                color: ok ? "#15803D" : "#DC2626",
                fontWeight: "600",
                textDecorationLine: ok ? "none" : "underline",
              }}
            >
              {word}
              {ok ? "" : " ✗"}{" "}
            </Text>
          );
        })}
      </Text>

      {!isComplete ? (
        <View className="mt-8 items-center">
          <Text className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Hidden word {results.length + 1} of {hidden.length} · type its first letter
          </Text>
          <TextInput
            ref={inputRef}
            value={typed}
            onChangeText={(t) => (t.length ? answer(t[t.length - 1]) : setTyped(""))}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            accessibilityLabel={`First letter of hidden word ${results.length + 1}`}
            style={{ fontFamily: serifFont }}
            className="w-16 h-16 text-center text-2xl font-semibold rounded-2xl border-2 border-brand-blue text-gray-900 dark:text-white"
          />
          <Pressable
            onPress={() => answer(null)}
            accessibilityRole="button"
            accessibilityLabel="I don't know this word. Show it."
            hitSlop={10}
            className="mt-4 active:opacity-60"
          >
            <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">{"I don't know"}</Text>
          </Pressable>
        </View>
      ) : (
        <ResultLine
          ok={correctCount === hidden.length}
          text={`${correctCount} of ${hidden.length} correct${
            correctCount < hidden.length ? " · missed words are marked ✗ and underlined" : ""
          }`}
        />
      )}
    </View>
  );
}
