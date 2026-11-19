import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { TranslationSheet } from "../../components/read/translation-picker";
import { deleteAccount, signOut, useAccount } from "../../lib/auth/account";
import { TRANSLATIONS } from "../../lib/bible";
import { isDue } from "../../lib/srs";
import { isAccountsConfigured } from "../../lib/supabase";
import { getSyncStatus, onSyncStatus, SyncStatus } from "../../lib/sync";
import { useAppStore } from "../../store/useAppStore";

const BADGE_LABELS: Record<string, string> = {
  "read-7": "7-Day Reading Streak",
  "read-30": "30-Day Reading Streak",
  "read-100": "100-Day Reading Streak",
  "memory-7": "7-Day Memory Streak",
  "memory-30": "30-Day Memory Streak",
  "memory-100": "100-Day Memory Streak",
};

function StreakCard({
  icon,
  color,
  label,
  current,
  longest,
  freezes,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
  current: number;
  longest: number;
  freezes: number;
}) {
  return (
    <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
      <View className="flex-row items-center mb-2" style={{ gap: 6 }}>
        <Ionicons name={icon} size={16} color={color} />
        <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          {label}
        </Text>
      </View>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        {current} {current === 1 ? "day" : "days"}
      </Text>
      <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">Best: {longest}d</Text>
      <View className="flex-row items-center mt-2" style={{ gap: 4 }}>
        <Ionicons name="snow-outline" size={12} color="#9CA3AF" />
        <Text className="text-[11px] text-gray-400 dark:text-gray-500">
          {freezes} freeze{freezes === 1 ? "" : "s"}
        </Text>
      </View>
    </View>
  );
}

const SYNC_LABEL: Record<SyncStatus, string> = {
  off: "Saved to your account",
  syncing: "Syncing…",
  synced: "Synced to your account",
  error: "Couldn't sync just now. We'll try again.",
};

function useSyncStatus() {
  const [status, setStatus] = useState<SyncStatus>(getSyncStatus());
  useEffect(() => onSyncStatus(setStatus), []);
  return status;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
      {children}
    </Text>
  );
}

