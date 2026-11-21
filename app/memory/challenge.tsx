import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { CardMenu, DeckRow } from "../../components/study/memory-panel";
import { getPack } from "../../data/study/memory-packs";
import { getTranslation } from "../../lib/bible";
import { sortDeck, type MemoryCard } from "../../lib/memory";
import {
  challengeProgress,
  cleanChallengeName,
  CHALLENGE_MAX_VERSES,
  CHALLENGE_NAME_MAX,
  encodeChallenge,
  newChallengeId,
  type MemoryChallenge,
} from "../../lib/memory-challenge";
import { cardsForIds, passageId, passageReference } from "../../lib/memory-text";
import { copyText, shareText, webAppUrl } from "../../lib/share";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";
const GREEN = "#15803D";

/** Memorizing together: start a challenge from a collection or list (?from=), or open one (?id=). */
export default function ChallengeScreen() {
  const router = useRouter();
  const { id, from } = useLocalSearchParams<{ id?: string; from?: string }>();
  const challenge = useAppStore((s) => (id ? s.memoryChallenges[id] : undefined));

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
      {from ? (
        <StartView from={from} />
      ) : challenge && !challenge.left ? (
        <ChallengeView challenge={challenge} />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">This challenge isn&apos;t here anymore.</Text>
          <Pressable
            onPress={() => router.replace("/memory/join")}
            accessibilityRole="button"
            accessibilityLabel="Join a challenge with a code"
            className="mt-4 active:opacity-60"
          >
            <Text className="text-sm font-semibold text-brand-blue">Join with a code</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Starting one

function StartView({ from }: { from: string }) {
  const router = useRouter();
  const translation = useAppStore((s) => s.translation);
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const list = useAppStore((s) => s.memoryLists[from]);
  const addManyToMemoryDeck = useAppStore((s) => s.addManyToMemoryDeck);
  const saveMemoryChallenge = useAppStore((s) => s.saveMemoryChallenge);
  const pack = getPack(from);

  // References only: each person's device loads the words in their own translation.
  const verses = useMemo(() => {
    if (pack) return pack.passages.map((p) => ({ id: passageId(p), reference: passageReference(p) }));
    if (list && !list.deleted)
      return sortDeck(memoryDeck.filter((c) => c.collections.includes(from))).map((c) => ({ id: c.id, reference: c.verseReference }));
    return [];
  }, [pack, list, memoryDeck, from]);

  const [name, setName] = useState(pack?.title ?? list?.name ?? "");
  const [picked, setPicked] = useState<Set<string> | null>(null);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const selection = picked ?? new Set(verses.slice(0, CHALLENGE_MAX_VERSES).map((v) => v.id));
  const chosen = verses.filter((v) => selection.has(v.id));
  const tooMany = chosen.length > CHALLENGE_MAX_VERSES;

  const toggle = (vid: string) => {
    const next = new Set(selection);
    if (next.has(vid)) next.delete(vid);
    else next.add(vid);
    setPicked(next);
  };

  const start = async () => {
    setBusy(true);
    setProblem(null);
    try {
      const id = newChallengeId();
      const now = Date.now();
      const challenge: MemoryChallenge = {
        id,
        name: cleanChallengeName(name) || pack?.title || "Memorizing together",
        verses: chosen.map((v) => v.id),
        role: "started",
        createdAt: now,
        updatedAt: now,
      };
      // Verses already in the deck keep their progress and just join the challenge.
      const cards = await cardsForIds(translation, challenge.verses, [id]);
      saveMemoryChallenge(challenge);
      addManyToMemoryDeck(cards);
      router.replace({ pathname: "/memory/challenge", params: { id } });
    } catch {
      setProblem("Couldn't load the verses just now. Try again in a moment.");
      setBusy(false);
    }
  };

  if (verses.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
          There are no verses here to share yet. Add some to this list first.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}>
      <View className="w-12 h-12 rounded-full bg-brand-earth/15 items-center justify-center mb-3">
        <Ionicons name="people" size={22} color={EARTH} />
      </View>
      <Text className="text-3xl font-bold text-gray-900 dark:text-white" accessibilityRole="header">
        Memorize together
      </Text>
      <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mt-2">
        Learn the same verses as your family or small group. You&apos;ll get a code to send them. Each person adds the
        verses to their own Omeora and keeps their own progress.
      </Text>

      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mt-7 mb-2">Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        maxLength={CHALLENGE_NAME_MAX}
        placeholder="Our family: Peace"
        placeholderTextColor="#9CA3AF"
        accessibilityLabel="Challenge name"
        className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-3.5 text-base text-gray-900 dark:text-white"
      />

      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mt-7 mb-2">
        {`Verses (${chosen.length} chosen)`}
      </Text>
      <View style={{ gap: 8 }}>
        {verses.map((v) => {
          const on = selection.has(v.id);
          return (
            <Pressable
              key={v.id}
              onPress={() => toggle(v.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
              accessibilityLabel={v.reference}
              className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-3 active:opacity-70"
            >
              <Ionicons name={on ? "checkmark-circle" : "ellipse-outline"} size={20} color={on ? BLUE : "#9CA3AF"} />
              <Text className="flex-1 text-[15px] font-semibold text-gray-800 dark:text-gray-100 ml-3">{v.reference}</Text>
            </Pressable>
          );
        })}
      </View>

      {tooMany && (
        <Text className="text-sm text-gray-600 dark:text-gray-300 mt-4">
          A challenge holds up to {CHALLENGE_MAX_VERSES} verses. Choose a few less.
        </Text>
      )}
      {problem && (
        <Text className="text-sm text-gray-600 dark:text-gray-300 mt-4" accessibilityLiveRegion="polite">
          {problem}
        </Text>
      )}
      <Pressable
        onPress={start}
        disabled={busy || chosen.length === 0 || tooMany}
        accessibilityRole="button"
        accessibilityLabel={`Start the challenge with ${chosen.length} ${chosen.length === 1 ? "verse" : "verses"}`}
        accessibilityState={{ disabled: busy || chosen.length === 0 || tooMany }}
        className="rounded-2xl bg-brand-blue py-4 items-center mt-7 active:opacity-80"
        style={{ opacity: chosen.length === 0 || tooMany ? 0.5 : 1 }}
      >
        <Text className="text-base font-semibold text-white">{busy ? "Starting…" : "Start the challenge"}</Text>
      </Pressable>
      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
        Words from the {getTranslation(translation).name} on your device. Others see their own translation.
      </Text>
    </ScrollView>
  );
}

// ---------------------------------------------------------------------------
// One challenge

function ChallengeView({ challenge }: { challenge: MemoryChallenge }) {
  const router = useRouter();
  const translation = useAppStore((s) => s.translation);
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const addManyToMemoryDeck = useAppStore((s) => s.addManyToMemoryDeck);
  const leaveMemoryChallenge = useAppStore((s) => s.leaveMemoryChallenge);
  const [note, setNote] = useState<string | null>(null);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [menuFor, setMenuFor] = useState<MemoryCard | null>(null);

  const code = useMemo(() => encodeChallenge(challenge), [challenge]);
  const link = webAppUrl(`/memory/join?c=${code}`);
  const progress = challengeProgress(challenge, memoryDeck);
  const cards = sortDeck(memoryDeck.filter((c) => challenge.verses.includes(c.id)));
  const missing = challenge.verses.filter((v) => !memoryDeck.some((c) => c.id === v));

  const invite = async () => {
    const result = await shareText(
      `Let's memorize ${challenge.name} together in Omeora. Open this link to add the verses: ${link}\n\nOr paste this code under Memory > Join with a code: ${code}`
    );
    setNote(result === "copied" ? "Invite copied. Paste it in a text or email." : result === "failed" ? "Couldn't open sharing here. Copy the code below instead." : null);
  };
  const copy = async () => {
    const result = await copyText(code);
    setNote(result === "copied" ? "Code copied." : "Couldn't copy here. Select the code and copy it.");
  };
  const addMissing = async () => {
    try {
      const n = addManyToMemoryDeck(await cardsForIds(translation, missing, [challenge.id]));
      setNote(n > 0 ? `Added ${n} ${n === 1 ? "verse" : "verses"}.` : "Those verses are empty in your translation.");
    } catch {
      setNote("Couldn't load the verses just now. Try again in a moment.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}>
      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">Memorizing together</Text>
      <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1" accessibilityRole="header">
        {challenge.name}
      </Text>
      <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mt-2">
        {challenge.role === "started"
          ? `You started this with ${challenge.verses.length} ${challenge.verses.length === 1 ? "verse" : "verses"}. Send the invite to anyone you'd like to learn them with.`
          : `You joined from a code: ${challenge.verses.length} ${challenge.verses.length === 1 ? "verse" : "verses"}, learned alongside whoever shared it.`}
      </Text>

      {/* Your own progress */}
      <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-5 pt-4 pb-5 mt-6">
        <Text className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Your progress</Text>
        <View className="flex-row mt-3" style={{ gap: 8 }}>
          <Stat value={progress.secure} label="Secure" color={GREEN} />
          <Stat value={progress.learning} label="Learning" color={BLUE} />
          <Stat value={progress.notStarted} label="Not started" color={EARTH} />
        </View>
        <Pressable
          onPress={() => router.push({ pathname: "/memory/review", params: { mode: "practice", collection: challenge.id } })}
          accessibilityRole="button"
          accessibilityLabel={`Practice ${challenge.name}`}
          className="rounded-2xl bg-brand-blue py-4 items-center mt-4 active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Practice these verses</Text>
        </Pressable>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center leading-5">
          New verses arrive in your daily Review, up to 5 a day.
        </Text>
      </View>

      {missing.length > 0 && (
        <Pressable
          onPress={addMissing}
          accessibilityRole="button"
          accessibilityLabel={`Add the ${missing.length} verses of this challenge that aren't in your deck`}
          className="flex-row items-center self-start mt-4 active:opacity-60"
        >
          <Ionicons name="add-circle-outline" size={16} color={BLUE} />
          <Text className="text-sm font-semibold text-brand-blue ml-1.5">
            Add the {missing.length} {missing.length === 1 ? "verse" : "verses"} not in your deck
          </Text>
        </Pressable>
      )}

      {/* Invite */}
      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mt-8 mb-2">Invite others</Text>
      <View className="rounded-3xl border border-gray-100 dark:border-gray-800 px-5 py-4">
        <Text className="text-sm leading-5 text-gray-600 dark:text-gray-300">
          The invite holds the verse references and this name, nothing else. Anyone who opens it adds the verses to
          their own Omeora.
        </Text>
        <Pressable
          onPress={invite}
          accessibilityRole="button"
          accessibilityLabel={`Share an invite to ${challenge.name}`}
          className="flex-row items-center justify-center rounded-2xl bg-brand-earth/15 py-3.5 mt-4 active:opacity-70"
        >
          <Ionicons name="share-outline" size={17} color={EARTH} />
          <Text className="text-base font-semibold ml-2 text-[#8A6A44] dark:text-[#D9B88F]">
            Share invite
          </Text>
        </Pressable>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-4">Or give them this code</Text>
        <Text
          selectable
          className="text-[13px] text-gray-800 dark:text-gray-100 mt-1.5"
          style={{ fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "ui-monospace, Menlo, monospace" }) }}
          accessibilityLabel="Challenge code"
        >
          {code}
        </Text>
        {Platform.OS === "web" && (
          <Pressable onPress={copy} accessibilityRole="button" accessibilityLabel="Copy the code" hitSlop={8} className="flex-row items-center self-start mt-3 active:opacity-60">
            <Ionicons name="copy-outline" size={14} color={BLUE} />
            <Text className="text-sm font-semibold text-brand-blue ml-1.5">Copy code</Text>
          </Pressable>
        )}
        {note && (
          <Text className="text-sm text-gray-600 dark:text-gray-300 mt-3" accessibilityLiveRegion="polite">
            {note}
          </Text>
        )}
      </View>

      <View className="flex-row items-start mt-5 px-1">
        <Ionicons name="lock-closed-outline" size={14} color="#9CA3AF" style={{ marginTop: 2 }} />
        <Text className="flex-1 text-xs leading-5 text-gray-500 dark:text-gray-400 ml-2">
          Everyone keeps their own progress. Omeora doesn&apos;t show your verses or reviews to anyone else, and you
          won&apos;t see theirs. Cheer each other on in person.
        </Text>
      </View>

      {cards.length > 0 && (
        <>
          <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mt-8 mb-2">The verses</Text>
          <View style={{ gap: 8 }}>
            {cards.map((card) => (
              <DeckRow
                key={card.id}
                card={card}
                onMenu={() => setMenuFor(card)}
                onPress={() => router.push({ pathname: "/memory/review", params: { mode: "practice", ids: card.id } })}
              />
            ))}
          </View>
        </>
      )}

      {confirmLeave ? (
        <View className="rounded-3xl bg-gray-50 dark:bg-gray-800 px-5 py-4 mt-10">
          <Text className="text-[15px] leading-6 text-gray-800 dark:text-gray-100">
            Leave {challenge.name}? The verses stay in your deck with all your progress.
          </Text>
          <View className="flex-row mt-4" style={{ gap: 10 }}>
            <Pressable
              onPress={() => {
                leaveMemoryChallenge(challenge.id);
                router.replace({ pathname: "/study", params: { tab: "memory" } });
              }}
              accessibilityRole="button"
              accessibilityLabel={`Leave ${challenge.name}`}
              className="flex-1 rounded-2xl border border-gray-300 dark:border-gray-600 py-3 items-center active:opacity-70"
            >
              <Text className="text-base font-semibold text-gray-700 dark:text-gray-200">Leave</Text>
            </Pressable>
            <Pressable
              onPress={() => setConfirmLeave(false)}
              accessibilityRole="button"
              accessibilityLabel="Stay in the challenge"
              className="flex-1 rounded-2xl bg-brand-blue py-3 items-center active:opacity-80"
            >
              <Text className="text-base font-semibold text-white">Stay</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable onPress={() => setConfirmLeave(true)} accessibilityRole="button" accessibilityLabel="Leave this challenge" className="self-center mt-10 active:opacity-60" hitSlop={8}>
          <Text className="text-sm text-gray-500 dark:text-gray-400">Leave this challenge</Text>
        </Pressable>
      )}
      <CardMenu card={menuFor} onClose={() => setMenuFor(null)} />
    </ScrollView>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-white/70 dark:bg-gray-900/40 px-3 py-3 items-center" accessible accessibilityLabel={`${value} ${label}`}>
      <Text className="text-2xl font-bold" style={{ color }}>
        {value}
      </Text>
      <Text className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{label}</Text>
    </View>
  );
}
