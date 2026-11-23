import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { eventLabel, prettyDetail, relativeDay, screenLabel, shortTime } from "../lib/activity-events";
import { useAccount } from "../lib/auth/account";
import { getSupabase } from "../lib/supabase";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

interface Tester {
  user_id: string;
  email: string | null;
  signed_up_at: string;
  last_sign_in_at: string | null;
  last_active_at: string | null;
  days_active: number;
  ai_questions_week: number;
  ai_questions_logged: number;
  events: number;
  first_event_at: string | null;
  top_features: { event: string; n: number }[];
  top_screens: { screen: string; n: number }[];
  invited: boolean;
}

interface ActivityRow {
  created_at: string;
  user_id: string;
  email: string | null;
  event: string;
  screen: string | null;
  detail: string | null;
  platform: string | null;
}

type View_ = "people" | "activity";

function nameOf(email: string | null) {
  return email ? email.split("@")[0] : "Someone";
}

/** One line for an activity row: what they did, and where. */
function describe(row: ActivityRow) {
  if (row.event === "screen") return `Visited ${screenLabel(row.screen) || "a screen"}`;
  const detail = prettyDetail(row.detail);
  return detail ? `${eventLabel(row.event)} · ${detail}` : eventLabel(row.event);
}

function isThisWeek(iso: string | null) {
  return !!iso && Date.now() - new Date(iso).getTime() < 7 * 86400000;
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-3 py-3">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-4">{label}</Text>
    </View>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-8 mb-3">
      {children}
    </Text>
  );
}

function FeedRow({ row, showName, first }: { row: ActivityRow; showName: boolean; first: boolean }) {
  return (
    <View className={`px-4 py-3 ${first ? "" : "border-t border-gray-200 dark:border-gray-700"}`}>
      <Text className="text-sm text-gray-900 dark:text-white leading-5">
        {showName && <Text className="font-semibold">{nameOf(row.email)} </Text>}
        {describe(row)}
      </Text>
      <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
        {shortTime(row.created_at)}
        {row.platform ? ` · ${row.platform}` : ""}
      </Text>
    </View>
  );
}

