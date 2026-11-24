import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { listStudies, studyPreview, type StudyListItem } from "../../lib/study-journal";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";
const SHOWN = 3;

/** The Study tab's way into the journal: start a SOAP study, and the latest few. */
export function JournalCard() {
  const router = useRouter();
  const entries = useAppStore((s) => s.studyEntries);
  const studies = listStudies(entries);
  const inProgress = studies.find((s) => !s.finishedAt);

  return (
    <View className="rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <View className="px-5 pt-4 pb-4">
        <View className="flex-row items-center mb-2">
          <View className="w-9 h-9 rounded-full bg-brand-blue/10 items-center justify-center mr-3">
            <Ionicons name="create-outline" size={17} color={BLUE} />
          </View>
          <View className="flex-1">
            <Text className="text-[17px] font-bold text-gray-900 dark:text-white">Study a passage</Text>
            <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-0.5">SOAP journal · private to you</Text>
          </View>
        </View>
        <Text style={{ fontFamily: serifFont }} className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mb-4">
          Read slowly, write what you notice, how it applies, and a prayer.
        </Text>
        <View className="flex-row" style={{ gap: 8 }}>
          <Pressable
            onPress={() => router.push("/journal/entry")}
            className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-80"
            style={{ backgroundColor: BLUE }}
          >
            <Text className="text-[15px] font-semibold text-white">Start a study</Text>
          </Pressable>
          {inProgress && (
            <Pressable
              onPress={() => router.push({ pathname: "/journal/entry", params: { id: inProgress.id } })}
              className="items-center justify-center rounded-2xl px-4 py-3 bg-brand-blue/10 active:opacity-70"
              accessibilityLabel={`Continue your study of ${inProgress.reference}`}
            >
              <Text className="text-[15px] font-semibold text-brand-blue dark:text-blue-300">Continue</Text>
            </Pressable>
          )}
        </View>
      </View>

      {studies.length > 0 && (
        <>
          {studies.slice(0, SHOWN).map((s) => (
            <StudyRow key={s.id} study={s} />
          ))}
          {studies.length > SHOWN && (
            <Pressable onPress={() => router.push("/journal")} className="border-t border-gray-100 dark:border-gray-800 py-3 items-center active:opacity-60">
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">See all {studies.length} studies</Text>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
}

export function StudyRow({ study, first }: { study: StudyListItem; first?: boolean }) {
  const router = useRouter();
  const preview = studyPreview(study);
  const date = new Date(study.finishedAt ?? study.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/journal/entry", params: { id: study.id } })}
      accessibilityRole="button"
      accessibilityLabel={`Your study of ${study.reference}`}
      className={`flex-row items-center px-5 py-3 active:opacity-70 ${first ? "" : "border-t border-gray-100 dark:border-gray-800"}`}
    >
      <Ionicons
        name={study.finishedAt ? "checkmark-circle" : "ellipse-outline"}
        size={16}
        color={study.finishedAt ? EARTH : "#9CA3AF"}
        style={{ marginRight: 10 }}
      />
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">
          {study.reference}
          <Text className="text-xs font-normal text-gray-400 dark:text-gray-500">
            {"  "}
            {study.finishedAt ? date : "In progress"}
          </Text>
        </Text>
        {preview ? (
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-0.5" numberOfLines={1}>
            {preview}
          </Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
    </Pressable>
  );
}
