import { NextRequest } from "next/server";
import { getApiKeyByHash } from "@/lib/api/keys";
import { getDeveloperAccount } from "@/lib/developers/accounts";

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
    const internalDeveloperId = request.headers.get(
      "x-apraxus-developer-id",
    );

    if (internalDeveloperId) {
      const developer = getDeveloperAccount(internalDeveloperId);

      if (!developer) {
        return {
          valid: false,
          error: "Invalid developer identity",
        };
      }

      return {
        valid: true,
        developerId: developer.developerId,
        keyId: null,
      };
    }

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
