import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { serifFont } from "../../constants/fonts";
import { diffVerse } from "../../lib/verse-diff";
import { ResultLine } from "./word-bank-recall";

/** Type the whole passage, then see a word-by-word check. No timer. */
export function TypingRecall({ text, onComplete }: { text: string; onComplete: (accuracy: number) => void }) {
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<ReturnType<typeof diffVerse> | null>(null);

  const check = () => {
    const r = diffVerse(text, typed);
    setResult(r);
    onComplete(r.accuracy);
  };

  if (!result) {
    const empty = typed.trim().length === 0;
    return (
      <View>
        <TextInput
          value={typed}
          onChangeText={setTyped}
          multiline
          autoFocus
          placeholder="Type it from memory…"
          placeholderTextColor="#9CA3AF"
          accessibilityLabel="Type the passage from memory"
          style={{ fontFamily: serifFont, minHeight: 150, textAlignVertical: "top" }}
          className="text-lg leading-8 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3"
        />
        <Pressable
          onPress={check}
          disabled={empty}
          accessibilityRole="button"
          accessibilityLabel="Check what I typed"
          accessibilityState={{ disabled: empty }}
          className="mt-5 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
          style={{ opacity: empty ? 0.4 : 1 }}
        >
          <Text className="text-base font-semibold text-white">Check</Text>
        </Pressable>
      </View>
    );
  }

  const missed = result.tokens.filter((t) => t.type === "missing").length;
  const extra = result.tokens.filter((t) => t.type === "extra").length;
  return (
    <View>
      <Text style={{ fontFamily: serifFont }} className="text-lg leading-8 text-gray-900 dark:text-gray-100">
        {result.tokens.map((token, i) => {
          if (token.type === "match") return <Text key={i}>{token.expected} </Text>;
          if (token.type === "missing") {
            return (
              <Text key={i} style={{ color: "#DC2626", fontWeight: "600", textDecorationLine: "underline" }}>
                [{token.expected}]{" "}
              </Text>
            );
          }
          return (
            <Text key={i} style={{ color: "#B45309", textDecorationLine: "line-through" }}>
              {token.typed}{" "}
            </Text>
          );
        })}
      </Text>
      <ResultLine
        ok={result.accuracy >= 0.98}
        text={`${Math.round(result.accuracy * 100)}% accurate${
          missed || extra ? ` · [bracketed] words were missed${extra ? ", struck words were extra" : ""}` : ""
        }`}
      />
    </View>
  );
}
