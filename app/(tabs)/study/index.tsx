import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlanProgressBar } from "../../../components/plans/progress-bar";
import { MemoryPanel } from "../../../components/study/memory-panel";
import { serifFont } from "../../../constants/fonts";
import { localDateString } from "../../../lib/date";
import { doneDays, getPlan, isDayOpen, nextDay, readingsLabel, STUDY_PLANS, type StudyPlan } from "../../../lib/plans";
import { isDue } from "../../../lib/srs";
import { useAppStore } from "../../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

type Side = "plans" | "memory";

/**
 * The Study tab: the daily habits in one place. Today's plan day and memory review sit on top,
 * then a Plans / Memory switch.
 */
export default function StudyScreen() {
  const router = useRouter();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [side, setSide] = useState<Side>(tab === "memory" ? "memory" : "plans");
  useEffect(() => {
    if (tab === "memory" || tab === "plans") setSide(tab);
  }, [tab]);

  const activePlanId = useAppStore((s) => s.activePlanId);
  const planProgress = useAppStore((s) => s.planProgress);
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const active = getPlan(activePlanId);
  const dueCount = memoryDeck.filter((c) => isDue(c.dueDate)).length;

  const openPlan = (plan: StudyPlan, day?: number | null) =>
    router.push({ pathname: "/study/plans/[id]", params: { id: plan.id, ...(day ? { day: String(day) } : {}) } });

  // Plans you've started (besides the one you're following), then the rest.
  const started = STUDY_PLANS.filter((p) => p.id !== active?.id && doneDays(planProgress[p.id]).length > 0);
  const fresh = STUDY_PLANS.filter((p) => p.id !== active?.id && doneDays(planProgress[p.id]).length === 0);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40, maxWidth: 720, width: "100%", alignSelf: "center" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-5">Study</Text>

        <TodayCard
          active={active}
          onPlan={(day) => (active ? openPlan(active, day) : setSide("plans"))}
          dueCount={dueCount}
          deckSize={memoryDeck.length}
          onMemory={() => (memoryDeck.length > 0 ? router.push("/memory/review") : setSide("memory"))}
        />

        <View className="flex-row rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 mt-6 mb-5">
          {(["plans", "memory"] as const).map((s) => {
            const on = s === side;
            return (
              <Pressable
                key={s}
                onPress={() => setSide(s)}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                className="flex-1 flex-row items-center justify-center rounded-xl py-2.5"
                style={[{ gap: 6 }, on ? { backgroundColor: BLUE } : undefined]}
              >
                <Text className="text-sm font-semibold" style={{ color: on ? "#FFFFFF" : "#6B7280" }}>
                  {s === "plans" ? "Plans" : "Memory"}
                </Text>
                {s === "memory" && dueCount > 0 && (
                  <View
                    className="rounded-full px-1.5 items-center justify-center"
                    style={{ minWidth: 18, height: 18, backgroundColor: on ? "#FFFFFF33" : EARTH }}
                  >
                    <Text className="text-[11px] font-bold text-white">{dueCount}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {side === "plans" ? (
          <>
            {active && (
              <>
                <SectionLabel>{"You're following"}</SectionLabel>
                <PlanCard plan={active} progressDone={doneDays(planProgress[active.id]).length} next={nextDay(active, planProgress[active.id])} highlight onPress={() => openPlan(active)} />
              </>
            )}
            {started.length > 0 && (
              <>
                <SectionLabel top>Started</SectionLabel>
                <View style={{ gap: 12 }}>
                  {started.map((p) => (
                    <PlanCard key={p.id} plan={p} progressDone={doneDays(planProgress[p.id]).length} next={nextDay(p, planProgress[p.id])} onPress={() => openPlan(p)} />
                  ))}
                </View>
              </>
            )}
            <SectionLabel top={!!active || started.length > 0}>{active ? "More plans" : "Pick a plan"}</SectionLabel>
            {!active && (
              <Text style={{ fontFamily: serifFont }} className="text-[16px] leading-7 text-gray-600 dark:text-gray-300 mb-4">
                A short reading each day, with a couple of questions to sit with. One new day opens each day.
              </Text>
            )}
            <View style={{ gap: 12 }}>
              {fresh.map((p) => (
                <PlanCard key={p.id} plan={p} progressDone={0} next={1} onPress={() => openPlan(p)} />
              ))}
            </View>
          </>
        ) : (
          <MemoryPanel />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/** Today's two habits: the next plan day, and memory verses due. */
function TodayCard({
  active,
  onPlan,
  dueCount,
  deckSize,
  onMemory,
}: {
  active: StudyPlan | undefined;
  onPlan: (day: number | null) => void;
  dueCount: number;
  deckSize: number;
  onMemory: () => void;
}) {
  const progress = useAppStore((s) => (active ? s.planProgress[active.id] : undefined));
  const today = localDateString();
  const next = active ? nextDay(active, progress) : null;
  const open = !!active && next !== null && isDayOpen(active, progress, next, today);
  const day = active && next ? active.days[next - 1] : null;

  let planTitle: string;
  let planSub: string;
  let planDone = false;
  if (!active) {
    planTitle = "Start a guided study";
    planSub = "Pick a plan below to build a daily habit";
  } else if (!day) {
    planTitle = `You finished ${active.title}`;
    planSub = "Pick another plan below";
    planDone = true;
  } else if (!open) {
    planTitle = "Done for today";
    planSub = `Day ${next} of ${active.title} opens tomorrow`;
    planDone = true;
  } else {
    planTitle = `Day ${next}: ${day.title}`;
    planSub = `${readingsLabel(day.readings)} · ${active.title}`;
  }

  const memoryTitle =
    deckSize === 0 ? "Memorize a verse" : dueCount > 0 ? `${dueCount} ${dueCount === 1 ? "verse" : "verses"} to review` : "Memory all caught up";
  const memorySub =
    deckSize === 0 ? "Tap any verse while reading to add it" : dueCount > 0 ? "A few minutes keeps them fresh" : `Practice any of your ${deckSize} anytime`;

  return (
    <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 overflow-hidden">
      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth px-5 pt-4">Today</Text>
      <TodayRow
        icon={planDone ? "checkmark-circle" : "map"}
        iconBg={planDone ? EARTH : BLUE}
        title={planTitle}
        sub={planSub}
        onPress={() => onPlan(open ? next : null)}
      />
      <View className="h-px bg-brand-blue/15 mx-5" />
      <TodayRow
        icon="albums"
        iconBg={dueCount > 0 ? EARTH : "#9CA3AF"}
        title={memoryTitle}
        sub={memorySub}
        onPress={onMemory}
      />
    </View>
  );
}

function TodayRow({
  icon,
  iconBg,
  title,
  sub,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  title: string;
  sub: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" className="flex-row items-center px-5 py-3.5 active:opacity-70">
      <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: iconBg }}>
        <Ionicons name={icon} size={18} color="#FFFFFF" />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-gray-900 dark:text-white" numberOfLines={2}>
          {title}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5" numberOfLines={2}>
          {sub}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={BLUE} />
    </Pressable>
  );
}

function SectionLabel({ children, top }: { children: string; top?: boolean }) {
  return (
    <Text className={`text-xs font-semibold uppercase tracking-wide text-brand-earth mb-2 ${top ? "mt-6" : ""}`}>
      {children}
    </Text>
  );
}

function PlanCard({
  plan,
  progressDone,
  next,
  highlight,
  onPress,
}: {
  plan: StudyPlan;
  progressDone: number;
  next: number | null;
  highlight?: boolean;
  onPress: () => void;
}) {
  const total = plan.days.length;
  const status = next === null ? "Finished" : progressDone > 0 ? `Day ${next} of ${total}` : `${total} days`;
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-3xl px-5 py-4 active:opacity-80 ${
        highlight ? "bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700" : "border border-gray-100 dark:border-gray-800"
      }`}
    >
      <View className="flex-row items-center mb-2">
        <View className="w-9 h-9 rounded-full bg-brand-earth/15 items-center justify-center mr-3">
          <Ionicons name={plan.icon} size={16} color={EARTH} />
        </View>
        <View className="flex-1">
          <Text className="text-[17px] font-bold text-gray-900 dark:text-white">{plan.title}</Text>
          <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-0.5">
            {plan.tag} · {status}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </View>
      <Text className="text-sm leading-5 text-gray-600 dark:text-gray-300">{plan.summary}</Text>
      {progressDone > 0 && <PlanProgressBar value={progressDone} max={total} />}
    </Pressable>
  );
}
