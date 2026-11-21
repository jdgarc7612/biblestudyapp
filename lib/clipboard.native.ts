/** Phone clipboard through expo-clipboard (the web build uses lib/clipboard.ts instead). */
import * as Clipboard from "expo-clipboard";

export async function writeClipboard(text: string): Promise<boolean> {
  try {
    return await Clipboard.setStringAsync(text);
  } catch {
    return false;
  }
}
