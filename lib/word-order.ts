/**
 * Word order: a verse cut into tiles (single words for a short verse, short phrases for a
 * longer one) and shuffled, for the person to put back in order.
 */
import { seededShuffle } from "./blank-words";
import { normalize } from "./verse-diff";

export interface Tile {
  /** Its place in the verse, from 0. */
  id: number;
  text: string;
}

/** Most tiles a verse is cut into, so a long passage stays a puzzle and not a chore. */
export const MAX_TILES = 12;
/** A verse this short is ordered word by word. */
const WORD_BY_WORD = 10;

const endsClause = (word: string) => /[,;:.!?”’)]$/.test(word);

/** The verse cut into tiles, in the right order. Phrases break after punctuation where they can. */
export function cutTiles(text: string): Tile[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= WORD_BY_WORD) return words.map((text, id) => ({ id, text }));
  const size = Math.ceil(words.length / MAX_TILES);
  const groups: string[][] = [];
  let group: string[] = [];
  words.forEach((word, i) => {
    group.push(word);
    const left = words.length - i - 1;
    const full = group.length >= size;
    // A clause ends a little early, unless that would leave too much for the tiles left.
    const clause = endsClause(word) && group.length >= Math.max(1, size - 1);
    if (left > 0 && (full || clause) && groups.length < MAX_TILES - 1) {
      groups.push(group);
      group = [];
    }
  });
  if (group.length) groups.push(group);
  return groups.map((g, id) => ({ id, text: g.join(" ") }));
}

/** The tiles in a scrambled order that's never the right one (when there's more than one tile). */
export function scrambleTiles(tiles: Tile[], seed: string): Tile[] {
  if (tiles.length < 2) return tiles;
  let out = seededShuffle(tiles, `${seed}-order`);
  if (isInOrder(out, tiles)) out = [...out.slice(1), out[0]];
  if (isInOrder(out, tiles)) out = [...tiles].reverse();
  return out;
}

const same = (a: Tile, b: Tile) => normalize(a.text) === normalize(b.text);

/** Whether `placed` reads the same as the verse. Two tiles with the same words are interchangeable. */
export function isInOrder(placed: Tile[], tiles: Tile[]): boolean {
  return placed.length === tiles.length && placed.every((t, i) => same(t, tiles[i]));
}

/** For each placed tile, whether it's in its right place. */
export function tileMarks(placed: Tile[], tiles: Tile[]): boolean[] {
  return placed.map((t, i) => !!tiles[i] && same(t, tiles[i]));
}

/** Share of tiles in their right place, 0..1. */
export function orderAccuracy(placed: Tile[], tiles: Tile[]): number {
  if (!tiles.length) return 1;
  return tileMarks(placed, tiles).filter(Boolean).length / tiles.length;
}
