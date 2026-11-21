/**
 * Phone reminders for memory verses. This is the web version: the web app has no background
 * notifications, so it reminds on Home instead (lib/memory.ts reviewNudgeCount). The iPhone and
 * Android build uses reminders.native.ts, so the web bundle never loads expo-notifications.
 */

/** Whether this build can send a daily reminder. */
export const remindersSupported = false;

/** Asks for permission (only after the person turns reminders on). Resolves whether it was granted. */
export async function requestReminderPermission(): Promise<boolean> {
  return false;
}

/** Replaces Omeora's scheduled memory reminders with these times. Never asks for permission. */
export async function scheduleReminders(_dates: Date[]): Promise<void> {}

export async function cancelReminders(): Promise<void> {}
