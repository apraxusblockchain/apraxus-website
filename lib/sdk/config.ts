export const APRAXUS_API_VERSION = "v1";
export const APRAXUS_NETWORK = "arbitrum-sepolia";

export const getApraxusApiKey = () =>
  process.env.NEXT_PUBLIC_APRAXUS_API_KEY ?? "";
