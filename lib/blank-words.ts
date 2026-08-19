import type { Difficulty } from "./srs";

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function shouldBlank(index: number, fraction: number, seed: number): boolean {
  if (fraction <= 0) return false;
  if (fraction >= 1) return true;
  const pseudo = (((index + 1) * 2654435761 + seed) % 1000) / 1000;
  return pseudo < fraction;
}

/** Returns the sorted indices of words to blank out of `wordCount`, deterministic per seedKey. */
export function pickBlankIndices(wordCount: number, fraction: number, seedKey: string): number[] {
  const seed = hashSeed(seedKey);
  const indices: number[] = [];
  for (let i = 0; i < wordCount; i++) {
    if (shouldBlank(i, fraction, seed)) indices.push(i);
  }
  return indices;
}

const BLANK_RANGE: Record<Difficulty, [number, number]> = {
  easy: [0.3, 0.4],
  medium: [0.6, 0.75],
  hard: [1, 1],
};

/** How much of a verse to blank, picked deterministically within the difficulty's target band. */
export function blankFractionForDifficulty(difficulty: Difficulty, seedKey: string): number {
  const [min, max] = BLANK_RANGE[difficulty];
  if (min >= max) return min;
  const rand = mulberry32(hashSeed(`${seedKey}-fraction`))();
  return min + rand * (max - min);
}

/** Strips leading/trailing punctuation, returning just the letters/digits of a word. */
export function wordCore(word: string): string {
  const match = word.match(/^\W*([\p{L}\p{N}']+)\W*$/u);
  return match ? match[1] : word;
}

/** Fully masks a word's core (e.g. "loved," -> "_____,"), keeping surrounding punctuation. */
export function maskWord(word: string): string {
  const match = word.match(/^(\W*)([\p{L}\p{N}']+)(\W*)$/u);
  if (!match) return word;
  const [, lead, core, trail] = match;
  return lead + "_".repeat(Math.max(core.length, 1)) + trail;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic shuffle so a card's word bank order doesn't change across re-renders. */
export function seededShuffle<T>(items: T[], seedKey: string): T[] {
  const rand = mulberry32(hashSeed(seedKey));
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
