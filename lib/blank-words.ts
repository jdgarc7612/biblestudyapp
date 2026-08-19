export interface WordToken {
  display: string;
  isBlank: boolean;
}

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

function maskWord(word: string, revealFirstLetter: boolean): string {
  const match = word.match(/^(\W*)([\p{L}\p{N}']+)(\W*)$/u);
  if (!match) return word;
  const [, lead, core, trail] = match;
  const visible = revealFirstLetter ? core.slice(0, 1) : "";
  const masked = visible + "_".repeat(Math.max(core.length - visible.length, 1));
  return lead + masked + trail;
}

const PROGRESSIVE_STEPS = [0, 0.25, 0.45, 0.65, 0.8, 0.9, 1];

export function progressiveBlankFraction(repetitions: number): number {
  return PROGRESSIVE_STEPS[Math.min(repetitions, PROGRESSIVE_STEPS.length - 1)];
}

export function buildProgressiveTokens(
  text: string,
  repetitions: number,
  seedKey: string
): WordToken[] {
  const fraction = progressiveBlankFraction(repetitions);
  const words = text.trim().split(/\s+/);
  const seed = hashSeed(seedKey);
  return words.map((word, index) => {
    const blank = shouldBlank(index, fraction, seed);
    return { display: blank ? maskWord(word, false) : word, isBlank: blank };
  });
}

export function buildFirstLetterTokens(text: string): WordToken[] {
  const words = text.trim().split(/\s+/);
  return words.map((word) => ({ display: maskWord(word, true), isBlank: true }));
}
