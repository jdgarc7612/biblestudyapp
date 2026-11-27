import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { CardMenu, DeckRow, NewListSheet } from "../../../components/study/memory-panel";
import { Sheet } from "../../../components/memory/sheet";
import { serifFont } from "../../../constants/fonts";
import { getPack, MEMORY_PACKS, versesOf, type MemoryPack } from "../../../data/study/memory-packs";
import { getTranslation } from "../../../lib/bible";
import { sortDeck, type MemoryCard } from "../../../lib/memory";
import { cardForPassage, passageId, passageReference, usePassageTexts } from "../../../lib/memory-text";
import { useAppStore } from "../../../store/useAppStore";
import { BackButton } from "../../../components/back-button";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

/** Built-in collections get a page each in the web build; the person's own lists load in the app. */
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return MEMORY_PACKS.map((p) => ({ id: p.id }));
}

/** A built-in collection (pick verses to add) or one of the person's own lists. */
export default function MemoryCollectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pack = getPack(id);
  const list = useAppStore((s) => (id ? s.memoryLists[id] : undefined));

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={["top"]}>
      <View className="flex-row items-center px-4 py-2" style={{ maxWidth: 720, width: "100%", alignSelf: "center" }}>
        <BackButton fallback={{ pathname: "/study", params: { tab: "memory" } }} label="Memory" className="p-1" />
      </View>
      {pack ? (
        <PackView pack={pack} />
      ) : list && !list.deleted ? (
        <ListView id={id!} name={list.name} />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">This collection isn&apos;t here anymore.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function PackView({ pack }: { pack: MemoryPack }) {
  const router = useRouter();
  const translation = useAppStore((s) => s.translation);
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const addManyToMemoryDeck = useAppStore((s) => s.addManyToMemoryDeck);
  const [byVerse, setByVerse] = useState(false);
  const passages = useMemo(() => (pack.byVerse && byVerse ? versesOf(pack.passages[0]) : pack.passages), [pack, byVerse]);
  const { texts, failed } = usePassageTexts(translation, passages);
  const [picked, setPicked] = useState<Set<string> | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const inDeck = (pid: string) => memoryDeck.some((c) => c.id === pid);
  const available = passages.filter((p) => !inDeck(passageId(p)) && (texts?.[passageId(p)] ?? "x"));
  const selection = picked ?? new Set(available.map(passageId));
  const toAdd = available.filter((p) => selection.has(passageId(p)));
  const added = memoryDeck.filter((c) => c.collections.includes(pack.id)).length;

  const toggle = (pid: string) => {
    const next = new Set(selection);
    if (next.has(pid)) next.delete(pid);
    else next.add(pid);
    setPicked(next);
  };

  const add = async () => {
    setBusy(true);
    try {
      const cards = (await Promise.all(toAdd.map((p) => cardForPassage(translation, p, [pack.id])))).filter((c) => c !== null);
      // Verses already in the deck join the collection too.
      const tagged = passages
        .filter((p) => inDeck(passageId(p)))
        .map((p) => ({ id: passageId(p), verseReference: passageReference(p), verseText: "x", translation, collections: [pack.id] }));
      const n = addManyToMemoryDeck([...cards, ...tagged]);
      setNote(n > 0 ? `Added ${n} ${n === 1 ? "verse" : "verses"}. Review will introduce up to 5 new ones a day.` : "These are already in your deck.");
      setPicked(null);
    } catch {
      setNote("Couldn't load the verses just now. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}>
      <View className="w-12 h-12 rounded-full bg-brand-earth/15 items-center justify-center mb-3">
        <Ionicons name={pack.icon} size={22} color={EARTH} />
      </View>
      <Text className="text-3xl font-bold text-gray-900 dark:text-white" accessibilityRole="header">
        {pack.title}
      </Text>
      <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mt-2">{pack.summary}</Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Words from the {getTranslation(translation).name}, the translation you read in.
      </Text>

      {pack.byVerse && (
        <View className="flex-row rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 mt-5">
          {[false, true].map((v) => {
            const on = byVerse === v;
            return (
              <Pressable
                key={String(v)}
                onPress={() => {
                  setByVerse(v);
                  setPicked(null);
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                className="flex-1 items-center rounded-xl py-2.5"
                style={on ? { backgroundColor: BLUE } : undefined}
              >
                <Text className="text-sm font-semibold" style={{ color: on ? "#FFFFFF" : "#6B7280" }}>
                  {v ? "Verse by verse" : "Whole passage"}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View className="mt-5" style={{ gap: 10 }}>
        {!texts && !failed && <ActivityIndicator color={BLUE} style={{ marginTop: 24 }} />}
        {failed && <Text className="text-sm text-gray-500 dark:text-gray-400">Couldn&apos;t load these verses. Check your connection and reopen.</Text>}
        {texts &&
          passages.map((p) => {
            const pid = passageId(p);
            const text = texts[pid];
            const already = inDeck(pid);
            const on = already || selection.has(pid);
            const disabled = already || !text;
            return (
              <Pressable
                key={pid}
                onPress={() => !disabled && toggle(pid)}
                disabled={disabled}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on, disabled }}
                accessibilityLabel={`${passageReference(p)}${already ? ", already in your deck" : !text ? ", not in this translation" : ""}`}
                className="flex-row rounded-2xl border px-4 py-3.5 active:opacity-80"
                style={{ borderColor: on && !already ? `${BLUE}66` : "#9CA3AF33", backgroundColor: on && !already ? `${BLUE}0D` : undefined }}
              >
                <Ionicons
                  name={already ? "checkmark-circle" : on ? "checkbox" : "square-outline"}
                  size={20}
                  color={already ? "#15803D" : on ? BLUE : "#9CA3AF"}
                  style={{ marginTop: 1, marginRight: 12 }}
                />
                <View className="flex-1">
                  <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">
                    {passageReference(p)}
                    {already ? <Text className="text-xs font-semibold" style={{ color: "#15803D" }}>{"  In your deck"}</Text> : null}
                  </Text>
                  <Text style={{ fontFamily: serifFont }} className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mt-1" numberOfLines={byVerse ? 3 : 4}>
                    {text || "Not included in this translation."}
                  </Text>
                </View>
              </Pressable>
            );
          })}
      </View>

      {note && <Text className="text-sm text-gray-600 dark:text-gray-300 mt-5" accessibilityLiveRegion="polite">{note}</Text>}

      {texts && toAdd.length > 0 && (
        <Pressable
          onPress={add}
          disabled={busy}
          accessibilityRole="button"
          accessibilityLabel={`Memorize ${toAdd.length} ${toAdd.length === 1 ? "passage" : "passages"}`}
          className="rounded-2xl bg-brand-blue py-4 items-center mt-6 active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">
            {busy ? "Adding…" : `Memorize ${toAdd.length === available.length ? "all " : ""}${toAdd.length}`}
          </Text>
        </Pressable>
      )}
      {pack.byVerse && inDeck(passageId(pack.passages[0])) && (
        <Pressable
          onPress={() => router.push({ pathname: "/memory/review", params: { mode: "practice", passage: passageId(pack.passages[0]) } })}
          accessibilityRole="button"
          accessibilityLabel={`Practice ${pack.title} in order: each verse you've added, then the whole passage`}
          className="flex-row items-center justify-center rounded-2xl bg-brand-blue/10 dark:bg-brand-blue/20 py-3.5 mt-3 active:opacity-70"
        >
          <Ionicons name="git-merge-outline" size={17} color={BLUE} />
          <Text className="text-base font-semibold text-brand-blue ml-2">Practice in order</Text>
        </Pressable>
      )}
      {added > 0 && (
        <Pressable
          onPress={() => router.push({ pathname: "/memory/review", params: { mode: "practice", collection: pack.id } })}
          accessibilityRole="button"
          accessibilityLabel={`Practice the ${pack.title} collection`}
          className="rounded-2xl border border-brand-blue/40 py-3.5 items-center mt-3 active:opacity-70"
        >
          <Text className="text-base font-semibold text-brand-blue">Practice this collection</Text>
        </Pressable>
      )}
      <TogetherButton from={pack.id} label={pack.title} />
    </ScrollView>
  );
}

function ListView({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const renameMemoryList = useAppStore((s) => s.renameMemoryList);
  const deleteMemoryList = useAppStore((s) => s.deleteMemoryList);
  const cards = sortDeck(memoryDeck.filter((c) => c.collections.includes(id)));
  const [menuFor, setMenuFor] = useState<MemoryCard | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 48, maxWidth: 720, width: "100%", alignSelf: "center" }}>
      <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">Your list</Text>
      <Pressable onPress={() => setRenaming(true)} accessibilityRole="button" accessibilityLabel={`${name}. Rename list`} className="flex-row items-center mt-1 active:opacity-70">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white" accessibilityRole="header">
          {name}
        </Text>
        <Ionicons name="pencil" size={16} color="#9CA3AF" style={{ marginLeft: 10 }} />
      </Pressable>

      {cards.length === 0 ? (
        <Text className="text-[15px] leading-6 text-gray-600 dark:text-gray-300 mt-4">
          Add verses from Memory: tap ··· on any verse and choose Add to a list.
        </Text>
      ) : (
        <>
          <Pressable
            onPress={() => router.push({ pathname: "/memory/review", params: { mode: "practice", collection: id } })}
            accessibilityRole="button"
            accessibilityLabel={`Practice ${name}`}
            className="rounded-2xl bg-brand-blue py-4 items-center mt-5 active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">Practice this list</Text>
          </Pressable>
          <TogetherButton from={id} label={name} />
          <View className="mt-5" style={{ gap: 8 }}>
            {cards.map((card) => (
              <DeckRow
                key={card.id}
                card={card}
                onMenu={() => setMenuFor(card)}
                onPress={() => router.push({ pathname: "/memory/review", params: { mode: "practice", ids: card.id } })}
              />
            ))}
          </View>
        </>
      )}

      <Pressable onPress={() => setConfirmDelete(true)} accessibilityRole="button" accessibilityLabel="Delete this list" className="self-center mt-10 active:opacity-60" hitSlop={8}>
        <Text className="text-sm font-semibold" style={{ color: "#DC2626" }}>
          Delete list
        </Text>
      </Pressable>

      <CardMenu card={menuFor} onClose={() => setMenuFor(null)} />
      <NewListSheet
        visible={renaming}
        title="Rename list"
        action="Save"
        initial={name}
        onClose={() => setRenaming(false)}
        onCreate={(n) => {
          renameMemoryList(id, n);
          setRenaming(false);
        }}
      />
      <Sheet
        visible={confirmDelete}
        title={`Delete “${name}”?`}
        subtitle="The verses stay in your deck; only the list goes."
        onClose={() => setConfirmDelete(false)}
        options={[
          {
            key: "delete",
            label: "Delete list",
            icon: "trash-outline",
            destructive: true,
            onPress: () => {
              setConfirmDelete(false);
              deleteMemoryList(id);
              router.back();
            },
          },
          { key: "keep", label: "Keep it", icon: "close", onPress: () => setConfirmDelete(false) },
        ]}
      />
    </ScrollView>
  );
}

/** Start a challenge from this collection or list: the same verses, learned with family or a group. */
function TogetherButton({ from, label }: { from: string; label: string }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/memory/challenge", params: { from } })}
      accessibilityRole="button"
      accessibilityLabel={`Memorize ${label} together with family or a group`}
      className="flex-row items-center justify-center rounded-2xl bg-brand-earth/10 dark:bg-brand-earth/15 py-3.5 mt-3 active:opacity-70"
    >
      <Ionicons name="people-outline" size={17} color={EARTH} />
      <Text className="text-base font-semibold ml-2 text-[#8A6A44] dark:text-[#D9B88F]">
        Memorize together
      </Text>
    </Pressable>
  );
}
