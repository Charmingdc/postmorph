import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserLog } from "@/types/index";

type UserProfile = {
  total_credits: number;
  used_credits: number;
};
type UserLogInput = Omit<
  UserLog,
  "id" | "credits_before" | "credits_after" | "action_at"
>;
export default async function logUserAction(
  supabase: SupabaseClient,
  log: UserLogInput & {
    user?: UserProfile;
  }
) {
  try {
    const userData = log.user;

    // Compute credits_before and credits_after
    const creditsBefore =
      userData &&
      userData.total_credits != null &&
      userData.used_credits != null
        ? userData.total_credits - userData.used_credits
        : null;

    const creditsAfter =
      creditsBefore != null && log.credit_cost != null
        ? creditsBefore - log.credit_cost
        : creditsBefore;

    // Remove `user` before inserting
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user: __unused, ...logData } = log;

    // Final payload for DB
    const insertPayload = {
      ...logData,
      credits_before: creditsBefore ?? null,
      credits_after: creditsAfter ?? creditsBefore ?? null
    };

    const { error } = await supabase.from("user_logs").insert(insertPayload);

    if (error) {
      throw new Error(error.message);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error occurred when logging user action:", err.message);
    } else {
      console.error("An unknown error occurred when logging user action");
    }
  }
}
