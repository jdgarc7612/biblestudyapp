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
import {
  addCard,
  migrateCard,
  type MemoryCard,
  type MemoryList,
  type MemoryMethod,
  type NewMemoryCard,
} from "../lib/memory";
import type { MemoryChallenge } from "../lib/memory-challenge";
import {
  addAnswer,
  answersFromChat,
  deleteAnswer,
  setAnswerSaved,
  type AiAnswer,
} from "../lib/ai-answers";
import storage from "../lib/storage";
import {
  applyHighlight,
  type HighlightColor,
  type SavedVerse,
  type VerseHighlight,
} from "../lib/verse-marks";

export type { MemoryCard, MemoryList, MemoryMethod, NewMemoryCard } from "../lib/memory";
export type { MemoryChallenge } from "../lib/memory-challenge";
export type { AiAnswer } from "../lib/ai-answers";

export interface MemoryReminder {
  enabled: boolean;
  /** Local time, 24-hour. */
  hour: number;
  minute: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  verseReference?: string;
  createdAt: string;
  /** For an answer: its entry in `aiAnswers` (history), so the bubble can save or delete it. */
  answerId?: string;
}

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
  /** The method Memory sessions start with ("smart" picks per card); a session can switch. */
  memoryMethod: MemoryMethod;
  /** The person's own named lists of memory verses, keyed "list-...". */
  memoryLists: Record<string, MemoryList>;
  /** Verses learned alongside family or a group (lib/memory-challenge.ts). Progress stays per person. */
  memoryChallenges: Record<string, MemoryChallenge>;
  /** Local date a Review session was last finished; Home stops reminding after that. */
  memoryReviewDoneDate: string | null;
  /** Local date the Home reminder was put away for the day (this device only). */
  memoryNudgeDismissedDate: string | null;
  /** The phone reminder (native app only; the web app reminds on Home). */
  memoryReminder: MemoryReminder;
  /** The conversation on the Ask AI tab (this device only; "New chat" clears it). */
  chatMessages: ChatMessage[];
  /** Every answer kept, saved or not (lib/ai-answers.ts), keyed by id. Synced. */
  aiAnswers: Record<string, AiAnswer>;
  displayName: string;

  // Reading
  translation: TranslationId;
  lastRead: ReadingLocation | null;

  // Study notes, keyed by verse range id ("john-3-16-17").
  verseNotes: Record<string, VerseNote>;
  lastStudy: StudyLocation | null;

  // Read tab marks (lib/verse-marks.ts), keyed by verse range id. Saved verses are not Memory.
  verseHighlights: Record<string, VerseHighlight>;
  savedVerses: Record<string, SavedVerse>;

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
  /** Adds a verse (false if it's already there or its text is empty). Collection tags merge into an existing card. */
  addToMemoryDeck: (card: NewMemoryCard) => boolean;
  /** Adds several (a pack); returns how many were new. */
  addManyToMemoryDeck: (cards: NewMemoryCard[]) => number;
  removeFromMemoryDeck: (id: string) => void;
  /** Saves a graded card (the session works out the new state with lib/memory.ts). */
  saveGradedCard: (card: MemoryCard) => void;
  /** Puts a card back exactly as it was (undo in a session). */
  restoreMemoryCard: (card: MemoryCard) => void;
  setCardCollections: (id: string, collections: string[]) => void;
  setMemoryMethod: (method: MemoryMethod) => void;
  /** Records that a Review session was finished today. */
  markMemoryReviewDone: () => void;
  dismissMemoryNudge: () => void;
  setMemoryReminder: (reminder: Omit<MemoryReminder, "updatedAt">) => void;
  /** Creates one of the person's own lists and returns its id. */
  createMemoryList: (name: string) => string;
  renameMemoryList: (id: string, name: string) => void;
  deleteMemoryList: (id: string) => void;
  /** Saves a challenge this person started or joined (the verses are added separately). */
  saveMemoryChallenge: (challenge: MemoryChallenge) => void;
  /** Leaves a challenge: its tag comes off the cards, the cards and their progress stay. */
  leaveMemoryChallenge: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  /** Keeps an answer in history and returns its id. Never calls the AI. */
  recordAiAnswer: (id: string, entry: Pick<AiAnswer, "question" | "answer" | "reference" | "rangeId" | "translation">) => void;
  setAiAnswerSaved: (id: string, saved: boolean) => void;
  deleteAiAnswer: (id: string) => void;
  setDisplayName: (name: string) => void;
  setTranslation: (translation: TranslationId) => void;
  setLastRead: (location: ReadingLocation) => void;
  /** Saves (or, with empty text, deletes) the note on a verse range. */
  saveVerseNote: (id: string, reference: string, text: string) => void;
  setLastStudy: (location: StudyLocation) => void;
  /** Highlights (or, with null, clears) verses start-end of one chapter. */
  setVerseHighlight: (book: string, chapter: number, start: number, end: number, color: HighlightColor | null) => void;
  /** Adds a verse or range to Saved. Never touches the Memory deck. */
  saveVerse: (id: string, entry: Pick<SavedVerse, "reference" | "translation" | "text">) => void;
  unsaveVerse: (id: string) => void;
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
      memoryMethod: "smart",
      memoryLists: {},
      memoryChallenges: {},
      memoryReviewDoneDate: null,
      memoryNudgeDismissedDate: null,
      memoryReminder: { enabled: false, hour: 8, minute: 0, updatedAt: 0 },
      chatMessages: [],
      aiAnswers: {},
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

      verseHighlights: {},
      savedVerses: {},

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
        const result = addCard(get().memoryDeck, card);
        if (result.deck === get().memoryDeck) return false;
        set((state) => ({
          memoryDeck: result.deck,
          deletedCardIds: state.deletedCardIds.filter((d) => d !== card.id),
        }));
        if (result.added) get().claimOnboardingBonus("firstCard");
        return result.added;
      },

      addManyToMemoryDeck: (cards) => {
        let deck = get().memoryDeck;
        let added = 0;
        for (const card of cards) {
          const result = addCard(deck, card);
          deck = result.deck;
          if (result.added) added++;
        }
        const ids = new Set(cards.map((c) => c.id));
        set((state) => ({ memoryDeck: deck, deletedCardIds: state.deletedCardIds.filter((d) => !ids.has(d)) }));
        if (added > 0) get().claimOnboardingBonus("firstCard");
        return added;
      },

      removeFromMemoryDeck: (id) =>
        set((state) => ({
          memoryDeck: state.memoryDeck.filter((c) => c.id !== id),
          deletedCardIds: [...state.deletedCardIds.filter((d) => d !== id), id].slice(-500),
        })),

      saveGradedCard: (card) => {
        set((state) => ({ memoryDeck: state.memoryDeck.map((c) => (c.id === card.id ? card : c)) }));
        get().logMemoryEngagement();
      },

      restoreMemoryCard: (card) =>
        set((state) => ({
          memoryDeck: state.memoryDeck.map((c) => (c.id === card.id ? { ...card, updatedAt: Date.now() } : c)),
        })),

      setCardCollections: (id, collections) =>
        set((state) => ({
          memoryDeck: state.memoryDeck.map((c) =>
            c.id === id ? { ...c, collections: Array.from(new Set(collections)), updatedAt: Date.now() } : c
          ),
        })),

      setMemoryMethod: (method) => set({ memoryMethod: method }),

      markMemoryReviewDone: () => set({ memoryReviewDoneDate: localDateString() }),
      dismissMemoryNudge: () => set({ memoryNudgeDismissedDate: localDateString() }),
      setMemoryReminder: (reminder) => set({ memoryReminder: { ...reminder, updatedAt: Date.now() } }),

      saveMemoryChallenge: (challenge) =>
        set((state) => ({ memoryChallenges: { ...state.memoryChallenges, [challenge.id]: challenge } })),

      leaveMemoryChallenge: (id) =>
        set((state) => {
          const challenge = state.memoryChallenges[id];
          if (!challenge) return {};
          const now = Date.now();
          return {
            memoryChallenges: { ...state.memoryChallenges, [id]: { ...challenge, left: true, updatedAt: now } },
            memoryDeck: state.memoryDeck.map((c) =>
              c.collections.includes(id) ? { ...c, collections: c.collections.filter((x) => x !== id), updatedAt: now } : c
            ),
          };
        }),

      createMemoryList: (name) => {
        const id = `list-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
        const now = Date.now();
        set((state) => ({
          memoryLists: { ...state.memoryLists, [id]: { name: name.trim() || "My list", createdAt: now, updatedAt: now } },
        }));
        return id;
      },

      renameMemoryList: (id, name) =>
        set((state) => {
          const list = state.memoryLists[id];
          if (!list || !name.trim()) return state;
          return { memoryLists: { ...state.memoryLists, [id]: { ...list, name: name.trim(), updatedAt: Date.now() } } };
        }),

      deleteMemoryList: (id) =>
        set((state) => {
          const list = state.memoryLists[id];
          if (!list) return state;
          const now = Date.now();
          return {
            memoryLists: { ...state.memoryLists, [id]: { ...list, deleted: true, updatedAt: now } },
            memoryDeck: state.memoryDeck.map((c) =>
              c.collections.includes(id)
                ? { ...c, collections: c.collections.filter((x) => x !== id), updatedAt: now }
                : c
            ),
          };
        }),

      addChatMessage: (message) =>
        set((state) => ({ chatMessages: [...state.chatMessages, message] })),

      clearChat: () => set({ chatMessages: [] }),

      recordAiAnswer: (id, entry) =>
        set((state) => ({ aiAnswers: addAnswer(state.aiAnswers, id, entry, Date.now()) })),

      setAiAnswerSaved: (id, saved) =>
        set((state) => ({ aiAnswers: setAnswerSaved(state.aiAnswers, id, saved, Date.now()) })),

      deleteAiAnswer: (id) =>
        set((state) => ({
          aiAnswers: deleteAnswer(state.aiAnswers, id, Date.now()),
          // The bubble stays in the conversation; it just isn't linked to history any more.
          chatMessages: state.chatMessages.map((m) => (m.answerId === id ? { ...m, answerId: undefined } : m)),
        })),

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

      setVerseHighlight: (book, chapter, start, end, color) =>
        set((state) => ({
          verseHighlights: applyHighlight(state.verseHighlights, { book, chapter, start, end }, color, Date.now()),
        })),

      saveVerse: (id, entry) =>
        set((state) => {
          const now = Date.now();
          return { savedVerses: { ...state.savedVerses, [id]: { ...entry, savedAt: now, updatedAt: now } } };
        }),

      unsaveVerse: (id) =>
        set((state) => {
          const existing = state.savedVerses[id];
          if (!existing || existing.removed) return state;
          return { savedVerses: { ...state.savedVerses, [id]: { ...existing, removed: true, updatedAt: Date.now() } } };
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
      version: 3,
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
        if (version < 2) {
          // v1 scheduled memory with SM-2 and had global method/difficulty pickers. Cards move to
          // FSRS in place (lib/memory.ts migrateCard); nothing is reset.
          const deck = Array.isArray(state.memoryDeck) ? state.memoryDeck : [];
          state.memoryDeck = deck.map((c) => migrateCard(c as MemoryCard));
          state.memoryMethod = "smart";
          state.memoryLists = {};
          delete state.studyMode;
          delete state.typeSubMode;
          delete state.difficulty;
        }
        if (version < 3) {
          // v2 kept the Ask AI conversation on this device only. Its answers start the history.
          const chat = Array.isArray(state.chatMessages) ? (state.chatMessages as ChatMessage[]) : [];
          const kept = answersFromChat(chat);
          state.aiAnswers = kept;
          state.chatMessages = chat.map((m) => (m.role === "assistant" && kept[m.id] ? { ...m, answerId: m.id } : m));
        }
        return state as unknown as AppState;
      },
    }
  )
);
