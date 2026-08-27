import { createPublicClient, http, type Address } from "viem";
import { arbitrumSepolia } from "viem/chains";

export const APXS_LIQUIDITY_CHAIN = arbitrumSepolia;

export const APXS_SEPOLIA_ADDRESS =
  "0xFE16213961cb4f9B15301f730a5977b9A145add5" as Address;

export const WETH_SEPOLIA_ADDRESS =
  "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73" as Address;

export const STATE_VIEW_ADDRESS =
  "0x9d467fa9062b6e9b1a46e26007ad82db116c67cb" as Address;

export const POSITION_MANAGER_ADDRESS =
  "0xAc631556d3d4019C95769033B5E719dD77124BAc" as Address;

export const APXS_WETH_POOL_ID =
  "0x40c82be5ba64731e3396bdaab91434a64b89f3cdf80ec493d0a5fafa28f1ae24" as `0x${string}`;

export const APXS_LP_TOKEN_ID = BigInt(502);

export const apxsLiquidityClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http("https://sepolia-rollup.arbitrum.io/rpc"),
});
