import {
  createPublicClient,
  encodeFunctionData,
  formatUnits,
  http,
  maxUint256,
  parseUnits,
  type Address,
  type Hex,
  type WalletClient,
} from "viem";

import { arbitrumSepolia } from "viem/chains";

import { Token } from "@uniswap/sdk-core";

import {
  Actions,
  URVersion,
  V4Planner,
} from "@uniswap/v4-sdk";

import {
  CommandType,
  RoutePlanner,
  UniversalRouterVersion,
} from "@uniswap/universal-router-sdk";

/* =========================================================
   NETWORK
========================================================= */

export const APXS_SWAP_CHAIN = arbitrumSepolia;

/* =========================================================
   CONTRACT ADDRESSES
========================================================= */

export const APXS_SWAP_APXS_ADDRESS =
  "0xFE16213961cb4f9B15301f730a5977b9A145add5" as Address;

export const APXS_SWAP_WETH_ADDRESS =
  "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73" as Address;

export const APXS_SWAP_QUOTER_ADDRESS =
  "0x7de51022d70a725b508085468052e25e22b5c4c9" as Address;

export const APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS =
  "0xefd1d4bd4cf1e86da286bb4cb1b8bced9c10ba47" as Address;

/*
 * Uniswap Permit2.
 *
 * This is the canonical Permit2 address used by the
 * Uniswap v4 packages and confirmed in your local package.
 */
export const APXS_SWAP_PERMIT2_ADDRESS =
  "0x000000000022D473030F116dDEE9F6B43aC78BA3" as Address;

/*
 * Confirmed deployed PoolManager on Arbitrum Sepolia.
 */
export const APXS_SWAP_POOL_MANAGER_ADDRESS =
  "0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317" as Address;

/*
 * Confirmed StateView on Arbitrum Sepolia.
 */
export const APXS_SWAP_STATE_VIEW_ADDRESS =
  "0x9D467FA9062b6e9B1a46E26007aD82db116c67cB" as Address;

/* =========================================================
   TOKEN DECIMALS
========================================================= */

export const APXS_SWAP_WETH_DECIMALS = 18;
export const APXS_SWAP_APXS_DECIMALS = 8;

/* =========================================================
   V4 POOL KEY
========================================================= */

export const APXS_SWAP_POOL_KEY = {
  currency0: APXS_SWAP_WETH_ADDRESS,
  currency1: APXS_SWAP_APXS_ADDRESS,
  fee: 3000,
  tickSpacing: 60,
  hooks:
    "0x0000000000000000000000000000000000000000" as Address,
} as const;

/* =========================================================
   PUBLIC CLIENT
========================================================= */

export const apxsSwapPublicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(
    "https://sepolia-rollup.arbitrum.io/rpc",
  ),
});

/* =========================================================
   TOKENS
========================================================= */

const WETH_TOKEN = new Token(
  421614,
  APXS_SWAP_WETH_ADDRESS,
  APXS_SWAP_WETH_DECIMALS,
  "WETH",
  "Wrapped Ether",
);

const APXS_TOKEN = new Token(
  421614,
  APXS_SWAP_APXS_ADDRESS,
  APXS_SWAP_APXS_DECIMALS,
  "APXS",
  "Apraxus",
);

/* =========================================================
   QUOTER ABI
========================================================= */

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
              {
                name: "currency0",
                type: "address",
              },
              {
                name: "currency1",
                type: "address",
              },
              {
                name: "fee",
                type: "uint24",
              },
              {
                name: "tickSpacing",
                type: "int24",
              },
              {
                name: "hooks",
                type: "address",
              },
            ],
          },
          {
            name: "zeroForOne",
            type: "bool",
          },
          {
            name: "exactAmount",
            type: "uint128",
          },
          {
            name: "hookData",
            type: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "amountOut",
        type: "uint256",
      },
      {
        name: "gasEstimate",
        type: "uint256",
      },
    ],
  },
] as const;

/* =========================================================
   UNIVERSAL ROUTER ABI
========================================================= */

const UNIVERSAL_ROUTER_ABI = [
  {
    type: "function",
    name: "execute",
    stateMutability: "payable",
    inputs: [
      {
        name: "commands",
        type: "bytes",
      },
      {
        name: "inputs",
        type: "bytes[]",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
    outputs: [],
  },
] as const;

/* =========================================================
   ERC20 ABI
========================================================= */

const ERC20_APPROVAL_ABI = [
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "amount",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
] as const;

/* =========================================================
   PERMIT2 ABI
========================================================= */

const PERMIT2_ABI = [
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "token",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "amount",
        type: "uint160",
      },
      {
        name: "expiration",
        type: "uint48",
      },
      {
        name: "nonce",
        type: "uint48",
      },
    ],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "token",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint160",
      },
      {
        name: "expiration",
        type: "uint48",
      },
    ],
    outputs: [],
  },
] as const;

/* =========================================================
   TYPES
========================================================= */

