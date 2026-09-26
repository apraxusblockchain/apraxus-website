import { isAddress } from "viem";

export const DAILY_LIMIT = 100;
export const PER_TX_LIMIT = 10;

export type PaymentPolicyInput = {
  amount: string;
  destination: string;
  spent?: number;
};

export type PaymentPolicyResult = {
  validAmount: boolean;
  withinTxLimit: boolean;
  withinDailyLimit: boolean;
  approvedDestination: boolean;
  allowed: boolean;
};

export function evaluatePaymentPolicy(
  input: PaymentPolicyInput
): PaymentPolicyResult {
  const numericAmount = Number(input.amount);

  const validAmount =
    Number.isFinite(numericAmount) &&
    numericAmount > 0;

  const withinTxLimit =
    validAmount &&
    numericAmount <= PER_TX_LIMIT;

  const currentSpent = Number.isFinite(input.spent ?? 0)
    ? Math.max(input.spent ?? 0, 0)
    : 0;

  const remainingDailyLimit = Math.max(
    DAILY_LIMIT - currentSpent,
    0
  );

  const withinDailyLimit =
    validAmount &&
    numericAmount <= remainingDailyLimit;

  const approvedDestination =
    isAddress(input.destination.trim());

  return {
    validAmount,
    withinTxLimit,
    withinDailyLimit,
    approvedDestination,
    allowed:
      validAmount &&
      withinTxLimit &&
      withinDailyLimit &&
      approvedDestination,
  };
}
