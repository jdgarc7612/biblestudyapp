import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnswerCard } from "../../components/ai/answer-card";
import { answersCovering, listAnswers, searchAnswers } from "../../lib/ai-answers";
import { formatReference, getBook } from "../../lib/bible";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
type Filter = "all" | "saved";

/**
 * Ask AI history: every answer kept, newest first, with search and an All / Saved switch.
 * From a verse marker in the Reader it opens filtered to that verse. Opening an answer reads it
 * from the device; it never asks the AI again.
 */
export default function AnswersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ filter?: string; book?: string; chapter?: string; verse?: string }>();
  const aiAnswers = useAppStore((s) => s.aiAnswers);
  const signedIn = useAppStore((s) => !!s.syncedUserId);
  const [filter, setFilter] = useState<Filter>(params.filter === "saved" ? "saved" : "all");
  const [query, setQuery] = useState("");

  const book = getBook(params.book);
  const chapter = Number(params.chapter);
  const verse = Number(params.verse);
  const [verseFilter, setVerseFilter] = useState(!!book && chapter > 0 && verse > 0);
  const verseLabel = book && chapter > 0 && verse > 0 ? formatReference(book.name, chapter, verse) : null;

  const all = useMemo(() => listAnswers(aiAnswers), [aiAnswers]);
  const savedCount = useMemo(() => all.filter((a) => a.saved).length, [all]);
  const shown = useMemo(() => {
    let list =
      verseFilter && book ? answersCovering(aiAnswers, book.id, chapter, verse) : filter === "saved" ? listAnswers(aiAnswers, true) : all;
    if (verseFilter && filter === "saved") list = list.filter((a) => a.saved);
    return searchAnswers(list, query);
  }, [aiAnswers, all, filter, query, verseFilter, book, chapter, verse]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/ai"))}
          hitSlop={12}
          accessibilityLabel="Back"
          className="p-1 mr-2 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={24} color={BLUE} />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">Your answers</Text>
        <Text className="text-sm text-gray-400 dark:text-gray-500">{all.length}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {all.length === 0 ? (
          <View className="items-center pt-16 px-6">
            <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-4">
              <Ionicons name="time-outline" size={26} color={BLUE} />
            </View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No answers yet</Text>
            <Text className="text-sm text-center text-gray-500 dark:text-gray-400 leading-5 mb-6">
              Every answer from Ask AI is kept here, so you can come back to it. Save the ones that
              matter most.
            </Text>
            <Pressable
              onPress={() => router.replace("/ai")}
              className="rounded-xl px-5 py-3 active:opacity-80"
              style={{ backgroundColor: BLUE }}
            >
              <Text className="text-sm font-semibold text-white">Ask a question</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View className="flex-row items-center rounded-2xl bg-gray-100 dark:bg-gray-800 px-4 mb-3">
              <Ionicons name="search" size={16} color="#9CA3AF" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search your answers"
                placeholderTextColor="#9CA3AF"
                accessibilityLabel="Search your answers"
                className="flex-1 py-3 ml-2 text-base text-gray-900 dark:text-gray-100"
              />
            </View>
            <View className="flex-row flex-wrap items-center mb-4" style={{ gap: 8 }}>
              {(
                [
                  ["all", `All · ${all.length}`],
                  ["saved", `Saved · ${savedCount}`],
                ] as [Filter, string][]
              ).map(([id, label]) => (
                <Pressable
                  key={id}
                  onPress={() => setFilter(id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: filter === id }}
                  className={`rounded-full px-4 py-1.5 ${filter === id ? "bg-brand-blue" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <Text
                    className={`text-sm font-semibold ${filter === id ? "text-white" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
              {verseFilter && verseLabel ? (
                <Pressable
                  onPress={() => setVerseFilter(false)}
                  accessibilityRole="button"
                  accessibilityLabel={`Showing answers on ${verseLabel}. Show all answers`}
                  className="flex-row items-center rounded-full px-3 py-1.5 bg-brand-earth/15 active:opacity-70"
                >
                  <Text className="text-sm font-semibold text-brand-earth">{verseLabel}</Text>
                  <Ionicons name="close" size={14} color="#C19A6B" style={{ marginLeft: 4 }} />
                </Pressable>
              ) : null}
            </View>

            {shown.length === 0 ? (
              <Text className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
                {query.trim()
                  ? `No answers match “${query.trim()}”.`
                  : filter === "saved"
                    ? "Nothing saved yet. Tap Save under an answer to keep it here."
                    : "No answers here yet."}
              </Text>
            ) : (
              <View style={{ gap: 10 }}>
                {shown.map((a) => (
                  <AnswerCard
                    key={a.id}
                    entry={a}
                    onPress={() => router.push({ pathname: "/answers/[id]", params: { id: a.id } })}
                  />
                ))}
              </View>
            )}

            <Text className="text-xs text-gray-400 dark:text-gray-500 text-center mt-6 leading-5">
              Opening an answer never uses a question.{"\n"}
              {signedIn
                ? "Saved answers and your latest 100 others sync to your account."
                : "Kept on this device. Sign in to keep them everywhere."}
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
