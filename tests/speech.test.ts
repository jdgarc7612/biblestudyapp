import assert from "node:assert/strict";
import { mock, test } from "node:test";

import { chooseVoice, playChunks, speechSupport, START_GIVE_UP_MS, START_NUDGE_MS, type SpeechFailure } from "../lib/speech";

type Ev = { error?: string };
class FakeUtterance {
  lang = "";
  rate = 1;
  voice: unknown = null;
  onstart: ((e: unknown) => void) | null = null;
  onend: ((e: unknown) => void) | null = null;
  onerror: ((e: Ev) => void) | null = null;
  onresume: ((e: unknown) => void) | null = null;
  text: string;
  constructor(text: string) {
    this.text = text;
  }
}

/** A stand-in for window.speechSynthesis that records calls; the test plays the engine's part. */
class FakeSynth {
  speaking = false;
  pending = false;
  paused = false;
  queue: FakeUtterance[] = [];
  calls: string[] = [];
  voices: { lang: string; localService?: boolean; default?: boolean }[] = [];
  speak(u: FakeUtterance) {
    this.calls.push(`speak:${u.text}`);
    this.queue.push(u);
    this.pending = true;
  }
  cancel() {
    this.calls.push("cancel");
    this.queue = [];
    this.speaking = false;
    this.pending = false;
  }
  pause() {
    this.calls.push("pause");
    this.paused = true;
  }
  resume() {
    this.calls.push("resume");
    this.paused = false;
  }
  getVoices() {
    return this.voices;
  }
  addEventListener() {}
  /** The engine starts the next queued utterance. */
  start() {
    const u = this.queue[0];
    this.speaking = true;
    this.pending = this.queue.length > 1;
    u.onstart?.({});
    return u;
  }
  /** The engine finishes the current utterance. */
  finish() {
    const u = this.queue.shift()!;
    this.speaking = this.queue.length > 0;
    this.pending = this.queue.length > 1;
    u.onend?.({});
  }
}

function install() {
  const synth = new FakeSynth();
  (globalThis as Record<string, unknown>).window = { speechSynthesis: synth, SpeechSynthesisUtterance: FakeUtterance };
  return synth;
}

function recorder() {
  const events: string[] = [];
  return {
    events,
    opts: {
      rate: 1,
      onChunk: (i: number) => events.push(`chunk:${i}`),
      onDone: () => events.push("done"),
      onError: (r: SpeechFailure) => events.push(`error:${r}`),
    },
  };
}

test("chooseVoice prefers a US English voice on the device, then any English voice", () => {
  const remoteUs = { lang: "en-US", localService: false, name: "Google US English" };
  const localGb = { lang: "en-GB", localService: true, name: "Daniel" };
  const localUs = { lang: "en-US", localService: true, name: "Samantha" };
  const french = { lang: "fr-FR", localService: true, default: true, name: "Thomas" };
  assert.equal(chooseVoice([french, remoteUs, localGb, localUs]), localUs);
  assert.equal(chooseVoice([french, remoteUs, localGb]), localGb);
  // Only remote English voices: still use one rather than none.
  assert.equal(chooseVoice([french, remoteUs]), remoteUs);
  assert.equal(chooseVoice([french]), undefined);
  assert.equal(chooseVoice([]), undefined);
});

test("Play speaks right away, inside the press, without a needless cancel", () => {
  const synth = install();
  const { opts, events } = recorder();
  const playback = playChunks(["The Lord is my shepherd;", "I shall not want."], 0, opts);
  // Both pieces were handed to the browser before playChunks returned: nothing was awaited.
  assert.deepEqual(synth.calls, ["speak:The Lord is my shepherd;", "speak:I shall not want."]);
  assert.equal(synth.queue[0].lang, "en-US");
  synth.start();
  synth.finish();
  synth.start();
  synth.finish();
  assert.deepEqual(events, ["chunk:0", "chunk:1", "done"]);
  playback.stop();
});

test("A new Play clears a stuck queue and un-pauses the engine first", () => {
  const synth = install();
  synth.speaking = true;
  synth.paused = true;
  const { opts } = recorder();
  const playback = playChunks(["Be still."], 0, opts);
  assert.deepEqual(synth.calls, ["cancel", "resume", "speak:Be still."]);
  playback.stop();
});

test("Pause and resume use the engine's own pause, and resume from the press", () => {
  const synth = install();
  const { opts, events } = recorder();
  const playback = playChunks(["One.", "Two."], 0, opts);
  synth.start();
  playback.pause();
  assert.ok(synth.paused);
  playback.resume();
  assert.equal(synth.paused, false);
  assert.ok(synth.calls.includes("pause") && synth.calls.includes("resume"));
  synth.finish();
  synth.start();
  synth.finish();
  assert.deepEqual(events, ["chunk:0", "chunk:1", "done"]);
});

test("If the engine dropped the queue on pause, resume starts that piece again in the press", () => {
  const synth = install();
  const { opts, events } = recorder();
  const playback = playChunks(["One.", "Two."], 0, opts);
  synth.start();
  synth.finish();
  synth.start();
  playback.pause();
  synth.cancel(); // what Android Chrome does with pause()
  synth.paused = false;
  synth.calls = [];
  playback.resume();
  assert.deepEqual(synth.calls, ["speak:Two."]);
  assert.deepEqual(events, ["chunk:0", "chunk:1", "chunk:1"]);
  playback.stop();
});

test("Stop cancels; callbacks from a stopped run are ignored", () => {
  const synth = install();
  const { opts, events } = recorder();
  const playback = playChunks(["One."], 0, opts);
  const u = synth.start();
  playback.stop();
  assert.ok(synth.calls.includes("cancel"));
  u.onerror?.({ error: "interrupted" });
  u.onend?.({});
  assert.deepEqual(events, ["chunk:0"]);
});

test("A browser that refuses to speak reports it instead of staying silent", () => {
  const synth = install();
  const { opts, events } = recorder();
  playChunks(["One."], 0, opts);
  synth.queue[0].onerror?.({ error: "not-allowed" });
  assert.deepEqual(events, ["chunk:0", "error:blocked"]);
});

test("Nothing starting: nudge the engine once, then show an error", () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const synth = install();
    synth.voices = [{ lang: "en-US", localService: true }];
    const { opts, events } = recorder();
    playChunks(["One."], 0, opts);
    synth.paused = true; // Chrome stuck paused after an earlier cancel
    mock.timers.tick(START_NUDGE_MS);
    assert.ok(synth.calls.includes("resume"));
    mock.timers.tick(START_GIVE_UP_MS);
    assert.deepEqual(events, ["chunk:0", "error:blocked"]);
  } finally {
    mock.timers.reset();
  }
});

test("No speech engine at all reads as unsupported", () => {
  (globalThis as Record<string, unknown>).window = {};
  assert.equal(speechSupport(), "unsupported");
  const { opts, events } = recorder();
  playChunks(["One."], 0, opts);
  assert.deepEqual(events, ["error:no-voice"]);
});
