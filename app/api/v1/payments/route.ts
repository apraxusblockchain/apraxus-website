import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { createRequestId } from "@/lib/api/request-id";
import { apiError } from "@/lib/api/errors";

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
    const body = await request.json();

    const { token, amount, recipient, agentId } = body;

    if (!token || !amount || !recipient || !agentId) {
      return apiError(
        "token, amount, recipient and agentId are required",
        400,
        "INVALID_REQUEST"
      );
    }

    return NextResponse.json({
      requestId: createRequestId("pay"),
      success: true,
      type: "payment_intent",
      status: "pending",
      network: "arbitrum-sepolia",
      token,
      amount,
      recipient,
      agentId,
    });
  } catch {
    return apiError(
      "Invalid request body",
      400,
      "INVALID_JSON"
    );
  }
}
