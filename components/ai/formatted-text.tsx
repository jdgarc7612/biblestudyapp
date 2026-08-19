import { Text, View } from "react-native";
import type { TextStyle } from "react-native";

/** Renders **bold** segments and blank-line-separated paragraphs from plain text. */
export function FormattedText({
  text,
  style,
  className,
}: {
  text: string;
  style?: TextStyle;
  className?: string;
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
            {parts.map((part, i) => {
              const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
              return boldMatch ? (
                <Text key={i} style={{ fontWeight: "700" }}>
                  {boldMatch[1]}
                </Text>
              ) : (
                <Text key={i}>{part}</Text>
              );
            })}
          </Text>
        );
      })}
    </View>
  );
}
