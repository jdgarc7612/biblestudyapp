import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { FormattedText } from "../../components/ai/formatted-text";
import { ReadingText } from "../../components/plans/reading-text";
import { PassagePicker } from "../../components/study/passage-picker";
import { serifFont } from "../../constants/fonts";
import { claimStudyBonus, getStudyHint } from "../../lib/ai-client";
import { isLiveAiConfigured } from "../../lib/ai-config";
import { useAccount } from "../../lib/auth/account";
import { useChapter } from "../../lib/bible";
import { localDateString } from "../../lib/date";
import {
  canFinish,
  hintsLeft,
  OTHER_METHODS,
  passageReference,
  resumeStep,
  SOAP_STEPS,
  WHOLE_CHAPTER,
  type Passage,
  type SoapStep,
  type StudyEntry,
} from "../../lib/study-journal";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

type View_ = { kind: "pick" } | { kind: "intro"; passage: Passage } | { kind: "step"; index: number } | { kind: "summary"; earned?: boolean };

/**
 * One SOAP study: Scripture, Observation, Application, Prayer, one step per screen.
 * Opened with ?id= for a saved study, ?book=&chapter=&start=&end= to start on a passage,
 * or with nothing to pick a passage first.
 */
export default function StudyEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; book?: string; chapter?: string; start?: string; end?: string }>();
  const startStudy = useAppStore((s) => s.startStudy);
  const [id, setId] = useState<string | null>(params.id ?? null);
  const entry = useAppStore((s) => (id ? s.studyEntries[id] : undefined));

  const [view, setView] = useState<View_>(() => {
    if (params.id) {
      const saved = useAppStore.getState().studyEntries[params.id];
      if (saved && !saved.deleted) return saved.finishedAt ? { kind: "summary" } : { kind: "step", index: resumeStep(saved) };
    }
    if (params.book && params.chapter) {
      const start = Number(params.start) || 1;
      return {
        kind: "intro",
        passage: {
          book: params.book,
          chapter: Number(params.chapter),
          start,
          end: params.end ? Number(params.end) : params.start ? start : WHOLE_CHAPTER,
        },
      };
    }
    return { kind: "pick" };
  });

  const go = (next: View_) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setView(next);
  };
  const close = () => (router.canGoBack() ? router.back() : router.replace("/study"));

  const missing = params.id && (!entry || entry.deleted) && view.kind !== "pick" && view.kind !== "intro";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top", "bottom"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable onPress={close} hitSlop={12} accessibilityLabel="Back" className="p-1 mr-2 active:opacity-60">
          <Ionicons name="chevron-back" size={24} color={BLUE} />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1" numberOfLines={1}>
          {view.kind === "pick" ? "Start a study" : entry ? entry.reference : "SOAP study"}
        </Text>
      </View>

      {missing ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-[15px] text-gray-500 dark:text-gray-400 text-center mb-4">This study isn&apos;t here any more.</Text>
          <Pressable onPress={() => router.replace("/journal")} className="rounded-2xl px-5 py-3 active:opacity-80" style={{ backgroundColor: BLUE }}>
            <Text className="text-[15px] font-semibold text-white">See your studies</Text>
          </Pressable>
        </View>
      ) : view.kind === "pick" ? (
        <Scroll>
          <Text style={{ fontFamily: serifFont }} className="text-[26px] leading-9 text-gray-900 dark:text-white mb-2">
            What would you like to study?
          </Text>
          <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mb-6">
            Pick a short passage. You&apos;ll go through it with SOAP: Scripture, Observation, Application, Prayer.
          </Text>
          <PassagePicker onPick={(passage) => go({ kind: "intro", passage })} />
        </Scroll>
      ) : view.kind === "intro" ? (
        <Intro
          passage={view.passage}
          onBegin={() => {
            const newId = startStudy(view.passage);
            setId(newId);
            router.setParams({ id: newId, book: undefined, chapter: undefined, start: undefined, end: undefined });
            go({ kind: "step", index: 0 });
          }}
        />
      ) : entry && id && view.kind === "step" ? (
        <StepView
          key={view.index}
          id={id}
          entry={entry}
          index={view.index}
          onIndex={(index) => go({ kind: "step", index })}
          onFinished={(earned) => go({ kind: "summary", earned })}
        />
      ) : entry && id ? (
        <Summary
          id={id}
          entry={entry}
          earned={view.kind === "summary" ? view.earned : undefined}
          onEdit={(index) => go({ kind: "step", index })}
          onDone={close}
        />
      ) : null}
    </SafeAreaView>
  );
}

