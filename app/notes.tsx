import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnswerCard } from "../components/ai/answer-card";
import { serifFont } from "../constants/fonts";
import { listAnswers, searchAnswers } from "../lib/ai-answers";
import { BOOKS } from "../lib/bible";
import { byPassage, listNotes, type NoteEntry } from "../lib/notes";
import { listPlanAnswers, readingsLabel } from "../lib/plans";
import { listSaved } from "../lib/verse-marks";
import { useAppStore } from "../store/useAppStore";

const BLUE = "#4A6FA5";
type Order = "recent" | "bible";
type Tab = "notes" | "saved" | "answers";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/** A verse note, or an answer from a guided study (shown with its plan, day and question). */
type Entry = NoteEntry & { answer?: { planId: string; day: number; label: string; question: string } };

const BOOK_INDEX = new Map(BOOKS.map((b, i) => [b.id, i]));

/**
 * Every study note and guided-study answer in one place, and (on the Saved tab) the verses saved
 * from the Read tab: newest first or in Bible order, with search.
 */
export default function NotesScreen() {
  const router = useRouter();
  const { tab: tabParam } = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<Tab>(tabParam === "saved" || tabParam === "answers" ? tabParam : "notes");
  const aiAnswers = useAppStore((s) => s.aiAnswers);
  const savedVerses = useAppStore((s) => s.savedVerses);
  const unsaveVerse = useAppStore((s) => s.unsaveVerse);
  const verseNotes = useAppStore((s) => s.verseNotes);
  const planAnswers = useAppStore((s) => s.planAnswers);
  const signedIn = useAppStore((s) => !!s.syncedUserId);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<Order>("recent");

  const all = useMemo<Entry[]>(() => {
    const answers: Entry[] = listPlanAnswers(planAnswers).map((a) => ({
      id: a.id,
      text: a.text,
      reference: readingsLabel(a.plan.days[a.day - 1].readings),
      updatedAt: a.updatedAt,
      book: a.reading.book,
      chapter: a.reading.chapter,
      start: a.reading.start ?? 1,
      end: a.reading.end ?? a.reading.start ?? 1,
      bookIndex: BOOK_INDEX.get(a.reading.book) ?? 0,
      answer: { planId: a.plan.id, day: a.day, label: `${a.plan.title} · Day ${a.day}`, question: a.question },
    }));
    return [...listNotes(verseNotes), ...answers].sort((x, y) => y.updatedAt - x.updatedAt);
  }, [verseNotes, planAnswers]);
  const saved = useMemo(
    () => listSaved(savedVerses).map((v) => ({ ...v, bookIndex: BOOK_INDEX.get(v.book) ?? 0 })),
    [savedVerses]
  );
  const shownSaved = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? saved.filter((v) => [v.text, v.reference].some((t) => t.toLowerCase().includes(q))) : saved;
    return order === "bible" ? [...filtered].sort(byPassage) : filtered;
  }, [saved, query, order]);

  const savedAnswers = useMemo(() => listAnswers(aiAnswers, true), [aiAnswers]);
  const shownAnswers = useMemo(() => searchAnswers(savedAnswers, query), [savedAnswers, query]);
  const counts: Record<Tab, number> = { notes: all.length, saved: saved.length, answers: savedAnswers.length };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? all.filter((n) =>
          [n.text, n.reference, n.answer?.label ?? "", n.answer?.question ?? ""].some((t) => t.toLowerCase().includes(q))
        )
      : all;
    return order === "bible" ? [...filtered].sort(byPassage) : filtered;
  }, [all, query, order]);

  // In Bible order, group under book names.
  const groups = useMemo(() => {
    if (order === "recent") return [{ title: null as string | null, notes: shown }];
    const out: { title: string | null; notes: Entry[] }[] = [];
    for (const n of shown) {
      const title = BOOKS[n.bookIndex]?.name ?? n.book;
      const last = out[out.length - 1];
      if (last && last.title === title) last.notes.push(n);
      else out.push({ title, notes: [n] });
    }
    return out;
  }, [shown, order]);

  const open = (n: Entry) =>
    n.answer
      ? router.push({ pathname: "/study/plans/[id]", params: { id: n.answer.planId, day: String(n.answer.day) } })
      : router.push({
      pathname: "/read/[book]/[chapter]",
      params: {
        book: n.book,
        chapter: String(n.chapter),
        v: String(n.start),
        ...(n.end !== n.start ? { e: String(n.end) } : {}),
        study: "note",
      },
    });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          hitSlop={12}
          accessibilityLabel="Back"
          className="p-1 mr-2 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={24} color={BLUE} />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">
          {tab === "saved" ? "Saved verses" : tab === "answers" ? "Saved answers" : "My notes"}
        </Text>
        <Text className="text-sm text-gray-400 dark:text-gray-500">{counts[tab]}</Text>
      </View>
      <View className="flex-row px-5 pt-3" style={{ gap: 8 }}>
        {(
          [
            ["notes", "Notes", "create-outline"],
            ["saved", "Saved", "bookmark-outline"],
            ["answers", "Answers", "sparkles-outline"],
          ] as [Tab, string, keyof typeof Ionicons.glyphMap][]
        ).map(([id, label, icon]) => (
          <Pressable
            key={id}
            onPress={() => setTab(id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === id }}
            accessibilityLabel={`${label}, ${counts[id]}`}
            className={`flex-1 flex-row items-center justify-center rounded-xl py-2 ${tab === id ? "bg-brand-blue/10 dark:bg-blue-300/15" : ""}`}
          >
            <Ionicons name={icon} size={15} color={tab === id ? BLUE : "#9CA3AF"} />
            <Text
              className={`text-sm font-semibold ml-1.5 ${tab === id ? "text-brand-blue dark:text-blue-300" : "text-gray-500 dark:text-gray-400"}`}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {tab === "answers" ? (
          <SavedAnswers
            entries={shownAnswers}
            total={savedAnswers.length}
            query={query}
            setQuery={setQuery}
            signedIn={signedIn}
            onOpen={(id) => router.push({ pathname: "/answers/[id]", params: { id } })}
            onHistory={() => router.push("/answers")}
          />
        ) : tab === "saved" ? (
          <SavedList
            entries={shownSaved}
            total={saved.length}
            query={query}
            setQuery={setQuery}
            order={order}
            setOrder={setOrder}
            signedIn={signedIn}
            onOpen={(v) =>
              router.push({
                pathname: "/read/[book]/[chapter]",
                params: { book: v.book, chapter: String(v.chapter), v: String(v.start), ...(v.end !== v.start ? { e: String(v.end) } : {}) },
              })
            }
            onUnsave={unsaveVerse}
            onBrowse={() => router.push("/read")}
          />
        ) : all.length === 0 ? (
          <View className="items-center pt-16 px-6">
            <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-4">
              <Ionicons name="create-outline" size={26} color={BLUE} />
            </View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notes yet</Text>
            <Text className="text-sm text-center text-gray-500 dark:text-gray-400 leading-5 mb-6">
              In the Reader, tap a verse, then Study, then Notes. Answers to guided study questions
              show up here too, each tied to its passage.
            </Text>
            <Pressable
              onPress={() => router.push("/read")}
              className="rounded-xl px-5 py-3 active:opacity-80"
              style={{ backgroundColor: BLUE }}
            >
              <Text className="text-sm font-semibold text-white">Open the Bible</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View className="flex-row items-center rounded-2xl bg-gray-100 dark:bg-gray-800 px-4 mb-3">
              <Ionicons name="search" size={16} color="#9CA3AF" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search your notes"
                placeholderTextColor="#9CA3AF"
                className="flex-1 py-3 ml-2 text-base text-gray-900 dark:text-gray-100"
              />
            </View>
            <View className="flex-row mb-4" style={{ gap: 8 }}>
              {(
                [
                  ["recent", "Newest"],
                  ["bible", "Bible order"],
                ] as [Order, string][]
              ).map(([id, label]) => (
                <Pressable
                  key={id}
                  onPress={() => setOrder(id)}
                  className={`rounded-full px-4 py-1.5 ${order === id ? "bg-brand-blue" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <Text
                    className={`text-sm font-semibold ${order === id ? "text-white" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {shown.length === 0 && (
              <Text className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
                No notes match “{query.trim()}”.
              </Text>
            )}

            {groups.map((g, gi) => (
              <View key={g.title ?? gi} className="mb-2">
                {g.title && (
                  <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mt-3 mb-2">
                    {g.title}
                  </Text>
                )}
                <View style={{ gap: 10 }}>
                  {g.notes.map((n) => (
                    <Pressable
                      key={n.id}
                      onPress={() => open(n)}
                      className="rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-4 active:opacity-70"
                    >
                      <View className="flex-row items-center justify-between mb-1.5">
                        <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">{n.reference}</Text>
                        <Text className="text-xs text-gray-400 dark:text-gray-500">{formatDate(n.updatedAt)}</Text>
                      </View>
                      {n.answer && (
                        <>
                          <View className="flex-row items-center mb-1">
                            <Ionicons name="map-outline" size={12} color="#C19A6B" />
                            <Text className="text-xs font-semibold text-brand-earth ml-1">{n.answer.label}</Text>
                          </View>
                          <Text className="text-sm leading-5 text-gray-500 dark:text-gray-400 mb-1.5" numberOfLines={2}>
                            {n.answer.question}
                          </Text>
                        </>
                      )}
                      <Text
                        style={{ fontFamily: serifFont }}
                        className="text-[15px] leading-6 text-gray-800 dark:text-gray-200"
                        numberOfLines={4}
                      >
                        {n.text}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}

            <Text className="text-xs text-gray-400 dark:text-gray-500 text-center mt-6">
              {signedIn ? "Your notes sync to your account." : "Notes are saved on this device. Sign in to keep them everywhere."}
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type SavedEntry = ReturnType<typeof listSaved>[number] & { bookIndex: number };

function OrderChips({ order, setOrder }: { order: Order; setOrder: (o: Order) => void }) {
  return (
    <View className="flex-row mb-4" style={{ gap: 8 }}>
      {(
        [
          ["recent", "Newest"],
          ["bible", "Bible order"],
        ] as [Order, string][]
      ).map(([id, label]) => (
        <Pressable
          key={id}
          onPress={() => setOrder(id)}
          className={`rounded-full px-4 py-1.5 ${order === id ? "bg-brand-blue" : "bg-gray-100 dark:bg-gray-800"}`}
        >
          <Text className={`text-sm font-semibold ${order === id ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

/** Verses saved from the Read tab. Separate from Memory: nothing here is scheduled for review. */
function SavedList({
  entries,
  total,
  query,
  setQuery,
  order,
  setOrder,
  signedIn,
  onOpen,
  onUnsave,
  onBrowse,
}: {
  entries: SavedEntry[];
  total: number;
  query: string;
  setQuery: (q: string) => void;
  order: Order;
  setOrder: (o: Order) => void;
  signedIn: boolean;
  onOpen: (v: SavedEntry) => void;
  onUnsave: (id: string) => void;
  onBrowse: () => void;
}) {
  if (total === 0) {
    return (
      <View className="items-center pt-16 px-6">
        <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-4">
          <Ionicons name="bookmark-outline" size={26} color={BLUE} />
        </View>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved verses yet</Text>
        <Text className="text-sm text-center text-gray-500 dark:text-gray-400 leading-5 mb-6">
          In the Reader, tap a verse, drag the bar up (or tap More), then Save. Saved verses are a
          bookmark list; adding to Memory is separate.
        </Text>
        <Pressable onPress={onBrowse} className="rounded-xl px-5 py-3 active:opacity-80" style={{ backgroundColor: BLUE }}>
          <Text className="text-sm font-semibold text-white">Open the Bible</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <>
      <View className="flex-row items-center rounded-2xl bg-gray-100 dark:bg-gray-800 px-4 mb-3">
        <Ionicons name="search" size={16} color="#9CA3AF" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search saved verses"
          placeholderTextColor="#9CA3AF"
          className="flex-1 py-3 ml-2 text-base text-gray-900 dark:text-gray-100"
        />
      </View>
      <OrderChips order={order} setOrder={setOrder} />
      {entries.length === 0 && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
          No saved verses match “{query.trim()}”.
        </Text>
      )}
      <View style={{ gap: 10 }}>
        {entries.map((v) => (
          <Pressable
            key={v.id}
            onPress={() => onOpen(v)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${v.reference} in the Reader`}
            className="rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-4 active:opacity-70"
          >
            <View className="flex-row items-center mb-1.5">
              <Ionicons name="bookmark" size={13} color={BLUE} />
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">{v.reference}</Text>
              <Text className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 ml-2">{v.translation}</Text>
              <Text className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{formatDate(v.savedAt)}</Text>
            </View>
            <Text
              style={{ fontFamily: serifFont }}
              className="text-[15px] leading-6 text-gray-800 dark:text-gray-200"
              numberOfLines={4}
            >
              {v.text}
            </Text>
            <Pressable
              onPress={() => onUnsave(v.id)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${v.reference} from Saved`}
              className="self-start flex-row items-center mt-2 active:opacity-60"
            >
              <Ionicons name="close-circle-outline" size={14} color="#9CA3AF" />
              <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 ml-1">Unsave</Text>
            </Pressable>
          </Pressable>
        ))}
      </View>
      <Text className="text-xs text-gray-400 dark:text-gray-500 text-center mt-6">
        {signedIn ? "Saved verses sync to your account." : "Saved verses stay on this device. Sign in to keep them everywhere."}
      </Text>
    </>
  );
}

/** Ask AI answers the reader saved. Every answer is also in History (Ask AI tab). */
function SavedAnswers({
  entries,
  total,
  query,
  setQuery,
  signedIn,
  onOpen,
  onHistory,
}: {
  entries: ReturnType<typeof listAnswers>;
  total: number;
  query: string;
  setQuery: (q: string) => void;
  signedIn: boolean;
  onOpen: (id: string) => void;
  onHistory: () => void;
}) {
  const historyLink = (
    <Pressable onPress={onHistory} hitSlop={8} accessibilityRole="link" className="self-center mt-5 active:opacity-60">
      <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300">See every past answer</Text>
    </Pressable>
  );
  if (total === 0) {
    return (
      <View className="items-center pt-16 px-6">
        <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-4">
          <Ionicons name="sparkles-outline" size={26} color={BLUE} />
        </View>
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved answers yet</Text>
        <Text className="text-sm text-center text-gray-500 dark:text-gray-400 leading-5">
          On Ask AI, tap Save under an answer to keep it here. Every answer is also kept in History.
        </Text>
        {historyLink}
      </View>
    );
  }
  return (
    <>
      <View className="flex-row items-center rounded-2xl bg-gray-100 dark:bg-gray-800 px-4 mb-4">
        <Ionicons name="search" size={16} color="#9CA3AF" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search saved answers"
          placeholderTextColor="#9CA3AF"
          className="flex-1 py-3 ml-2 text-base text-gray-900 dark:text-gray-100"
        />
      </View>
      {entries.length === 0 && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
          No saved answers match “{query.trim()}”.
        </Text>
      )}
      <View style={{ gap: 10 }}>
        {entries.map((a) => (
          <AnswerCard key={a.id} entry={a} onPress={() => onOpen(a.id)} />
        ))}
      </View>
      {historyLink}
      <Text className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
        {signedIn ? "Saved answers sync to your account." : "Saved answers stay on this device. Sign in to keep them everywhere."}
      </Text>
    </>
  );
}
