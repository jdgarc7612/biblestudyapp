/**
 * Reading a passage aloud with the device's own text-to-speech (expo-speech): the system voice
 * on iPhone and Android, the browser's speech synthesis on the web. No audio is downloaded and
 * nothing is sent to a server by the app.
 */
import * as Speech from "expo-speech";
import { Platform } from "react-native";

/** Whether this device can read aloud (some browsers can't). */
export function speechAvailable(): boolean {
  if (Platform.OS !== "web") return true;
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let voicePick: Promise<string | undefined> | null = null;

/** On the web, prefer an English voice that runs on the device, so it works offline. */
function pickVoice(): Promise<string | undefined> {
  if (Platform.OS !== "web") return Promise.resolve(undefined);
  voicePick ??= Promise.race([
    Speech.getAvailableVoicesAsync()
      .then((all) => {
        // The web voice list also says whether a voice runs on the device.
        const voices = all as (Speech.Voice & { localService?: boolean; isDefault?: boolean })[];
        const english = voices.filter((v) => v.language?.toLowerCase().startsWith("en"));
        const local = english.filter((v) => v.localService);
        const pick = local.find((v) => v.isDefault) ?? local.find((v) => /en-US/i.test(v.language)) ?? local[0];
        return pick?.identifier;
      })
      .catch(() => undefined),
    new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 1500)),
  ]);
  return voicePick;
}

let run = 0;

/**
 * Plays `chunks` from index `from`, one after another. Returns a stop function. Callbacks from a
 * run that was stopped or replaced are ignored.
 */
export function playChunks(
  chunks: string[],
  from: number,
  opts: { rate: number; onChunk: (index: number) => void; onDone: () => void; onError: () => void }
): () => void {
  const mine = ++run;
  Speech.stop();
  const live = () => mine === run;

  const speakAt = (voice: string | undefined, index: number) => {
    if (!live()) return;
    if (index >= chunks.length) {
      opts.onDone();
      return;
    }
    opts.onChunk(index);
    Speech.speak(chunks[index], {
      language: "en-US",
      rate: opts.rate,
      ...(voice ? { voice } : {}),
      onDone: () => speakAt(voice, index + 1),
      onError: () => {
        if (live()) opts.onError();
      },
    });
  };

  void pickVoice().then((voice) => {
    // A short pause after stopping, so the browser doesn't drop the first piece.
    setTimeout(() => speakAt(voice, from), Platform.OS === "web" ? 60 : 0);
  });

  return () => {
    if (!live()) return;
    run++;
    Speech.stop();
  };
}

export function stopSpeaking() {
  run++;
  Speech.stop();
}
