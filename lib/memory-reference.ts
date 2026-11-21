/**
 * Pure helpers for the newer Memory exercises: the reference quiz (close wrong answers to pick
 * from) and splitting a passage into pieces for read-aloud. No React here, so it's unit tested.
 */
import type { MemoryCard } from "./memory";

export interface ReferenceChoice {
  label: string;
  correct: boolean;
}

/** A small deterministic random source, so a card's choices don't jump around on re-render. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const REF_RE = /^(.*\S)\s+(\d+):(\d+)(?:-(\d+))?$/;

/** "Psalm 23:1-6" -> { name: "Psalm", chapter: 23, start: 1, end: 6 }. */
export function splitReference(reference: string): { name: string; chapter: number; start: number; end: number } | null {
  const m = REF_RE.exec(reference.trim());
  if (!m) return null;
  const start = Number(m[3]);
  return { name: m[1], chapter: Number(m[2]), start, end: m[4] ? Number(m[4]) : start };
}

const formatRef = (name: string, chapter: number, start: number, end: number) =>
  `${name} ${chapter}:${start}${end !== start ? `-${end}` : ""}`;

/**
 * Four choices for "where is this found?": the right reference and three close ones. Wrong
 * answers favor near misses (the next verse, the same verse a chapter over) and other verses
 * the person is memorizing, since those are the ones people actually mix up. With the book's
 * shape (`versesIn(chapter)`, `chapters`), every near miss is a real reference.
 */
export function referenceChoices(
  card: Pick<MemoryCard, "id" | "verseReference">,
  deck: Pick<MemoryCard, "id" | "verseReference">[],
  shape: { versesIn?: (chapter: number) => number | undefined; chapters?: number } = {}
): ReferenceChoice[] {
  const rand = seeded(card.id);
  const correct = card.verseReference;
  const taken = new Set([correct]);
  const ref = splitReference(correct);

  const near: string[] = [];
  if (ref) {
    const span = ref.end - ref.start;
    const fits = (chapter: number, start: number, end: number) => {
      if (chapter < 1 || start < 1) return false;
      if (shape.chapters !== undefined && chapter > shape.chapters) return false;
      const count = shape.versesIn?.(chapter);
      // Without the book's shape, only allow moves that can't run past the chapter's end.
      if (count === undefined) return chapter === ref.chapter && end <= ref.end;
      return end <= count;
    };
    const verseMoves = shuffle([1, -1, 2, -2, span + 1, -(span + 1)], rand);
    const chapterMoves = shuffle([1, -1], rand);
    const verseNear = verseMoves
      .filter((d) => fits(ref.chapter, ref.start + d, ref.end + d))
      .map((d) => formatRef(ref.name, ref.chapter, ref.start + d, ref.end + d));
    const chapterNear = chapterMoves
      .filter((d) => fits(ref.chapter + d, ref.start, ref.end))
      .map((d) => formatRef(ref.name, ref.chapter + d, ref.start, ref.end));
    // Alternate so there's usually one of each kind.
    for (let i = 0; i < Math.max(verseNear.length, chapterNear.length); i++) {
      if (chapterNear[i]) near.push(chapterNear[i]);
      if (verseNear[i]) near.push(verseNear[i]);
    }
  }
  const others = shuffle(
    deck.filter((c) => c.id !== card.id).map((c) => c.verseReference),
    rand
  );

  const foils: string[] = [];
  const take = (label: string | undefined) => {
    if (label && !taken.has(label) && foils.length < 3) {
      taken.add(label);
      foils.push(label);
    }
  };
  take(others[0]);
  near.forEach(take);
  others.slice(1).forEach(take);

  return shuffle(
    [{ label: correct, correct: true }, ...foils.map((label) => ({ label, correct: false }))],
    rand
  );
}

/** What the quiz shows: the whole text, or the start of a long passage. */
export function quizPrompt(text: string, maxWords = 28): { text: string; cut: boolean } {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return { text: text.trim(), cut: false };
  // Prefer to stop at the end of a sentence or clause near the limit.
  const head = words.slice(0, maxWords);
  for (let i = head.length - 1; i >= Math.floor(maxWords / 2); i--) {
    if (/[.;:!?]["'”’)]*$/.test(head[i])) return { text: head.slice(0, i + 1).join(" "), cut: true };
  }
  return { text: head.join(" "), cut: true };
}

/**
 * A passage cut into read-aloud pieces at sentence ends (kept under ~220 characters), so long
 * passages play reliably and Pause/Play can pick up at the piece it stopped in.
 */
export function speechChunks(text: string, max = 220): string[] {
  const sentences = text
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?;]+[.!?;]+["'”’)]*|[^.!?;]+$/g);
  if (!sentences) return [];
  const out: string[] = [];
  for (const raw of sentences) {
    const s = raw.trim();
    if (!s) continue;
    const last = out[out.length - 1];
    if (last && last.length + s.length + 1 <= max && (last.length < 60 || s.length < 40)) out[out.length - 1] = `${last} ${s}`;
    else if (s.length <= max) out.push(s);
    else {
      // A very long sentence: break at commas, then at spaces.
      let rest = s;
      while (rest.length > max) {
        const cut = Math.max(rest.lastIndexOf(", ", max), rest.lastIndexOf(" ", max));
        const at = cut > max / 3 ? cut + 1 : max;
        out.push(rest.slice(0, at).trim());
        rest = rest.slice(at).trim();
      }
      if (rest) out.push(rest);
    }
  }
  return out;
}
