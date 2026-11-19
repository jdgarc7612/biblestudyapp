import * as AppleAuthentication from "expo-apple-authentication";
import { useColorScheme } from "react-native";

/** On iPhone, Apple's own button. */
export function AppleButton({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) {
  const dark = useColorScheme() === "dark";
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={
        dark
          ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
          : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
      }
      cornerRadius={16}
      style={{ height: 50, opacity: disabled ? 0.6 : 1 }}
      onPress={disabled ? () => {} : onPress}
    />
  );
}
