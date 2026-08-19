import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppStore } from "../store/useAppStore";
import { StreakKind, STREAK_FREEZE_COST } from "../lib/rewards";

const COMING_SOON_ITEMS = [
  { icon: "color-palette-outline" as const, label: "Reading theme", costLabel: "15-30 tokens" },
  { icon: "images-outline" as const, label: "Verse card templates", costLabel: "10-20 tokens" },
  { icon: "apps-outline" as const, label: "Custom app icon", costLabel: "20 tokens" },
  { icon: "albums-outline" as const, label: "Memory deck cover art", costLabel: "10 tokens" },
];

function FreezeRow({
  kind,
  label,
  color,
  available,
  onBuy,
  disabled,
}: {
  kind: StreakKind;
  label: string;
  color: string;
  available: number;
  onBuy: (kind: StreakKind) => void;
  disabled: boolean;
}) {
  return (
    <View className="flex-row items-center rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4 mb-3">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Ionicons name="snow" size={18} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-900 dark:text-white">
          {label} Streak Freeze
        </Text>
        <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Protects one missed day · {available} in inventory
        </Text>
      </View>
      <Pressable
        onPress={() => onBuy(kind)}
        disabled={disabled}
        className="rounded-xl px-4 py-2.5 active:opacity-80"
        style={{ backgroundColor: color, opacity: disabled ? 0.4 : 1 }}
      >
        <Text className="text-xs font-bold text-white">{STREAK_FREEZE_COST} tokens</Text>
      </Pressable>
    </View>
  );
}

export default function ShopScreen() {
  const router = useRouter();
  const tokenBalance = useAppStore((state) => state.tokenBalance);
  const readStreakFreezesAvailable = useAppStore((state) => state.readStreakFreezesAvailable);
  const memoryStreakFreezesAvailable = useAppStore((state) => state.memoryStreakFreezesAvailable);
  const purchaseStreakFreeze = useAppStore((state) => state.purchaseStreakFreeze);
  const aiFreeDailyAllowance = useAppStore((state) => state.aiFreeDailyAllowance);
  const aiEarnedTokenMonthlyCap = useAppStore((state) => state.aiEarnedTokenMonthlyCap);

  const [toast, setToast] = useState<string | null>(null);

  const handleBuyFreeze = (kind: StreakKind) => {
    const ok = purchaseStreakFreeze(kind);
    setToast(ok ? "Streak freeze added" : "Not enough tokens");
    setTimeout(() => setToast(null), 1800);
  };

  const canAfford = tokenBalance >= STREAK_FREEZE_COST;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top", "bottom"]}>
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable onPress={() => router.back()} hitSlop={12} className="p-1 active:opacity-60">
          <Ionicons name="chevron-back" size={24} color="#4A6FA5" />
        </Pressable>
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          Rewards Shop
        </Text>
        <View className="flex-row items-center" style={{ gap: 4 }}>
          <Ionicons name="sparkles" size={14} color="#4A6FA5" />
          <Text className="text-sm font-bold text-brand-blue">{tokenBalance}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {toast && (
          <View className="rounded-xl bg-gray-900/90 dark:bg-white/90 px-4 py-2.5 mb-4 self-start">
            <Text className="text-xs font-semibold text-white dark:text-gray-900">{toast}</Text>
          </View>
        )}

        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
          Streak Freezes
        </Text>
        <FreezeRow
          kind="read"
          label="Read"
          color="#4A6FA5"
          available={readStreakFreezesAvailable}
          onBuy={handleBuyFreeze}
          disabled={!canAfford}
        />
        <FreezeRow
          kind="memory"
          label="Memory"
          color="#C19A6B"
          available={memoryStreakFreezesAvailable}
          onBuy={handleBuyFreeze}
          disabled={!canAfford}
        />

        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-6 mb-3">
          Self-expression
        </Text>
        <View style={{ gap: 8 }} className="mb-8">
          {COMING_SOON_ITEMS.map((item) => (
            <View
              key={item.label}
              className="flex-row items-center rounded-2xl px-4 py-4 border border-gray-100 dark:border-gray-800"
            >
              <View className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 items-center justify-center mr-3">
                <Ionicons name={item.icon} size={18} color="#9CA3AF" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.label}
                </Text>
                <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {item.costLabel} · Coming soon
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
          Ask AI usage
        </Text>
        <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-4 mb-4">
          <Text className="text-sm text-gray-700 dark:text-gray-200 leading-5">
            You get {aiFreeDailyAllowance} free questions every day. Earned tokens can unlock up
            to {aiEarnedTokenMonthlyCap} extra questions a month — beyond that, token packs and
            Supporter status (coming soon) keep the lights on.
          </Text>
        </View>

        <Pressable
          disabled
          className="rounded-2xl px-5 py-4 items-center border border-gray-100 dark:border-gray-800"
          style={{ opacity: 0.5 }}
        >
          <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500">
            Support DeepWord — coming soon
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
