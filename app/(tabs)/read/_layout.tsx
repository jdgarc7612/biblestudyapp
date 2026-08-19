import { Stack } from "expo-router";

export default function ReadStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[chapter]" />
    </Stack>
  );
}
