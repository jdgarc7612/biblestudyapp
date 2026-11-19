/**
 * Free daily questions for signed-in readers, counted in Supabase (see supabase/schema.sql).
 * The reader's own access token is passed through, so Supabase checks who they are and the
 * database functions only ever touch that person's count.
 */

export type QuotaCheck = number | "signed_out" | "unavailable";

export interface AccountQuota {
  used(): Promise<QuotaCheck>;
  record(): Promise<QuotaCheck>;
}

/** Today's date (YYYY-MM-DD) in the reader's time zone, falling back to UTC. */
export function accountDay(timeZone: string | null, now = new Date()): string {
  try {
    if (timeZone && timeZone.length <= 64) {
      return new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(now);
    }
  } catch {
    // Unknown zone: use UTC below.
  }
  return now.toISOString().slice(0, 10);
}

export function makeAccountQuota(
  supabaseUrl: string,
  supabaseKey: string,
  accessToken: string,
  day: string
): AccountQuota {
  const call = async (fn: string): Promise<QuotaCheck> => {
    try {
      const res = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/${fn}`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ p_day: day }),
      });
      if (res.status === 401 || res.status === 403) return "signed_out";
      if (!res.ok) {
        console.error("Supabase quota call failed", fn, res.status);
        return "unavailable";
      }
      const value = await res.json();
      return typeof value === "number" ? value : "unavailable";
    } catch (err) {
      console.error("Supabase quota call error", fn, err);
      return "unavailable";
    }
  };
  return {
    used: () => call("ai_questions_used"),
    record: () => call("record_ai_question"),
  };
}
