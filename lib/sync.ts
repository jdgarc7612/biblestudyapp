/** Sends this device's progress to the signed-in account and back. Merge rules: sync-merge.ts. */
import { AppState } from "react-native";

import { useAppStore } from "../store/useAppStore";
import { getSupabase } from "./supabase";
import { mergeSyncData, snapshot, SYNCED_KEYS, SyncData } from "./sync-merge";

// ---------------------------------------------------------------------------
// Talking to Supabase

const PUSH_DELAY_MS = 2500;
const PULL_THROTTLE_MS = 60_000;

let userId: string | null = null;
let applyingRemote = false;
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let lastPullAt = 0;
let started = false;

export type SyncStatus = "off" | "syncing" | "synced" | "error";
const listeners = new Set<(s: SyncStatus) => void>();
let status: SyncStatus = "off";
function setStatus(next: SyncStatus) {
  status = next;
  listeners.forEach((l) => l(next));
}
export function getSyncStatus() {
  return status;
}
export function onSyncStatus(listener: (s: SyncStatus) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function whenHydrated(): Promise<void> {
  if (useAppStore.persist.hasHydrated()) return Promise.resolve();
  return new Promise((resolve) => {
    const unsub = useAppStore.persist.onFinishHydration(() => {
      unsub();
      resolve();
    });
  });
}

async function push(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || !userId) return;
  pushTimer = null;
  setStatus("syncing");
  const { error } = await supabase.from("user_data").upsert({
    user_id: userId,
    data: snapshot(useAppStore.getState()),
    updated_at: new Date().toISOString(),
  });
  setStatus(error ? "error" : "synced");
}

/** Reads the account's copy, merges it into this device, and writes the result back. */
export async function pullAndMerge(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || !userId) return;
  const forUser = userId;
  lastPullAt = Date.now();
  await whenHydrated();
  setStatus("syncing");
  const { data, error } = await supabase
    .from("user_data")
    .select("data")
    .eq("user_id", forUser)
    .maybeSingle();
  if (error || userId !== forUser) {
    setStatus("error");
    return;
  }

  const state = useAppStore.getState();
  const joining = state.syncedUserId !== forUser;
  const remote = data?.data as SyncData | undefined;
  if (remote) {
    const merged = mergeSyncData(snapshot(state), remote, joining);
    const { updatedAt, ...fields } = merged;
    applyingRemote = true;
    useAppStore.setState({ ...fields, syncUpdatedAt: updatedAt, syncedUserId: forUser });
    applyingRemote = false;
  } else {
    // A new account: this device's guest progress becomes the account's.
    useAppStore.setState({ syncedUserId: forUser });
  }
  await push();
}

function schedulePush() {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => void push(), PUSH_DELAY_MS);
}

/** Sends any change still waiting, e.g. just before signing out. */
export async function flushSync(): Promise<void> {
  if (pushTimer) {
    clearTimeout(pushTimer);
    await push();
  }
}

/** Called whenever the signed-in account changes (null when signed out). */
export async function setSyncUser(id: string | null): Promise<void> {
  if (id === userId) return;
  userId = id;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = null;
  if (id) await pullAndMerge();
  else setStatus("off");
}

/** Starts watching for local changes. Safe to call more than once. */
export function startSync() {
  if (started) return;
  started = true;
  // Loading saved data from the device isn't a change, so watch only once that's done.
  void whenHydrated().then(watchChanges);

  AppState.addEventListener("change", (s) => {
    if (s === "active" && userId && Date.now() - lastPullAt > PULL_THROTTLE_MS) void pullAndMerge();
    if (s !== "active") void flushSync();
  });
}

function watchChanges() {
  useAppStore.subscribe((state, prev) => {
    if (applyingRemote) return;
    const changed = SYNCED_KEYS.some((key) => state[key] !== prev[key]);
    if (!changed) return;
    useAppStore.setState({ syncUpdatedAt: Date.now() });
    if (userId) schedulePush();
  });
}

