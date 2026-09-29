import { NextRequest } from "next/server";
import { getApiKeyByHash } from "@/lib/api/keys";

type ApiAuthResult =
  | {
      valid: true;
      developerId: string | null;
      keyId: string | null;
    }
  | {
      valid: false;
      error: string;
    };

export function validateApiKey(request: NextRequest): ApiAuthResult {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return {
      valid: false,
      error: "Missing API key",
    };
  }

  const providedKey = authorization.slice("Bearer ".length).trim();

  if (!providedKey) {
    return {
      valid: false,
      error: "Missing API key",
    };
  }

  const storedKey = getApiKeyByHash(providedKey);

  if (storedKey && !storedKey.revokedAt) {
    return {
      valid: true,
      developerId: storedKey.developerId,
      keyId: storedKey.keyId,
    };
  }

  const configuredKey = process.env.APRAXUS_API_KEY;

  if (configuredKey && providedKey === configuredKey) {
    return {
      valid: true,
      developerId: null,
      keyId: null,
    };
  }

  return {
    valid: false,
    error: "Invalid API key",
  };
}
