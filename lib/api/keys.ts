import { randomBytes } from "crypto";

export function generateApiKey() {
  return `apx_${randomBytes(24).toString("hex")}`;
}
