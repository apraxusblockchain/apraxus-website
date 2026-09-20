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
    recordApiRequest("/api/v1/quotes");
    const body = await request.json();

    const { tokenIn, tokenOut, amountIn } = body;

    if (!tokenIn || !tokenOut || !amountIn) {
      return apiError(
        "tokenIn, tokenOut and amountIn are required",
        400,
        "INVALID_REQUEST"
      );
    }

    return NextResponse.json({
      requestId: createRequestId("quote"),
      success: true,
      type: "quote",
      status: "available",
      network: "arbitrum-sepolia",
      tokenIn,
      tokenOut,
      amountIn,
      execution: "testnet",
    });
  } catch {
    return apiError(
      "Invalid request body",
      400,
      "INVALID_JSON"
    );
  }
}
