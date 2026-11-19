/**
 * Keeps this device's progress and the signed-in account in step.
 *
 * Each account has one row in Supabase (`user_data`) holding a small JSON copy of what the
 * app saves on the device. That keeps it to one read when the app opens and one write a few
 * seconds after something changes, which is well inside Supabase's free plan.
 *
 * Merging two copies (this device and the account):
 * - Memory cards are combined by id; for a card on both, the more recently reviewed one wins.
 *   Removed cards are remembered so a sync never brings them back.
 * - Each streak comes from the copy that logged a day most recently; best streaks take the higher.
 * - Badges and claimed bonuses are combined.
 * - Settings, name and tokens come from whichever copy changed last. The first time a device
 *   joins an account that already has data, the account's copy wins, so a guest's starter
 *   tokens never replace a real balance.
 */
import type { MemoryCard, useAppStore } from "../store/useAppStore";

type Store = ReturnType<typeof useAppStore.getState>;

const SCALAR_KEYS = [
  "tokenBalance",
  "studyMode",
  "typeSubMode",
  "difficulty",
  "displayName",
  "translation",
  "lastRead",
  "tokensEarnedToday",
  "tokensEarnedTodayDate",
  "perfectRecallBonusDate",
] as const;

export const SYNCED_KEYS = [
  ...SCALAR_KEYS,
  "memoryDeck",
  "deletedCardIds",
  "currentReadStreak",
  "longestReadStreak",
  "lastReadDate",
  "readStreakFreezesAvailable",
  "currentMemoryStreak",
  "longestMemoryStreak",
  "lastMemoryCompletionDate",
  "memoryStreakFreezesAvailable",
  "milestonesAchieved",
  "onboardingBonusesClaimed",
  "aiFreeQuestionsAskedToday",
  "aiFreeQuestionsAskedTodayDate",
] as const;

type SyncedKey = (typeof SYNCED_KEYS)[number];
export type SyncData = Pick<Store, SyncedKey> & { updatedAt: number };

export function snapshot(state: Store): SyncData {
  const data = { updatedAt: state.syncUpdatedAt } as SyncData;
  for (const key of SYNCED_KEYS) (data as Record<string, unknown>)[key] = state[key];
  return data;
}

const union = <T,>(a: T[] = [], b: T[] = []) => Array.from(new Set([...a, ...b]));

function pickCard(a: MemoryCard, b: MemoryCard): MemoryCard {
  const ra = a.lastReviewed ?? "";
  const rb = b.lastReviewed ?? "";
  if (ra !== rb) return ra > rb ? a : b;
  return b.repetitions > a.repetitions ? b : a;
}

/** Combines this device's copy with the account's. `accountFirst`: the account's settings win. */
export function mergeSyncData(local: SyncData, remote: SyncData, accountFirst: boolean): SyncData {
  const newer = accountFirst || remote.updatedAt >= local.updatedAt ? remote : local;
  const merged = { ...newer } as SyncData;
  for (const key of SCALAR_KEYS) (merged as Record<string, unknown>)[key] = newer[key];

  const deleted = union(local.deletedCardIds, remote.deletedCardIds).slice(-500);
  const cards = new Map<string, MemoryCard>();
  for (const card of [...(remote.memoryDeck ?? []), ...(local.memoryDeck ?? [])]) {
    if (deleted.includes(card.id)) continue;
    const existing = cards.get(card.id);
    cards.set(card.id, existing ? pickCard(existing, card) : card);
  }
  merged.memoryDeck = [...cards.values()].sort((x, y) => x.dateAdded.localeCompare(y.dateAdded));
  merged.deletedCardIds = deleted;

  const read = streakWinner(local, remote, "lastReadDate", "currentReadStreak");
  merged.currentReadStreak = read.currentReadStreak;
  merged.lastReadDate = read.lastReadDate;
  merged.readStreakFreezesAvailable = read.readStreakFreezesAvailable;
  merged.longestReadStreak = Math.max(local.longestReadStreak ?? 0, remote.longestReadStreak ?? 0);

  const memory = streakWinner(local, remote, "lastMemoryCompletionDate", "currentMemoryStreak");
  merged.currentMemoryStreak = memory.currentMemoryStreak;
  merged.lastMemoryCompletionDate = memory.lastMemoryCompletionDate;
  merged.memoryStreakFreezesAvailable = memory.memoryStreakFreezesAvailable;
  merged.longestMemoryStreak = Math.max(local.longestMemoryStreak ?? 0, remote.longestMemoryStreak ?? 0);

  merged.milestonesAchieved = union(local.milestonesAchieved, remote.milestonesAchieved);
  merged.onboardingBonusesClaimed = union(local.onboardingBonusesClaimed, remote.onboardingBonusesClaimed);

  const ai = streakWinner(local, remote, "aiFreeQuestionsAskedTodayDate", "aiFreeQuestionsAskedToday");
  merged.aiFreeQuestionsAskedTodayDate = ai.aiFreeQuestionsAskedTodayDate;
  merged.aiFreeQuestionsAskedToday = ai.aiFreeQuestionsAskedToday;

  merged.updatedAt = Math.max(local.updatedAt, remote.updatedAt);
  return merged;
}

/** The copy with the later date; on the same date, the higher count. */
function streakWinner(a: SyncData, b: SyncData, dateKey: SyncedKey, countKey: SyncedKey): SyncData {
  const da = (a[dateKey] as string | null) ?? "";
  const db = (b[dateKey] as string | null) ?? "";
  if (da !== db) return da > db ? a : b;
  return ((b[countKey] as number) ?? 0) > ((a[countKey] as number) ?? 0) ? b : a;
}
