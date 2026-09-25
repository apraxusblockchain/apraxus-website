import { ApraxusClient } from "./apraxus";

export type CreateApraxusClientOptions = {
  apiKey?: string;
  baseUrl?: string;
};

export function createApraxusClient(
  options: CreateApraxusClientOptions = {}
) {
  return new ApraxusClient({
    baseUrl: options.baseUrl ?? "/api/v1",
    apiKey: options.apiKey,
  });
}
