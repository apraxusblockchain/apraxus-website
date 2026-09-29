import type { UsageFeeConfig } from "./fees";

export const BILLING_CONFIG = {
  usageFee: {
    enabled: false,
    rateBps: 0,
  } satisfies UsageFeeConfig,
};
