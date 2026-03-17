import { NextResponse } from "next/server";
import { polar } from "@/utils/polar/polarClient";

export async function POST(req: Request) {
 try {
  const { planId, customerName, customerEmail, userId, credits, planName } =
   await req.json();

  if (!planId || !customerName || !customerEmail || !userId) {
   return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const session = await polar.checkouts.create({
   customerName,
   customerEmail,
   customerBillingAddress: { country: "US" },
   returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
   successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?checkout_id={CHECKOUT_ID}`,
   products: [planId],
   metadata: {
    user_id: userId,
    credits: String(credits),
    plan: planName.toLowerCase()
   }
  });

  return NextResponse.json({ url: session.url });
 } catch (err) {
  return NextResponse.json(
   { error: err instanceof Error ? err.message : "Error" },
   { status: 500 }
  );
 }
}
