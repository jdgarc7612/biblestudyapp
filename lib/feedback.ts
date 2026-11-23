/**
 * "Send feedback" from Profile. Each message is saved to the feedback table in Supabase
 * (see supabase/schema.sql): anyone can add one, nobody can read them back from the app.
 * Josh reads them in the Supabase dashboard (Table Editor -> feedback).
 */
import Constants from "expo-constants";
import { Platform } from "react-native";

import { getSupabase } from "./supabase";

export type FeedbackKind = "confusing" | "broken" | "idea" | "love";

export const FEEDBACK_KINDS: { id: FeedbackKind; label: string; icon: string }[] = [
  { id: "confusing", label: "Something's confusing", icon: "help-circle-outline" },
  { id: "broken", label: "Something's broken", icon: "construct-outline" },
  { id: "idea", label: "I have an idea", icon: "bulb-outline" },
  { id: "love", label: "Something I love", icon: "heart-outline" },
];

export const FEEDBACK_MAX_CHARS = 4000;

// The last screen someone was on before opening Profile, so feedback says where they were.
let lastScreen = "";
const SKIP = ["/profile", "/feedback", "/privacy", "/terms", "/sign-in"];

export function noteScreen(pathname: string) {
  if (!pathname || SKIP.some((p) => pathname === p)) return;
  lastScreen = pathname;
}

export function appVersion() {
  return Constants.expoConfig?.version ?? "";
}

export function platformLabel() {
  if (Platform.OS !== "web") return Platform.OS;
  if (typeof window === "undefined") return "web";
  return `web ${window.innerWidth}px`;
}

/** Sends one piece of feedback. Returns null when it's saved, or a message to show. */
export async function sendFeedback(input: {
  kind: FeedbackKind;
  message: string;
  replyEmail?: string;
}): Promise<string | null> {
  const message = input.message.trim().slice(0, FEEDBACK_MAX_CHARS);
  if (!message) return "Write a few words first.";
  const supabase = getSupabase();
  if (!supabase) return "Feedback can't be sent from this version of the app yet.";

  const replyEmail = input.replyEmail?.trim().slice(0, 200) || null;
  const { error } = await supabase.from("feedback").insert({
    kind: input.kind,
    message,
    reply_email: replyEmail,
    screen: lastScreen.slice(0, 200) || null,
    app_version: appVersion().slice(0, 40) || null,
    platform: platformLabel().slice(0, 40),
  });
  if (error) return "That didn't send. Please check your connection and try again.";
  return null;
}
