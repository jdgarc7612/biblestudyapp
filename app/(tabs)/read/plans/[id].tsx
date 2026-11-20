import { Redirect, useLocalSearchParams } from "expo-router";

import { STUDY_PLANS } from "../../../../lib/plans";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return STUDY_PLANS.map((p) => ({ id: p.id }));
}

/** Plans moved to the Study tab; old links open the same plan there. */
export default function OldPlanRedirect() {
  const { id, day } = useLocalSearchParams<{ id: string; day?: string }>();
  return <Redirect href={{ pathname: "/study/plans/[id]", params: { id, ...(day ? { day } : {}) } }} />;
}
