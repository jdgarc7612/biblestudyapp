import { useState } from "react";
import { LayoutAnimation, Platform, Pressable, Text, UIManager, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import type { ContextNote } from "../../data/study/context-notes";
import { languageOf, strongsLabel, useLexiconEntry } from "../../lib/original-language";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";
const EARTH_TEXT = "#8A6A44";

if (Platform.OS === "android") UIManager.setLayoutAnimationEnabledExperimental?.(true);

/**
 * "Setting" card above a chapter: one line until opened, then the historical and cultural
 * background and a word or two from the Hebrew or Greek worth noticing.
 */
export function SettingCard({
  note,
  bookId,
  onWord,
  onGoDeeper,
}: {
  note: ContextNote;
  bookId: string;
  onWord: (verse: number, strongs: number) => void;
  /** Opens the chapter's Go Deeper study; the button shows only when this is given. */
  onGoDeeper?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => !o);
  };
  const range = note.start ? `vv. ${note.start}–${note.end ?? note.start} · ` : "";

  return (
    <View
      className="rounded-2xl mt-3 mb-1 overflow-hidden"
      style={{ backgroundColor: `${EARTH}12`, borderWidth: 1, borderColor: `${EARTH}33` }}
    >
      <Pressable
        onPress={toggle}
        className="flex-row items-center px-4 py-3 active:opacity-70"
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`Setting: ${note.title}`}
      >
        <Ionicons name="compass-outline" size={18} color={EARTH_TEXT} />
        <View className="flex-1 ml-2.5">
          <Text className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: EARTH_TEXT }}>
            {range}Setting
          </Text>
          <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100" numberOfLines={open ? undefined : 1}>
            {note.title}
          </Text>
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" />
      </Pressable>
      {open && (
        <View className="px-4 pb-4">
          <Text style={{ fontFamily: serifFont }} className="text-[16px] leading-7 text-gray-700 dark:text-gray-300">
            {note.setting}
          </Text>
          {note.words.length > 0 && (
            <>
              <Text className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mt-4 mb-2">
                Words to notice
              </Text>
              <View style={{ gap: 8 }}>
                {note.words.map((w) => (
                  <WordRow key={`${w.v}-${w.s}`} bookId={bookId} verse={w.v} strongs={w.s} note={w.note} onPress={() => onWord(w.v, w.s)} />
                ))}
              </View>
            </>
          )}
          {onGoDeeper ? (
            <Pressable
              onPress={onGoDeeper}
              className="flex-row items-center justify-between mt-4 pt-3 active:opacity-70"
              style={{ borderTopWidth: 1, borderTopColor: `${EARTH}33` }}
              accessibilityRole="button"
              accessibilityLabel="Go deeper: context, theology and application"
            >
              <Text className="text-xs text-gray-500 dark:text-gray-400">Context, theology and application</Text>
              <View className="flex-row items-center">
                <Text className="text-sm font-semibold" style={{ color: BLUE }}>
                  Go Deeper
                </Text>
                <Ionicons name="arrow-forward" size={14} color={BLUE} style={{ marginLeft: 4 }} />
              </View>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}

function WordRow({
  bookId,
  verse,
  strongs,
  note,
  onPress,
}: {
  bookId: string;
  verse: number;
  strongs: number;
  note: string;
  onPress: () => void;
}) {
  const lang = languageOf(bookId);
  const entry = useLexiconEntry(lang, strongs);
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl bg-white dark:bg-gray-800 px-3.5 py-3 active:opacity-70"
      accessibilityLabel={`Study this word in verse ${verse}`}
    >
      <View className="flex-row items-baseline mb-1" style={{ gap: 8 }}>
        {entry ? (
          <Text style={{ fontFamily: serifFont }} className="text-lg text-gray-900 dark:text-white">
            {entry.l}
          </Text>
        ) : null}
        <Text className="text-xs italic text-gray-500 dark:text-gray-400">{entry?.t ?? strongsLabel(lang, strongs)}</Text>
        <View className="flex-1" />
        <Text className="text-[11px] font-semibold" style={{ color: BLUE }}>
          v. {verse}
        </Text>
        <Ionicons name="chevron-forward" size={12} color={BLUE} />
      </View>
      <Text className="text-sm leading-5 text-gray-700 dark:text-gray-300">{note}</Text>
    </Pressable>
  );
}
