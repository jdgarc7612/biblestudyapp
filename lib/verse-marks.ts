/**
 * Highlights and saved verses from the Read tab: the pure rules, kept apart from the screens so
 * they can be tested. Both live in the synced user_data JSON (lib/sync-merge.ts), keyed by verse
 * range id ("john-3-16-17"). A removal is kept as a tombstone with a fresh `updatedAt`, so a sync
 * with an older copy never brings it back.
 *
 * Saved verses are a bookmark list. They are not the Memory deck: saving never schedules reviews.
 */
import type { TranslationId } from "./bible-types";

export type HighlightColor = "yellow" | "green" | "pink" | "purple" | "orange";

export interface HighlightSwatch {
  id: HighlightColor;
  name: string;
  /** The solid swatch shown in the action sheet. */
  swatch: string;
  /** The wash behind highlighted verses; readable under dark and light text. */
  wash: string;
}

/**
 * Picked to stay clear of the reader's own washes: the blue selection (#4A6FA533) and the earth
 * Memory tint (#C19A6B33).
 */
export const HIGHLIGHT_COLORS: HighlightSwatch[] = [
  { id: "yellow", name: "Yellow", swatch: "#F2C94C", wash: "#F2C94C59" },
  { id: "green", name: "Green", swatch: "#6FCF97", wash: "#6FCF9759" },
  { id: "pink", name: "Pink", swatch: "#F28BB4", wash: "#F28BB459" },
  { id: "purple", name: "Lavender", swatch: "#A98BEF", wash: "#A98BEF59" },
  { id: "orange", name: "Coral", swatch: "#F2994A", wash: "#F2994A59" },
];

export function highlightSwatch(color: HighlightColor | null | undefined): HighlightSwatch | undefined {
  return HIGHLIGHT_COLORS.find((c) => c.id === color);
}

/** A highlighted verse or range. `color: null` marks a removed highlight. */
export interface VerseHighlight {
  color: HighlightColor | null;
  updatedAt: number;
}

/** A bookmarked verse or range, with its text as saved so the list reads offline. */
export interface SavedVerse {
  reference: string;
  translation: TranslationId;
  text: string;
  savedAt: number;
  updatedAt: number;
  /** True once unsaved, so a sync doesn't bring it back. */
  removed?: boolean;
}

interface Range {
  book: string;
  chapter: number;
  start: number;
  end: number;
}

const rangeId = (r: Range) => `${r.book}-${r.chapter}-${r.start}-${r.end}`;

function parse(id: string): Range | null {
  const parts = id.split("-");
  if (parts.length !== 4) return null;
  const [book, c, s, e] = parts;
  const chapter = Number(c);
  const start = Number(s);
  const end = Number(e);
  if (!book || ![chapter, start, end].every(Number.isInteger)) return null;
  return { book, chapter, start, end };
}

/** Merges two copies by id: the more recently changed entry wins, removals included. */
export function mergeByUpdatedAt<T extends { updatedAt: number }>(
  local: Record<string, T> | undefined,
  remote: Record<string, T> | undefined
): Record<string, T> {
  const out = { ...(remote ?? {}) };
  for (const [id, entry] of Object.entries(local ?? {})) {
    if (!entry || typeof entry.updatedAt !== "number") continue;
    if (!out[id] || entry.updatedAt > out[id].updatedAt) out[id] = entry;
  }
  return out;
}

/**
 * The color each verse of a chapter shows. Where ranges overlap (two devices highlighted
 * different ranges before syncing), the most recently changed range wins; on a tie, the
 * later id in sort order, so every device shows the same thing.
 */
export function chapterHighlights(
  highlights: Record<string, VerseHighlight>,
  book: string,
  chapter: number
): Map<number, HighlightColor> {
  const covering: { range: Range; id: string; h: VerseHighlight }[] = [];
  for (const [id, h] of Object.entries(highlights)) {
    if (!h?.color) continue;
    const range = parse(id);
    if (!range || range.book !== book || range.chapter !== chapter) continue;
    covering.push({ range, id, h });
  }
  // Oldest first, so later ones paint over earlier ones.
  covering.sort((a, b) => a.h.updatedAt - b.h.updatedAt || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const out = new Map<number, HighlightColor>();
  for (const { range, h } of covering) {
    for (let v = range.start; v <= range.end; v++) out.set(v, h.color!);
  }
  return out;
}

/** The one color every verse in start-end shares, or null when mixed or plain. */
export function selectionHighlight(colors: Map<number, HighlightColor>, start: number, end: number): HighlightColor | null {
  const first = colors.get(start);
  if (!first) return null;
  for (let v = start + 1; v <= end; v++) if (colors.get(v) !== first) return null;
  return first;
}

/**
 * Colors (or, with `color: null`, clears) verses start-end. Any highlight that overlaps them is
 * trimmed to the verses outside the selection, so ranges on one device never overlap and
 * "Remove" clears exactly what was selected.
 */
export function applyHighlight(
  highlights: Record<string, VerseHighlight>,
  target: Range,
  color: HighlightColor | null,
  now: number
): Record<string, VerseHighlight> {
  const out = { ...highlights };
  for (const [id, h] of Object.entries(highlights)) {
    if (!h?.color) continue;
    const r = parse(id);
    if (!r || r.book !== target.book || r.chapter !== target.chapter) continue;
    if (r.end < target.start || r.start > target.end) continue;
    out[id] = { color: null, updatedAt: now };
    if (r.start < target.start) out[rangeId({ ...r, end: target.start - 1 })] = { color: h.color, updatedAt: now };
    if (r.end > target.end) out[rangeId({ ...r, start: target.end + 1 })] = { color: h.color, updatedAt: now };
  }
  if (color) out[rangeId(target)] = { color, updatedAt: now };
  return out;
}

/** Saved verses still saved (unsaved ones are left out), newest first. */
export function listSaved(saved: Record<string, SavedVerse>): (SavedVerse & Range & { id: string })[] {
  const out: (SavedVerse & Range & { id: string })[] = [];
  for (const [id, entry] of Object.entries(saved)) {
    if (!entry || entry.removed) continue;
    const r = parse(id);
    if (!r) continue;
    out.push({ ...entry, ...r, id });
  }
  return out.sort((a, b) => b.savedAt - a.savedAt);
}

export function isSaved(saved: Record<string, SavedVerse>, id: string | null): boolean {
  return !!id && !!saved[id] && !saved[id].removed;
}

/**
 * The text Copy and Share send: the reference with its translation, then each verse.
 * One verse reads as a quote; a range numbers its verses.
 */
export function formatVerseShare(
  reference: string,
  translation: TranslationId,
  verses: { verse: number; text: string }[]
): string {
  const heading = `${reference} (${translation})`;
  const withText = verses.filter((v) => v.text.trim().length > 0);
  if (withText.length === 0) return heading;
  if (withText.length === 1) return `${heading}\n${withText[0].text.trim()}`;
  return `${heading}\n${withText.map((v) => `${v.verse} ${v.text.trim()}`).join("\n")}`;
}
