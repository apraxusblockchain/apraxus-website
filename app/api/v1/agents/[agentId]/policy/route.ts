import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { getAgentPolicy, setAgentPolicy } from "@/lib/policy/registry";
import { getAgent } from "@/lib/agents/registry";
import { getPolicyAccounting } from "@/lib/policy/accounting";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(auth.error ?? "Unauthorized", 401, "UNAUTHORIZED");
  }

  if (!auth.developerId) {
    return apiError(
      "Developer identity is required",
      403,
      "DEVELOPER_IDENTITY_REQUIRED"
    );
  }

  const { agentId } = await params;
  const agent = getAgent(
    agentId,
    auth.developerId,
  );

  if (!agent) {
    return apiError("Agent policy not found", 404, "POLICY_NOT_FOUND");
  }

  const policy = getAgentPolicy(agentId);

  if (!policy) {
    return apiError("Agent policy not found", 404, "POLICY_NOT_FOUND");
  }

  const accounting = getPolicyAccounting(agentId);

  return NextResponse.json({
    success: true,
    type: "agent_policy",
    policy,
    accounting,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(auth.error ?? "Unauthorized", 401, "UNAUTHORIZED");
  }

  try {
    if (!auth.developerId) {
      return apiError(
        "Developer identity is required",
        403,
        "DEVELOPER_IDENTITY_REQUIRED"
      );
    }

    const { agentId } = await params;
    const agent = getAgent(agentId, auth.developerId);

    if (!agent) {
      return apiError(
        "Agent policy not found",
        404,
        "POLICY_NOT_FOUND"
      );
    }

    const body = await request.json();
    const { dailyLimit, perTxLimit } = body;

    if (
      typeof dailyLimit !== "number" ||
      typeof perTxLimit !== "number" ||
      !Number.isFinite(dailyLimit) ||
      !Number.isFinite(perTxLimit)
    ) {
      return apiError(
        "dailyLimit and perTxLimit must be finite numbers",
        400,
        "INVALID_POLICY"
      );
    }

    const policy = setAgentPolicy(agentId, {
      dailyLimit,
      perTxLimit,
    });

    if (!policy) {
      return apiError(
        "Invalid policy or agent not found",
        400,
        "INVALID_POLICY"
      );
    }

    return NextResponse.json({
      success: true,
      type: "agent_policy",
      policy,
    });
  } catch {
    return apiError("Invalid request body", 400, "INVALID_JSON");
  }
}
