import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { createRequestId } from "@/lib/api/request-id";
import { apiError } from "@/lib/api/errors";
import { recordApiRequest } from "@/lib/api/metrics";
import { evaluatePaymentPolicy } from "@/lib/policy/engine";
import {
  getApraxusAssetBySymbol,
} from "@/lib/web3/assets/registry";
import { getAgent } from "@/lib/agents/registry";
import { getAgentWallet } from "@/lib/agents/wallets";

export async function POST(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED",
    );
  }

  try {
    recordApiRequest("/api/v1/sandbox");

    const body = await request.json();

    const {
      action,
      agentId = "agent_sandbox",
      token = "APXS",
      amount = "10",
      recipient = "0x0000000000000000000000000000000000000001",
      chainId = 421614,
    } = body;

    if (!action) {
      return apiError(
        "action is required",
        400,
        "INVALID_REQUEST",
      );
    }

    if (!["payment", "quote", "execution"].includes(action)) {
      return apiError(
        "action must be payment, quote or execution",
        400,
        "INVALID_ACTION",
      );
    }

    if (typeof agentId !== "string" || !agentId.trim()) {
      return apiError(
        "agentId must be a non-empty string",
        400,
        "INVALID_AGENT",
      );
    }

    if (typeof token !== "string" || !token.trim()) {
      return apiError(
        "token must be a non-empty string",
        400,
        "INVALID_TOKEN",
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
        "INVALID_AMOUNT",
      );
    }

    const requestedChainId = Number(chainId);

    if (!Number.isInteger(requestedChainId) || requestedChainId <= 0) {
      return apiError(
        "chainId must be a valid positive integer",
        400,
        "INVALID_CHAIN",
      );
    }

    const asset = getApraxusAssetBySymbol(
      token.trim(),
      requestedChainId,
    );

    if (!asset) {
      return apiError(
        `Asset ${token.trim().toUpperCase()} is not supported on chain ${requestedChainId}`,
        400,
        "UNSUPPORTED_ASSET",
      );
    }

    const agent = await getAgent(
      agentId.trim(),
      auth.developerId ?? undefined,
    );

    if (!agent) {
      return apiError(
        "Agent not found",
        404,
        "AGENT_NOT_FOUND",
      );
    }

    const wallet = await getAgentWallet(agent.agentId);

    const policy = evaluatePaymentPolicy({
      agentId: agent.agentId,
      assetId: asset.id,
      amount,
      destination: recipient.trim(),
    });

    const checks = [
      {
        id: "identity",
        label: "Agent identity",
        passed: Boolean(agent.agentId),
      },
      {
        id: "agent_status",
        label: "Agent active",
        passed: agent.status === "active",
      },
      {
        id: "wallet",
        label: "Execution wallet",
        passed: Boolean(wallet),
      },
      {
        id: "asset",
        label: "Asset supported",
        passed: Boolean(asset.enabled),
      },
      {
        id: "network",
        label: "Network supported",
        passed: asset.chainId === requestedChainId,
      },
      {
        id: "amount",
        label: "Amount valid",
        passed: policy.validAmount,
      },
      {
        id: "transaction_limit",
        label: "Transaction limit",
        passed: policy.withinTxLimit,
      },
      {
        id: "daily_limit",
        label: "Daily limit",
        passed: policy.withinDailyLimit,
      },
      {
        id: "recipient",
        label: "Recipient valid",
        passed: policy.approvedDestination,
      },
    ];

    const authorized =
      agent.status === "active" &&
      Boolean(wallet) &&
      asset.enabled &&
      policy.allowed;

    const requestId = createRequestId("sandbox");

    return NextResponse.json({
      success: true,
      sandbox: true,
      requestId,
      action,
      status: "simulated",
      network: requestedChainId === 97
        ? "bnb-testnet"
        : "arbitrum-sepolia",
      agentId: agent.agentId,
      token: asset.symbol,
      amount,
      recipient: recipient.trim(),
      policy,
      authorization: {
        status: authorized ? "authorized" : "denied",
        allowed: authorized,
        checks,
      },
      execution: {
        mode: "simulation_only",
        transactionSubmitted: false,
        transactionHash: null,
        status: authorized ? "simulated" : "blocked",
      },
      verification: {
        status: authorized ? "simulated" : "not_executed",
        onChain: false,
      },
      receipt: {
        requestId,
        status: authorized ? "simulated" : "denied",
        assetId: asset.id,
        asset: asset.symbol,
        amount,
        recipient: recipient.trim(),
        network:
          requestedChainId === 97
            ? "BNB Testnet"
            : "Arbitrum Sepolia",
      },
    });
  } catch {
    return apiError(
      "Invalid JSON body",
      400,
      "INVALID_JSON",
    );
  }
}
