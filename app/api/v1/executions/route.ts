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

    const { agentId, wallet, token, amount, recipient } = body;

    if (!agentId || !wallet || !token || !amount || !recipient) {
      return NextResponse.json(
        {
          error:
            "agentId, wallet, token, amount and recipient are required",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      type: "execution_intent",
      status: "pending",
      network: "arbitrum-sepolia",
      agentId,
      wallet,
      token,
      amount,
      recipient,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
