import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AppState, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { CrossReferenceRow, type OpenTarget } from "../../components/read/study-panel";
import { serifFont } from "../../constants/fonts";
import { getBookIntro } from "../../data/study/book-intros";
import { chapterTitle, getBook } from "../../lib/bible";
import { useCrossReferences } from "../../lib/cross-references";
import { localDateString } from "../../lib/date";
import { getVerseOfTheDay } from "../../lib/verse-of-the-day";
import { useAppStore } from "../../store/useAppStore";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View className="mt-9 mb-3">
      <Text className="text-lg font-bold text-gray-900 dark:text-white">{title}</Text>
      {subtitle ? (
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-5">{subtitle}</Text>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const currentReadStreak = useAppStore((state) => state.currentReadStreak);
  const currentMemoryStreak = useAppStore((state) => state.currentMemoryStreak);
  const translation = useAppStore((state) => state.translation);
  const lastRead = useAppStore((state) => state.lastRead);
  const tokenBalance = useAppStore((state) => state.tokenBalance);
  const lastReadBook = lastRead ? getBook(lastRead.book) : undefined;

  // Re-check the date when the app comes back to the foreground, so the verse
  // turns over at midnight even if the app was left open.
  const [dateKey, setDateKey] = useState(localDateString());
  useEffect(() => {
    const sub = AppState.addEventListener("change", (status) => {
      if (status === "active") setDateKey(localDateString());
    });
    return () => sub.remove();
  }, []);
  const verse = getVerseOfTheDay(new Date(`${dateKey}T12:00:00`));
  const verseText = verse.text[translation];

  const { refs } = useCrossReferences(verse.book, verse.chapter, verse.start, verse.end);
  const featured = refs.slice(0, 3);

  const studyBook = lastReadBook ?? getBook(verse.book)!;
  const intro = getBookIntro(studyBook.id);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const openPassage = (target: OpenTarget & { study?: "1" | "book" }) =>
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: {
        book: target.bookId,
        chapter: String(target.chapter),
        v: String(target.verse),
        ...(target.endVerse && target.endVerse !== target.verse ? { e: String(target.endVerse) } : {}),
        ...(target.study ? { study: target.study } : {}),
      },
    });

  const ask = (question: string) =>
    router.push({
      pathname: "/ai",
      params: { verseRef: verse.reference, verseText, translation, question },
    });

  const questions = [
    { icon: "time-outline" as const, text: `What did ${verse.reference} mean to its first readers?` },
    { icon: "heart-outline" as const, text: `How does ${verse.reference} point to Jesus?` },
    { icon: "footsteps-outline" as const, text: `How can I live out ${verse.reference} this week?` },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-sm font-medium text-gray-400 dark:text-gray-500">{today}</Text>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {getGreeting()}
            </Text>
          </View>
          <Link href="/profile" asChild>
            <Pressable
              className="flex-row items-center rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 mt-1 active:opacity-70"
              style={{ gap: 10 }}
              accessibilityLabel={`Reading streak ${currentReadStreak} days, memory streak ${currentMemoryStreak} days, ${tokenBalance} tokens`}
            >
              <View className="flex-row items-center" style={{ gap: 3 }}>
                <Ionicons name="book" size={13} color={BLUE} />
                <Text className="text-sm font-bold text-gray-800 dark:text-gray-100">{currentReadStreak}</Text>
              </View>
              <View className="flex-row items-center" style={{ gap: 3 }}>
                <Ionicons name="flame" size={13} color={EARTH} />
                <Text className="text-sm font-bold text-gray-800 dark:text-gray-100">{currentMemoryStreak}</Text>
              </View>
              <View className="flex-row items-center" style={{ gap: 3 }}>
                <Ionicons name="sparkles" size={13} color={BLUE} />
                <Text className="text-sm font-bold text-gray-800 dark:text-gray-100">{tokenBalance}</Text>
              </View>
            </Pressable>
          </Link>
        </View>
        <Text className="text-base text-gray-500 dark:text-gray-400 mt-2 mb-6 leading-6">
          Read it, trace it through Scripture, and ask what it means.
        </Text>

        {/* Today's study: the daily verse, with a clear way into studying it. */}
        <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-6 pt-6 pb-5">
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 rounded-full bg-brand-earth/20 items-center justify-center mr-2">
              <Ionicons name="sunny" size={16} color={EARTH} />
            </View>
            <Text className="text-xs font-semibold tracking-wide uppercase text-brand-earth">
              Today&apos;s study
            </Text>
          </View>
          <Text
            style={{ fontFamily: serifFont }}
            className="text-xl leading-8 text-gray-900 dark:text-gray-100 mb-3"
          >
            “{verseText}”
          </Text>
          <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 mb-5">
            {verse.reference} · {translation}
          </Text>
          <Pressable
            onPress={() =>
              openPassage({
                bookId: verse.book,
                chapter: verse.chapter,
                verse: verse.start,
                endVerse: verse.end,
                study: "1",
              })
            }
            className="flex-row items-center justify-center rounded-2xl py-3.5 active:opacity-80"
            style={{ backgroundColor: BLUE }}
          >
            <Ionicons name="school-outline" size={17} color="#FFFFFF" />
            <Text className="text-base font-semibold text-white ml-2">Study this verse</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              openPassage({ bookId: verse.book, chapter: verse.chapter, verse: verse.start, endVerse: verse.end })
            }
            className="flex-row items-center justify-center pt-3.5 active:opacity-60"
          >
            <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 mr-1">
              Read {chapterTitle(getBook(verse.book)!.name, verse.chapter)} in context
            </Text>
            <Ionicons name="arrow-forward" size={14} color={BLUE} />
          </Pressable>
        </View>

        {lastRead && lastReadBook ? (
          <Link
            href={{
              pathname: "/read/[book]/[chapter]",
              params: { book: lastRead.book, chapter: String(lastRead.chapter) },
            }}
            asChild
          >
            <Pressable className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-5 py-4 mt-4 active:opacity-70">
              <View className="w-10 h-10 rounded-full bg-brand-blue/10 items-center justify-center mr-4">
                <Ionicons name="book" size={18} color={BLUE} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">Continue reading</Text>
                <Text className="text-sm text-gray-400 dark:text-gray-500">
                  {chapterTitle(lastReadBook.name, lastRead.chapter)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          </Link>
        ) : null}

        {featured.length > 0 && (
          <>
            <SectionTitle
              title="Connected passages"
              subtitle={`Scripture explains Scripture. ${featured.length} of the ${refs.length} passages linked to ${verse.reference}:`}
            />
            <View style={{ gap: 8 }}>
              {featured.map((ref) => (
                <CrossReferenceRow key={ref.label} reference={ref} translation={translation} onOpen={openPassage} />
              ))}
            </View>
          </>
        )}

        <SectionTitle title="Questions to explore" subtitle="Thoughtful answers grounded in Scripture." />
        <View style={{ gap: 8 }}>
          {questions.map((q) => (
            <Pressable
              key={q.text}
              onPress={() => ask(q.text)}
              className="flex-row items-center rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-3.5 active:opacity-70"
            >
              <Ionicons name={q.icon} size={18} color={BLUE} />
              <Text className="flex-1 text-[15px] text-gray-800 dark:text-gray-100 mx-3 leading-5">{q.text}</Text>
              <Ionicons name="sparkles" size={14} color={EARTH} />
            </Pressable>
          ))}
        </View>

        {intro && (
          <>
            <SectionTitle
              title={`Know the book: ${studyBook.name}`}
              subtitle={lastReadBook ? "Background for what you're reading." : "Background for today's verse."}
            />
            <Pressable
              onPress={() =>
                openPassage({
                  bookId: studyBook.id,
                  chapter: intro.keyVerse[0],
                  verse: intro.keyVerse[1],
                  study: "book",
                })
              }
              className="rounded-3xl border border-gray-100 dark:border-gray-800 px-5 py-5 active:opacity-80"
            >
              <Text
                style={{ fontFamily: serifFont }}
                className="text-lg leading-7 text-gray-900 dark:text-white mb-3"
              >
                {intro.theme}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {intro.author} · {intro.written}
              </Text>
              <View className="flex-row flex-wrap items-center" style={{ gap: 6 }}>
                {intro.themes.map((t) => (
                  <View key={t} className="rounded-full px-3 py-1" style={{ backgroundColor: `${EARTH}22` }}>
                    <Text className="text-xs font-semibold" style={{ color: "#8A6A44" }}>
                      {t}
                    </Text>
                  </View>
                ))}
                <View className="flex-row items-center ml-auto">
                  <Text className="text-sm font-semibold text-brand-blue dark:text-blue-300 mr-1">Read intro</Text>
                  <Ionicons name="arrow-forward" size={15} color={BLUE} />
                </View>
              </View>
            </Pressable>
          </>
        )}

        <SectionTitle title="Keep going" />
        <View style={{ gap: 10 }}>
          {!lastRead && (
            <Link href="/read" asChild>
              <Pressable className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-5 py-4 active:opacity-70">
                <View className="w-10 h-10 rounded-full bg-brand-blue/10 items-center justify-center mr-4">
                  <Ionicons name="book" size={18} color={BLUE} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">Open the Bible</Text>
                  <Text className="text-sm text-gray-400 dark:text-gray-500">
                    Tap any verse to study it
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </Pressable>
            </Link>
          )}
          <Link href="/ai" asChild>
            <Pressable className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-5 py-4 active:opacity-70">
              <View className="w-10 h-10 rounded-full bg-brand-blue/10 items-center justify-center mr-4">
                <Ionicons name="chatbubble-ellipses" size={18} color={BLUE} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">Ask your own question</Text>
                <Text className="text-sm text-gray-400 dark:text-gray-500">Anything about the Bible, no judgment</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          </Link>
          <Link href="/memory" asChild>
            <Pressable className="flex-row items-center rounded-2xl border border-gray-100 dark:border-gray-800 px-5 py-4 active:opacity-70">
              <View className="w-10 h-10 rounded-full bg-brand-earth/15 items-center justify-center mr-4">
                <Ionicons name="albums" size={18} color={EARTH} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">Review memory verses</Text>
                <Text className="text-sm text-gray-400 dark:text-gray-500">
                  Keep your deck fresh
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
