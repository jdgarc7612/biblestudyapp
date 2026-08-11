import { View, Text } from "react-native";
import { useAppStore } from "../../store/useAppStore";

export default function HomeScreen() {
  const tokenBalance = useAppStore((state) => state.tokenBalance);

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 px-6">
      <Text className="text-2xl font-bold text-[#4A6FA5] dark:text-white mb-2">
        Home
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400">
        Token Balance: {tokenBalance}
      </Text>
    </View>
  );
}