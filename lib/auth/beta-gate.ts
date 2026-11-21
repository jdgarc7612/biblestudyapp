import { AppState } from "react-native";
import { create } from "zustand";

import { BetaStatus, parseBetaStatus } from "../beta";
import storage from "../storage";
import { getSupabase } from "../supabase";
import { useAccount } from "./account";

interface BetaGateState {
  /** undefined while checking; null when the gate isn't set up (Omeora is open). */
  status: BetaStatus | null | undefined;
  /** Whose status this is ("guest" when signed out). */
  forUser: string | null;
}

export const useBetaGate = create<BetaGateState>(() => ({ status: undefined, forUser: null }));

const cacheKey = (who: string) => `omeora.betaStatus.${who}`;
let initialized = false;
let checking: string | null = null;

async function readCache(who: string): Promise<BetaStatus | null | undefined> {
  try {
    const raw = await storage.getItem(cacheKey(who));
    if (raw == null) return undefined;
    return raw === "off" ? null : parseBetaStatus(JSON.parse(raw));
  } catch {
    return undefined;
  }
}

async function writeCache(who: string, status: BetaStatus | null) {
  try {
    await storage.setItem(
      cacheKey(who),
      status
        ? JSON.stringify({
            enabled: status.enabled,
            ends_on: status.endsOn,
            ends_at: status.endsAt,
            ended: status.ended,
            invited: status.invited,
            is_admin: status.isAdmin,
          })
        : "off"
    );
  } catch {
    // Only a convenience for opening the app offline.
  }
}

/** Asks the database whether the gate is on and whether this person is invited. */
export async function refreshBetaStatus(): Promise<void> {
  const supabase = getSupabase();
  const account = useAccount.getState();
  if (!supabase || !account.ready) return;
  const who = account.user?.id ?? "guest";
  if (checking === who) return;
  checking = who;

  // A new person: show what we last knew for them (if anything) while we check.
  if (useBetaGate.getState().forUser !== who) {
    const cached = await readCache(who);
    useBetaGate.setState({ forUser: who, status: cached });
  }

  try {
    const { data, error } = await supabase.rpc("beta_status");
    if (useAccount.getState().user?.id !== account.user?.id) return; // signed in or out meanwhile
    if (!error) {
      const status = parseBetaStatus(data);
      useBetaGate.setState({ forUser: who, status });
      void writeCache(who, status);
      return;
    }
    if (error.code === "PGRST202") {
      // The gate's SQL hasn't been run in Supabase yet: Omeora works as before.
      useBetaGate.setState({ forUser: who, status: null });
      return;
    }
    throw error;
  } catch {
    // Offline or the server is unreachable. Keep what we last knew; with nothing saved, a
    // signed-in tester carries on (their saved session got them in before), and a visitor
    // sees the welcome screen.
    if (useBetaGate.getState().status !== undefined) return;
    useBetaGate.setState({
      forUser: who,
      status: account.user
        ? null
        : { enabled: true, endsOn: null, endsAt: null, ended: false, invited: false, isAdmin: false },
    });
  } finally {
    checking = null;
  }
}

/** Keeps the gate status current as people sign in and out. Call once, after initAccount. */
export function initBetaGate() {
  if (initialized) return;
  initialized = true;
  if (!getSupabase()) return;
  let lastUser: string | null | undefined;
  const check = () => {
    const { ready, user } = useAccount.getState();
    if (!ready) return;
    const id = user?.id ?? null;
    if (id === lastUser) return;
    lastUser = id;
    void refreshBetaStatus();
  };
  useAccount.subscribe(check);
  check();
  AppState.addEventListener("change", (state) => {
    if (state === "active") void refreshBetaStatus();
  });
}
