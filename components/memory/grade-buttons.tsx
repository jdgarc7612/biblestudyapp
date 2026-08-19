import { Pressable, Text, View } from "react-native";

import { Grade, nextSrsState, SrsState } from "../../lib/srs";

const GRADES: { grade: Grade; label: string; color: string }[] = [
  { grade: "again", label: "Again", color: "#DC2626" },
  { grade: "hard", label: "Hard", color: "#C19A6B" },
  { grade: "good", label: "Good", color: "#4A6FA5" },
  { grade: "easy", label: "Easy", color: "#16A34A" },
];

function formatInterval(days: number) {
  if (days < 1) return "<1d";
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${Math.round(days / 365)}y`;
}

export function GradeButtons({
  srsState,
  suggestedGrade,
  onGrade,
}: {
  srsState: SrsState;
  suggestedGrade?: Grade;
  onGrade: (grade: Grade) => void;
}) {
  return (
    <View className="flex-row" style={{ gap: 8 }}>
      {GRADES.map(({ grade, label, color }) => {
        const preview = nextSrsState(srsState, grade);
        const isSuggested = suggestedGrade === grade;
        return (
          <Pressable
            key={grade}
            onPress={() => onGrade(grade)}
            className="flex-1 rounded-2xl items-center py-3 active:opacity-80"
            style={{
              backgroundColor: isSuggested ? color : `${color}1A`,
              borderWidth: isSuggested ? 0 : 1,
              borderColor: `${color}40`,
            }}
          >
            <Text
              className="text-sm font-bold"
              style={{ color: isSuggested ? "#FFFFFF" : color }}
            >
              {label}
            </Text>
            <Text
              className="text-xs mt-0.5"
              style={{ color: isSuggested ? "#FFFFFFCC" : `${color}99` }}
            >
              {formatInterval(preview.interval)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
