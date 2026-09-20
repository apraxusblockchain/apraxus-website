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

    const { token, amount, recipient, agentId } = body;

    if (!token || !amount || !recipient || !agentId) {
      return NextResponse.json(
        {
          error: "token, amount, recipient and agentId are required",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
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
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
