import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AI_DAILY_QUESTION_LIMIT } from "../lib/ai-config";
import { DEFAULT_TRANSLATION, TranslationId } from "../lib/bible-types";
import { localDateString } from "../lib/date";
import {
  DAILY_ROUTINE_TOKEN_CAP,
  DAILY_SESSION_TOKENS,
  ONBOARDING_BONUS,
  PERFECT_RECALL_BONUS,
  STREAK_FREEZE_COST,
  STREAK_MILESTONES,
  StreakKind,
  updateStreakForToday,
} from "../lib/rewards";
import { addDays, Difficulty, Grade, nextSrsState, toISODate } from "../lib/srs";
import storage from "../lib/storage";

export interface MemoryCard {
  id: string;
  verseReference: string;
  verseText: string;
  translation: string;
  dateAdded: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  dueDate: string;
  lastReviewed: string | null;
}

export type StudyMode = "blanks" | "type";
export type TypeSubMode = "firstLetter" | "freeType";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  verseReference?: string;
  createdAt: string;
}

export type NewMemoryCard = Pick<
  MemoryCard,
  "id" | "verseReference" | "verseText" | "translation"
>;

export type OnboardingBonusKey = "firstRead" | "firstCard" | "firstAiQuestion";

/** A personal study note on a verse or range. Empty text marks a deleted note, so a sync doesn't bring it back. */
export interface VerseNote {
  text: string;
  /** The reference as shown when the note was written, e.g. "John 3:16-17". */
  reference: string;
  updatedAt: number;
}

/** The passage someone last opened the study panel on; Home picks their study back up here. */
export interface StudyLocation {
  book: string;
  chapter: number;
  start: number;
  end: number;
}

/** Progress through one guided study: which days are done, and the local date each was marked. */
export interface PlanProgress {
  startedOn: string;
  done: Record<number, string>;
  updatedAt: number;
}

/**
 * An answer to a guided study's reflection question. Empty text marks a deleted answer.
 * Answers are private today; visibility is stored per answer so sharing can be added later.
 */
export interface PlanAnswer {
  text: string;
  updatedAt: number;
  visibility: "private";
}

export interface ReadingLocation {
  book: string;
  chapter: number;
}

interface AppState {
  tokenBalance: number;
  memoryDeck: MemoryCard[];
  studyMode: StudyMode;
  typeSubMode: TypeSubMode;
  difficulty: Difficulty;
  chatMessages: ChatMessage[];
  displayName: string;

  // Reading
  translation: TranslationId;
  lastRead: ReadingLocation | null;

  // Study notes, keyed by verse range id ("john-3-16-17").
  verseNotes: Record<string, VerseNote>;
  lastStudy: StudyLocation | null;

  // Guided studies (data/study/plans.ts): the plan Home follows, and progress per plan.
  activePlanId: string | null;
  planProgress: Record<string, PlanProgress>;
  /** Keyed "planId/day/question" (day and question from 1), see lib/plans.ts. */
  planAnswers: Record<string, PlanAnswer>;

  // Read streak
  currentReadStreak: number;
  longestReadStreak: number;
  lastReadDate: string | null;
  readStreakFreezesAvailable: number;

  // Memory streak
  currentMemoryStreak: number;
  longestMemoryStreak: number;
  lastMemoryCompletionDate: string | null;
  memoryStreakFreezesAvailable: number;

  // Earning caps / anti-gaming
  tokensEarnedToday: number;
  tokensEarnedTodayDate: string | null;
  perfectRecallBonusDate: string | null;
  milestonesAchieved: string[];
  onboardingBonusesClaimed: OnboardingBonusKey[];

  // AI usage: a free daily cap on live questions (stored on this device).
  aiFreeQuestionsAskedToday: number;
  aiFreeQuestionsAskedTodayDate: string | null;

  // Account sync (see lib/sync.ts). Cards removed on any device, so a sync doesn't bring them back.
  deletedCardIds: string[];
  /** The account this device last synced with; null while browsing as a guest. */
  syncedUserId: string | null;
  /** When synced data last changed on this device (ms). */
  syncUpdatedAt: number;

