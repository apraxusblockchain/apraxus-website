export type BillingPlanId =
  | "free"
  | "builder"
  | "pro"
  | "enterprise";

export type BillingSubscriptionStatus =
  | "pending"
  | "active"
  | "trialing"
  | "past_due"
  | "canceled";

export type BillingFeeSource =
  | "subscription"
  | "execution"
  | "api_usage"
  | "other";

export type BillingRecordStatus =
  | "pending"
  | "collected"
  | "failed"
  | "refunded";

export type BillingPlan = {
  id: BillingPlanId;
  name: string;
  monthlyPrice: number | null;
  currency: string;
  description: string;
};

export type BillingSubscription = {
  subscriptionId: string;
  customerId: string;
  planId: BillingPlanId;
  status: BillingSubscriptionStatus;
  startedAt: string;
  currentPeriodEndsAt?: string;
};

export type BillingRecord = {
  billingId: string;
  customerId: string;
  source: BillingFeeSource;
  status: BillingRecordStatus;
  amount: number;
  currency: string;
  referenceId?: string;
  createdAt: string;
};
