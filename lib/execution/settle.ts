import { parseUnits } from "viem";

import {
  BILLING_CONFIG,
  calculateUsageFee,
  createBillingRecord,
} from "@/lib/billing";
import { createPlatformFeeRecord } from "@/lib/fees/ledger";
import { APRAXUS_FEE_CONFIG } from "@/lib/web3/assets/registry";
import { getAgent } from "@/lib/agents/registry";
import { recordPolicySpend } from "@/lib/policy/accounting";
import { markExecutionSettled } from "@/lib/execution/lifecycle";
import type { ExecutionRecord } from "@/lib/execution/types";

export function settleExecution(
  record: ExecutionRecord,
  input: {
    transactionHash: `0x${string}`;
    status: "success" | "reverted";
    blockNumber: bigint;
    executionDecimals: number;
  },
) {
  const updated = markExecutionSettled(record.requestId, {
    transactionHash: input.transactionHash,
    status: input.status,
    blockNumber: input.blockNumber,
  });

  if (!updated) {
    throw new Error("Unable to update execution record");
  }

  if (
    updated.status === "confirmed" &&
    record.assetId.startsWith("apxs:")
  ) {
    recordPolicySpend(record.agentId, Number(record.amount));
  }

  const platformFee =
    updated.status === "confirmed"
      ? createPlatformFeeRecord({
          executionId: record.requestId,
          agentId: record.agentId,
          chainId: record.chainId,
          assetId: record.assetId,
          assetKind: record.assetKind,
          tokenAddress: record.tokenAddress,
          amount: parseUnits(record.amount, input.executionDecimals),
          basisPoints: APRAXUS_FEE_CONFIG.basisPoints,
        })
      : null;

  const billingFee = calculateUsageFee({
    amount: Number(record.amount),
    config: BILLING_CONFIG.usageFee,
  });

  const agent = getAgent(record.agentId);

  if (
    updated.status === "confirmed" &&
    billingFee.applicable &&
    (!agent || !agent.billingCustomerId)
  ) {
    throw new Error("Agent is not linked to a billing customer");
  }

  const billingRecord =
    updated.status === "confirmed" &&
    billingFee.applicable &&
    agent?.billingCustomerId
      ? createBillingRecord({
          customerId: agent.billingCustomerId,
          source: "execution",
          amount: billingFee.fee,
          currency: billingFee.currency,
          referenceId: record.requestId,
          status: "pending",
        })
      : null;

  return {
    execution: updated,
    platformFee,
    billing: billingRecord
      ? {
          billingId: billingRecord.billingId,
          status: billingRecord.status,
          amount: billingRecord.amount,
          currency: billingRecord.currency,
        }
      : null,
  };
}
