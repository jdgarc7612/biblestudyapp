import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlanProgressBar } from "../../../../components/plans/progress-bar";
import { serifFont } from "../../../../constants/fonts";
import { doneDays, getPlan, nextDay, STUDY_PLANS, type StudyPlan } from "../../../../lib/plans";
import { useAppStore } from "../../../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

/** Every guided study, with the one you're following on top. */
export default function PlansScreen() {
  const router = useRouter();
  const activePlanId = useAppStore((s) => s.activePlanId);
  const planProgress = useAppStore((s) => s.planProgress);
  const active = getPlan(activePlanId);
  const others = STUDY_PLANS.filter((p) => p.id !== active?.id);

  const openPlan = (plan: StudyPlan) => router.push({ pathname: "/read/plans/[id]", params: { id: plan.id } });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/read"))}
          hitSlop={12}
          accessibilityLabel="Back"
          className="p-1 mr-2 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={24} color={BLUE} />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">Guided studies</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
        <Text style={{ fontFamily: serifFont }} className="text-[17px] leading-7 text-gray-700 dark:text-gray-300 mb-6">
          A short reading each day, with a couple of questions to sit with. Pick one and Home will keep your place.
        </Text>

        {active && (
          <>
            <SectionLabel>{"You're following"}</SectionLabel>
            <PlanCard
              plan={active}
              done={doneDays(planProgress[active.id]).length}
              next={nextDay(active, planProgress[active.id])}
              highlight
              onPress={() => openPlan(active)}
            />
            <View className="h-4" />
            <SectionLabel>More plans</SectionLabel>
          </>
        )}

        <View style={{ gap: 12 }}>
          {others.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              done={doneDays(planProgress[plan.id]).length}
              next={nextDay(plan, planProgress[plan.id])}
              onPress={() => openPlan(plan)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mb-2">{children}</Text>
  );
}

function PlanCard({
  plan,
  done,
  next,
  highlight,
  onPress,
}: {
  plan: StudyPlan;
  done: number;
  next: number | null;
  highlight?: boolean;
  onPress: () => void;
}) {
  const total = plan.days.length;
  const status = next === null ? "Finished" : done > 0 ? `Day ${next} of ${total}` : `${total} days`;
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-3xl px-5 py-4 active:opacity-80 ${
        highlight
          ? "bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20"
          : "border border-gray-100 dark:border-gray-800"
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
      {done > 0 && <PlanProgressBar value={done} max={total} />}
    </Pressable>
  );
}
