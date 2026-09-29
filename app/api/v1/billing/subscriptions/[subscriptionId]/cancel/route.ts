import { NextRequest, NextResponse } from "next/server";

import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { cancelSubscription } from "@/lib/billing";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
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

  const { subscriptionId } = await params;

  if (!subscriptionId) {
    return apiError(
      "Subscription ID is required",
      400,
      "INVALID_SUBSCRIPTION_ID"
    );
  }

  const subscription = cancelSubscription(subscriptionId, auth.developerId);

  if (!subscription) {
    return apiError(
      "Subscription not found",
      404,
      "SUBSCRIPTION_NOT_FOUND"
    );
  }

  return NextResponse.json({
    success: true,
    type: "subscription_cancellation",
    subscription,
  });
}
