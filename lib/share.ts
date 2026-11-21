/** Sharing a bit of text (an invite, a verse) through the phone's share sheet, or the browser's. */
import { Platform, Share } from "react-native";

import { writeClipboard } from "./clipboard";

/**
 * Where the web app lives, for links that open on any device. On the web the page's own address
 * is used instead, so a move to a new domain carries over by itself.
 */
const PUBLISHED_WEB_APP = "https://jdgarc7612.github.io/biblestudyapp";

export function webAppUrl(path: string): string {
  if (Platform.OS === "web" && typeof window !== "undefined" && window.location) {
    const { origin, pathname } = window.location;
    const at = pathname.indexOf("/memory");
    const base = at >= 0 ? pathname.slice(0, at) : "";
    return `${origin}${base}${path}`;
  }
  return `${PUBLISHED_WEB_APP}${path}`;
}

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

export async function shareText(message: string): Promise<ShareResult> {
  if (Platform.OS === "web") {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav?.share) {
      try {
        await nav.share({ text: message });
        return "shared";
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return "cancelled";
      }
    }
    return copyText(message);
  }
  try {
    const result = await Share.share({ message });
    return result.action === Share.dismissedAction ? "cancelled" : "shared";
  } catch {
    return "failed";
  }
}

/** Copies to the clipboard: the browser's on the web, the phone's through expo-clipboard. */
export async function copyText(text: string): Promise<ShareResult> {
  return (await writeClipboard(text)) ? "copied" : "failed";
}
