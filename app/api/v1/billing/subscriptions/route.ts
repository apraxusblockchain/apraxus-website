import { NextRequest, NextResponse } from "next/server";

import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import {
  createSubscription,
  getOrCreateBillingCustomer,
  listSubscriptions,
} from "@/lib/billing";
import type { BillingPlanId } from "@/lib/billing";

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
    type: "subscriptions",
    subscriptions: listSubscriptions(auth.developerId),
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
    const { planId } = body;

    if (
      typeof planId !== "string" ||
      !["free", "builder", "pro", "enterprise"].includes(planId)
    ) {
      return apiError(
        "Invalid billing plan",
        400,
        "INVALID_PLAN"
      );
    }

    if (!auth.developerId) {
      return apiError(
        "Developer identity is required",
        403,
        "DEVELOPER_IDENTITY_REQUIRED"
      );
    }

    const customer = getOrCreateBillingCustomer(auth.developerId);

    const subscription = createSubscription(auth.developerId, {
      customerId: customer.customerId,
      planId: planId as BillingPlanId,
    });

    if ("error" in subscription) {
      if (subscription.error === "INVALID_CUSTOMER") {
        return apiError(
          "Billing customer is invalid",
          404,
          "INVALID_CUSTOMER"
        );
      }

      if (subscription.error === "PENDING_SUBSCRIPTION_EXISTS") {
        return apiError(
          "Customer already has a pending subscription",
          409,
          "PENDING_SUBSCRIPTION_EXISTS"
        );
      }

      return apiError(
        "Customer already has an active subscription",
        409,
        "ACTIVE_SUBSCRIPTION_EXISTS"
      );
    }

    return NextResponse.json({
      success: true,
      type: "subscription",
      subscription: subscription.subscription,
    });
  } catch {
    return apiError(
      "Invalid request body",
      400,
      "INVALID_JSON"
    );
  }
}
