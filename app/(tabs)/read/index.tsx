import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import johnData from "../../../data/bible/john.json";

export default function ReadScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm font-medium text-gray-400 dark:text-gray-500">
          {johnData.translationName}
        </Text>
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-1">
          {johnData.name}
        </Text>
        <Text className="text-base text-gray-400 dark:text-gray-500 mb-6">
          {johnData.chapters.length} chapters
        </Text>

        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {johnData.chapters.map((c) => (
            <Link
              key={c.chapter}
              href={{ pathname: "/read/[chapter]", params: { chapter: String(c.chapter) } }}
              asChild
            >
              <Pressable className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 items-center justify-center active:opacity-70">
                <Text className="text-lg font-semibold text-brand-blue dark:text-blue-300">
                  {c.chapter}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
