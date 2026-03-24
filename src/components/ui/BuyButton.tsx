"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const BuyButton = ({ purchaseLink }: { purchaseLink: string }) => {
 const router = useRouter();

 return (
  <button
   onClick={() => router.push(purchaseLink)}
   className="group relative w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden"
  >
   <span className="relative z-10">Get Started Now</span>
   <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />

   <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
  </button>
 );
};

export default BuyButton;
