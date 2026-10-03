import type { Address } from "viem";

export type AssetKind = "native" | "token";

export type ApraxusAsset = {
  id: string;
  symbol: string;
  name: string;
  kind: AssetKind;
  chainId: number;
  decimals: number;
  address?: Address;
  enabled: boolean;
};

export type ApraxusFeeConfig = {
  enabled: boolean;
  basisPoints: number;
  minimumAmount?: string;
  maximumAmount?: string;
  feeAsset?: string;
};
