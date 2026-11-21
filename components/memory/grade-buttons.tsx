import { Pressable, Text, View } from "react-native";

import type { GradeOutcome, SessionKind } from "../../lib/memory";
import { formatWait, formatWaitSpoken, type Grade } from "../../lib/srs";

const GRADES: { grade: Grade; label: string; color: string }[] = [
  { grade: "again", label: "Again", color: "#DC2626" },
  { grade: "hard", label: "Hard", color: "#B7864F" },
  { grade: "good", label: "Good", color: "#4A6FA5" },
  { grade: "easy", label: "Easy", color: "#15803D" },
];

/**
 * Again / Hard / Good / Easy, each showing when the verse comes back. A suggested grade (from
 * accuracy) is outlined and labelled, but any grade can be chosen.
 */
export function GradeButtons({
  outcomes,
  now,
  kind,
  suggested,
  onGrade,
}: {
  outcomes: Record<Grade, GradeOutcome>;
  now: Date;
  kind: SessionKind;
  suggested?: Grade;
  onGrade: (grade: Grade) => void;
}) {
  return (
    <View>
      <View className="flex-row items-end justify-between mb-3">
        <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">How did it go?</Text>
        {suggested && (
          <Text className="text-[11px] text-gray-500 dark:text-gray-400">
            Suggested from your accuracy · tap any
          </Text>
        )}
      </View>
      <View className="flex-row" style={{ gap: 8 }}>
        {GRADES.map(({ grade, label, color }) => {
          const outcome = outcomes[grade];
          const isSuggested = suggested === grade;
          const short = outcome.scheduled ? formatWait(now, outcome.card.srs.due) : "No change";
          const spoken = outcome.scheduled
            ? `next review in ${formatWaitSpoken(now, outcome.card.srs.due)}`
            : "practice only, schedule unchanged";
          return (
            <Pressable
              key={grade}
              onPress={() => onGrade(grade)}
              accessibilityRole="button"
              accessibilityLabel={`${label}, ${spoken}${isSuggested ? ". Suggested" : ""}`}
              className="flex-1 rounded-2xl items-center justify-center active:opacity-80"
              style={{
                minHeight: 64,
                paddingVertical: 10,
                backgroundColor: isSuggested ? color : `${color}14`,
                borderWidth: isSuggested ? 0 : 1,
                borderColor: `${color}55`,
              }}
            >
              {isSuggested && (
                <Text className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#FFFFFFD9" }}>
                  Suggested
                </Text>
              )}
              <Text className="text-sm font-bold" style={{ color: isSuggested ? "#FFFFFF" : color }}>
                {label}
              </Text>
              <Text className="text-[11px] mt-0.5" style={{ color: isSuggested ? "#FFFFFFCC" : `${color}CC` }}>
                {short}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {kind === "practice" && (
        <Text className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 leading-4">
          Practice keeps your schedule: Good and Easy are logged, Again brings the verse back sooner.
        </Text>
      )}
    </View>
  );
}
