import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import type { MemoryCard } from "../../lib/memory";
import { useCardVerses } from "../../lib/memory-text";

const BLUE = "#4A6FA5";
const RIGHT = "#15803D";
const MISS = "#B7864F";

type Earlier = "show" | "dim" | "hide";

/**
 * A long passage as one work: say the first verse, then each next verse from the end of the
 * one before (the join), then the whole passage from the top. Accuracy is the share of verses
 * the person said they had.
 */
export function StitchRecall({
  card,
  warm,
  onComplete,
}: {
  card: MemoryCard;
  /** Verses of this passage were practiced earlier in the sitting. */
  warm: boolean;
  /** No accuracy when the verses couldn't be loaded one by one. */
  onComplete: (accuracy?: number) => void;
}) {
  const { verses, failed } = useCardVerses(card);
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(false);
  const [marks, setMarks] = useState<boolean[]>([]);
  const [earlier, setEarlier] = useState<Earlier>(warm ? "dim" : "show");
  const [wholeShown, setWholeShown] = useState(false);

  const total = verses?.length ?? 0;
  const got = useMemo(() => marks.filter(Boolean).length, [marks]);

  if (failed) {
    return (
      <View className="rounded-3xl border border-dashed border-brand-blue/40 px-6 py-8 items-center">
        <Text className="text-[15px] text-gray-600 dark:text-gray-300 text-center leading-6">
          Couldn&apos;t load this passage verse by verse. Say it all from memory, then check.
        </Text>
        <Pressable
          onPress={() => onComplete()}
          accessibilityRole="button"
          accessibilityLabel="Show the passage and check myself"
          className="mt-5 rounded-2xl bg-brand-blue px-6 py-3.5 active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Show the passage</Text>
        </Pressable>
      </View>
    );
  }
  if (!verses) return <ActivityIndicator color={BLUE} style={{ marginTop: 24 }} />;

  const mark = (ok: boolean) => {
    setMarks((m) => [...m, ok]);
    setStep((s) => s + 1);
    setShown(false);
  };

  // The whole passage, last.
  if (step >= total) {
    return (
      <View>
        <Progress label={`All ${total} verses`} value={total} max={total} />
        <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth mt-5">Now the whole passage</Text>
        {!wholeShown ? (
          <>
            <View className="rounded-3xl border border-dashed border-brand-blue/40 px-6 py-8 items-center mt-3">
              <Ionicons name="git-merge-outline" size={24} color={BLUE} />
              <Text className="text-[16px] font-semibold text-gray-800 dark:text-gray-100 text-center mt-3 leading-6">
                Say all of {card.verseReference} from the top.
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                You had {got} of {total} verses on the way through.
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setWholeShown(true);
                onComplete(total ? got / total : 1);
              }}
              accessibilityRole="button"
              accessibilityLabel={`Show all of ${card.verseReference} and check myself`}
              className="mt-6 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
            >
              <Text className="text-base font-semibold text-white">Show the whole passage</Text>
            </Pressable>
          </>
        ) : (
          <Text style={{ fontFamily: serifFont }} className="text-xl leading-9 text-gray-900 dark:text-gray-100 mt-3" accessibilityLiveRegion="polite">
            {verses.map((v, i) => (
              <Text key={v.verse}>
                <Text className="text-xs font-bold text-brand-earth">{v.verse} </Text>
                {v.text}
                {i < verses.length - 1 ? " " : ""}
              </Text>
            ))}
          </Text>
        )}
      </View>
    );
  }

  const current = verses[step];
  const previous = step > 0 ? verses[step - 1] : null;
  const join = previous ? previous.text.split(/\s+/).slice(-6).join(" ") : "";

  return (
    <View>
      <Progress label={`Verse ${step + 1} of ${total}`} value={step} max={total} />

      {step > 0 && (
        <View className="flex-row items-center mt-4">
          <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-3">Earlier verses</Text>
          <View className="flex-row rounded-xl bg-gray-100 dark:bg-gray-800 p-0.5">
            {(["show", "dim", "hide"] as const).map((o) => {
              const on = earlier === o;
              return (
                <Pressable
                  key={o}
                  onPress={() => setEarlier(o)}
                  accessibilityRole="button"
                  accessibilityLabel={`Earlier verses: ${o}`}
                  accessibilityState={{ selected: on }}
                  className="rounded-lg px-3 py-1.5"
                  style={on ? { backgroundColor: BLUE } : undefined}
                >
                  <Text className="text-xs font-semibold capitalize" style={{ color: on ? "#FFFFFF" : "#6B7280" }}>
                    {o}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {/* What's been said so far. */}
      {step > 0 && (
        <View className="mt-4" style={{ gap: 6 }}>
          {verses.slice(0, step).map((v, i) =>
            earlier === "hide" ? (
              <View key={v.verse} className="flex-row items-center" accessible accessibilityLabel={`Verse ${v.verse}, ${marks[i] ? "had it" : "missed"}`}>
                <Ionicons name={marks[i] ? "checkmark-circle" : "ellipse-outline"} size={14} color={marks[i] ? RIGHT : MISS} />
                <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1.5">
                  Verse {v.verse} · {marks[i] ? "had it" : "missed"}
                </Text>
              </View>
            ) : (
              <Text
                key={v.verse}
                style={{ fontFamily: serifFont, opacity: earlier === "dim" ? 0.4 : 0.85 }}
                className="text-[15px] leading-6 text-gray-700 dark:text-gray-300"
              >
                <Text className="text-[11px] font-bold text-brand-earth">{v.verse} </Text>
                {v.text}
              </Text>
            )
          )}
        </View>
      )}

      <View className="rounded-3xl border border-dashed border-brand-blue/40 px-6 py-7 mt-5">
        {previous ? (
          <>
            <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">The join</Text>
            <Text style={{ fontFamily: serifFont }} className="text-lg text-gray-700 dark:text-gray-200 mt-2 italic">
              “…{join}”
            </Text>
            <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mt-3">
              What comes next? Say verse {current.verse}.
            </Text>
          </>
        ) : (
          <>
            <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">The beginning</Text>
            <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mt-2">
              How does {card.verseReference} begin? Say verse {current.verse}.
            </Text>
          </>
        )}
        {shown && (
          <Text style={{ fontFamily: serifFont }} className="text-xl leading-8 text-gray-900 dark:text-gray-100 mt-4" accessibilityLiveRegion="polite">
            <Text className="text-xs font-bold text-brand-earth">{current.verse} </Text>
            {current.text}
          </Text>
        )}
      </View>

      {!shown ? (
        <Pressable
          onPress={() => setShown(true)}
          accessibilityRole="button"
          accessibilityLabel={`Show verse ${current.verse}`}
          className="mt-5 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Show verse {current.verse}</Text>
        </Pressable>
      ) : (
        <View className="flex-row mt-5" style={{ gap: 10 }}>
          <Pressable
            onPress={() => mark(false)}
            accessibilityRole="button"
            accessibilityLabel={`I missed verse ${current.verse}`}
            className="flex-1 flex-row items-center justify-center rounded-2xl py-3.5 active:opacity-80"
            style={{ borderWidth: 1, borderColor: `${MISS}66`, backgroundColor: `${MISS}14` }}
          >
            <Ionicons name="refresh" size={16} color={MISS} />
            <Text className="text-[15px] font-semibold ml-1.5" style={{ color: MISS }}>
              Missed it
            </Text>
          </Pressable>
          <Pressable
            onPress={() => mark(true)}
            accessibilityRole="button"
            accessibilityLabel={`I had verse ${current.verse}`}
            className="flex-1 flex-row items-center justify-center rounded-2xl py-3.5 active:opacity-80"
            style={{ backgroundColor: BLUE }}
          >
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            <Text className="text-[15px] font-semibold text-white ml-1.5">Had it</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function Progress({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <View>
      <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</Text>
      <View className="flex-row mt-2" style={{ gap: 4 }} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {Array.from({ length: max }, (_, i) => (
          <View key={i} className="flex-1 h-1 rounded-full" style={{ backgroundColor: i < value ? BLUE : `${BLUE}26` }} />
        ))}
      </View>
    </View>
  );
}
