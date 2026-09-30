import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { generateAI } from "@/lib/ai";
import type { AIProviderName } from "@/lib/ai/types";

export async function POST(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED",
    );
  }

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

  try {
    const result = await generateAI(provider as AIProviderName, {
      prompt: body.prompt.trim(),
      model: typeof body.model === "string" ? body.model : undefined,
    });

    return NextResponse.json({
      success: true,
      provider: result.provider,
      model: result.model,
      response: result.text,
    });
  } catch {
    return apiError(
      "AI service is currently unavailable",
      502,
      "AI_SERVICE_UNAVAILABLE",
    );
  }
}
