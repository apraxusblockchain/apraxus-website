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
    recordApiRequest("/api/v1/sandbox");
    const body = await request.json();

    const {
      action,
      agentId = "agent_sandbox",
      token = "APXS",
      amount = "10",
    } = body;

    if (!action) {
      return apiError(
        "action is required",
        400,
        "INVALID_REQUEST"
      );
    }

    if (!["payment", "quote", "execution"].includes(action)) {
      return apiError(
        "action must be payment, quote or execution",
        400,
        "INVALID_ACTION"
      );
    }

    if (typeof agentId !== "string" || !agentId.trim()) {
      return apiError(
        "agentId must be a non-empty string",
        400,
        "INVALID_AGENT"
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

    const requestId = createRequestId("sandbox");

    return NextResponse.json({
      success: true,
      sandbox: true,
      requestId,
      action,
      status: "simulated",
      network: "arbitrum-sepolia",
      agentId: agentId.trim(),
      token: token.trim().toUpperCase(),
      amount,
      execution: {
        mode: "simulation_only",
        transactionSubmitted: false,
        transactionHash: null,
      },
    });
  } catch {
    return apiError(
      "Invalid JSON body",
      400,
      "INVALID_JSON"
    );
  }
}
