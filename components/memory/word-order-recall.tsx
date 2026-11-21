import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { serifFont } from "../../constants/fonts";
import { cutTiles, orderAccuracy, scrambleTiles, tileMarks, type Tile } from "../../lib/word-order";
import { ResultLine } from "./word-bank-recall";

const BLUE = "#4A6FA5";
const EARTH = "#C19A6B";
const GREEN = "#15803D";

/**
 * Put the verse back together: tap its scrambled words (or short phrases) in order, then check.
 * Calls onComplete(accuracy) once checked.
 */
export function WordOrderRecall({
  reference,
  text,
  seed,
  onComplete,
}: {
  reference: string;
  text: string;
  seed: string;
  onComplete: (accuracy: number) => void;
}) {
  const tiles = useMemo(() => cutTiles(text), [text]);
  const scrambled = useMemo(() => scrambleTiles(tiles, seed), [tiles, seed]);
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [checked, setChecked] = useState(false);
  const placedIds = new Set(placed.map((t) => t.id));
  const bank = scrambled.filter((t) => !placedIds.has(t.id));
  const marks = checked ? tileMarks(placed, tiles) : [];
  const right = marks.filter(Boolean).length;
  const phrases = tiles.some((t) => /\s/.test(t.text));

  const check = () => {
    setChecked(true);
    onComplete(orderAccuracy(placed, tiles));
  };

  return (
    <View>
      <Text className="text-sm text-gray-500 dark:text-gray-400 leading-5">
        {checked
          ? `${reference}, as you put it together`
          : `Tap the ${phrases ? "phrases" : "words"} of ${reference} in order.`}
      </Text>

      <View
        className="mt-3 rounded-3xl border border-dashed px-3 py-3 flex-row flex-wrap"
        style={{ gap: 8, minHeight: 96, borderColor: `${BLUE}66` }}
        accessibilityLabel={
          placed.length ? `Your order so far: ${placed.map((t) => t.text).join(" ")}` : "Nothing placed yet"
        }
      >
        {placed.length === 0 && (
          <Text className="text-sm text-gray-400 dark:text-gray-500 self-center px-2">The verse builds here</Text>
        )}
        {placed.map((tile, i) => {
          if (checked) {
            const ok = marks[i];
            return (
              <View
                key={tile.id}
                className="flex-row items-center rounded-full px-3 py-2"
                style={{ backgroundColor: ok ? `${GREEN}14` : `${EARTH}1F`, borderWidth: 1, borderColor: ok ? `${GREEN}55` : `${EARTH}80` }}
                accessible
                accessibilityLabel={`${i + 1}: ${tile.text}, ${ok ? "right place" : "wrong place"}`}
              >
                <Ionicons name={ok ? "checkmark" : "close"} size={14} color={ok ? GREEN : EARTH} />
                <Text
                  style={{ fontFamily: serifFont, textDecorationLine: ok ? "none" : "line-through" }}
                  className="text-base text-gray-900 dark:text-gray-100 ml-1"
                >
                  {tile.text}
                </Text>
              </View>
            );
          }
          return (
            <Pressable
              key={tile.id}
              onPress={() => setPlaced((p) => p.filter((t) => t.id !== tile.id))}
              accessibilityRole="button"
              accessibilityLabel={`${i + 1}: ${tile.text}. Take it back`}
              className="rounded-full px-3.5 py-2 active:opacity-70"
              style={{ backgroundColor: BLUE }}
            >
              <Text style={{ fontFamily: serifFont }} className="text-base text-white">
                {tile.text}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {!checked ? (
        <>
          <View className="flex-row flex-wrap mt-6" style={{ gap: 8 }}>
            {bank.map((tile) => (
              <Pressable
                key={tile.id}
                onPress={() => setPlaced((p) => [...p, tile])}
                accessibilityRole="button"
                accessibilityLabel={`Add “${tile.text}”`}
                className="rounded-full px-3.5 py-2 active:opacity-70"
                style={{ backgroundColor: `${BLUE}1A`, borderWidth: 1, borderColor: `${BLUE}40` }}
              >
                <Text style={{ fontFamily: serifFont, color: BLUE }} className="text-base font-medium">
                  {tile.text}
                </Text>
              </Pressable>
            ))}
          </View>
          <View className="flex-row items-center justify-between mt-5">
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              {placed.length} of {tiles.length} placed
            </Text>
            {placed.length > 0 && (
              <Pressable
                onPress={() => setPlaced([])}
                accessibilityRole="button"
                accessibilityLabel="Start the order again"
                hitSlop={10}
                className="flex-row items-center active:opacity-60"
              >
                <Ionicons name="refresh" size={14} color={BLUE} />
                <Text className="text-sm font-semibold text-brand-blue ml-1">Start over</Text>
              </Pressable>
            )}
          </View>
          {bank.length === 0 && (
            <Pressable
              onPress={check}
              accessibilityRole="button"
              accessibilityLabel="Check my order"
              className="mt-6 rounded-2xl bg-brand-blue py-4 items-center active:opacity-80"
            >
              <Text className="text-base font-semibold text-white">Check</Text>
            </Pressable>
          )}
        </>
      ) : (
        <>
          <ResultLine
            ok={right === tiles.length}
            text={
              right === tiles.length
                ? "Every piece in its place"
                : `${right} of ${tiles.length} in the right place · misses are crossed out`
            }
          />
          {right < tiles.length && (
            <Text style={{ fontFamily: serifFont }} className="text-xl leading-9 text-gray-900 dark:text-gray-100 mt-4">
              {text}
            </Text>
          )}
        </>
      )}
    </View>
  );
}
