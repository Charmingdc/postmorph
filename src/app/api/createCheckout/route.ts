import { NextResponse } from "next/server";
import { client } from "@/utils/dodopayment/client";

export async function POST(req: Request) {
 try {
  const { planId, customerName, customerEmail, userId, credits, planName } =
   await req.json();

  if (!planId || !customerName || !customerEmail || !userId) {
   return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const session = await client.checkoutSessions.create({
   product_cart: [{ product_id: planId, quantity: 1 }],
   allowed_payment_method_types: [
    "apple_pay",
    "credit",
    "crypto_currency",
    "cashapp",
    "classic",
    "debit",
    "dana",
    "google_pay",
    "go_pay",
    "momo",
    "momo_atm",
    "samsung_pay",
    "zip"
   ],
   billing_address: {
    country: "US"
   },
   customer: {
    email: customerEmail,
    name: customerName
   },
   feature_flags: { allow_customer_editing_country: true },
   metadata: {
    user_id: userId,
    credits: String(credits),
    plan: planName.toLowerCase()
   },
   return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`
  });

  return NextResponse.json({ url: session.checkout_url });
 } catch (err) {
  console.error(err);
  return NextResponse.json(
   { error: err instanceof Error ? err.message : "Error" },
   { status: 500 }
  );
 }
}
