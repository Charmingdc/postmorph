export interface Plan {
 name: string;
 id: string;
 tagline: string;
 price: string;
 credits: number;
 features: string[];
 highlight?: boolean;
}

export interface Customer {
 customer_id: string;
 email: string;
 name: string;
}

export interface PaymentResponse {
 payment_id: string;
 status: "succeeded" | "failed" | "cancelled" | string;
 total_amount: number;
 currency: string;
 customer: Customer;
 discount_id?: string | null;
 error_message?: string | null;
 invoice_url?: string | null;
 payment_method_type?: string;
 card_last_four?: string;
 card_network?: string;
 created_at: string;
}

export interface PaymentActionResult {
 payment?: PaymentResponse;
 error?: string;
}

export default Plan;
