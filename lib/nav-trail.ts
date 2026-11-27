import { chapterTitle, getBook } from "./bible";
import { getPlan } from "./plans";

/**
 * The way back. Omeora's links jump between tabs and screens (a Home card opens a chapter, a
 * verse opens Ask AI, a saved answer opens the Reader), and a tab's own back only knows its own
 * stack. So the app keeps one trail of the places someone has been, in the order they went, and
 * the back control on every screen returns to the last one, wherever it was.
 *
 * A place is a screen instance (its navigation key), so going back lands on the very screen that
 * was left, still mounted, at the same chapter and scroll position. Pressing a tab in the tab bar
 * starts a fresh trail: that's someone choosing where to go, not following a link.
 */

/** Just the parts of React Navigation's state this needs. */
export type NavRoute = { key: string; name: string; params?: Record<string, unknown>; state?: NavState };
export type NavState = {
  type?: string;
  index?: number;
  routes: NavRoute[];
  history?: unknown[];
  [k: string]: unknown;
};

export type Place = {
  key: string;
  /** Route name of the screen and of each navigator above it, e.g. ["(tabs)", "read", "[book]/[chapter]"]. */
  path: string[];
  params: Record<string, string>;
  label: string;
};

/** Longest trail kept; older places drop off the start. */
export const TRAIL_LIMIT = 40;

/** The screen someone is looking at: the focused route all the way down. */
export function focusedPlace(state: NavState | undefined): Place | null {
  if (!state?.routes?.length) return null;
  const path: string[] = [];
  let s: NavState | undefined = state;
  let route: NavRoute | undefined;
  while (s?.routes?.length) {
    route = s.routes[Math.min(s.index ?? 0, s.routes.length - 1)];
    path.push(route.name);
    s = route.state;
  }
  if (!route) return null;
  const params = stringParams(route.params);
  return { key: route.key, path, params, label: placeLabel(path, params) };
}

function stringParams(params: Record<string, unknown> | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(params ?? {})) {
    // Nested-navigator bookkeeping (screen, params, initial) isn't part of the place.
    if (k === "screen" || k === "params" || k === "initial" || k === "state") continue;
    if (typeof v === "string") out[k] = v;
    else if (typeof v === "number" || typeof v === "boolean") out[k] = String(v);
  }
  return out;
}

const NAMES: Record<string, string> = {
  index: "Home",
  ai: "Ask AI",
  profile: "Profile",
  notes: "My notes",
  "answers/index": "Answers",
  "answers/[id]": "Answer",
  "journal/index": "Journal",
  "journal/entry": "Study",
  "memory/collection/[id]": "Memory",
  "memory/challenge": "Challenge",
  "memory/join": "Memory",
  "memory/review": "Memory",
  shop: "Shop",
  testers: "Testers",
  "invite-testers": "Invite testers",
  privacy: "Privacy",
  terms: "Terms",
};

/** What the back control says: "John 3", "Home", "Ask AI". */
export function placeLabel(path: string[], params: Record<string, string>): string {
  const name = path[path.length - 1] ?? "";
  const parent = path[path.length - 2];
  if (parent === "read") {
    if (name === "[book]/[chapter]") {
      const book = getBook(params.book);
      const chapter = Number(params.chapter);
      if (book && chapter) return chapterTitle(book.short ?? book.name, chapter);
    }
    if (name === "[book]/index") return getBook(params.book)?.name ?? "Read";
    return "Read";
  }
  if (parent === "study") {
    if (name === "plans/[id]") {
      const plan = getPlan(params.id);
      if (plan) return params.day ? `Day ${params.day}` : plan.title;
    }
    return "Study";
  }
  return NAMES[name] ?? "Back";
}

/** Whether a screen with this key is still anywhere in the navigation state (mounted). */
export function hasKey(state: NavState | undefined, key: string): boolean {
  if (!state?.routes) return false;
  return state.routes.some((r) => r.key === key || hasKey(r.state, key));
}

