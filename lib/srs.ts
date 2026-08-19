export type Grade = "again" | "hard" | "good" | "easy";
export type Difficulty = "easy" | "medium" | "hard";

const GRADE_QUALITY: Record<Grade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

export interface SrsState {
  interval: number;
  easeFactor: number;
  repetitions: number;
}

export function nextSrsState(state: SrsState, grade: Grade): SrsState {
  const quality = GRADE_QUALITY[grade];
  let { interval, repetitions } = state;
  let easeFactor = state.easeFactor;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  return { interval, easeFactor, repetitions };
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isDue(dueDate: string, today: Date = new Date()): boolean {
  return dueDate <= toISODate(today);
}

export function daysUntilDue(dueDate: string, today: Date = new Date()): number {
  const due = new Date(`${dueDate}T00:00:00`);
  const start = new Date(`${toISODate(today)}T00:00:00`);
  return Math.round((due.getTime() - start.getTime()) / 86400000);
}
