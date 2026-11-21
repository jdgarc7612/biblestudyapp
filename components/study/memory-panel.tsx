import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { getPack, MEMORY_PACKS, STARTER_PACK_IDS, type MemoryPack } from "../../data/study/memory-packs";
import {
  buildReviewQueue,
  cardStatus,
  isDue,
  newRemainingToday,
  sortDeck,
  type CardStatus,
  type MemoryCard,
} from "../../lib/memory";
import { daysUntil } from "../../lib/srs";
import { useAppStore } from "../../store/useAppStore";
import { METHODS, methodLabel } from "../memory/methods";
import { Sheet } from "../memory/sheet";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";

type Filter = "all" | "due" | "new" | "secure" | string;

const STATUS_STYLE: Record<CardStatus, { label: string; color: string }> = {
  due: { label: "Due", color: EARTH },
  new: { label: "New", color: BLUE },
  learning: { label: "Learning", color: "#7C8DB5" },
  growing: { label: "Growing", color: "#6B7280" },
  secure: { label: "Secure", color: "#15803D" },
};

/** The Memory side of the Study tab: today's review, collections and the deck. */
export function MemoryPanel() {
  const router = useRouter();
  const memoryDeck = useAppStore((s) => s.memoryDeck);
  const memoryLists = useAppStore((s) => s.memoryLists);
  const memoryMethod = useAppStore((s) => s.memoryMethod);
  const setMemoryMethod = useAppStore((s) => s.setMemoryMethod);
  const streak = useAppStore((s) => s.currentMemoryStreak);
  const createMemoryList = useAppStore((s) => s.createMemoryList);

  const [filter, setFilter] = useState<Filter>("all");
  const [methodOpen, setMethodOpen] = useState(false);
  const [menuFor, setMenuFor] = useState<MemoryCard | null>(null);
  const [newListOpen, setNewListOpen] = useState(false);

  const now = new Date();
  const dueCount = memoryDeck.filter((c) => isDue(c, now)).length;
  const newLeft = newRemainingToday(memoryDeck, now);
  const queueSize = buildReviewQueue(memoryDeck, now).length;
  const lists = Object.entries(memoryLists).filter(([, l]) => !l.deleted);

  const sorted = useMemo(() => sortDeck(memoryDeck), [memoryDeck]);
  const shown = sorted.filter((c) => {
    if (filter === "all") return true;
    if (filter === "due") return cardStatus(c) === "due";
    if (filter === "new") return cardStatus(c) === "new";
    if (filter === "secure") return cardStatus(c) === "secure";
    return c.collections.includes(filter);
  });

  const openCollection = (id: string) => router.push({ pathname: "/memory/collection/[id]", params: { id } });
  const practice = (params: Record<string, string> = {}) =>
    router.push({ pathname: "/memory/review", params: { mode: "practice", ...params } });

  if (memoryDeck.length === 0) {
    return (
      <View>
        <View className="rounded-3xl bg-brand-earth/10 dark:bg-brand-earth/15 border border-brand-earth/25 px-5 py-6">
          <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">Start memorizing</Text>
          <Text style={{ fontFamily: serifFont }} className="text-[22px] leading-8 text-gray-900 dark:text-white mt-2">
            Hide God&apos;s word in your heart, a verse at a time.
          </Text>
          <Text className="text-sm leading-6 text-gray-600 dark:text-gray-300 mt-3">
            While reading, tap any verse (or drag across several) and choose Memorize. Omeora walks you
            through learning it, then brings it back just before you&apos;d forget.
          </Text>
          <Pressable
            onPress={() => router.push("/read")}
            accessibilityRole="button"
            accessibilityLabel="Open Read to choose a verse"
            className="flex-row items-center self-start mt-4 active:opacity-60"
          >
            <Ionicons name="book-outline" size={15} color={BLUE} />
            <Text className="text-sm font-semibold text-brand-blue ml-1.5">Find a verse in Read</Text>
          </Pressable>
        </View>
        <SectionLabel top>Or start with a collection</SectionLabel>
        <View style={{ gap: 10 }}>
          {STARTER_PACK_IDS.map((id) => {
            const pack = getPack(id)!;
            return <PackRow key={id} pack={pack} inDeck={0} onPress={() => openCollection(id)} />;
          })}
        </View>
        <SectionLabel top>More collections</SectionLabel>
        <View style={{ gap: 10 }}>
          {MEMORY_PACKS.filter((p) => !STARTER_PACK_IDS.includes(p.id)).map((pack) => (
            <PackRow key={pack.id} pack={pack} inDeck={0} onPress={() => openCollection(pack.id)} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View>
      {/* Today */}
      <View className="rounded-3xl bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 px-5 pt-4 pb-5">
        <View className="flex-row" style={{ gap: 8 }}>
          <HeroStat value={dueCount} label="Due today" />
          <HeroStat value={newLeft} label="New today" />
          <HeroStat value={streak} label="Day streak" />
        </View>
        {queueSize > 0 ? (
          <Pressable
            onPress={() => router.push("/memory/review")}
            accessibilityRole="button"
            accessibilityLabel={dueCount > 0 ? `Review ${queueSize} verses` : `Learn ${newLeft} new verses`}
            className="rounded-2xl bg-brand-blue py-4 items-center mt-4 active:opacity-80"
          >
            <Text className="text-base font-semibold text-white">
              {dueCount > 0 ? `Review ${dueCount} due${newLeft > 0 ? ` + ${newLeft} new` : ""}` : `Learn ${newLeft} new`}
            </Text>
          </Pressable>
        ) : (
          <View className="flex-row items-center mt-4">
            <Ionicons name="leaf" size={18} color={EARTH} />
            <Text className="flex-1 text-[15px] font-semibold text-gray-800 dark:text-gray-100 ml-2">All caught up</Text>
            <Pressable
              onPress={() => practice()}
              accessibilityRole="button"
              accessibilityLabel="Practice anyway. Practice won't change your schedule."
              className="rounded-full border border-brand-blue/40 px-4 py-2 active:opacity-70"
            >
              <Text className="text-sm font-semibold text-brand-blue">Practice anyway</Text>
            </Pressable>
          </View>
        )}
        <Pressable
          onPress={() => setMethodOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`Default method: ${methodLabel(memoryMethod)}. Change`}
          className="flex-row items-center self-center mt-4 active:opacity-60"
          hitSlop={8}
        >
          <Text className="text-xs text-gray-500 dark:text-gray-400">Default method · </Text>
          <Text className="text-xs font-semibold text-brand-blue">{methodLabel(memoryMethod)}</Text>
          <Ionicons name="chevron-down" size={12} color={BLUE} style={{ marginLeft: 2 }} />
        </Pressable>
      </View>

      {/* Collections */}
      <View className="flex-row items-center justify-between mt-7 mb-2">
        <Text className="text-xs font-semibold uppercase tracking-wide text-brand-earth">Collections</Text>
        <Pressable onPress={() => setNewListOpen(true)} accessibilityRole="button" accessibilityLabel="New list" hitSlop={10} className="flex-row items-center active:opacity-60">
          <Ionicons name="add" size={15} color={BLUE} />
          <Text className="text-sm font-semibold text-brand-blue">New list</Text>
        </Pressable>
      </View>
      <View style={{ gap: 10 }}>
        {lists.map(([id, list]) => (
          <ListRow key={id} name={list.name} count={memoryDeck.filter((c) => c.collections.includes(id)).length} onPress={() => openCollection(id)} />
        ))}
        {MEMORY_PACKS.map((pack) => (
          <PackRow
            key={pack.id}
            pack={pack}
            inDeck={memoryDeck.filter((c) => c.collections.includes(pack.id)).length}
            onPress={() => openCollection(pack.id)}
          />
        ))}
      </View>

      {/* Deck */}
      <SectionLabel top>{`Your verses (${memoryDeck.length})`}</SectionLabel>
      <View className="flex-row flex-wrap mb-3" style={{ gap: 8 }}>
        {(["all", "due", "new", "secure"] as const).map((f) => (
          <Chip key={f} label={f === "all" ? "All" : f === "due" ? "Due" : f === "new" ? "New" : "Secure"} on={filter === f} onPress={() => setFilter(f)} />
        ))}
        {[...lists.map(([id, l]) => ({ id, name: l.name })), ...MEMORY_PACKS.map((p) => ({ id: p.id, name: p.title }))]
          .filter((c) => memoryDeck.some((card) => card.collections.includes(c.id)))
          .map((c) => (
            <Chip key={c.id} label={c.name} on={filter === c.id} onPress={() => setFilter(c.id)} />
          ))}
      </View>
      <View style={{ gap: 8 }}>
        {shown.map((card) => (
          <DeckRow key={card.id} card={card} onMenu={() => setMenuFor(card)} onPress={() => practice({ ids: card.id })} />
        ))}
        {shown.length === 0 && (
          <Text className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">No verses here yet.</Text>
        )}
      </View>

      <Sheet
        visible={methodOpen}
        title="Default method"
        subtitle="Sessions start with this. You can switch on any verse before you answer."
        onClose={() => setMethodOpen(false)}
        options={METHODS.map((m) => ({
          key: m.id,
          label: m.label,
          sub: m.sub,
          icon: m.icon,
          selected: memoryMethod === m.id,
          onPress: () => {
            setMemoryMethod(m.id);
            setMethodOpen(false);
          },
        }))}
      />
      <CardMenu card={menuFor} onClose={() => setMenuFor(null)} />
      <NewListSheet
        visible={newListOpen}
        onClose={() => setNewListOpen(false)}
        onCreate={(name) => {
          const id = createMemoryList(name);
          setNewListOpen(false);
          openCollection(id);
        }}
      />
    </View>
  );
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <View className="flex-1 items-center rounded-2xl bg-white/70 dark:bg-gray-900/40 py-3" accessible accessibilityLabel={`${value} ${label}`}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Text>
      <Text className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{label}</Text>
    </View>
  );
}

function Chip({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Show ${label}`}
      accessibilityState={{ selected: on }}
      className="rounded-full px-3.5 py-1.5 active:opacity-70"
      style={on ? { backgroundColor: BLUE } : { borderWidth: 1, borderColor: "#9CA3AF55" }}
    >
      <Text className="text-[13px] font-semibold" style={{ color: on ? "#FFFFFF" : "#6B7280" }}>
        {label}
      </Text>
    </Pressable>
  );
}

function SectionLabel({ children, top }: { children: string; top?: boolean }) {
  return (
    <Text className={`text-xs font-semibold uppercase tracking-wide text-brand-earth mb-2 ${top ? "mt-7" : ""}`}>
      {children}
    </Text>
  );
}

function PackRow({ pack, inDeck, onPress }: { pack: MemoryPack; inDeck: number; onPress: () => void }) {
  const total = pack.byVerse ? `${pack.passages[0].end - pack.passages[0].start + 1} verses` : `${pack.passages.length} verses`;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${pack.title} collection. ${pack.summary} ${inDeck > 0 ? `${inDeck} in your deck.` : ""}`}
      className="flex-row items-center rounded-3xl border border-gray-100 dark:border-gray-800 px-4 py-3.5 active:opacity-80"
    >
      <View className="w-10 h-10 rounded-full bg-brand-earth/15 items-center justify-center mr-3">
        <Ionicons name={pack.icon} size={17} color={EARTH} />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-bold text-gray-900 dark:text-white">{pack.title}</Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5" numberOfLines={2}>
          {inDeck > 0 ? `${inDeck} in your deck · ` : `${total} · `}
          {pack.summary}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    </Pressable>
  );
}

function ListRow({ name, count, onPress }: { name: string; count: number; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Your list ${name}, ${count} verses`}
      className="flex-row items-center rounded-3xl bg-gray-50 dark:bg-gray-800 px-4 py-3.5 active:opacity-80"
    >
      <View className="w-10 h-10 rounded-full bg-brand-blue/10 items-center justify-center mr-3">
        <Ionicons name="bookmark" size={16} color={BLUE} />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-bold text-gray-900 dark:text-white">{name}</Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Your list · {count} {count === 1 ? "verse" : "verses"}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    </Pressable>
  );
}

export function statusText(card: MemoryCard): string {
  const status = cardStatus(card);
  if (status === "due" || status === "new") return STATUS_STYLE[status].label;
  const days = daysUntil(card.srs);
  const when = days <= 0 ? "later today" : days === 1 ? "tomorrow" : `in ${days} days`;
  return `${STATUS_STYLE[status].label} · next ${when}`;
}

export function DeckRow({ card, onPress, onMenu }: { card: MemoryCard; onPress: () => void; onMenu: () => void }) {
  const status = cardStatus(card);
  const style = STATUS_STYLE[status];
  return (
    <View className="flex-row items-center rounded-2xl bg-gray-50 dark:bg-gray-800">
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${card.verseReference}, ${card.translation}. ${statusText(card)}. Practice this verse`}
        className="flex-1 pl-4 py-3 active:opacity-70"
      >
        <View className="flex-row items-center">
          <Text className="text-[15px] font-semibold text-gray-900 dark:text-white">{card.verseReference}</Text>
          <Text className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 ml-1.5">{card.translation}</Text>
        </View>
        <Text style={{ fontFamily: serifFont }} className="text-[14px] text-gray-600 dark:text-gray-300 mt-1" numberOfLines={1}>
          {card.verseText}
        </Text>
        <View className="flex-row items-center mt-1.5">
          <View className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: style.color }} />
          <Text className="text-[11px] font-semibold" style={{ color: style.color }}>
            {statusText(card)}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onMenu}
        accessibilityRole="button"
        accessibilityLabel={`More for ${card.verseReference}`}
        hitSlop={8}
        className="px-4 py-5 active:opacity-60"
      >
        <Ionicons name="ellipsis-horizontal" size={18} color="#9CA3AF" />
      </Pressable>
    </View>
  );
}