function Scroll({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

/** What SOAP is, before the first step. */
function Intro({ passage, onBegin }: { passage: Passage; onBegin: () => void }) {
  const [showOthers, setShowOthers] = useState(false);
  return (
    <Scroll>
      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mb-2">Study journal</Text>
      <Text style={{ fontFamily: serifFont }} className="text-[28px] leading-9 text-gray-900 dark:text-white mb-3">
        {passageReference(passage)}
      </Text>
      <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mb-5">
        Four short steps, one at a time. Take as long as you like; it saves as you write.
      </Text>

      <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-5 py-4 mb-5" style={{ gap: 12 }}>
        {SOAP_STEPS.map((s) => (
          <View key={s.id} className="flex-row items-start">
            <Letter letter={s.letter} on />
            <View className="flex-1 ml-3">
              <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">{s.title}</Text>
              <Text className="text-sm leading-5 text-gray-600 dark:text-gray-300">{s.prompt}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row items-center mb-5">
        <Ionicons name="lock-closed-outline" size={13} color="#9CA3AF" />
        <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 flex-1">
          Only you can see what you write. It&apos;s kept with your account.
        </Text>
      </View>

      <Pressable
        onPress={onBegin}
        className="flex-row items-center justify-center rounded-2xl py-3.5 active:opacity-80"
        style={{ backgroundColor: BLUE }}
      >
        <Text className="text-[15px] font-semibold text-white">Begin</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
      </Pressable>

      <Pressable onPress={() => setShowOthers((v) => !v)} className="items-center mt-5 py-2 active:opacity-60">
        <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500">Try another method</Text>
      </Pressable>
      {showOthers && (
        <View className="rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-3 mt-1">
          {OTHER_METHODS.map((m) => (
            <View key={m} className="flex-row items-center justify-between py-1.5">
              <Text className="text-sm text-gray-700 dark:text-gray-200">{m}</Text>
              <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500">Coming soon</Text>
            </View>
          ))}
        </View>
      )}
    </Scroll>
  );
}

function Letter({ letter, on, done }: { letter: string; on?: boolean; done?: boolean }) {
  return (
    <View
      className="w-8 h-8 rounded-full items-center justify-center"
      style={{ backgroundColor: on ? BLUE : done ? `${BLUE}33` : "#E5E7EB66" }}
    >
      <Text className="text-sm font-bold" style={{ color: on ? "#FFFFFF" : done ? BLUE : "#9CA3AF" }}>
        {letter}
      </Text>
    </View>
  );
}

/** One step: the prompt, a writing box, and hints behind a small button. */
function StepView({
  id,
  entry,
  index,
  onIndex,
  onFinished,
}: {
  id: string;
  entry: StudyEntry;
  index: number;
  onIndex: (index: number) => void;
  onFinished: (earned: boolean) => void;
}) {
  const step = SOAP_STEPS[index];
  const saveStudyStep = useAppStore((s) => s.saveStudyStep);
  const finishStudy = useAppStore((s) => s.finishStudy);
  const [text, setText] = useState(entry[step.id]);
  const [height, setHeight] = useState(140);
  const [showPassage, setShowPassage] = useState(step.id === "scripture");
  const latest = useRef(text);
  latest.current = text;
  const last = index === SOAP_STEPS.length - 1;

  // Saves a moment after typing stops, and on leaving the step.
  useEffect(() => {
    if (text.trim() === entry[step.id]) return;
    const timer = setTimeout(() => saveStudyStep(id, step.id, text), 600);
    return () => clearTimeout(timer);
  }, [id, step.id, text, entry, saveStudyStep]);
  useEffect(() => () => saveStudyStep(id, step.id, latest.current), [id, step.id, saveStudyStep]);

  const current = { ...entry, [step.id]: text };
  const ready = canFinish(current);
  const needed = SOAP_STEPS.filter((s) => s.required && !current[s.id].trim()).map((s) => s.title);

  const finish = () => {
    saveStudyStep(id, step.id, text);
    const earned = finishStudy(id);
    if (earned) void claimStudyBonus(localDateString());
    onFinished(earned);
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32, maxWidth: 720, width: "100%", alignSelf: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center mb-5" style={{ gap: 8 }} accessibilityLabel={`Step ${index + 1} of ${SOAP_STEPS.length}`}>
          {SOAP_STEPS.map((s, i) => (
            <Pressable key={s.id} onPress={() => onIndex(i)} hitSlop={4} accessibilityLabel={s.title} className="flex-row items-center">
              <Letter letter={s.letter} on={i === index} done={!!entry[s.id] && i !== index} />
              {i < SOAP_STEPS.length - 1 && <View className="h-px w-4 ml-2 bg-gray-200 dark:bg-gray-700" />}
            </Pressable>
          ))}
        </View>

        <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mb-1.5">{step.title}</Text>
        <Text style={{ fontFamily: serifFont }} className="text-[24px] leading-8 text-gray-900 dark:text-white mb-1.5">
          {step.prompt}
        </Text>
        <Text className="text-sm leading-5 text-gray-500 dark:text-gray-400 mb-4">{step.help}</Text>

        {showPassage ? (
          <View className="mb-4">
            <View className="rounded-2xl bg-brand-blue/5 dark:bg-brand-blue/15">
              <ReadingText reading={{ book: entry.book, chapter: entry.chapter, start: entry.start, end: entry.end }} />
            </View>
            {step.id !== "scripture" && (
              <Pressable onPress={() => setShowPassage(false)} hitSlop={6} className="self-start mt-1.5 active:opacity-60">
                <Text className="text-xs font-semibold text-brand-blue dark:text-blue-300">Hide passage</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <Pressable
            onPress={() => setShowPassage(true)}
            className="flex-row items-center self-start rounded-full px-3 py-1.5 mb-4 bg-brand-blue/10 dark:bg-blue-300/15 active:opacity-70"
          >
            <Ionicons name="book-outline" size={13} color={BLUE} />
            <Text className="text-xs font-semibold text-brand-blue dark:text-blue-300 ml-1.5">Show {entry.reference}</Text>
          </Pressable>
        )}

        <View className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4">
          <TextInput
            value={text}
            onChangeText={setText}
            onBlur={() => saveStudyStep(id, step.id, text)}
            placeholder={step.placeholder}
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
            style={{ fontFamily: serifFont, height: Math.max(140, height) }}
            className="py-3 text-[17px] leading-7 text-gray-900 dark:text-gray-100"
            accessibilityLabel={`${step.title}: ${step.prompt}`}
          />
        </View>

        <HintBox id={id} entry={entry} step={step.id} draft={text} />
      </ScrollView>

      <View className="flex-row items-center px-5 pt-3 pb-3 border-t border-gray-100 dark:border-gray-800" style={{ gap: 10 }}>
        {index > 0 ? (
          <Pressable onPress={() => onIndex(index - 1)} className="rounded-2xl px-4 py-3 bg-brand-blue/10 active:opacity-70">
            <Text className="text-[15px] font-semibold text-brand-blue dark:text-blue-300">Back</Text>
          </Pressable>
        ) : null}
        {last ? (
          <View className="flex-1">
            <Pressable
              onPress={finish}
              disabled={!ready}
              accessibilityState={{ disabled: !ready }}
              className="flex-row items-center justify-center rounded-2xl py-3 active:opacity-80"
              style={{ backgroundColor: ready ? EARTH : "#D1D5DB" }}
            >
              <Ionicons name="checkmark-circle-outline" size={17} color="#FFFFFF" />
              <Text className="text-[15px] font-semibold text-white ml-2">
                {entry.finishedAt ? "Save study" : "Finish study"}
              </Text>
            </Pressable>
            {!ready && (
              <Text className="text-[11px] text-gray-400 dark:text-gray-500 text-center mt-1.5">
                Write a little for {needed.join(", ")} to finish
              </Text>
            )}
          </View>
        ) : (
          <Pressable
            onPress={() => onIndex(index + 1)}
            className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-80"
            style={{ backgroundColor: BLUE }}
          >
            <Text className="text-[15px] font-semibold text-white">Next: {SOAP_STEPS[index + 1].title}</Text>
            <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

/** Questions to get going, and an AI hint on this passage (a few per study). */
function HintBox({ id, entry, step, draft }: { id: string; entry: StudyEntry; step: SoapStep; draft: string }) {
  const info = SOAP_STEPS.find((s) => s.id === step)!;
  const recordStudyHint = useAppStore((s) => s.recordStudyHint);
  const signedIn = useAccount((s) => !!s.user);
  const chapter = useChapter(entry.translation, entry.book, entry.chapter);
  const [open, setOpen] = useState(!!entry.hints[step]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saved = entry.hints[step];
  const left = hintsLeft(entry);
  const canAskAi = isLiveAiConfigured ? signedIn : true;

  const passageText = chapter.verses
    .filter((v) => v.verse >= entry.start && v.verse <= entry.end)
    .map((v) => `${v.verse} ${v.text}`)
    .join(" ");

  const getHint = async () => {
    if (!passageText || loading) return;
    setLoading(true);
    setError(null);
    const result = await getStudyHint({
      step,
      reference: entry.reference,
      text: passageText,
      translation: entry.translation,
      draft: draft.trim(),
    });
    if (result.ok) {
      if (!recordStudyHint(id, step, result.hint)) setError("That's all the hints for this study.");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <View className="mt-3">
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((v) => !v);
        }}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        className="flex-row items-center self-start rounded-full px-3 py-1.5 bg-brand-earth/10 active:opacity-70"
      >
        <Ionicons name="bulb-outline" size={13} color={EARTH} />
        <Text className="text-xs font-semibold text-brand-earth ml-1.5">{open ? "Hide hints" : "Need a hint?"}</Text>
      </Pressable>

      {open && (
        <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-3.5 mt-2">
          {info.tips.map((t) => (
            <View key={t} className="flex-row items-start py-1">
              <Text className="text-brand-earth mr-2">•</Text>
              <Text className="flex-1 text-sm leading-5 text-gray-700 dark:text-gray-200">{t}</Text>
            </View>
          ))}

          <View className="h-px bg-gray-200 dark:bg-gray-700 my-3" />
          {saved ? (
            <View>
              <View className="flex-row items-center mb-1.5">
                <Ionicons name="sparkles" size={12} color={EARTH} />
                <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1.5">For {entry.reference}</Text>
              </View>
              <FormattedText text={saved} className="text-sm leading-6 text-gray-800 dark:text-gray-100" />
            </View>
          ) : !canAskAi ? (
            <Text className="text-xs text-gray-500 dark:text-gray-400">Sign in to get a hint written for this passage.</Text>
          ) : left <= 0 ? (
            <Text className="text-xs text-gray-500 dark:text-gray-400">You&apos;ve used this study&apos;s passage hints. The questions above still help.</Text>
          ) : (
            <Pressable onPress={getHint} disabled={loading || !passageText} className="flex-row items-center self-start active:opacity-60">
              {loading ? <ActivityIndicator size="small" color={EARTH} /> : <Ionicons name="sparkles" size={13} color={EARTH} />}
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">
                {loading ? "Thinking…" : "Hint for this passage"}
              </Text>
              {!loading && (
                <Text className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                  {left} left · doesn&apos;t use your questions
                </Text>
              )}
            </Pressable>
          )}
          {error && <Text className="text-xs text-red-600 dark:text-red-400 mt-2">{error}</Text>}
        </View>
      )}
    </View>
  );
}

/** A finished study, read back in full. Each part can be edited. */
function Summary({
  id,
  entry,
  earned,
  onEdit,
  onDone,
}: {
  id: string;
  entry: StudyEntry;
  earned?: boolean;
  onEdit: (index: number) => void;
  onDone: () => void;
}) {
  const router = useRouter();
  const deleteStudy = useAppStore((s) => s.deleteStudy);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const finishedOn = entry.finishedAt
    ? new Date(entry.finishedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <Scroll>
      {earned !== undefined && (
        <View className="rounded-3xl bg-brand-earth/10 border border-brand-earth/25 px-5 py-4 mb-6">
          <View className="flex-row items-center mb-1">
            <Ionicons name="checkmark-circle" size={18} color={EARTH} />
            <Text className="text-[15px] font-bold text-gray-900 dark:text-white ml-2">Study finished</Text>
          </View>
          <Text className="text-sm leading-5 text-gray-600 dark:text-gray-300">
            {earned
              ? "Well done. You've earned 1 extra Ask AI question today."
              : "Well done. It's saved with your other studies."}
          </Text>
        </View>
      )}

      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mb-1">SOAP study</Text>
      <Text style={{ fontFamily: serifFont }} className="text-[28px] leading-9 text-gray-900 dark:text-white">
        {entry.reference}
      </Text>
      {finishedOn && <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-5">{finishedOn}</Text>}

      <View style={{ gap: 18 }}>
        {SOAP_STEPS.map((s, i) => (
          <View key={s.id}>
            <View className="flex-row items-center justify-between mb-1.5">
              <View className="flex-row items-center">
                <Letter letter={s.letter} done />
                <Text className="text-[15px] font-semibold text-gray-900 dark:text-white ml-2.5">{s.title}</Text>
              </View>
              <Pressable onPress={() => onEdit(i)} hitSlop={8} className="active:opacity-60" accessibilityLabel={`Edit ${s.title}`}>
                <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">Edit</Text>
              </Pressable>
            </View>
            <Text style={{ fontFamily: serifFont }} className="text-[16px] leading-7 text-gray-800 dark:text-gray-200">
              {entry[s.id] || <Text className="text-gray-400 dark:text-gray-500">Nothing written</Text>}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row mt-8" style={{ gap: 8 }}>
        <Pressable onPress={onDone} className="flex-1 items-center rounded-2xl py-3 active:opacity-80" style={{ backgroundColor: BLUE }}>
          <Text className="text-[15px] font-semibold text-white">Done</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/read/[book]/[chapter]",
              params: {
                book: entry.book,
                chapter: String(entry.chapter),
                ...(entry.end < WHOLE_CHAPTER ? { v: String(entry.start), e: String(entry.end) } : {}),
              },
            })
          }
          className="items-center rounded-2xl px-4 py-3 bg-brand-blue/10 active:opacity-70"
        >
          <Text className="text-[15px] font-semibold text-brand-blue dark:text-blue-300">Open in Bible</Text>
        </Pressable>
      </View>

      <View className="mt-8 items-center">
        {confirmDelete ? (
          <View className="flex-row items-center" style={{ gap: 16 }}>
            <Text className="text-sm text-gray-600 dark:text-gray-300">Delete this study everywhere?</Text>
            <Pressable onPress={() => setConfirmDelete(false)} hitSlop={8} className="active:opacity-60">
              <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">Keep</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                deleteStudy(id);
                router.replace("/journal");
              }}
              hitSlop={8}
              className="active:opacity-60"
            >
              <Text className="text-sm font-semibold text-red-600 dark:text-red-400">Delete</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setConfirmDelete(true)} hitSlop={8} className="flex-row items-center active:opacity-60">
            <Ionicons name="trash-outline" size={14} color="#9CA3AF" />
            <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500 ml-1.5">Delete study</Text>
          </Pressable>
        )}
      </View>
    </Scroll>
  );
}
