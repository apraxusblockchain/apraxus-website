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
    const event = await request.json();

    return NextResponse.json({
      received: true,
      event: {
        id: event.id ?? crypto.randomUUID(),
        type: event.type ?? event.event ?? "unknown",
        status: event.status ?? "received",
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}
