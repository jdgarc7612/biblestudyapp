import type { Ionicons } from "@expo/vector-icons";

import type { MemoryMethod } from "../../lib/memory";

export const METHODS: { id: MemoryMethod; label: string; sub: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "smart", label: "Smart", sub: "Picks the right practice for each verse", icon: "sparkles" },
  { id: "flashcard", label: "Flashcard", sub: "See the reference, say it, then check", icon: "albums-outline" },
  { id: "blanks", label: "Fill in the blanks", sub: "Tap the missing words in order", icon: "grid-outline" },
  { id: "firstLetter", label: "First letter", sub: "Type the first letter of each hidden word", icon: "text-outline" },
  { id: "type", label: "Type it out", sub: "Type the whole verse from memory", icon: "create-outline" },
];

export const methodLabel = (id: MemoryMethod | "learn") =>
  id === "learn" ? "Learn" : (METHODS.find((m) => m.id === id)?.label ?? "Smart");
