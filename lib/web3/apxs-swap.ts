import {
  createPublicClient,
  encodeFunctionData,
  formatUnits,
  http,
  parseUnits,
  type Address,
  type Hex,
} from "viem";
import { arbitrumSepolia } from "viem/chains";
import { Token } from "@uniswap/sdk-core";
import { Actions, URVersion, V4Planner } from "@uniswap/v4-sdk";
import {
  CommandType,
  RoutePlanner,
  UniversalRouterVersion,
} from "@uniswap/universal-router-sdk";

export const APXS_SWAP_CHAIN = arbitrumSepolia;

export const APXS_SWAP_APXS_ADDRESS =
  "0xFE16213961cb4f9B15301f730a5977b9A145add5" as Address;

export const APXS_SWAP_WETH_ADDRESS =
  "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73" as Address;

export const APXS_SWAP_QUOTER_ADDRESS =
  "0x7de51022d70a725b508085468052e25e22b5c4c9" as Address;

export const APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS =
  "0xefd1d4bd4cf1e86da286bb4cb1b8bced9c10ba47" as Address;

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

const UNIVERSAL_ROUTER_ABI = [
  {
    type: "function",
    name: "execute",
    stateMutability: "payable",
    inputs: [
      { name: "commands", type: "bytes" },
      { name: "inputs", type: "bytes[]" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [],
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

const WETH_TOKEN = new Token(
  421614,
  APXS_SWAP_WETH_ADDRESS,
  18,
  "WETH",
  "Wrapped Ether",
);

const APXS_TOKEN = new Token(
  421614,
  APXS_SWAP_APXS_ADDRESS,
  8,
  "APXS",
  "Apraxus",
);

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

export type ApxsSwapCalldata = {
  router: Address;
  data: Hex;
  commands: Hex;
  inputs: readonly Hex[];
  deadline: bigint;
};

function buildExactInputSingleCalldata(
  currencyIn: Address,
  currencyOut: Address,
  amountIn: bigint,
  amountOutMinimum: bigint,
  recipient: Address,
  deadline: bigint,
): ApxsSwapCalldata {
  const zeroForOne =
    currencyIn.toLowerCase() === APXS_SWAP_WETH_ADDRESS.toLowerCase();

  const inputCurrency = zeroForOne ? WETH_TOKEN : APXS_TOKEN;
  const outputCurrency = zeroForOne ? APXS_TOKEN : WETH_TOKEN;

  const v4 = new V4Planner();

  v4.addAction(
    Actions.SWAP_EXACT_IN_SINGLE,
    [
      {
        poolKey: APXS_SWAP_POOL_KEY,
        zeroForOne,
        amountIn: amountIn.toString(),
        amountOutMinimum: amountOutMinimum.toString(),
        minHopPriceX36: "0",
        hookData: "0x",
      },
    ],
    URVersion.V2_1_1,
  );

  v4.addSettle(inputCurrency, true);
  v4.addTake(outputCurrency, recipient);

  const v4Input = v4.finalize() as Hex;

  const routePlanner = new RoutePlanner();

  routePlanner.addCommand(
    CommandType.V4_SWAP,
    [v4Input],
    false,
    UniversalRouterVersion.V2_1_1,
  );

  const commands = routePlanner.commands as Hex;
  const inputs = routePlanner.inputs as readonly Hex[];

  const data = encodeFunctionData({
    abi: UNIVERSAL_ROUTER_ABI,
    functionName: "execute",
    args: [commands, inputs, deadline],
  });

  return {
    router: APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS,
    data,
    commands,
    inputs,
    deadline,
  };
}

export function buildWethToApxsSwap(
  amountIn: bigint,
  amountOutMinimum: bigint,
  recipient: Address,
  deadline: bigint,
): ApxsSwapCalldata {
  return buildExactInputSingleCalldata(
    APXS_SWAP_WETH_ADDRESS,
    APXS_SWAP_APXS_ADDRESS,
    amountIn,
    amountOutMinimum,
    recipient,
    deadline,
  );
}

export function buildApxsToWethSwap(
  amountIn: bigint,
  amountOutMinimum: bigint,
  recipient: Address,
  deadline: bigint,
): ApxsSwapCalldata {
  return buildExactInputSingleCalldata(
    APXS_SWAP_APXS_ADDRESS,
    APXS_SWAP_WETH_ADDRESS,
    amountIn,
    amountOutMinimum,
    recipient,
    deadline,
  );
}
