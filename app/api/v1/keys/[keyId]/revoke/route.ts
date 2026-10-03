import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { apiKeys } from "@/lib/db/schema";
import { revokeApiKey } from "@/lib/api/keys";
import { validateApiKey } from "@/lib/api/auth";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ keyId: string }> },
) {
  const auth = validateApiKey(request);

  if (!auth.valid) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: auth.error } },
      { status: 401 },
    );
  }

  if (!auth.developerId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DEVELOPER_IDENTITY_REQUIRED",
          message: "Developer identity is required",
        },
      },
      { status: 403 },
    );
  }

  const { keyId } = await context.params;

  const key = db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.keyId, keyId))
    .get();

  if (!key || key.developerId !== auth.developerId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "API_KEY_NOT_FOUND",
          message: "API key not found",
        },
      },
      { status: 404 },
    );
  }

  if (key.revokedAt) {
    return NextResponse.json({
      success: true,
      keyId,
      revokedAt: key.revokedAt,
      alreadyRevoked: true,
    });
  }

  const revoked = revokeApiKey(keyId);

  if (!revoked) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "REVOCATION_FAILED",
          message: "Failed to revoke API key",
        },
      },
      { status: 500 },
    );
  }

  const revokedKey = db
    .select({ revokedAt: apiKeys.revokedAt })
    .from(apiKeys)
    .where(eq(apiKeys.keyId, keyId))
    .get();

  return NextResponse.json({
    success: true,
    keyId,
    revoked: true,
    revokedAt: revokedKey?.revokedAt ?? null,
  });
}
