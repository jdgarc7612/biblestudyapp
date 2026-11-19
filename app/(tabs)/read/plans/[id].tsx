import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { LayoutAnimation, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlanProgressBar } from "../../../../components/plans/progress-bar";
import { serifFont } from "../../../../constants/fonts";
import { localDateString } from "../../../../lib/date";
import {
  doneDays,
  getPlan,
  nextDay,
  readingLabel,
  readingsLabel,
  STUDY_PLANS,
  type PlanReading,
} from "../../../../lib/plans";
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
  const { id } = useLocalSearchParams<{ id: string }>();
  const plan = getPlan(id);
  const activePlanId = useAppStore((s) => s.activePlanId);
  const progress = useAppStore((s) => (id ? s.planProgress[id] : undefined));
  const startPlan = useAppStore((s) => s.startPlan);
  const restartPlan = useAppStore((s) => s.restartPlan);
  const setPlanDayDone = useAppStore((s) => s.setPlanDayDone);
  const leavePlan = useAppStore((s) => s.leavePlan);

  const next = plan ? nextDay(plan, progress) : null;
  const [openDay, setOpenDay] = useState<number | null>(next ?? 1);

  if (!plan) return <Redirect href="/read/plans" />;

  const total = plan.days.length;
  const doneCount = doneDays(progress).length;
  const finished = next === null;
  const following = activePlanId === plan.id;
  const today = localDateString();

  const toggleDay = (day: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenDay((d) => (d === day ? null : day));
  };

  const markDone = (day: number, done: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (done && !following && !finished) startPlan(plan.id, total);
    setPlanDayDone(plan.id, day, done, total);
    if (done) {
      const after = { ...(progress?.done ?? {}), [day]: today };
      for (let d = 1; d <= total; d++) {
        if (!after[d]) {
          setOpenDay(d);
          return;
        }
      }
      setOpenDay(null);
    }
  };

  const read = (r: PlanReading) =>
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: {
        book: r.book,
        chapter: String(r.chapter),
        ...(r.start != null ? { v: String(r.start), e: String(r.end ?? r.start) } : {}),
      },
    });

  const ask = (label: string, question: string) =>
    router.push({ pathname: "/ai", params: { question: `About ${label}: ${question}` } });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/read/plans"))}
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

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 48 }}>
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
                onPress={() => router.push("/read/plans")}
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
            const isOpen = openDay === n;
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
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  className="flex-row items-center px-4 py-3.5 active:opacity-70"
                >
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                      doneOn ? "" : isNext ? "bg-white dark:bg-gray-900 border border-brand-blue/40" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                    style={doneOn ? { backgroundColor: BLUE } : undefined}
                  >
                    {doneOn ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
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
                      {isNext && following ? " · Up next" : ""}
                    </Text>
                  </View>
                  <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" />
                </Pressable>

                {isOpen && (
                  <View className="px-4 pb-4">
                    <DayLabel>Read</DayLabel>
                    <View style={{ gap: 6 }} className="mb-4">
                      {day.readings.map((r) => (
                        <Pressable
                          key={readingLabel(r)}
                          onPress={() => read(r)}
                          className="flex-row items-center rounded-xl bg-white/80 dark:bg-gray-900/40 px-3 py-3 active:opacity-70"
                        >
                          <Ionicons name="book-outline" size={16} color={BLUE} />
                          <Text style={{ fontFamily: serifFont }} className="flex-1 text-[16px] text-gray-900 dark:text-white ml-2.5">
                            {readingLabel(r)}
                          </Text>
                          <Ionicons name="arrow-forward" size={15} color={BLUE} />
                        </Pressable>
                      ))}
                    </View>

                    <DayLabel>Reflect</DayLabel>
                    <View style={{ gap: 6 }} className="mb-4">
                      {day.questions.map((q) => (
                        <View key={q} className="rounded-xl bg-white/80 dark:bg-gray-900/40 px-3 py-3">
                          <Text className="text-[15px] leading-6 text-gray-800 dark:text-gray-100">{q}</Text>
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
