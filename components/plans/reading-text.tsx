import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { useChapter } from "../../lib/bible";
import { readingLabel, type PlanReading } from "../../lib/plans";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";

/** A plan day's passage, printed right in the plan so the reading and questions sit together. */
export function ReadingText({ reading }: { reading: PlanReading }) {
  const router = useRouter();
  const translation = useAppStore((s) => s.translation);
  const chapter = useChapter(translation, reading.book, reading.chapter);
  const start = reading.start ?? 1;
  const end = reading.end ?? reading.start ?? 999;
  const verses = chapter.verses.filter((v) => v.verse >= start && v.verse <= end);

  const openInBible = () =>
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: {
        book: reading.book,
        chapter: String(reading.chapter),
        ...(reading.start != null ? { v: String(reading.start), e: String(reading.end ?? reading.start) } : {}),
      },
    });

  return (
    <View className="rounded-2xl bg-white dark:bg-gray-900/60 px-4 pt-3.5 pb-3">
      <View className="flex-row items-center justify-between mb-2">
        <Text style={{ fontFamily: serifFont }} className="flex-1 text-[17px] font-semibold text-gray-900 dark:text-white">
          {readingLabel(reading)}
        </Text>
        <Pressable
          onPress={openInBible}
          hitSlop={8}
          accessibilityRole="link"
          className="flex-row items-center ml-3 active:opacity-60"
        >
          <Text className="text-xs font-semibold text-brand-blue dark:text-blue-300 mr-0.5">Open in Bible</Text>
          <Ionicons name="arrow-forward" size={12} color={BLUE} />
        </Pressable>
      </View>

      {chapter.loading && verses.length === 0 ? (
        <ActivityIndicator color={BLUE} style={{ marginVertical: 16 }} />
      ) : chapter.error ? (
        <Pressable onPress={chapter.retry} className="py-3 active:opacity-60">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Couldn&apos;t load this passage. <Text className="font-semibold text-brand-blue">Try again</Text>
          </Text>
        </Pressable>
      ) : (
        <Text style={{ fontFamily: serifFont }} className="text-[17px] leading-8 text-gray-800 dark:text-gray-200">
          {verses.map((v) => (
            <Text key={v.verse}>
              <Text className="text-[11px] font-semibold text-brand-earth" style={{ fontFamily: undefined }}>
                {v.verse}{" "}
              </Text>
              {v.text}{" "}
            </Text>
          ))}
        </Text>
      )}
    </View>
  );
}
