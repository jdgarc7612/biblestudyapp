import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { refreshBetaStatus, useBetaGate } from "../lib/auth/beta-gate";
import { formatTestDay, isValidEmail, normalizeEmail } from "../lib/beta";
import { getSupabase } from "../lib/supabase";

const BLUE = "#4A6FA5";
const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

interface Invite {
  email: string;
  created_at: string;
}

/** For the test organizer: who may sign in, and when the test ends. */
export default function InviteTestersScreen() {
  const router = useRouter();
  const status = useBetaGate((s) => s.status);
  const [invites, setInvites] = useState<Invite[] | null>(null);
  const [email, setEmail] = useState("");
  const [endsOn, setEndsOn] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data, error: problem } = await supabase.rpc("list_beta_invites");
    if (problem) setError("The invite list couldn't be loaded. Check your connection and try again.");
    else setInvites((data as Invite[]) ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (status?.endsOn) setEndsOn(status.endsOn);
  }, [status?.endsOn]);

  const run = async (key: string, fn: string, args: Record<string, unknown>, done: string) => {
    const supabase = getSupabase();
    if (!supabase) return false;
    setError(null);
    setNotice(null);
    setBusy(key);
    const { error: problem } = await supabase.rpc(fn, args);
    setBusy(null);
    if (problem) {
      setError(
        problem.code === "42501"
          ? "Only the test organizer can change this."
          : problem.code === "22023"
            ? problem.message
            : "That didn't save. Check your connection and try again."
      );
      return false;
    }
    setNotice(done);
    return true;
  };

  const add = async () => {
    const address = normalizeEmail(email);
    if (!isValidEmail(address)) {
      setError("That email address doesn't look right.");
      return;
    }
    if (await run("add", "add_beta_invite", { p_email: address }, `${address} can now sign in.`)) {
      setEmail("");
      await load();
    }
  };

  const remove = async (address: string) => {
    if (await run(address, "remove_beta_invite", { p_email: address }, `${address} was removed.`)) {
      await load();
    }
  };

  const saveSettings = async (enabled: boolean | null, day: string | null, done: string) => {
    if (day !== null && !DAY_PATTERN.test(day)) {
      setError("Write the last day as YYYY-MM-DD, for example 2026-12-20.");
      return;
    }
    if (await run("settings", "set_beta_settings", { p_enabled: enabled, p_ends_on: day }, done)) {
      await refreshBetaStatus();
    }
  };

  const gateOn = status?.enabled ?? true;
  const inputClass =
    "text-base text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3";

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
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">Invite testers</Text>
        {invites && <Text className="text-sm text-gray-400 dark:text-gray-500">{invites.length}</Text>}
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 48 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5 mb-4">
            Add someone&apos;s email and they can sign in with a code from that address. Nobody else can
            make an account while the test is on.
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="friend@example.com"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="done"
            onSubmitEditing={add}
            className={inputClass}
            accessibilityLabel="Email to invite"
          />
          <Pressable
            onPress={add}
            disabled={!!busy}
            accessibilityRole="button"
            className="items-center justify-center rounded-2xl mt-3 active:opacity-80"
            style={{ height: 48, backgroundColor: BLUE }}
          >
            {busy === "add" ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-semibold text-white">Add tester</Text>
            )}
          </Pressable>

          {error && (
            <View className="flex-row items-start mt-4 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20">
              <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
              <Text className="flex-1 text-sm text-red-700 dark:text-red-300 ml-2">{error}</Text>
            </View>
          )}
          {notice && !error && (
            <View className="flex-row items-start mt-4 px-3 py-2.5 rounded-xl bg-brand-blue/10">
              <Ionicons name="checkmark-circle-outline" size={16} color={BLUE} />
              <Text className="flex-1 text-sm text-gray-700 dark:text-gray-200 ml-2">{notice}</Text>
            </View>
          )}

          <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-8 mb-3">
            Invited
          </Text>
          <View className="rounded-2xl bg-gray-50 dark:bg-gray-800">
            {invites === null ? (
              <ActivityIndicator color={BLUE} style={{ paddingVertical: 20 }} />
            ) : invites.length === 0 ? (
              <Text className="text-sm text-gray-500 dark:text-gray-400 px-4 py-4">No one yet.</Text>
            ) : (
              invites.map((invite, i) => (
                <View
                  key={invite.email}
                  className={`flex-row items-center px-4 py-3 ${i > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}`}
                >
                  <Ionicons name="mail-outline" size={16} color={BLUE} />
                  <Text className="flex-1 text-base text-gray-900 dark:text-white ml-3" numberOfLines={1}>
                    {invite.email}
                  </Text>
                  <Pressable
                    onPress={() => remove(invite.email)}
                    disabled={!!busy}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${invite.email}`}
                  >
                    {busy === invite.email ? (
                      <ActivityIndicator size="small" color="#DC2626" />
                    ) : (
                      <Text className="text-sm text-red-600 dark:text-red-400">Remove</Text>
                    )}
                  </Pressable>
                </View>
              ))
            )}
          </View>
          <Text className="text-xs text-gray-400 dark:text-gray-500 mt-3 leading-5">
            Removing someone stops their access the next time the app checks. The same list is in
            Supabase under Table Editor, beta_invites, if you ever need it.
          </Text>

          <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-8 mb-3">
            The test
          </Text>
          <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
            <View className="flex-row items-center">
              <View className="flex-1 pr-3">
                <Text className="text-base text-gray-900 dark:text-white">Invite only</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-4">
                  {gateOn
                    ? "On: only invited people can use Omeora."
                    : "Off: anyone with the link can use Omeora."}
                </Text>
              </View>
              <Switch
                value={gateOn}
                disabled={busy === "settings"}
                onValueChange={(on) =>
                  saveSettings(on, null, on ? "Invite only is on." : "Invite only is off. Anyone with the link can use Omeora.")
                }
                trackColor={{ true: BLUE }}
                accessibilityLabel="Invite only"
              />
            </View>
            <View className="h-px bg-gray-200 dark:bg-gray-700 my-4" />
            <Text className="text-base text-gray-900 dark:text-white mb-1">Last day of the test</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-4">
              {status?.endsOn
                ? `Ends at the end of ${formatTestDay(status.endsOn)} (Central time). After that, testers see a thank-you screen.`
                : "After this day, testers see a thank-you screen."}
            </Text>
            <View className="flex-row" style={{ gap: 10 }}>
              <TextInput
                value={endsOn}
                onChangeText={setEndsOn}
                placeholder="2026-12-20"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                maxLength={10}
                className={`flex-1 ${inputClass}`}
                accessibilityLabel="Last day of the test, as year-month-day"
              />
              <Pressable
                onPress={() => saveSettings(null, endsOn.trim(), `The test now runs through ${formatTestDay(endsOn.trim())}.`)}
                disabled={!!busy}
                accessibilityRole="button"
                className="items-center justify-center rounded-2xl px-5 active:opacity-80"
                style={{ backgroundColor: BLUE }}
              >
                {busy === "settings" ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-sm font-semibold text-white">Save</Text>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
