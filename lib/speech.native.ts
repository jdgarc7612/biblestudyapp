/**
 * Reading a passage aloud on iPhone and Android, with the system voice (expo-speech). No audio
 * is downloaded and nothing is sent to a server by the app. The web build uses speech.ts, which
 * talks to the browser's speech synthesis directly.
 */
import * as Speech from "expo-speech";

import type { Playback, PlayOptions, SpeechSupport } from "./speech";

export type { Playback, PlayOptions, SpeechFailure, SpeechSupport } from "./speech";

/** The device always has a system voice. */
export function speechAvailable(): boolean {
  return true;
}

export function speechSupport(): SpeechSupport {
  return "ready";
}

/** Voices don't change while the app runs, so there is nothing to watch. */
export function subscribeSpeech(_listener: () => void): () => void {
  return () => {};
}

let run = 0;

/**
 * Plays `chunks` from index `from`, one after another. Pause stops the voice and Resume starts
 * again from the piece that was playing (Android has no pause in place).
 */
export function playChunks(chunks: string[], from: number, opts: PlayOptions): Playback {
  let mine = 0;
  let current = from;
  const live = () => mine === run;

  const speakAt = (index: number) => {
    if (!live()) return;
    if (index >= chunks.length) {
      opts.onDone();
      return;
    }
    current = index;
    opts.onChunk(index);
    Speech.speak(chunks[index], {
      language: "en-US",
      rate: opts.rate,
      onDone: () => speakAt(index + 1),
      onError: () => {
        if (live()) opts.onError("failed");
      },
    });
  };

  const begin = (index: number) => {
    mine = ++run;
    Speech.stop();
    speakAt(index);
  };

  begin(from);

  return {
    stop: () => {
      if (!live()) return;
      run++;
      Speech.stop();
    },
    pause: () => {
      if (!live()) return;
      run++;
      Speech.stop();
    },
    resume: () => begin(current),
  };
}

export function stopSpeaking() {
  run++;
  Speech.stop();
}
