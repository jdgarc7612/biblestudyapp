/**
 * The Read tab's expanded verse sheet: what opens when the selection bar is dragged up or its
 * handle is tapped. Highlight, Compare versions, Save, Copy and Share. The thin bar underneath
 * (Memorize, Note, Ask AI, Study) stays as it is.
 */
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Platform, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { track } from "../../lib/activity";
import { TRANSLATIONS, useChapter, type TranslationId } from "../../lib/bible";
import { HIGHLIGHT_COLORS, highlightSwatch, type HighlightColor } from "../../lib/verse-marks";

const BLUE = "#4A6FA5";
const COMPARE_ORDER: TranslationId[] = ["BSB", "WEB", "KJV"];

export type SheetStatus = { tone: "ok" | "error"; text: string } | null;

export function VerseActionSheet({
  reference,
  previewText,
  translation,
  bookId,
  chapter,
  start,
  end,
  highlight,
  anyHighlight,
  saved,
  status,
  maxHeight,
  onHighlight,
  onToggleSave,
  onCopy,
  onShare,
  onReadIn,
}: {
  reference: string;
  previewText: string;
  translation: TranslationId;
  bookId: string;
  chapter: number;
  start: number;
  end: number;
  /** The color the whole selection shares, if any. */
  highlight: HighlightColor | null;
  /** Some verse in the selection is highlighted (so Remove has something to clear). */
  anyHighlight: boolean;
  saved: boolean;
  status: SheetStatus;
  maxHeight: number;
  onHighlight: (color: HighlightColor | null) => void;
  onToggleSave: () => void;
  onCopy: () => void;
  onShare: () => void;
  onReadIn: (translation: TranslationId) => void;
}) {
  const [mode, setMode] = useState<"actions" | "compare">("actions");
  const appear = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(appear, { toValue: 1, duration: 220, useNativeDriver: Platform.OS !== "web" }).start();
  }, [appear]);
  // A new selection starts back on the actions.
  useEffect(() => setMode("actions"), [bookId, chapter, start, end]);

  const current = highlightSwatch(highlight);

  return (
    <Animated.View
      style={{
        opacity: appear,
        transform: [{ translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
      }}
    >
      <ScrollView style={{ maxHeight }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 18 }} bounces={false}>
        {mode === "compare" ? (
          <CompareVersions
            reference={reference}
            translation={translation}
            bookId={bookId}
            chapter={chapter}
            start={start}
            end={end}
            onBack={() => setMode("actions")}
            onReadIn={onReadIn}
          />
        ) : (
          <>
            <View className="rounded-2xl bg-gray-50 dark:bg-gray-800/70 px-4 py-3 mb-4">
              <View className="flex-row items-center mb-1">
                <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 flex-1" numberOfLines={1}>
                  {reference}
                </Text>
                <Text className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">{translation}</Text>
              </View>
              <Text
                style={{ fontFamily: serifFont }}
                className="text-[15px] leading-6 text-gray-700 dark:text-gray-200"
                numberOfLines={2}
              >
                {previewText}
              </Text>
            </View>

            <View className="flex-row items-center mb-2.5">
              <Text className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Highlight
              </Text>
              {current ? (
                <Text className="text-xs text-gray-500 dark:text-gray-400 ml-2">· {current.name}</Text>
              ) : null}
            </View>
            <View className="flex-row items-center mb-5" style={{ gap: 12 }}>
              {HIGHLIGHT_COLORS.map((c) => {
                const on = highlight === c.id;
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => onHighlight(c.id)}
                    hitSlop={4}
                    accessibilityRole="button"
                    accessibilityLabel={on ? `${reference} is highlighted ${c.name.toLowerCase()}` : `Highlight ${reference} ${c.name.toLowerCase()}`}
                    accessibilityState={{ selected: on }}
                    className="items-center justify-center rounded-full active:opacity-70"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: c.swatch,
                      borderWidth: on ? 3 : 0,
                      borderColor: BLUE,
                    }}
                  >
                    {on ? <Ionicons name="checkmark" size={18} color="#1F2937" /> : null}
                  </Pressable>
                );
              })}
              <Pressable
                onPress={() => onHighlight(null)}
                disabled={!anyHighlight}
                hitSlop={4}
                accessibilityRole="button"
                accessibilityLabel={`Remove highlight from ${reference}`}
                accessibilityState={{ disabled: !anyHighlight }}
                className="items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 active:opacity-70"
                style={{ width: 36, height: 36, opacity: anyHighlight ? 1 : 0.35 }}
              >
                <Ionicons name="close" size={18} color="#9CA3AF" />
              </Pressable>
            </View>

            <View className="flex-row justify-between">
              <SheetAction
                icon="git-compare-outline"
                label="Compare"
                onPress={() => {
                  track("verse_compare", reference);
                  setMode("compare");
                }}
                accessibilityLabel={`Compare ${reference} in BSB, WEB and KJV`}
              />
              <SheetAction
                icon={saved ? "bookmark" : "bookmark-outline"}
                label={saved ? "Saved" : "Save"}
                active={saved}
                onPress={onToggleSave}
                accessibilityLabel={saved ? `Remove ${reference} from Saved` : `Save ${reference}`}
                accessibilityState={{ selected: saved }}
              />
              <SheetAction
                icon="copy-outline"
                label="Copy"
                onPress={onCopy}
                accessibilityLabel={`Copy ${reference} with its reference`}
              />
              <SheetAction
                icon="share-outline"
                label="Share"
                onPress={onShare}
                accessibilityLabel={`Share ${reference}`}
              />
            </View>
          </>
        )}

        <View style={{ minHeight: 22 }} className="items-center justify-center mt-3" accessibilityLiveRegion="polite">
          {status ? (
            <View className="flex-row items-center">
              <Ionicons
                name={status.tone === "ok" ? "checkmark-circle" : "alert-circle"}
                size={14}
                color={status.tone === "ok" ? "#16A34A" : "#DC2626"}
              />
              <Text
                className={`text-xs font-semibold ml-1.5 ${status.tone === "ok" ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {status.text}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

function SheetAction({
  icon,
  label,
  onPress,
  accessibilityLabel,
  accessibilityState,
  active = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityState?: { selected?: boolean };
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="items-center flex-1 active:opacity-60"
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
    >
      <View
        className={`items-center justify-center rounded-2xl ${active ? "" : "bg-brand-blue/10 dark:bg-blue-300/15"}`}
        style={{ width: 52, height: 48, backgroundColor: active ? BLUE : undefined }}
      >
        <Ionicons name={icon} size={22} color={active ? "#FFFFFF" : BLUE} />
      </View>
      <Text className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1.5">{label}</Text>
    </Pressable>
  );
}

/** The selection in each bundled translation. Side by side on a wide screen, stacked on a phone. */
function CompareVersions({
  reference,
  translation,
  bookId,
  chapter,
  start,
  end,
  onBack,
  onReadIn,
}: {
  reference: string;
  translation: TranslationId;
  bookId: string;
  chapter: number;
  start: number;
  end: number;
  onBack: () => void;
  onReadIn: (translation: TranslationId) => void;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 720;
  const bsb = useChapter("BSB", bookId, chapter);
  const web = useChapter("WEB", bookId, chapter);
  const kjv = useChapter("KJV", bookId, chapter);
  const byId = { BSB: bsb, WEB: web, KJV: kjv };

  return (
    <View>
      <View className="flex-row items-center mb-3">
        <Pressable
          onPress={onBack}
          hitSlop={10}
          className="p-1 mr-2 active:opacity-60"
          accessibilityRole="button"
          accessibilityLabel={`Back to actions for ${reference}`}
        >
          <Ionicons name="chevron-back" size={20} color={BLUE} />
        </Pressable>
        <Text className="text-base font-semibold text-gray-900 dark:text-white flex-1">Compare versions</Text>
        <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">{reference}</Text>
      </View>
      <View style={{ flexDirection: wide ? "row" : "column", gap: 10 }}>
        {COMPARE_ORDER.map((id) => {
          const state = byId[id];
          const info = TRANSLATIONS.find((t) => t.id === id);
          const verses = state.verses.filter((v) => v.verse >= start && v.verse <= end);
          const reading = id === translation;
          return (
            <View
              key={id}
              className={`rounded-2xl border px-4 py-3 ${reading ? "border-brand-blue/40 bg-brand-blue/5 dark:bg-blue-300/10" : "border-gray-100 dark:border-gray-800"}`}
              style={wide ? { flex: 1 } : undefined}
            >
              <View className="flex-row items-center mb-1.5">
                <Text className="text-xs font-bold text-brand-earth mr-2">{id}</Text>
                <Text className="text-[11px] text-gray-400 dark:text-gray-500 flex-1" numberOfLines={1}>
                  {info?.name}
                </Text>
                {reading ? (
                  <Text className="text-[11px] font-semibold text-brand-blue dark:text-blue-300">Reading</Text>
                ) : (
                  <Pressable
                    onPress={() => onReadIn(id)}
                    hitSlop={8}
                    className="active:opacity-60"
                    accessibilityRole="button"
                    accessibilityLabel={`Switch the reader to the ${info?.name ?? id}`}
                  >
                    <Text className="text-[11px] font-semibold text-brand-blue dark:text-blue-300">Read in {id}</Text>
                  </Pressable>
                )}
              </View>
              {state.loading ? (
                <ActivityIndicator color={BLUE} style={{ marginVertical: 8 }} />
              ) : state.error ? (
                <Text className="text-sm text-gray-500 dark:text-gray-400">This version didn&apos;t load.</Text>
              ) : verses.length === 0 ? (
                <Text className="text-sm italic text-gray-500 dark:text-gray-400">
                  {start === end ? "This verse isn't" : "These verses aren't"} in the {id} text.
                </Text>
              ) : (
                <Text style={{ fontFamily: serifFont }} className="text-[15px] leading-6 text-gray-800 dark:text-gray-100">
                  {verses.map((v, i) => (
                    <Text key={v.verse}>
                      {start !== end ? <Text className="text-[11px] font-bold text-brand-earth">{v.verse} </Text> : null}
                      {v.text}
                      {i < verses.length - 1 ? " " : ""}
                    </Text>
                  ))}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
