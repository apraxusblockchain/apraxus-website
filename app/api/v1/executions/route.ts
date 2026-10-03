import { NextRequest, NextResponse } from "next/server";
import { parseUnits } from "viem";
import { validateApiKey } from "@/lib/api/auth";
import { createRequestId } from "@/lib/api/request-id";
import { apiError } from "@/lib/api/errors";
import { recordApiRequest } from "@/lib/api/metrics";
import {
  createExecutionRecord,
  getExecutionRecordByIdempotencyKey,
} from "@/lib/execution/repository";
import { getAgent } from "@/lib/agents/registry";
import { getAgentWallet } from "@/lib/agents/wallets";
import { evaluatePaymentPolicy } from "@/lib/policy/engine";
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

    const asset = getApraxusAssetBySymbol(
      token,
      requestedChainId,
    );

    if (!asset || !asset.enabled) {
      return apiError(
        "Asset is not supported on the requested chain",
        400,
        "UNSUPPORTED_ASSET"
      );
    }

    const amountPattern = new RegExp(
      `^\\d+(\\.\\d{1,${asset.decimals}})?$`
    );

    if (typeof amount !== "string" || !amountPattern.test(amount)) {
      return apiError(
        `amount must be a positive decimal string with at most ${asset.decimals} decimals`,
        400,
        "INVALID_AMOUNT"
      );
    }

    try {
      if (parseUnits(amount, asset.decimals) <= 0n) {
        return apiError(
          "amount must be greater than zero",
          400,
          "INVALID_AMOUNT"
        );
      }
    } catch {
      return apiError(
        "amount exceeds the supported asset precision",
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

    const agent = getAgent(
      agentId.trim(),
      auth.developerId ?? undefined
    );

    if (!agent) {
      return apiError(
        "Agent not found",
        404,
        "AGENT_NOT_FOUND"
      );
    }

    if (agent.status !== "active") {
      return apiError(
        "Agent is not active",
        409,
        "AGENT_INACTIVE"
      );
    }

    const policy = evaluatePaymentPolicy({
      agentId: agentId.trim(),
      amount,
      destination: recipient.trim(),
    });

    if (!policy.allowed) {
      return apiError(
        "Execution violates the agent policy",
        403,
        "POLICY_DENIED"
      );
    }

    const boundWallet = getAgentWallet(agentId.trim());

    if (!boundWallet) {
      return apiError(
        "Agent wallet is not bound",
        400,
        "WALLET_NOT_BOUND"
      );
    }

    if (boundWallet.walletAddress.toLowerCase() !== wallet.trim().toLowerCase()) {
      return apiError(
        "Execution wallet does not match the agent wallet",
        403,
        "WALLET_MISMATCH"
      );
    }

    if (asset.chainId !== requestedChainId) {
      return apiError(
        "Asset is not supported on the requested chain",
        400,
        "INVALID_CHAIN"
      );
    }

    if (boundWallet.chainId !== requestedChainId) {
      return apiError(
        "Execution chain does not match the agent wallet chain",
        403,
        "WALLET_CHAIN_MISMATCH"
      );
    }

    const network =
      requestedChainId === 97
        ? "bnb-testnet"
        : "arbitrum-sepolia";

    const existingExecution = getExecutionRecordByIdempotencyKey(
      agentId.trim(),
      idempotencyKey,
    );

    if (existingExecution) {
      const sameRequest =
        existingExecution.walletAddress.toLowerCase() === wallet.trim().toLowerCase() &&
        existingExecution.chainId === requestedChainId &&
        existingExecution.assetId === asset.id &&
        existingExecution.assetKind === asset.kind &&
        existingExecution.tokenAddress?.toLowerCase() === asset.address?.toLowerCase() &&
        existingExecution.amount === amount &&
        existingExecution.recipient.toLowerCase() === recipient.trim().toLowerCase();

      if (!sameRequest) {
        return apiError(
          "Idempotency-Key has already been used for a different execution request",
          409,
          "IDEMPOTENCY_CONFLICT"
        );
      }

      return NextResponse.json({
        requestId: existingExecution.requestId,
        success: true,
        type: "execution_intent",
        status: existingExecution.status,
        network,
        agentId: existingExecution.agentId,
        wallet: existingExecution.walletAddress,
        token: "APXS",
        amount: existingExecution.amount,
        recipient: existingExecution.recipient,
        execution: {
          mode: "intent_only",
          transactionSubmitted: Boolean(existingExecution.transactionHash),
          transactionHash: existingExecution.transactionHash ?? null,
        },
      });
    }

    const requestId = createRequestId("exec");

    createExecutionRecord({
      requestId,
      agentId: agentId.trim(),
      idempotencyKey,
      walletAddress: wallet.trim(),
      chainId: requestedChainId,
      assetId: asset.id,
      assetKind: asset.kind,
      tokenAddress: asset.address,
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
      network,
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
