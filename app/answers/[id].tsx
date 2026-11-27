import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatAskedDate } from "../../components/ai/answer-card";
import { NOTE_RESULT_TEXT, useAddAnswerToNote, useOpenAnswerPassage } from "../../components/ai/answer-actions";
import { FormattedText } from "../../components/ai/formatted-text";
import { serifFont } from "../../constants/fonts";
import { displayQuestion, plainAnswer } from "../../lib/ai-answers";
import type { FoundReference } from "../../lib/bible";
import { writeClipboard } from "../../lib/clipboard";
import { useAppStore } from "../../store/useAppStore";
import { BackButton } from "../../components/back-button";
import { useBack } from "../../hooks/use-back";

const BLUE = "#4A6FA5";

/** One kept answer, read from the device: never asks the AI again or uses a question. */
export default function AnswerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const answer = useAppStore((s) => (id ? s.aiAnswers[id] : undefined));
  const setSaved = useAppStore((s) => s.setAiAnswerSaved);
  const deleteAnswer = useAppStore((s) => s.deleteAiAnswer);
  const addToNote = useAddAnswerToNote();
  const openPassage = useOpenAnswerPassage();
  const [status, setStatus] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const show = (text: string) => {
    setStatus(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), 2600);
  };
  const { goBack } = useBack("/answers");
  const openReference = (ref: FoundReference) =>
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: { book: ref.book.id, chapter: String(ref.chapter), ...(ref.verse ? { v: String(ref.verse) } : {}) },
    });

  if (!id || !answer || answer.deleted) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 items-center justify-center px-8" edges={["top"]}>
        <Text className="text-base text-gray-500 dark:text-gray-400 text-center mb-4">
          This answer isn&apos;t here any more. It may have been deleted on another device.
        </Text>
        <Pressable onPress={() => router.replace("/answers")} className="active:opacity-60">
          <Text className="text-sm font-semibold text-brand-blue">See your answers</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const saved = !!answer.saved;
  const actions: { key: string; icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void; tint?: string }[] = [
    {
      key: "save",
      icon: saved ? "bookmark" : "bookmark-outline",
      label: saved ? "Saved" : "Save",
      onPress: () => {
        setSaved(id, !saved);
        show(saved ? "Removed from Saved" : "Saved. Find it in My notes under Answers.");
      },
    },
    ...(answer.rangeId
      ? [
          {
            key: "note",
            icon: "create-outline" as const,
            label: "Add to note",
            onPress: () => show(NOTE_RESULT_TEXT[addToNote(answer)](answer.reference ?? "this verse")),
          },
        ]
      : []),
    {
      key: "copy",
      icon: "copy-outline",
      label: "Copy",
      onPress: async () => {
        const text = `${answer.question}\n\n${plainAnswer(answer.answer)}${answer.reference ? `\n\n(${answer.reference})` : ""}`;
        show((await writeClipboard(text)) ? "Copied" : "Couldn't copy here");
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <BackButton fallback="/answers" className="p-1 mr-2" />
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">Answer</Text>
        <Pressable
          onPress={actions[0].onPress}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={saved ? "Remove from Saved" : "Save this answer"}
          className="p-1 active:opacity-60"
        >
          <Ionicons name={saved ? "bookmark" : "bookmark-outline"} size={22} color={BLUE} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 48 }}>
        <View className="flex-row items-center flex-wrap mb-3" style={{ gap: 8 }}>
          {answer.reference ? (
            <Pressable
              onPress={() => openPassage(answer)}
              disabled={!answer.rangeId}
              accessibilityRole={answer.rangeId ? "link" : undefined}
              accessibilityLabel={answer.rangeId ? `Open ${answer.reference} in the Reader` : answer.reference}
              className="flex-row items-center rounded-full px-3 py-1 bg-brand-blue/10 dark:bg-blue-300/15 active:opacity-70"
            >
              <Ionicons name="book-outline" size={13} color={BLUE} />
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">{answer.reference}</Text>
            </Pressable>
          ) : null}
          <Text className="text-xs text-gray-400 dark:text-gray-500">Asked {formatAskedDate(answer.askedAt)}</Text>
        </View>

        <Text
          style={{ fontFamily: serifFont }}
          className="text-2xl leading-8 text-gray-900 dark:text-white mb-5"
        >
          {displayQuestion(answer)}
        </Text>

        <FormattedText
          text={answer.answer}
          className="text-base text-gray-800 dark:text-gray-200"
          style={{ lineHeight: 25 }}
          onReferencePress={openReference}
        />

        <View className="flex-row flex-wrap mt-8" style={{ gap: 8 }}>
          {actions.map((a) => (
            <Pressable
              key={a.key}
              onPress={a.onPress}
              accessibilityRole="button"
              className="flex-row items-center rounded-xl px-4 py-2.5 border border-gray-200 dark:border-gray-700 active:opacity-70"
            >
              <Ionicons name={a.icon} size={16} color={BLUE} />
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100 ml-1.5">{a.label}</Text>
            </Pressable>
          ))}
        </View>

        {status ? (
          <Text accessibilityLiveRegion="polite" className="text-sm text-brand-blue dark:text-blue-300 mt-4">
            {status}
          </Text>
        ) : null}

        <View className="mt-10 pt-5 border-t border-gray-100 dark:border-gray-800">
          {confirmDelete ? (
            <View className="flex-row items-center" style={{ gap: 16 }}>
              <Text className="text-sm text-gray-600 dark:text-gray-300 flex-1">Delete this answer everywhere?</Text>
              <Pressable onPress={() => setConfirmDelete(false)} hitSlop={8} className="active:opacity-60">
                <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">Keep</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  deleteAnswer(id);
                  goBack();
                }}
                hitSlop={8}
                accessibilityRole="button"
                className="active:opacity-60"
              >
                <Text className="text-sm font-semibold text-red-600 dark:text-red-400">Delete</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => setConfirmDelete(true)}
              accessibilityRole="button"
              className="flex-row items-center self-start active:opacity-60"
            >
              <Ionicons name="trash-outline" size={15} color="#9CA3AF" />
              <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500 ml-1.5">Delete answer</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
