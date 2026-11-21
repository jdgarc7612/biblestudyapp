import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { speechChunks } from "../../lib/memory-reference";
import { useSpeechSupport } from "../../hooks/use-speech-support";
import { playChunks, type Playback, type SpeechFailure } from "../../lib/speech";

const BLUE = "#4A6FA5";

type Status = "idle" | "playing" | "paused" | "done";

/**
 * Hear the passage read aloud by the device (never on its own: the person presses Play), as
 * often as they like, saying it along. Then check the words, or say it back from memory.
 */
export function ListenRecall({
  reference,
  text,
  onComplete,
  onRecite,
}: {
  reference: string;
  text: string;
  onComplete: () => void;
  onRecite: () => void;
}) {
  const chunks = useMemo(() => speechChunks(text), [text]);
  const [status, setStatus] = useState<Status>("idle");
  const [part, setPart] = useState(0);
  const [plays, setPlays] = useState(0);
  const [loop, setLoop] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState<SpeechFailure | null>(null);
  const [revealed, setRevealed] = useState(false);
  const playback = useRef<Playback | null>(null);
  const loopRef = useRef(loop);
  loopRef.current = loop;
  const support = useSpeechSupport();
  const [tryAnyway, setTryAnyway] = useState(false);
  const available = support === "ready" || support === "checking" || tryAnyway;

  useEffect(() => () => playback.current?.stop(), []);

  // Starts speaking inside this press: the browser only allows sound that a press asked for.
  const start = (from: number, rate = slow ? 0.8 : 1) => {
    setError(null);
    setStatus("playing");
    playback.current = playChunks(chunks, from, {
      rate,
      onChunk: setPart,
      onDone: () => {
        setPlays((n) => n + 1);
        if (loopRef.current) start(0, rate);
        else {
          setStatus("done");
          setPart(0);
        }
      },
      onError: (reason) => {
        setStatus("idle");
        setError(reason);
      },
    });
  };
  const pause = () => {
    playback.current?.pause();
    setStatus("paused");
  };
  const resume = () => {
    setError(null);
    setStatus("playing");
    if (playback.current) playback.current.resume();
    else start(part);
  };
  const halt = () => {
    playback.current?.stop();
    if (status === "playing") setStatus("paused");
  };

  const playing = status === "playing";
  const statusText = error
    ? error === "no-voice"
      ? "This browser has no voice to read aloud with."
      : error === "blocked"
        ? "Your browser didn't start reading. Press play again, and check the sound is on."
        : "Your device couldn't read this aloud just now."
    : playing
      ? `Playing${chunks.length > 1 ? `, part ${part + 1} of ${chunks.length}` : ""}${loop ? ", on repeat" : ""}`
      : status === "paused"
        ? `Paused${chunks.length > 1 ? ` at part ${part + 1} of ${chunks.length}` : ""}`
        : plays > 0
          ? `Played ${plays === 1 ? "once" : `${plays} times`}`
          : "Press play to hear it read aloud";

  return (
    <View>
      <View className="rounded-3xl bg-brand-blue/5 dark:bg-brand-blue/15 border border-brand-blue/20 px-6 pt-6 pb-5 items-center">
        {available ? (
          <>
            <Pressable
              onPress={() => (playing ? pause() : status === "paused" ? resume() : start(0))}
              accessibilityRole="button"
              accessibilityLabel={`${playing ? "Pause" : status === "paused" ? "Resume" : "Play"} ${reference}`}
              className="w-[72px] h-[72px] rounded-full items-center justify-center active:opacity-80"
              style={{ backgroundColor: BLUE }}
            >
              <Ionicons name={playing ? "pause" : "play"} size={30} color="#FFFFFF" style={playing ? undefined : { marginLeft: 4 }} />
            </Pressable>
            <View className="flex-row items-center mt-4 px-2" style={{ gap: 6 }}>
              {playing && <Ionicons name="volume-high" size={14} color={BLUE} />}
              {error && <Ionicons name="alert-circle-outline" size={15} color="#C19A6B" />}
              <Text
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center flex-shrink"
                accessibilityLiveRegion="polite"
              >
                {statusText}
              </Text>
            </View>
            {error && (
              <Text className="text-[13px] text-gray-500 dark:text-gray-400 text-center mt-1.5 leading-5">
                Recite works the same way without sound.
              </Text>
            )}
            {chunks.length > 1 && (
              <View className="flex-row w-full mt-3" style={{ gap: 4 }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
                {chunks.map((_, i) => {
                  const filled = status !== "idle" && status !== "done" && i <= part;
                  return (
                    <View key={i} className="flex-1 h-1 rounded-full" style={{ backgroundColor: filled ? BLUE : `${BLUE}26` }} />
                  );
                })}
              </View>
            )}
            <View className="flex-row mt-4" style={{ gap: 8 }}>
              <Toggle
                icon="repeat"
                label="Loop"
                on={loop}
                onPress={() => setLoop((v) => !v)}
                spoken="Loop playback"
              />
              <Toggle
                icon="speedometer-outline"
                label="Slower"
                on={slow}
                onPress={() => {
                  const next = !slow;
                  setSlow(next);
                  if (playing) start(part, next ? 0.8 : 1);
                  else if (status === "paused") {
                    // Resume then starts this piece again at the new speed.
                    playback.current?.stop();
                    playback.current = null;
                  }
                }}
                spoken="Read more slowly"
              />
            </View>
          </>
        ) : (
          <View className="items-center py-2">
            <Ionicons name="volume-mute-outline" size={26} color="#9CA3AF" />
            <Text className="text-[15px] text-gray-600 dark:text-gray-300 text-center mt-3 leading-6">
              This browser can&apos;t read aloud. Recite works the same way without sound.
            </Text>
            {support === "no-voices" && (
              <Pressable
                onPress={() => {
                  setTryAnyway(true);
                  start(0);
                }}
                accessibilityRole="button"
                accessibilityLabel={`Try reading ${reference} aloud anyway`}
                hitSlop={10}
                className="mt-3 active:opacity-60"
              >
                <Text className="text-sm font-semibold text-brand-blue">Try playing anyway</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>

      {!revealed ? (
        <>
          <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4 leading-5">
            Listen as often as you like, saying it along with the voice. Then check the words.
          </Text>
          <Pressable
            onPress={() => {
              halt();
              setRevealed(true);
              onComplete();
            }}
            accessibilityRole="button"
            accessibilityLabel={`Show the words of ${reference} and check myself`}
            className="mt-5 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">Show the words</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              halt();
              onRecite();
            }}
            accessibilityRole="button"
            accessibilityLabel="Now say it back from memory"
            className="mt-3 rounded-2xl border border-brand-blue/40 py-3.5 items-center active:opacity-70"
          >
            <Text className="text-base font-semibold text-brand-blue">Now say it back</Text>
          </Pressable>
        </>
      ) : (
        <Text
          style={{ fontFamily: serifFont }}
          className="text-xl leading-9 text-gray-900 dark:text-gray-100 mt-6"
          accessibilityLiveRegion="polite"
        >
          {text}
        </Text>
      )}
    </View>
  );
}

function Toggle({
  icon,
  label,
  on,
  onPress,
  spoken,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  on: boolean;
  onPress: () => void;
  spoken: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityLabel={spoken}
      accessibilityState={{ checked: on }}
      className="flex-row items-center rounded-full px-3.5 py-2 active:opacity-70"
      style={on ? { backgroundColor: BLUE } : { borderWidth: 1, borderColor: "#9CA3AF55" }}
    >
      <Ionicons name={on ? "checkmark" : icon} size={14} color={on ? "#FFFFFF" : "#6B7280"} />
      <Text className="text-[13px] font-semibold ml-1.5" style={{ color: on ? "#FFFFFF" : "#6B7280" }}>
        {label}
        {on ? " on" : ""}
      </Text>
    </Pressable>
  );
}
