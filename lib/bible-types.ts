export type TranslationId = "WEB" | "BSB" | "KJV";

/** One book of one translation: chapters -> verses (index 0 = verse 1). */
export interface BookText {
  c: string[][];
  /** Psalm superscriptions, keyed by chapter number. */
  t?: Record<string, string>;
}

export interface BookMeta {
  id: string;
  name: string;
  short: string;
  usfm: string;
  testament: "OT" | "NT";
  chapters: number;
}

export const DEFAULT_TRANSLATION: TranslationId = "BSB";
