import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { recordApiRequest } from "@/lib/api/metrics";
import { createExecutionIntent } from "@/lib/execution/service";
import { getApraxusAssetBySymbol } from "@/lib/web3/assets/registry";

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

    const idempotencyKey = request.headers.get("Idempotency-Key")?.trim();

    if (!idempotencyKey) {
      return apiError(
        "Idempotency-Key header is required",
        400,
        "MISSING_IDEMPOTENCY_KEY"
      );
    }

    if (idempotencyKey.length > 255) {
      return apiError(
        "Idempotency-Key must be 255 characters or fewer",
        400,
        "INVALID_IDEMPOTENCY_KEY"
      );
    }
    const body = await request.json();

    const { agentId, wallet, token, amount, recipient, chainId } = body;

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

    const requestedChainId =
      chainId === undefined ? 421614 : Number(chainId);

    let intent;
    try {
      intent = await createExecutionIntent({
        agentId: agentId.trim(),
        wallet: wallet.trim(),
        token: token.trim(),
        amount,
        recipient: recipient.trim(),
        chainId: requestedChainId,
        idempotencyKey,
        developerId: auth.developerId ?? undefined,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create execution intent";

      const status =
        message === "Agent not found" ? 404 :
        message === "Agent is not active" ||
        message === "Execution violates the agent policy" ||
        message === "Execution wallet does not match the agent wallet" ||
        message === "Execution chain does not match the agent wallet chain"
          ? 403 :
        400;

      return apiError(message, status, "EXECUTION_INTENT_REJECTED");
    }

    const execution = intent.execution;
    const network = intent.network;

    return NextResponse.json({
      requestId: execution.requestId,
      success: true,
      type: "execution_intent",
      status: execution.status,
      network,
      agentId: execution.agentId,
      wallet: execution.walletAddress,
      token: token.trim().toUpperCase(),
      amount: execution.amount,
      recipient: execution.recipient,
      execution: {
        mode: "intent_only",
        transactionSubmitted: Boolean(execution.transactionHash),
        transactionHash: execution.transactionHash ?? null,
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
