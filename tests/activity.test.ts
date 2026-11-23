import test from "node:test";
import assert from "node:assert/strict";

import { eventLabel, normalizeScreen, prettyDetail, relativeDay } from "../lib/activity-events";

test("chapter addresses count as reading a chapter", () => {
  assert.deepEqual(normalizeScreen("/read/john/3"), { screen: "/read/[book]/[chapter]", detail: "john 3" });
  assert.deepEqual(normalizeScreen("/read/romans"), { screen: "/read/[book]", detail: "romans" });
  assert.deepEqual(normalizeScreen("/read"), { screen: "/read", detail: null });
});

test("ids are dropped from answer addresses, plans keep their id", () => {
  assert.deepEqual(normalizeScreen("/answers/abc123"), { screen: "/answers/[id]", detail: null });
  assert.deepEqual(normalizeScreen("/study/plans/meet-jesus"), { screen: "/study/plans/[id]", detail: "meet-jesus" });
  assert.deepEqual(normalizeScreen("/"), { screen: "/", detail: null });
  assert.deepEqual(normalizeScreen("/profile/"), { screen: "/profile", detail: null });
});

test("details and labels read naturally", () => {
  assert.equal(prettyDetail("john 3"), "John 3");
  assert.equal(prettyDetail("1corinthians 13"), "1 Corinthians 13");
  assert.equal(eventLabel("go_deeper"), "Opened Go Deeper");
  assert.equal(eventLabel("something_new"), "something new");
});

test("relative days", () => {
  const now = new Date(2026, 10, 23, 15, 0);
  assert.equal(relativeDay(new Date(2026, 10, 23, 1, 0).toISOString(), now), "Today");
  assert.equal(relativeDay(new Date(2026, 10, 22, 23, 0).toISOString(), now), "Yesterday");
  assert.equal(relativeDay(new Date(2026, 10, 20, 9, 0).toISOString(), now), "3 days ago");
  assert.equal(relativeDay(null, now), "Never");
});
