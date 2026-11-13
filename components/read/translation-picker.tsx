import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TRANSLATIONS } from "../../lib/bible";
import { useAppStore } from "../../store/useAppStore";

/** A compact pill showing the current translation; tapping it opens the picker sheet. */
export function TranslationPill({ compact = false }: { compact?: boolean }) {
  const translation = useAppStore((state) => state.translation);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Translation: ${translation}. Change translation`}
        className="flex-row items-center rounded-full active:opacity-70"
        style={{
          paddingHorizontal: compact ? 10 : 12,
          paddingVertical: compact ? 4 : 6,
          backgroundColor: "#4A6FA514",
          borderWidth: 1,
          borderColor: "#4A6FA533",
          gap: 4,
        }}
      >
        <Text className="text-xs font-bold text-brand-blue tracking-wide">{translation}</Text>
        <Ionicons name="chevron-down" size={12} color="#4A6FA5" />
      </Pressable>
      <TranslationSheet visible={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function TranslationSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const translation = useAppStore((state) => state.translation);
  const setTranslation = useAppStore((state) => state.setTranslation);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end" style={{ backgroundColor: "#00000066" }} onPress={onClose}>
        <Pressable className="bg-white dark:bg-gray-900 rounded-t-3xl px-6 pt-5" style={{ paddingBottom: 36 }}>
          <View className="self-center w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700 mb-5" />
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">Translation</Text>
          <Text className="text-sm text-gray-400 dark:text-gray-500 mb-5">
            All three are in the public domain and free to read anywhere.
          </Text>
          <View style={{ gap: 10 }}>
            {TRANSLATIONS.map((t) => {
              const selected = t.id === translation;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => {
                    setTranslation(t.id);
                    onClose();
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  className="flex-row items-center rounded-2xl px-4 py-4 border border-gray-200 dark:border-gray-700 active:opacity-80"
                  style={selected ? { backgroundColor: "#4A6FA512", borderColor: "#4A6FA566" } : undefined}
                >
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                    style={{ backgroundColor: selected ? "#4A6FA5" : "#4A6FA514" }}
                  >
                    <Text
                      className="text-xs font-bold tracking-wide"
                      style={{ color: selected ? "#FFFFFF" : "#4A6FA5" }}
                    >
                      {t.id}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900 dark:text-white">{t.name}</Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-4">{t.blurb}</Text>
                  </View>
                  {selected && <Ionicons name="checkmark-circle" size={22} color="#4A6FA5" style={{ marginLeft: 8 }} />}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
