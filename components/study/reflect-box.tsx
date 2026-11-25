import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, LayoutAnimation, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FormattedText } from "../ai/formatted-text";
import { getReflection } from "../../lib/ai-client";
import { isLiveAiConfigured } from "../../lib/ai-config";
import { track } from "../../lib/activity";
import { useAccount } from "../../lib/auth/account";
import { getBook, loadBook, type FoundReference, type TranslationId } from "../../lib/bible";
import {
  REFLECTIONS_PER_ITEM,
  reflectState,
  writingFingerprint,
  type ReflectAnswer,
  type Reflection,
} from "../../lib/reflect";

const EARTH = "#C19A6B";

/**
 * Reflect with AI: under a reader's answers, one tap sends what they wrote (and the passage) for a
 * short, Scripture-first response. Nothing is sent until they tap. The reflection is kept with
 * their writing, so reopening it never calls the AI again.
 */
export function ReflectBox({
  kind,
  reference,
  translation,
  answers,
  saved,
  used,
  getPassage,
  onSave,
}: {
  kind: "plan" | "soap";
  reference: string;
  translation: TranslationId;
  answers: ReflectAnswer[];
  saved: Reflection | undefined;
  used: number;
  /** The passage text with verse numbers, loaded when they tap. */
  getPassage: () => Promise<string>;
  onSave: (reflection: Reflection) => void;
}) {
  const router = useRouter();
  const signedIn = useAccount((s) => !!s.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const state = reflectState(answers, saved, used);
  const canAskAi = isLiveAiConfigured ? signedIn : true;
  const left = Math.max(0, REFLECTIONS_PER_ITEM - used);

  const reflect = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    let text = "";
    try {
      text = await getPassage();
    } catch {
      // Handled below.
    }
    if (!text) {
      setError("Couldn't load the passage. Please try again.");
      setLoading(false);
      return;
    }
    const result = await getReflection({ kind, reference, text, translation, answers });
    if (result.ok) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      // Which kind only; never what was written.
      track("reflect", kind);
      onSave({ text: result.reflection, at: Date.now(), basis: writingFingerprint(answers) });
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const openReference = (ref: FoundReference) =>
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: {
        book: ref.book.id,
        chapter: String(ref.chapter),
        ...(ref.verse ? { v: String(ref.verse), e: String(ref.endVerse ?? ref.verse) } : {}),
      },
    });

  if (state === "empty" && !saved) {
    return (
      <View className="flex-row items-center mt-1 mb-1">
        <Ionicons name="sparkles-outline" size={13} color="#9CA3AF" />
        <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 flex-1">
          Write an answer, then you can reflect on it with AI.
        </Text>
      </View>
    );
  }

  const button = (label: string) => (
    <Pressable
      onPress={reflect}
      disabled={loading}
      accessibilityRole="button"
      accessibilityHint="Sends what you wrote and the passage to the AI for a short response"
      className="flex-row items-center justify-center rounded-2xl py-3 bg-brand-earth/15 active:opacity-70"
    >
      {loading ? <ActivityIndicator size="small" color={EARTH} /> : <Ionicons name="sparkles" size={15} color={EARTH} />}
      <Text className="text-[15px] font-semibold text-gray-900 dark:text-white ml-2">{loading ? "Reflecting…" : label}</Text>
    </Pressable>
  );

  return (
    <View className="mb-4">
      {saved && (
        <View className="rounded-2xl bg-brand-earth/10 border border-brand-earth/25 px-4 py-3.5 mb-2.5">
          <View className="flex-row items-center mb-2">
            <Ionicons name="sparkles" size={13} color={EARTH} />
            <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth ml-1.5 flex-1">
              Reflection on {reference}
            </Text>
          </View>
          <FormattedText
            text={saved.text}
            onReferencePress={openReference}
            className="text-[15px] leading-6 text-gray-800 dark:text-gray-100"
          />
          <Text className="text-[11px] leading-4 text-gray-500 dark:text-gray-400 mt-2.5">
            {state === "current" ? "On what you wrote." : "On an earlier version of what you wrote."} AI can be wrong, so test it
            against Scripture.
          </Text>
        </View>
      )}

      {!canAskAi ? (
        !saved && <Text className="text-xs text-gray-500 dark:text-gray-400">Sign in to reflect on your answers with AI.</Text>
      ) : state === "ready" ? (
        <View>
          {button(saved ? "Reflect again" : "Reflect with AI")}
          <Text className="text-[11px] leading-4 text-gray-500 dark:text-gray-400 text-center mt-1.5">
            {saved
              ? `Your writing changed. ${left} left for this ${kind === "plan" ? "day" : "study"}.`
              : "Sends your answers to the AI for a short response from the passage. Doesn't use your daily questions."}
          </Text>
        </View>
      ) : state === "used_up" ? (
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          You&apos;ve used the {REFLECTIONS_PER_ITEM} reflections for this {kind === "plan" ? "day" : "study"}.
        </Text>
      ) : null}
      {error && <Text className="text-xs text-red-600 dark:text-red-400 mt-2">{error}</Text>}
    </View>
  );
}

/**
 * The text of one or more passages, verse numbers included, for a reflection. A whole chapter is
 * start undefined. Chapters after the first are labeled so the AI can cite them.
 */
export async function loadPassageText(
  translation: TranslationId,
  parts: { book: string; chapter: number; start?: number; end?: number }[]
): Promise<string> {
  const out: string[] = [];
  for (const p of parts) {
    const book = await loadBook(translation, p.book);
    const verses = book.c[p.chapter - 1] ?? [];
    const start = p.start ?? 1;
    const end = p.end ?? (p.start != null ? p.start : verses.length);
    const lines = verses
      .slice(start - 1, end)
      .map((t, i) => (t ? `${start + i} ${t}` : ""))
      .filter(Boolean);
    if (!lines.length) continue;
    const name = getBook(p.book)?.name ?? p.book;
    out.push(parts.length > 1 ? `[${name} ${p.chapter}]\n${lines.join(" ")}` : lines.join(" "));
  }
  return out.join("\n\n");
}
