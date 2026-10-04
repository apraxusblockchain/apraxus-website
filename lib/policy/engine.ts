import { isAddress } from "viem";

import { getAgentPolicy } from "@/lib/policy/registry";
import { getPolicyAccounting } from "@/lib/policy/accounting";

export type PaymentPolicyInput = {
  agentId: string;
  assetId: string;
  amount: string;
  destination: string;
};

export type PaymentPolicyResult = {
  validAmount: boolean;
  withinTxLimit: boolean;
  withinDailyLimit: boolean;
  approvedDestination: boolean;
  allowed: boolean;
  dailyLimit: number;
  perTxLimit: number;
  spent: number;
};

export function evaluatePaymentPolicy(
  input: PaymentPolicyInput
): PaymentPolicyResult {
  const isApxsAsset = input.assetId.startsWith("apxs:");
  const agentPolicy = isApxsAsset ? getAgentPolicy(input.agentId) : null;
  const accounting = isApxsAsset
    ? getPolicyAccounting(input.agentId)
    : { spent: 0, windowStartedAt: new Date().toISOString() };

  const numericAmount = Number(input.amount);
  const dailyLimit = agentPolicy?.dailyLimit ?? Number.POSITIVE_INFINITY;
  const perTxLimit = agentPolicy?.perTxLimit ?? Number.POSITIVE_INFINITY;
  const spent = accounting.spent;

  const validAmount =
    Number.isFinite(numericAmount) &&
    numericAmount > 0;

  const withinTxLimit =
    validAmount &&
    numericAmount <= perTxLimit;

  const remainingDailyLimit = Math.max(
    dailyLimit - spent,
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
    dailyLimit,
    perTxLimit,
    spent,
  };
}
