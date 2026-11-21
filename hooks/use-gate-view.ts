import { useAccount } from "../lib/auth/account";
import { useBetaGate } from "../lib/auth/beta-gate";
import { gateView, GateView } from "../lib/beta";
import { isAccountsConfigured } from "../lib/supabase";

/** Which screen the invite-only test gate wants right now. */
export function useGateView(): GateView {
  const ready = useAccount((s) => s.ready);
  const userId = useAccount((s) => s.user?.id ?? null);
  // Only trust a status that was checked for whoever is signed in now.
  const status = useBetaGate((s) => (s.forUser === (userId ?? "guest") ? s.status : undefined));
  const signedIn = userId != null;
  return gateView({ accountsConfigured: isAccountsConfigured, accountReady: ready, signedIn, status });
}
