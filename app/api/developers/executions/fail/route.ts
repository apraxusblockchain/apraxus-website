import { NextRequest, NextResponse } from "next/server";

import { apiError } from "@/lib/api/errors";
import { getExecutionRecord } from "@/lib/execution/repository";
import { markExecutionFailed } from "@/lib/execution/lifecycle";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestId } = body;

    if (typeof requestId !== "string" || !requestId.trim()) {
      return apiError(
        "requestId is required",
        400,
        "INVALID_REQUEST"
      );
    }

    const record = getExecutionRecord(requestId.trim());

    if (!record) {
      return apiError(
        "Execution record not found",
        404,
        "NOT_FOUND"
      );
    }

    if (record.status !== "pending") {
      return apiError(
        "Only pending executions can be marked as failed",
        409,
        "INVALID_STATUS"
      );
    }

    const updated = markExecutionFailed(record.requestId);

    if (!updated) {
      return apiError(
        "Unable to update execution record",
        409,
        "UPDATE_FAILED"
      );
    }

    return NextResponse.json({
      success: true,
      record: updated,
    });
  } catch {
    return apiError(
      "Unable to mark execution as failed",
      500,
      "FAILURE_UPDATE_ERROR"
    );
  }
}
