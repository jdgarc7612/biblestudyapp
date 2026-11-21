import { useSyncExternalStore } from "react";

import { speechSupport, subscribeSpeech, type SpeechSupport } from "../lib/speech";

/** Whether this device can read aloud, updated once the browser has listed its voices. */
export function useSpeechSupport(): SpeechSupport {
  return useSyncExternalStore(subscribeSpeech, speechSupport, () => "checking" as SpeechSupport);
}
