/**
 * Phone reminders for memory verses (iPhone and Android build). Local notifications only: no
 * push server and nothing stored outside the app. Each reminder is a one-off at the chosen time
 * on a day that has verses due (lib/memory.ts reminderDates), so a caught-up day stays quiet.
 * Permission is asked only when the person turns reminders on.
 */
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const remindersSupported = true;

const PREFIX = "omeora-memory-";
const CHANNEL = "memory";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function ensureChannel() {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync(CHANNEL, {
    name: "Memory verse reminders",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function requestReminderPermission(): Promise<boolean> {
  try {
    await ensureChannel();
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    if (!current.canAskAgain) return false;
    const asked = await Notifications.requestPermissionsAsync();
    return asked.granted;
  } catch {
    return false;
  }
}

export async function cancelReminders(): Promise<void> {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      scheduled
        .filter((n) => n.identifier.startsWith(PREFIX))
        .map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier))
    );
  } catch {
    // Nothing to cancel, or notifications aren't available on this device.
  }
}

export async function scheduleReminders(dates: Date[]): Promise<void> {
  try {
    const permission = await Notifications.getPermissionsAsync();
    await cancelReminders();
    if (!permission.granted) return;
    await ensureChannel();
    for (const date of dates) {
      await Notifications.scheduleNotificationAsync({
        identifier: `${PREFIX}${date.toISOString().slice(0, 10)}`,
        content: {
          title: "Memory verses",
          body: "A few verses are ready for review. A few minutes keeps them fresh.",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date,
          ...(Platform.OS === "android" ? { channelId: CHANNEL } : {}),
        },
      });
    }
  } catch {
    // Reminders are a nicety; never let them break the app.
  }
}
