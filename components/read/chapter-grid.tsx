import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import type { BookMeta } from "../../lib/bible";

export function ChapterGrid({ book, current }: { book: BookMeta; current?: number }) {
  return (
    <View className="flex-row flex-wrap" style={{ gap: 10 }}>
      {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => {
        const isCurrent = chapter === current;
        return (
          <Link
            key={chapter}
            href={{ pathname: "/read/[book]/[chapter]", params: { book: book.id, chapter: String(chapter) } }}
            asChild
          >
            <Pressable
              accessibilityLabel={`${book.name} chapter ${chapter}`}
              className="w-14 h-14 rounded-2xl items-center justify-center active:opacity-70"
              style={{ backgroundColor: isCurrent ? "#4A6FA5" : "#4A6FA50D" }}
            >
              <Text
                className="text-base font-semibold"
                style={{ color: isCurrent ? "#FFFFFF" : "#4A6FA5" }}
              >
                {chapter}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
