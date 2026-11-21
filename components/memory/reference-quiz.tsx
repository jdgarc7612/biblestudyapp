import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { isTranslationId, loadBook } from "../../lib/bible";
import type { MemoryCard } from "../../lib/memory";
import { quizPrompt, referenceChoices } from "../../lib/memory-reference";

const BLUE = "#4A6FA5";
const RIGHT = "#15803D";
const WRONG = "#DC2626";

type Shape = { versesIn: (chapter: number) => number | undefined; chapters: number } | null;

/**
 * Tests the address, not the wording: the words (or the start of a long passage) are shown and
 * the person names where they're found, then picks it from four close choices.
 */
export function ReferenceQuiz({
  card,
  deck,
  onComplete,
}: {
  card: MemoryCard;
  deck: MemoryCard[];
  onComplete: (accuracy: number) => void;
}) {
  // The book's real chapter and verse counts, so every wrong choice is a real reference.
  const [shape, setShape] = useState<Shape | undefined>(undefined);
  useEffect(() => {
    let live = true;
    loadBook(isTranslationId(card.translation) ? card.translation : "BSB", card.book)
      .then((book) => live && setShape({ versesIn: (ch) => book.c[ch - 1]?.length, chapters: book.c.length }))
      .catch(() => live && setShape(null));
    return () => {
      live = false;
    };
  }, [card.translation, card.book]);

  const choices = useMemo(
    () => (shape === undefined ? null : referenceChoices(card, deck, shape ?? {})),
    [card, deck, shape]
  );
  const prompt = quizPrompt(card.verseText);
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null && !!choices;
  const right = answered && choices![picked!].correct;

  return (
    <View>
      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">Where is this found?</Text>
      <Text style={{ fontFamily: serifFont }} className="text-xl leading-9 text-gray-900 dark:text-gray-100 mt-3">
        “{prompt.text}
        {prompt.cut ? "…" : ""}”
      </Text>
      {!answered && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-5">
          Say the book, chapter and verse, then pick it.
        </Text>
      )}

      {answered && (
        <View
          className="flex-row items-center rounded-2xl px-4 py-3 mt-4"
          style={{ backgroundColor: `${right ? RIGHT : WRONG}14` }}
          accessibilityLiveRegion="polite"
          accessible
          accessibilityLabel={right ? `Right. ${card.verseReference}.` : `Not quite. The answer is ${card.verseReference}.`}
        >
          <Ionicons name={right ? "checkmark-circle" : "information-circle"} size={20} color={right ? RIGHT : WRONG} />
          <Text className="flex-1 text-[15px] text-gray-800 dark:text-gray-100 ml-2">
            {right ? "Right: " : "Not quite. It's "}
            <Text className="font-bold">{card.verseReference}</Text>
            {right ? "" : "."}
          </Text>
        </View>
      )}

      <View className="mt-4" style={{ gap: 8 }}>
        {!choices && <ActivityIndicator color={BLUE} style={{ marginTop: 12 }} />}
        {choices?.map((choice, i) => {
          const isPick = picked === i;
          const show = answered && (choice.correct || isPick);
          const color = choice.correct ? RIGHT : WRONG;
          return (
            <Pressable
              key={choice.label}
              onPress={() => {
                if (answered) return;
                setPicked(i);
                onComplete(choice.correct ? 1 : 0);
              }}
              disabled={answered}
              accessibilityRole="button"
              accessibilityLabel={`${choice.label}${show ? (choice.correct ? ", the answer" : ", your pick") : ""}`}
              accessibilityState={{ disabled: answered, selected: isPick }}
              className="flex-row items-center rounded-2xl px-4 py-3.5 active:opacity-80"
              style={{
                borderWidth: 1,
                borderColor: show ? `${color}88` : "#9CA3AF44",
                backgroundColor: show ? `${color}0F` : undefined,
                opacity: answered && !show ? 0.5 : 1,
              }}
            >
              <Text className="flex-1 text-[16px] font-semibold text-gray-900 dark:text-white">{choice.label}</Text>
              {show && (
                <View className="flex-row items-center">
                  <Text className="text-xs font-semibold mr-1.5" style={{ color }}>
                    {choice.correct ? "Answer" : "Your pick"}
                  </Text>
                  <Ionicons name={choice.correct ? "checkmark-circle" : "close-circle"} size={18} color={color} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
