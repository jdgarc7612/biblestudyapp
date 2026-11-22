import { useRouter } from "expo-router";
import { useCallback } from "react";

import { noteWithAnswer, type AiAnswer } from "../../lib/ai-answers";
import { parseVerseRangeId } from "../../lib/bible";
import { useAppStore } from "../../store/useAppStore";

export type NoteResult = "added" | "already" | "no-verse";

/** Adds a kept answer to the note on the verses it was asked about (appended, never replacing). */
export function useAddAnswerToNote() {
  return useCallback((answer: Pick<AiAnswer, "question" | "answer" | "reference" | "rangeId">): NoteResult => {
    if (!answer.rangeId) return "no-verse";
    const { verseNotes, saveVerseNote } = useAppStore.getState();
    const existing = verseNotes[answer.rangeId];
    const { text, added } = noteWithAnswer(existing?.text ?? "", answer);
    if (!added) return "already";
    saveVerseNote(answer.rangeId, existing?.text ? existing.reference : answer.reference ?? "", text);
    return "added";
  }, []);
}

/** Opens the verses an answer was about in the Reader (or the chapter, for a chapter question). */
export function useOpenAnswerPassage() {
  const router = useRouter();
  return useCallback(
    (answer: Pick<AiAnswer, "rangeId">, withNote = false) => {
      const range = answer.rangeId ? parseVerseRangeId(answer.rangeId) : null;
      if (!range) return;
      router.push({
        pathname: "/read/[book]/[chapter]",
        params: {
          book: range.book,
          chapter: String(range.chapter),
          v: String(range.start),
          ...(range.end !== range.start ? { e: String(range.end) } : {}),
          ...(withNote ? { study: "note" } : {}),
        },
      });
    },
    [router]
  );
}

export const NOTE_RESULT_TEXT: Record<NoteResult, (reference: string) => string> = {
  added: (ref) => `Added to your note on ${ref}`,
  already: (ref) => `Already in your note on ${ref}`,
  "no-verse": () => "This answer isn't tied to a verse",
};
