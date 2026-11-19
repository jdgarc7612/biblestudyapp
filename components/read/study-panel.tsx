import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { getBookIntro } from "../../data/study/book-intros";
import { formatReference, getBook, type TranslationId } from "../../lib/bible";
import {
  useCrossReferences,
  useCrossReferenceText,
  type CrossReference,
} from "../../lib/cross-references";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";
const SHOWN_AT_FIRST = 5;

export type StudyTab = "connections" | "book" | "note";

export interface OpenTarget {
  bookId: string;
  chapter: number;
  verse: number;
  endVerse?: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  bookId: string;
  chapter: number;
  start: number;
  end: number;
  noteId: string;
  reference: string;
  text: string;
  translation: TranslationId;
  isInDeck: boolean;
  onToggleDeck: () => void;
  onInsights: () => void;
  onAsk: (question?: string) => void;
  onOpen: (target: OpenTarget) => void;
  initialTab?: StudyTab;
}

/** The Reader's study panel: the verse, quick actions, and three ways to go deeper. */
export function StudyPanel(props: Props) {
  const { height } = useWindowDimensions();
  const [tab, setTab] = useState<StudyTab>(props.initialTab ?? "connections");
  const book = getBook(props.bookId)!;
  const intro = getBookIntro(props.bookId);
  const hasNote = useAppStore((s) => !!s.verseNotes[props.noteId]?.text);

  useEffect(() => {
    if (props.visible) setTab(props.initialTab ?? "connections");
  }, [props.visible, props.initialTab]);

  const tabs: { id: StudyTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: "connections", label: "Cross-refs", icon: "git-network-outline" },
    { id: "book", label: `About ${book.short}`, icon: "library-outline" },
    { id: "note", label: hasNote ? "My note ✓" : "My note", icon: "create-outline" },
  ];

  return (
    <Modal visible={props.visible} transparent animationType="slide" onRequestClose={props.onClose}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "#00000066" }}
          onPress={props.onClose}
        >
          <Pressable
            className="bg-white dark:bg-gray-900 rounded-t-3xl"
            style={{ maxHeight: height * 0.88, width: "100%", maxWidth: 720, alignSelf: "center" }}
          >
            <View className="items-center pt-3 pb-1">
              <View className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700" />
            </View>
            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 36 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth">
                  Study
                </Text>
                <Pressable onPress={props.onClose} hitSlop={10} accessibilityLabel="Close">
                  <Ionicons name="close" size={22} color="#9CA3AF" />
                </Pressable>
              </View>
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {props.reference}
              </Text>
              <Text
                style={{ fontFamily: serifFont }}
                className="text-base leading-7 text-gray-800 dark:text-gray-200 mb-5"
                numberOfLines={8}
              >
                “{props.text}”
              </Text>

              <View className="flex-row mb-6" style={{ gap: 8 }}>
                <ActionButton icon="sparkles" label="Insights" onPress={props.onInsights} />
                <ActionButton icon="chatbubble-ellipses" label="Ask AI" onPress={() => props.onAsk()} />
                <ActionButton
                  icon={props.isInDeck ? "bookmark" : "bookmark-outline"}
                  label={props.isInDeck ? "In deck" : "Memorize"}
                  color={EARTH}
                  onPress={props.onToggleDeck}
                />
              </View>

              <View
                className="flex-row rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 mb-5"
                accessibilityRole="tablist"
              >
                {tabs.map((t) => {
                  const active = t.id === tab;
                  return (
                    <Pressable
                      key={t.id}
                      onPress={() => setTab(t.id)}
                      accessibilityRole="tab"
                      accessibilityState={{ selected: active }}
                      className={`flex-1 flex-row items-center justify-center rounded-xl py-2 ${
                        active ? "bg-white dark:bg-gray-700" : ""
                      }`}
                      style={active ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } } : undefined}
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

              {tab === "connections" && (
                <CrossReferences
                  bookId={props.bookId}
                  chapter={props.chapter}
                  start={props.start}
                  end={props.end}
                  reference={props.reference}
                  translation={props.translation}
                  onOpen={props.onOpen}
                  onAsk={props.onAsk}
                />
              )}
              {tab === "book" && intro && (
                <BookIntroView
                  bookId={props.bookId}
                  onOpen={props.onOpen}
                  onAsk={props.onAsk}
                />
              )}
              {tab === "note" && (
                <NoteEditor noteId={props.noteId} reference={props.reference} />
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
  color = BLUE,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-70"
      style={{ backgroundColor: `${color}1A`, borderWidth: 1, borderColor: `${color}40` }}
    >
      <Ionicons name={icon} size={16} color={color} />
      <Text className="text-sm font-semibold ml-1.5" style={{ color }}>
        {label}
      </Text>
    </Pressable>
  );
}

function CrossReferences(props: {
  bookId: string;
  chapter: number;
  start: number;
  end: number;
  reference: string;
  translation: TranslationId;
  onOpen: (t: OpenTarget) => void;
  onAsk: (question?: string) => void;
}) {
  const { refs, loading, error } = useCrossReferences(props.bookId, props.chapter, props.start, props.end);
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? refs : refs.slice(0, SHOWN_AT_FIRST);

  if (loading) {
    return (
      <View className="py-8 items-center">
        <ActivityIndicator color={BLUE} />
      </View>
    );
  }
  if (error || refs.length === 0) {
    return (
      <Text className="text-sm text-gray-500 dark:text-gray-400 py-4 leading-5">
        {error
          ? "Cross-references didn't load. Check your connection and try again."
          : "No cross-references for this verse yet. Try a neighbouring verse, or ask how it fits the wider Bible."}
      </Text>
    );
  }

  return (
    <View>
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-5">
        Scripture explains Scripture. These passages speak to the same words, people or truths.
      </Text>
      <View style={{ gap: 8 }}>
        {shown.map((ref) => (
          <CrossReferenceRow key={ref.label} reference={ref} translation={props.translation} onOpen={props.onOpen} />
        ))}
      </View>
      {refs.length > SHOWN_AT_FIRST && (
        <Pressable onPress={() => setExpanded((e) => !e)} className="py-3 items-center active:opacity-60">
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">
            {expanded ? "Show fewer" : `Show all ${refs.length}`}
          </Text>
        </Pressable>
      )}
      <Pressable
        onPress={() =>
          props.onAsk(
            `How do passages like ${refs
              .slice(0, 3)
              .map((r) => r.label)
              .join(", ")} help me understand ${props.reference}?`
          )
        }
        className="flex-row items-center justify-center rounded-2xl py-3 mt-1 active:opacity-70"
        style={{ backgroundColor: `${BLUE}12` }}
      >
        <Ionicons name="sparkles" size={14} color={BLUE} />
        <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">
          Ask how these connect
        </Text>
      </Pressable>
      <Text className="text-[11px] text-gray-300 dark:text-gray-600 mt-4">
        Cross-references from OpenBible.info (CC BY), based on the Treasury of Scripture Knowledge.
      </Text>
    </View>
  );
}

export function CrossReferenceRow({
  reference,
  translation,
  onOpen,
}: {
  reference: CrossReference;
  translation: TranslationId;
  onOpen: (t: OpenTarget) => void;
}) {
  const text = useCrossReferenceText(reference, translation);
  return (
    <Pressable
      onPress={() =>
        onOpen({
          bookId: reference.book.id,
          chapter: reference.chapter,
          verse: reference.verse,
          endVerse: reference.endChapter === reference.chapter ? reference.endVerse : undefined,
        })
      }
      className="flex-row items-start rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-3 active:opacity-70"
    >
      <View className="flex-1">
        <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 mb-0.5">
          {reference.label}
        </Text>
        {text === null ? (
          <View className="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-800 mt-1" />
        ) : (
          <Text
            style={{ fontFamily: serifFont }}
            className="text-[15px] leading-6 text-gray-700 dark:text-gray-300"
            numberOfLines={3}
          >
            {text}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" style={{ marginTop: 2, marginLeft: 8 }} />
    </Pressable>
  );
}

function BookIntroView({
  bookId,
  onOpen,
  onAsk,
}: {
  bookId: string;
  onOpen: (t: OpenTarget) => void;
  onAsk: (question?: string) => void;
}) {
  const book = getBook(bookId)!;
  const intro = getBookIntro(bookId)!;
  const [kc, kv] = intro.keyVerse;
  const facts: [string, string][] = [
    ["Written by", intro.author],
    ["When", intro.written],
    ["First readers", intro.audience],
  ];
  return (
    <View>
      <Text
        style={{ fontFamily: serifFont }}
        className="text-xl leading-8 text-gray-900 dark:text-white mb-3"
      >
        {intro.theme}
      </Text>
      <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mb-5">{intro.summary}</Text>
      <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-2 mb-5">
        {facts.map(([label, value], i) => (
          <View
            key={label}
            className={`py-2.5 ${i < facts.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}`}
          >
            <Text className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
              {label}
            </Text>
            <Text className="text-sm text-gray-800 dark:text-gray-200">{value}</Text>
          </View>
        ))}
      </View>
      <Text className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
        Big themes
      </Text>
      <View className="flex-row flex-wrap mb-5" style={{ gap: 6 }}>
        {intro.themes.map((t) => (
          <View key={t} className="rounded-full px-3 py-1.5" style={{ backgroundColor: `${EARTH}22` }}>
            <Text className="text-xs font-semibold" style={{ color: "#8A6A44" }}>
              {t}
            </Text>
          </View>
        ))}
      </View>
      <View className="flex-row" style={{ gap: 8 }}>
        <Pressable
          onPress={() => onOpen({ bookId, chapter: kc, verse: kv })}
          className="flex-1 flex-row items-center justify-center rounded-2xl py-3 active:opacity-70"
          style={{ backgroundColor: `${BLUE}12` }}
        >
          <Ionicons name="key-outline" size={14} color={BLUE} />
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">
            Key verse: {formatReference(book.name, kc, kv).replace(`${book.name} `, `${book.short} `)}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onAsk(`Give me an overview of the book of ${book.name}: its structure, main message and how it points to Christ.`)}
          className="flex-row items-center justify-center rounded-2xl px-4 py-3 active:opacity-70"
          style={{ backgroundColor: `${BLUE}12` }}
          accessibilityLabel={`Ask AI about ${book.name}`}
        >
          <Ionicons name="sparkles" size={14} color={BLUE} />
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">Ask</Text>
        </Pressable>
      </View>
    </View>
  );
}

function NoteEditor({ noteId, reference }: { noteId: string; reference: string }) {
  const saved = useAppStore((s) => s.verseNotes[noteId]?.text ?? "");
  const saveVerseNote = useAppStore((s) => s.saveVerseNote);
  const signedIn = useAppStore((s) => !!s.syncedUserId);
  const [draft, setDraft] = useState(saved);
  const dirty = draft.trim() !== saved;
  const draftRef = useRef(draft);
  draftRef.current = draft;

  // Save when the panel closes or the tab changes, so nothing typed is lost.
  useEffect(() => {
    return () => {
      saveVerseNote(noteId, reference, draftRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId]);

  return (
    <View>
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-5">
        What stands out? A question, a prayer, how it connects to your life.
      </Text>
      <TextInput
        value={draft}
        onChangeText={setDraft}
        multiline
        placeholder={`My note on ${reference}`}
        placeholderTextColor="#9CA3AF"
        textAlignVertical="top"
        className="rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-base text-gray-900 dark:text-gray-100"
        style={{ minHeight: 130, fontFamily: serifFont, lineHeight: 24 }}
      />
      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-xs text-gray-400 dark:text-gray-500 flex-1 mr-3">
          {signedIn ? "Saved to your account." : "Saved on this device. Sign in to keep it everywhere."}
        </Text>
        <Pressable
          onPress={() => saveVerseNote(noteId, reference, draft)}
          disabled={!dirty}
          className="rounded-xl px-5 py-2.5 active:opacity-80"
          style={{ backgroundColor: dirty ? BLUE : "#E5E7EB" }}
        >
          <Text className="text-sm font-semibold" style={{ color: dirty ? "#FFFFFF" : "#9CA3AF" }}>
            {dirty ? "Save" : saved ? "Saved" : "Save"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
