import { NextRequest } from "next/server";

export function validateApiKey(request: NextRequest) {
  const configuredKey = process.env.APRAXUS_API_KEY;

  if (!configuredKey) {
    return {
      valid: false,
      error: "API authentication is not configured",
    };
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return {
      valid: false,
      error: "Missing API key",
    };
  }

  const providedKey = authorization.slice("Bearer ".length).trim();

  if (providedKey !== configuredKey) {
    return {
      valid: false,
      error: "Invalid API key",
    };
  }

  return { valid: true };
}
