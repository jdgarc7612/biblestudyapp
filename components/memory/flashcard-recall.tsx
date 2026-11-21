import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";

/** Classic retrieval practice: say the passage from memory, then reveal it and grade yourself. */
export function FlashcardRecall({
  reference,
  text,
  onComplete,
}: {
  reference: string;
  text: string;
  onComplete: () => void;
}) {
  const [cue, setCue] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const firstWords = text.trim().split(/\s+/).slice(0, 3).join(" ");

  return (
    <View>
      {!revealed ? (
        <View className="rounded-3xl border border-dashed border-brand-blue/40 px-6 py-10 items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={26} color="#4A6FA5" />
          <Text className="text-[15px] text-gray-600 dark:text-gray-300 text-center mt-3 leading-6">
            Say {reference} from memory, aloud or in your head. Then check yourself.
          </Text>
          {cue ? (
            <Text style={{ fontFamily: serifFont }} className="text-lg text-gray-900 dark:text-gray-100 mt-4 italic">
              “{firstWords}…”
            </Text>
          ) : (
            <Pressable
              onPress={() => setCue(true)}
              accessibilityRole="button"
              accessibilityLabel="Show the first few words as a cue"
              hitSlop={10}
              className="mt-4 active:opacity-60"
            >
              <Text className="text-sm font-semibold text-brand-blue">Show the first words</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <Text
          style={{ fontFamily: serifFont }}
          className="text-xl leading-9 text-gray-900 dark:text-gray-100"
          accessibilityLiveRegion="polite"
        >
          {text}
        </Text>
      )}

      {!revealed && (
        <Pressable
          onPress={() => {
            setRevealed(true);
            onComplete();
          }}
          accessibilityRole="button"
          accessibilityLabel="Show the verse and check myself"
          className="mt-6 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Show the verse</Text>
        </Pressable>
      )}
    </View>
  );
}
