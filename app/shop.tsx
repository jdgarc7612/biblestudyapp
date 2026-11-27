import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { AI_DAILY_QUESTION_LIMIT } from "../lib/ai-config";
import { claimShopQuestion } from "../lib/ai-client";
import { localDateString } from "../lib/date";
import { READING_THEMES, type ReadingTheme } from "../lib/reading-prefs";
import { useAppStore } from "../store/useAppStore";
import { EXTRA_QUESTION_COST, StreakKind, STREAK_FREEZE_COST } from "../lib/rewards";
import { BackButton } from "../components/back-button";
import { useColorScheme } from "../hooks/use-color-scheme";
import { serifFont } from "../constants/fonts";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

function SectionTitle({ children, first = false }: { children: string; first?: boolean }) {
  return (
    <Text
      className={`text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3 ${first ? "" : "mt-6"}`}
    >
      {children}
    </Text>
  );
}

function PriceButton({
  label,
  color,
  onPress,
  disabled,
  busy = false,
  muted = false,
  accessibilityLabel,
}: {
  label: string;
  color: string;
  onPress: () => void;
  disabled: boolean;
  busy?: boolean;
  /** An outline button for a state, not a purchase ("In use", "Added today"). */
  muted?: boolean;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || busy}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: disabled || busy }}
      className={`rounded-xl px-4 py-2.5 min-w-[84px] items-center active:opacity-80 ${muted ? "border border-gray-200 dark:border-gray-700" : ""}`}
      style={muted ? undefined : { backgroundColor: color, opacity: disabled ? 0.4 : 1 }}
    >
      {busy ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text className={`text-xs font-bold ${muted ? "text-gray-500 dark:text-gray-400" : "text-white"}`}>{label}</Text>
      )}
    </Pressable>
  );
}

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
      <PriceButton
        label={`${STREAK_FREEZE_COST} tokens`}
        accessibilityLabel={`Buy a ${label} Streak Freeze for ${STREAK_FREEZE_COST} tokens`}
        color={color}
        onPress={() => onBuy(kind)}
        disabled={disabled}
      />
    </View>
  );
}

/** A small page of Bible text in the theme's colors, so you can see it before buying. */
function ThemeSwatch({ theme, dark }: { theme: ReadingTheme; dark: boolean }) {
  const colors = dark ? theme.dark : theme.light;
  return (
    <View
      className={`w-12 h-12 rounded-xl items-center justify-center mr-3 ${colors ? "" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"}`}
      style={colors ? { backgroundColor: colors.background } : undefined}
    >
      <Text
        style={{ fontFamily: serifFont, color: colors?.text, fontSize: 20 }}
        className={colors ? "" : "text-gray-900 dark:text-gray-100"}
      >
        Aa
      </Text>
      <View className="absolute bottom-1.5 rounded-full" style={{ width: 14, height: 2, backgroundColor: colors?.accent ?? EARTH }} />
    </View>
  );
}

