import test from "node:test";
import assert from "node:assert/strict";

import {
  friendlySignInError,
  gateView,
  INVITE_ONLY_MESSAGE,
  isTestOver,
  isValidEmail,
  normalizeEmail,
  parseBetaStatus,
  TEST_ENDED_MESSAGE,
  type BetaStatus,
} from "../lib/beta";

// End of Dec 20, 2026 in America/Chicago (CST, UTC-6) is Dec 21 06:00 UTC.
const ENDS_AT = "2026-12-21T06:00:00+00:00";
const ON: BetaStatus = {
  enabled: true,
  endsOn: "2026-12-20",
  endsAt: ENDS_AT,
  ended: false,
  invited: false,
  isAdmin: false,
};
const DURING = new Date("2026-12-20T23:59:00-06:00");
const AFTER = new Date("2026-12-21T00:00:00-06:00");

test("emails are trimmed and lowercased", () => {
  assert.equal(normalizeEmail("  Friend@Example.COM "), "friend@example.com");
  assert.ok(isValidEmail(" Friend@Example.com "));
  assert.ok(!isValidEmail("friend@example"));
  assert.ok(!isValidEmail("two words@example.com"));
});

test("the test window closes at the end of the last day", () => {
  assert.equal(isTestOver(ON, DURING), false);
  assert.equal(isTestOver(ON, AFTER), true);
  assert.equal(isTestOver({ ended: true, endsAt: ENDS_AT }, DURING), true);
  assert.equal(isTestOver({ ended: false, endsAt: null }, AFTER), false);
});

test("reads the database answer", () => {
  assert.deepEqual(
    parseBetaStatus({ enabled: true, ends_on: "2026-12-20", ends_at: ENDS_AT, ended: false, invited: true, is_admin: false }),
    { ...ON, invited: true }
  );
  assert.equal(parseBetaStatus(null), null);
  assert.equal(parseBetaStatus({ enabled: false })?.enabled, false);
});

test("which screen the gate shows", () => {
  const base = { accountsConfigured: true, accountReady: true, signedIn: false, now: DURING };
  assert.equal(gateView({ ...base, accountsConfigured: false, status: undefined }), "open");
  assert.equal(gateView({ ...base, accountReady: false, status: ON }), "loading");
  assert.equal(gateView({ ...base, status: undefined }), "loading");
  assert.equal(gateView({ ...base, status: null }), "open"); // gate not set up yet
  assert.equal(gateView({ ...base, status: { ...ON, enabled: false } }), "open");
  assert.equal(gateView({ ...base, status: ON }), "welcome");
  assert.equal(gateView({ ...base, signedIn: true, status: ON }), "not-invited");
  assert.equal(gateView({ ...base, signedIn: true, status: { ...ON, invited: true } }), "open");
  assert.equal(gateView({ ...base, now: AFTER, status: ON }), "ended");
  assert.equal(gateView({ ...base, now: AFTER, signedIn: true, status: { ...ON, invited: true } }), "ended");
  assert.equal(gateView({ ...base, now: AFTER, signedIn: true, status: { ...ON, isAdmin: true } }), "open");
});

test("sign-in errors become plain words", () => {
  assert.equal(friendlySignInError("Database error saving new user"), INVITE_ONLY_MESSAGE);
  assert.equal(friendlySignInError(INVITE_ONLY_MESSAGE), INVITE_ONLY_MESSAGE);
  assert.equal(friendlySignInError(TEST_ENDED_MESSAGE), TEST_ENDED_MESSAGE);
  assert.match(friendlySignInError("email rate limit exceeded"), /wait a minute/);
  assert.equal(friendlySignInError("Something else"), "Something else");
});
