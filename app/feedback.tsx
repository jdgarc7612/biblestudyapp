import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAccount } from "../lib/auth/account";
import { FEEDBACK_KINDS, FEEDBACK_MAX_CHARS, sendFeedback, type FeedbackKind } from "../lib/feedback";

const BLUE = "#4A6FA5";

/** A short, friendly form for testers: what kind of feedback, a few words, done. */
export default function FeedbackScreen() {
  const router = useRouter();
  const user = useAccount((s) => s.user);
  const [kind, setKind] = useState<FeedbackKind>("confusing");
  const [message, setMessage] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const close = () => (router.canGoBack() ? router.back() : router.replace("/profile"));

  const submit = async () => {
    setError(null);
    setBusy(true);
    const problem = await sendFeedback({ kind, message, replyEmail: user ? undefined : replyEmail });
    setBusy(false);
    if (problem) setError(problem);
    else setSent(true);
  };

  const inputClass =
    "text-base text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 40, maxWidth: 640, width: "100%", alignSelf: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-row justify-end mb-4">
            <Pressable onPress={close} hitSlop={12} accessibilityLabel="Close">
              <Ionicons name="close" size={24} color="#9CA3AF" />
            </Pressable>
          </View>

          {sent ? (
            <View className="items-center pt-10">
              <View className="w-16 h-16 rounded-full bg-brand-blue/10 items-center justify-center mb-5">
                <Ionicons name="checkmark" size={30} color={BLUE} />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                Thank you
              </Text>
              <Text className="text-base text-gray-500 dark:text-gray-400 leading-6 text-center mb-8">
                Every note helps make DeepWord better. Send another anytime from Profile.
              </Text>
              <Pressable
                onPress={close}
                className="items-center justify-center rounded-2xl active:opacity-80 self-stretch"
                style={{ height: 50, backgroundColor: BLUE }}
              >
                <Text className="text-base font-semibold text-white">Done</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-5">
                <Ionicons name="chatbubble-ellipses-outline" size={26} color={BLUE} />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send feedback</Text>
              <Text className="text-base text-gray-500 dark:text-gray-400 mb-6 leading-6">
                What&apos;s working, what&apos;s confusing, what you wish it did. Honest is best.
              </Text>

              <View className="flex-row flex-wrap mb-5" style={{ gap: 8 }}>
                {FEEDBACK_KINDS.map((k) => {
                  const on = k.id === kind;
                  return (
                    <Pressable
                      key={k.id}
                      onPress={() => setKind(k.id)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: on }}
                      className={`flex-row items-center rounded-full px-3.5 py-2 border ${
                        on ? "border-brand-blue bg-brand-blue/10" : "border-gray-200 dark:border-gray-700"
                      }`}
                      style={{ gap: 6 }}
                    >
                      <Ionicons name={k.icon as keyof typeof Ionicons.glyphMap} size={15} color={on ? BLUE : "#9CA3AF"} />
                      <Text
                        className={`text-sm ${on ? "font-semibold text-brand-blue" : "text-gray-600 dark:text-gray-300"}`}
                      >
                        {k.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder={
                  kind === "broken"
                    ? "What happened, and what did you expect?"
                    : kind === "idea"
                      ? "What would make DeepWord more useful to you?"
                      : kind === "love"
                        ? "What do you love about it?"
                        : "What was confusing, and where?"
                }
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={FEEDBACK_MAX_CHARS}
                textAlignVertical="top"
                className={inputClass}
                style={{ minHeight: 140 }}
              />

              {!user && (
                <>
                  <TextInput
                    value={replyEmail}
                    onChangeText={setReplyEmail}
                    placeholder="Your email, if you'd like a reply (optional)"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    maxLength={200}
                    className={`${inputClass} mt-3`}
                  />
                </>
              )}

              <Text className="text-xs text-gray-400 dark:text-gray-500 mt-3 leading-5">
                {user
                  ? "Linked to your account so we can follow up, and sent with the screen you were on and your app version."
                  : "Sent with the screen you were on and your app version."}{" "}
                See the{" "}
                <Text className="text-brand-blue" onPress={() => router.push("/privacy")}>
                  Privacy Policy
                </Text>
                .
              </Text>

              {error && (
                <View className="flex-row items-start mt-4 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
                  <Text className="flex-1 text-sm text-red-700 dark:text-red-300 ml-2">{error}</Text>
                </View>
              )}

              <Pressable
                onPress={submit}
                disabled={busy || !message.trim()}
                accessibilityRole="button"
                className="items-center justify-center rounded-2xl mt-5 active:opacity-80"
                style={{ height: 50, backgroundColor: BLUE, opacity: message.trim() ? 1 : 0.5 }}
              >
                {busy ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-base font-semibold text-white">Send</Text>
                )}
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
