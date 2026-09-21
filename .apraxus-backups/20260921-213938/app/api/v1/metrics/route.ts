import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { getApiMetrics } from "@/lib/api/metrics";

export async function GET(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: auth.error ?? "Unauthorized",
        },
      },
      { status: 401 }
    );
  }

  const metrics = getApiMetrics();

  return NextResponse.json({
    success: true,
    environment: "development",
    totalRequests: metrics.length,
    metrics,
  });
}
