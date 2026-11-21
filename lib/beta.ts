/**
 * The invite-only test gate, as plain helpers (no React, no Supabase) so they can be tested.
 * The real enforcement is in the database (supabase/schema.sql); the app uses these to show
 * the right screen.
 */

export interface BetaStatus {
  /** The gate is switched on. When false, Omeora is open to everyone. */
  enabled: boolean;
  /** Last day of the test, YYYY-MM-DD (in the test's time zone). */
  endsOn: string | null;
  /** The exact moment the test ends (ISO), so the app can tell offline. */
  endsAt: string | null;
  /** The server already says the test is over. */
  ended: boolean;
  /** The signed-in email is on the invite list. */
  invited: boolean;
  /** The signed-in email is the organizer's. */
  isAdmin: boolean;
}

export type GateView = "loading" | "open" | "welcome" | "not-invited" | "ended";

export const INVITE_ONLY_MESSAGE =
  "This test is invite-only. If you were invited, use that email, or ask Josh to add you.";
export const TEST_ENDED_MESSAGE = "Thanks for trying Omeora. This private test has ended.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** How invite emails are stored and compared: trimmed and lowercased. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(normalizeEmail(email));
}

/** True once the test window has closed. */
export function isTestOver(status: Pick<BetaStatus, "ended" | "endsAt">, now: Date = new Date()): boolean {
  if (status.ended) return true;
  if (!status.endsAt) return false;
  const end = Date.parse(status.endsAt);
  return Number.isFinite(end) && now.getTime() >= end;
}

/** Reads the database's beta_status() answer, tolerating missing fields. */
export function parseBetaStatus(raw: unknown): BetaStatus | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  return {
    enabled: r.enabled === true,
    endsOn: typeof r.ends_on === "string" ? r.ends_on : null,
    endsAt: typeof r.ends_at === "string" ? r.ends_at : null,
    ended: r.ended === true,
    invited: r.invited === true,
    isAdmin: r.is_admin === true,
  };
}

/**
 * Which screen to show. `status` is null when the gate isn't set up in the database
 * (Omeora stays open, as before), undefined while it's still being checked.
 */
export function gateView(args: {
  accountsConfigured: boolean;
  accountReady: boolean;
  signedIn: boolean;
  status: BetaStatus | null | undefined;
  now?: Date;
}): GateView {
  const { accountsConfigured, accountReady, signedIn, status } = args;
  if (!accountsConfigured) return "open";
  if (!accountReady || status === undefined) return "loading";
  if (status === null || !status.enabled) return "open";
  if (signedIn && status.isAdmin) return "open";
  if (isTestOver(status, args.now)) return "ended";
  if (!signedIn) return "welcome";
  return status.invited ? "open" : "not-invited";
}

/** Turns a sign-in error from the server into words a tester understands. */
export function friendlySignInError(message: string): string {
  if (/ended/i.test(message)) return TEST_ENDED_MESSAGE;
  if (/invite|signups? not allowed|database error saving new user|not allowed/i.test(message)) {
    return INVITE_ONLY_MESSAGE;
  }
  if (/rate limit/i.test(message)) {
    return "Too many codes were sent just now. Please wait a minute and try again.";
  }
  return message;
}

/** "Saturday, December 20" for a YYYY-MM-DD day. */
export function formatTestDay(day: string | null): string {
  if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return "";
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
