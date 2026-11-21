import type { Ionicons } from "@expo/vector-icons";

import type { MemoryMethod } from "../../lib/memory";

/** Methods a session (or the default) can use. "In order" (stitch) shows only on long passages. */
export const METHODS: { id: MemoryMethod; label: string; sub: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "smart", label: "Smart", sub: "Picks the right practice for each verse", icon: "sparkles" },
  { id: "flashcard", label: "Flashcard", sub: "See the reference, say it, then check", icon: "albums-outline" },
  { id: "blanks", label: "Fill in the blanks", sub: "Tap the missing words in order", icon: "grid-outline" },
  { id: "firstLetter", label: "First letter", sub: "Type the first letter of each hidden word", icon: "text-outline" },
  { id: "type", label: "Type it out", sub: "Type the whole verse from memory", icon: "create-outline" },
  { id: "listen", label: "Listen", sub: "Hear it read aloud by your device, then check", icon: "headset-outline" },
  { id: "recite", label: "Recite", sub: "Say it aloud start to finish, then check", icon: "chatbubbles-outline" },
  { id: "reference", label: "Reference", sub: "Read the words and name where they're found", icon: "locate-outline" },
];

export const STITCH_METHOD = {
  id: "stitch" as const,
  label: "In order",
  sub: "One verse at a time, then the whole passage",
  icon: "git-merge-outline" as keyof typeof Ionicons.glyphMap,
};

export const methodLabel = (id: MemoryMethod | "learn") =>
  id === "learn" ? "Learn" : id === "stitch" ? STITCH_METHOD.label : (METHODS.find((m) => m.id === id)?.label ?? "Smart");
