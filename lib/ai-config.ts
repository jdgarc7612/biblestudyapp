/**
 * Free live AI questions per day: per account when signed in (counted on the server), per
 * device for guests. Keep AI_DAILY_LIMIT on the worker in step if this changes.
 */
export const AI_DAILY_QUESTION_LIMIT = 5;

/**
 * Where live answers come from. Set EXPO_PUBLIC_AI_ENDPOINT at build time to the
 * deployed worker's URL (for example https://deepword-ai.<you>.workers.dev).
 * When it's empty, the app uses its built-in offline answers instead.
 */
export const AI_ENDPOINT = (process.env.EXPO_PUBLIC_AI_ENDPOINT ?? "").trim().replace(/\/+$/, "");

export const isLiveAiConfigured = AI_ENDPOINT.length > 0;
