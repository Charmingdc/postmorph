import { getPaymentStatus } from "./actions";

import BackButton from "./components/BackButton";
import PricingSection from "./components/PricingSection";
import PaymentModal from "./components/PaymentModal";

const Pricing = async (props: {
 searchParams: Promise<{ payment_id?: string }>;
}) => {
 const searchParams = await props.searchParams;
 const paymentId = searchParams.payment_id;

 const { payment } = paymentId
  ? await getPaymentStatus(paymentId)
  : { payment: undefined };

 return (
  <main className="w-full flex flex-col pb-8">
   <BackButton />
   <h1 className="font-semibold text-xl"> Buy more credits </h1>

   {payment && <PaymentModal data={payment} />}

   <PricingSection />
  </main>
 );
};

export default Pricing;
