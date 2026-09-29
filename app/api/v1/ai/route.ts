import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { getOpenAIClient } from "@/lib/openai/client";

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

  try {
    const openai = getOpenAIClient();
    const response = await openai.responses.create({
      model: "gpt-5.6",
      input: body.prompt.trim(),
    });

    return NextResponse.json({
      success: true,
      response: response.output_text,
    });
  } catch {
    return apiError(
      "AI service is currently unavailable",
      502,
      "AI_SERVICE_UNAVAILABLE",
    );
  }
}
