import { useRouter } from "expo-router";
import { useState } from "react";
import { LayoutAnimation, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { getBookIntro } from "../../data/study/book-intros";
import { formatReference, type BookMeta } from "../../lib/bible";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

/**
 * A book's introduction as a card that opens in place: the theme shows first, and a tap reveals
 * the summary, background, big themes and key verse. Used where you pick a book's chapter.
 */
export function BookOverview({ book }: { book: BookMeta }) {
  const router = useRouter();
  const intro = getBookIntro(book.id);
  const [open, setOpen] = useState(false);
  if (!intro) return null;
  const [kc, kv] = intro.keyVerse;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => !o);
  };

  const facts: [string, string][] = [
    ["Written by", intro.author],
    ["When", intro.written],
    ["First readers", intro.audience],
  ];

  return (
    <View className="rounded-2xl bg-brand-earth/10 dark:bg-brand-earth/15 mb-4">
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`About ${book.name}`}
        className="flex-row items-start px-4 py-3.5 active:opacity-70"
      >
        <Ionicons name="library-outline" size={16} color={EARTH} style={{ marginTop: 2 }} />
        <View className="flex-1 mx-2.5">
          <Text className="text-[11px] font-semibold uppercase tracking-wide text-brand-earth mb-0.5">
            About {book.name}
          </Text>
          <Text style={{ fontFamily: serifFont }} className="text-[15px] leading-6 text-gray-800 dark:text-gray-100">
            {intro.theme}
          </Text>
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" style={{ marginTop: 2 }} />
      </Pressable>

      {open && (
        <View className="px-4 pb-4">
          <Text className="text-sm leading-6 text-gray-600 dark:text-gray-300 mb-3">{intro.summary}</Text>
          <View className="rounded-xl bg-white/70 dark:bg-gray-900/40 px-3 py-1 mb-3">
            {facts.map(([label, value], i) => (
              <View
                key={label}
                className={`py-2 ${i < facts.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
              >
                <Text className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  {label}
                </Text>
                <Text className="text-sm text-gray-800 dark:text-gray-200">{value}</Text>
              </View>
            ))}
          </View>
          <View className="flex-row flex-wrap mb-3" style={{ gap: 6 }}>
            {intro.themes.map((t) => (
              <View key={t} className="rounded-full px-3 py-1 bg-white/70 dark:bg-gray-900/40">
                <Text className="text-xs font-semibold" style={{ color: "#8A6A44" }}>
                  {t}
                </Text>
              </View>
            ))}
          </View>
          <View className="flex-row" style={{ gap: 8 }}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/read/[book]/[chapter]",
                  params: { book: book.id, chapter: String(kc), v: String(kv) },
                })
              }
              className="flex-1 flex-row items-center justify-center rounded-xl py-2.5 bg-white/70 dark:bg-gray-900/40 active:opacity-70"
            >
              <Ionicons name="key-outline" size={14} color={BLUE} />
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">
                Key verse: {formatReference(book.short, kc, kv)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/ai",
                  params: {
                    question: `Give me an overview of the book of ${book.name}: its structure, main message and how it points to Christ.`,
                  },
                })
              }
              accessibilityLabel={`Ask AI about ${book.name}`}
              className="flex-row items-center justify-center rounded-xl px-4 py-2.5 bg-white/70 dark:bg-gray-900/40 active:opacity-70"
            >
              <Ionicons name="sparkles" size={14} color={BLUE} />
              <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 ml-1.5">Ask</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
