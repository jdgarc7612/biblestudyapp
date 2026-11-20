import { Redirect } from "expo-router";

/** Memory now lives in the Study tab. */
export default function OldMemoryRedirect() {
  return <Redirect href={{ pathname: "/study", params: { tab: "memory" } }} />;
}
