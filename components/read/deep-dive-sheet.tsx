import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { useDeepDive, type DeepDiveChapter, type DeepDiveContextItem } from "../../data/study/deep-dive";
import { languageOf, useLexiconEntry } from "../../lib/original-language";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";
const EARTH_TEXT = "#8A6A44";

export type DeepDiveTab = "context" | "theology" | "application";

const TABS: { id: DeepDiveTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "context", label: "Context", icon: "compass-outline" },
  { id: "theology", label: "Theology", icon: "book-outline" },
  { id: "application", label: "Application", icon: "leaf-outline" },
];

/**
 * "Go Deeper" for a chapter: a slide-up sheet with its background (Context), what it teaches
 * (Theology) and how to live it (Application). The chapter's study loads only when opened.
 */
export function DeepDiveSheet({
  visible,
  onClose,
  bookId,
  chapter,
  reference,
  title,
  onWord,
  onVerse,
  onPersonalize,
}: {
  visible: boolean;
  onClose: () => void;
  bookId: string;
  chapter: number;
  /** e.g. "Acts 2" */
  reference: string;
  /** The Setting card's title, e.g. "Pentecost". */
  title: string;
  /** Open a word (Strong's number) in a verse in the Study panel. */
  onWord: (verse: number, strongs: number) => void;
  /** Select a verse in the chapter. */
  onVerse: (verse: number) => void;
  onPersonalize: () => void;
}) {
  const { height } = useWindowDimensions();
  const [tab, setTab] = useState<DeepDiveTab>("context");
  const study = useDeepDive(bookId, chapter, visible);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible) setTab("context");
  }, [visible]);

  const pickTab = (next: DeepDiveTab) => {
    setTab(next);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end" style={{ backgroundColor: "#00000066" }} onPress={onClose}>
        <Pressable
          className="bg-white dark:bg-gray-900 rounded-t-3xl"
          style={{ height: height * 0.88, width: "100%", maxWidth: 720, alignSelf: "center" }}
        >
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700" />
          </View>

          <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth">Go deeper</Text>
              <Pressable onPress={onClose} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close">
                <Ionicons name="close" size={22} color="#9CA3AF" />
              </Pressable>
            </View>
            <Text style={{ fontFamily: serifFont }} className="text-2xl leading-9 text-gray-900 dark:text-white mb-4">
              {reference} · {title}
            </Text>

            <View className="flex-row rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 mb-2" accessibilityRole="tablist">
              {TABS.map((t) => {
                const active = t.id === tab;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => pickTab(t.id)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    className={`flex-1 flex-row items-center justify-center rounded-xl py-2 ${
                      active ? "bg-white dark:bg-gray-700" : ""
                    }`}
                    style={
                      active
                        ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } }
                        : undefined
                    }
                  >
                    <Ionicons name={t.icon} size={14} color={active ? BLUE : "#9CA3AF"} />
                    <Text
                      numberOfLines={1}
                      className={`text-xs font-semibold ml-1 ${
                        active ? "text-brand-blue dark:text-blue-300" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {t.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {study === undefined ? (
              <View className="py-16 items-center">
                <ActivityIndicator color={BLUE} />
              </View>
            ) : study === null ? (
              <Text className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center leading-5">
                This study couldn&apos;t load. Check your connection and try again.
              </Text>
            ) : (
              <StudyBody
                study={study}
                tab={tab}
                bookId={bookId}
                onWord={onWord}
                onVerse={onVerse}
                onPersonalize={onPersonalize}
              />
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function StudyBody({
  study,
  tab,
  bookId,
  onWord,
  onVerse,
  onPersonalize,
}: {
  study: DeepDiveChapter;
  tab: DeepDiveTab;
  bookId: string;
  onWord: (verse: number, strongs: number) => void;
  onVerse: (verse: number) => void;
  onPersonalize: () => void;
}) {
  if (tab === "context") {
    return (
      <View style={{ gap: 22 }}>
        {study.context.map((item, i) => (
          <ContextItem key={i} item={item} bookId={bookId} onWord={onWord} onVerse={onVerse} />
        ))}
      </View>
    );
  }

  if (tab === "theology") {
    return (
      <View style={{ gap: 22 }}>
        {study.theology.map((item, i) => (
          <View key={i}>
            <View className="flex-row items-baseline mb-1.5">
              <Text className="text-xs font-semibold mr-2" style={{ color: EARTH_TEXT }}>
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Text className="flex-1 text-base font-semibold text-gray-900 dark:text-white">{item.title}</Text>
            </View>
            <Text style={{ fontFamily: serifFont }} className="text-[16px] leading-7 text-gray-700 dark:text-gray-300">
              {item.body}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View>
      <View style={{ gap: 18 }}>
        {study.application.map((item, i) => (
          <View key={i}>
            <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{item.title}</Text>
            <Text style={{ fontFamily: serifFont }} className="text-[16px] leading-7 text-gray-700 dark:text-gray-300 mb-3">
              {item.body}
            </Text>
            <View
              className="flex-row rounded-2xl px-4 py-3"
              style={{ backgroundColor: `${EARTH}14`, borderLeftWidth: 3, borderLeftColor: EARTH }}
            >
              <Ionicons name="help-circle-outline" size={16} color={EARTH_TEXT} style={{ marginTop: 3, marginRight: 8 }} />
              <Text
                style={{ fontFamily: serifFont }}
                className="flex-1 text-[16px] leading-6 italic text-gray-800 dark:text-gray-100"
              >
                {item.question}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800 items-center">
        <Text className="text-xs text-gray-400 dark:text-gray-500 mb-3 text-center">
          Want help applying this to your own situation?
        </Text>
        <Pressable
          onPress={onPersonalize}
          className="flex-row items-center justify-center rounded-2xl px-5 py-3 active:opacity-70"
          style={{ backgroundColor: `${BLUE}14` }}
          accessibilityRole="button"
          accessibilityLabel="Personalize with AI"
        >
          <Ionicons name="sparkles" size={15} color={BLUE} />
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">Personalize with AI</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ContextItem({
  item,
  bookId,
  onWord,
  onVerse,
}: {
  item: DeepDiveContextItem;
  bookId: string;
  onWord: (verse: number, strongs: number) => void;
  onVerse: (verse: number) => void;
}) {
  return (
    <View>
      <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{item.heading}</Text>
      <Text style={{ fontFamily: serifFont }} className="text-[16px] leading-7 text-gray-700 dark:text-gray-300">
        {item.body}
      </Text>
      {item.v ? (
        item.s ? (
          <WordChip bookId={bookId} verse={item.v} strongs={item.s} onPress={() => onWord(item.v!, item.s!)} />
        ) : (
          <Chip label={`v. ${item.v}`} onPress={() => onVerse(item.v!)} a11y={`Go to verse ${item.v}`} />
        )
      ) : null}
    </View>
  );
}

function WordChip({
  bookId,
  verse,
  strongs,
  onPress,
}: {
  bookId: string;
  verse: number;
  strongs: number;
  onPress: () => void;
}) {
  const entry = useLexiconEntry(languageOf(bookId), strongs);
  const word = entry ? `${entry.t} · ` : "";
  return <Chip label={`${word}v. ${verse}`} onPress={onPress} a11y={`Study ${entry?.t ?? "this word"} in verse ${verse}`} />;
}

function Chip({ label, onPress, a11y }: { label: string; onPress: () => void; a11y: string }) {
  return (
    <Pressable
      onPress={onPress}
      className="self-start flex-row items-center rounded-full px-3 py-1.5 mt-2.5 active:opacity-70"
      style={{ backgroundColor: `${BLUE}12` }}
      accessibilityRole="button"
      accessibilityLabel={a11y}
    >
      <Text className="text-xs font-semibold text-brand-blue dark:text-blue-300">{label}</Text>
      <Ionicons name="chevron-forward" size={11} color={BLUE} style={{ marginLeft: 3 }} />
    </Pressable>
  );
}
