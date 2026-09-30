import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { resolveAgentRuntime } from "@/lib/agents/runtime";
import { runAgentAI } from "@/lib/ai/agent";
import type { AIProviderName } from "@/lib/ai/types";

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

  if (!body || typeof body.prompt !== "string" || !body.prompt.trim()) {
    return apiError(
      "Prompt is required",
      400,
      "INVALID_REQUEST",
    );
  }

  const provider =
    body.provider === "anthropic" || body.provider === "google"
      ? body.provider
      : "openai";

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
    const result = await runAgentAI({
      agent: context,
      provider: provider as AIProviderName,
      prompt: body.prompt.trim(),
      model: typeof body.model === "string" ? body.model : undefined,
      maxToolRounds:
        typeof body.maxToolRounds === "number"
          ? body.maxToolRounds
          : undefined,
    });

    return NextResponse.json({
      success: true,
      provider: result.ai.provider,
      model: result.ai.model,
      response: result.ai.text,
      toolResults: result.toolResults,
    });
  } catch {
    return apiError(
      "Agent AI service is currently unavailable",
      502,
      "AGENT_AI_SERVICE_UNAVAILABLE",
    );
  }
}