export type ApxsSwapQuote = {
  amountIn: bigint;
  amountOut: bigint;
  amountInFormatted: string;
  amountOutFormatted: string;
  gasEstimate: bigint;
};

export type ApxsSwapCalldata = {
  router: Address;
  data: Hex;
  commands: Hex;
  inputs: readonly Hex[];
  deadline: bigint;
};

export type Permit2Allowance = {
  amount: bigint;
  expiration: number;
  nonce: number;
};

/* =========================================================
   QUOTE: WETH -> APXS
========================================================= */

export async function quoteWethToApxs(
  amountWeth: string,
): Promise<ApxsSwapQuote> {
  const amountIn = parseUnits(
    amountWeth,
    APXS_SWAP_WETH_DECIMALS,
  );

  const result =
    await apxsSwapPublicClient.simulateContract({
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
    amountInFormatted: formatUnits(
      amountIn,
      APXS_SWAP_WETH_DECIMALS,
    ),
    amountOutFormatted: formatUnits(
      result.result[0],
      APXS_SWAP_APXS_DECIMALS,
    ),
    gasEstimate: result.result[1],
  };
}

/* =========================================================
   QUOTE: APXS -> WETH
========================================================= */

export async function quoteApxsToWeth(
  amountApxs: string,
): Promise<ApxsSwapQuote> {
  const amountIn = parseUnits(
    amountApxs,
    APXS_SWAP_APXS_DECIMALS,
  );

  const result =
    await apxsSwapPublicClient.simulateContract({
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
    amountInFormatted: formatUnits(
      amountIn,
      APXS_SWAP_APXS_DECIMALS,
    ),
    amountOutFormatted: formatUnits(
      result.result[0],
      APXS_SWAP_WETH_DECIMALS,
    ),
    gasEstimate: result.result[1],
  };
}

/* =========================================================
   CHECK ERC20 -> PERMIT2 ALLOWANCE
========================================================= */

export async function getWethToPermit2Allowance(
  owner: Address,
): Promise<bigint> {
  return apxsSwapPublicClient.readContract({
    address: APXS_SWAP_WETH_ADDRESS,
    abi: ERC20_APPROVAL_ABI,
    functionName: "allowance",
    args: [
      owner,
      APXS_SWAP_PERMIT2_ADDRESS,
    ],
  });
}

/* =========================================================
   CHECK PERMIT2 -> ROUTER ALLOWANCE
========================================================= */

export async function getPermit2RouterAllowance(
  owner: Address,
): Promise<Permit2Allowance> {
  const result =
    await apxsSwapPublicClient.readContract({
      address: APXS_SWAP_PERMIT2_ADDRESS,
      abi: PERMIT2_ABI,
      functionName: "allowance",
      args: [
        owner,
        APXS_SWAP_WETH_ADDRESS,
        APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS,
      ],
    });

  return {
    amount: result[0],
    expiration: Number(result[1]),
    nonce: Number(result[2]),
  };
}

/* =========================================================
   APPROVE WETH -> PERMIT2
========================================================= */

export async function approveWethForPermit2(
  walletClient: WalletClient,
  account: Address,
  amount: bigint = maxUint256,
): Promise<Hex> {
  const hash = await walletClient.writeContract({
    account,
    chain: arbitrumSepolia,
    address: APXS_SWAP_WETH_ADDRESS,
    abi: ERC20_APPROVAL_ABI,
    functionName: "approve",
    args: [
      APXS_SWAP_PERMIT2_ADDRESS,
      amount,
    ],
  });

  return hash;
}

/* =========================================================
   APPROVE PERMIT2 -> UNIVERSAL ROUTER
========================================================= */

export async function approvePermit2ForRouter(
  walletClient: WalletClient,
  account: Address,
  amount: bigint,
  expirationSeconds = 30 * 24 * 60 * 60,
): Promise<Hex> {
  const now = Math.floor(
    Date.now() / 1000,
  );

  const expiration = Math.min(
    now + expirationSeconds,
    0xffffffff,
  );

  const maxUint160 =
    (2n ** 160n) - 1n;

  const approvalAmount =
    amount > maxUint160
      ? maxUint160
      : amount;

  const hash =
    await walletClient.writeContract({
      account,
      chain: arbitrumSepolia,
      address: APXS_SWAP_PERMIT2_ADDRESS,
      abi: PERMIT2_ABI,
      functionName: "approve",
      args: [
        APXS_SWAP_WETH_ADDRESS,
        APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS,
        approvalAmount,
        expiration,
      ],
    });

  return hash;
}

/* =========================================================
   ENSURE BOTH APPROVALS EXIST
========================================================= */

export async function ensureWethSwapApprovals(
  walletClient: WalletClient,
  account: Address,
  amountIn: bigint,
): Promise<{
  erc20ApprovalHash?: Hex;
  permit2ApprovalHash?: Hex;
}> {
  const result: {
    erc20ApprovalHash?: Hex;
    permit2ApprovalHash?: Hex;
  } = {};

  /*
   * STEP 1
   *
   * WETH contract must allow Permit2 to move WETH.
   */
  const erc20Allowance =
    await getWethToPermit2Allowance(
      account,
    );

  if (erc20Allowance < amountIn) {
    result.erc20ApprovalHash =
      await approveWethForPermit2(
        walletClient,
        account,
        maxUint256,
      );

    await apxsSwapPublicClient.waitForTransactionReceipt(
      {
        hash: result.erc20ApprovalHash,
      },
    );
  }

  /*
   * STEP 2
   *
   * Permit2 must allow Universal Router
   * to transfer WETH.
   */
  const permit2Allowance =
    await getPermit2RouterAllowance(
      account,
    );

  const now = Math.floor(
    Date.now() / 1000,
  );

  const permit2AllowanceValid =
    permit2Allowance.amount >= amountIn &&
    permit2Allowance.expiration > now;

  if (!permit2AllowanceValid) {
    result.permit2ApprovalHash =
      await approvePermit2ForRouter(
        walletClient,
        account,
        maxUint256,
      );

    await apxsSwapPublicClient.waitForTransactionReceipt(
      {
        hash: result.permit2ApprovalHash,
      },
    );
  }

  return result;
}

/* =========================================================
   BUILD V4 EXACT INPUT SINGLE
========================================================= */

function buildExactInputSingleCalldata(
  currencyIn: Address,
  currencyOut: Address,
  amountIn: bigint,
  amountOutMinimum: bigint,
  recipient: Address,
  deadline: bigint,
): ApxsSwapCalldata {
  const zeroForOne =
    currencyIn.toLowerCase() ===
    APXS_SWAP_WETH_ADDRESS.toLowerCase();

  const inputCurrency =
    zeroForOne
      ? APXS_SWAP_WETH_ADDRESS
      : APXS_SWAP_APXS_ADDRESS;

  const outputCurrency =
    zeroForOne
      ? APXS_SWAP_APXS_ADDRESS
      : APXS_SWAP_WETH_ADDRESS;

  const v4 = new V4Planner();

  /*
   * V4 exact-input swap.
   */
  v4.addAction(
    Actions.SWAP_EXACT_IN_SINGLE,
    [
      {
        poolKey:
          APXS_SWAP_POOL_KEY,

        zeroForOne,

        amountIn:
          amountIn.toString(),

        amountOutMinimum:
          amountOutMinimum.toString(),

        hookData:
          "0x",
      },
    ],
    URVersion.V2_0,
  );

  /*
   * IMPORTANT:
   *
   * payerIsUser = true
   *
   * This means Universal Router gets the input token
   * from the user's wallet through Permit2.
   */
  v4.addSettle(
    zeroForOne ? WETH_TOKEN : APXS_TOKEN,
    true,
  );

  /*
   * Send output token directly to recipient.
   */
  v4.addTake(
    zeroForOne ? APXS_TOKEN : WETH_TOKEN,
    recipient,
  );

  const v4Input =
    v4.finalize() as Hex;

  const routePlanner =
    new RoutePlanner();

  routePlanner.addCommand(
    CommandType.V4_SWAP,
    [v4Input],
    false,
    UniversalRouterVersion.V2_0,
  );

  const commands =
    routePlanner.commands as Hex;

  const inputs =
    routePlanner.inputs as readonly Hex[];

  const data =
    encodeFunctionData({
      abi: UNIVERSAL_ROUTER_ABI,
      functionName: "execute",
      args: [
        commands,
        inputs,
        deadline,
      ],
    });

  return {
    router:
      APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS,

    data,

    commands,

    inputs,

    deadline,
  };
}

/* =========================================================
   BUILD WETH -> APXS
========================================================= */

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

/* =========================================================
   BUILD APXS -> WETH
========================================================= */

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

/* =========================================================
   DEBUG / STATUS
========================================================= */

export async function getWethSwapApprovalStatus(
  owner: Address,
  amountIn: bigint,
): Promise<{
  wethToPermit2: bigint;
  permit2ToRouter: bigint;
  permit2Expiration: number;
  erc20ApprovalReady: boolean;
  permit2ApprovalReady: boolean;
  ready: boolean;
}> {
  const [
    wethAllowance,
    permit2Allowance,
  ] = await Promise.all([
    getWethToPermit2Allowance(owner),
    getPermit2RouterAllowance(owner),
  ]);

  const now =
    Math.floor(Date.now() / 1000);

  const erc20ApprovalReady =
    wethAllowance >= amountIn;

  const permit2ApprovalReady =
    permit2Allowance.amount >= amountIn &&
    permit2Allowance.expiration > now;

  return {
    wethToPermit2:
      wethAllowance,

    permit2ToRouter:
      permit2Allowance.amount,

    permit2Expiration:
      permit2Allowance.expiration,

    erc20ApprovalReady,

    permit2ApprovalReady,

    ready:
      erc20ApprovalReady &&
      permit2ApprovalReady,
  };
}