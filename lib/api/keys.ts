import { createHash, randomBytes, randomUUID } from "crypto";

export function generateApiKey() {
  return `apx_${randomBytes(24).toString("hex")}`;
}

export function getApiKeyPrefix(apiKey: string) {
  return apiKey.slice(0, 12);
}

export function hashApiKey(apiKey: string) {
  return createHash("sha256").update(apiKey).digest("hex");
}

export function generateApiKeyRecord() {
  const apiKey = generateApiKey();

  return {
    keyId: `key_${randomUUID()}`,
    apiKey,
    keyPrefix: getApiKeyPrefix(apiKey),
    keyHash: hashApiKey(apiKey),
  };
}

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { apiKeys } from "@/lib/db/schema";

export function createApiKey(developerId: string) {
  const record = generateApiKeyRecord();
  const createdAt = new Date().toISOString();

  db.insert(apiKeys).values({
    keyId: record.keyId,
    developerId,
    keyPrefix: record.keyPrefix,
    keyHash: record.keyHash,
    createdAt,
  }).run();

  return {
    keyId: record.keyId,
    apiKey: record.apiKey,
    keyPrefix: record.keyPrefix,
    createdAt,
  };
}

export function getApiKeyByHash(apiKey: string) {
  const keyHash = hashApiKey(apiKey);

  return db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.keyHash, keyHash))
    .get() ?? null;
}

export function revokeApiKey(keyId: string) {
  const revokedAt = new Date().toISOString();

  const result = db
    .update(apiKeys)
    .set({ revokedAt })
    .where(eq(apiKeys.keyId, keyId))
    .run();

  return result.changes > 0;
}
