import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { FirstLetterRecall, TIERS, type LetterTier } from "../../components/memory/first-letter-recall";
import { FlashcardRecall } from "../../components/memory/flashcard-recall";
import { GradeButtons } from "../../components/memory/grade-buttons";
import { LearnFlow } from "../../components/memory/learn-flow";
import { ListenRecall } from "../../components/memory/listen-recall";
import { METHODS, STITCH_METHOD } from "../../components/memory/methods";
import { ReciteRecall } from "../../components/memory/recite-recall";
import { ReferenceQuiz } from "../../components/memory/reference-quiz";
import { StitchRecall } from "../../components/memory/stitch-recall";
import { TypingRecall } from "../../components/memory/typing-recall";
import { WordBankRecall, type BlankLevel } from "../../components/memory/word-bank-recall";
import { WordOrderRecall } from "../../components/memory/word-order-recall";
import { getPack } from "../../data/study/memory-packs";
import {
  buildReviewQueue,
  canStitch,
  isDue,
  isNew,
  isPerfectSession,
  passageMembers,
  passageOrder,
  previewOutcomes,
  smartMethod,
  sortDeck,
  stitchOrder,
  type MemoryCard,
  type MemoryMethod,
  type RecallMethod,
  type SessionKind,
} from "../../lib/memory";
import type { Grade } from "../../lib/srs";
import { suggestGradeFromAccuracy } from "../../lib/verse-diff";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";

type Exercise = Exclude<MemoryMethod, "smart">;

const LEVELS: { id: BlankLevel; label: string }[] = [
  { id: "light", label: "A few" },
  { id: "more", label: "More" },
  { id: "all", label: "All" },
];

/**
 * A Memory session.
 * - Review (default): today's due verses plus a few new ones, snapshotted when it opens.
 * - Practice (?mode=practice, optionally &ids=a,b, &collection=pack-peace, or &passage=<id> for a
 *   long passage's verses in order and then the whole): extra rehearsal that never pushes a verse
 *   further out.
 * A long passage and its verses are kept together in order wherever they come up.
 */