function SettingsRow({
  icon,
  label,
  value,
  onPress,
  danger,
  busy,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress: () => void;
  danger?: boolean;
  busy?: boolean;
}) {
  const color = danger ? "#DC2626" : "#4A6FA5";
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      accessibilityRole="button"
      className="flex-row items-center px-4 py-3.5 active:opacity-70"
    >
      <Ionicons name={icon} size={18} color={color} />
      <Text
        className={`flex-1 text-base ml-3 ${danger ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}
      >
        {label}
      </Text>
      {busy ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <>
          {value ? <Text className="text-sm text-gray-400 dark:text-gray-500 mr-1">{value}</Text> : null}
          {!danger && <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />}
        </>
      )}
    </Pressable>
  );
}

function Divider() {
  return <View className="h-px bg-gray-200 dark:bg-gray-700 ml-11" />;
}

function ConfirmDeleteSheet({
  visible,
  onCancel,
  onConfirm,
  busy,
  error,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  busy: boolean;
  error: string | null;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable className="flex-1 justify-end" style={{ backgroundColor: "#00000066" }} onPress={onCancel}>
        <Pressable className="bg-white dark:bg-gray-900 rounded-t-3xl px-6 pt-5" style={{ paddingBottom: 36 }}>
          <View className="self-center w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700 mb-5" />
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete your account?</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5 mb-6">
            This permanently deletes your account and everything saved to it: your memory verses,
            streaks, badges and tokens. It also clears them from this device. This can&apos;t be undone.
          </Text>
          {error && <Text className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</Text>}
          <Pressable
            onPress={onConfirm}
            disabled={busy}
            className="items-center justify-center rounded-2xl active:opacity-80"
            style={{ height: 50, backgroundColor: "#DC2626" }}
          >
            {busy ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-semibold text-white">Delete account</Text>
            )}
          </Pressable>
          <Pressable onPress={onCancel} className="items-center justify-center mt-2" style={{ height: 48 }}>
            <Text className="text-base font-semibold text-gray-500 dark:text-gray-400">Keep my account</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAccount((s) => s.user);
  const syncStatus = useSyncStatus();
  const translation = useAppStore((state) => state.translation);
  const setDisplayName = useAppStore((state) => state.setDisplayName);
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [translationOpen, setTranslationOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState<null | "signout" | "delete">(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const displayName = useAppStore((state) => state.displayName);
  const tokenBalance = useAppStore((state) => state.tokenBalance);
  const currentReadStreak = useAppStore((state) => state.currentReadStreak);
  const longestReadStreak = useAppStore((state) => state.longestReadStreak);
  const readStreakFreezesAvailable = useAppStore((state) => state.readStreakFreezesAvailable);
  const currentMemoryStreak = useAppStore((state) => state.currentMemoryStreak);
  const longestMemoryStreak = useAppStore((state) => state.longestMemoryStreak);
  const memoryStreakFreezesAvailable = useAppStore((state) => state.memoryStreakFreezesAvailable);
  const memoryDeck = useAppStore((state) => state.memoryDeck);
  const milestonesAchieved = useAppStore((state) => state.milestonesAchieved);

  const cardsMastered = memoryDeck.filter((c) => c.repetitions >= 3).length;
  const dueCount = memoryDeck.filter((c) => isDue(c.dueDate)).length;
  const translationName = TRANSLATIONS.find((t) => t.id === translation)?.name ?? translation;

  const startEditingName = () => {
    setDraftName(displayName === "You" ? "" : displayName);
    setEditingName(true);
  };
  const saveName = () => {
    const name = draftName.trim().slice(0, 40);
    if (name) setDisplayName(name);
    setEditingName(false);
  };
  const handleSignOut = async () => {
    setBusy("signout");
    await signOut();
    setBusy(null);
  };
  const handleDelete = async () => {
    setDeleteError(null);
    setBusy("delete");
    const problem = await deleteAccount();
    setBusy(null);
    if (problem) setDeleteError(problem);
    else setConfirmDelete(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center mb-6">
          <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mr-4">
            <Ionicons name="person" size={24} color="#4A6FA5" />
          </View>
          <View className="flex-1">
            {editingName ? (
              <TextInput
                value={draftName}
                onChangeText={setDraftName}
                onSubmitEditing={saveName}
                onBlur={saveName}
                autoFocus
                placeholder="Your first name"
                placeholderTextColor="#9CA3AF"
                maxLength={40}
                returnKeyType="done"
                className="text-2xl font-bold text-gray-900 dark:text-white border-b border-brand-blue py-0.5"
              />
            ) : (
              <Pressable
                onPress={startEditingName}
                accessibilityRole="button"
                accessibilityLabel="Edit your name"
                className="flex-row items-center active:opacity-70"
                style={{ gap: 6 }}
              >
                <Text className="text-2xl font-bold text-gray-900 dark:text-white" numberOfLines={1}>
                  {displayName}
                </Text>
                <Ionicons name="pencil" size={14} color="#9CA3AF" />
              </Pressable>
            )}
            <Text className="text-sm text-gray-400 dark:text-gray-500" numberOfLines={1}>
              {user ? (user.email ?? "Signed in") : "Guest · saved on this device only"}
            </Text>
          </View>
        </View>

        <View className="flex-row mb-8" style={{ gap: 10 }}>
          <StreakCard
            icon="book"
            color="#4A6FA5"
            label="Read Streak"
            current={currentReadStreak}
            longest={longestReadStreak}
            freezes={readStreakFreezesAvailable}
          />
          <StreakCard
            icon="albums"
            color="#C19A6B"
            label="Memory Streak"
            current={currentMemoryStreak}
            longest={longestMemoryStreak}
            freezes={memoryStreakFreezesAvailable}
          />
        </View>

        <Pressable
          onPress={() => router.push("/shop")}
          className="flex-row items-center rounded-2xl px-5 py-4 mb-8 active:opacity-80"
          style={{ backgroundColor: "#4A6FA5" }}
        >
          <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center mr-3">
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">{tokenBalance} tokens</Text>
            <Text className="text-xs text-white/80">Visit the Rewards Shop</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </Pressable>

        <SectionLabel>Your progress</SectionLabel>
        <View className="flex-row mb-8" style={{ gap: 10 }}>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {memoryDeck.length}
            </Text>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Cards in deck</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {cardsMastered}
            </Text>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Mastered</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 py-4">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">{dueCount}</Text>
            <Text className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Due today</Text>
          </View>
        </View>

        <SectionLabel>Badges</SectionLabel>
        {milestonesAchieved.length === 0 ? (
          <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-6 items-center">
            <Ionicons name="ribbon-outline" size={22} color="#9CA3AF" />
            <Text className="text-sm text-gray-400 dark:text-gray-500 mt-2 text-center">
              Keep your streak going to earn your first badge.
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap" style={{ gap: 8 }}>
            {milestonesAchieved.map((key) => (
              <View
                key={key}
                className="flex-row items-center rounded-2xl px-4 py-3"
                style={{ backgroundColor: "#C19A6B1A", borderWidth: 1, borderColor: "#C19A6B40" }}
              >
                <Ionicons name="ribbon" size={16} color="#C19A6B" />
                <Text className="text-xs font-semibold text-brand-earth ml-2">
                  {BADGE_LABELS[key] ?? key}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View className="mt-8">
          <SectionLabel>Settings</SectionLabel>
          <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 mb-8">
            <SettingsRow
              icon="book-outline"
              label="Translation"
              value={translationName}
              onPress={() => setTranslationOpen(true)}
            />
          </View>

          <SectionLabel>Account</SectionLabel>
          {user ? (
            <>
              <View className="rounded-2xl bg-gray-50 dark:bg-gray-800">
                <View className="flex-row items-center px-4 py-3.5">
                  <Ionicons
                    name={syncStatus === "error" ? "cloud-offline-outline" : "cloud-done-outline"}
                    size={18}
                    color={syncStatus === "error" ? "#C19A6B" : "#4A6FA5"}
                  />
                  <Text className="flex-1 text-sm text-gray-500 dark:text-gray-400 ml-3">
                    {SYNC_LABEL[syncStatus]}
                  </Text>
                </View>
                <Divider />
                <SettingsRow
                  icon="log-out-outline"
                  label="Sign out"
                  onPress={handleSignOut}
                  busy={busy === "signout"}
                />
                <Divider />
                <SettingsRow
                  icon="trash-outline"
                  label="Delete account"
                  danger
                  onPress={() => {
                    setDeleteError(null);
                    setConfirmDelete(true);
                  }}
                />
              </View>
              <Text className="text-xs text-gray-400 dark:text-gray-500 mt-3 leading-5">
                Signing out keeps your progress in your account and clears it from this device.
              </Text>
            </>
          ) : (
            <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-5">
              <View className="flex-row items-center mb-2" style={{ gap: 8 }}>
                <Ionicons name="cloud-upload-outline" size={18} color="#4A6FA5" />
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  Keep your progress safe
                </Text>
              </View>
              <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5 mb-4">
                {isAccountsConfigured
                  ? "Sign in to save your verses and streaks to your account and pick up on any device."
                  : "Accounts are coming soon. For now, your progress is saved on this device."}
              </Text>
              {isAccountsConfigured && (
                <Pressable
                  onPress={() => router.push("/sign-in")}
                  className="items-center justify-center rounded-2xl active:opacity-80"
                  style={{ height: 46, backgroundColor: "#4A6FA5" }}
                >
                  <Text className="text-base font-semibold text-white">Sign in or create an account</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <TranslationSheet visible={translationOpen} onClose={() => setTranslationOpen(false)} />
      <ConfirmDeleteSheet
        visible={confirmDelete}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        busy={busy === "delete"}
        error={deleteError}
      />
    </SafeAreaView>
  );
}
