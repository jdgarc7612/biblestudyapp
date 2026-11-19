import { Redirect } from "expo-router";

/** Google and Apple sign-in return to the app here; the sign-in itself is finished elsewhere. */
export default function AuthCallback() {
  return <Redirect href="/profile" />;
}
