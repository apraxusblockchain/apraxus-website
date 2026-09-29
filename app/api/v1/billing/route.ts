import { NextRequest, NextResponse } from "next/server";

import { validateApiKey } from "@/lib/api/auth";
import { apiError } from "@/lib/api/errors";
import { listBillingRecords } from "@/lib/billing";

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
    type: "billing_records",
    records: listBillingRecords(auth.developerId),
  });
}
