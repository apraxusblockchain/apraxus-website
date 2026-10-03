import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { getAgent } from "@/lib/agents/registry";
import {
  bindAgentWallet,
  getAgentWallet,
} from "@/lib/agents/wallets";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(auth.error ?? "Unauthorized", 401, "UNAUTHORIZED");
  }

  if (!auth.developerId) {
    return apiError(
      "Developer identity is required",
      403,
      "DEVELOPER_IDENTITY_REQUIRED"
    );
  }

  const { agentId } = await params;
  const agent = getAgent(agentId, auth.developerId);

  if (!agent) {
    return apiError("Agent wallet not found", 404, "WALLET_NOT_FOUND");
  }

  const wallet = getAgentWallet(agentId);

  if (!wallet) {
    return apiError("Agent wallet not found", 404, "WALLET_NOT_FOUND");
  }

  return NextResponse.json({
    success: true,
    type: "agent_wallet",
    wallet,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(auth.error ?? "Unauthorized", 401, "UNAUTHORIZED");
  }

  try {
    if (!auth.developerId) {
      return apiError(
        "Developer identity is required",
        403,
        "DEVELOPER_IDENTITY_REQUIRED"
      );
    }

    const { agentId } = await params;
    const agent = getAgent(agentId, auth.developerId);

    if (!agent) {
      return apiError(
        "Agent wallet not found",
        404,
        "WALLET_NOT_FOUND"
      );
    }

    const body = await request.json();
    const { walletAddress, chainId } = body;

    if (
      typeof walletAddress !== "string" ||
      typeof chainId !== "number"
    ) {
      return apiError(
        "walletAddress and chainId are required",
        400,
        "INVALID_WALLET"
      );
    }

    const wallet = bindAgentWallet(agentId, {
      walletAddress,
      chainId,
    });

    if (!wallet) {
      return apiError(
        "Invalid wallet or agent is not active",
        400,
        "INVALID_WALLET"
      );
    }

    return NextResponse.json({
      success: true,
      type: "agent_wallet",
      wallet,
    });
  } catch {
    return apiError("Invalid request body", 400, "INVALID_JSON");
  }
}
