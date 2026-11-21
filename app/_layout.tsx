import { Stack, usePathname } from "expo-router";
import Head from "expo-router/head";
import { useEffect } from "react";
import "../global.css";

import { useGateView } from "../hooks/use-gate-view";
import { useMemoryReminders } from "../hooks/use-memory-reminders";
import { initAccount } from "../lib/auth/account";
import { initBetaGate } from "../lib/auth/beta-gate";
import { noteScreen } from "../lib/feedback";

export default function RootLayout() {
  const pathname = usePathname();
  const gate = useGateView();
  const open = gate === "open";
  useMemoryReminders();

  useEffect(() => {
    initAccount();
    initBetaGate();
  }, []);

  // Remembered so feedback can say which screen someone was on.
  useEffect(() => {
    noteScreen(pathname);
  }, [pathname]);

  return (
    <>
      <Head>
        <title>Omeora</title>
        <meta name="description" content="Omeora: Bible study companion" />
        <meta name="apple-mobile-web-app-title" content="Omeora" />
      </Head>
      {/* Invite-only test: until the gate says this person may come in, the only screens are
          the welcome, sign-in, privacy and terms. The database enforces the same rule. */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!open}>
          <Stack.Screen name="welcome" />
        </Stack.Protected>
        <Stack.Protected guard={open}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="feedback" options={{ presentation: "modal" }} />
          <Stack.Screen name="invite-testers" />
          <Stack.Screen name="notes" />
          <Stack.Screen name="shop" />
          <Stack.Screen name="memory/index" />
          <Stack.Screen name="memory/challenge" />
          <Stack.Screen name="memory/collection/[id]" />
          <Stack.Screen name="memory/join" />
          <Stack.Screen name="memory/review" />
        </Stack.Protected>
        <Stack.Protected guard={gate !== "not-invited"}>
          <Stack.Screen name="sign-in" options={{ presentation: "modal" }} />
        </Stack.Protected>
        <Stack.Screen name="privacy" />
        <Stack.Screen name="terms" />
        <Stack.Screen name="auth-callback" />
      </Stack>
    </>
  );
}
