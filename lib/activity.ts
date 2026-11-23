/**
 * Records which screens and features signed-in testers use, for the organizer's Testers page
 * (Profile -> Testers). Events wait in memory and go to Supabase in small batches; if a batch
 * can't be sent it's dropped, so this never slows the app down or gets in anyone's way.
 * Nothing is recorded for people who aren't signed in. See lib/activity-events.ts for what is
 * (and isn't) recorded.
 */
import { AppState } from "react-native";

import { ActivityEvent, normalizeScreen, SCREEN_REPEAT_MS, SESSION_GAP_MS } from "./activity-events";
import { appVersion, platformLabel } from "./feedback";
import { getSupabase } from "./supabase";

interface QueuedEvent {
  event: ActivityEvent;
  screen: string | null;
  detail: string | null;
  platform: string;
  app_version: string | null;
}

const FLUSH_DELAY_MS = 4000;
const MAX_BATCH = 25;
const MAX_QUEUE = 200;

let userId: string | null = null;
let queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let currentScreen: string | null = null;
let lastScreenKey = "";
let lastScreenAt = 0;
let lastSeenAt = 0;
let listening = false;

function listen() {
  if (listening) return;
  listening = true;
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      if (userId && lastSeenAt && Date.now() - lastSeenAt > SESSION_GAP_MS) track("app_open");
      lastSeenAt = Date.now();
    } else {
      lastSeenAt = Date.now();
      void flushActivity();
    }
  });
}

/** Called when the signed-in account changes (null when signed out). */
export function setActivityUser(id: string | null) {
  if (id === userId) return;
  if (userId) void flushActivity();
  userId = id;
  queue = [];
  listen();
  if (id) {
    lastSeenAt = Date.now();
    track("app_open");
  }
}

/** Records one action. `detail` must be something the app built, never text someone typed. */
export function track(event: ActivityEvent, detail?: string | null) {
  if (!userId) return;
  queue.push({
    event,
    screen: currentScreen,
    detail: detail ? String(detail).slice(0, 80) : null,
    platform: platformLabel().slice(0, 40),
    app_version: appVersion().slice(0, 40) || null,
  });
  if (queue.length > MAX_QUEUE) queue = queue.slice(-MAX_QUEUE);
  if (queue.length >= MAX_BATCH) void flushActivity();
  else if (!timer) timer = setTimeout(() => void flushActivity(), FLUSH_DELAY_MS);
}

/** Records a screen visit from the router's pathname. */
export function trackScreen(pathname: string) {
  const { screen, detail } = normalizeScreen(pathname);
  currentScreen = screen;
  const key = `${screen}|${detail ?? ""}`;
  const now = Date.now();
  if (key === lastScreenKey && now - lastScreenAt < SCREEN_REPEAT_MS) return;
  lastScreenKey = key;
  lastScreenAt = now;
  track(screen === "/read/[book]/[chapter]" ? "chapter_open" : "screen", detail);
}

/** Sends whatever is waiting. */
export async function flushActivity(): Promise<void> {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (!queue.length || !userId) return;
  const supabase = getSupabase();
  if (!supabase) {
    queue = [];
    return;
  }
  const batch = queue.splice(0, MAX_BATCH);
  try {
    await supabase.from("activity_events").insert(batch);
  } catch {
    // Dropped on purpose: activity is nice to have, never worth retrying at the user's expense.
  }
  if (queue.length) timer = setTimeout(() => void flushActivity(), FLUSH_DELAY_MS);
}
