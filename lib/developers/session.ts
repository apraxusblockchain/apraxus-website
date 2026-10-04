import { NextRequest } from "next/server";
import { getDeveloperAccount } from "@/lib/developers/accounts";
import { getApiKeyByHash } from "@/lib/api/keys";

export const DEVELOPER_SESSION_COOKIE = "apraxus_developer_session";

export function getDeveloperFromRequest(
  request: NextRequest,
) {
  const developerId = request.cookies.get(
    DEVELOPER_SESSION_COOKIE,
  )?.value;

  if (!developerId) {
    return null;
  }

  return getDeveloperAccount(developerId);
}

export function getDeveloperApiKey(developerId: string) {
  return getApiKeyByHash(developerId);
}
