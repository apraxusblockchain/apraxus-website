import { NextRequest, NextResponse } from "next/server";
import { parseUnits } from "viem";

import { apiError } from "@/lib/api/errors";
import { getExecutionRecord } from "@/lib/execution/repository";
import {
  markExecutionSettled,
  markExecutionSubmitted,
} from "@/lib/execution/lifecycle";
import { verifyExecutionTransaction } from "@/lib/execution/verify";
import {
  APXS_ABI,
  APXS_CHAINS,
  apxsPublicClient,
  bnbApxsPublicClient,
} from "@/lib/web3/apxs";

export async function POST(request: NextRequest) {
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
      return apiError(
        "Execution record not found",
        404,
        "NOT_FOUND"
      );
    }

    if (record.status !== "pending" && record.status !== "submitted") {
      return apiError(
        "Execution is already in a terminal state",
        409,
        "INVALID_STATUS"
      );
    }

    const publicClient =
      record.chainId === 421614
        ? apxsPublicClient
        : record.chainId === 97
          ? bnbApxsPublicClient
          : null;

    if (!publicClient) {
      return apiError(
        "Unsupported execution chain",
        400,
        "INVALID_CHAIN"
      );
    }

    const tokenDecimals = await publicClient.readContract({
      address:
        record.chainId === 421614
          ? APXS_CHAINS.arbitrumSepolia.address
          : APXS_CHAINS.bnbTestnet.address,
      abi: APXS_ABI,
      functionName: "decimals",
    });

    const expectedAmount = parseUnits(
      record.amount,
      tokenDecimals
    );

    const verified = await verifyExecutionTransaction({
      publicClient,
      chainId: record.chainId,
      transactionHash: transactionHash as `0x${string}`,
      expectedWallet: record.walletAddress,
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

    const updated = markExecutionSettled(
      record.requestId,
      {
        transactionHash: verified.transactionHash as `0x${string}`,
        status: verified.status,
        blockNumber: verified.blockNumber,
      }
    );

    if (!updated) {
      return apiError(
        "Unable to update execution record",
        409,
        "UPDATE_FAILED"
      );
    }

    return NextResponse.json({
      success: true,
      record: updated,
    });
  } catch {
    return apiError(
      "Unable to verify execution transaction",
      500,
      "VERIFICATION_ERROR"
    );
  }
}
