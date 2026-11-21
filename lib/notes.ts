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

export interface SelectionNoteStatus {
  /** The selected verse or range has its own note (the one the Notes tab edits). */
  own: boolean;
  /** Notes with text that overlap the selection, its own note included. */
  count: number;
}

/** Whether a selection already has a note, for the Read tab's Note action. */
export function selectionNoteStatus(
  notes: Record<string, VerseNote>,
  book: string,
  chapter: number,
  start: number,
  end: number
): SelectionNoteStatus {
  const covering = notesCovering(notes, book, chapter, start, end);
  const own = covering.some((n) => n.book === book && n.chapter === chapter && n.start === start && n.end === end);
  return { own, count: covering.length };
}