/** Practice, open in Read, add to a list, or remove (with a confirm step). */
export function CardMenu({ card, onClose }: { card: MemoryCard | null; onClose: () => void }) {
  const router = useRouter();
  const memoryLists = useAppStore((s) => s.memoryLists);
  const setCardCollections = useAppStore((s) => s.setCardCollections);
  const removeFromMemoryDeck = useAppStore((s) => s.removeFromMemoryDeck);
  const live = useAppStore((s) => (card ? s.memoryDeck.find((c) => c.id === card.id) : undefined));
  const [view, setView] = useState<"main" | "lists" | "confirm">("main");

  const close = () => {
    setView("main");
    onClose();
  };
  if (!card) return null;
  const lists = Object.entries(memoryLists).filter(([, l]) => !l.deleted);
  const collections = live?.collections ?? card.collections;

  if (view === "lists") {
    return (
      <Sheet
        visible
        title="Add to a list"
        subtitle={lists.length ? card.verseReference : "Make a list first with New list on Memory."}
        onClose={close}
        options={lists.map(([id, l]) => {
          const on = collections.includes(id);
          return {
            key: id,
            label: l.name,
            icon: on ? "bookmark" : "bookmark-outline",
            selected: on,
            onPress: () => setCardCollections(card.id, on ? collections.filter((c) => c !== id) : [...collections, id]),
          };
        })}
      />
    );
  }

  if (view === "confirm") {
    return (
      <Sheet
        visible
        title={`Remove ${card.verseReference}?`}
        subtitle="Its review history goes with it. You can add the verse again any time."
        onClose={close}
        options={[
          {
            key: "remove",
            label: "Remove from my verses",
            icon: "trash-outline",
            destructive: true,
            onPress: () => {
              removeFromMemoryDeck(card.id);
              close();
            },
          },
          { key: "keep", label: "Keep it", icon: "close", onPress: close },
        ]}
      />
    );
  }

  return (
    <Sheet
      visible
      title={card.verseReference}
      subtitle={statusText(live ?? card)}
      onClose={close}
      options={[
        {
          key: "practice",
          label: "Practice this verse",
          sub: "Won't change its schedule",
          icon: "play-circle-outline",
          onPress: () => {
            close();
            router.push({ pathname: "/memory/review", params: { mode: "practice", ids: card.id } });
          },
        },
        {
          key: "read",
          label: "Open in Read",
          icon: "book-outline",
          onPress: () => {
            close();
            router.push({
              pathname: "/read/[book]/[chapter]",
              params: { book: card.book, chapter: String(card.chapter), v: String(card.start), ...(card.end !== card.start ? { e: String(card.end) } : {}) },
            });
          },
        },
        { key: "lists", label: "Add to a list", icon: "bookmark-outline", onPress: () => setView("lists") },
        { key: "remove", label: "Remove", icon: "trash-outline", destructive: true, onPress: () => setView("confirm") },
      ]}
    />
  );
}

export function NewListSheet({
  visible,
  onClose,
  onCreate,
  title = "New list",
  initial = "",
  action = "Create list",
}: {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  title?: string;
  initial?: string;
  action?: string;
}) {
  const [name, setName] = useState(initial);
  const ok = name.trim().length > 0;
  return (
    <Sheet visible={visible} title={title} subtitle="Group verses your way, like “Verses for this season”." onClose={onClose}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="List name"
        placeholderTextColor="#9CA3AF"
        autoFocus
        maxLength={40}
        accessibilityLabel="List name"
        onSubmitEditing={() => ok && onCreate(name)}
        className="mt-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 text-base text-gray-900 dark:text-white"
      />
      <Pressable
        onPress={() => ok && onCreate(name)}
        disabled={!ok}
        accessibilityRole="button"
        accessibilityLabel={action}
        accessibilityState={{ disabled: !ok }}
        className="rounded-2xl bg-brand-blue py-3.5 items-center mt-4 active:opacity-80"
        style={{ opacity: ok ? 1 : 0.4 }}
      >
        <Text className="text-base font-semibold text-white">{action}</Text>
      </Pressable>
    </Sheet>
  );
}
