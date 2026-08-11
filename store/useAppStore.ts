import { create } from "zustand";

export interface MemoryCard {
  id: string;
  verseReference: string;
  verseText: string;
  translation: string;
  dateAdded: string;
}

interface AppState {
  tokenBalance: number;
  memoryDeck: MemoryCard[];
  setTokenBalance: (amount: number) => void;
  addTokens: (amount: number) => void;
  spendTokens: (amount: number) => boolean;
  addToMemoryDeck: (card: MemoryCard) => void;
  removeFromMemoryDeck: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  tokenBalance: 100, // mock starting balance
  memoryDeck: [],

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
    set((state) => ({ memoryDeck: [...state.memoryDeck, card] })),

  removeFromMemoryDeck: (id) =>
    set((state) => ({
      memoryDeck: state.memoryDeck.filter((c) => c.id !== id),
    })),
}));