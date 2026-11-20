import { Stack } from "expo-router";

export default function StudyStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="plans/[id]" />
    </Stack>
  );
}
