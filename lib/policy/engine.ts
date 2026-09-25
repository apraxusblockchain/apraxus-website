import { isAddress } from "viem";

export const DAILY_LIMIT = 100;
export const PER_TX_LIMIT = 10;

export type PaymentPolicyInput = {
  amount: string;
  destination: string;
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

  const withinDailyLimit =
    validAmount &&
    numericAmount <= DAILY_LIMIT;

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
