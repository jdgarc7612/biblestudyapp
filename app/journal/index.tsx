import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { StudyRow } from "../../components/study/journal-card";
import { listStudies } from "../../lib/study-journal";
import { useAppStore } from "../../store/useAppStore";
import { BackButton } from "../../components/back-button";

const BLUE = "#4A6FA5";

/** Every SOAP study, newest first. Each opens to read back or keep writing. */
export default function JournalScreen() {
  const router = useRouter();
  const entries = useAppStore((s) => s.studyEntries);
  const studies = listStudies(entries);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <BackButton fallback="/study" className="p-1 mr-2" />
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">Your studies</Text>
        <Pressable onPress={() => router.push("/journal/entry")} hitSlop={8} className="flex-row items-center active:opacity-60">
          <Ionicons name="add" size={18} color={BLUE} />
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">New</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}>
        {studies.length === 0 ? (
          <Text className="text-[15px] text-gray-500 dark:text-gray-400 text-center mt-10">
            No studies yet. Start one from the Study tab, or tap a verse while reading and choose Study.
          </Text>
        ) : (
          <View className="rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {studies.map((s, i) => (
              <StudyRow key={s.id} study={s} first={i === 0} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
