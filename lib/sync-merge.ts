/**
 * Keeps this device's progress and the signed-in account in step.
 *
 * Each account has one row in Supabase (`user_data`) holding a small JSON copy of what the
 * app saves on the device. That keeps it to one read when the app opens and one write a few
 * seconds after something changes, which is well inside Supabase's free plan.
 *
 * Merging two copies (this device and the account):
 * - Memory cards are combined by id; for a card on both, the more recently changed one wins
 *   (its schedule and review log travel together) and both copies' list and pack tags are kept,
 *   except tags for a deleted list. Older SM-2 cards from either
 *   side are brought up to the FSRS shape first. Removed cards are remembered so a sync never
 *   brings them back. The person's own memory lists are combined by id, newest edit wins.
 * - The date Review was last finished takes the later one; the reminder setting takes the newer edit.
 * - Each streak comes from the copy that logged a day most recently; best streaks take the higher.
 * - Study notes are combined by verse; for a note on both, the more recently edited one wins.
 * - Highlights and saved verses are combined by verse range the same way; removals are kept as
 *   tombstones so they win over an older copy.
 * - Guided study progress is combined by plan, and answers by question; the more recently changed copy wins.
 * - Study journal entries are combined by id, newest change wins; deleted ones stay as small marks.
 *   The date a study last earned the bonus Ask AI question takes the later one.
 * - Ask AI answers are combined by id, newest change wins, deletions kept as tombstones; then
 *   history is capped (all saved answers, the newest unsaved ones; see lib/ai-answers.ts).
 * - Badges and claimed bonuses are combined.
 * - Settings, name and tokens come from whichever copy changed last. The first time a device
 *   joins an account that already has data, the account's copy wins, so a guest's starter
 *   tokens never replace a real balance.
 */
import { mergeAnswers } from "./ai-answers";
import { migrateCard, mergeLists, pickNewerCard, type MemoryCard } from "./memory";
import { mergeChallenges } from "./memory-challenge";
import { mergeByUpdatedAt } from "./verse-marks";
import type { useAppStore } from "../store/useAppStore";

type Store = ReturnType<typeof useAppStore.getState>;

const SCALAR_KEYS = [
  "tokenBalance",
  "memoryMethod",
  "displayName",
  "translation",
  "lastRead",
  "lastStudy",
  "activePlanId",
  "tokensEarnedToday",
  "tokensEarnedTodayDate",
  "perfectRecallBonusDate",
] as const;

export const SYNCED_KEYS = [
  ...SCALAR_KEYS,
  "memoryDeck",
  "deletedCardIds",
  "memoryLists",
  "memoryChallenges",
  "memoryReviewDoneDate",
  "memoryReminder",
  "verseNotes",
  "verseHighlights",
  "savedVerses",
  "planProgress",
  "planAnswers",
  "planReflections",
  "studyEntries",
  "aiStudyBonusDate",
  "aiAnswers",
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


/** Combines this device's copy with the account's. `accountFirst`: the account's settings win. */
export function mergeSyncData(local: SyncData, remote: SyncData, accountFirst: boolean): SyncData {
  const newer = accountFirst || remote.updatedAt >= local.updatedAt ? remote : local;
  const merged = { ...newer } as SyncData;
  for (const key of SCALAR_KEYS) (merged as Record<string, unknown>)[key] = newer[key];
  merged.memoryMethod = newer.memoryMethod ?? local.memoryMethod ?? "smart";

  const deleted = union(local.deletedCardIds, remote.deletedCardIds).slice(-500);
  const cards = new Map<string, MemoryCard>();
  for (const raw of [...(remote.memoryDeck ?? []), ...(local.memoryDeck ?? [])]) {
    if (deleted.includes(raw.id)) continue;
    const card = migrateCard(raw);
    const existing = cards.get(card.id);
    cards.set(card.id, existing ? pickNewerCard(existing, card) : card);
  }
  merged.memoryDeck = [...cards.values()].sort((x, y) => x.dateAdded.localeCompare(y.dateAdded));
  merged.deletedCardIds = deleted;
  merged.memoryLists = mergeLists(local.memoryLists, remote.memoryLists);
  // Tags for a list deleted on either device don't come back with the other copy's tags.
  const gone = Object.entries(merged.memoryLists).filter(([, l]) => l.deleted).map(([id]) => id);
  if (gone.length) {
    merged.memoryDeck = merged.memoryDeck.map((c) =>
      c.collections.some((id) => gone.includes(id)) ? { ...c, collections: c.collections.filter((id) => !gone.includes(id)) } : c
    );
  }
  // Challenges: the newer copy of each wins; a challenge left on either device takes its tag along.
  merged.memoryChallenges = mergeChallenges(local.memoryChallenges, remote.memoryChallenges);
  const left = Object.entries(merged.memoryChallenges).filter(([, c]) => c.left).map(([id]) => id);
  if (left.length) {
    merged.memoryDeck = merged.memoryDeck.map((c) =>
      c.collections.some((id) => left.includes(id)) ? { ...c, collections: c.collections.filter((id) => !left.includes(id)) } : c
    );
  }
  const doneDates = [local.memoryReviewDoneDate, remote.memoryReviewDoneDate].filter((d): d is string => !!d).sort();
  merged.memoryReviewDoneDate = doneDates[doneDates.length - 1] ?? null;
  const reminders = [local.memoryReminder, remote.memoryReminder].filter((r) => r && typeof r.hour === "number");
  merged.memoryReminder =
    reminders.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))[0] ?? { enabled: false, hour: 8, minute: 0, updatedAt: 0 };

  const notes = { ...(remote.verseNotes ?? {}) };
  for (const [id, note] of Object.entries(local.verseNotes ?? {})) {
    if (!notes[id] || note.updatedAt > notes[id].updatedAt) notes[id] = note;
  }
  merged.verseNotes = notes;
  merged.verseHighlights = mergeByUpdatedAt(local.verseHighlights, remote.verseHighlights);
  merged.savedVerses = mergeByUpdatedAt(local.savedVerses, remote.savedVerses);

  const plans = { ...(remote.planProgress ?? {}) };
  for (const [id, progress] of Object.entries(local.planProgress ?? {})) {
    if (!plans[id] || progress.updatedAt > plans[id].updatedAt) plans[id] = progress;
  }
  merged.planProgress = plans;

  const answers = { ...(remote.planAnswers ?? {}) };
  for (const [id, answer] of Object.entries(local.planAnswers ?? {})) {
    if (!answers[id] || answer.updatedAt > answers[id].updatedAt) answers[id] = answer;
  }
  merged.planAnswers = answers;
  merged.planReflections = mergeByUpdatedAt(local.planReflections, remote.planReflections);
  merged.studyEntries = mergeByUpdatedAt(local.studyEntries, remote.studyEntries);
  const bonusDates = [local.aiStudyBonusDate, remote.aiStudyBonusDate].filter((d): d is string => !!d).sort();
  merged.aiStudyBonusDate = bonusDates[bonusDates.length - 1] ?? null;
  merged.aiAnswers = mergeAnswers(local.aiAnswers, remote.aiAnswers);

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
