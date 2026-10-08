import { NextRequest, NextResponse } from "next/server";

import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { getExecutionRecord } from "@/lib/execution/repository";
import { getAgent } from "@/lib/agents/registry";
import { orchestrateExecution } from "@/lib/execution/orchestrate";

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

    const agent = getAgent(
      record.agentId,
      auth.developerId ?? undefined,
    );

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

    const result = await orchestrateExecution(requestId);

    return NextResponse.json({
      success: true,
      requestId,
      execution: result.execution,
      billing: result.billing ?? {
        status: "not_charged",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to execute payment";

    const status =
      message === "Execution record not found"
        ? 404
        : message === "Execution is not pending"
          ? 409
          : 400;

    return apiError(
      message,
      status,
      "EXECUTION_FAILED",
    );
  }
}
