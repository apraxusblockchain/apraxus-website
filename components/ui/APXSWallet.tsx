"use client";

import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatUnits,
  http,
  maxUint256,
  parseUnits,
  type Address,
} from "viem";
import { arbitrumSepolia } from "viem/chains";

import {
  APXS_ABI,
  APXS_CONTRACT_ADDRESS,
} from "@/lib/web3/apxs";

import { connectMetaMask } from "@/lib/web3/metamask";

import {
  APXS_SWAP_APXS_ADDRESS,
  APXS_SWAP_WETH_ADDRESS,
  APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS,
  quoteWethToApxs,
  quoteApxsToWeth,
  buildWethToApxsSwap,
  buildApxsToWethSwap,
} from "@/lib/web3/apxs-swap";

const client = createPublicClient({
  chain: arbitrumSepolia,
  transport: http("https://sepolia-rollup.arbitrum.io/rpc"),
});

const WETH_ADDRESS =
  APXS_SWAP_WETH_ADDRESS as Address;

const APXS_ADDRESS =
  APXS_SWAP_APXS_ADDRESS as Address;

const PERMIT2_ADDRESS =
  "0x000000000022D473030F116dDEE9F6B43aC78BA3" as Address;

const UNIVERSAL_ROUTER_ADDRESS =
  APXS_SWAP_UNIVERSAL_ROUTER_ADDRESS as Address;

const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
  },
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
        name: "",
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

const MAX_UINT160 =
  (2n ** 160n) - 1n;

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function calculateMinimumOutput(
  amountOut: bigint,
  slippageBps: bigint,
) {
  return (
    amountOut -
    (amountOut * slippageBps) / 10_000n
  );
}

