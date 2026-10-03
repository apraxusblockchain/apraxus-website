import type { ApraxusAsset } from "./types";

export const APRAXUS_ASSETS: Record<string, ApraxusAsset> = {
  "apxs:421614": {
    id: "apxs:421614",
    symbol: "APXS",
    name: "Apraxus",
    kind: "token",
    chainId: 421614,
    decimals: 8,
    address: "0xFE16213961cb4f9B15301f730a5977b9A145add5",
    enabled: true,
  },
  "apxs:97": {
    id: "apxs:97",
    symbol: "APXS",
    name: "Apraxus",
    kind: "token",
    chainId: 97,
    decimals: 8,
    address: "0xEf55E41d5F5473BECAC8f7116654eB3CD571447e",
    enabled: true,
  },
  "eth:421614": {
    id: "eth:421614",
    symbol: "ETH",
    name: "Ether",
    kind: "native",
    chainId: 421614,
    decimals: 18,
    enabled: true,
  },
  "bnb:97": {
    id: "bnb:97",
    symbol: "BNB",
    name: "BNB",
    kind: "native",
    chainId: 97,
    decimals: 18,
    enabled: true,
  },
};

export const APRAXUS_FEE_CONFIG = {
  enabled: true,
  basisPoints: 50,
  minimumAmount: "0",
};

export function getApraxusAsset(assetId: string): ApraxusAsset | undefined {
  return APRAXUS_ASSETS[assetId];
}

export function getApraxusAssetBySymbol(
  symbol: string,
  chainId: number,
): ApraxusAsset | undefined {
  const normalizedSymbol = symbol.trim().toLowerCase();

  return Object.values(APRAXUS_ASSETS).find(
    (asset) =>
      asset.enabled &&
      asset.chainId === chainId &&
      asset.symbol.toLowerCase() === normalizedSymbol,
  );
}
