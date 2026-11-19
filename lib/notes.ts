import type { VerseNote } from "../store/useAppStore";
import { BOOKS, parseVerseRangeId } from "./bible";

export interface NoteEntry extends VerseNote {
  id: string;
  book: string;
  chapter: number;
  start: number;
  end: number;
  /** Position of the book in the Bible, for sorting by passage. */
  bookIndex: number;
}

const BOOK_INDEX = new Map(BOOKS.map((b, i) => [b.id, i]));

/** Every note with text (deleted ones are left out), newest first. */
export function listNotes(notes: Record<string, VerseNote>): NoteEntry[] {
  const out: NoteEntry[] = [];
  for (const [id, note] of Object.entries(notes)) {
    if (!note.text) continue;
    const range = parseVerseRangeId(id);
    if (!range) continue;
    out.push({ ...note, ...range, id, bookIndex: BOOK_INDEX.get(range.book) ?? 0 });
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Bible order: Genesis 1:1 first. */
export function byPassage(a: NoteEntry, b: NoteEntry) {
  return a.bookIndex - b.bookIndex || a.chapter - b.chapter || a.start - b.start || a.end - b.end;
}

/** Notes in this chapter whose verses overlap start-end. */
export function notesCovering(
  notes: Record<string, VerseNote>,
  book: string,
  chapter: number,
  start: number,
  end: number
): NoteEntry[] {
  return listNotes(notes)
    .filter((n) => n.book === book && n.chapter === chapter && n.start <= end && n.end >= start)
    .sort(byPassage);
}
