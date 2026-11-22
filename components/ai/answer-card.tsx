import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { displayQuestion, plainAnswer, type AnswerEntry } from "../../lib/ai-answers";

const BLUE = "#4A6FA5";

export function formatAskedDate(ms: number) {
  const date = new Date(ms);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", ...(sameYear ? {} : { year: "numeric" }) });
}

/** One kept answer in a list: its passage, the question, and the start of the answer. */
export function AnswerCard({ entry, onPress }: { entry: AnswerEntry; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open answer: ${entry.question}`}
      className="rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-4 active:opacity-70"
    >
      <View className="flex-row items-center mb-1.5">
        {entry.reference ? (
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300" numberOfLines={1}>
            {entry.reference}
          </Text>
        ) : (
          <View className="flex-row items-center">
            <Ionicons name="sparkles-outline" size={12} color="#C19A6B" />
            <Text className="text-xs font-semibold text-brand-earth ml-1">Ask AI</Text>
          </View>
        )}
        {entry.saved ? (
          <Ionicons name="bookmark" size={12} color={BLUE} style={{ marginLeft: 6 }} accessibilityLabel="Saved" />
        ) : null}
        <Text className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{formatAskedDate(entry.askedAt)}</Text>
      </View>
      <Text className="text-[15px] font-semibold leading-5 text-gray-900 dark:text-white mb-1.5" numberOfLines={2}>
        {displayQuestion(entry)}
      </Text>
      <Text
        style={{ fontFamily: serifFont }}
        className="text-[15px] leading-6 text-gray-600 dark:text-gray-300"
        numberOfLines={3}
      >
        {plainAnswer(entry.answer).replace(/\s*\n+\s*/g, " ")}
      </Text>
    </Pressable>
  );
}
