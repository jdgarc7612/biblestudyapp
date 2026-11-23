/**
 * Tester activity: the event names the app records and how the Testers page words them.
 * Plain helpers (no React, no Supabase) so they can be tested. See lib/activity.ts.
 *
 * Only event names, screens and short details the app builds itself (a book and chapter, a plan
 * id, a study tab) are ever recorded. Never note text, Ask AI questions or answers, or study
 * answers.
 */

export const ACTIVITY_EVENTS = {
  app_open: "Opened the app",
  screen: "Visited a screen",
  chapter_open: "Read a chapter",
  setting_card: "Opened a Setting card",
  go_deeper: "Opened Go Deeper",
  study_panel: "Opened the Study panel",
  word_study: "Tapped a Hebrew or Greek word",
  ask_ai: "Asked AI",
  answer_save: "Saved an AI answer",
  note_save: "Wrote a verse note",
  highlight: "Highlighted a verse",
  verse_save: "Saved a verse",
  verse_compare: "Compared translations",
  verse_share: "Copied or shared a verse",
  memorize_add: "Added a memory verse",
  memory_card: "Practiced a memory verse",
  memory_review_done: "Finished a memory review",
  memory_challenge: "Started or joined a challenge",
  plan_start: "Started a guided study",
  plan_day_done: "Finished a study day",
  plan_answer: "Answered a reflection question",
  translation: "Changed translation",
  feedback_sent: "Sent feedback",
} as const;

export type ActivityEvent = keyof typeof ACTIVITY_EVENTS;

export function eventLabel(event: string): string {
  return (ACTIVITY_EVENTS as Record<string, string>)[event] ?? event.replace(/_/g, " ");
}

const SCREEN_LABELS: Record<string, string> = {
  "/": "Home",
  "/read": "Read",
  "/read/[book]": "Book page",
  "/read/[book]/[chapter]": "Reading a chapter",
  "/study": "Study",
  "/study/plans/[id]": "Guided study",
  "/ai": "Ask AI",
  "/profile": "Profile",
  "/notes": "My notes",
  "/answers": "Answer history",
  "/answers/[id]": "An AI answer",
  "/memory": "Memory",
  "/memory/review": "Memory review",
  "/memory/challenge": "Memorize together",
  "/memory/join": "Join a challenge",
  "/memory/collection/[id]": "Memory pack",
  "/feedback": "Send feedback",
  "/invite-testers": "Invite testers",
  "/testers": "Testers",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Use",
  "/shop": "Shop",
  "/sign-in": "Sign in",
  "/welcome": "Welcome",
};

export function screenLabel(screen: string | null | undefined): string {
  if (!screen) return "";
  return SCREEN_LABELS[screen] ?? screen;
}

/**
 * Turns an address into the route it belongs to, so "/read/john/3" counts as reading a
 * chapter. `detail` keeps the useful part (here "john 3"), and ids are dropped.
 */
export function normalizeScreen(pathname: string): { screen: string; detail: string | null } {
  const path = (pathname || "/").split("?")[0].replace(/\/+$/, "") || "/";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "read" && parts.length === 3 && parts[1] !== "plans") {
    return { screen: "/read/[book]/[chapter]", detail: `${parts[1]} ${parts[2]}`.slice(0, 80) };
  }
  if (parts[0] === "read" && parts.length === 2 && parts[1] !== "plans") {
    return { screen: "/read/[book]", detail: parts[1].slice(0, 80) };
  }
  if ((parts[0] === "study" || parts[0] === "read") && parts[1] === "plans" && parts.length === 3) {
    return { screen: "/study/plans/[id]", detail: parts[2].slice(0, 80) };
  }
  if (parts[0] === "answers" && parts.length === 2) return { screen: "/answers/[id]", detail: null };
  if (parts[0] === "memory" && parts[1] === "collection" && parts.length === 3) {
    return { screen: "/memory/collection/[id]", detail: parts[2].slice(0, 80) };
  }
  return { screen: path.slice(0, 120), detail: null };
}

/** "john 3" -> "John 3", "1corinthians 13" -> "1 Corinthians 13", "song-of-songs" -> "Song Of Songs". */
export function prettyDetail(detail: string | null | undefined): string {
  if (!detail) return "";
  return detail
    .replace(/^(\d)([a-z])/i, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

/** "Today", "Yesterday", "3 days ago", or a short date. */
export function relativeDay(iso: string | null | undefined, now: Date = new Date()): string {
  if (!iso) return "Never";
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return "Never";
  const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((day(now) - day(t)) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return t.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** "Today 2:14 PM", "Yesterday 9:03 AM", "Nov 18, 7:40 PM". */
export function shortTime(iso: string, now: Date = new Date()): string {
  const t = new Date(iso);
  const clock = t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const day = relativeDay(iso, now);
  if (day === "Today" || day === "Yesterday") return `${day} ${clock}`;
  return `${t.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${clock}`;
}

/** Repeated screen visits within this window count once (re-renders, quick back and forth). */
export const SCREEN_REPEAT_MS = 3000;
/** Coming back after this long counts as opening the app again. */
export const SESSION_GAP_MS = 30 * 60 * 1000;
