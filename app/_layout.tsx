import { Stack, usePathname } from "expo-router";
import Head from "expo-router/head";
import { useEffect } from "react";
import "../global.css";

import { initAccount } from "../lib/auth/account";
import { noteScreen } from "../lib/feedback";

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    initAccount();
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="sign-in" options={{ presentation: "modal" }} />
        <Stack.Screen name="feedback" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}
