import { signInWithProvider, SignInResult } from "./oauth";

/** Off iPhone, Sign in with Apple goes through Apple's web page. */
export async function signInWithApple(): Promise<SignInResult> {
  return signInWithProvider("apple");
}

export async function isNativeAppleSignInAvailable(): Promise<boolean> {
  return false;
}
