import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { serifFont } from "../constants/fonts";
import { useGateView } from "../hooks/use-gate-view";
import { deleteAccount, signOut, useAccount } from "../lib/auth/account";
import { useBetaGate } from "../lib/auth/beta-gate";
import { formatTestDay } from "../lib/beta";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

/**
 * The front door during the private test: a welcome for visitors, and a kind "not yet" for
 * anyone who isn't on the invite list or arrives after the test has ended.
 */
export default function WelcomeScreen() {
  const router = useRouter();
  const view = useGateView();
  const user = useAccount((s) => s.user);
  const endsOn = useBetaGate((s) => s.status?.endsOn ?? null);
  const lastDay = formatTestDay(endsOn);

  if (view === "loading" || view === "open") {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 items-center justify-center">
        <Brand />
        <ActivityIndicator color={BLUE} style={{ marginTop: 28 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32 }}
      >
        <View className="w-full self-center flex-1" style={{ maxWidth: 440 }}>
          <Brand />

          <View className={view === "welcome" ? "mt-8 flex-1" : "mt-12 flex-1"}>
            {view === "welcome" && (
              <>
                <AppSummary />
                <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 pt-5 pb-5">
                  <Text
                    className="text-xl text-gray-900 dark:text-white mb-2"
                    style={{ fontFamily: serifFont }}
                  >
                    You&apos;re invited to an early look.
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5 mb-3">
                    Omeora is in a small, private test with family and friends. Sign in with the
                    email you were invited at, and we&apos;ll send you a short code. No password
                    needed.
                  </Text>
                  {lastDay ? (
                    <Text className="text-sm text-gray-400 dark:text-gray-500">
                      The test runs through {lastDay}.
                    </Text>
                  ) : null}
                </View>
              </>
            )}

            {view === "not-invited" && (
              <>
                <Notice icon="mail-unread-outline" title="This test is invite-only">
                  If you were invited, use that email, or ask Josh to add you.
                </Notice>
                {user?.email ? (
                  <Text className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                    You&apos;re signed in as {user.email}.
                  </Text>
                ) : null}
                <PrimaryButton
                  label="Use a different email"
                  onPress={() => void signOut()}
                />
                <AccountActions showSignOut={false} />
              </>
            )}

            {view === "ended" && (
              <>
                <Notice icon="heart-outline" title="Thanks for trying Omeora">
                  This private test has ended. Thank you for reading, studying and sharing your
                  thoughts along the way.
                </Notice>
                {user ? (
                  <AccountActions showSignOut />
                ) : (
                  <Pressable onPress={() => router.push("/sign-in")} hitSlop={8} className="self-start mt-2">
                    <Text className="text-sm text-gray-400 dark:text-gray-500">Organizer? Sign in</Text>
                  </Pressable>
                )}
              </>
            )}
          </View>

          <View className="flex-row justify-center mt-10" style={{ gap: 20 }}>
            <Pressable onPress={() => router.push("/privacy")} hitSlop={8}>
              <Text className="text-xs text-gray-400 dark:text-gray-500">Privacy Policy</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/terms")} hitSlop={8}>
              <Text className="text-xs text-gray-400 dark:text-gray-500">Terms of Use</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {view === "welcome" && (
        // The way in stays in reach while visitors read what Omeora offers.
        <View className="px-6 pt-3 pb-4 border-t border-gray-100 dark:border-gray-800">
          <View className="w-full self-center" style={{ maxWidth: 440 }}>
            <PrimaryButton label="Sign in with your invite email" onPress={() => router.push("/sign-in")} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

/** What Omeora is and what you get, for people who haven't signed in yet. */
const FEATURES: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }[] = [
  {
    icon: "book-outline",
    title: "Read",
    body: "The whole Bible in BSB, WEB and KJV. Highlight, take notes and save verses.",
  },
  {
    icon: "layers-outline",
    title: "Study every chapter",
    body: "Background, theology and application for each New Testament chapter, plus the Hebrew and Greek behind every word.",
  },
  {
    icon: "chatbubble-ellipses-outline",
    title: "Ask AI",
    body: "Ask any Bible question and get a clear, patient answer grounded in Scripture.",
  },
  {
    icon: "compass-outline",
    title: "Guided studies",
    body: "Day-by-day reading plans with questions to help you reflect.",
  },
  {
    icon: "albums-outline",
    title: "Memorize",
    body: "Hide God's Word in your heart with flashcards, listening and spaced review.",
  },
];

function AppSummary() {
  return (
    <View className="mb-7">
      <Text
        className="text-2xl text-gray-900 dark:text-white text-center leading-9 mb-6"
        style={{ fontFamily: serifFont }}
      >
        Read, study and understand the Bible, all in one place.
      </Text>
      <View style={{ gap: 16 }}>
        {FEATURES.map((f) => (
          <View key={f.title} className="flex-row" style={{ gap: 14 }}>
            <View
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ backgroundColor: `${BLUE}1A` }}
            >
              <Ionicons name={f.icon} size={18} color={BLUE} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900 dark:text-white">{f.title}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5 mt-0.5">{f.body}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text className="text-sm text-gray-400 dark:text-gray-500 text-center mt-6">
        Your notes and progress follow you to any device you sign in on.
      </Text>
    </View>
  );
}

function Brand() {
  return (
    <View className="items-center">
      <View
        className="w-16 h-16 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${BLUE}1A` }}
      >
        <Ionicons name="book-outline" size={28} color={BLUE} />
      </View>
      <Text className="text-3xl text-gray-900 dark:text-white" style={{ fontFamily: serifFont }}>
        Omeora
      </Text>
      <Text className="text-xs uppercase mt-1.5" style={{ color: EARTH, letterSpacing: 2 }}>
        Bible study companion
      </Text>
    </View>
  );
}

function Notice({
  icon,
  title,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  children: string;
}) {
  return (
    <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-5 mb-5">
      <View className="flex-row items-center mb-2" style={{ gap: 8 }}>
        <Ionicons name={icon} size={18} color={EARTH} />
        <Text className="text-base font-semibold text-gray-900 dark:text-white">{title}</Text>
      </View>
      <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5">{children}</Text>
    </View>
  );
}

/** Sign out and delete stay possible even when the gate keeps someone out. */
function AccountActions({ showSignOut }: { showSignOut: boolean }) {
  const [busy, setBusy] = useState<null | "signout" | "delete">(null);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <View className="mt-6">
      {showSignOut && (
        <Pressable
          onPress={async () => {
            setBusy("signout");
            await signOut();
            setBusy(null);
          }}
          disabled={!!busy}
          accessibilityRole="button"
          className="items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-700 mb-3 active:opacity-80"
          style={{ height: 48 }}
        >
          {busy === "signout" ? (
            <ActivityIndicator color={BLUE} />
          ) : (
            <Text className="text-base font-semibold text-gray-900 dark:text-white">Sign out</Text>
          )}
        </Pressable>
      )}
      {confirming ? (
        <View className="rounded-2xl border border-red-200 dark:border-red-900 px-4 py-4">
          <Text className="text-sm text-gray-600 dark:text-gray-300 leading-5 mb-3">
            This permanently deletes your account and everything saved to it: your notes, study
            answers, memory verses, streaks, badges and tokens. It can&apos;t be undone.
          </Text>
          {error && <Text className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</Text>}
          <View className="flex-row" style={{ gap: 10 }}>
            <Pressable
              onPress={async () => {
                setError(null);
                setBusy("delete");
                const problem = await deleteAccount();
                setBusy(null);
                if (problem) setError(problem);
              }}
              disabled={!!busy}
              accessibilityRole="button"
              className="flex-1 items-center justify-center rounded-xl active:opacity-80"
              style={{ height: 44, backgroundColor: "#DC2626" }}
            >
              {busy === "delete" ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-sm font-semibold text-white">Delete account</Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => setConfirming(false)}
              accessibilityRole="button"
              className="flex-1 items-center justify-center rounded-xl active:opacity-80"
              style={{ height: 44 }}
            >
              <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">Keep it</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable onPress={() => setConfirming(true)} hitSlop={8} className="self-center mt-2">
          <Text className="text-sm text-red-600 dark:text-red-400">Delete my account</Text>
        </Pressable>
      )}
    </View>
  );
}

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="items-center justify-center rounded-2xl active:opacity-80"
      style={{ height: 52, backgroundColor: BLUE }}
    >
      <Text className="text-base font-semibold text-white">{label}</Text>
    </Pressable>
  );
}