export default function APXSWallet() {
  const [address, setAddress] =
    useState<Address | null>(null);

  const [apxsBalance, setApxsBalance] =
    useState("—");

  const [wethBalance, setWethBalance] =
    useState("—");

  const [wethTokenAllowance, setWethTokenAllowance] =
    useState<bigint>(0n);

  const [apxsTokenAllowance, setApxsTokenAllowance] =
    useState<bigint>(0n);

  const [wethPermitAllowance, setWethPermitAllowance] =
    useState<bigint>(0n);

  const [apxsPermitAllowance, setApxsPermitAllowance] =
    useState<bigint>(0n);

  const [wethPermitExpiration, setWethPermitExpiration] =
    useState<number>(0);

  const [apxsPermitExpiration, setApxsPermitExpiration] =
    useState<number>(0);

  const [side, setSide] =
    useState<"buy" | "sell">("buy");

  const [amount, setAmount] =
    useState("");

  const [quote, setQuote] =
    useState<string>("—");

  const [quoteRaw, setQuoteRaw] =
    useState<bigint>(0n);

  const [loading, setLoading] =
    useState(false);

  const [quoteLoading, setQuoteLoading] =
    useState(false);

  const [approvalLoading, setApprovalLoading] =
    useState(false);

  const [swapLoading, setSwapLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [txHash, setTxHash] =
    useState("");

  async function getWallet() {
    const {
      provider,
      account,
    } = await connectMetaMask();

    if (!account) {
      throw new Error(
        "No wallet account found."
      );
    }

    const walletClient =
      createWalletClient({
        account,
        chain: arbitrumSepolia,
        transport: custom(provider),
      });

    const chainId =
      await walletClient.getChainId();

    if (
      chainId !== arbitrumSepolia.id
    ) {
      throw new Error(
        "Please switch MetaMask to Arbitrum Sepolia."
      );
    }

    return {
      walletClient,
      account,
    };
  }

  async function loadState(
    account: Address,
  ) {
    const [
      apxsRaw,
      apxsDecimals,
      wethRaw,
      wethDecimals,
      wethAllowance,
      apxsAllowance,
      wethPermit,
      apxsPermit,
    ] = await Promise.all([
      client.readContract({
        address: APXS_ADDRESS,
        abi: APXS_ABI,
        functionName: "balanceOf",
        args: [account],
      }),

      client.readContract({
        address: APXS_ADDRESS,
        abi: APXS_ABI,
        functionName: "decimals",
      }),

      client.readContract({
        address: WETH_ADDRESS,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [account],
      }),

      client.readContract({
        address: WETH_ADDRESS,
        abi: ERC20_ABI,
        functionName: "decimals",
      }),

      client.readContract({
        address: WETH_ADDRESS,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [
          account,
          PERMIT2_ADDRESS,
        ],
      }),

      client.readContract({
        address: APXS_ADDRESS,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [
          account,
          PERMIT2_ADDRESS,
        ],
      }),

      client.readContract({
        address: PERMIT2_ADDRESS,
        abi: PERMIT2_ABI,
        functionName: "allowance",
        args: [
          account,
          WETH_ADDRESS,
          UNIVERSAL_ROUTER_ADDRESS,
        ],
      }),

      client.readContract({
        address: PERMIT2_ADDRESS,
        abi: PERMIT2_ABI,
        functionName: "allowance",
        args: [
          account,
          APXS_ADDRESS,
          UNIVERSAL_ROUTER_ADDRESS,
        ],
      }),
    ]);

    setApxsBalance(
      formatUnits(
        apxsRaw,
        apxsDecimals,
      ),
    );

    setWethBalance(
      formatUnits(
        wethRaw,
        wethDecimals,
      ),
    );

    setWethTokenAllowance(
      wethAllowance,
    );

    setApxsTokenAllowance(
      apxsAllowance,
    );

    setWethPermitAllowance(
      wethPermit[0],
    );

    setWethPermitExpiration(
      wethPermit[1],
    );

    setApxsPermitAllowance(
      apxsPermit[0],
    );

    setApxsPermitExpiration(
      apxsPermit[1],
    );
  }

  async function connectWallet() {
    try {
      setError("");
      setMessage("");
      setLoading(true);

      const {
        account,
      } = await getWallet();

      setAddress(account);

      await loadState(account);

      setMessage(
        "Wallet connected successfully.",
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect wallet.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function approveTokenForPermit2(
    token: Address,
    label: string,
  ) {
    if (!address) return;

    try {
      setError("");
      setMessage("");
      setTxHash("");
      setApprovalLoading(true);

      const {
        walletClient,
        account,
      } = await getWallet();

      const hash =
        await walletClient.writeContract({
          account,
          address: token,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [
            PERMIT2_ADDRESS,
            maxUint256,
          ],
          chain: arbitrumSepolia,
        });

      setTxHash(hash);

      setMessage(
        `${label} approval submitted. Waiting for confirmation...`,
      );

      await client.waitForTransactionReceipt({
        hash,
      });

      await loadState(account);

      setMessage(
        `${label} → Permit2 approval confirmed.`,
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : `${label} approval failed.`,
      );
    } finally {
      setApprovalLoading(false);
    }
  }

  async function approvePermit2ForRouter(
    token: Address,
    label: string,
  ) {
    if (!address) return;

    try {
      setError("");
      setMessage("");
      setTxHash("");
      setApprovalLoading(true);

      const {
        walletClient,
        account,
      } = await getWallet();

      const expiration =
        Math.floor(Date.now() / 1000) +
        30 * 24 * 60 * 60;

      const hash =
        await walletClient.writeContract({
          account,
          address: PERMIT2_ADDRESS,
          abi: PERMIT2_ABI,
          functionName: "approve",
          args: [
            token,
            UNIVERSAL_ROUTER_ADDRESS,
            MAX_UINT160,
            expiration,
          ],
          chain: arbitrumSepolia,
        });

      setTxHash(hash);

      setMessage(
        `${label} Permit2 approval submitted...`,
      );

      await client.waitForTransactionReceipt({
        hash,
      });

      await loadState(account);

      setMessage(
        `${label} → Universal Router approval confirmed.`,
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Permit2 approval failed.",
      );
    } finally {
      setApprovalLoading(false);
    }
  }

  async function getQuote() {
    if (!amount || Number(amount) <= 0) {
      setQuote("—");
      setQuoteRaw(0n);
      return;
    }

    try {
      setError("");
      setQuoteLoading(true);

      if (side === "buy") {
        const result =
          await quoteWethToApxs(
            amount,
          );

        setQuote(
          result.amountOutFormatted,
        );

        setQuoteRaw(
          result.amountOut,
        );
      } else {
        const result =
          await quoteApxsToWeth(
            amount,
          );

        setQuote(
          result.amountOutFormatted,
        );

        setQuoteRaw(
          result.amountOut,
        );
      }
    } catch (err) {
      console.error(err);

      setQuote("—");
      setQuoteRaw(0n);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to get swap quote.",
      );
    } finally {
      setQuoteLoading(false);
    }
  }

  async function executeSwap() {
    if (!address) {
      setError(
        "Connect MetaMask first.",
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError(
        "Enter a valid swap amount.",
      );
      return;
    }

    if (quoteRaw <= 0n) {
      setError(
        "Get a quote before swapping.",
      );
      return;
    }

    try {
      setError("");
      setMessage("");
      setTxHash("");
      setSwapLoading(true);

      const {
        walletClient,
        account,
      } = await getWallet();

      const tokenIn =
        side === "buy"
          ? WETH_ADDRESS
          : APXS_ADDRESS;

      const tokenInDecimals =
        side === "buy"
          ? 18
          : 8;

      const amountIn =
        parseUnits(
          amount,
          tokenInDecimals,
        );

      const minimumOutput =
        calculateMinimumOutput(
          quoteRaw,
          100n,
        );

      const deadline =
        BigInt(
          Math.floor(
            Date.now() / 1000,
          ) +
            10 * 60,
        );

      const swap =
        side === "buy"
          ? buildWethToApxsSwap(
              amountIn,
              minimumOutput,
              account,
              deadline,
            )
          : buildApxsToWethSwap(
              amountIn,
              minimumOutput,
              account,
              deadline,
            );

      setMessage(
        "Swap transaction submitted. Confirm it in MetaMask...",
      );

      const hash =
        await walletClient.sendTransaction({
          account,
          to: swap.router,
          data: swap.data,
          value: 0n,
          chain: arbitrumSepolia,
        });

      setTxHash(hash);

      setMessage(
        "Swap submitted. Waiting for confirmation...",
      );

      await client.waitForTransactionReceipt({
        hash,
      });

      await loadState(account);

      setAmount("");
      setQuote("—");
      setQuoteRaw(0n);

      setMessage(
        side === "buy"
          ? "✓ WETH → APXS swap confirmed."
          : "✓ APXS → WETH swap confirmed.",
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Swap failed.",
      );
    } finally {
      setSwapLoading(false);
    }
  }

  const now =
    BigInt(
      Math.floor(
        Date.now() / 1000,
      ),
    );

  const wethTokenReady =
    wethTokenAllowance > 0n;

  const apxsTokenReady =
    apxsTokenAllowance > 0n;

  const wethRouterReady =
    wethPermitAllowance > 0n &&
    BigInt(wethPermitExpiration) > now;

  const apxsRouterReady =
    apxsPermitAllowance > 0n &&
    BigInt(apxsPermitExpiration) > now;

  const buyReady =
    wethTokenReady &&
    wethRouterReady;

  const sellReady =
    apxsTokenReady &&
    apxsRouterReady;

  const currentReady =
    side === "buy"
      ? buyReady
      : sellReady;

  const currentTokenApproved =
    side === "buy"
      ? wethTokenReady
      : apxsTokenReady;

  const currentRouterApproved =
    side === "buy"
      ? wethRouterReady
      : apxsRouterReady;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <div className="mb-6">
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          APXS Wallet
        </p>

        <h3 className="mt-2 text-xl font-semibold text-white">
          Arbitrum Sepolia APXS / WETH
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          Wallet, approvals and live APXS swap
        </p>
      </div>

      {!address ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full rounded-xl bg-[#7B5CFA] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Connecting..."
            : "Connect MetaMask"}
        </button>
      ) : (
        <div className="space-y-4">

          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
            <p className="text-xs text-zinc-500">
              Connected wallet
            </p>

            <p className="mt-2 font-mono text-sm text-zinc-300">
              {shortAddress(address)}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
            <p className="text-xs text-zinc-500">
              Network
            </p>

            <p className="mt-2 text-sm font-medium text-emerald-300">
              ✓ Arbitrum Sepolia
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
              <p className="text-xs text-zinc-500">
                APXS Balance
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                {apxsBalance} APXS
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
              <p className="text-xs text-zinc-500">
                WETH Balance
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                {wethBalance} WETH
              </p>
            </div>

          </div>

          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">

            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Approval Pipeline
              </p>

              <span className="text-[10px] text-zinc-600">
                Permit2
              </span>
            </div>

            <div className="mt-4 space-y-3">

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-zinc-300">
                  WETH → Permit2
                </span>

                <span
                  className={
                    wethTokenReady
                      ? "text-xs text-emerald-300"
                      : "text-xs text-red-300"
                  }
                >
                  {wethTokenReady
                    ? "✓ Approved"
                    : "✕ Required"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-zinc-300">
                  APXS → Permit2
                </span>

                <span
                  className={
                    apxsTokenReady
                      ? "text-xs text-emerald-300"
                      : "text-xs text-red-300"
                  }
                >
                  {apxsTokenReady
                    ? "✓ Approved"
                    : "✕ Required"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-zinc-300">
                  WETH Permit2 → Router
                </span>

                <span
                  className={
                    wethRouterReady
                      ? "text-xs text-emerald-300"
                      : "text-xs text-red-300"
                  }
                >
                  {wethRouterReady
                    ? "✓ Ready"
                    : "✕ Required"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-zinc-300">
                  APXS Permit2 → Router
                </span>

                <span
                  className={
                    apxsRouterReady
                      ? "text-xs text-emerald-300"
                      : "text-xs text-red-300"
                  }
                >
                  {apxsRouterReady
                    ? "✓ Ready"
                    : "✕ Required"}
                </span>
              </div>

            </div>
          </div>

          {!wethTokenReady && (
            <button
              onClick={() =>
                approveTokenForPermit2(
                  WETH_ADDRESS,
                  "WETH",
                )
              }
              disabled={approvalLoading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09] disabled:opacity-60"
            >
              {approvalLoading
                ? "Waiting for MetaMask..."
                : "Approve WETH for Permit2"}
            </button>
          )}

          {!apxsTokenReady && (
            <button
              onClick={() =>
                approveTokenForPermit2(
                  APXS_ADDRESS,
                  "APXS",
                )
              }
              disabled={approvalLoading}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09] disabled:opacity-60"
            >
              {approvalLoading
                ? "Waiting for MetaMask..."
                : "Approve APXS for Permit2"}
            </button>
          )}

          {wethTokenReady &&
            !wethRouterReady && (
              <button
                onClick={() =>
                  approvePermit2ForRouter(
                    WETH_ADDRESS,
                    "WETH",
                  )
                }
                disabled={approvalLoading}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09] disabled:opacity-60"
              >
                {approvalLoading
                  ? "Waiting for MetaMask..."
                  : "Approve WETH Permit2 for Router"}
              </button>
            )}

          {apxsTokenReady &&
            !apxsRouterReady && (
              <button
                onClick={() =>
                  approvePermit2ForRouter(
                    APXS_ADDRESS,
                    "APXS",
                  )
                }
                disabled={approvalLoading}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09] disabled:opacity-60"
              >
                {approvalLoading
                  ? "Waiting for MetaMask..."
                  : "Approve APXS Permit2 for Router"}
              </button>
            )}

          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">

            <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/30 p-1">

              <button
                onClick={() => {
                  setSide("buy");
                  setAmount("");
                  setQuote("—");
                  setQuoteRaw(0n);
                  setError("");
                }}
                className={
                  side === "buy"
                    ? "rounded-lg bg-[#7B5CFA] py-2.5 text-sm font-semibold text-white"
                    : "rounded-lg py-2.5 text-sm text-zinc-500 hover:text-white"
                }
              >
                Buy APXS
              </button>

              <button
                onClick={() => {
                  setSide("sell");
                  setAmount("");
                  setQuote("—");
                  setQuoteRaw(0n);
                  setError("");
                }}
                className={
                  side === "sell"
                    ? "rounded-lg bg-[#7B5CFA] py-2.5 text-sm font-semibold text-white"
                    : "rounded-lg py-2.5 text-sm text-zinc-500 hover:text-white"
                }
              >
                Sell APXS
              </button>

            </div>

            <div className="mt-5">

              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-500">
                  {side === "buy"
                    ? "WETH INPUT"
                    : "APXS INPUT"}
                </label>

                <span className="text-xs text-zinc-600">
                  Balance:{" "}
                  {side === "buy"
                    ? wethBalance
                    : apxsBalance}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">

                <input
                  value={amount}
                  onChange={(event) => {
                    setAmount(
                      event.target.value,
                    );
                    setQuote("—");
                    setQuoteRaw(0n);
                    setError("");
                  }}
                  placeholder="0.0"
                  inputMode="decimal"
                  className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-zinc-700"
                />

                <span className="text-sm font-semibold text-zinc-300">
                  {side === "buy"
                    ? "WETH"
                    : "APXS"}
                </span>

              </div>

            </div>

            <button
              onClick={getQuote}
              disabled={
                quoteLoading ||
                !amount ||
                Number(amount) <= 0
              }
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {quoteLoading
                ? "Getting Quote..."
                : "Get Quote"}
            </button>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-black/20 p-4">

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Estimated output
                </span>

                <span className="text-xs text-zinc-600">
                  1% max slippage
                </span>
              </div>

              <p className="mt-2 text-2xl font-semibold text-white">
                {quote}
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                {side === "buy"
                  ? "APXS"
                  : "WETH"}
              </p>

            </div>

            {!currentTokenApproved && (
              <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                <p className="text-sm text-amber-300">
                  {side === "buy"
                    ? "Approve WETH for Permit2 before buying."
                    : "Approve APXS for Permit2 before selling."}
                </p>
              </div>
            )}

            {currentTokenApproved &&
              !currentRouterApproved && (
                <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                  <p className="text-sm text-amber-300">
                    {side === "buy"
                      ? "Approve WETH Permit2 allowance for the Universal Router."
                      : "Approve APXS Permit2 allowance for the Universal Router."}
                  </p>
                </div>
              )}

            <button
              onClick={executeSwap}
              disabled={
                swapLoading ||
                approvalLoading ||
                !currentReady ||
                quoteRaw <= 0n ||
                !amount
              }
              className="mt-4 w-full rounded-xl bg-[#7B5CFA] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {swapLoading
                ? "Swapping..."
                : side === "buy"
                  ? "Buy APXS"
                  : "Sell APXS"}
            </button>

          </div>

          <button
            onClick={connectWallet}
            disabled={
              loading ||
              approvalLoading ||
              swapLoading
            }
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:opacity-50"
          >
            {loading
              ? "Refreshing..."
              : "Refresh Wallet State"}
          </button>

          {txHash && (
            <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">

              <p className="text-xs text-zinc-500">
                Latest transaction
              </p>

              <p className="mt-2 break-all font-mono text-xs text-zinc-400">
                {txHash}
              </p>

            </div>
          )}

        </div>
      )}

      {message && (
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <p className="text-sm text-emerald-300">
            {message}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4">
          <p className="text-sm text-red-300">
            {error}
          </p>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/10 p-4">

        <p className="text-[11px] uppercase tracking-wider text-zinc-500">
          Swap Contracts
        </p>

        <div className="mt-3 space-y-2 font-mono text-[10px] text-zinc-600">

          <p>
            APXS: {APXS_ADDRESS}
          </p>

          <p>
            WETH: {WETH_ADDRESS}
          </p>

          <p>
            Permit2: {PERMIT2_ADDRESS}
          </p>

          <p>
            Universal Router:{" "}
            {UNIVERSAL_ROUTER_ADDRESS}
          </p>

        </div>

      </div>

    </div>
  );
}
