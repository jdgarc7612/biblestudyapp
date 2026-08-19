import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppStore } from "../../store/useAppStore";
import { isDue } from "../../lib/srs";

const BADGE_LABELS: Record<string, string> = {
  "read-7": "7-Day Reading Streak",
  "read-30": "30-Day Reading Streak",
  "read-100": "100-Day Reading Streak",
  "memory-7": "7-Day Memory Streak",
  "memory-30": "30-Day Memory Streak",
  "memory-100": "100-Day Memory Streak",
};

function StreakCard({
  icon,
  color,
  label,
  current,
  longest,
  freezes,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
  current: number;
  longest: number;
  freezes: number;
}) {
  return (
    <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
      <View className="flex-row items-center mb-2" style={{ gap: 6 }}>
        <Ionicons name={icon} size={16} color={color} />
        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          {label}
        </Text>
      </View>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        {current} {current === 1 ? "day" : "days"}
      </Text>
      <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">Best: {longest}d</Text>
      <View className="flex-row items-center mt-2" style={{ gap: 4 }}>
        <Ionicons name="snow-outline" size={12} color="#9CA3AF" />
        <Text className="text-[11px] text-gray-400 dark:text-gray-500">
          {freezes} freeze{freezes === 1 ? "" : "s"}
        </Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const displayName = useAppStore((state) => state.displayName);
  const tokenBalance = useAppStore((state) => state.tokenBalance);
  const currentReadStreak = useAppStore((state) => state.currentReadStreak);
  const longestReadStreak = useAppStore((state) => state.longestReadStreak);
  const readStreakFreezesAvailable = useAppStore((state) => state.readStreakFreezesAvailable);
  const currentMemoryStreak = useAppStore((state) => state.currentMemoryStreak);
  const longestMemoryStreak = useAppStore((state) => state.longestMemoryStreak);
  const memoryStreakFreezesAvailable = useAppStore((state) => state.memoryStreakFreezesAvailable);
  const memoryDeck = useAppStore((state) => state.memoryDeck);
  const milestonesAchieved = useAppStore((state) => state.milestonesAchieved);

  const cardsMastered = memoryDeck.filter((c) => c.repetitions >= 3).length;
  const dueCount = memoryDeck.filter((c) => isDue(c.dueDate)).length;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center mb-6">
          <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mr-4">
            <Ionicons name="person" size={24} color="#4A6FA5" />
          </View>
          <View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {displayName}
            </Text>
            <Text className="text-sm text-gray-400 dark:text-gray-500">
              Local profile · not yet synced
            </Text>
          </View>
        </View>

        <View className="flex-row mb-8" style={{ gap: 10 }}>
          <StreakCard
            icon="book"
            color="#4A6FA5"
            label="Read Streak"
            current={currentReadStreak}
            longest={longestReadStreak}
            freezes={readStreakFreezesAvailable}
          />
          <StreakCard
            icon="albums"
            color="#C19A6B"
            label="Memory Streak"
            current={currentMemoryStreak}
            longest={longestMemoryStreak}
            freezes={memoryStreakFreezesAvailable}
          />
        </View>

        <Pressable
          onPress={() => router.push("/shop")}
          className="flex-row items-center rounded-2xl px-5 py-4 mb-8 active:opacity-80"
          style={{ backgroundColor: "#4A6FA5" }}
        >
          <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center mr-3">
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">{tokenBalance} tokens</Text>
            <Text className="text-xs text-white/80">Visit the Rewards Shop</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </Pressable>

        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
          Your progress
        </Text>
        <View className="flex-row mb-8" style={{ gap: 10 }}>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {memoryDeck.length}
            </Text>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Cards in deck</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {cardsMastered}
            </Text>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Mastered</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">{dueCount}</Text>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Due today</Text>
          </View>
        </View>

        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
          Badges
        </Text>
        {milestonesAchieved.length === 0 ? (
          <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-6 items-center">
            <Ionicons name="ribbon-outline" size={22} color="#9CA3AF" />
            <Text className="text-sm text-gray-400 dark:text-gray-500 mt-2 text-center">
              Keep your streak going to earn your first badge.
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap" style={{ gap: 8 }}>
            {milestonesAchieved.map((key) => (
              <View
                key={key}
                className="flex-row items-center rounded-2xl px-4 py-3"
                style={{ backgroundColor: "#C19A6B1A", borderWidth: 1, borderColor: "#C19A6B40" }}
              >
                <Ionicons name="ribbon" size={16} color="#C19A6B" />
                <Text className="text-xs font-semibold text-brand-earth ml-2">
                  {BADGE_LABELS[key] ?? key}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
