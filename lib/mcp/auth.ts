import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { getApiKeyByHash } from "@/lib/api/keys";
import { getDeveloperAccount } from "@/lib/developers/accounts";

export async function verifyApraxusApiKey(
  token: string,
  developerId?: string,
): Promise<AuthInfo> {
  const record = getApiKeyByHash(token);

  if (record) {
    if (record.revokedAt) {
      throw new Error("Invalid or revoked Apraxus API key");
    }

    return {
      token,
      clientId: record.keyId,
      scopes: ["apraxus"],
      extra: {
        developerId: record.developerId,
        keyId: record.keyId,
      },
    };
  }

  const configuredKey = process.env.APRAXUS_API_KEY;

  if (!configuredKey || token !== configuredKey || !developerId) {
    throw new Error("Invalid or incomplete Apraxus API key");
  }

  const developer = getDeveloperAccount(developerId);

  if (!developer) {
    throw new Error("Developer account not found");
  }

  return {
    token,
    clientId: "apraxus-bootstrap",
    scopes: ["apraxus"],
    extra: {
      developerId: developer.developerId,
      keyId: null,
    },
  };
}
