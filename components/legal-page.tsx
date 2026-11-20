import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { serifFont } from "../constants/fonts";
import { LEGAL_DRAFT, LEGAL_UPDATED, OPERATOR, type LegalSection } from "../data/legal";

/** A calm, readable page for the Privacy Policy and Terms of Use. */
export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  const router = useRouter();
  const back = () => (router.canGoBack() ? router.back() : router.replace("/profile"));

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-row items-center px-4 py-2">
        <Pressable onPress={back} hitSlop={12} accessibilityLabel="Back" className="p-2 active:opacity-60">
          <Ionicons name="chevron-back" size={24} color="#4A6FA5" />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48, maxWidth: 680, width: "100%", alignSelf: "center" }}
      >
        <Text className="text-3xl text-gray-900 dark:text-white mb-2" style={{ fontFamily: serifFont, fontWeight: "700" }}>
          {title}
        </Text>
        <View className="flex-row items-center flex-wrap mb-8" style={{ gap: 8 }}>
          {LEGAL_DRAFT && (
            <View className="rounded-full px-2.5 py-0.5" style={{ backgroundColor: "#C19A6B26" }}>
              <Text className="text-[11px] font-semibold text-brand-earth uppercase tracking-wide">Draft</Text>
            </View>
          )}
          <Text className="text-sm text-gray-400 dark:text-gray-500">
            Last updated {LEGAL_UPDATED}
            {OPERATOR ? ` · DeepWord is run by ${OPERATOR}` : ""}
          </Text>
        </View>

        {sections.map((s) => (
          <View key={s.heading} className="mb-7">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{s.heading}</Text>
            {s.body.map((p, i) =>
              p.startsWith("• ") ? (
                <View key={i} className="flex-row mb-1.5 pl-1">
                  <Text className="text-base text-brand-earth mr-2 leading-7">•</Text>
                  <Text className="flex-1 text-base text-gray-600 dark:text-gray-300 leading-7">{p.slice(2)}</Text>
                </View>
              ) : (
                <Text key={i} className="text-base text-gray-600 dark:text-gray-300 leading-7 mb-2.5">
                  {p}
                </Text>
              )
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
