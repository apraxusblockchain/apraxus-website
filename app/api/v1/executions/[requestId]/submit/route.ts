import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { getExecutionRecord } from "@/lib/execution/repository";
import { getAgent } from "@/lib/agents/registry";
import { submitExecution } from "@/lib/execution/submit";

type RouteContext = {
  params: Promise<{ requestId: string }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED",
    );
  }

  try {
    const { requestId } = await context.params;
    const record = getExecutionRecord(requestId);

    if (!record) {
      return apiError(
        "Execution record not found",
        404,
        "NOT_FOUND",
      );
    }

    const agent = getAgent(record.agentId, auth.developerId ?? undefined);

    if (!agent) {
      return apiError(
        "Execution record not found",
        404,
        "NOT_FOUND",
      );
    }

    if (agent.status !== "active") {
      return apiError(
        "Agent is not active",
        403,
        "AGENT_INACTIVE",
      );
    }

    const result = await submitExecution(requestId);

    if (!result.execution) {
      return apiError(
        "Unable to update execution record",
        409,
        "UPDATE_FAILED",
      );
    }

    return NextResponse.json({
      success: true,
      requestId,
      status: result.execution.status,
      transactionHash: result.transactionHash,
      execution: result.execution,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to submit execution";

    const status =
      message === "Execution record not found"
        ? 404
        : message === "Execution is not pending"
          ? 409
          : 400;

    return apiError(
      message,
      status,
      "EXECUTION_SUBMISSION_FAILED",
    );
  }
}
