import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

import { AppleButton } from "../components/account/apple-button";
import { rememberGivenName, sendEmailCode, useAccount, verifyEmailCode } from "../lib/auth/account";
import { isNativeAppleSignInAvailable, signInWithApple } from "../lib/auth/apple";
import { signInWithProvider, SignInResult } from "../lib/auth/oauth";
import { appleSignInEnabled, googleSignInEnabled, isAccountsConfigured } from "../lib/supabase";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInScreen() {
  const router = useRouter();
  const user = useAccount((s) => s.user);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState<null | "email" | "code" | "apple" | "google">(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showApple, setShowApple] = useState(appleSignInEnabled && Platform.OS !== "ios");

  useEffect(() => {
    if (appleSignInEnabled && Platform.OS === "ios") {
      void isNativeAppleSignInAvailable().then(setShowApple);
    }
  }, []);

  // Once signed in (by any route), close this screen.
  useEffect(() => {
    if (user) router.back();
  }, [user, router]);

  const close = () => (router.canGoBack() ? router.back() : router.replace("/profile"));

  const runProvider = async (which: "apple" | "google") => {
    setError(null);
    setBusy(which);
    const result: SignInResult =
      which === "apple" ? await signInWithApple() : await signInWithProvider("google");
    setBusy(null);
    if (result.ok) rememberGivenName(result.givenName);
    else if (!result.cancelled) setError(result.message);
  };

  const sendCode = async () => {
    const address = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(address)) {
      setError("That email address doesn't look right.");
      return;
    }
    setError(null);
    setBusy("email");
    const problem = await sendEmailCode(address);
    setBusy(null);
    if (problem) {
      setError(problem);
      return;
    }
    setEmail(address);
    setCode("");
    setStep("code");
    setNotice(`We sent a code to ${address}.`);
  };

  const verify = async () => {
    const token = code.replace(/\D/g, "");
    if (token.length < 6) {
      setError("Enter the code from the email.");
      return;
    }
    setError(null);
    setBusy("code");
    const problem = await verifyEmailCode(email, token);
    setBusy(null);
    if (problem) setError(problem);
  };

  const inputClass =
    "text-base text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-row justify-end mb-4">
            <Pressable onPress={close} hitSlop={12} accessibilityLabel="Close">
              <Ionicons name="close" size={24} color="#9CA3AF" />
            </Pressable>
          </View>

          <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-5">
            <Ionicons name="cloud-done-outline" size={26} color="#4A6FA5" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Keep your progress safe
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mb-8 leading-6">
            Sign in to save your verses, streaks and settings to your account, so they follow you to
            any device. Everything you&apos;ve done so far comes with you.
          </Text>

          {!isAccountsConfigured ? (
            <View className="rounded-2xl bg-gray-50 dark:bg-gray-800 px-5 py-5">
              <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5">
                Accounts aren&apos;t switched on in this version yet. Your progress is saved on this
                device in the meantime.
              </Text>
            </View>
          ) : (
            <>
              {(showApple || googleSignInEnabled) && step === "email" && (
                <View style={{ gap: 10 }} className="mb-6">
                  {showApple && <AppleButton onPress={() => runProvider("apple")} disabled={!!busy} />}
                  {googleSignInEnabled && (
                    <Pressable
                      onPress={() => runProvider("google")}
                      disabled={!!busy}
                      accessibilityRole="button"
                      className="flex-row items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-700 active:opacity-80"
                      style={{ height: 50, gap: 8, opacity: busy ? 0.6 : 1 }}
                    >
                      {busy === "google" ? (
                        <ActivityIndicator color="#4A6FA5" />
                      ) : (
                        <>
                          <Ionicons name="logo-google" size={18} color="#4A6FA5" />
                          <Text className="text-base font-semibold text-gray-900 dark:text-white">
                            Continue with Google
                          </Text>
                        </>
                      )}
                    </Pressable>
                  )}
                  <View className="flex-row items-center mt-4" style={{ gap: 12 }}>
                    <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <Text className="text-xs text-gray-400 dark:text-gray-500">or use your email</Text>
                    <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  </View>
                </View>
              )}

              {step === "email" ? (
                <>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="send"
                    onSubmitEditing={sendCode}
                    className={inputClass}
                  />
                  <PrimaryButton label="Email me a code" onPress={sendCode} busy={busy === "email"} />
                  <Text className="text-xs text-gray-400 dark:text-gray-500 mt-3 leading-5">
                    No password needed. We&apos;ll email you a short code, and a new account is made
                    the first time.
                  </Text>
                </>
              ) : (
                <>
                  {notice && (
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mb-3">{notice}</Text>
                  )}
                  <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="Code from the email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete="one-time-code"
                    maxLength={10}
                    returnKeyType="done"
                    onSubmitEditing={verify}
                    className={inputClass}
                    style={{ letterSpacing: 4 }}
                  />
                  <PrimaryButton label="Sign in" onPress={verify} busy={busy === "code"} />
                  <View className="flex-row justify-between mt-4">
                    <Pressable onPress={() => setStep("email")} hitSlop={8}>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">Use a different email</Text>
                    </Pressable>
                    <Pressable onPress={sendCode} hitSlop={8} disabled={!!busy}>
                      <Text className="text-sm font-semibold text-brand-blue">Send a new code</Text>
                    </Pressable>
                  </View>
                </>
              )}

              {error && (
                <View className="flex-row items-start mt-5 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
                  <Text className="flex-1 text-sm text-red-700 dark:text-red-300 ml-2">{error}</Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function PrimaryButton({ label, onPress, busy }: { label: string; onPress: () => void; busy: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      accessibilityRole="button"
      className="items-center justify-center rounded-2xl mt-3 active:opacity-80"
      style={{ height: 50, backgroundColor: "#4A6FA5" }}
    >
      {busy ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-base font-semibold text-white">{label}</Text>
      )}
    </Pressable>
  );
}
