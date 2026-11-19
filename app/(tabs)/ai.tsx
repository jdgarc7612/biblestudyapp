import { useLocalSearchParams, useRouter } from "expo-router";
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
import { AI_DAILY_QUESTION_LIMIT, isLiveAiConfigured } from "../../lib/ai-config";
import { askStudyCompanion } from "../../lib/ai-client";
import { isTranslationId, type FoundReference } from "../../lib/bible";
import { localDateString } from "../../lib/date";
import { generateInsightRequestPrompt, VerseContext } from "../../lib/mock-ai";
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
    translation?: string;
  }>();
  const router = useRouter();

  const chatMessages = useAppStore((state) => state.chatMessages);
  const addChatMessage = useAppStore((state) => state.addChatMessage);
  const recordAiQuestionAsked = useAppStore((state) => state.recordAiQuestionAsked);
  const setAiQuestionsUsedToday = useAppStore((state) => state.setAiQuestionsUsedToday);
  const claimOnboardingBonus = useAppStore((state) => state.claimOnboardingBonus);
  const aiFreeQuestionsAskedToday = useAppStore((state) => state.aiFreeQuestionsAskedToday);
  const aiFreeQuestionsAskedTodayDate = useAppStore((state) => state.aiFreeQuestionsAskedTodayDate);
  const savedTranslation = useAppStore((state) => state.translation);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeContext, setActiveContext] = useState<VerseContext | null>(null);
  const [failed, setFailed] = useState<{
    message: string;
    question: string;
    context: VerseContext | null;
  } | null>(null);
  const handledParamsKey = useRef<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const today = localDateString();
  const freeAskedToday =
    aiFreeQuestionsAskedTodayDate === today ? aiFreeQuestionsAskedToday : 0;
  const questionsLeft = Math.max(0, AI_DAILY_QUESTION_LIMIT - freeAskedToday);
  const canSend = questionsLeft > 0 && !isThinking;
  const translation =
    params.translation && isTranslationId(params.translation) ? params.translation : savedTranslation;

  const openReference = (ref: FoundReference) => {
    router.push({
      pathname: "/read/[book]/[chapter]",
      params: { book: ref.book.id, chapter: String(ref.chapter) },
    });
  };

  /**
   * Asks the study companion. The question only counts against today's limit once an
   * answer comes back, so a dropped connection never costs anyone a question.
   */
  const ask = async (question: string, context: VerseContext | null) => {
    setIsThinking(true);
    setFailed(null);
    // Everything said so far, so follow-up questions keep their meaning.
    const history = useAppStore
      .getState()
      .chatMessages.slice(0, -1)
      .map((m) => ({ role: m.role, content: m.content }));
    const result = await askStudyCompanion({
      question,
      context: context ?? undefined,
      translation,
      history,
    });
    if (result.ok) {
      addChatMessage({
        id: makeId(),
        role: "assistant",
        content: result.answer,
        createdAt: new Date().toISOString(),
      });
      // Signed in: the account's count is the one that matters, wherever else it was used today.
      if (result.remaining !== undefined) {
        setAiQuestionsUsedToday(Math.max(0, AI_DAILY_QUESTION_LIMIT - result.remaining));
      } else {
        recordAiQuestionAsked();
      }
      claimOnboardingBonus("firstAiQuestion");
    } else {
      if (result.limitReached) setAiQuestionsUsedToday(AI_DAILY_QUESTION_LIMIT);
      setFailed({ message: result.message, question, context });
    }
    setIsThinking(false);
  };

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
    void ask(trimmed, context);
  };

  const retry = () => {
    if (!failed || questionsLeft === 0) return;
    void ask(failed.question, failed.context);
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
                setFailed(null);
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
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 16 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="w-14 h-14 rounded-full bg-brand-blue/10 items-center justify-center mb-5">
              <Ionicons name="sparkles" size={24} color="#4A6FA5" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ask me anything about Scripture
            </Text>
            <Text className="text-base text-gray-400 dark:text-gray-500 mb-8">
              Answers grounded in Scripture, with the verses to read for yourself. No question is
              too basic.
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
          </ScrollView>
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
                      onReferencePress={openReference}
                    />
                  )}
                </View>
              );
            })}
            {isThinking && (
              <View className="self-start max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3 bg-gray-50 dark:bg-gray-800">
                <Text className="text-sm text-gray-400 dark:text-gray-500">
                  Searching the Scriptures…
                </Text>
              </View>
            )}
            {failed && !isThinking && (
              <View
                className="self-start max-w-[85%] rounded-2xl px-4 py-3"
                style={{ backgroundColor: "#C19A6B1A", borderBottomLeftRadius: 4 }}
              >
                <Text className="text-sm text-gray-700 dark:text-gray-200 mb-2">{failed.message}</Text>
                <Pressable onPress={retry} hitSlop={8} className="self-start active:opacity-60">
                  <Text className="text-sm font-semibold text-brand-blue">Try again</Text>
                </Pressable>
              </View>
            )}
            {!isLiveAiConfigured && (
              <Text className="text-[11px] text-gray-300 dark:text-gray-600 text-center mt-2">
                Preview answers. Full answers arrive once the study companion is switched on.
              </Text>
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

        {questionsLeft === 0 ? (
          <View className="flex-row items-center mx-5 mb-2 px-3 py-2.5 rounded-xl bg-brand-earth/10">
            <Ionicons name="hourglass-outline" size={14} color="#C19A6B" />
            <Text className="flex-1 text-xs text-gray-600 dark:text-gray-300 ml-2">
              That&apos;s all {AI_DAILY_QUESTION_LIMIT} of today&apos;s questions. You get{" "}
              {AI_DAILY_QUESTION_LIMIT} more tomorrow, and the Bible is always open in the meantime.
            </Text>
          </View>
        ) : (
          questionsLeft < AI_DAILY_QUESTION_LIMIT && (
            <Text className="text-[11px] text-gray-400 dark:text-gray-500 mx-5 mb-1.5">
              {questionsLeft} of {AI_DAILY_QUESTION_LIMIT} free questions left today
            </Text>
          )
        )}

        <View className="flex-row items-end px-5 pb-4 pt-2" style={{ gap: 8 }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={questionsLeft > 0 ? "Ask a question…" : "Come back tomorrow for more questions"}
            placeholderTextColor="#9CA3AF"
            multiline
            editable={questionsLeft > 0}
            className="flex-1 text-base text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3"
            style={{ maxHeight: 100, opacity: questionsLeft > 0 ? 1 : 0.6 }}
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
