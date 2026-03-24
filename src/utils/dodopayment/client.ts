import DodoPayments from "dodopayments";

export const client = new DodoPayments({
 bearerToken: process.env["DODO_PAYMENTS_API_KEY"],
 environment:
  (process.env.DODO_PAYMENTS_ENVIRONMENT as "live_mode" | "test_mode") ||
  "live_mode"
});
