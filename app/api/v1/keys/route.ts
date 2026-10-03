import { NextRequest, NextResponse } from "next/server";
import { createApiKey } from "@/lib/api/keys";
import { validateApiKey } from "@/lib/api/auth";
import { getDeveloperAccount } from "@/lib/developers/accounts";

export async function POST(request: NextRequest) {
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

  const developer = getDeveloperAccount(auth.developerId);

  if (!developer) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DEVELOPER_NOT_FOUND",
          message: "Developer account not found",
        },
      },
      { status: 404 },
    );
  }

  const key = createApiKey(developer.developerId);

  return NextResponse.json({
    success: true,
    key: {
      keyId: key.keyId,
      apiKey: key.apiKey,
      keyPrefix: key.keyPrefix,
      createdAt: key.createdAt,
    },
    developerId: developer.developerId,
    network: "arbitrum-sepolia",
    environment: "development",
    warning:
      "Development/testnet key only. Store this key securely. It will not be returned again.",
  });
}