  setTokenBalance: (amount: number) => void;
  addTokens: (amount: number) => void;
  spendTokens: (amount: number) => boolean;
  addToMemoryDeck: (card: NewMemoryCard) => void;
  removeFromMemoryDeck: (id: string) => void;
  reviewCard: (id: string, grade: Grade) => void;
  setStudyMode: (mode: StudyMode) => void;
  setTypeSubMode: (mode: TypeSubMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  setDisplayName: (name: string) => void;
  setTranslation: (translation: TranslationId) => void;
  setLastRead: (location: ReadingLocation) => void;
  /** Saves (or, with empty text, deletes) the note on a verse range. */
  saveVerseNote: (id: string, reference: string, text: string) => void;
  setLastStudy: (location: StudyLocation) => void;
  /** Makes a plan the active one, starting it fresh if it's new or already finished. */
  startPlan: (id: string, totalDays: number) => void;
  /** Starts a plan over from day 1. */
  restartPlan: (id: string) => void;
  /** Marks a day done (or not). Finishing the last day ends the plan. */
  setPlanDayDone: (id: string, day: number, done: boolean, totalDays: number) => void;
  /** Stops following the active plan on Home; its progress is kept. */
  leavePlan: () => void;
  /** Saves (or, with empty text, deletes) an answer to a reflection question. */
  savePlanAnswer: (id: string, text: string) => void;

  logReadEngagement: () => void;
  logMemoryEngagement: () => void;
  awardPerfectRecallBonus: () => void;
  purchaseStreakFreeze: (kind: StreakKind) => boolean;
  claimOnboardingBonus: (key: OnboardingBonusKey) => void;
  aiQuestionsRemainingToday: () => number;
  recordAiQuestionAsked: () => void;
  /** The server's count of today's free questions for this account. */
  setAiQuestionsUsedToday: (used: number) => void;
  /** Back to a fresh guest profile on this device (after signing out or deleting the account). */
  resetLocalData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      const earnRoutineTokens = (amount: number) => {
        const today = localDateString();
        const state = get();
        const earnedToday = state.tokensEarnedTodayDate === today ? state.tokensEarnedToday : 0;
        const room = Math.max(0, DAILY_ROUTINE_TOKEN_CAP - earnedToday);
        const grant = Math.min(amount, room);
        set({
          tokenBalance: state.tokenBalance + grant,
          tokensEarnedToday: earnedToday + grant,
          tokensEarnedTodayDate: today,
        });
      };

      const checkMilestone = (kind: StreakKind, streakValue: number) => {
        const bonus = STREAK_MILESTONES[streakValue];
        if (!bonus) return;
        const key = `${kind}-${streakValue}`;
        const state = get();
        if (state.milestonesAchieved.includes(key)) return;
        set({
          tokenBalance: state.tokenBalance + bonus,
          milestonesAchieved: [...state.milestonesAchieved, key],
        });
      };

      return {
      tokenBalance: 100, // mock starting balance
      memoryDeck: [],
      studyMode: "blanks",
      typeSubMode: "firstLetter",
      difficulty: "medium",
      chatMessages: [],
      displayName: "You",

      translation: DEFAULT_TRANSLATION,
      lastRead: null,

      currentReadStreak: 0,
      longestReadStreak: 0,
      lastReadDate: null,
      readStreakFreezesAvailable: 0,

      currentMemoryStreak: 0,
      longestMemoryStreak: 0,
      lastMemoryCompletionDate: null,
      memoryStreakFreezesAvailable: 0,

      tokensEarnedToday: 0,
      tokensEarnedTodayDate: null,
      perfectRecallBonusDate: null,
      milestonesAchieved: [],
      onboardingBonusesClaimed: [],

      aiFreeQuestionsAskedToday: 0,
      aiFreeQuestionsAskedTodayDate: null,

      verseNotes: {},
      lastStudy: null,

      activePlanId: null,
      planProgress: {},
      planAnswers: {},

      deletedCardIds: [],
      syncedUserId: null,
      syncUpdatedAt: 0,

      setTokenBalance: (amount) => set({ tokenBalance: amount }),

      addTokens: (amount) =>
        set((state) => ({ tokenBalance: state.tokenBalance + amount })),

      spendTokens: (amount) => {
        const current = get().tokenBalance;
        if (current < amount) return false;
        set({ tokenBalance: current - amount });
        return true;
      },

      addToMemoryDeck: (card) => {
        set((state) => ({
          deletedCardIds: state.deletedCardIds.filter((d) => d !== card.id),
          memoryDeck: [
            ...state.memoryDeck,
            {
              ...card,
              dateAdded: toISODate(new Date()),
              interval: 0,
              easeFactor: 2.5,
              repetitions: 0,
              dueDate: toISODate(new Date()),
              lastReviewed: null,
            },
          ],
        }));
        get().claimOnboardingBonus("firstCard");
      },

      removeFromMemoryDeck: (id) =>
        set((state) => ({
          memoryDeck: state.memoryDeck.filter((c) => c.id !== id),
          deletedCardIds: [...state.deletedCardIds.filter((d) => d !== id), id].slice(-500),
        })),

      reviewCard: (id, grade) => {
        set((state) => ({
          memoryDeck: state.memoryDeck.map((card) => {
            if (card.id !== id) return card;
            const next = nextSrsState(card, grade);
            const now = new Date();
            return {
              ...card,
              ...next,
              lastReviewed: toISODate(now),
              dueDate: toISODate(addDays(now, next.interval)),
            };
          }),
        }));
        get().logMemoryEngagement();
      },

      setStudyMode: (mode) => set({ studyMode: mode }),

      setTypeSubMode: (mode) => set({ typeSubMode: mode }),

      setDifficulty: (difficulty) => set({ difficulty }),

      addChatMessage: (message) =>
        set((state) => ({ chatMessages: [...state.chatMessages, message] })),

      clearChat: () => set({ chatMessages: [] }),

      setDisplayName: (name) => set({ displayName: name }),

      setTranslation: (translation) => set({ translation }),

      setLastRead: (location) => set({ lastRead: location }),

      setLastStudy: (location) => set({ lastStudy: location }),

      startPlan: (id, totalDays) =>
        set((state) => {
          const existing = state.planProgress[id];
          const finished = !!existing && Object.keys(existing.done).length >= totalDays;
          if (existing && !finished) return { activePlanId: id };
          return {
            activePlanId: id,
            planProgress: {
              ...state.planProgress,
              [id]: { startedOn: localDateString(), done: {}, updatedAt: Date.now() },
            },
          };
        }),

      restartPlan: (id) =>
        set((state) => ({
          activePlanId: id,
          planProgress: {
            ...state.planProgress,
            [id]: { startedOn: localDateString(), done: {}, updatedAt: Date.now() },
          },
        })),

      setPlanDayDone: (id, day, done, totalDays) =>
        set((state) => {
          const existing = state.planProgress[id] ?? { startedOn: localDateString(), done: {}, updatedAt: 0 };
          const nextDone = { ...existing.done };
          if (done) nextDone[day] = localDateString();
          else delete nextDone[day];
          const finished = Object.keys(nextDone).length >= totalDays;
          return {
            activePlanId: finished && state.activePlanId === id ? null : state.activePlanId,
            planProgress: { ...state.planProgress, [id]: { ...existing, done: nextDone, updatedAt: Date.now() } },
          };
        }),

      leavePlan: () => set({ activePlanId: null }),

      savePlanAnswer: (id, text) =>
        set((state) => {
          const trimmed = text.trim();
          if ((state.planAnswers[id]?.text ?? "") === trimmed) return state;
          return {
            planAnswers: {
              ...state.planAnswers,
              [id]: { text: trimmed, updatedAt: Date.now(), visibility: "private" },
            },
          };
        }),

      saveVerseNote: (id, reference, text) =>
        set((state) => {
          const trimmed = text.trim();
          const existing = state.verseNotes[id];
          if ((existing?.text ?? "") === trimmed) return state;
          return {
            verseNotes: {
              ...state.verseNotes,
              [id]: { text: trimmed, reference, updatedAt: Date.now() },
            },
          };
        }),

      logReadEngagement: () => {
        const today = localDateString();
        const state = get();
        if (state.lastReadDate === today) return;
        const result = updateStreakForToday(
          {
            current: state.currentReadStreak,
            longest: state.longestReadStreak,
            lastDate: state.lastReadDate,
            freezesAvailable: state.readStreakFreezesAvailable,
          },
          today
        );
        const isFirstEver = state.lastReadDate === null;
        set({
          currentReadStreak: result.current,
          longestReadStreak: result.longest,
          lastReadDate: result.lastDate,
          readStreakFreezesAvailable: result.freezesAvailable,
        });
        earnRoutineTokens(DAILY_SESSION_TOKENS);
        checkMilestone("read", result.current);
        if (isFirstEver) get().claimOnboardingBonus("firstRead");
      },

      logMemoryEngagement: () => {
        const today = localDateString();
        const state = get();
        if (state.lastMemoryCompletionDate === today) return;
        const result = updateStreakForToday(
          {
            current: state.currentMemoryStreak,
            longest: state.longestMemoryStreak,
            lastDate: state.lastMemoryCompletionDate,
            freezesAvailable: state.memoryStreakFreezesAvailable,
          },
          today
        );
        set({
          currentMemoryStreak: result.current,
          longestMemoryStreak: result.longest,
          lastMemoryCompletionDate: result.lastDate,
          memoryStreakFreezesAvailable: result.freezesAvailable,
        });
        earnRoutineTokens(DAILY_SESSION_TOKENS);
        checkMilestone("memory", result.current);
      },

      awardPerfectRecallBonus: () => {
        const today = localDateString();
        if (get().perfectRecallBonusDate === today) return;
        set({ perfectRecallBonusDate: today });
        earnRoutineTokens(PERFECT_RECALL_BONUS);
      },

      purchaseStreakFreeze: (kind) => {
        const ok = get().spendTokens(STREAK_FREEZE_COST);
        if (!ok) return false;
        if (kind === "read") {
          set((state) => ({
            readStreakFreezesAvailable: state.readStreakFreezesAvailable + 1,
          }));
        } else {
          set((state) => ({
            memoryStreakFreezesAvailable: state.memoryStreakFreezesAvailable + 1,
          }));
        }
        return true;
      },

      claimOnboardingBonus: (key) => {
        const state = get();
        if (state.onboardingBonusesClaimed.includes(key)) return;
        set({
          tokenBalance: state.tokenBalance + ONBOARDING_BONUS,
          onboardingBonusesClaimed: [...state.onboardingBonusesClaimed, key],
        });
      },

      aiQuestionsRemainingToday: () => {
        const state = get();
        const askedToday =
          state.aiFreeQuestionsAskedTodayDate === localDateString()
            ? state.aiFreeQuestionsAskedToday
            : 0;
        return Math.max(0, AI_DAILY_QUESTION_LIMIT - askedToday);
      },

      recordAiQuestionAsked: () => {
        const today = localDateString();
        const state = get();
        const askedToday =
          state.aiFreeQuestionsAskedTodayDate === today ? state.aiFreeQuestionsAskedToday : 0;
        set({
          aiFreeQuestionsAskedToday: askedToday + 1,
          aiFreeQuestionsAskedTodayDate: today,
        });
      },

      setAiQuestionsUsedToday: (used) =>
        set({ aiFreeQuestionsAskedToday: used, aiFreeQuestionsAskedTodayDate: localDateString() }),

      resetLocalData: () => {
        const fresh = useAppStore.getInitialState();
        const data: Partial<AppState> = {};
        for (const [key, value] of Object.entries(fresh)) {
          if (typeof value !== "function") (data as Record<string, unknown>)[key] = value;
        }
        set(data);
      },
      };
    },
    {
      name: "biblestudyapp-storage",
      storage: createJSONStorage(() => storage),
      version: 1,
      migrate: (persisted, version) => {
        const state = { ...(persisted as Record<string, unknown>) };
        if (version < 1) {
          // v0 only had John in the WEB, and charged earned tokens for extra AI questions.
          state.translation = "WEB";
          state.lastRead = null;
          delete state.aiEarnedTokenQuestionsThisMonth;
          delete state.aiEarnedTokenQuestionsMonthDate;
          delete state.aiFreeDailyAllowance;
          delete state.aiEarnedTokenMonthlyCap;
        }
        return state as unknown as AppState;
      },
    }
  )
);
