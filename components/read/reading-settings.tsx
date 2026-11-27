import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { serifFont } from "../../constants/fonts";
import { READING_THEMES, readingThemeColors, TEXT_SIZES } from "../../lib/reading-prefs";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

/** The Aa sheet in Read: Bible text size, and which of your reading themes to use. */
export function ReadingSettingsSheet({
  visible,
  onClose,
  dark,
}: {
  visible: boolean;
  onClose: () => void;
  dark: boolean;
}) {
  const router = useRouter();
  const textSize = useAppStore((state) => state.readerTextSize);
  const setTextSize = useAppStore((state) => state.setReaderTextSize);
  const readingTheme = useAppStore((state) => state.readingTheme);
  const owned = useAppStore((state) => state.ownedReadingThemes);
  const setReadingTheme = useAppStore((state) => state.setReadingTheme);

  const size = TEXT_SIZES[textSize] ?? TEXT_SIZES[2];
  const colors = readingThemeColors(readingTheme, owned, dark);
  const smaller = textSize > 0;
  const larger = textSize < TEXT_SIZES.length - 1;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end" style={{ backgroundColor: "#00000066" }} onPress={onClose}>
        <Pressable className="bg-white dark:bg-gray-900 rounded-t-3xl px-6 pt-5" style={{ paddingBottom: 36 }}>
          <View className="self-center w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700 mb-5" />
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">Reading</Text>

          {/* Live preview in the chosen size and theme. */}
          <View
            className={`rounded-2xl px-4 py-3 mb-5 ${colors ? "" : "bg-gray-50 dark:bg-gray-800"}`}
            style={colors ? { backgroundColor: colors.background } : undefined}
          >
            <Text
              numberOfLines={3}
              style={{ fontFamily: serifFont, fontSize: size.fontSize, lineHeight: size.lineHeight, color: colors?.text }}
              className={colors ? "" : "text-gray-900 dark:text-gray-100"}
            >
              <Text style={{ fontSize: Math.round(size.fontSize * 0.67), fontWeight: "700", color: colors?.accent ?? EARTH }}>
                1{" "}
              </Text>
              In the beginning was the Word, and the Word was with God, and the Word was God.
            </Text>
          </View>

          <Text className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
            Text size · {size.label}
          </Text>
          <View className="flex-row items-center rounded-2xl bg-gray-50 dark:bg-gray-800 px-2 py-1.5 mb-5">
            <Pressable
              onPress={() => smaller && setTextSize(textSize - 1)}
              disabled={!smaller}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Smaller text"
              className="w-11 h-11 items-center justify-center active:opacity-60"
              style={{ opacity: smaller ? 1 : 0.3 }}
            >
              <Text style={{ fontFamily: serifFont, fontSize: 15 }} className="text-gray-700 dark:text-gray-200">A</Text>
            </Pressable>
            <View className="flex-1 flex-row items-center justify-between px-2">
              {TEXT_SIZES.map((s, i) => (
                <Pressable
                  key={s.label}
                  onPress={() => setTextSize(i)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`${s.label} text`}
                  accessibilityState={{ selected: i === textSize }}
                  className="items-center justify-center"
                  style={{ width: 28, height: 28 }}
                >
                  <View
                    className="rounded-full"
                    style={{
                      width: i === textSize ? 14 : 8,
                      height: i === textSize ? 14 : 8,
                      backgroundColor: i <= textSize ? BLUE : dark ? "#4B5563" : "#D1D5DB",
                    }}
                  />
                </Pressable>
              ))}
            </View>
            <Pressable
              onPress={() => larger && setTextSize(textSize + 1)}
              disabled={!larger}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Larger text"
              className="w-11 h-11 items-center justify-center active:opacity-60"
              style={{ opacity: larger ? 1 : 0.3 }}
            >
              <Text style={{ fontFamily: serifFont, fontSize: 24 }} className="text-gray-700 dark:text-gray-200">A</Text>
            </Pressable>
          </View>

          <Text className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
            Theme
          </Text>
          <View className="flex-row" style={{ gap: 8 }}>
            {READING_THEMES.map((theme) => {
              const isOwned = theme.cost === 0 || owned.includes(theme.id);
              const active = isOwned && readingTheme === theme.id;
              const swatch = dark ? theme.dark : theme.light;
              return (
                <Pressable
                  key={theme.id}
                  onPress={() => {
                    if (isOwned) {
                      setReadingTheme(theme.id);
                    } else {
                      onClose();
                      router.push("/shop");
                    }
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={
                    isOwned ? `${theme.name} theme` : `${theme.name} theme, ${theme.cost} tokens in the Rewards Shop`
                  }
                  accessibilityState={{ selected: active }}
                  className="flex-1 items-center rounded-2xl py-2.5 active:opacity-70"
                  style={{ borderWidth: 1.5, borderColor: active ? BLUE : "transparent" }}
                >
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center ${swatch ? "" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"}`}
                    style={swatch ? { backgroundColor: swatch.background, borderWidth: 1, borderColor: `${swatch.accent}55` } : undefined}
                  >
                    {isOwned ? (
                      <Text style={{ fontFamily: serifFont, fontSize: 15, color: swatch?.text }} className={swatch ? "" : "text-gray-900 dark:text-gray-100"}>
                        Aa
                      </Text>
                    ) : (
                      <Ionicons name="lock-closed" size={14} color={swatch?.accent ?? "#9CA3AF"} />
                    )}
                  </View>
                  <Text className="text-[11px] font-semibold text-gray-700 dark:text-gray-200 mt-1.5">{theme.name}</Text>
                  {!isOwned ? (
                    <Text className="text-[10px] text-gray-400 dark:text-gray-500">{theme.cost} tokens</Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
