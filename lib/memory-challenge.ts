/**
 * Memorizing together: a challenge is a named set of verses that a family or small group learns
 * at the same time. It travels as a code (or a link holding the code) with references only: no
 * verse text, no names of people, nothing from anyone's deck. Each person who opens the code
 * adds those verses to their own deck, in their own translation, tagged with the challenge.
 *
 * There is no shared server record. Everyone's progress stays on their own cards and syncs with
 * their own account, so the app can show "your progress on this challenge", never anyone else's.
 */
import { parseCardId, isSecure, isDue, isNew, type MemoryCard } from "./memory";

export interface MemoryChallenge {
  /** "challenge-" + a short random key. The same on every device that joined it; also the tag on its cards. */
  id: string;
  name: string;
  /** Card ids (verse ranges), e.g. "john-14-27-27". */
  verses: string[];
  /** Started here, or joined from someone's code. */
  role: "started" | "joined";
  createdAt: number;
  updatedAt: number;
  /** Left on some device: kept so sync doesn't bring it back. */
  left?: boolean;
}

export interface ChallengeInvite {
  id: string;
  name: string;
  verses: string[];
}

export const CHALLENGE_PREFIX = "challenge-";
export const CHALLENGE_MAX_VERSES = 30;
export const CHALLENGE_NAME_MAX = 60;
/** Codes start with this, so a pasted code is recognizable (and versioned). */
const CODE_TAG = "OM1";

export const isChallengeId = (id: string) => /^challenge-[a-z0-9]{6,12}$/.test(id);

export function newChallengeId(random: () => number = Math.random): string {
  let key = "";
  for (let i = 0; i < 8; i++) key += "abcdefghjkmnpqrstuvwxyz23456789"[Math.floor(random() * 31)];
  return CHALLENGE_PREFIX + key;
}

/** A name safe to show: one line, no control characters, not too long. */
export function cleanChallengeName(name: string): string {
  return name
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, CHALLENGE_NAME_MAX)
    .trim();
}

// ---------------------------------------------------------------------------
// The code: "OM1" + base64url of a small JSON object

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function utf8Bytes(text: string): number[] {
  const out: number[] = [];
  for (const ch of text) {
    let c = ch.codePointAt(0)!;
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
    else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    else {
      c = Math.min(c, 0x10ffff);
      out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
  }
  return out;
}

function utf8Text(bytes: number[]): string | null {
  let out = "";
  for (let i = 0; i < bytes.length; ) {
    const b = bytes[i];
    const extra = b < 0x80 ? 0 : b >> 5 === 6 ? 1 : b >> 4 === 14 ? 2 : b >> 3 === 30 ? 3 : -1;
    if (extra < 0) return null;
    let c = extra === 0 ? b : b & (0x3f >> extra);
    for (let k = 1; k <= extra; k++) {
      const next = bytes[i + k];
      if (next === undefined || next >> 6 !== 2) return null;
      c = (c << 6) | (next & 63);
    }
    out += String.fromCodePoint(c);
    i += extra + 1;
  }
  return out;
}

function toBase64Url(bytes: number[]): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i + 1] ?? 0) << 8) | (bytes[i + 2] ?? 0);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
    if (i + 1 < bytes.length) out += B64[(n >> 6) & 63];
    if (i + 2 < bytes.length) out += B64[n & 63];
  }
  return out;
}

function fromBase64Url(text: string): number[] | null {
  const bytes: number[] = [];
  let bits = 0;
  let value = 0;
  for (const ch of text) {
    const v = B64.indexOf(ch);
    if (v < 0) return null;
    value = (value << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >> bits) & 0xff);
    }
  }
  return bytes;
}

export function encodeChallenge(invite: ChallengeInvite): string {
  const body = JSON.stringify({ i: invite.id.slice(CHALLENGE_PREFIX.length), n: invite.name, v: invite.verses });
  return CODE_TAG + toBase64Url(utf8Bytes(body));
}

/**
 * Reads a code, or a link with the code in it. Returns null for anything that isn't a valid
 * challenge. `isBook` checks book ids against the app's Bible.
 */
export function decodeChallenge(input: string, isBook: (id: string) => boolean = () => true): ChallengeInvite | null {
  const raw = input.trim();
  const fromLink = raw.match(/[?&]c=([A-Za-z0-9_-]+)/);
  const code = (fromLink ? fromLink[1] : raw).replace(/\s+/g, "");
  if (!code.toUpperCase().startsWith(CODE_TAG) || code.length > 4000) return null;
  const bytes = fromBase64Url(code.slice(CODE_TAG.length));
  const text = bytes && utf8Text(bytes);
  if (!text) return null;
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const { i, n, v } = data as Record<string, unknown>;
  const id = CHALLENGE_PREFIX + String(i ?? "");
  if (typeof i !== "string" || !isChallengeId(id)) return null;
  const name = typeof n === "string" ? cleanChallengeName(n) : "";
  if (!Array.isArray(v)) return null;
  const verses: string[] = [];
  for (const item of v) {
    if (typeof item !== "string") return null;
    const place = parseCardId(item);
    if (!place || !isBook(place.book) || place.end < place.start || place.chapter > 200 || place.end > 200) return null;
    if (!verses.includes(item)) verses.push(item);
  }
  if (verses.length === 0 || verses.length > CHALLENGE_MAX_VERSES) return null;
  return { id, name: name || "Memorizing together", verses };
}

// ---------------------------------------------------------------------------
// Progress and sync

export interface ChallengeProgress {
  total: number;
  inDeck: number;
  notStarted: number;
  learning: number;
  secure: number;
  due: number;
}

/** This person's own progress on a challenge's verses. */
export function challengeProgress(challenge: Pick<MemoryChallenge, "verses">, deck: MemoryCard[], now: Date = new Date()): ChallengeProgress {
  const cards = challenge.verses.map((id) => deck.find((c) => c.id === id)).filter((c): c is MemoryCard => !!c);
  return {
    total: challenge.verses.length,
    inDeck: cards.length,
    notStarted: cards.filter((c) => isNew(c)).length,
    learning: cards.filter((c) => !isNew(c) && !isSecure(c)).length,
    secure: cards.filter((c) => isSecure(c)).length,
    due: cards.filter((c) => !isNew(c) && isDue(c, now)).length,
  };
}

/** Joins two copies (this device and the account): the more recently changed copy of each wins. */
export function mergeChallenges(
  a: Record<string, MemoryChallenge> = {},
  b: Record<string, MemoryChallenge> = {}
): Record<string, MemoryChallenge> {
  const out = { ...b };
  for (const [id, challenge] of Object.entries(a)) {
    if (!out[id] || challenge.updatedAt > out[id].updatedAt) out[id] = challenge;
  }
  return out;
}

/** The record kept when this person joins from an invite (or re-joins after leaving). */
export function joinedChallenge(invite: ChallengeInvite, existing: MemoryChallenge | undefined, now = Date.now()): MemoryChallenge {
  return {
    id: invite.id,
    name: existing && !existing.left ? existing.name : invite.name,
    verses: Array.from(new Set([...(existing && !existing.left ? existing.verses : []), ...invite.verses])),
    role: existing?.role ?? "joined",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}
