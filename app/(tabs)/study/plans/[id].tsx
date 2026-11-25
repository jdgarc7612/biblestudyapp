import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { LayoutAnimation, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlanProgressBar } from "../../../../components/plans/progress-bar";
import { ReadingText } from "../../../../components/plans/reading-text";
import { loadPassageText, ReflectBox } from "../../../../components/study/reflect-box";
import { serifFont } from "../../../../constants/fonts";
import { localDateString } from "../../../../lib/date";
import {
  doneDays,
  getPlan,
  isDayOpen,
  nextDay,
  planAnswerId,
  readingsLabel,
  type PlanDay,
  STUDY_PLANS,
} from "../../../../lib/plans";
import { planReflectionId } from "../../../../lib/reflect";
import { useAppStore } from "../../../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

/** The web build is static: one page per plan. */
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return STUDY_PLANS.map((p) => ({ id: p.id }));
}

/** One guided study: its days, today's reading and questions, and marking days done. */
export default function PlanScreen() {
  const router = useRouter();
  /** `day` opens that day (from My notes). */
  const { id, day: dayParam } = useLocalSearchParams<{ id: string; day?: string }>();
  const plan = getPlan(id);
  const activePlanId = useAppStore((s) => s.activePlanId);
  const progress = useAppStore((s) => (id ? s.planProgress[id] : undefined));
  const startPlan = useAppStore((s) => s.startPlan);
  const restartPlan = useAppStore((s) => s.restartPlan);
  const setPlanDayDone = useAppStore((s) => s.setPlanDayDone);
  const leavePlan = useAppStore((s) => s.leavePlan);

  const next = plan ? nextDay(plan, progress) : null;
  const today = localDateString();
  const nextOpen = !!plan && next !== null && isDayOpen(plan, progress, next, today);
  const [openDay, setOpenDay] = useState<number | null>(dayParam ? Number(dayParam) : nextOpen ? next : null);

  if (!plan) return <Redirect href="/study" />;

  const total = plan.days.length;
  const doneCount = doneDays(progress).length;
  const finished = next === null;
  const following = activePlanId === plan.id;

  const toggleDay = (day: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenDay((d) => (d === day ? null : day));
  };

  const markDone = (day: number, done: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (done && !following && !finished) startPlan(plan.id, total);
    // The day stays open; the next one opens tomorrow.
    setPlanDayDone(plan.id, day, done, total);
  };

  const ask = (label: string, question: string) =>
    router.push({ pathname: "/ai", params: { question: `About ${label}: ${question}` } });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/study"))}
          hitSlop={12}
          accessibilityLabel="Back"
          className="p-1 mr-2 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={24} color={BLUE} />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1" numberOfLines={1}>
          Guided study
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-full bg-brand-earth/15 items-center justify-center mr-3">
            <Ionicons name={plan.icon} size={18} color={EARTH} />
          </View>
          <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">
            {plan.tag} · {total} days
          </Text>
        </View>
        <Text style={{ fontFamily: serifFont }} className="text-[28px] leading-9 text-gray-900 dark:text-white mb-2">
          {plan.title}
        </Text>
        <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300">{plan.summary}</Text>

        {doneCount > 0 && (
          <View className="mt-5">
            <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {finished ? `All ${total} days done` : `${doneCount} of ${total} days done`}
            </Text>
            <PlanProgressBar value={doneCount} max={total} className="mt-2" />
          </View>
        )}

        {finished ? (
          <View className="rounded-3xl bg-brand-earth/10 border border-brand-earth/25 px-5 py-4 mt-5">
            <View className="flex-row items-center mb-1">
              <Ionicons name="checkmark-circle" size={18} color={EARTH} />
              <Text className="text-[15px] font-bold text-gray-900 dark:text-white ml-2">You finished this plan</Text>
            </View>
            <Text className="text-sm leading-5 text-gray-600 dark:text-gray-300 mb-3">
              Well done. Pick another plan, or go through this one again.
            </Text>
            <View className="flex-row" style={{ gap: 8 }}>
              <Pressable
                onPress={() => router.replace("/study")}
                className="flex-1 items-center rounded-2xl py-3 active:opacity-80"
                style={{ backgroundColor: BLUE }}
              >
                <Text className="text-[15px] font-semibold text-white">Find another plan</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  restartPlan(plan.id);
                  setOpenDay(1);
                }}
                className="items-center rounded-2xl px-4 py-3 bg-brand-blue/10 active:opacity-70"
              >
                <Text className="text-[15px] font-semibold text-brand-blue dark:text-blue-300">Start again</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          !following && (
            <Pressable
              onPress={() => {
                startPlan(plan.id, total);
                setOpenDay(next);
              }}
              className="flex-row items-center justify-center rounded-2xl py-3.5 mt-5 active:opacity-80"
              style={{ backgroundColor: BLUE }}
            >
              <Ionicons name="play" size={15} color="#FFFFFF" />
              <Text className="text-[15px] font-semibold text-white ml-2">
                {doneCount > 0 ? `Continue at day ${next}` : "Start this plan"}
              </Text>
            </Pressable>
          )
        )}

        <View className="mt-7" style={{ gap: 10 }}>
          {plan.days.map((day, i) => {
            const n = i + 1;
            const doneOn = progress?.done[n];
            const isNext = n === next;
            const locked = !isDayOpen(plan, progress, n, today);
            const isOpen = openDay === n && !locked;
            const label = readingsLabel(day.readings);
            return (
              <View
                key={n}
                className={`rounded-3xl ${
                  isOpen
                    ? "bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20"
                    : "border border-gray-100 dark:border-gray-800"
                }`}
              >
                <Pressable
                  onPress={() => toggleDay(n)}
                  disabled={locked}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen, disabled: locked }}
                  className={`flex-row items-center px-4 py-3.5 active:opacity-70 ${locked ? "opacity-60" : ""}`}
                >
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                      doneOn ? "" : isNext && !locked ? "bg-white dark:bg-gray-900 border border-brand-blue/40" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                    style={doneOn ? { backgroundColor: BLUE } : undefined}
                  >
                    {doneOn ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : locked ? (
                      <Ionicons name="lock-closed" size={13} color="#9CA3AF" />
                    ) : (
                      <Text className={`text-sm font-bold ${isNext ? "text-brand-blue" : "text-gray-500 dark:text-gray-400"}`}>
                        {n}
                      </Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">{day.title}</Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Day {n} · {label}
                      {isNext && locked ? " · Unlocks tomorrow" : isNext && following ? " · Up next" : ""}
                    </Text>
                  </View>
                  {!locked && <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" />}
                </Pressable>

                {isOpen && (
                  <View className="px-4 pb-4">
                    <DayLabel>Read</DayLabel>
                    <View style={{ gap: 8 }} className="mb-5">
                      {day.readings.map((r) => (
                        <ReadingText key={`${r.book}-${r.chapter}-${r.start ?? ""}`} reading={r} />
                      ))}
                    </View>

                    <DayLabel>Reflect</DayLabel>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 -mt-1 mb-2">
                      Your answers are private and kept in My notes.
                    </Text>
                    <View style={{ gap: 6 }} className="mb-4">
                      {day.questions.map((q, qi) => (
                        <View key={q} className="rounded-xl bg-white/80 dark:bg-gray-900/40 px-3 py-3">
                          <Text className="text-[15px] leading-6 text-gray-800 dark:text-gray-100">{q}</Text>
                          <AnswerBox id={planAnswerId(plan.id, n, qi + 1)} />
                          <Pressable
                            onPress={() => ask(label, q)}
                            hitSlop={6}
                            className="flex-row items-center self-start mt-1.5 active:opacity-60"
                          >
                            <Ionicons name="sparkles" size={12} color={EARTH} />
                            <Text className="text-xs font-semibold text-brand-blue dark:text-blue-300 ml-1">
                              Talk it through
                            </Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>

                    <DayReflect planId={plan.id} day={n} dayInfo={day} label={label} />

                    {doneOn ? (
                      <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                          {doneOn === today ? "Done today" : `Done ${formatDay(doneOn)}`}
                        </Text>
                        <Pressable onPress={() => markDone(n, false)} hitSlop={8} className="active:opacity-60">
                          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">Mark not done</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() => markDone(n, true)}
                        className="flex-row items-center justify-center rounded-2xl py-3 active:opacity-80"
                        style={{ backgroundColor: BLUE }}
                      >
                        <Ionicons name="checkmark-circle-outline" size={17} color="#FFFFFF" />
                        <Text className="text-[15px] font-semibold text-white ml-2">Mark day {n} done</Text>
                      </Pressable>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {following && !finished && (
          <Pressable onPress={leavePlan} className="items-center mt-8 py-2 active:opacity-60">
            <Text className="text-sm text-gray-400 dark:text-gray-500">Stop following this plan on Home</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/** A private answer to one question. Saves as you type; it also shows in My notes. */
function AnswerBox({ id }: { id: string }) {
  const saved = useAppStore((s) => s.planAnswers[id]?.text ?? "");
  const savePlanAnswer = useAppStore((s) => s.savePlanAnswer);
  const [text, setText] = useState(saved);
  const [height, setHeight] = useState(44);
  const latest = useRef(text);
  latest.current = text;

  // Save a moment after typing stops, and whatever is left when the day closes.
  useEffect(() => {
    if (text === saved) return;
    const timer = setTimeout(() => savePlanAnswer(id, text), 600);
    return () => clearTimeout(timer);
  }, [id, text, saved, savePlanAnswer]);
  useEffect(() => () => savePlanAnswer(id, latest.current), [id, savePlanAnswer]);

  return (
    <View className="flex-row items-start rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 mt-2.5">
      <TextInput
        value={text}
        onChangeText={setText}
        onBlur={() => savePlanAnswer(id, text)}
        placeholder="Write your answer"
        placeholderTextColor="#9CA3AF"
        multiline
        onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
        style={{ fontFamily: serifFont, height: Math.max(44, height) }}
        className="flex-1 py-2.5 text-[15px] leading-6 text-gray-900 dark:text-gray-100"
        accessibilityLabel="Your answer, only you can see it"
      />
      <Ionicons name="lock-closed-outline" size={13} color="#9CA3AF" style={{ marginTop: 14, marginLeft: 6 }} />
    </View>
  );
}

/** Reflect with AI on the day's answers, once they've written something. */
function DayReflect({ planId, day, dayInfo, label }: { planId: string; day: number; dayInfo: PlanDay; label: string }) {
  const translation = useAppStore((s) => s.translation);
  const planAnswers = useAppStore((s) => s.planAnswers);
  const id = planReflectionId(planId, day);
  const saved = useAppStore((s) => s.planReflections[id]);
  const savePlanReflection = useAppStore((s) => s.savePlanReflection);
  const answers = dayInfo.questions.map((q, qi) => ({
    prompt: q,
    text: planAnswers[planAnswerId(planId, day, qi + 1)]?.text ?? "",
  }));
  return (
    <ReflectBox
      kind="plan"
      reference={label}
      translation={translation}
      answers={answers}
      saved={saved}
      used={saved?.used ?? 0}
      getPassage={() => loadPassageText(translation, dayInfo.readings)}
      onSave={(r) => savePlanReflection(id, r)}
    />
  );
}

function DayLabel({ children }: { children: string }) {
  return (
    <Text className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
      {children}
    </Text>
  );
}

function formatDay(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
