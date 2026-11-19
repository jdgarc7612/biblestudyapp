import * as AppleAuthentication from "expo-apple-authentication";

import { getSupabase } from "../supabase";
import type { SignInResult } from "./oauth";

/** On iPhone, Sign in with Apple uses the system sheet, then hands Apple's token to Supabase. */
export async function signInWithApple(): Promise<SignInResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: "Sign-in isn't switched on yet." };
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (!credential.identityToken) return { ok: false, message: "Apple didn't send a sign-in token." };
    const { error } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: credential.identityToken,
    });
    if (error) return { ok: false, message: error.message };
    // Apple shares the name only the first time someone signs in.
    return { ok: true, givenName: credential.fullName?.givenName ?? undefined };
  } catch (err) {
    if ((err as { code?: string }).code === "ERR_REQUEST_CANCELED") {
      return { ok: false, cancelled: true, message: "" };
    }
    return { ok: false, message: "Sign in with Apple didn't work. Please try again." };
  }
}

export function isNativeAppleSignInAvailable(): Promise<boolean> {
  return AppleAuthentication.isAvailableAsync();
}
