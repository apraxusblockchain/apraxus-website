import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { recordApiRequest } from "@/lib/api/metrics";
import { createAgent, listAgents } from "@/lib/agents/registry";

export async function GET(request: NextRequest) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return apiError(
      auth.error ?? "Unauthorized",
      401,
      "UNAUTHORIZED"
    );
  }

  if (!auth.developerId) {
    return apiError(
      "Developer identity is required",
      403,
      "DEVELOPER_IDENTITY_REQUIRED"
    );
  }

  recordApiRequest("/api/v1/agents");

  return NextResponse.json({
    success: true,
    type: "agents",
    agents: listAgents(auth.developerId),
  });
}

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
    const { name, description, billingCustomerId } = body;

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

    if (
      billingCustomerId !== undefined &&
      (typeof billingCustomerId !== "string" || !billingCustomerId.trim())
    ) {
      return apiError(
        "billingCustomerId must be a non-empty string when provided",
        400,
        "INVALID_BILLING_CUSTOMER_ID"
      );
    }

    if (!auth.developerId) {
      return apiError(
        "Developer identity is required",
        403,
        "DEVELOPER_IDENTITY_REQUIRED"
      );
    }

    const agent = createAgent(auth.developerId, {
      name: name.trim(),
      description: description?.trim(),
      billingCustomerId: billingCustomerId?.trim(),
    });

    if (!agent) {
      return apiError(
        "Billing customer not found or not owned by developer",
        404,
        "BILLING_CUSTOMER_NOT_FOUND"
      );
    }

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
