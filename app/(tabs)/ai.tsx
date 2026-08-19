import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
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

import { FormattedText } from "../../components/ai/formatted-text";
import { serifFont } from "../../constants/fonts";
import { localDateString } from "../../lib/date";
import { generateInsightRequestPrompt, generateMockAnswer, VerseContext } from "../../lib/mock-ai";
import { useAppStore } from "../../store/useAppStore";

const TOPIC_PROMPTS = [
  { label: "Anxiety", prompt: "What does the Bible say about anxiety?" },
  { label: "Identity", prompt: "What does the Bible say about identity?" },
  { label: "Forgiveness", prompt: "What does the Bible say about forgiveness?" },
  { label: "Salvation", prompt: "What does the Bible say about salvation?" },
  { label: "Hope", prompt: "What does the Bible say about hope?" },
  { label: "Gratitude", prompt: "What does the Bible say about gratitude?" },
];

const STARTER_PROMPTS = [
  "Where should I start reading the Bible?",
  "Explain John 3:16 like I'm new to this.",
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function AskAIScreen() {
  const params = useLocalSearchParams<{
    verseRef?: string;
    verseText?: string;
    autoAsk?: string;
  }>();

  const chatMessages = useAppStore((state) => state.chatMessages);
  const addChatMessage = useAppStore((state) => state.addChatMessage);
  const recordAiQuestionAsked = useAppStore((state) => state.recordAiQuestionAsked);
  const claimOnboardingBonus = useAppStore((state) => state.claimOnboardingBonus);
  const aiFreeQuestionsAskedToday = useAppStore((state) => state.aiFreeQuestionsAskedToday);
  const aiFreeQuestionsAskedTodayDate = useAppStore((state) => state.aiFreeQuestionsAskedTodayDate);
  const aiFreeDailyAllowance = useAppStore((state) => state.aiFreeDailyAllowance);
  const aiEarnedTokenQuestionsThisMonth = useAppStore((state) => state.aiEarnedTokenQuestionsThisMonth);
  const aiEarnedTokenQuestionsMonthDate = useAppStore((state) => state.aiEarnedTokenQuestionsMonthDate);
  const aiEarnedTokenMonthlyCap = useAppStore((state) => state.aiEarnedTokenMonthlyCap);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeContext, setActiveContext] = useState<VerseContext | null>(null);
  const handledParamsKey = useRef<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const today = localDateString();
  const freeAskedToday =
    aiFreeQuestionsAskedTodayDate === today ? aiFreeQuestionsAskedToday : 0;
  const freeQuestionsRemaining = Math.max(0, aiFreeDailyAllowance - freeAskedToday);
  const earnedAskedThisMonth =
    aiEarnedTokenQuestionsMonthDate === today.slice(0, 7) ? aiEarnedTokenQuestionsThisMonth : 0;
  const earnedQuestionsRemaining = Math.max(0, aiEarnedTokenMonthlyCap - earnedAskedThisMonth);
  const canSend = freeQuestionsRemaining > 0 || earnedQuestionsRemaining > 0;

  const sendMessage = (content: string, contextOverride?: VerseContext | null) => {
    const trimmed = content.trim();
    if (!trimmed || !canSend) return;

    const context = contextOverride !== undefined ? contextOverride : activeContext;

    addChatMessage({
      id: makeId(),
      role: "user",
      content: trimmed,
      verseReference: context?.reference,
      createdAt: new Date().toISOString(),
    });
    setInput("");
    setIsThinking(true);
    recordAiQuestionAsked();
    claimOnboardingBonus("firstAiQuestion");

    setTimeout(() => {
      addChatMessage({
        id: makeId(),
        role: "assistant",
        content: generateMockAnswer(trimmed, context ?? undefined),
        createdAt: new Date().toISOString(),
      });
      setIsThinking(false);
    }, 700 + Math.random() * 500);
  };

  useEffect(() => {
    if (!params.verseRef || !params.verseText) return;
    const key = `${params.verseRef}-${params.autoAsk ?? ""}`;
    if (handledParamsKey.current === key) return;
    handledParamsKey.current = key;

    const context: VerseContext = { reference: params.verseRef, text: params.verseText };
    setActiveContext(context);
    if (params.autoAsk === "insights") {
      sendMessage(generateInsightRequestPrompt(context.reference), context);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.verseRef, params.verseText, params.autoAsk]);


  const isEmpty = chatMessages.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">Ask AI</Text>
          {chatMessages.length > 0 && (
            <Pressable
              onPress={() => {
                useAppStore.getState().clearChat();
                setActiveContext(null);
              }}
              hitSlop={8}
              className="active:opacity-60"
            >
              <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                Clear
              </Text>
            </Pressable>
          )}
        </View>

        {isEmpty ? (
          <View className="flex-1 px-6 pt-8">
            <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-5">
              <Ionicons name="sparkles" size={24} color="#4A6FA5" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ask me anything about Scripture
            </Text>
            <Text className="text-base text-gray-400 dark:text-gray-500 mb-8">
              Get a grounded, thoughtful answer — no question is too basic.
            </Text>

            <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
              Topics to explore
            </Text>
            <View className="flex-row flex-wrap mb-8" style={{ gap: 8 }}>
              {TOPIC_PROMPTS.map(({ label, prompt }) => (
                <Pressable
                  key={label}
                  onPress={() => sendMessage(prompt)}
                  disabled={!canSend}
                  className="rounded-2xl px-4 py-3 active:opacity-70"
                  style={{
                    backgroundColor: "#4A6FA50D",
                    borderWidth: 1,
                    borderColor: "#4A6FA533",
                    width: "47%",
                    opacity: canSend ? 1 : 0.4,
                  }}
                >
                  <Text className="text-sm font-semibold text-brand-blue">{label}</Text>
                </Pressable>
              ))}
            </View>

            <Text className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
              Or try asking
            </Text>
            <View style={{ gap: 8 }}>
              {STARTER_PROMPTS.map((prompt) => (
                <Pressable
                  key={prompt}
                  onPress={() => sendMessage(prompt)}
                  disabled={!canSend}
                  style={{ opacity: canSend ? 1 : 0.4 }}
                  className="flex-row items-center justify-between rounded-2xl px-4 py-3 border border-gray-100 dark:border-gray-800 active:opacity-70"
                >
                  <Text className="text-sm text-gray-700 dark:text-gray-200 flex-1 pr-2">
                    {prompt}
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, gap: 12 }}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {chatMessages.map((item) => {
              const isUser = item.role === "user";
              return (
                <View
                  key={item.id}
                  className="max-w-[85%] rounded-2xl px-4 py-3"
                  style={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    backgroundColor: isUser ? "#4A6FA5" : "#F9FAFB",
                    borderBottomRightRadius: isUser ? 4 : 16,
                    borderBottomLeftRadius: isUser ? 16 : 4,
                  }}
                >
                  {isUser ? (
                    <Text className="text-base text-white">{item.content}</Text>
                  ) : (
                    <FormattedText
                      text={item.content}
                      className="text-base text-gray-900 dark:text-gray-900"
                      style={{ lineHeight: 22 }}
                    />
                  )}
                </View>
              );
            })}
            {isThinking && (
              <View className="self-start max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3 bg-gray-50 dark:bg-gray-800">
                <Text className="text-sm text-gray-400 dark:text-gray-500">Thinking…</Text>
              </View>
            )}
          </ScrollView>
        )}

        {activeContext && (
          <View className="flex-row items-center mx-5 mb-2 px-3 py-2 rounded-xl bg-brand-earth/10">
            <Ionicons name="bookmark" size={14} color="#C19A6B" />
            <Text
              style={{ fontFamily: serifFont }}
              className="flex-1 text-xs text-gray-600 dark:text-gray-300 ml-2"
              numberOfLines={1}
            >
              {activeContext.reference}
            </Text>
            <Pressable onPress={() => setActiveContext(null)} hitSlop={8}>
              <Ionicons name="close" size={14} color="#9CA3AF" />
            </Pressable>
          </View>
        )}

        {!canSend ? (
          <View className="flex-row items-center mx-5 mb-2 px-3 py-2.5 rounded-xl bg-brand-earth/10">
            <Ionicons name="hourglass-outline" size={14} color="#C19A6B" />
            <Text className="flex-1 text-xs text-gray-600 dark:text-gray-300 ml-2">
              You've used today's free questions — come back tomorrow for more.
            </Text>
          </View>
        ) : (
          freeQuestionsRemaining <= 1 && (
            <Text className="text-[11px] text-gray-400 dark:text-gray-500 mx-5 mb-1.5">
              {freeQuestionsRemaining} free {freeQuestionsRemaining === 1 ? "question" : "questions"}{" "}
              left today
            </Text>
          )
        )}

        <View className="flex-row items-end px-5 pb-4 pt-2" style={{ gap: 8 }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={canSend ? "Ask a question…" : "Come back tomorrow for more questions"}
            placeholderTextColor="#9CA3AF"
            multiline
            editable={canSend}
            className="flex-1 text-base text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3"
            style={{ maxHeight: 100, opacity: canSend ? 1 : 0.6 }}
          />
          <Pressable
            onPress={() => sendMessage(input)}
            disabled={input.trim().length === 0 || !canSend}
            accessibilityLabel="Send"
            className="w-11 h-11 rounded-full items-center justify-center active:opacity-80"
            style={{
              backgroundColor: "#4A6FA5",
              opacity: input.trim().length === 0 || !canSend ? 0.4 : 1,
            }}
          >
            <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