function TesterCard({ tester, isMe }: { tester: Tester; isMe: boolean }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<ActivityRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (!next || rows) return;
    const supabase = getSupabase();
    if (!supabase) return;
    const { data, error } = await supabase.rpc("tester_activity", { p_user: tester.user_id, p_limit: 40 });
    if (error) setFailed(true);
    else setRows((data as ActivityRow[]) ?? []);
  };

  const recent = isThisWeek(tester.last_active_at);

  return (
    <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 mb-3 overflow-hidden">
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${tester.email ?? "Tester"}, last active ${relativeDay(tester.last_active_at)}`}
        className="px-4 pt-4 pb-3.5 active:opacity-80"
      >
        <View className="flex-row items-center">
          <View
            className="w-2 h-2 rounded-full mr-2.5"
            style={{ backgroundColor: recent ? BLUE : "#9CA3AF" }}
          />
          <Text className="flex-1 text-base font-semibold text-gray-900 dark:text-white" numberOfLines={1}>
            {tester.email ?? "No email"}
          </Text>
          {isMe && (
            <View className="rounded-full bg-brand-blue/10 px-2 py-0.5 ml-2">
              <Text className="text-[11px] font-semibold" style={{ color: BLUE }}>
                You
              </Text>
            </View>
          )}
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={16}
            color="#9CA3AF"
            style={{ marginLeft: 8 }}
          />
        </View>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-[18px]">
          Joined {relativeDay(tester.signed_up_at)} · Last active {relativeDay(tester.last_active_at)}
        </Text>

        <View className="flex-row mt-3" style={{ gap: 8 }}>
          {[
            { n: tester.days_active, label: tester.days_active === 1 ? "day active" : "days active" },
            { n: tester.ai_questions_week, label: "AI questions this week" },
            { n: tester.events, label: tester.events === 1 ? "action recorded" : "actions recorded" },
          ].map((s) => (
            <View key={s.label} className="flex-1 rounded-xl bg-white dark:bg-gray-900 px-2.5 py-2">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">{s.n}</Text>
              <Text className="text-[11px] text-gray-500 dark:text-gray-400 leading-[14px]">{s.label}</Text>
            </View>
          ))}
        </View>

        {tester.top_features.length > 0 ? (
          <View className="flex-row flex-wrap mt-3" style={{ gap: 6 }}>
            {tester.top_features.map((f) => (
              <View
                key={f.event}
                className="flex-row items-center rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-1"
              >
                <Text className="text-xs text-gray-700 dark:text-gray-200">{eventLabel(f.event)}</Text>
                <Text className="text-xs font-semibold ml-1.5" style={{ color: EARTH }}>
                  {f.n}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            No features recorded yet. They show once this person opens the updated app.
          </Text>
        )}
      </Pressable>

      {open && (
        <View className="border-t border-gray-200 dark:border-gray-700">
          {tester.top_screens.length > 0 && (
            <Text className="text-xs text-gray-500 dark:text-gray-400 px-4 pt-3 leading-4">
              Most visited: {tester.top_screens.map((s) => screenLabel(s.screen)).join(", ")}
            </Text>
          )}
          {failed ? (
            <Text className="text-sm text-red-600 dark:text-red-400 px-4 py-3">
              Their activity couldn&apos;t be loaded. Pull down to try again.
            </Text>
          ) : rows === null ? (
            <ActivityIndicator color={BLUE} style={{ paddingVertical: 16 }} />
          ) : rows.length === 0 ? (
            <Text className="text-sm text-gray-500 dark:text-gray-400 px-4 py-3">Nothing recorded yet.</Text>
          ) : (
            rows.map((row, i) => <FeedRow key={`${row.created_at}-${i}`} row={row} showName={false} first={i === 0} />)
          )}
        </View>
      )}
    </View>
  );
}

/** For the test organizer only: who is using Omeora, when, and which features. */
export default function TestersScreen() {
  const router = useRouter();
  const myId = useAccount((s) => s.user?.id ?? null);
  const [testers, setTesters] = useState<Tester[] | null>(null);
  const [feed, setFeed] = useState<ActivityRow[] | null>(null);
  const [invites, setInvites] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [view, setView] = useState<View_>("people");

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const [overview, activity, invited] = await Promise.all([
      supabase.rpc("tester_overview"),
      supabase.rpc("tester_activity", { p_limit: 150 }),
      supabase.rpc("list_beta_invites"),
    ]);
    if (overview.error || activity.error) {
      setError(
        overview.error?.code === "42501"
          ? "Only the test organizer can see this."
          : "Tester activity couldn't be loaded. Check your connection and try again."
      );
      return;
    }
    setError(null);
    setTesters((overview.data as Tester[]) ?? []);
    setFeed((activity.data as ActivityRow[]) ?? []);
    setInvites(((invited.data as { email: string }[] | null) ?? []).map((i) => i.email));
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const refresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const notYet = useMemo(() => {
    const joined = new Set((testers ?? []).map((t) => (t.email ?? "").toLowerCase()));
    return invites.filter((e) => !joined.has(e));
  }, [testers, invites]);

  const loggingSince = useMemo(() => {
    const firsts = (testers ?? []).map((t) => t.first_event_at).filter(Boolean) as string[];
    if (!firsts.length) return null;
    return firsts.sort()[0];
  }, [testers]);

  const others = (testers ?? []).filter((t) => t.user_id !== myId);
  const activeWeek = others.filter((t) => isThisWeek(t.last_active_at)).length;
  const aiWeek = others.reduce((sum, t) => sum + t.ai_questions_week, 0);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/profile"))}
          hitSlop={12}
          accessibilityLabel="Back"
          className="p-1 mr-2 active:opacity-60"
        >
          <Ionicons name="chevron-back" size={24} color={BLUE} />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">Testers</Text>
        <Pressable
          onPress={refresh}
          disabled={refreshing}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Refresh"
          className="p-1 active:opacity-60"
        >
          {refreshing ? <ActivityIndicator size="small" color={BLUE} /> : <Ionicons name="refresh" size={20} color={BLUE} />}
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 48 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={BLUE} />}
      >
        {error ? (
          <View className="flex-row items-start px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20">
            <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
            <Text className="flex-1 text-sm text-red-700 dark:text-red-300 ml-2">{error}</Text>
          </View>
        ) : testers === null ? (
          <ActivityIndicator color={BLUE} style={{ paddingVertical: 40 }} />
        ) : (
          <>
            <View className="flex-row" style={{ gap: 10 }}>
              <Stat value={`${others.length}/${Math.max(invites.length - 1, others.length)}`} label="testers signed up" />
              <Stat value={activeWeek} label="active this week" />
              <Stat value={aiWeek} label="AI questions this week" />
            </View>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-2 leading-4">
              Not counting you.
            </Text>

            <View
              className="flex-row rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 mt-6"
              accessibilityRole="tablist"
            >
              {(
                [
                  { id: "people", label: "People", icon: "people-outline" },
                  { id: "activity", label: "Recent activity", icon: "pulse-outline" },
                ] as const
              ).map((t) => {
                const active = view === t.id;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => setView(t.id)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    className={`flex-1 flex-row items-center justify-center rounded-xl py-2 ${
                      active ? "bg-white dark:bg-gray-700" : ""
                    }`}
                  >
                    <Ionicons name={t.icon} size={15} color={active ? BLUE : "#9CA3AF"} />
                    <Text
                      className={`text-sm font-semibold ml-1.5 ${
                        active ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {t.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {view === "people" ? (
              <>
                <View className="mt-5">
                  {testers.length === 0 ? (
                    <Text className="text-sm text-gray-500 dark:text-gray-400">No one has signed up yet.</Text>
                  ) : (
                    testers.map((t) => <TesterCard key={t.user_id} tester={t} isMe={t.user_id === myId} />)
                  )}
                </View>

                {notYet.length > 0 && (
                  <>
                    <SectionLabel>Invited, not signed up yet</SectionLabel>
                    <View className="rounded-2xl bg-gray-50 dark:bg-gray-800">
                      {notYet.map((email, i) => (
                        <View
                          key={email}
                          className={`flex-row items-center px-4 py-3 ${
                            i > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""
                          }`}
                        >
                          <Ionicons name="mail-outline" size={16} color="#9CA3AF" />
                          <Text className="flex-1 text-sm text-gray-700 dark:text-gray-300 ml-3" numberOfLines={1}>
                            {email}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}
              </>
            ) : (
              <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 mt-5">
                {feed && feed.length > 0 ? (
                  feed.map((row, i) => (
                    <FeedRow key={`${row.created_at}-${i}`} row={row} showName first={i === 0} />
                  ))
                ) : (
                  <Text className="text-sm text-gray-500 dark:text-gray-400 px-4 py-4">
                    Nothing recorded yet. Activity shows here once testers open the updated app.
                  </Text>
                )}
              </View>
            )}

            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-6 leading-5">
              {loggingSince
                ? `Features have been recorded since ${new Date(loggingSince).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}. `
                : "Features are recorded from now on. "}
              Days active and last active also count earlier sign-ins, synced saves and AI questions. AI
              questions this week come from the daily limit count, which keeps 7 days. Notes, AI questions and
              answers, and study answers are never recorded.
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
