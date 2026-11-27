import test from "node:test";
import assert from "node:assert/strict";

import { advanceTrail, focusKey, focusedPlace, isDirectlyBelow, previousPlace, type NavState } from "../lib/nav-trail";

// Root stack > tabs > (Home | Read stack | Ask AI), the shape Omeora's navigation has.
function root(opts: { tab: number; read: { key: string; name: string; params?: Record<string, unknown> }[]; over?: string }): NavState {
  const tabs: NavState = {
    type: "tab",
    index: opts.tab,
    history: [{ type: "route", key: "home" }],
    routes: [
      { key: "home", name: "index" },
      { key: "read", name: "read", state: { type: "stack", index: opts.read.length - 1, routes: opts.read } },
      { key: "ai", name: "ai", params: { question: "Why?" } },
    ],
  };
  const routes = [{ key: "tabs", name: "(tabs)", state: tabs }];
  if (opts.over) routes.push({ key: opts.over, name: "notes" } as never);
  return { type: "stack", index: routes.length - 1, routes };
}

const READ_INDEX = { key: "r0", name: "index" };
const JOHN3 = { key: "j3", name: "[book]/[chapter]", params: { book: "john", chapter: "3", v: 16 } };
const ROM8 = { key: "r8", name: "[book]/[chapter]", params: { book: "romans", chapter: "8" } };

test("focusedPlace: the screen on show, with a label", () => {
  const p = focusedPlace(root({ tab: 1, read: [READ_INDEX, JOHN3] }));
  assert.equal(p?.key, "j3");
  assert.deepEqual(p?.path, ["(tabs)", "read", "[book]/[chapter]"]);
  assert.equal(p?.params.v, "16");
  assert.equal(p?.label, "John 3");
  assert.equal(focusedPlace(root({ tab: 0, read: [READ_INDEX] }))?.label, "Home");
  assert.equal(focusedPlace(root({ tab: 2, read: [READ_INDEX] }))?.label, "Ask AI");
});

test("advanceTrail: following links adds places, going back unwinds", () => {
  const home = root({ tab: 0, read: [READ_INDEX] });
  const atJohn = root({ tab: 1, read: [READ_INDEX, JOHN3] });
  const atAi = root({ tab: 2, read: [READ_INDEX, JOHN3] });
  let trail = advanceTrail([], focusedPlace(home)!, home);
  trail = advanceTrail(trail, focusedPlace(atJohn)!, atJohn);
  trail = advanceTrail(trail, focusedPlace(atAi)!, atAi);
  assert.deepEqual(trail.map((p) => p.label), ["Home", "John 3", "Ask AI"]);
  assert.equal(previousPlace(trail, focusedPlace(atAi))?.label, "John 3");
  trail = advanceTrail(trail, focusedPlace(atJohn)!, atJohn);
  assert.deepEqual(trail.map((p) => p.label), ["Home", "John 3"]);
  assert.equal(previousPlace(trail, focusedPlace(atJohn))?.label, "Home");
});

test("advanceTrail: a tab press starts fresh; paging replaces", () => {
  const atJohn = root({ tab: 1, read: [READ_INDEX, JOHN3] });
  const atAi = root({ tab: 2, read: [READ_INDEX, JOHN3] });
  let trail = advanceTrail([], focusedPlace(atJohn)!, atJohn);
  trail = advanceTrail(trail, focusedPlace(atAi)!, atAi, { tabPress: true });
  assert.equal(trail.length, 1);
  assert.equal(previousPlace(trail, focusedPlace(atAi)), null);

  const home = root({ tab: 0, read: [READ_INDEX] });
  const paged = root({ tab: 1, read: [READ_INDEX, { ...JOHN3, key: "j4", params: { book: "john", chapter: "4" } }] });
  trail = advanceTrail([focusedPlace(home)!], focusedPlace(atJohn)!, atJohn);
  trail = advanceTrail(trail, focusedPlace(paged)!, paged);
  assert.deepEqual(trail.map((p) => p.label), ["Home", "John 4"]);
});

test("isDirectlyBelow: a plain stack back gets there", () => {
  const s = root({ tab: 1, read: [READ_INDEX, JOHN3, ROM8] });
  assert.equal(isDirectlyBelow(s, "j3"), true);
  assert.equal(isDirectlyBelow(s, "home"), false);
  // A page pushed over the tabs goes back to whatever the tabs show.
  const over = root({ tab: 1, read: [READ_INDEX, JOHN3], over: "notes1" });
  assert.equal(isDirectlyBelow(over, "j3"), true);
  // Another tab is never a stack back.
  assert.equal(isDirectlyBelow(root({ tab: 2, read: [READ_INDEX, JOHN3] }), "j3"), false);
});

test("focusKey: switches tab without touching the other stacks, pops what was above", () => {
  const atAi = root({ tab: 2, read: [READ_INDEX, JOHN3] });
  const back = focusKey(atAi, "j3")!;
  assert.equal(focusedPlace(back)?.key, "j3");
  const tabs = back.routes[0].state!;
  assert.equal(tabs.index, 1);
  assert.equal(tabs.routes[1].state!.routes.length, 2);
  assert.deepEqual(tabs.history!.at(-1), { type: "route", key: "read" });

  const over = root({ tab: 1, read: [READ_INDEX, JOHN3, ROM8], over: "notes1" });
  const home = focusKey(over, "home")!;
  assert.equal(home.routes.length, 1);
  assert.equal(focusedPlace(home)?.key, "home");
  // The Read stack stays as it was: tapping Read still shows Romans 8.
  assert.equal(home.routes[0].state!.routes[1].state!.routes.length, 3);
  assert.equal(focusKey(over, "missing"), null);
});
