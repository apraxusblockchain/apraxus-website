import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { recordApiRequest } from "@/lib/api/metrics";
import { createAgent } from "@/lib/agents/registry";

export async function POST(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED"
    );
  }

  try {
    recordApiRequest("/api/v1/agents");

    const body = await request.json();
    const { name, description } = body;

    if (typeof name !== "string" || !name.trim()) {
      return apiError(
        "name must be a non-empty string",
        400,
        "INVALID_NAME"
      );
    }

    if (
      description !== undefined &&
      (typeof description !== "string" || !description.trim())
    ) {
      return apiError(
        "description must be a non-empty string when provided",
        400,
        "INVALID_DESCRIPTION"
      );
    }

    const agent = createAgent({
      name: name.trim(),
      description: description?.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        type: "agent",
        agent,
      },
      { status: 201 }
    );
  } catch {
    return apiError(
      "Invalid request body",
      400,
      "INVALID_JSON"
    );
  }
}
