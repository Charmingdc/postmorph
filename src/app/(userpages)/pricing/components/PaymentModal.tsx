"use client";

import {
 Check,
 X,
 AlertCircle,
 XCircle,
 Tag,
 ExternalLink,
 CreditCard
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { PaymentResponse } from "../types";

interface PaymentModalProps {
 data: PaymentResponse;
}

const PaymentModal = ({ data }: PaymentModalProps) => {
 const router = useRouter();

 const handleClose = () => {
  router.replace("/pricing", { scroll: false });
 };

 const configs = {
  succeeded: {
   icon: <Check className="w-8 h-8 text-green-500" />,
   title: "Payment Successful",
   description: `Your credits have been added. A receipt was sent to ${data.customer.email}.`,
   btnClass: "bg-blue-500 hover:bg-blue-600 text-white"
  },
  failed: {
   icon: <XCircle className="w-8 h-8 text-red-500" />,
   title: "Payment Failed",
   description:
    data.error_message ||
    "The transaction was declined. Please try a different payment method.",
   btnClass: "bg-red-500 hover:bg-red-600 text-white"
  },
  cancelled: {
   icon: <AlertCircle className="w-8 h-8 text-yellow-500" />,
   title: "Payment Cancelled",
   description: "The checkout process was cancelled. No charges were made.",
   btnClass: "bg-slate-800 hover:bg-slate-900 text-white"
  }
 };

 const config = configs[data.status as keyof typeof configs] || configs.failed;

 return (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-md animate-in fade-in duration-300">
   <div className="relative w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
    <button
     onClick={handleClose}
     className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors"
    >
     <X className="w-5 h-5" />
    </button>

    <div className="flex flex-col items-center text-center">
     <div className="mb-6 p-4 rounded-full bg-secondary">{config.icon}</div>

     <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
     <p className="text-muted-foreground text-sm leading-relaxed mb-6">
      {config.description}
     </p>

     {/* Payment Method & Discount Info */}
     <div className="w-full space-y-3 mb-8">
      {data.card_last_four && (
       <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
        <div className="flex items-center gap-3">
         <CreditCard className="w-4 h-4 text-muted-foreground" />
         <span className="text-sm font-medium">Payment Method</span>
        </div>
        <span className="text-sm text-muted-foreground uppercase">
         {data.card_network} •••• {data.card_last_four}
        </span>
       </div>
      )}

      {data.status === "succeeded" && data.discount_id && (
       <div className="flex items-center justify-between p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
        <div className="flex items-center gap-3">
         <Tag className="w-4 h-4 text-green-600" />
         <span className="text-sm font-medium text-green-700">
          Discount Applied
         </span>
        </div>
        <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full uppercase">
         Active
        </span>
       </div>
      )}
     </div>

     <div className="flex flex-col gap-3 w-full">
      <button
       onClick={handleClose}
       className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-md hover:shadow-lg ${config.btnClass}`}
      >
       {data.status === "succeeded" ? "Continue to App" : "Close"}
      </button>

      {data.invoice_url && data.status === "succeeded" && (
       <a
        href={data.invoice_url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground py-2 transition-colors"
       >
        <ExternalLink className="w-3 h-3" />
        View Receipt
       </a>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default PaymentModal;
