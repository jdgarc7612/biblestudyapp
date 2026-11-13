import { Text, View } from "react-native";
import type { TextStyle } from "react-native";

import { findReferences, type FoundReference } from "../../lib/bible";

/** Splits a run of text so Bible references become their own tappable pieces. */
function renderWithReferences(
  text: string,
  keyPrefix: string,
  onReferencePress?: (ref: FoundReference) => void,
  bold = false
) {
  const weight = bold ? ({ fontWeight: "700" } as const) : undefined;
  if (!onReferencePress) {
    return [
      <Text key={keyPrefix} style={weight}>
        {text}
      </Text>,
    ];
  }
  const refs = findReferences(text);
  const out = [];
  let cursor = 0;
  refs.forEach((ref, i) => {
    if (ref.index > cursor) {
      out.push(
        <Text key={`${keyPrefix}-t${i}`} style={weight}>
          {text.slice(cursor, ref.index)}
        </Text>
      );
    }
    out.push(
      <Text
        key={`${keyPrefix}-r${i}`}
        onPress={() => onReferencePress(ref)}
        accessibilityRole="link"
        accessibilityHint={`Opens ${ref.book.name} ${ref.chapter}`}
        style={[weight, { color: "#4A6FA5", textDecorationLine: "underline", textDecorationColor: "#4A6FA566" }]}
      >
        {ref.text}
      </Text>
    );
    cursor = ref.index + ref.length;
  });
  if (cursor < text.length) {
    out.push(
      <Text key={`${keyPrefix}-end`} style={weight}>
        {text.slice(cursor)}
      </Text>
    );
  }
  return out;
}

/**
 * Renders **bold** segments and blank-line-separated paragraphs from plain text.
 * When `onReferencePress` is given, Bible references (e.g. "Romans 8:28") become links.
 */
export function FormattedText({
  text,
  style,
  className,
  onReferencePress,
}: {
  text: string;
  style?: TextStyle;
  className?: string;
  onReferencePress?: (ref: FoundReference) => void;
}) {
  const paragraphs = text.split(/\n\n+/);

  return (
    <View>
      {paragraphs.map((paragraph, pIndex) => {
        const parts = paragraph.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
        return (
          <Text
            key={pIndex}
            style={[style, pIndex < paragraphs.length - 1 ? { marginBottom: 10 } : undefined]}
            className={className}
          >
            {parts.flatMap((part, i) => {
              const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
              return boldMatch
                ? renderWithReferences(boldMatch[1], `${i}`, onReferencePress, true)
                : renderWithReferences(part, `${i}`, onReferencePress);
            })}
          </Text>
        );
      })}
    </View>
  );
}
