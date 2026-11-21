import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { speechChunks } from "../../lib/memory-reference";
import { useSpeechSupport } from "../../hooks/use-speech-support";
import { playChunks, type Playback } from "../../lib/speech";

/**
 * Say the passage aloud from memory, start to finish (nothing is recorded or transcribed),
 * then reveal it and grade yourself. After revealing, it can be read aloud to check.
 */
export function ReciteRecall({
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
  const [hearing, setHearing] = useState(false);
  const [silent, setSilent] = useState(false);
  const playback = useRef<Playback | null>(null);
  const support = useSpeechSupport();
  const chunks = useMemo(() => speechChunks(text), [text]);
  const firstWords = text.trim().split(/\s+/).slice(0, 3).join(" ");

  useEffect(() => () => playback.current?.stop(), []);

  // Starts speaking inside this press: the browser only allows sound that a press asked for.
  const hear = () => {
    if (hearing) {
      playback.current?.stop();
      setHearing(false);
      return;
    }
    setSilent(false);
    setHearing(true);
    playback.current = playChunks(chunks, 0, {
      rate: 1,
      onChunk: () => {},
      onDone: () => setHearing(false),
      onError: () => {
        setHearing(false);
        setSilent(true);
      },
    });
  };

  if (revealed) {
    return (
      <View>
        <Text style={{ fontFamily: serifFont }} className="text-xl leading-9 text-gray-900 dark:text-gray-100" accessibilityLiveRegion="polite">
          {text}
        </Text>
        {(support === "ready" || support === "checking") && (
          <Pressable
            onPress={hear}
            accessibilityRole="button"
            accessibilityLabel={hearing ? `Stop reading ${reference}` : `Read ${reference} aloud to check`}
            hitSlop={8}
            className="flex-row items-center self-start mt-4 active:opacity-60"
          >
            <Ionicons name={hearing ? "stop-circle-outline" : "volume-high-outline"} size={16} color="#4A6FA5" />
            <Text className="text-sm font-semibold text-brand-blue ml-1.5">{hearing ? "Stop" : "Hear it to check"}</Text>
          </Pressable>
        )}
        {(silent || support === "no-voices") && (
          <View className="flex-row items-center mt-3" accessibilityLiveRegion="polite">
            <Ionicons name="volume-mute-outline" size={15} color="#9CA3AF" />
            <Text className="text-[13px] text-gray-500 dark:text-gray-400 ml-1.5 flex-shrink">
              This browser can&apos;t read it aloud right now. Check the words above instead.
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View>
      <View className="rounded-3xl border border-dashed border-brand-blue/40 px-6 py-10 items-center">
        <Ionicons name="chatbubbles-outline" size={26} color="#4A6FA5" />
        <Text className="text-[16px] font-semibold text-gray-800 dark:text-gray-100 text-center mt-3 leading-6">
          Recite {reference} aloud, from the first word to the last.
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 leading-5">
          Saying it out loud helps it stick. Nothing is recorded.
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
      <Pressable
        onPress={() => {
          setRevealed(true);
          onComplete();
        }}
        accessibilityRole="button"
        accessibilityLabel={`I'm ready, show me ${reference}`}
        className="mt-6 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
      >
        <Text className="text-base font-semibold text-white">I&apos;m ready, show me</Text>
      </Pressable>
    </View>
  );
}
