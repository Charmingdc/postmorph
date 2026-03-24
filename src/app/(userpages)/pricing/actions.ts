"use server";

import { client } from "@/utils/dodopayment/client";
import type { PaymentActionResult, PaymentResponse } from "./types";

export async function getPaymentStatus(
  paymentId: string | undefined
): Promise<PaymentActionResult> {
  if (!paymentId) return {};

  try {
    const result = await client.payments.retrieve(paymentId);
    return { 
      payment: result as unknown as PaymentResponse 
    };
  } catch (err) {
    console.error("Error retrieving payment:", err);
    return { error: "Failed to fetch payment details." };
  }
}
