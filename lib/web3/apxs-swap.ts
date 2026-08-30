import {
  createPublicClient,
  formatUnits,
  http,
  parseUnits,
  type Address,
} from "viem";
import { arbitrumSepolia } from "viem/chains";

export const APXS_SWAP_CHAIN = arbitrumSepolia;

export const APXS_SWAP_APXS_ADDRESS =
  "0xFE16213961cb4f9B15301f730a5977b9A145add5" as Address;

export const APXS_SWAP_WETH_ADDRESS =
  "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73" as Address;

export const APXS_SWAP_QUOTER_ADDRESS =
  "0x7de51022d70a725b508085468052e25e22b5c4c9" as Address;

export const APXS_SWAP_POOL_KEY = {
  currency0: APXS_SWAP_WETH_ADDRESS,
  currency1: APXS_SWAP_APXS_ADDRESS,
  fee: 3000,
  tickSpacing: 60,
  hooks: "0x0000000000000000000000000000000000000000" as Address,
} as const;

const QUOTER_ABI = [
  {
    type: "function",
    name: "quoteExactInputSingle",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "params",
        type: "tuple",
        components: [
          {
            name: "poolKey",
            type: "tuple",
            components: [
              { name: "currency0", type: "address" },
              { name: "currency1", type: "address" },
              { name: "fee", type: "uint24" },
              { name: "tickSpacing", type: "int24" },
              { name: "hooks", type: "address" },
            ],
          },
          { name: "zeroForOne", type: "bool" },
          { name: "exactAmount", type: "uint128" },
          { name: "hookData", type: "bytes" },
        ],
      },
    ],
    outputs: [
      { name: "amountOut", type: "uint256" },
      { name: "gasEstimate", type: "uint256" },
    ],
  },
] as const;

export const apxsSwapPublicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http("https://sepolia-rollup.arbitrum.io/rpc"),
});

export type ApxsSwapQuote = {
  amountIn: bigint;
  amountOut: bigint;
  amountInFormatted: string;
  amountOutFormatted: string;
  gasEstimate: bigint;
};

export async function quoteWethToApxs(
  amountWeth: string,
): Promise<ApxsSwapQuote> {
  const amountIn = parseUnits(amountWeth, 18);

  const result = await apxsSwapPublicClient.simulateContract({
    address: APXS_SWAP_QUOTER_ADDRESS,
    abi: QUOTER_ABI,
    functionName: "quoteExactInputSingle",
    args: [
      {
        poolKey: APXS_SWAP_POOL_KEY,
        zeroForOne: true,
        exactAmount: amountIn,
        hookData: "0x",
      },
    ],
  });

  return {
    amountIn,
    amountOut: result.result[0],
    amountInFormatted: formatUnits(amountIn, 18),
    amountOutFormatted: formatUnits(result.result[0], 8),
    gasEstimate: result.result[1],
  };
}

export async function quoteApxsToWeth(
  amountApxs: string,
): Promise<ApxsSwapQuote> {
  const amountIn = parseUnits(amountApxs, 8);

  const result = await apxsSwapPublicClient.simulateContract({
    address: APXS_SWAP_QUOTER_ADDRESS,
    abi: QUOTER_ABI,
    functionName: "quoteExactInputSingle",
    args: [
      {
        poolKey: APXS_SWAP_POOL_KEY,
        zeroForOne: false,
        exactAmount: amountIn,
        hookData: "0x",
      },
    ],
  });

  return {
    amountIn,
    amountOut: result.result[0],
    amountInFormatted: formatUnits(amountIn, 8),
    amountOutFormatted: formatUnits(result.result[0], 18),
    gasEstimate: result.result[1],
  };
}
