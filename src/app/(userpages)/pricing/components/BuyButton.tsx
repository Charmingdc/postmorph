"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function BuyButton({
 planId,
 profile
}: {
 planId: string;
 profile?: any;
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
     customerEmail: profile.email
    })
   });

   const data = await res.json();

   if (data.url) {
    window.location.href = data.url;
   } else {
    toast.error(data.error || "Checkout failed");
   }
  } catch (err) {
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
   {loading ? "Processing..." : "Buy Now"}
  </button>
 );
}
