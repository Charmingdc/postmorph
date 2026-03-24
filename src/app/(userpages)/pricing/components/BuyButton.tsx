"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
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
   className="group relative w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
  >
   {loading ? (
    <Loader2 className="w-5 h-5 animate-spin" />
   ) : (
    <>
     <span>Get {planName} Pack</span>
     <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
    </>
   )}

   <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
  </button>
 );
}
