import "react-native-url-polyfill/auto";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

import storage from "./storage";

/**
 * Accounts and sync run on Supabase. Set both values at build time (see docs/accounts-setup.md).
 * The publishable (anon) key is meant to be public: what each person can read or change is
 * enforced by the row-level security rules in supabase/schema.sql.
 */
export const SUPABASE_URL = (process.env.EXPO_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
export const SUPABASE_KEY = (process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "").trim();

export const isAccountsConfigured = SUPABASE_URL.length > 0 && SUPABASE_KEY.length > 0;

/** Sign-in providers switched on in Supabase, e.g. "apple,google". Email codes are always on. */
const PROVIDERS = (process.env.EXPO_PUBLIC_AUTH_PROVIDERS ?? "")
  .split(",")
  .map((p: string) => p.trim().toLowerCase());

export const appleSignInEnabled = PROVIDERS.includes("apple");
// Apple's rules: an iPhone app that offers Google sign-in must offer Sign in with Apple too.
export const googleSignInEnabled =
  PROVIDERS.includes("google") && (Platform.OS !== "ios" || appleSignInEnabled);

let client: SupabaseClient | null = null;

/** The shared client, created on first use (never during the web build's static render). */
export function getSupabase(): SupabaseClient | null {
  if (!isAccountsConfigured || typeof window === "undefined") return null;
  if (client) return client;

  client = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      storage,
      persistSession: true,
      autoRefreshToken: true,
      // On the web, Google and Apple sign-in come back to the site with a code in the address.
      detectSessionInUrl: Platform.OS === "web",
      flowType: "pkce",
    },
  });

  if (Platform.OS !== "web") {
    // Phones only refresh the sign-in while the app is open.
    AppState.addEventListener("change", (state) => {
      if (state === "active") client?.auth.startAutoRefresh();
      else client?.auth.stopAutoRefresh();
    });
  }
  return client;
}
