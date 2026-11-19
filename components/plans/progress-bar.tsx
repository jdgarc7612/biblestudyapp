import { View } from "react-native";

/** A thin blue bar for days done in a guided study. */
export function PlanProgressBar({ value, max, className = "mt-3" }: { value: number; max: number; className?: string }) {
  return (
    <View className={`h-1.5 rounded-full bg-brand-blue/15 overflow-hidden ${className}`}>
      <View className="h-full rounded-full" style={{ width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: "#4A6FA5" }} />
    </View>
  );
}
