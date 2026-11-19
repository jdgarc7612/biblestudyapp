import { create } from "zustand";

import { useAppStore } from "../../store/useAppStore";
import { getSupabase } from "../supabase";
import { flushSync, setSyncUser, startSync } from "../sync";

export interface AccountUser {
  id: string;
  email: string | null;
  provider: string | null;
}

interface AccountState {
  /** False until the saved sign-in (if any) has been checked. */
  ready: boolean;
  user: AccountUser | null;
}

export const useAccount = create<AccountState>(() => ({ ready: false, user: null }));

let initialized = false;
let pendingGivenName: string | undefined;

/** A first name to use if the profile still has no name (Apple only shares it once). */
export function rememberGivenName(name?: string) {
  if (name?.trim()) pendingGivenName = name.trim();
}

function fillInName(meta: Record<string, unknown> | undefined) {
  const fromProvider =
    pendingGivenName ??
    (typeof meta?.given_name === "string" ? meta.given_name : undefined) ??
    (typeof meta?.full_name === "string" ? meta.full_name.split(" ")[0] : undefined) ??
    (typeof meta?.name === "string" ? meta.name.split(" ")[0] : undefined);
  pendingGivenName = undefined;
  const store = useAppStore.getState();
  if (fromProvider && store.displayName === "You") store.setDisplayName(fromProvider);
}

/** Restores any saved sign-in and keeps sync pointed at the signed-in account. Call once. */
export function initAccount() {
  if (initialized) return;
  initialized = true;
  const supabase = getSupabase();
  if (!supabase) {
    useAccount.setState({ ready: true });
    return;
  }
  startSync();
  supabase.auth.onAuthStateChange((_event, session) => {
    const u = session?.user;
    useAccount.setState({
      ready: true,
      user: u ? { id: u.id, email: u.email ?? null, provider: u.app_metadata?.provider ?? null } : null,
    });
    // Supabase asks that no other Supabase call runs inside this callback, so defer the sync.
    setTimeout(() => {
      void setSyncUser(u?.id ?? null).then(() => {
        if (u) fillInName(u.user_metadata);
      });
    }, 0);
  });
}

const friendly = (message: string) =>
  /rate limit/i.test(message)
    ? "Too many codes were sent just now. Please wait a minute and try again."
    : message;

export async function sendEmailCode(email: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return "Sign-in isn't switched on yet.";
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  return error ? friendly(error.message) : null;
}

export async function verifyEmailCode(email: string, code: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return "Sign-in isn't switched on yet.";
  const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
  return error ? "That code didn't work. Check it, or send a new one." : null;
}

/** Signs out and leaves this device as a fresh guest. Progress stays in the account. */
export async function signOut(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await flushSync();
  await setSyncUser(null);
  await supabase.auth.signOut();
  useAppStore.getState().resetLocalData();
}

/** Deletes the account and everything synced to it, then clears this device. */
export async function deleteAccount(): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return "Sign-in isn't switched on yet.";
  const { error } = await supabase.rpc("delete_my_account");
  if (error) return "Your account couldn't be deleted just now. Please try again.";
  await setSyncUser(null);
  await supabase.auth.signOut({ scope: "local" });
  useAppStore.getState().resetLocalData();
  return null;
}
