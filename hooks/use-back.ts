import { useRoute } from "@react-navigation/native";
import { useNavigationContainerRef, useRouter, type Href } from "expo-router";
import { useCallback } from "react";
import { create } from "zustand";

import {
  advanceTrail,
  focusKey,
  isDirectlyBelow,
  previousPlace,
  type NavState,
  type Place,
} from "../lib/nav-trail";

type TrailStore = {
  trail: Place[];
  /** Set when a tab bar button is pressed; the next screen change starts a fresh trail. */
  tabPressed: boolean;
  /** Set when going back had to open a place again; the next screen change lands there. */
  returningTo: number | null;
};

export const useTrail = create<TrailStore>(() => ({ trail: [], tabPressed: false, returningTo: null }));

let tabPressTimer: ReturnType<typeof setTimeout> | undefined;
export function markTabPress() {
  useTrail.setState({ tabPressed: true });
  // Pressing the tab already on show may change nothing; don't let the mark wait for a later link.
  clearTimeout(tabPressTimer);
  tabPressTimer = setTimeout(() => useTrail.setState({ tabPressed: false }), 400);
}

/** Called by the root layout every time the navigation state changes. */
export function recordPlace(place: Place, state: NavState | undefined) {
  const { trail, tabPressed, returningTo } = useTrail.getState();
  let next: Place[];
  if (returningTo !== null && returningTo <= trail.length) next = [...trail.slice(0, returningTo), place];
  else next = advanceTrail(trail, place, state, { tabPress: tabPressed });
  useTrail.setState({ trail: next, tabPressed: false, returningTo: null });
}

/** "/read/[book]/[chapter]" from the route names of a place, for opening it again. */
function hrefFor(place: Place): Href {
  const segments = place.path
    .filter((name) => !name.startsWith("__")) // the router's own root
    .flatMap((name) => name.split("/"))
    .filter((s) => s !== "index");
  return { pathname: `/${segments.join("/")}`, params: place.params } as Href;
}

/**
 * The back control for the screen this is used in. `label` is where it goes ("John 3", "Home"),
 * when someone got here by following a link; `goBack` returns there, to the same screen, chapter
 * and scroll position. With no trail it falls back to the stack's own back, then `fallback`.
 */
export function useBack(fallback?: Href) {
  const router = useRouter();
  const navRef = useNavigationContainerRef();
  const route = useRoute();
  const trail = useTrail((s) => s.trail);
  const prev = previousPlace(trail, { key: route.key, path: [], params: {}, label: "" });

  const goBack = useCallback(() => {
    const state = navRef.isReady() ? (navRef.getRootState() as unknown as NavState) : undefined;
    if (prev && state) {
      if (isDirectlyBelow(state, prev.key)) {
        router.back();
        return;
      }
      const next = focusKey(state, prev.key);
      if (next) {
        navRef.resetRoot(next as never);
        return;
      }
      // The screen was closed since (for example the app reloaded); open it again.
      useTrail.setState({ returningTo: useTrail.getState().trail.length - 2 });
      router.navigate(hrefFor(prev));
      return;
    }
    if (router.canGoBack()) router.back();
    else if (fallback) router.replace(fallback);
  }, [prev, navRef, router, fallback]);

  return { label: prev?.label ?? null, canGoBack: !!prev, goBack };
}
