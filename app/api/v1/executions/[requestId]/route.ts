import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { getExecutionRecord } from "@/lib/execution/repository";

type RouteContext = {
  params: Promise<{ requestId: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED"
    );
  }

  const { requestId } = await context.params;
  const record = getExecutionRecord(requestId);

  if (!record) {
    return apiError(
      "Execution record not found",
      404,
      "NOT_FOUND"
    );
  }

  return NextResponse.json({
    success: true,
    record,
  });
}
