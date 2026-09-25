import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { createRequestId } from "@/lib/api/request-id";
import { apiError } from "@/lib/api/errors";
import { recordApiRequest } from "@/lib/api/metrics";
import { createExecutionRecord } from "@/lib/execution/repository";
import { APXS_CHAINS } from "@/lib/web3/chains/apxs";

export async function POST(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED"
    );
  }

  try {
    recordApiRequest("/api/v1/executions");
    const body = await request.json();

    const { agentId, wallet, token, amount, recipient } = body;

    if (!agentId || !wallet || !token || !amount || !recipient) {
      return apiError(
        "agentId, wallet, token, amount and recipient are required",
        400,
        "INVALID_REQUEST"
      );
    }

    if (typeof agentId !== "string" || !agentId.trim()) {
      return apiError(
        "agentId must be a non-empty string",
        400,
        "INVALID_AGENT"
      );
    }

    if (
      typeof wallet !== "string" ||
      !/^0x[a-fA-F0-9]{40}$/.test(wallet)
    ) {
      return apiError(
        "wallet must be a valid EVM address",
        400,
        "INVALID_WALLET"
      );
    }

    if (typeof token !== "string" || !token.trim()) {
      return apiError(
        "token must be a non-empty string",
        400,
        "INVALID_TOKEN"
      );
    }

    if (
      typeof amount !== "string" ||
      !/^\d+(\.\d+)?$/.test(amount) ||
      Number(amount) <= 0
    ) {
      return apiError(
        "amount must be a positive decimal string",
        400,
        "INVALID_AMOUNT"
      );
    }

    if (
      typeof recipient !== "string" ||
      !/^0x[a-fA-F0-9]{40}$/.test(recipient)
    ) {
      return apiError(
        "recipient must be a valid EVM address",
        400,
        "INVALID_RECIPIENT"
      );
    }

    const requestId = createRequestId("exec");

    createExecutionRecord({
      requestId,
      agentId: agentId.trim(),
      walletAddress: wallet.trim(),
      chainId: 421614,
      tokenAddress: APXS_CHAINS.arbitrumSepolia.address,
      amount,
      recipient: recipient.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      requestId,
      success: true,
      type: "execution_intent",
      status: "pending",
      network: "arbitrum-sepolia",
      agentId: agentId.trim(),
      wallet: wallet.trim(),
      token: token.trim().toUpperCase(),
      amount,
      recipient: recipient.trim(),
      execution: {
        mode: "intent_only",
        transactionSubmitted: false,
        transactionHash: null,
      },
    });
  } catch {
    return apiError(
      "Invalid request body",
      400,
      "INVALID_JSON"
    );
  }
}
