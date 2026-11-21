/**
 * Reading a passage aloud on the web, with the browser's own speech synthesis. No audio is
 * downloaded and nothing is sent to a server by the app. The iPhone and Android build uses
 * speech.native.ts (expo-speech).
 *
 * Browsers (Safari on iPhone above all) only let a page start speaking from inside the click or
 * tap that asked for it. So Play, Resume and "Hear it to check" call speechSynthesis.speak()
 * synchronously in that handler: nothing is awaited first, not even the voice list, which is
 * loaded in the background and used once it's there.
 */

export type SpeechSupport = "ready" | "checking" | "no-voices" | "unsupported";
/** blocked: the browser didn't start speaking. no-voice: it has no voice to speak with. */
export type SpeechFailure = "blocked" | "no-voice" | "failed";

export interface PlayOptions {
  rate: number;
  onChunk: (index: number) => void;
  onDone: () => void;
  onError: (reason: SpeechFailure) => void;
}

export interface Playback {
  stop: () => void;
  pause: () => void;
  /** Call from a click or tap, like Play. */
  resume: () => void;
}

/** The parts of a browser voice this file uses. */
export interface VoiceLike {
  lang: string;
  localService?: boolean;
  default?: boolean;
  name?: string;
}

interface UtteranceLike {
  text: string;
  lang: string;
  rate: number;
  voice: VoiceLike | null;
  onstart: ((ev: unknown) => void) | null;
  onend: ((ev: unknown) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onresume: ((ev: unknown) => void) | null;
}

interface SynthLike {
  speaking: boolean;
  pending: boolean;
  paused: boolean;
  speak: (u: UtteranceLike) => void;
  cancel: () => void;
  pause: () => void;
  resume: () => void;
  getVoices: () => VoiceLike[];
  addEventListener?: (type: string, listener: () => void) => void;
}

/** How long a fresh utterance may take to start before we nudge the engine, then give up. */
export const START_NUDGE_MS = 2000;
export const START_GIVE_UP_MS = 2500;
/** How long a resumed utterance may take to report it resumed before we start that piece again. */
export const RESUME_CHECK_MS = 800;

function engine(): { synth: SynthLike; Utterance: new (text: string) => UtteranceLike } | null {
  const w = typeof window !== "undefined" ? (window as unknown as Record<string, unknown>) : undefined;
  if (!w || !w.speechSynthesis || typeof w.SpeechSynthesisUtterance !== "function") return null;
  return {
    synth: w.speechSynthesis as SynthLike,
    Utterance: w.SpeechSynthesisUtterance as new (text: string) => UtteranceLike,
  };
}

// ---------------------------------------------------------------------------
// Voices, loaded in the background

let voices: VoiceLike[] = [];
let voicesSettled = false;
let watching = false;
const listeners = new Set<() => void>();

function refreshVoices() {
  const e = engine();
  if (!e) return;
  try {
    voices = e.synth.getVoices() ?? [];
  } catch {
    voices = [];
  }
  if (voices.length) voicesSettled = true;
  listeners.forEach((l) => l());
}

/** Starts loading the voice list (once). Adds a listener; never replaces onvoiceschanged. */
function watchVoices() {
  if (watching) return;
  const e = engine();
  if (!e) return;
  watching = true;
  refreshVoices();
  e.synth.addEventListener?.("voiceschanged", () => {
    voicesSettled = true;
    refreshVoices();
  });
  // Some browsers never fire voiceschanged. After a short wait, an empty list means no voices.
  setTimeout(() => {
    voicesSettled = true;
    refreshVoices();
  }, 3000);
}

/** Whether this browser has speech synthesis at all. */
export function speechAvailable(): boolean {
  return engine() !== null;
}

/** ready: voices are listed. checking: still loading. no-voices: the browser has none. */
export function speechSupport(): SpeechSupport {
  if (!engine()) return "unsupported";
  watchVoices();
  if (voices.length) return "ready";
  return voicesSettled ? "no-voices" : "checking";
}

export function subscribeSpeech(listener: () => void): () => void {
  watchVoices();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * The voice to read with: an English voice on the device (works offline) if there is one, the
 * US English one first, then any English voice. Undefined means the browser's default voice.
 */
export function chooseVoice<V extends VoiceLike>(list: V[]): V | undefined {
  const english = list.filter((v) => /^en([-_]|$)/i.test(v.lang ?? ""));
  const us = (v: V) => /^en[-_]us/i.test(v.lang);
  const local = english.filter((v) => v.localService);
  return (
    local.find((v) => v.default && us(v)) ??
    local.find(us) ??
    local.find((v) => v.default) ??
    local[0] ??
    english.find((v) => v.default) ??
    english.find(us) ??
    english[0]
  );
}

// ---------------------------------------------------------------------------
// Playing

let run = 0;
/** Kept so Chrome doesn't garbage-collect queued utterances (then onend never fires). */
let held: UtteranceLike[] = [];

/** Stops what's playing. Only cancels when something is queued, then un-sticks a paused engine. */
function hush(synth: SynthLike) {
  if (synth.speaking || synth.pending || synth.paused) synth.cancel();
  if (synth.paused) synth.resume();
  held = [];
}

function failureFor(error: string | undefined): SpeechFailure {
  if (error === "not-allowed") return "blocked";
  if (error === "voice-unavailable" || error === "language-unavailable") return "no-voice";
  return "failed";
}

/**
 * Queues `chunks` from index `from` and starts speaking right away, in the caller's click.
 * Callbacks from a run that was stopped or replaced are ignored.
 */
export function playChunks(chunks: string[], from: number, opts: PlayOptions): Playback {
  const e = engine();
  if (!e) {
    run++;
    opts.onError("no-voice");
    return { stop: () => {}, pause: () => {}, resume: () => {} };
  }
  const { synth, Utterance } = e;
  watchVoices();

  let mine = 0;
  let current = from;
  let paused = false;
  const live = () => mine === run;

  const fail = (reason: SpeechFailure) => {
    if (!live()) return;
    run++;
    hush(synth);
    opts.onError(reason);
  };

  const begin = (start: number) => {
    mine = ++run;
    const token = mine;
    const alive = () => token === run;
    hush(synth);
    paused = false;
    if (start >= chunks.length) {
      opts.onDone();
      return;
    }
    current = start;
    opts.onChunk(start);

    const voice = chooseVoice(voices);
    let started = false;
    const queue = chunks.slice(start).map((text, k) => {
      const index = start + k;
      const u = new Utterance(text);
      u.lang = voice?.lang ?? "en-US";
      if (voice) u.voice = voice;
      u.rate = opts.rate;
      u.onstart = () => {
        if (!alive()) return;
        started = true;
        if (index !== current) {
          current = index;
          opts.onChunk(index);
        }
      };
      u.onend = () => {
        if (!alive() || paused) return;
        if (index === chunks.length - 1) {
          run++;
          held = [];
          opts.onDone();
        }
      };
      u.onerror = (ev) => {
        const error = ev?.error;
        if (!alive() || error === "interrupted" || error === "canceled") return;
        fail(failureFor(error));
      };
      return u;
    });
    held = queue;
    for (const u of queue) synth.speak(u);

    // Nothing started: the engine may be stuck paused (Chrome after a cancel) or have dropped
    // the queue. Nudge it once, then say so instead of sitting silent.
    setTimeout(() => {
      if (!alive() || started || paused) return;
      if (synth.paused) synth.resume();
      if (!synth.speaking && !synth.pending) for (const u of queue) synth.speak(u);
      setTimeout(() => {
        if (!alive() || started || paused) return;
        fail(voicesSettled && voices.length === 0 ? "no-voice" : "blocked");
      }, START_GIVE_UP_MS);
    }, START_NUDGE_MS);
  };

  begin(from);

  return {
    stop: () => {
      if (!live()) return;
      run++;
      hush(synth);
    },
    pause: () => {
      if (!live() || paused) return;
      paused = true;
      synth.pause();
      // An engine that ignores pause() would keep talking under a "Paused" label: stop it, and
      // Resume starts that piece again.
      const token = mine;
      setTimeout(() => {
        if (token === run && paused && synth.speaking && !synth.paused) hush(synth);
      }, 300);
    },
    resume: () => {
      if (!live() || !paused) {
        if (!live()) begin(current);
        return;
      }
      paused = false;
      // Some engines (Android Chrome) drop the queue on pause: start the piece again, in the click.
      if (!synth.speaking && !synth.pending) {
        begin(current);
        return;
      }
      const token = mine;
      let resumed = false;
      for (const u of held) {
        const prior = u.onstart;
        u.onresume = () => {
          resumed = true;
        };
        u.onstart = (ev) => {
          resumed = true;
          prior?.(ev);
        };
      }
      synth.resume();
      setTimeout(() => {
        if (token !== run || resumed || paused) return;
        if (synth.speaking && !synth.paused) return;
        begin(current);
      }, RESUME_CHECK_MS);
    },
  };
}

export function stopSpeaking() {
  run++;
  const e = engine();
  if (e) hush(e.synth);
}
