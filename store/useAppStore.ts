import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { addDays, Grade, nextSrsState, toISODate } from "../lib/srs";
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

export type StudyMode = "progressive" | "typing" | "firstLetter";

export type NewMemoryCard = Pick<
  MemoryCard,
  "id" | "verseReference" | "verseText" | "translation"
>;

interface AppState {
  tokenBalance: number;
  streakDays: number;
  memoryDeck: MemoryCard[];
  studyMode: StudyMode;
  setTokenBalance: (amount: number) => void;
  addTokens: (amount: number) => void;
  spendTokens: (amount: number) => boolean;
  addToMemoryDeck: (card: NewMemoryCard) => void;
  removeFromMemoryDeck: (id: string) => void;
  reviewCard: (id: string, grade: Grade) => void;
  setStudyMode: (mode: StudyMode) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      tokenBalance: 100, // mock starting balance
      streakDays: 3, // mock reading streak
      memoryDeck: [],
      studyMode: "progressive",

      setTokenBalance: (amount) => set({ tokenBalance: amount }),

      addTokens: (amount) =>
        set((state) => ({ tokenBalance: state.tokenBalance + amount })),

      spendTokens: (amount) => {
        const current = get().tokenBalance;
        if (current < amount) return false;
        set({ tokenBalance: current - amount });
        return true;
      },

      addToMemoryDeck: (card) =>
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
        })),

      removeFromMemoryDeck: (id) =>
        set((state) => ({
          memoryDeck: state.memoryDeck.filter((c) => c.id !== id),
        })),

      reviewCard: (id, grade) =>
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
        })),

      setStudyMode: (mode) => set({ studyMode: mode }),
    }),
    {
      name: "biblestudyapp-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
