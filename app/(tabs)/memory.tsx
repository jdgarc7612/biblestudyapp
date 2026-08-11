import { View, Text } from "react-native";
import { useAppStore } from "../../store/useAppStore";

export default function MemoryScreen() {
  const memoryDeck = useAppStore((state) => state.memoryDeck);

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 px-6">
      <Text className="text-2xl font-bold text-[#4A6FA5] dark:text-white mb-2">
        Memory
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400">
        Cards in deck: {memoryDeck.length}
      </Text>
    </View>
  );
}