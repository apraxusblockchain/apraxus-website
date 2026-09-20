import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";

export async function POST(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const { tokenIn, tokenOut, amountIn } = body;

    if (!tokenIn || !tokenOut || !amountIn) {
      return NextResponse.json(
        { error: "tokenIn, tokenOut and amountIn are required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
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
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
