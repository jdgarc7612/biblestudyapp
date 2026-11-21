import { useEffect } from "react";
import { AppState } from "react-native";

import { reminderDates } from "../lib/memory";
import { remindersSupported, scheduleReminders, cancelReminders } from "../lib/reminders";
import { useAppStore } from "../store/useAppStore";

/**
 * Keeps the phone's memory reminders in step with the deck (iPhone and Android only): after a
 * review, when the setting changes and when the app comes back to the foreground.
 */
export function useMemoryReminders() {
  const deck = useAppStore((s) => s.memoryDeck);
  const reminder = useAppStore((s) => s.memoryReminder);
  const doneDate = useAppStore((s) => s.memoryReviewDoneDate);

  useEffect(() => {
    if (!remindersSupported) return;
    const sync = () => {
      const s = useAppStore.getState();
      if (!s.memoryReminder?.enabled) {
        void cancelReminders();
        return;
      }
      const { hour, minute } = s.memoryReminder;
      void scheduleReminders(reminderDates(s.memoryDeck, { hour, minute, reviewDoneDate: s.memoryReviewDoneDate }));
    };
    const timer = setTimeout(sync, 1500);
    const sub = AppState.addEventListener("change", (status) => status === "active" && sync());
    return () => {
      clearTimeout(timer);
      sub.remove();
    };
  }, [deck, reminder, doneDate]);
}
