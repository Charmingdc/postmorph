import { Webhooks } from "@polar-sh/nextjs";
import { createAdminClient } from "@/utils/supabase/createAdminClient";

export const POST = Webhooks({
 webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

 onOrderPaid: async order => {
  const metadata = order.data.metadata;

  const userId = metadata?.user_id as string;
  const creditsToAdd = Number(metadata?.credits) || 0;
  const planName = ((metadata?.plan as string) || "pro").toLowerCase();

  if (userId && creditsToAdd > 0) {
   const supabase = createAdminClient();

   const { error } = await supabase.rpc("handle_order_payment", {
    target_id: userId,
    credit_amount: creditsToAdd,
    plan_name: planName
   });

   if (error) {
    console.error("-> Supabase RPC Error:", error.message);
   } else {
    console.log(`-> SUCCESS: ${creditsToAdd} credits added to ${userId}`);
   }
  } else {
   console.warn("-> Conditions not met: Missing userId or creditsToAdd is 0.");
   console.log("Values found:", { userId, creditsToAdd });
  }
 },

 onCheckoutCreated: async checkout => {
  console.log("-> Checkout started for:", checkout.data.customerEmail);
 }
});
