import type { BillingPlan, BillingPlanId } from "./types";

export const BILLING_PLANS: Record<BillingPlanId, BillingPlan> = {
  free: {
    id: "free",
    name: "Free",
    monthlyPrice: null,
    currency: "USD",
    description: "Development and evaluation access.",
  },
  builder: {
    id: "builder",
    name: "Builder",
    monthlyPrice: 149,
    currency: "USD",
    description: "For developers building with Apraxus infrastructure.",
  },
  pro: {
    id: "pro",
    name: "Pro",
    monthlyPrice: 799,
    currency: "USD",
    description: "For higher-volume application workloads.",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 2499,
    currency: "USD",
    description: "For enterprise infrastructure and higher-scale workloads.",
  },
};
