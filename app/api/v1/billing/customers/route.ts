import { NextRequest, NextResponse } from "next/server";

import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import {
  getOrCreateBillingCustomer,
  listBillingCustomers,
} from "@/lib/billing";

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

  return NextResponse.json({
    success: true,
    type: "billing_customers",
    customers: listBillingCustomers(auth.developerId),
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
    const body = await request.json();

    if (
      body.name !== undefined &&
      (typeof body.name !== "string" || !body.name.trim())
    ) {
      return apiError(
        "name must be a non-empty string",
        400,
        "INVALID_NAME"
      );
    }

    if (!auth.developerId) {
      return apiError(
        "Developer identity is required",
        403,
        "DEVELOPER_IDENTITY_REQUIRED"
      );
    }

    const customer = getOrCreateBillingCustomer(
      auth.developerId,
      body.name?.trim(),
    );

    return NextResponse.json({
      success: true,
      type: "billing_customer",
      customer,
    });
  } catch {
    return apiError(
      "Invalid request body",
      400,
      "INVALID_JSON"
    );
  }
}