/**
 * Moves the trail on after the screen changed.
 * - tabPress: someone chose a tab, so the trail starts again from there.
 * - The screen is the one before the last: they went back, so the last place drops off.
 * - Same screen, new params: the place is updated.
 * - The last place's screen is gone from the state: it was replaced (paging to the next
 *   chapter, a redirect), so the new screen takes its spot rather than adding a step.
 * - Otherwise they went somewhere new: it's added.
 */
export function advanceTrail(
  trail: Place[],
  place: Place,
  state: NavState | undefined,
  opts: { tabPress?: boolean } = {}
): Place[] {
  if (opts.tabPress || trail.length === 0) return [place];
  const last = trail[trail.length - 1];
  if (last.key === place.key) {
    return samePlace(last, place) ? trail : [...trail.slice(0, -1), place];
  }
  // Back to a place already on the trail (the back control, browser back, a swipe): unwind to it.
  for (let i = trail.length - 2; i >= 0; i--) {
    if (trail[i].key === place.key) return [...trail.slice(0, i), place];
  }
  if (!hasKey(state, last.key)) {
    const before = trail[trail.length - 2];
    // Browser back can rebuild a screen under a new key; the address still matches.
    if (before && sameLocation(before, place)) return [...trail.slice(0, -2), place];
    return [...trail.slice(0, -1), place];
  }
  const next = [...trail, place];
  return next.length > TRAIL_LIMIT ? next.slice(next.length - TRAIL_LIMIT) : next;
}

function samePlace(a: Place, b: Place) {
  return a.label === b.label && sameLocation(a, b);
}

function sameLocation(a: Place, b: Place) {
  if (a.path.join("/") !== b.path.join("/")) return false;
  const ka = Object.keys(a.params);
  if (ka.length !== Object.keys(b.params).length) return false;
  return ka.every((k) => a.params[k] === b.params[k]);
}

/** The place the back control returns to, if the trail has one. */
export function previousPlace(trail: Place[], current: Place | null): Place | null {
  if (trail.length < 2) return null;
  const last = trail[trail.length - 1];
  if (current && last.key !== current.key) return null;
  return trail[trail.length - 2];
}

/**
 * True when the place is the screen right under the current one in the current stack (or the
 * screen showing under a page pushed over the tabs), so a plain stack back gets there, with the
 * usual animation.
 */
export function isDirectlyBelow(state: NavState | undefined, key: string): boolean {
  let s = state;
  while (s?.routes?.length) {
    const i = Math.min(s.index ?? 0, s.routes.length - 1);
    const route = s.routes[i];
    if (route.state?.routes?.length) {
      s = route.state;
      continue;
    }
    // s is the navigator holding the screen on show.
    if (s.type !== "stack" || i === 0) return false;
    return focusedPlace({ routes: [s.routes[i - 1]], index: 0 })?.key === key;
  }
  return false;
}

/**
 * The navigation state with the screen `key` brought back into view: each navigator on the way
 * focuses it, and a stack drops whatever was pushed above it (the same as going back). Screens
 * keep their keys, so nothing that stays is rebuilt. Returns null if the screen isn't there.
 */
export function focusKey(state: NavState, key: string): NavState | null {
  const i = state.routes.findIndex((r) => r.key === key || hasKey(r.state, key));
  if (i < 0) return null;
  const route = state.routes[i];
  let nextRoute = route;
  if (route.key !== key && route.state) {
    const inner = focusKey(route.state, key);
    if (!inner) return null;
    nextRoute = { ...route, state: inner };
  }
  if (state.type === "stack") {
    const routes = [...state.routes.slice(0, i), nextRoute];
    // Native stacks also keep a list of preloaded routes; any above the target go too.
    return { ...state, index: i, routes };
  }
  const routes = state.routes.map((r, j) => (j === i ? nextRoute : r));
  const next: NavState = { ...state, index: i, routes };
  if (Array.isArray(state.history)) {
    // Tab history (for the tab bar's own back behavior): the tab now shown goes last.
    const others = state.history.filter(
      (h) => !(h && typeof h === "object" && (h as { key?: string }).key === nextRoute.key)
    );
    next.history = [...others, { type: "route", key: nextRoute.key }];
  }
  return next;
}
