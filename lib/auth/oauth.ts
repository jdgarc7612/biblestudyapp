import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

import { getSupabase } from "../supabase";

export type SignInResult =
  | { ok: true; givenName?: string }
  | { ok: false; cancelled?: boolean; message: string };

const NOT_SET_UP: SignInResult = { ok: false, message: "Sign-in isn't switched on yet." };

/** Where the sign-in page sends people back to. Each one must be in Supabase's redirect list. */
export function authRedirectUrl(): string {
  if (Platform.OS === "web") {
    const base = (Constants.expoConfig?.experiments?.baseUrl ?? "").replace(/\/+$/, "");
    return `${window.location.origin}${base}/`;
  }
  return Linking.createURL("auth-callback");
}

/** Google (and Apple off iPhone) through Supabase's hosted sign-in page. */
export async function signInWithProvider(provider: "google" | "apple"): Promise<SignInResult> {
  const supabase = getSupabase();
  if (!supabase) return NOT_SET_UP;
  const redirectTo = authRedirectUrl();

  if (Platform.OS === "web") {
    // Leaves the app; Supabase finishes the sign-in when the browser comes back.
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
    return error ? { ok: false, message: error.message } : { ok: true };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error || !data.url) return { ok: false, message: error?.message ?? "Couldn't start sign-in." };

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== "success") return { ok: false, cancelled: true, message: "" };

  const params = new URL(result.url).searchParams;
  const code = params.get("code");
  if (!code) {
    return { ok: false, message: params.get("error_description") ?? "Sign-in didn't finish." };
  }
  const exchanged = await supabase.auth.exchangeCodeForSession(code);
  return exchanged.error ? { ok: false, message: exchanged.error.message } : { ok: true };
}
