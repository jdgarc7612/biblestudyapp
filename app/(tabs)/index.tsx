import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppStore } from "../../store/useAppStore";
import { verseOfTheDay } from "../../constants/mock-data";
import { serifFont } from "../../constants/fonts";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const tokenBalance = useAppStore((state) => state.tokenBalance);
  const streakDays = useAppStore((state) => state.streakDays);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm font-medium text-gray-400 dark:text-gray-500">
          {today}
        </Text>
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-6">
          {getGreeting()}
        </Text>

        <Link
          href={{ pathname: "/read/[chapter]", params: { chapter: String(verseOfTheDay.chapter) } }}
          asChild
        >
          <Pressable
            className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-6 py-7 active:opacity-80"
          >
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 rounded-full bg-brand-earth/20 items-center justify-center mr-2">
                <Ionicons name="sunny" size={16} color="#C19A6B" />
              </View>
              <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth">
                Verse of the Day
              </Text>
            </View>
            <Text
              style={{ fontFamily: serifFont }}
              className="text-xl leading-8 text-gray-900 dark:text-gray-100 mb-4"
            >
              “{verseOfTheDay.text}”
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">
                {verseOfTheDay.reference} · {verseOfTheDay.translation}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#4A6FA5" />
            </View>
          </Pressable>
        </Link>

        <View className="flex-row mt-4" style={{ gap: 12 }}>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-4">
            <View className="flex-row items-center mb-1" style={{ gap: 6 }}>
              <Ionicons name="flame" size={16} color="#C19A6B" />
              <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                Streak
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {streakDays} {streakDays === 1 ? "day" : "days"}
            </Text>
          </View>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-4">
            <View className="flex-row items-center mb-1" style={{ gap: 6 }}>
              <Ionicons name="sparkles" size={16} color="#4A6FA5" />
              <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                Tokens
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {tokenBalance}
            </Text>
          </View>
        </View>

        <Text className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-8 mb-3">
          Continue your journey
        </Text>

        <View style={{ gap: 10 }}>
          <Link href="/ai" asChild>
            <Pressable className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-5 py-4 active:opacity-70">
              <View className="w-10 h-10 rounded-full bg-brand-blue/10 items-center justify-center mr-4">
                <Ionicons name="sparkles" size={18} color="#4A6FA5" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  Ask a question
                </Text>
                <Text className="text-sm text-gray-400 dark:text-gray-500">
                  Get a grounded, thoughtful answer
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          </Link>

          <Link href="/memory" asChild>
            <Pressable className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-5 py-4 active:opacity-70">
              <View className="w-10 h-10 rounded-full bg-brand-earth/15 items-center justify-center mr-4">
                <Ionicons name="albums" size={18} color="#C19A6B" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  Review memory verses
                </Text>
                <Text className="text-sm text-gray-400 dark:text-gray-500">
                  Keep your deck fresh
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
