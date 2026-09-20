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

    return NextResponse.json({
      success: true,
      sandbox: true,
      requestId: createRequestId("sandbox"),
      action,
      status: "simulated",
      network: "arbitrum-sepolia",
      agentId,
      token,
      amount,
      execution: "simulation_only",
    });
  } catch {
    return apiError(
      "Invalid JSON body",
      400,
      "INVALID_JSON"
    );
  }
}
