import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { localDateString, localMonthString } from "../lib/date";
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

interface AppState {
  tokenBalance: number;
  memoryDeck: MemoryCard[];
  studyMode: StudyMode;
  typeSubMode: TypeSubMode;
  difficulty: Difficulty;
  chatMessages: ChatMessage[];
  displayName: string;

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

  // AI usage & cost control
  aiFreeQuestionsAskedToday: number;
  aiFreeQuestionsAskedTodayDate: string | null;
  aiEarnedTokenQuestionsThisMonth: number;
  aiEarnedTokenQuestionsMonthDate: string | null;
  aiFreeDailyAllowance: number;
  aiEarnedTokenMonthlyCap: number;

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

  logReadEngagement: () => void;
  logMemoryEngagement: () => void;
  awardPerfectRecallBonus: () => void;
  purchaseStreakFreeze: (kind: StreakKind) => boolean;
  claimOnboardingBonus: (key: OnboardingBonusKey) => void;
  canAskAiQuestion: () => { allowed: boolean; usingEarnedTokens: boolean };
  recordAiQuestionAsked: () => void;
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
      aiEarnedTokenQuestionsThisMonth: 0,
      aiEarnedTokenQuestionsMonthDate: null,
      aiFreeDailyAllowance: 3,
      aiEarnedTokenMonthlyCap: 10,

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

      canAskAiQuestion: () => {
        const today = localDateString();
        const month = localMonthString();
        const state = get();
        const freeAskedToday =
          state.aiFreeQuestionsAskedTodayDate === today ? state.aiFreeQuestionsAskedToday : 0;
        if (freeAskedToday < state.aiFreeDailyAllowance) {
          return { allowed: true, usingEarnedTokens: false };
        }
        const earnedThisMonth =
          state.aiEarnedTokenQuestionsMonthDate === month
            ? state.aiEarnedTokenQuestionsThisMonth
            : 0;
        if (earnedThisMonth < state.aiEarnedTokenMonthlyCap) {
          return { allowed: true, usingEarnedTokens: true };
        }
        return { allowed: false, usingEarnedTokens: false };
      },

      recordAiQuestionAsked: () => {
        const today = localDateString();
        const month = localMonthString();
        const state = get();
        const freeAskedToday =
          state.aiFreeQuestionsAskedTodayDate === today ? state.aiFreeQuestionsAskedToday : 0;
        if (freeAskedToday < state.aiFreeDailyAllowance) {
          set({
            aiFreeQuestionsAskedToday: freeAskedToday + 1,
            aiFreeQuestionsAskedTodayDate: today,
          });
          return;
        }
        const earnedThisMonth =
          state.aiEarnedTokenQuestionsMonthDate === month
            ? state.aiEarnedTokenQuestionsThisMonth
            : 0;
        set({
          aiEarnedTokenQuestionsThisMonth: earnedThisMonth + 1,
          aiEarnedTokenQuestionsMonthDate: month,
        });
      },
      };
    },
    {
      name: "biblestudyapp-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
