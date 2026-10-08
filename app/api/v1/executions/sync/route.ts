import { NextRequest, NextResponse } from "next/server";
import { parseUnits } from "viem";

import { apiError } from "@/lib/api/errors";
import { validateApiKey } from "@/lib/api/auth";
import { getExecutionRecord } from "@/lib/execution/repository";
import { getAgent } from "@/lib/agents/registry";
import { markExecutionSubmitted } from "@/lib/execution/lifecycle";
import { getApraxusAsset } from "@/lib/web3/assets/registry";
import { settleExecution } from "@/lib/execution/settle";
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
    let executionDecimals: number;

    if (asset.kind === "native") {
      executionDecimals = asset.decimals;
      expectedAmount = parseUnits(record.amount, executionDecimals);
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

      executionDecimals = tokenDecimals;
      expectedAmount = parseUnits(record.amount, executionDecimals);
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

    let settlementRecord = record;

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

      settlementRecord = submitted;
    }

    const settlement = settleExecution(settlementRecord, {
      transactionHash: verified.transactionHash as `0x${string}`,
      status: verified.status,
      blockNumber: verified.blockNumber,
      executionDecimals,
    });

    return NextResponse.json({
      success: true,
      record: settlement.execution,
      billing: settlement.billing ?? {
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
