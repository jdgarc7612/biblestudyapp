import { Redirect } from "expo-router";

/** Guided studies moved to the Study tab; old links land there. */
export default function OldPlansRedirect() {
  return <Redirect href="/study" />;
}
