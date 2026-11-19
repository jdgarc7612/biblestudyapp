import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

/** Sign in with Apple, drawn to Apple's guidelines (black, Apple logo, standard wording). */
export function AppleButton({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className="flex-row items-center justify-center rounded-2xl active:opacity-80"
      style={{ height: 50, backgroundColor: "#000000", gap: 8, opacity: disabled ? 0.6 : 1 }}
    >
      <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
      <Text className="text-base font-semibold text-white">Continue with Apple</Text>
    </Pressable>
  );
}
