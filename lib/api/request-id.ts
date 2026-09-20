export function createRequestId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}
