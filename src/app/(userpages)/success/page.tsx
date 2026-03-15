import { polarClient } from "@/utils/polar/polarClient";
import { notFound } from "next/navigation";
import { ErrorBox } from "@/components/ui/errorbox";

type CheckoutProduct = {
 name: string;
 quantity?: number;
 prices?: { amount: number; currency: string }[];
};

type CheckoutSession = {
 status: string;
 total_amount: number;
 currency: string;
 discount_amount: number;
 net_amount: number;
 tax_amount?: number | null;
 products?: CheckoutProduct[];
 product?: CheckoutProduct;
 customer_name?: string;
 customer_email?: string;
};

export default async function SuccessPage({
 searchParams
}: {
 searchParams: { client_secret?: string };
}) {
 const { client_secret } = searchParams;
 if (!client_secret) return notFound();

 let session: CheckoutSession | null = null;

 try {
  const res = await polarClient.checkouts.clientGet({
   clientSecret: client_secret
  });
  session = res.checkoutPublic ?? null;
 } catch (err) {
  console.error("Failed to fetch session:", err);
  return <ErrorBox message="Failed to fetch session." />;
 }

 if (!session)
  return <p className="text-muted-foreground">No session found.</p>;

 const productsToShow =
  session.products ?? (session.product ? [session.product] : []);

 return (
  <div className="min-h-screen bg-accent/95 text-foreground flex items-center justify-center p-4">
   <div className="modern-card w-full max-w-lg p-8 flex flex-col gap-6">
    <h1 className="text-2xl font-bold heading-gradient">Receipt</h1>

    {/* Customer & Status */}
    <div className="flex flex-col gap-2 text-card-foreground">
     <p>
      Status: <span className="font-semibold">{session.status}</span>
     </p>
     {session.customer_name && (
      <p>
       Customer: {session.customer_name} ({session.customer_email})
      </p>
     )}
    </div>

    {/* Products */}
    <div className="flex flex-col gap-2">
     <h2 className="font-semibold text-card-foreground">Products</h2>
     {productsToShow.map((p, idx) => (
      <div key={idx} className="flex justify-between text-card-foreground">
       <span>
        {p.name}
        {p.quantity ? ` x ${p.quantity}` : ""}
       </span>
       {p.prices && p.prices.length > 0 && (
        <span>
         {(p.prices[0].amount / 100).toFixed(2)} {p.prices[0].currency}
        </span>
       )}
      </div>
     ))}
    </div>

    {/* Totals */}
    <div className="flex flex-col gap-1 text-card-foreground border-t border-border pt-4">
     {session.discount_amount > 0 && (
      <p>
       Discount: {(session.discount_amount / 100).toFixed(2)} {session.currency}
      </p>
     )}
     {session.tax_amount != null && (
      <p>
       Tax: {(session.tax_amount / 100).toFixed(2)} {session.currency}
      </p>
     )}
     <p>
      Net Amount: {(session.net_amount / 100).toFixed(2)} {session.currency}
     </p>
     <p className="font-bold text-primary-foreground">
      Total Paid: {(session.total_amount / 100).toFixed(2)} {session.currency}
     </p>
    </div>

    {/* Navigation Buttons & CTA */}
    <div className="flex flex-col gap-4 mt-6">
     <div className="flex gap-4">
      <button
       onClick={() => (window.location.href = "/dashboard")}
       className="px-4 py-2 rounded bg-secondary text-secondary-foreground button-pulse"
      >
       Back to Dashboard
      </button>
      <button
       onClick={() => (window.location.href = "/repurpose")}
       className="px-4 py-2 rounded bg-primary text-primary-foreground button-pulse"
      >
       Go to Repurpose
      </button>
     </div>

     <button
      onClick={() => (window.location.href = "/repurpose")}
      className="mt-4 w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-center button-pulse"
     >
      Repurpose Now
     </button>
    </div>
   </div>
  </div>
 );
}
