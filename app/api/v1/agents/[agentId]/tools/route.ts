import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import {
  executeAgentTool,
  resolveAgentRuntime,
} from "@/lib/agents/runtime";
import { isAgentToolName } from "@/lib/agents/tools";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED",
    );
  }

  if (!auth.developerId) {
    return apiError(
      "Developer identity is required",
      403,
      "DEVELOPER_IDENTITY_REQUIRED",
    );
  }

  const { agentId } = await params;
  const body = await request.json().catch(() => null);

  if (!body || typeof body.tool !== "string") {
    return apiError(
      "Tool is required",
      400,
      "INVALID_REQUEST",
    );
  }

  if (!isAgentToolName(body.tool)) {
    return apiError(
      "Unknown agent tool",
      400,
      "UNKNOWN_AGENT_TOOL",
    );
  }

  const context = resolveAgentRuntime({
    agentId,
    developerId: auth.developerId,
  });

  if (!context) {
    return apiError(
      "Agent not found or inactive",
      404,
      "AGENT_RUNTIME_UNAVAILABLE",
    );
  }

  try {
    const result = await executeAgentTool(
      context,
      body.tool,
      body.input &&
      typeof body.input === "object" &&
      !Array.isArray(body.input)
        ? body.input
        : {},
    );

    return NextResponse.json({
      success: result.success,
      result,
    });
  } catch {
    return apiError(
      "Agent tool execution failed",
      500,
      "AGENT_TOOL_EXECUTION_FAILED",
    );
  }
}
