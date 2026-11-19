import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChapterGrid } from "../../../../components/read/chapter-grid";
import { TranslationPill } from "../../../../components/read/translation-picker";
import { serifFont } from "../../../../constants/fonts";
import { BOOKS, getBook } from "../../../../lib/bible";
import { useAppStore } from "../../../../store/useAppStore";

/** Old links like /read/3 pointed at John (the only book before the full Bible). */
const LEGACY_JOHN_CHAPTERS = 21;

export async function generateStaticParams(): Promise<{ book: string }[]> {
  return [
    ...BOOKS.map((b) => ({ book: b.id })),
    ...Array.from({ length: LEGACY_JOHN_CHAPTERS }, (_, i) => ({ book: String(i + 1) })),
  ];
}

export default function BookScreen() {
  const { book: bookParam } = useLocalSearchParams<{ book: string }>();
  const router = useRouter();
  const lastRead = useAppStore((state) => state.lastRead);
  const book = getBook(bookParam);

  if (!book) {
    if (/^\d+$/.test(bookParam ?? "") && Number(bookParam) <= LEGACY_JOHN_CHAPTERS) {
      return <Redirect href={{ pathname: "/read/[book]/[chapter]", params: { book: "john", chapter: bookParam } }} />;
    }
    return <Redirect href="/read" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/read"))}
          hitSlop={12}
          accessibilityLabel="Back"
          className="p-1 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={24} color="#4A6FA5" />
        </Pressable>
        <TranslationPill compact />
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
        <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth">
          {book.testament === "OT" ? "Old Testament" : "New Testament"}
        </Text>
        <Text style={{ fontFamily: serifFont }} className="text-4xl text-gray-900 dark:text-white mt-1 mb-6">
          {book.name}
        </Text>
        <ChapterGrid book={book} current={lastRead?.book === book.id ? lastRead.chapter : undefined} />
      </ScrollView>
    </SafeAreaView>
  );
}
