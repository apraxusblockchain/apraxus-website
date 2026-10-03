import { NextRequest, NextResponse } from "next/server";
import { parseUnits } from "viem";

import { apiError } from "@/lib/api/errors";
import { validateApiKey } from "@/lib/api/auth";
import {
  BILLING_CONFIG,
  calculateUsageFee,
  createBillingRecord,
} from "@/lib/billing";
import { getExecutionRecord } from "@/lib/execution/repository";
import { getAgent } from "@/lib/agents/registry";
import { recordPolicySpend } from "@/lib/policy/accounting";
import {
  markExecutionSettled,
  markExecutionSubmitted,
} from "@/lib/execution/lifecycle";
import { getApraxusAsset } from "@/lib/web3/assets/registry";
import { getApraxusPublicClient } from "@/lib/web3/public-clients";
import { verifyExecutionTransaction } from "@/lib/execution/verify";

export async function POST(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(auth.error ?? "Unauthorized", 401, "UNAUTHORIZED");
  }

  try {
    const body = await request.json();
    const { requestId, transactionHash } = body;

    if (
      typeof requestId !== "string" ||
      !requestId.trim() ||
      typeof transactionHash !== "string" ||
      !/^0x[a-fA-F0-9]{64}$/.test(transactionHash)
    ) {
      return apiError(
        "requestId and a valid transactionHash are required",
        400,
        "INVALID_REQUEST"
      );
    }

    const record = getExecutionRecord(requestId.trim());

    if (!record) {
      return apiError("Execution record not found", 404, "NOT_FOUND");
    }

    if (auth.developerId && record.agentId) {
      const agent = getAgent(record.agentId, auth.developerId);

      if (!agent) {
        return apiError("Execution record not found", 404, "NOT_FOUND");
      }
    }

    if (record.status !== "pending" && record.status !== "submitted") {
      return apiError(
        "Execution is already in a terminal state",
        409,
        "INVALID_STATUS"
      );
    }

    const asset = getApraxusAsset(record.assetId);

    if (!asset || !asset.enabled || asset.chainId !== record.chainId) {
      return apiError(
        "Unsupported execution asset",
        400,
        "INVALID_ASSET"
      );
    }

    if (record.assetKind !== asset.kind) {
      return apiError(
        "Execution asset kind does not match the registered asset",
        400,
        "INVALID_ASSET"
      );
    }

    if (
      asset.kind === "token" &&
      (!record.tokenAddress ||
        !asset.address ||
        record.tokenAddress.toLowerCase() !== asset.address.toLowerCase())
    ) {
      return apiError(
        "Execution token address does not match the registered asset",
        400,
        "INVALID_ASSET"
      );
    }

    if (asset.kind === "native" && record.tokenAddress) {
      return apiError(
        "Native execution must not include a token address",
        400,
        "INVALID_ASSET"
      );
    }

    const publicClient = getApraxusPublicClient(record.chainId);

    if (!publicClient) {
      return apiError(
        "Unsupported execution chain",
        400,
        "INVALID_CHAIN"
      );
    }

    let expectedAmount: bigint;

    if (asset.kind === "native") {
      expectedAmount = parseUnits(record.amount, asset.decimals);
    } else {
      if (!asset.address) {
        return apiError(
          "Configured token asset is missing an address",
          500,
          "INVALID_ASSET_CONFIG"
        );
      }

      const tokenDecimals = await publicClient.readContract({
        address: asset.address,
        abi: [
          {
            type: "function",
            name: "decimals",
            stateMutability: "view",
            inputs: [],
            outputs: [{ type: "uint8" }],
          },
        ],
        functionName: "decimals",
      });

      expectedAmount = parseUnits(record.amount, tokenDecimals);
    }

    const verified = await verifyExecutionTransaction({
      publicClient,
      chainId: record.chainId,
      transactionHash: transactionHash as `0x${string}`,
      expectedWallet: record.walletAddress,
      expectedAssetKind: record.assetKind,
      expectedTokenAddress: record.tokenAddress,
      expectedRecipient: record.recipient,
      expectedAmount,
    });

    if (!verified) {
      return apiError(
        "Transaction does not match the execution record",
        409,
        "VERIFICATION_FAILED"
      );
    }

    if (record.status === "pending") {
      const submitted = markExecutionSubmitted(
        record.requestId,
        verified.transactionHash
      );

      if (!submitted) {
        return apiError(
          "Unable to update execution record",
          409,
          "UPDATE_FAILED"
        );
      }
    }

    const updated = markExecutionSettled(record.requestId, {
      transactionHash: verified.transactionHash as `0x${string}`,
      status: verified.status,
      blockNumber: verified.blockNumber,
    });

    if (!updated) {
      return apiError(
        "Unable to update execution record",
        409,
        "UPDATE_FAILED"
      );
    }

    if (
      updated.status === "confirmed" &&
      record.assetId.startsWith("apxs:")
    ) {
      recordPolicySpend(record.agentId, Number(record.amount));
    }

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
      return apiError(
        "Agent is not linked to a billing customer",
        409,
        "BILLING_CUSTOMER_NOT_LINKED"
      );
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

    return NextResponse.json({
      success: true,
      record: updated,
      billing: billingRecord
        ? {
            billingId: billingRecord.billingId,
            status: billingRecord.status,
            amount: billingRecord.amount,
            currency: billingRecord.currency,
          }
        : {
            status: "not_charged",
          },
    });
  } catch {
    return apiError(
      "Unable to verify execution transaction",
      500,
      "VERIFICATION_ERROR"
    );
  }
}
