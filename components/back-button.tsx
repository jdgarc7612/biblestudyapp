import { Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { Pressable, Text } from "react-native";

import { useBack } from "../hooks/use-back";

const BLUE = "#4A6FA5";

/**
 * A screen's back control. After following a link it names where it goes ("‹ John 3") and returns
 * there, even from another tab; otherwise it's the plain chevron it always was.
 *
 * `onlyAfterLink`: for a tab's first screen (Home, Read, Study, Ask AI, Profile), which has no back
 * of its own. It shows only when a link brought someone here.
 */
export function BackButton({
  fallback,
  label: ownLabel,
  onlyAfterLink = false,
  className = "p-1",
}: {
  fallback?: Href;
  /** What the plain back says when no link brought someone here (e.g. "Memory"). */
  label?: string;
  onlyAfterLink?: boolean;
  className?: string;
}) {
  const back = useBack(fallback);
  if (onlyAfterLink && !back.label) return null;
  const label = back.label ?? ownLabel;
  const goBack = back.goBack;
  return (
    <Pressable
      onPress={goBack}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={label ? `Back to ${label}` : "Back"}
      className={`flex-row items-center active:opacity-60 ${className}`}
      style={{ maxWidth: 150 }}
    >
      <Ionicons name="chevron-back" size={label ? 20 : 24} color={BLUE} />
      {label ? (
        <Text numberOfLines={1} className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-0.5 shrink">
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
