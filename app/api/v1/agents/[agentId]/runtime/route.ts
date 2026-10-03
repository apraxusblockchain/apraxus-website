import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import {
  getAgentRuntimeState,
  resolveAgentRuntime,
} from "@/lib/agents/runtime";

export async function GET(
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
  const context = resolveAgentRuntime({ agentId, developerId: auth.developerId });

  if (!context) {
    return apiError(
      "Agent not found or inactive",
      404,
      "AGENT_RUNTIME_UNAVAILABLE",
    );
  }

  const runtime = getAgentRuntimeState(context);

  return NextResponse.json({
    success: true,
    type: "agent_runtime",
    runtime,
  });
}
