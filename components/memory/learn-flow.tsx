import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { contextNoteFor } from "../../data/study/context-notes";
import type { MemoryCard } from "../../lib/memory";
import { FirstLetterRecall } from "./first-letter-recall";
import { FlashcardRecall } from "./flashcard-recall";
import { TypingRecall } from "./typing-recall";
import { WordBankRecall } from "./word-bank-recall";

const STEPS = ["Read it", "Fill in the blanks", "First letters", "Say it yourself"] as const;

/**
 * The first sitting with a new verse: read it slowly, then fill in a few blanks, then first
 * letters, then recall it yourself (typed or said). Any step can be skipped. When the last
 * step is done, onComplete gets the final accuracy (undefined when self-checked).
 */
export function LearnFlow({
  card,
  onAsk,
  onComplete,
}: {
  card: MemoryCard;
  onAsk: () => void;
  onComplete: (accuracy?: number) => void;
}) {
  const [step, setStep] = useState(0);
  const [stepDone, setStepDone] = useState(false);
  const [recite, setRecite] = useState<"type" | "say" | null>(null);
  const [finished, setFinished] = useState(false);
  const note = contextNoteFor(card.book, card.chapter, card.start, card.end);
  const [showNote, setShowNote] = useState(false);

  const next = () => {
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
    setStepDone(false);
  };
  const last = step === STEPS.length - 1;

  return (
    <View>
      <View className="flex-row mb-2" style={{ gap: 6 }} accessibilityLabel={`Learn, step ${step + 1} of 4: ${STEPS[step]}`}>
        {STEPS.map((s, i) => (
          <View key={s} className="flex-1 rounded-full" style={{ height: 4, backgroundColor: i <= step ? "#C19A6B" : "#9CA3AF40" }} />
        ))}
      </View>
      <View className="flex-row items-center justify-between mb-5">
        <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">
          Learn · {STEPS[step]}
        </Text>
        {!last && (
          <Pressable onPress={next} accessibilityRole="button" accessibilityLabel={`Skip ${STEPS[step]}`} hitSlop={10} className="active:opacity-60">
            <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">Skip</Text>
          </Pressable>
        )}
      </View>

      {step === 0 && (
        <View>
          <Text style={{ fontFamily: serifFont }} className="text-[22px] leading-10 text-gray-900 dark:text-gray-100">
            {card.verseText}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-5">
            Read it slowly two or three times, out loud if you can. Notice how it begins and where it turns.
          </Text>
          {note && (
            <View className="rounded-2xl bg-brand-earth/10 dark:bg-brand-earth/15 px-4 py-3 mt-5">
              <Pressable
                onPress={() => setShowNote((v) => !v)}
                accessibilityRole="button"
                accessibilityLabel={`What this says: ${note.title}`}
                accessibilityState={{ expanded: showNote }}
                className="flex-row items-center active:opacity-70"
              >
                <Ionicons name="compass-outline" size={16} color="#C19A6B" />
                <Text className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-100 ml-2">
                  What this says · {note.title}
                </Text>
                <Ionicons name={showNote ? "chevron-up" : "chevron-down"} size={16} color="#C19A6B" />
              </Pressable>
              {showNote && (
                <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300 mt-2">{note.setting}</Text>
              )}
            </View>
          )}
          <View className="flex-row mt-6" style={{ gap: 10 }}>
            <Pressable
              onPress={onAsk}
              accessibilityRole="button"
              accessibilityLabel="Ask about this verse"
              className="flex-1 flex-row items-center justify-center rounded-2xl border border-brand-blue/30 py-3.5 active:opacity-70"
            >
              <Ionicons name="sparkles-outline" size={15} color="#4A6FA5" />
              <Text className="text-sm font-semibold text-brand-blue ml-1.5">Ask about it</Text>
            </Pressable>
            <Pressable
              onPress={next}
              accessibilityRole="button"
              accessibilityLabel="I've read it. Next step"
              className="flex-1 items-center justify-center rounded-2xl bg-brand-blue py-3.5 active:opacity-80"
            >
              <Text className="text-sm font-semibold text-white">{"I've read it"}</Text>
            </Pressable>
          </View>
        </View>
      )}

      {step === 1 && <WordBankRecall text={card.verseText} seed={`${card.id}-learn`} level="light" onComplete={() => setStepDone(true)} />}
      {step === 2 && <FirstLetterRecall text={card.verseText} seed={`${card.id}-learn`} tier={1} onComplete={() => setStepDone(true)} />}

      {step === 3 && !recite && (
        <View>
          <Text className="text-[15px] text-gray-600 dark:text-gray-300 leading-6 mb-4">
            Now try {card.verseReference} on your own.
          </Text>
          <View style={{ gap: 10 }}>
            <ChoiceRow icon="create-outline" label="Type it" sub="See exactly which words you missed" onPress={() => setRecite("type")} />
            <ChoiceRow icon="chatbubble-ellipses-outline" label="Say it" sub="Recite it, then check yourself" onPress={() => setRecite("say")} />
          </View>
        </View>
      )}
      {step === 3 && recite === "type" && (
        <TypingRecall
          text={card.verseText}
          onComplete={(a) => {
            if (finished) return;
            setFinished(true);
            onComplete(a);
          }}
        />
      )}
      {step === 3 && recite === "say" && (
        <FlashcardRecall
          reference={card.verseReference}
          text={card.verseText}
          onComplete={() => {
            if (finished) return;
            setFinished(true);
            onComplete(undefined);
          }}
        />
      )}

      {stepDone && !last && (
        <Pressable
          onPress={next}
          accessibilityRole="button"
          accessibilityLabel="Next step"
          className="mt-6 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Next</Text>
        </Pressable>
      )}
    </View>
  );
}

function ChoiceRow({
  icon,
  label,
  sub,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}. ${sub}`}
      className="flex-row items-center rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3.5 active:opacity-70"
    >
      <View className="w-9 h-9 rounded-full bg-brand-blue/10 items-center justify-center mr-3">
        <Ionicons name={icon} size={17} color="#4A6FA5" />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">{label}</Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    </Pressable>
  );
}
