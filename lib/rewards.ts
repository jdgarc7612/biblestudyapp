import { daysBetweenLocalDates } from "./date";

export type StreakKind = "read" | "memory";

export const DAILY_SESSION_TOKENS = 5;
export const PERFECT_RECALL_BONUS = 5;
export const ONBOARDING_BONUS = 10;
export const REFERRAL_BONUS = 25;
export const STREAK_FREEZE_COST = 25;
export const DAILY_ROUTINE_TOKEN_CAP = 20;

export const STREAK_MILESTONES: Record<number, number> = {
  7: 20,
  30: 50,
  100: 150,
};

export interface StreakFields {
  current: number;
  longest: number;
  lastDate: string | null;
  freezesAvailable: number;
}

export interface StreakUpdateResult extends StreakFields {
  isNewDay: boolean;
  freezeConsumed: boolean;
}

/**
 * A missed single day is forgiven if a freeze is available (freezes don't
 * cover multi-day gaps — that's a full reset, same as having no freeze).
 */
export function updateStreakForToday(fields: StreakFields, today: string): StreakUpdateResult {
  if (fields.lastDate === today) {
    return { ...fields, isNewDay: false, freezeConsumed: false };
  }

  let current: number;
  let freezesAvailable = fields.freezesAvailable;
  let freezeConsumed = false;

  if (fields.lastDate === null) {
    current = 1;
  } else {
    const gap = daysBetweenLocalDates(fields.lastDate, today);
    if (gap === 1) {
      current = fields.current + 1;
    } else if (gap === 2 && freezesAvailable > 0) {
      current = fields.current + 1;
      freezesAvailable -= 1;
      freezeConsumed = true;
    } else {
      current = 1;
    }
  }

  return {
    current,
    longest: Math.max(fields.longest, current),
    lastDate: today,
    freezesAvailable,
    isNewDay: true,
    freezeConsumed,
  };
}