export default function MemorySessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; ids?: string; collection?: string; passage?: string }>();
  const kind: SessionKind = params.mode === "practice" ? "practice" : "review";

  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const defaultMethod = useAppStore((s) => s.memoryMethod);
  const memoryLists = useAppStore((s) => s.memoryLists);
  const currentStreak = useAppStore((s) => s.currentMemoryStreak);
  const saveGradedCard = useAppStore((s) => s.saveGradedCard);
  const markMemoryReviewDone = useAppStore((s) => s.markMemoryReviewDone);
  const restoreMemoryCard = useAppStore((s) => s.restoreMemoryCard);
  const awardPerfectRecallBonus = useAppStore((s) => s.awardPerfectRecallBonus);

  // The queue is fixed when the session opens, so grading never reshuffles it.
  const queue = useMemo(() => {
    const deck = useAppStore.getState().memoryDeck;
    if (kind === "review") return stitchOrder(buildReviewQueue(deck), deck);
    if (params.passage) return passageOrder(params.passage, deck);
    if (params.ids) {
      const wanted = params.ids.split(",");
      return wanted.filter((id) => deck.some((c) => c.id === id));
    }
    const pool = params.collection ? deck.filter((c) => c.collections.includes(params.collection!)) : deck;
    return stitchOrder(sortDeck(pool).map((c) => c.id), deck);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<{ before: MemoryCard; grade: Grade; accuracy?: number }[]>([]);
  const card = memoryDeck.find((c) => c.id === queue[index]);
  const isComplete = queue.length === 0 || index >= queue.length;

  // Per-card state, reset when the card changes.
  const [chosen, setChosen] = useState<Exercise | null>(null);
  const [level, setLevel] = useState<BlankLevel>("more");
  const [tier, setTier] = useState<LetterTier>(1);
  const [result, setResult] = useState<{ accuracy?: number; at: Date } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const resetCard = () => {
    setChosen(null);
    setResult(null);
    setAttempt((a) => a + 1);
  };

  const learning = !!card && isNew(card);
  // A long passage whose verses were just practiced (or a passage session) is put together in order.
  const passageWarm =
    !!card && canStitch(card) && (params.passage === card.id || passageMembers(card, memoryDeck).some((m) => history.some((h) => h.before.id === m.id)));
  const pickFor = (c: MemoryCard): Exercise => {
    if (passageWarm) return "stitch";
    if (defaultMethod === "smart" || defaultMethod === "stitch") return smartMethod(c);
    return defaultMethod;
  };
  const method: Exercise | "learn" = !card ? "flashcard" : learning ? "learn" : (chosen ?? pickFor(card));

  // Smart sets the cue level from how the verse is doing.
  useEffect(() => {
    if (!card || learning) return;
    const weak = card.srs.state !== 2;
    setLevel(weak ? "light" : "more");
    setTier(card.srs.scheduled_days >= 21 ? 2 : weak ? 0 : 1);
  }, [card?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const recallMethod: RecallMethod = method;
  const outcomes = useMemo(
    () => (card && result ? previewOutcomes(card, kind, recallMethod, result.at, result.accuracy) : null),
    [card, result, kind, recallMethod]
  );
  const suggested = result?.accuracy !== undefined ? suggestGradeFromAccuracy(result.accuracy) : undefined;

  const grade = (g: Grade) => {
    if (!card || !outcomes) return;
    saveGradedCard(outcomes[g].card);
    setHistory((h) => [...h, { before: card, grade: g, accuracy: result?.accuracy }]);
    if (Platform.OS !== "web") {
      void Haptics.impactAsync(g === "again" ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light);
    }
    setIndex((i) => i + 1);
    resetCard();
  };

  const undo = () => {
    const last = history[history.length - 1];
    if (!last) return;
    restoreMemoryCard(last.before);
    setHistory((h) => h.slice(0, -1));
    setIndex((i) => Math.max(0, i - 1));
    resetCard();
  };

  const bonusChecked = useRef(false);
  useEffect(() => {
    if (!isComplete || bonusChecked.current || kind !== "review") return;
    bonusChecked.current = true;
    // Finishing Review (or opening it with nothing due) puts Home's reminder away for today.
    markMemoryReviewDone();
    if (isPerfectSession(history)) awardPerfectRecallBonus();
  }, [isComplete, kind, history, awardPerfectRecallBonus, markMemoryReviewDone]);

  const close = () => (router.canGoBack() ? router.back() : router.replace({ pathname: "/study", params: { tab: "memory" } }));
  const done = () => router.dismissTo({ pathname: "/study", params: { tab: "memory" } });
  const openInRead = () =>
    card &&
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: { book: card.book, chapter: String(card.chapter), v: String(card.start), ...(card.end !== card.start ? { e: String(card.end) } : {}) },
    });
  const askAbout = () =>
    card &&
    router.push({
      pathname: "/ai",
      params: {
        verseRef: card.verseReference,
        verseText: card.verseText,
        translation: card.translation,
        question: "Help me understand this verse so I can memorize it. Suggest a memory aid that doesn't change its meaning.",
      },
    });

  const sessionTitle =
    kind === "review"
      ? "Review"
      : params.passage
        ? "Practice · In order"
        : params.collection
          ? `Practice · ${getPack(params.collection)?.title ?? memoryLists[params.collection]?.name ?? "Collection"}`
          : "Practice";
  // The reference quiz asks for the address, so it stays hidden until answered.
  const hideReference = method === "reference" && !result;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top", "bottom"]}>
      <View className="px-5 pt-2 pb-3" style={{ maxWidth: 720, width: "100%", alignSelf: "center" }}>
        <View className="flex-row items-center justify-between">
          <Pressable onPress={close} hitSlop={12} accessibilityRole="button" accessibilityLabel="End session" className="p-1 active:opacity-60">
            <Ionicons name="close" size={24} color={BLUE} />
          </Pressable>
          <View className="items-center">
            <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">{sessionTitle}</Text>
            {!isComplete && (
              <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5" accessibilityLabel={`Verse ${index + 1} of ${queue.length}`}>
                {index + 1} of {queue.length}
              </Text>
            )}
          </View>
          <Pressable
            onPress={undo}
            disabled={history.length === 0}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Undo last grade"
            accessibilityState={{ disabled: history.length === 0 }}
            className="p-1 active:opacity-60"
            style={{ opacity: history.length === 0 ? 0 : 1 }}
          >
            <Ionicons name="arrow-undo" size={22} color={BLUE} />
          </Pressable>
        </View>
        {!isComplete && (
          <View className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 mt-3 overflow-hidden">
            <View className="h-1 rounded-full" style={{ width: `${(index / queue.length) * 100}%`, backgroundColor: BLUE }} />
          </View>
        )}
      </View>

      {isComplete ? (
        <Complete
          kind={kind}
          reviewed={history.length}
          queueEmpty={queue.length === 0}
          stillDue={memoryDeck.filter((c) => isDue(c)).length}
          streak={currentStreak}
          onDone={done}
          onPractice={() => router.replace({ pathname: "/memory/review", params: { mode: "practice" } })}
          deckSize={memoryDeck.length}
        />
      ) : card ? (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-baseline mb-4">
            <Text className="text-lg font-bold text-brand-blue" accessibilityRole="header">
              {hideReference ? "Which verse is this?" : card.verseReference}
            </Text>
            <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 ml-2">{card.translation}</Text>
          </View>

          {!learning && !result && (
            <MethodPicker
              value={method as Exercise}
              stitch={canStitch(card)}
              onChange={(m) => {
                setChosen(m);
                setAttempt((a) => a + 1);
              }}
            />
          )}
          {!learning && !result && method === "blanks" && (
            <Segments label="Blanks" options={LEVELS} value={level} onChange={(v) => { setLevel(v); setAttempt((a) => a + 1); }} />
          )}
          {!learning && !result && method === "firstLetter" && (
            <Segments
              label="Level"
              options={TIERS.map((t, i) => ({ id: i as LetterTier, label: t.label }))}
              value={tier}
              onChange={(v) => { setTier(v); setAttempt((a) => a + 1); }}
            />
          )}

          <View key={`${card.id}-${attempt}`} className="mt-2">
            {method === "learn" && <LearnFlow card={card} onAsk={askAbout} onComplete={(a) => setResult({ accuracy: a, at: new Date() })} />}
            {method === "flashcard" && (
              <FlashcardRecall reference={card.verseReference} text={card.verseText} onComplete={() => setResult({ at: new Date() })} />
            )}
            {method === "blanks" && (
              <WordBankRecall text={card.verseText} seed={card.id} level={level} onComplete={(a) => setResult({ accuracy: a, at: new Date() })} />
            )}
            {method === "firstLetter" && (
              <FirstLetterRecall text={card.verseText} seed={card.id} tier={tier} onComplete={(a) => setResult({ accuracy: a, at: new Date() })} />
            )}
            {method === "wordOrder" && (
              <WordOrderRecall
                reference={card.verseReference}
                text={card.verseText}
                seed={`${card.id}-${attempt}`}
                onComplete={(a) => setResult({ accuracy: a, at: new Date() })}
              />
            )}
            {method === "type" && <TypingRecall text={card.verseText} onComplete={(a) => setResult({ accuracy: a, at: new Date() })} />}
            {method === "listen" && (
              <ListenRecall
                reference={card.verseReference}
                text={card.verseText}
                onComplete={() => setResult({ at: new Date() })}
                onRecite={() => {
                  setChosen("recite");
                  setAttempt((a) => a + 1);
                }}
              />
            )}
            {method === "recite" && (
              <ReciteRecall reference={card.verseReference} text={card.verseText} onComplete={() => setResult({ at: new Date() })} />
            )}
            {method === "reference" && (
              <ReferenceQuiz card={card} deck={memoryDeck} onComplete={(a) => setResult({ accuracy: a, at: new Date() })} />
            )}
            {method === "stitch" && (
              <StitchRecall card={card} warm={passageWarm} onComplete={(a) => setResult({ accuracy: a, at: new Date() })} />
            )}
          </View>

          {outcomes && result && (
            <View className="mt-8">
              <GradeButtons outcomes={outcomes} now={result.at} kind={kind} suggested={suggested} onGrade={grade} />
            </View>
          )}

          <View className="flex-row justify-center mt-10" style={{ gap: 24 }}>
            <SecondaryLink icon="book-outline" label="Open in Read" onPress={openInRead} />
            {method !== "learn" && <SecondaryLink icon="sparkles-outline" label="Ask about this verse" onPress={askAbout} />}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center mb-6">This verse was removed from your deck.</Text>
          <Pressable
            onPress={() => setIndex((i) => i + 1)}
            accessibilityRole="button"
            accessibilityLabel="Skip to the next verse"
            className="rounded-2xl bg-brand-blue px-8 py-3.5 active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">Skip</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

function MethodPicker({ value, stitch, onChange }: { value: Exercise; stitch: boolean; onChange: (m: Exercise) => void }) {
  const options = [...(stitch ? [STITCH_METHOD] : []), ...METHODS.filter((m) => m.id !== "smart")];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }} className="mb-3">
      {options.map((m) => {
        const on = m.id === value;
        return (
          <Pressable
            key={m.id}
            onPress={() => onChange(m.id as Exercise)}
            accessibilityRole="button"
            accessibilityLabel={`Practice with ${m.label}`}
            accessibilityState={{ selected: on }}
            className="flex-row items-center rounded-full px-3.5 py-2 active:opacity-70"
            style={on ? { backgroundColor: BLUE } : { borderWidth: 1, borderColor: "#9CA3AF55" }}
          >
            <Ionicons name={m.icon} size={14} color={on ? "#FFFFFF" : "#6B7280"} />
            <Text className="text-[13px] font-semibold ml-1.5" style={{ color: on ? "#FFFFFF" : "#6B7280" }}>
              {m.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function Segments<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View className="flex-row items-center mb-4">
      <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-3">{label}</Text>
      <View className="flex-row rounded-xl bg-gray-100 dark:bg-gray-800 p-0.5">
        {options.map((o) => {
          const on = o.id === value;
          return (
            <Pressable
              key={String(o.id)}
              onPress={() => onChange(o.id)}
              accessibilityRole="button"
              accessibilityLabel={`${label}: ${o.label}`}
              accessibilityState={{ selected: on }}
              className="rounded-lg px-3 py-1.5"
              style={on ? { backgroundColor: BLUE } : undefined}
            >
              <Text className="text-xs font-semibold" style={{ color: on ? "#FFFFFF" : "#6B7280" }}>
                {o.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function SecondaryLink({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link" accessibilityLabel={label} hitSlop={8} className="flex-row items-center active:opacity-60">
      <Ionicons name={icon} size={14} color="#9CA3AF" />
      <Text className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 ml-1.5">{label}</Text>
    </Pressable>
  );
}

function Complete({
  kind,
  reviewed,
  queueEmpty,
  stillDue,
  streak,
  deckSize,
  onDone,
  onPractice,
}: {
  kind: SessionKind;
  reviewed: number;
  queueEmpty: boolean;
  stillDue: number;
  streak: number;
  deckSize: number;
  onDone: () => void;
  onPractice: () => void;
}) {
  const caughtUp = queueEmpty && kind === "review";
  return (
    <View className="flex-1 items-center justify-center px-8" style={{ maxWidth: 520, width: "100%", alignSelf: "center" }}>
      <View className="w-16 h-16 rounded-full bg-brand-earth/15 items-center justify-center mb-5">
        <Ionicons name={caughtUp ? "leaf" : "checkmark"} size={28} color="#C19A6B" />
      </View>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center" accessibilityRole="header">
        {caughtUp ? "All caught up" : kind === "review" ? "Review complete" : "Practice complete"}
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400 text-center leading-6">
        {caughtUp
          ? "Nothing is due right now. Practicing won't push any verse further out."
          : `You went over ${reviewed} ${reviewed === 1 ? "verse" : "verses"}.`}
      </Text>

      {!caughtUp && (
        <View className="flex-row w-full mt-8" style={{ gap: 10 }}>
          <Stat value={reviewed} label="Reviewed" />
          <Stat value={stillDue} label="Still due" />
          <Stat value={streak} label="Day streak" />
        </View>
      )}

      <Pressable onPress={onDone} accessibilityRole="button" accessibilityLabel="Done, back to Memory" className="w-full rounded-2xl bg-brand-blue py-4 items-center mt-8 active:opacity-80">
        <Text className="text-base font-semibold text-white">Done</Text>
      </Pressable>
      {caughtUp && deckSize > 0 && (
        <Pressable onPress={onPractice} accessibilityRole="button" accessibilityLabel="Practice anyway" hitSlop={8} className="mt-4 active:opacity-60">
          <Text className="text-sm font-semibold text-brand-blue">Practice anyway</Text>
        </Pressable>
      )}
    </View>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 py-4 items-center" accessible accessibilityLabel={`${value} ${label}`}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</Text>
    </View>
  );
}
