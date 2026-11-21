import type { ReactNode } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface SheetOption {
  key: string;
  label: string;
  sub?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  destructive?: boolean;
  onPress: () => void;
}

/** A bottom sheet of choices, used for card actions and pickers on the Memory screens. */
export function Sheet({
  visible,
  title,
  subtitle,
  options,
  onClose,
  children,
}: {
  visible: boolean;
  title: string;
  subtitle?: string;
  options?: SheetOption[];
  onClose: () => void;
  children?: ReactNode;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        className="flex-1 justify-end"
        style={{ backgroundColor: "#00000066" }}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close"
      >
        <Pressable
          className="bg-white dark:bg-gray-900 rounded-t-3xl px-6 pt-5"
          style={{ paddingBottom: 32, maxWidth: 720, width: "100%", alignSelf: "center" }}
          accessibilityViewIsModal
        >
          <View className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700 self-center mb-4" />
          <Text className="text-base font-bold text-gray-900 dark:text-white" accessibilityRole="header">
            {title}
          </Text>
          {subtitle ? <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</Text> : null}
          <View className="mt-3">
            {options?.map((o, i) => (
              <Pressable
                key={o.key}
                onPress={o.onPress}
                accessibilityRole="button"
                accessibilityLabel={o.sub ? `${o.label}. ${o.sub}` : o.label}
                accessibilityState={o.selected === undefined ? undefined : { selected: o.selected }}
                className="flex-row items-center py-3.5 active:opacity-60"
                style={i > 0 ? { borderTopWidth: 1, borderTopColor: "#9CA3AF26" } : undefined}
              >
                {o.icon && (
                  <Ionicons
                    name={o.icon}
                    size={19}
                    color={o.destructive ? "#DC2626" : o.selected ? "#4A6FA5" : "#9CA3AF"}
                    style={{ marginRight: 14 }}
                  />
                )}
                <View className="flex-1">
                  <Text
                    className="text-[15px] font-semibold text-gray-900 dark:text-white"
                    style={o.destructive ? { color: "#DC2626" } : o.selected ? { color: "#4A6FA5" } : undefined}
                  >
                    {o.label}
                  </Text>
                  {o.sub ? <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{o.sub}</Text> : null}
                </View>
                {o.selected && <Ionicons name="checkmark-circle" size={20} color="#4A6FA5" />}
              </Pressable>
            ))}
          </View>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
