/**
 * How Bible text looks in the Read tab: its size (per device, since a phone and a tablet want
 * different sizes) and its reading theme (bought in the Rewards Shop, synced with the account).
 * Each theme has a light and a dark version, so it tints the page without fighting dark mode.
 */

export type ReadingThemeId = "default" | "parchment" | "dusk" | "sage";

export interface ThemeColors {
  background: string;
  text: string;
  /** Verse numbers and small marks. */
  accent: string;
}

export interface ReadingTheme {
  id: ReadingThemeId;
  name: string;
  description: string;
  /** Tokens in the Rewards Shop; 0 for the free default. */
  cost: number;
  light: ThemeColors | null;
  dark: ThemeColors | null;
}

export const READING_THEMES: ReadingTheme[] = [
  {
    id: "default",
    name: "Classic",
    description: "The standard page",
    cost: 0,
    light: null,
    dark: null,
  },
  {
    id: "parchment",
    name: "Parchment",
    description: "Warm paper, like a printed Bible",
    cost: 25,
    light: { background: "#F6EFE1", text: "#3A2F24", accent: "#A47A48" },
    dark: { background: "#1E1A15", text: "#E9DFCC", accent: "#C19A6B" },
  },
  {
    id: "dusk",
    name: "Dusk",
    description: "Soft blue, calm for evening reading",
    cost: 25,
    light: { background: "#EDF1F7", text: "#1F2A3A", accent: "#4A6FA5" },
    dark: { background: "#121A27", text: "#D9E2EE", accent: "#8FAAD3" },
  },
  {
    id: "sage",
    name: "Sage",
    description: "Quiet green, easy on the eyes",
    cost: 25,
    light: { background: "#EEF2EA", text: "#27311F", accent: "#6B8A5A" },
    dark: { background: "#151B14", text: "#DCE5D5", accent: "#9DB88C" },
  },
];

export function getReadingTheme(id: string | null | undefined): ReadingTheme {
  return READING_THEMES.find((t) => t.id === id) ?? READING_THEMES[0];
}

/** The colors to paint, or null for the app's own colors. A theme you don't own shows as Classic. */
export function readingThemeColors(
  id: string | null | undefined,
  owned: readonly string[],
  dark: boolean
): ThemeColors | null {
  const theme = getReadingTheme(id);
  if (theme.cost > 0 && !owned.includes(theme.id)) return null;
  return dark ? theme.dark : theme.light;
}

/** Bible text sizes, smallest first. The default (index 2) is the size the reader always had. */
export const TEXT_SIZES = [
  { label: "Smallest", fontSize: 15, lineHeight: 25 },
  { label: "Small", fontSize: 16.5, lineHeight: 28 },
  { label: "Standard", fontSize: 18, lineHeight: 32 },
  { label: "Large", fontSize: 20.5, lineHeight: 36 },
  { label: "Largest", fontSize: 23, lineHeight: 40 },
] as const;

export const DEFAULT_TEXT_SIZE = 2;

export function clampTextSize(index: number | null | undefined): number {
  if (typeof index !== "number" || !Number.isFinite(index)) return DEFAULT_TEXT_SIZE;
  return Math.min(TEXT_SIZES.length - 1, Math.max(0, Math.round(index)));
}

/**
 * Verses flow as one paragraph, so there's no per-verse position to read. These estimate a
 * verse's place from how far through the chapter text it is (the same way linked verses scroll).
 */
const LOOK_AHEAD = 140;

/** The verse near the top of the screen at this scroll position. */
export function verseAtScroll(scrollY: number, textTop: number, textHeight: number, lastVerse: number): number {
  if (textHeight <= 0 || lastVerse < 1) return 1;
  const fraction = (scrollY + LOOK_AHEAD - textTop) / textHeight;
  return Math.min(lastVerse, Math.max(1, Math.floor(fraction * lastVerse) + 1));
}

/** The scroll position that brings this verse near the top (the inverse of verseAtScroll). */
export function scrollForVerse(verse: number, textTop: number, textHeight: number, lastVerse: number): number {
  const fraction = (verse - 1) / Math.max(1, lastVerse);
  return Math.max(0, textTop + textHeight * fraction - LOOK_AHEAD);
}

/** A horizontal swipe in the reader: next chapter (left), previous (right), or neither. */
export function swipeDirection(dx: number, dy: number, vx = 0): "next" | "prev" | null {
  if (Math.abs(dx) < Math.abs(dy) * 2) return null;
  const far = Math.abs(dx) >= 70;
  const flick = Math.abs(dx) >= 35 && Math.abs(vx) >= 0.5;
  if (!far && !flick) return null;
  return dx < 0 ? "next" : "prev";
}

/**
 * The first time the Read tab opens in a visit, it goes straight back to where you were reading.
 * Opening any chapter counts too, so a later tap on Read shows the book list as asked.
 */
let readingResumed = false;

/** True the first time it's asked in a visit, if no chapter has been opened yet. */
export function shouldResumeReading(): boolean {
  if (readingResumed) return false;
  readingResumed = true;
  return true;
}

export function markReadingResumed(): void {
  readingResumed = true;
}
