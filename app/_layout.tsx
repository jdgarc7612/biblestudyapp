import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

import { initAccount } from "../lib/auth/account";

export default function RootLayout() {
  useEffect(() => {
    initAccount();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="sign-in" options={{ presentation: "modal" }} />
    </Stack>
  );
}
