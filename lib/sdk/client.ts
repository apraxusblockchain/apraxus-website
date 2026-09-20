import { ApraxusClient } from "./apraxus";

export function createApraxusClient(apiKey?: string) {
  return new ApraxusClient({
    baseUrl: "/api/v1",
    apiKey,
  });
}
