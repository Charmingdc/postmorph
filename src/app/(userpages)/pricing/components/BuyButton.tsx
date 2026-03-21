"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Profile } from "@/types";

export default function BuyButton({
 planId,
 profile,
 credits,
 planName
}: {
 planId: string;
 profile?: Profile | null;
 credits: number;
 planName: string;
}) {
 const [loading, setLoading] = useState(false);

 const handleBuy = async () => {
  if (!profile) {
   toast.error("Please log in first.");
   return;
  }

  setLoading(true);
  try {
   const res = await fetch("/api/createCheckout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     planId,
     customerName: profile.full_name,
     customerEmail: profile.email,
     userId: profile.user_id,
     credits,
     planName: planName.toLowerCase()
    })
   });

   const data = await res.json();

   if (data.url) {
    window.location.href = data.url;
   } else {
    toast.error(data.error || "Checkout failed");
   }
  } catch (err) {
   console.error("Error creating checkout session (client):", err);
   toast.error("Network error");
  } finally {
   setLoading(false);
  }
 };

 return (
  <button
   onClick={handleBuy}
   disabled={loading}
   className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:brightness-110 disabled:opacity-50"
  >
   {loading ? "Processing..." : "Buy Credits Pack"}
  </button>
 );
}
