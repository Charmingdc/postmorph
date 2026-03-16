import { getCheckoutSession } from "./actions";
import {
 CheckCircle,
 XCircle,
 Tag,
 User,
 Mail,
 Calendar,
 AlertCircle,
 Hash
} from "lucide-react";
import Link from "next/link";

interface PolarDiscount {
 id: string;
 name: string;
 code?: string;
 type: "fixed" | "percentage";
 basisPoints?: number;
}

interface PolarCheckout {
 id: string;
 status: string;
 amount: number;
 discountAmount: number;
 totalAmount: number;
 customerName: string | null;
 customerEmail: string | null;
 createdAt: string | Date;
 product?: { name: string };
 discount: PolarDiscount | null;
}

export default async function CheckoutPage({
 searchParams
}: {
 searchParams: { checkout_id?: string };
}) {
 const sessionId = searchParams.checkout_id;

 if (!sessionId) {
  return (
   <div className="flex items-center justify-center min-h-screen px-6">
    <div className="max-w-sm w-full border border-border bg-card rounded-xl py-3 px-6 text-center text-sm font-bold">
     <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
     Session ID Missing
    </div>
   </div>
  );
 }

 const { checkout, error } = (await getCheckoutSession(sessionId)) as {
  checkout: PolarCheckout | null;
  error: string | null;
 };

 if (error || !checkout) {
  return (
   <div className="flex items-center justify-center min-h-screen px-6">
    <div className="max-w-sm w-full border border-border bg-card rounded-lg py-3 px-6 text-center font-bold">
     <XCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
     Order Not Found
    </div>
   </div>
  );
 }

 const isSuccess = checkout.status === "succeeded";

 const basePrice = checkout.amount / 100;
 const discountVal = checkout.discountAmount / 100;
 const totalPaid = checkout.totalAmount / 100;

 return (
  <div className="flex flex-col items-center justify-center min-h-screen px-4">
   <div className="w-full max-w-xl border border-border bg-card rounded-2xl pt-2 pb-8 px-8">
    {isSuccess ? (
     <div className="space-y-2">
      <div className="flex items-center gap-4 pb-6 border-b border-border">
       <CheckCircle className="w-8 h-8 text-primary" />
       <div>
        <h1 className="text-xl font-bold tracking-tight">Payment Successful</h1>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">
         Receipt #{checkout.id.slice(0, 8).toUpperCase()}
        </p>
       </div>
      </div>

      <div className="space-y-3">
       <div className="flex justify-between text-sm">
        <span className="text-muted-foreground font-medium">Plan</span>
        <span className="font-semibold">{checkout.product?.name}</span>
       </div>

       <div className="flex justify-between text-sm">
        <span className="text-muted-foreground font-medium">
         Original Price
        </span>
        <span>${basePrice.toFixed(2)}</span>
       </div>

       {checkout.discount && (
        <div className="flex justify-between text-sm text-primary font-bold">
         <span className="flex items-center gap-1.5 uppercase tracking-tighter text-[11px]">
          <Tag className="w-3.5 h-3.5" />
          {checkout.discount.name} ({checkout.discount.code})
         </span>
         <span>-${discountVal.toFixed(2)}</span>
        </div>
       )}

       <div className="flex justify-between items-baseline pt-4 border-t border-border mt-2">
        <span className="text-sm font-bold">Total Paid</span>
        <span className="text-3xl font-black">${totalPaid.toFixed(2)}</span>
       </div>
      </div>

      <div className="pt-6 border-t border-border grid grid-cols-1 gap-4">
       {checkout.customerName && (
        <div className="flex items-center gap-3 text-sm">
         <User className="w-4 h-4 text-muted-foreground" />
         <span className="font-semibold">{checkout.customerName}</span>
        </div>
       )}
       {checkout.customerEmail && (
        <div className="flex items-center gap-3 text-sm">
         <Mail className="w-4 h-4 text-muted-foreground" />
         <span className="font-medium text-muted-foreground">
          {checkout.customerEmail}
         </span>
        </div>
       )}
       <div className="flex items-center gap-3 text-sm">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium text-muted-foreground">
         {new Date(checkout.createdAt).toLocaleDateString()}
        </span>
       </div>
      </div>

      <Link
       href="/repurpose"
       className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-md font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] mt-1"
      >
       Start Repurposing
      </Link>
     </div>
    ) : (
     <div className="text-center py-6">
      <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
      <h2 className="text-lg font-bold uppercase">Payment {checkout.status}</h2>
      <Link
       href="/pricing"
       className="mt-4 block text-sm underline font-bold opacity-60 mt-1"
      >
       Try Again
      </Link>
     </div>
    )}
   </div>
   <p className="text-[9px] text-muted-foreground mt-8 uppercase tracking-[0.3em] font-black opacity-30 italic">
    Secure Transaction
   </p>
  </div>
 );
}
