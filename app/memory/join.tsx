import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatReference, getBook, getTranslation } from "../../lib/bible";
import { parseCardId } from "../../lib/memory";
import { decodeChallenge, joinedChallenge } from "../../lib/memory-challenge";
import { cardsForIds } from "../../lib/memory-text";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

const isBook = (id: string) => !!getBook(id);

function referenceOf(id: string): string {
  const place = parseCardId(id);
  if (!place) return id;
  return formatReference(getBook(place.book)?.name ?? place.book, place.chapter, place.start, place.end);
}

/** Joining a challenge someone shared: from a link (?c=) or a pasted code. */
export default function JoinChallengeScreen() {
  const router = useRouter();
  const { c } = useLocalSearchParams<{ c?: string }>();
  const translation = useAppStore((s) => s.translation);
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const challenges = useAppStore((s) => s.memoryChallenges);
  const addManyToMemoryDeck = useAppStore((s) => s.addManyToMemoryDeck);
  const saveMemoryChallenge = useAppStore((s) => s.saveMemoryChallenge);

  const [input, setInput] = useState(typeof c === "string" ? c : "");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const invite = useMemo(() => (input.trim() ? decodeChallenge(input, isBook) : null), [input]);
  const existing = invite ? challenges[invite.id] : undefined;
  const already = !!existing && !existing.left;
  const inDeck = invite ? invite.verses.filter((v) => memoryDeck.some((card) => card.id === v)).length : 0;

  const join = async () => {
    if (!invite) return;
    setBusy(true);
    setProblem(null);
    try {
      const cards = await cardsForIds(translation, invite.verses, [invite.id]);
      saveMemoryChallenge(joinedChallenge(invite, existing));
      addManyToMemoryDeck(cards);
      router.replace({ pathname: "/memory/challenge", params: { id: invite.id } });
    } catch {
      setProblem("Couldn't load the verses just now. Try again in a moment.");
      setBusy(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-4 py-2" style={{ maxWidth: 720, width: "100%", alignSelf: "center" }}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace({ pathname: "/study", params: { tab: "memory" } }))}
          accessibilityRole="button"
          accessibilityLabel="Back to Memory"
          hitSlop={12}
          className="flex-row items-center p-1 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={22} color={BLUE} />
          <Text className="text-base text-brand-blue">Memory</Text>
        </Pressable>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}
      >
        <View className="w-12 h-12 rounded-full bg-brand-earth/15 items-center justify-center mb-3">
          <Ionicons name="people" size={22} color={EARTH} />
        </View>
        <Text className="text-3xl font-bold text-gray-900 dark:text-white" accessibilityRole="header">
          Join a challenge
        </Text>
        <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mt-2">
          Someone shared verses to memorize together. They&apos;ll be added to your own verses, and your progress
          stays yours.
        </Text>

        <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mt-7 mb-2">Code or link</Text>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Paste the code that starts with OM1"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          accessibilityLabel="Challenge code or link"
          className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-3.5 text-[15px] text-gray-900 dark:text-white"
          style={{ minHeight: 72, textAlignVertical: "top" }}
        />
        {input.trim().length > 0 && !invite && (
          <View className="flex-row items-start mt-3" accessibilityLiveRegion="polite">
            <Ionicons name="alert-circle-outline" size={16} color={EARTH} style={{ marginTop: 1 }} />
            <Text className="flex-1 text-sm text-gray-600 dark:text-gray-300 ml-2">
              That code doesn&apos;t look complete. Check that all of it was copied.
            </Text>
          </View>
        )}

        {invite && (
          <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-5 py-5 mt-6">
            <Text className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Memorizing together</Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{invite.name}</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {invite.verses.length} {invite.verses.length === 1 ? "verse" : "verses"}
              {inDeck > 0 ? ` · ${inDeck} already in your deck, and they keep their progress` : ""}
            </Text>
            <View className="mt-4" style={{ gap: 6 }}>
              {invite.verses.map((v) => (
                <View key={v} className="flex-row items-center">
                  <Ionicons name="book-outline" size={14} color={BLUE} />
                  <Text className="text-[15px] text-gray-800 dark:text-gray-100 ml-2">{referenceOf(v)}</Text>
                </View>
              ))}
            </View>
            {problem && (
              <Text className="text-sm text-gray-600 dark:text-gray-300 mt-4" accessibilityLiveRegion="polite">
                {problem}
              </Text>
            )}
            {already ? (
              <Pressable
                onPress={() => router.replace({ pathname: "/memory/challenge", params: { id: invite.id } })}
                accessibilityRole="button"
                accessibilityLabel={`You're already in ${invite.name}. Open it`}
                className="rounded-2xl bg-brand-blue py-4 items-center mt-5 active:opacity-80"
              >
                <Text className="text-base font-semibold text-white">You&apos;re in. Open it</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={join}
                disabled={busy}
                accessibilityRole="button"
                accessibilityLabel={`Join ${invite.name} and add its verses`}
                className="rounded-2xl bg-brand-blue py-4 items-center mt-5 active:opacity-80"
              >
                <Text className="text-base font-semibold text-white">{busy ? "Adding…" : "Join and add the verses"}</Text>
              </Pressable>
            )}
            <Text className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Words from the {getTranslation(translation).name}, the translation you read in.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
