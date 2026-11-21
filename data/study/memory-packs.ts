/**
 * Starter collections for Memory. Only references live here: the words come from whichever
 * bundled public-domain translation (BSB, WEB, KJV) the person reads, when they add a pack.
 */
import type { Ionicons } from "@expo/vector-icons";

export interface PackPassage {
  book: string;
  chapter: number;
  start: number;
  end: number;
}

export interface MemoryPack {
  /** Stored on cards as a collection id. */
  id: string;
  title: string;
  summary: string;
  icon: keyof typeof Ionicons.glyphMap;
  passages: PackPassage[];
  /** A single long passage that can also be learned one verse at a time. */
  byVerse?: boolean;
}

const p = (book: string, chapter: number, start: number, end = start): PackPassage => ({ book, chapter, start, end });

export const MEMORY_PACKS: MemoryPack[] = [
  {
    id: "pack-gospel",
    title: "The gospel",
    summary: "The good news in six verses: God's love, our need, and grace through faith.",
    icon: "heart",
    passages: [p("john", 3, 16), p("romans", 3, 23), p("romans", 6, 23), p("romans", 5, 8), p("ephesians", 2, 8, 9), p("1john", 5, 13)],
  },
  {
    id: "pack-peace",
    title: "Peace",
    summary: "Promises to carry into anxious days and restless nights.",
    icon: "leaf",
    passages: [p("john", 14, 27), p("isaiah", 26, 3), p("philippians", 4, 6, 7), p("john", 16, 33), p("psalms", 4, 8), p("2thessalonians", 3, 16)],
  },
  {
    id: "pack-courage",
    title: "Strength and courage",
    summary: "God's presence and help when you feel weak or afraid.",
    icon: "shield",
    passages: [p("isaiah", 41, 10), p("joshua", 1, 9), p("philippians", 4, 13), p("psalms", 46, 1), p("2timothy", 1, 7), p("deuteronomy", 31, 6)],
  },
  {
    id: "pack-psalm23",
    title: "Psalm 23",
    summary: "The shepherd psalm, whole or one verse at a time.",
    icon: "sunny",
    passages: [p("psalms", 23, 1, 6)],
    byVerse: true,
  },
  {
    id: "pack-lords-prayer",
    title: "The Lord's Prayer",
    summary: "The prayer Jesus taught his disciples (Matthew 6:9-13).",
    icon: "hand-left",
    passages: [p("matthew", 6, 9, 13)],
    byVerse: true,
  },
  {
    id: "pack-hope",
    title: "Hope",
    summary: "Where hope comes from when the night is long, and why it holds.",
    icon: "star",
    passages: [p("romans", 15, 13), p("jeremiah", 29, 11), p("psalms", 42, 11), p("romans", 8, 24, 25), p("1peter", 1, 3), p("lamentations", 3, 21, 23)],
  },
  {
    id: "pack-promises",
    title: "Promises",
    summary: "God keeps his word. Six verses to stand on when you need to remember it.",
    icon: "ribbon",
    passages: [p("2peter", 1, 4), p("hebrews", 10, 23), p("numbers", 23, 19), p("isaiah", 40, 31), p("joshua", 21, 45), p("2corinthians", 1, 20)],
  },
  {
    id: "pack-prayer",
    title: "Prayer",
    summary: "Invitations to pray: boldly, constantly, and with thanks.",
    icon: "chatbubbles",
    passages: [p("1thessalonians", 5, 16, 18), p("matthew", 7, 7, 8), p("hebrews", 4, 16), p("psalms", 145, 18), p("james", 5, 16), p("philippians", 4, 6, 7)],
  },
];

/** Starter packs shown on an empty Memory home. */
export const STARTER_PACK_IDS = ["pack-gospel", "pack-peace", "pack-psalm23"];

export function getPack(id: string | undefined | null): MemoryPack | undefined {
  return MEMORY_PACKS.find((pack) => pack.id === id);
}

/** A byVerse pack's passage split into its verses. */
export function versesOf(passage: PackPassage): PackPassage[] {
  const out: PackPassage[] = [];
  for (let v = passage.start; v <= passage.end; v++) out.push({ ...passage, start: v, end: v });
  return out;
}
