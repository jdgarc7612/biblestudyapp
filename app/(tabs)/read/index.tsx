import { Link } from "expo-router";
import { useState } from "react";
import { LayoutAnimation, Platform, Pressable, ScrollView, Text, UIManager, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChapterGrid } from "../../../components/read/chapter-grid";
import { TranslationPill } from "../../../components/read/translation-picker";
import { serifFont } from "../../../constants/fonts";
import { BOOKS, chapterTitle, getBook, getTranslation } from "../../../lib/bible";
import { useAppStore } from "../../../store/useAppStore";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Testament = "OT" | "NT";

export default function ReadScreen() {
  const translation = useAppStore((state) => state.translation);
  const lastRead = useAppStore((state) => state.lastRead);
  const lastBook = getBook(lastRead?.book);

  const [testament, setTestament] = useState<Testament>(lastBook?.testament ?? "NT");
  const [expanded, setExpanded] = useState<string | null>(null);

  const books = BOOKS.filter((b) => b.testament === testament);

  const toggleBook = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((current) => (current === id ? null : id));
  };

  const switchTestament = (next: Testament) => {
    if (next === testament) return;
    setExpanded(null);
    setTestament(next);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-end justify-between mb-6">
          <View className="flex-1 pr-3">
            <Text className="text-sm font-medium text-gray-400 dark:text-gray-500">
              {getTranslation(translation).name}
            </Text>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1">The Bible</Text>
          </View>
          <TranslationPill />
        </View>

        {lastRead && lastBook && (
          <Link
            href={{
              pathname: "/read/[book]/[chapter]",
              params: { book: lastBook.id, chapter: String(lastRead.chapter) },
            }}
            asChild
          >
            <Pressable className="flex-row items-center rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-5 py-5 mb-6 active:opacity-80">
              <View className="w-11 h-11 rounded-full bg-brand-blue items-center justify-center mr-4">
                <Ionicons name="book" size={18} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth">
                  Continue reading
                </Text>
                <Text
                  style={{ fontFamily: serifFont }}
                  className="text-xl text-gray-900 dark:text-white mt-0.5"
                >
                  {chapterTitle(lastBook.name, lastRead.chapter)}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={18} color="#4A6FA5" />
            </Pressable>
          </Link>
        )}

        <View className="flex-row rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 mb-4">
          {(["OT", "NT"] as const).map((t) => {
            const active = t === testament;
            return (
              <Pressable
                key={t}
                onPress={() => switchTestament(t)}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                className="flex-1 items-center rounded-xl py-2.5"
                style={active ? { backgroundColor: "#4A6FA5" } : undefined}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{ color: active ? "#FFFFFF" : "#6B7280" }}
                >
                  {t === "OT" ? "Old Testament" : "New Testament"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View>
          {books.map((book) => {
            const isOpen = expanded === book.id;
            return (
              <View key={book.id} className="border-b border-gray-100 dark:border-gray-800">
                <Pressable
                  onPress={() => toggleBook(book.id)}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  className="flex-row items-center py-4 active:opacity-60"
                >
                  <Text
                    style={{ fontFamily: serifFont }}
                    className="flex-1 text-lg text-gray-900 dark:text-gray-100"
                  >
                    {book.name}
                  </Text>
                  <Text className="text-xs text-gray-400 dark:text-gray-500 mr-2">
                    {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
                  </Text>
                  <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" />
                </Pressable>
                {isOpen && (
                  <View className="pb-5">
                    <ChapterGrid
                      book={book}
                      current={lastRead?.book === book.id ? lastRead.chapter : undefined}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
