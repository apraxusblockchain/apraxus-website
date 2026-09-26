import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { getAgent } from "@/lib/agents/registry";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED"
    );
  }

  const { agentId } = await params;
  const agent = getAgent(agentId);

  if (!agent) {
    return apiError(
      "Agent not found",
      404,
      "AGENT_NOT_FOUND"
    );
  }

  return NextResponse.json({
    success: true,
    type: "agent",
    agent,
  });
}
