import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { createRequestId } from "@/lib/api/request-id";
import { apiError } from "@/lib/api/errors";
import { recordApiRequest } from "@/lib/api/metrics";

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
    recordApiRequest("/api/v1/payments");
    const body = await request.json();

    const { token, amount, recipient, agentId } = body;

    if (!token || !amount || !recipient || !agentId) {
      return apiError(
        "token, amount, recipient and agentId are required",
        400,
        "INVALID_REQUEST"
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

    if (typeof agentId !== "string" || !agentId.trim()) {
      return apiError(
        "agentId must be a non-empty string",
        400,
        "INVALID_AGENT"
      );
    }

    return NextResponse.json({
      requestId: createRequestId("pay"),
      success: true,
      type: "payment_intent",
      status: "pending",
      network: "arbitrum-sepolia",
      token: token.trim().toUpperCase(),
      amount,
      recipient: recipient.trim(),
      agentId: agentId.trim(),
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
