import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { createAdminClient } from "@/utils/supabase/createAdminClient";

const client = new DodoPayments({
 bearerToken: process.env.DODO_PAYMENTS_API_KEY,
 environment:
  (process.env.DODO_PAYMENTS_ENVIRONMENT as "live_mode" | "test_mode") ||
  "live_mode",
 webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY
});

const processedWebhooks = new Set();
export async function POST(req: Request) {
 try {
  const webhookId = req.headers.get("webhook-id");

  if (processedWebhooks.has(webhookId)) {
   return NextResponse.json({ received: true }, { status: 200 });
  }
  processedWebhooks.add(webhookId);

  const rawBody = await req.text();

  const webhookSignature = req.headers.get("webhook-signature");
  const webhookTimestamp = req.headers.get("webhook-timestamp");

  if (!webhookId || !webhookSignature || !webhookTimestamp) {
   return NextResponse.json(
    { error: "Missing required webhook headers" },
    { status: 400 }
   );
  }

  const unwrappedEvent = client.webhooks.unwrap(rawBody, {
   headers: {
    "webhook-id": webhookId,
    "webhook-signature": webhookSignature,
    "webhook-timestamp": webhookTimestamp
   }
  });

  await processWebhookEvent(unwrappedEvent);

  return NextResponse.json({ received: true }, { status: 200 });
 } catch (err: unknown) {
  console.error("Webhook verification failed: ", err);

  if (err instanceof Error) {
   return NextResponse.json({ error: err.message }, { status: 400 });
  }
  return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
 }
}

async function processWebhookEvent(event: any) {
 switch (event.type) {
  case "payment.succeeded":
   await handlePaymentSucceeded(event.data || event.payload || event);
   break;
  default:
   console.log(`Unhandled webhook event type: ${event.type}`);
 }
}

async function handlePaymentSucceeded(paymentData: any) {
 const metadata = paymentData?.metadata;

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
  console.error("-> Missing userId or credits in webhook metadata:", metadata);
 }
}