export default function ShopScreen() {
  const dark = useColorScheme() === "dark";
  const tokenBalance = useAppStore((state) => state.tokenBalance);
  const readStreakFreezesAvailable = useAppStore((state) => state.readStreakFreezesAvailable);
  const memoryStreakFreezesAvailable = useAppStore((state) => state.memoryStreakFreezesAvailable);
  const purchaseStreakFreeze = useAppStore((state) => state.purchaseStreakFreeze);
  const aiShopBonusDate = useAppStore((state) => state.aiShopBonusDate);
  const markExtraQuestionBought = useAppStore((state) => state.markExtraQuestionBought);
  const readingTheme = useAppStore((state) => state.readingTheme);
  const ownedReadingThemes = useAppStore((state) => state.ownedReadingThemes);
  const purchaseReadingTheme = useAppStore((state) => state.purchaseReadingTheme);
  const setReadingTheme = useAppStore((state) => state.setReadingTheme);
  const syncedUserId = useAppStore((state) => state.syncedUserId);

  const [toast, setToast] = useState<string | null>(null);
  const [buyingQuestion, setBuyingQuestion] = useState(false);

  const showToast = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 2400);
  };

  const handleBuyFreeze = (kind: StreakKind) => {
    const ok = purchaseStreakFreeze(kind);
    showToast(ok ? "Streak freeze added" : "Not enough tokens");
  };

  const questionBoughtToday = aiShopBonusDate === localDateString();
  const handleBuyQuestion = async () => {
    if (questionBoughtToday || tokenBalance < EXTRA_QUESTION_COST) return;
    setBuyingQuestion(true);
    // The account grants it first (one a day on every device), then the tokens are spent.
    const result = await claimShopQuestion(localDateString());
    setBuyingQuestion(false);
    if (result === "ok") {
      markExtraQuestionBought(true);
      showToast("1 extra Ask AI question added for today");
    } else if (result === "already") {
      markExtraQuestionBought(false);
      showToast("You already bought today's extra question");
    } else if (result === "signed_out") {
      showToast("Sign in to buy an extra question");
    } else if (result === "unavailable") {
      showToast("Extra questions aren't switched on yet. No tokens were spent.");
    } else {
      showToast("Couldn't reach your account. No tokens were spent.");
    }
  };

  const handleTheme = (theme: ReadingTheme) => {
    const owned = theme.cost === 0 || ownedReadingThemes.includes(theme.id);
    if (owned) {
      setReadingTheme(theme.id);
      showToast(`${theme.name} is your reading theme`);
      return;
    }
    const ok = purchaseReadingTheme(theme.id);
    showToast(ok ? `${theme.name} is yours. It's on in Read now.` : "Not enough tokens");
  };

  const canAfford = tokenBalance >= STREAK_FREEZE_COST;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top", "bottom"]}>
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <BackButton fallback="/profile" className="p-1" />
        <Text className="text-base font-semibold text-gray-900 dark:text-white">
          Rewards Shop
        </Text>
        <View className="flex-row items-center" style={{ gap: 4 }}>
          <Ionicons name="sparkles" size={14} color={BLUE} />
          <Text className="text-sm font-bold text-brand-blue">{tokenBalance}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle first>Ask AI</SectionTitle>
        <View className="flex-row items-center rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
          <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: `${BLUE}1A` }}>
            <Ionicons name="chatbubble-ellipses" size={18} color={BLUE} />
          </View>
          <View className="flex-1 mr-2">
            <Text className="text-sm font-semibold text-gray-900 dark:text-white">Extra question today</Text>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {questionBoughtToday
                ? "Added. You can buy another tomorrow."
                : syncedUserId
                  ? `One more on top of your ${AI_DAILY_QUESTION_LIMIT} free. Once a day.`
                  : "Sign in to buy one. Once a day."}
            </Text>
          </View>
          <PriceButton
            label={questionBoughtToday ? "Added today" : `${EXTRA_QUESTION_COST} tokens`}
            accessibilityLabel={
              questionBoughtToday
                ? "Extra question already added today"
                : `Buy 1 extra Ask AI question today for ${EXTRA_QUESTION_COST} tokens`
            }
            color={BLUE}
            muted={questionBoughtToday}
            onPress={handleBuyQuestion}
            disabled={questionBoughtToday || tokenBalance < EXTRA_QUESTION_COST}
            busy={buyingQuestion}
          />
        </View>

        <SectionTitle>Streak Freezes</SectionTitle>
        <FreezeRow
          kind="read"
          label="Read"
          color={BLUE}
          available={readStreakFreezesAvailable}
          onBuy={handleBuyFreeze}
          disabled={!canAfford}
        />
        <FreezeRow
          kind="memory"
          label="Memory"
          color={EARTH}
          available={memoryStreakFreezesAvailable}
          onBuy={handleBuyFreeze}
          disabled={!canAfford}
        />

        <SectionTitle>Reading themes</SectionTitle>
        <Text className="text-xs text-gray-400 dark:text-gray-500 -mt-1 mb-3">
          Colors for the page in Read, in light and dark mode. Switch any time with Aa in Read.
        </Text>
        <View style={{ gap: 8 }} className="mb-8">
          {READING_THEMES.map((theme) => {
            const owned = theme.cost === 0 || ownedReadingThemes.includes(theme.id);
            const active = owned && readingTheme === theme.id;
            return (
              <View
                key={theme.id}
                className={`flex-row items-center rounded-2xl px-4 py-3 border ${active ? "border-brand-blue/40" : "border-gray-100 dark:border-gray-800"}`}
              >
                <ThemeSwatch theme={theme} dark={dark} />
                <View className="flex-1 mr-2">
                  <Text className="text-sm font-semibold text-gray-900 dark:text-white">{theme.name}</Text>
                  <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{theme.description}</Text>
                </View>
                <PriceButton
                  label={active ? "In use" : owned ? "Use" : `${theme.cost} tokens`}
                  accessibilityLabel={
                    active
                      ? `${theme.name} is in use`
                      : owned
                        ? `Use the ${theme.name} reading theme`
                        : `Buy the ${theme.name} reading theme for ${theme.cost} tokens`
                  }
                  color={owned ? BLUE : EARTH}
                  muted={active}
                  onPress={() => handleTheme(theme)}
                  disabled={active || (!owned && tokenBalance < theme.cost)}
                />
              </View>
            );
          })}
        </View>

        <Pressable
          disabled
          className="rounded-2xl px-5 py-4 items-center border border-gray-100 dark:border-gray-800"
          style={{ opacity: 0.5 }}
        >
          <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500">
            Support Omeora — coming soon
          </Text>
        </Pressable>
      </ScrollView>
      {toast ? (
        <View pointerEvents="none" className="absolute left-0 right-0 bottom-8 items-center px-6">
          <View
            accessibilityLiveRegion="polite"
            className="rounded-xl bg-gray-900/90 dark:bg-white/90 px-4 py-2.5"
          >
            <Text className="text-xs font-semibold text-white dark:text-gray-900 text-center">{toast}</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
