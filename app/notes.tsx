import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { serifFont } from "../constants/fonts";
import { BOOKS } from "../lib/bible";
import { byPassage, listNotes, type NoteEntry } from "../lib/notes";
import { useAppStore } from "../store/useAppStore";

const BLUE = "#4A6FA5";
type Order = "recent" | "bible";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/** Every study note in one place: newest first or in Bible order, with search. */
export default function NotesScreen() {
  const router = useRouter();
  const verseNotes = useAppStore((s) => s.verseNotes);
  const signedIn = useAppStore((s) => !!s.syncedUserId);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<Order>("recent");

  const all = useMemo(() => listNotes(verseNotes), [verseNotes]);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? all.filter((n) => n.text.toLowerCase().includes(q) || n.reference.toLowerCase().includes(q))
      : all;
    return order === "bible" ? [...filtered].sort(byPassage) : filtered;
  }, [all, query, order]);

  // In Bible order, group under book names.
  const groups = useMemo(() => {
    if (order === "recent") return [{ title: null as string | null, notes: shown }];
    const out: { title: string | null; notes: NoteEntry[] }[] = [];
    for (const n of shown) {
      const title = BOOKS[n.bookIndex]?.name ?? n.book;
      const last = out[out.length - 1];
      if (last && last.title === title) last.notes.push(n);
      else out.push({ title, notes: [n] });
    }
    return out;
  }, [shown, order]);

  const open = (n: NoteEntry) =>
    router.push({
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
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">My notes</Text>
        <Text className="text-sm text-gray-400 dark:text-gray-500">{all.length}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {all.length === 0 ? (
          <View className="items-center pt-16 px-6">
            <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-4">
              <Ionicons name="create-outline" size={26} color={BLUE} />
            </View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notes yet</Text>
            <Text className="text-sm text-center text-gray-500 dark:text-gray-400 leading-5 mb-6">
              In the Reader, tap a verse, then Study, then Notes. Everything you write is kept here,
              tied to its passage.
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
