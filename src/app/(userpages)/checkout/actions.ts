"use server";

import { polar } from "@/utils/polar/polarClient";

export async function getCheckoutSession(id: string) {
 try {
  const result = await polar.checkouts.get({ id });
  return { checkout: result };
 } catch (error) {
  return { error: "Could not retrieve order details." };
 }
}
