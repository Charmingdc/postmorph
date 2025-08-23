import type { UserLog } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export default async function logUserAction(
  supabase: SupabaseClient,
  log: Omit<UserLog, "credits_before" | "credits_after"> & {
    user?: { total_credits: number; used_credits: number };
    credit_cost?: number;
  }
) {
  const creditsBefore =
    log.user && log.user.total_credits != null && log.user.used_credits != null
      ? log.user.total_credits - log.user.used_credits
      : null;

  const creditsAfter =
    creditsBefore != null && log.credit_cost != null
      ? creditsBefore - log.credit_cost
      : creditsBefore;

  await supabase.from("user_logs").insert({
    ...log,
    credits_before: creditsBefore,
    credits_after: creditsAfter ?? creditsBefore
  });
}
