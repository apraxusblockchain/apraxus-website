"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatUnits,
  maxUint256,
  type Address,
} from "viem";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useWalletClient,
} from "wagmi";
import { arbitrumSepolia, bscTestnet } from "wagmi/chains";

import {
  APXS_ABI,
  APXS_CONTRACT_ADDRESS,
  APXS_CHAINS,
} from "@/lib/web3/apxs";
import {
  quoteWethToApxs,
  quoteApxsToWeth,
  buildWethToApxsSwap,
  buildApxsToWethSwap,
} from "@/lib/web3/apxs-swap";

const APXS_ERC20_ABI = [
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

const PUBLIC_RPC = "https://sepolia-rollup.arbitrum.io/rpc";

const WETH_CONTRACT =
  "0x980B62Da83eFf3D4576C647993b0c1D7faf17c73" as Address;

const PERMIT2_CONTRACT =
  "0x000000000022D473030F116dDEE9F6B43aC78BA3" as Address;

const UNIVERSAL_ROUTER =
  "0xefd1d4bd4cf1e86da286bb4cb1b8bced9c10ba47" as Address;

const WETH_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

const PERMIT2_ABI = [
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "token", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [
      { name: "amount", type: "uint160" },
      { name: "expiration", type: "uint48" },
      { name: "nonce", type: "uint48" },
    ],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "spender", type: "address" },
      { name: "amount", type: "uint160" },
      { name: "expiration", type: "uint48" },
    ],
    outputs: [],
  },
] as const;

export default function APXSWallet() {
  const {
    address,
    isConnected,
    chainId,
    connector,
  } = useAccount();

  const {
    connectors,
    connect,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();

  const { disconnect } = useDisconnect();

  const {
    switchChain,
    isPending: isSwitchingChain,
  } = useSwitchChain();

  const {
    data: walletClient,
  } = useWalletClient();

  const [apxsBalance, setApxsBalance] = useState<string>("—");
  const [wethBalance, setWethBalance] = useState<string>("—");
  const [nativeBalance, setNativeBalance] = useState<string>("—");

  const [wethPermit2Approved, setWethPermit2Approved] =
    useState(false);

  const [apxsPermit2Approved, setApxsPermit2Approved] =
    useState(false);

  const [wethRouterApproved, setWethRouterApproved] =
    useState(false);

  const [apxsRouterApproved, setApxsRouterApproved] =
    useState(false);

  const [permit2Expiration, setPermit2Expiration] =
    useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [approvalLoading, setApprovalLoading] =
    useState<string | null>(null);

  const [quoteLoading, setQuoteLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const [swapMode, setSwapMode] =
    useState<"buy" | "sell">("buy");

  const [swapAmount, setSwapAmount] = useState("");
  const [swapQuote, setSwapQuote] = useState<string | null>(null);
  const [swapQuoteRaw, setSwapQuoteRaw] =
    useState<bigint | null>(null);

  const [showWallets, setShowWallets] = useState(true);

  const supportedChain =
    chainId === arbitrumSepolia.id ||
    chainId === bscTestnet.id;

  const activeApxsAddress =
    chainId === APXS_CHAINS.bnbTestnet.chain.id
      ? APXS_CHAINS.bnbTestnet.address
      : APXS_CONTRACT_ADDRESS;

  const activeNetworkName =
    chainId === bscTestnet.id
      ? "BNB Testnet"
      : "Arbitrum Sepolia";

  const detectedConnectors = useMemo(() => {
    const seen = new Set<string>();

    return connectors.filter((item) => {
      const key = `${item.id}-${item.name}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }, [connectors]);

  const getPublicClient = async () => {
    const { createPublicClient, http } = await import("viem");

    if (chainId === bscTestnet.id) {
      return createPublicClient({
        chain: bscTestnet,
        transport: http(
          "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
        ),
      });
    }

    return createPublicClient({
      chain: arbitrumSepolia,
      transport: http(PUBLIC_RPC),
    });
  };

  const waitForReceipt = async (hash: `0x${string}`) => {
    const publicClient = await getPublicClient();

    return publicClient.waitForTransactionReceipt({
      hash,
    });
  };

  const loadBalances = async (walletAddress: Address) => {
    try {
      setLoading(true);
      setError(null);

      const publicClient = await getPublicClient();

      const nativeRaw = await publicClient.getBalance({
        address: walletAddress,
      });

      setNativeBalance(
        `${formatUnits(nativeRaw, 18)} ${
          chainId === bscTestnet.id ? "BNB" : "ETH"
        }`
      );

      if (chainId === bscTestnet.id) {
        const apxsRaw = await publicClient.readContract({
          address: activeApxsAddress,
          abi: APXS_ABI,
          functionName: "balanceOf",
          args: [walletAddress],
        });

        setApxsBalance(`${formatUnits(apxsRaw, 8)} APXS`);
        setWethBalance("—");
        setWethPermit2Approved(false);
        setApxsPermit2Approved(false);
        setWethRouterApproved(false);
        setApxsRouterApproved(false);
        setPermit2Expiration(0);

        return;
      }

      const [
        apxsRaw,
        wethRaw,
        wethPermit2Raw,
        apxsPermit2Raw,
        wethRouterRaw,
        apxsRouterRaw,
        permit2Weth,
        permit2Apxs,
      ] = await Promise.all([
        publicClient.readContract({
          address: activeApxsAddress,
          abi: APXS_ABI,
          functionName: "balanceOf",
          args: [walletAddress],
        }),

        publicClient.readContract({
          address: WETH_CONTRACT,
          abi: WETH_ABI,
          functionName: "balanceOf",
          args: [walletAddress],
        }),

        publicClient.readContract({
          address: WETH_CONTRACT,
          abi: WETH_ABI,
          functionName: "allowance",
          args: [
            walletAddress,
            PERMIT2_CONTRACT,
          ],
        }),

        publicClient.readContract({
          address: APXS_CONTRACT_ADDRESS,
          abi: APXS_ERC20_ABI,
          functionName: "allowance",
          args: [
            walletAddress,
            PERMIT2_CONTRACT,
          ],
        }),

        publicClient.readContract({
          address: WETH_CONTRACT,
          abi: WETH_ABI,
          functionName: "allowance",
          args: [
            walletAddress,
            UNIVERSAL_ROUTER,
          ],
        }),

        publicClient.readContract({
          address: APXS_CONTRACT_ADDRESS,
          abi: APXS_ERC20_ABI,
          functionName: "allowance",
          args: [
            walletAddress,
            UNIVERSAL_ROUTER,
          ],
        }),

        publicClient.readContract({
          address: PERMIT2_CONTRACT,
          abi: PERMIT2_ABI,
          functionName: "allowance",
          args: [
            walletAddress,
            WETH_CONTRACT,
            UNIVERSAL_ROUTER,
          ],
        }),

        publicClient.readContract({
          address: PERMIT2_CONTRACT,
          abi: PERMIT2_ABI,
          functionName: "allowance",
          args: [
            walletAddress,
            APXS_CONTRACT_ADDRESS,
            UNIVERSAL_ROUTER,
          ],
        }),
      ]);

      setApxsBalance(
        `${formatUnits(apxsRaw, 8)} APXS`
      );

      setWethBalance(
        `${formatUnits(wethRaw, 18)} WETH`
      );

      setWethPermit2Approved(
        wethPermit2Raw > 0n
      );

      setApxsPermit2Approved(
        apxsPermit2Raw > 0n
      );

      setWethRouterApproved(
        permit2Weth[0] > 0n &&
        Number(permit2Weth[1]) > Math.floor(Date.now() / 1000)
      );

      setApxsRouterApproved(
        permit2Apxs[0] > 0n &&
        Number(permit2Apxs[1]) > Math.floor(Date.now() / 1000)
      );

      setPermit2Expiration(
        Math.min(
          Number(permit2Weth[1]),
          Number(permit2Apxs[1])
        )
      );
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Failed to load wallet balances.";

      setError(text);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isConnected || !address) {
      setApxsBalance("—");
      setWethBalance("—");
      setWethPermit2Approved(false);
      setApxsPermit2Approved(false);
      setWethRouterApproved(false);
      setApxsRouterApproved(false);
      return;
    }

    if (!supportedChain) {
      setError(
        "Please switch your wallet to Arbitrum Sepolia."
      );
      return;
    }

    void loadBalances(address);
  }, [isConnected, address, chainId, supportedChain]);

  const handleConnect = async (
    connectorToUse?: (typeof connectors)[number]
  ) => {
    try {
      setError(null);
      setMessage(null);

      if (!connectorToUse) {
        setShowWallets(true);
        return;
      }

      await connect({
        connector: connectorToUse,
      });

      setShowWallets(false);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Wallet connection failed.";

      setError(text);
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      setError(null);
      await switchChain({
        chainId: arbitrumSepolia.id,
      });
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Network switch failed.";

      setError(text);
    }
  };

  const approveWethForPermit2 = async () => {
    if (!walletClient || !address) return;

    try {
      setApprovalLoading("weth-permit2");
      setError(null);
      setMessage(null);

      const hash = await walletClient.writeContract({
        address: WETH_CONTRACT,
        abi: WETH_ABI,
        functionName: "approve",
        args: [
          PERMIT2_CONTRACT,
          maxUint256,
        ],
      });

      setTxHash(hash);

      await waitForReceipt(hash);

      setMessage(
        "WETH → Permit2 approval confirmed."
      );

      await loadBalances(address);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "WETH approval failed.";

      setError(text);
    } finally {
      setApprovalLoading(null);
    }
  };

  const approveApxsForPermit2 = async () => {
    if (!walletClient || !address) return;

    try {
      setApprovalLoading("apxs-permit2");
      setError(null);
      setMessage(null);

      const hash = await walletClient.writeContract({
        address: APXS_CONTRACT_ADDRESS,
        abi: APXS_ABI,
        functionName: "approve",
        args: [
          PERMIT2_CONTRACT,
          maxUint256,
        ],
      });

      setTxHash(hash);

      await waitForReceipt(hash);

      setMessage(
        "APXS → Permit2 approval confirmed."
      );

      await loadBalances(address);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "APXS approval failed.";

      setError(text);
    } finally {
      setApprovalLoading(null);
    }
  };

  const approveWethPermit2ForRouter = async () => {
    if (!walletClient || !address) return;

    try {
      setApprovalLoading("weth-router");
      setError(null);
      setMessage(null);

      const now = Math.floor(Date.now() / 1000);
      const expiration = now + 60 * 60 * 24 * 30;

      const publicClient = await getPublicClient();
      const block = await publicClient.getBlock();
      const baseFeePerGas = block.baseFeePerGas ?? 0n;
      const maxPriorityFeePerGas = 1_000_000n;
      const maxFeePerGas =
        baseFeePerGas * 2n + maxPriorityFeePerGas;

      const estimatedGas = await publicClient.estimateContractGas({
        account: address,
        address: PERMIT2_CONTRACT,
        abi: PERMIT2_ABI,
        functionName: "approve",
        args: [
          WETH_CONTRACT,
          UNIVERSAL_ROUTER,
          (2n ** 160n) - 1n,
          expiration,
        ],
      });

      const gasLimit = estimatedGas * 130n / 100n;

      console.log("WETH Permit2 approval estimated gas:", estimatedGas.toString());
      console.log("WETH Permit2 approval gas limit:", gasLimit.toString());

      const hash = await walletClient.writeContract({
        account: address,
        address: PERMIT2_CONTRACT,
        abi: PERMIT2_ABI,
        functionName: "approve",
        maxFeePerGas,
        maxPriorityFeePerGas,
        gas: gasLimit,
        args: [
          WETH_CONTRACT,
          UNIVERSAL_ROUTER,
          (2n ** 160n) - 1n,
          expiration,
        ],
      });

      setTxHash(hash);

      const receipt = await waitForReceipt(hash);

      if (receipt.status !== "success") {
        throw new Error("WETH Permit2 router approval transaction reverted.");
      }

      setMessage(
        "WETH Permit2 → Universal Router approval confirmed."
      );

      await loadBalances(address);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "WETH Permit2 router approval failed.";

      setError(text);
    } finally {
      setApprovalLoading(null);
    }
  };

  const approveApxsPermit2ForRouter = async () => {
    if (!walletClient || !address) return;

    try {
      setApprovalLoading("apxs-router");
      setError(null);
      setMessage(null);

      const now = Math.floor(Date.now() / 1000);
      const expiration = now + 60 * 60 * 24 * 30;

      const publicClient = await getPublicClient();
      const block = await publicClient.getBlock();
      const baseFeePerGas = block.baseFeePerGas ?? 0n;
      const maxPriorityFeePerGas = 1_000_000n;
      const maxFeePerGas =
        baseFeePerGas * 2n + maxPriorityFeePerGas;

      const estimatedGas = await publicClient.estimateContractGas({
        account: address,
        address: PERMIT2_CONTRACT,
        abi: PERMIT2_ABI,
        functionName: "approve",
        args: [
          APXS_CONTRACT_ADDRESS,
          UNIVERSAL_ROUTER,
          (2n ** 160n) - 1n,
          expiration,
        ],
      });

      const gasLimit = estimatedGas * 130n / 100n;

      console.log("APXS Permit2 approval estimated gas:", estimatedGas.toString());
      console.log("APXS Permit2 approval gas limit:", gasLimit.toString());

      const hash = await walletClient.writeContract({
        account: address,
        address: PERMIT2_CONTRACT,
        abi: PERMIT2_ABI,
        functionName: "approve",
        maxFeePerGas,
        maxPriorityFeePerGas,
        gas: gasLimit,
        args: [
          APXS_CONTRACT_ADDRESS,
          UNIVERSAL_ROUTER,
          (2n ** 160n) - 1n,
          expiration,
        ],
      });

      setTxHash(hash);

      const receipt = await waitForReceipt(hash);

      if (receipt.status !== "success") {
        throw new Error("APXS Permit2 router approval transaction reverted.");
      }

      setMessage(
        "APXS Permit2 → Universal Router approval confirmed."
      );

      await loadBalances(address);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "APXS Permit2 router approval failed.";

      setError(text);
    } finally {
      setApprovalLoading(null);
    }
  };

  const getSwapQuote = async () => {
    try {
      setQuoteLoading(true);
      setError(null);
      setMessage(null);
      setSwapQuote(null);
      setSwapQuoteRaw(null);

      if (!swapAmount || Number(swapAmount) <= 0) {
        throw new Error(
          "Enter a valid swap amount first."
        );
      }

      if (!address) {
        throw new Error(
          "Connect a wallet before requesting a quote."
        );
      }

      if (!supportedChain) {
        throw new Error(
          "Switch to Arbitrum Sepolia first."
        );
      }

      if (swapMode === "buy") {
        const result = await quoteWethToApxs(
          swapAmount
        );

        setSwapQuoteRaw(result.amountOut);
        setSwapQuote(
          `${formatUnits(
            result.amountOut,
            8
          )} APXS`
        );
      } else {
        const result = await quoteApxsToWeth(
          swapAmount
        );

        setSwapQuoteRaw(result.amountOut);
        setSwapQuote(
          `${formatUnits(
            result.amountOut,
            18
          )} WETH`
        );
      }

      setMessage(
        "Quote generated successfully. No swap transaction was sent."
      );
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Unable to generate swap quote.";

      setError(text);
    } finally {
      setQuoteLoading(false);
    }
  };

  const executeSwap = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      setTxHash(null);

      if (!walletClient || !address) {
        throw new Error(
          "Connect a wallet before swapping."
        );
      }

      if (!supportedChain) {
        throw new Error(
          "Switch to Arbitrum Sepolia first."
        );
      }

      if (!swapAmount || Number(swapAmount) <= 0) {
        throw new Error(
          "Enter a valid swap amount first."
        );
      }

      if (
        swapMode === "buy" &&
        Number(swapAmount) > 0.0001
      ) {
        throw new Error(
          "For the initial test, Buy APXS is limited to 0.0001 WETH."
        );
      }

      const freshQuote =
        swapMode === "buy"
          ? await quoteWethToApxs(swapAmount)
          : await quoteApxsToWeth(swapAmount);

      const slippageBps = 100n;
      const amountOutMinimum =
        freshQuote.amountOut *
        (10_000n - slippageBps) /
        10_000n;

      const deadline =
        BigInt(
          Math.floor(Date.now() / 1000) + 20 * 60
        );

      const calldata =
        swapMode === "buy"
          ? buildWethToApxsSwap(
              freshQuote.amountIn,
              amountOutMinimum,
              address,
              deadline,
            )
          : buildApxsToWethSwap(
              freshQuote.amountIn,
              amountOutMinimum,
              address,
              deadline,
            );

      const publicClient =
        await getPublicClient();

      const estimatedGas = await publicClient.estimateGas({
        account: address,
        to: calldata.router,
        data: calldata.data,
        value: 0n,
      });

      const gasLimit =
        estimatedGas * 130n / 100n;

      console.log(
        "APXS SWAP estimated gas:",
        estimatedGas.toString()
      );

      console.log(
        "APXS SWAP gas limit:",
        gasLimit.toString()
      );

      const fees =
        await publicClient.estimateFeesPerGas();

      const hash =
        await walletClient.sendTransaction({
          account: address,
          chain: arbitrumSepolia,
          to: calldata.router,
          data: calldata.data,
          value: 0n,
          gas: gasLimit,
          maxFeePerGas: fees.maxFeePerGas,
          maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
        });

      setTxHash(hash);
      setMessage(
        "Swap transaction submitted. Waiting for confirmation..."
      );

      const receipt =
        await publicClient.waitForTransactionReceipt({
          hash,
        });

      if (receipt.status !== "success") {
        throw new Error(
          "APXS swap transaction reverted."
        );
      }

      setMessage(
        swapMode === "buy"
          ? "APXS purchase confirmed."
          : "APXS sale confirmed."
      );

      await loadBalances(address);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Unable to execute swap.";

      setError(text);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setMessage(null);
    setError(null);
    setTxHash(null);
    setSwapQuote(null);
    setSwapQuoteRaw(null);
  };

  return (
    <section className="w-full rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8 shadow-[0_0_80px_rgba(107,53,213,0.08)]">
      <div className="mb-7">
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-violet-400">
          APXS Wallet
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">
          {chainId === bscTestnet.id
            ? "BNB Testnet APXS"
            : "Arbitrum Sepolia APXS / WETH"}
        </h2>

        <p className="mt-2 text-sm text-white/45">
          Multi-wallet EVM connection, approvals and APXS
          swap quoting.
        </p>
      </div>

      {!isConnected ? (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowWallets((value) => !value)}
            disabled={isConnecting}
            className="w-full rounded-2xl bg-violet-600 px-5 py-4 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isConnecting
              ? "Connecting..."
              : showWallets
                ? "Choose EVM Wallet"
                : "Connect EVM Wallet"}
          </button>

          {showWallets && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 text-xs uppercase tracking-[0.18em] text-white/40">
                Detected Wallets
              </div>

              <div className="grid gap-2">
                {detectedConnectors.length === 0 ? (
                  <div className="rounded-xl border border-white/10 p-4 text-sm text-white/50">
                    No browser EVM wallet detected.
                  </div>
                ) : (
                  detectedConnectors.map(
                    (walletConnector) => (
                      <button
                        key={walletConnector.id}
                        type="button"
                        onClick={() =>
                          handleConnect(
                            walletConnector
                          )
                        }
                        disabled={isConnecting}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:border-violet-400/40 hover:bg-white/[0.06] disabled:opacity-50"
                      >
                        <span className="text-sm font-medium">
                          {walletConnector.name}
                        </span>

                        <span className="text-xs text-violet-300">
                          Connect →
                        </span>
                      </button>
                    )
                  )
                )}
              </div>
            </div>
          )}

          {connectError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
              {connectError.message}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
              <div className="mb-1 text-xs uppercase tracking-[0.15em] text-white/35">
                Connected wallet
              </div>

              <div className="font-mono text-sm text-white/80">
                {address
                  ? `${address.slice(
                      0,
                      6
                    )}...${address.slice(-4)}`
                  : "Unknown"}
              </div>

              <div className="mt-1 text-xs text-white/35">
                {connector?.name ?? "EVM Wallet"}
              </div>
            </div>

            <button
              type="button"
              onClick={disconnectWallet}
              className="rounded-xl border border-white/10 px-4 py-3 text-xs font-medium text-white/60 transition hover:border-white/20 hover:text-white"
            >
              Disconnect
            </button>
          </div>

          {!supportedChain ? (
            <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
              <div className="mb-2 text-sm font-semibold text-amber-200">
                Unsupported network
              </div>

              <p className="mb-4 text-sm text-white/50">
                APXS testing is currently configured for
                Arbitrum Sepolia.
              </p>

              <button
                type="button"
                onClick={handleSwitchNetwork}
                disabled={isSwitchingChain}
                className="rounded-xl bg-amber-500/90 px-4 py-3 text-sm font-semibold text-black disabled:opacity-50"
              >
                {isSwitchingChain
                  ? "Switching..."
                  : "Switch to Arbitrum Sepolia"}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                  Network
                </div>

                <div className="mt-2 text-sm font-medium text-emerald-300">
                  ✓ {activeNetworkName}
                </div>
              </div>

              <div className="mb-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                    APXS Balance
                  </div>

                  <div className="mt-3 text-lg font-medium text-white/90">
                    {loading
                      ? "Loading..."
                      : apxsBalance}
                  </div>
                </div>

                {chainId !== bscTestnet.id && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                      WETH Balance
                    </div>

                    <div className="mt-3 text-lg font-medium text-white/90">
                      {loading
                        ? "Loading..."
                        : wethBalance}
                    </div>
                  </div>
                )}
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                    Gas Balance
                  </div>

                  <div className="mt-3 text-lg font-medium text-white/90">
                    {loading ? "Loading..." : nativeBalance}
                  </div>
                </div>
              </div>

              <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                      Approval Pipeline
                    </div>

                    {permit2Expiration > 0 && (
                      <div className="mt-1 text-xs text-white/25">
                        Permit2 expiration:{" "}
                        {new Date(
                          permit2Expiration * 1000
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      address &&
                      void loadBalances(address)
                    }
                    className="text-xs text-violet-300 hover:text-violet-200"
                  >
                    Refresh
                  </button>
                </div>

                <div className="space-y-3">
                  <ApprovalRow
                    label="WETH → Permit2"
                    approved={wethPermit2Approved}
                    loading={
                      approvalLoading ===
                      "weth-permit2"
                    }
                    onApprove={
                      approveWethForPermit2
                    }
                  />

                  <ApprovalRow
                    label="APXS → Permit2"
                    approved={apxsPermit2Approved}
                    loading={
                      approvalLoading ===
                      "apxs-permit2"
                    }
                    onApprove={
                      approveApxsForPermit2
                    }
                  />

                  <ApprovalRow
                    label="WETH Permit2 → Router"
                    approved={wethRouterApproved}
                    loading={
                      approvalLoading ===
                      "weth-router"
                    }
                    onApprove={
                      approveWethPermit2ForRouter
                    }
                  />

                  <ApprovalRow
                    label="APXS Permit2 → Router"
                    approved={apxsRouterApproved}
                    loading={
                      approvalLoading ===
                      "apxs-router"
                    }
                    onApprove={
                      approveApxsPermit2ForRouter
                    }
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                    APXS Swap Quote
                  </div>

                  <div className="mt-1 text-xs text-white/30">
                    Arbitrum Sepolia • Quote-only mode
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSwapMode("buy");
                      setSwapQuote(null);
                    }}
                    className={`rounded-lg px-4 py-2.5 text-sm transition ${
                      swapMode === "buy"
                        ? "bg-violet-600 text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    WETH → APXS
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSwapMode("sell");
                      setSwapQuote(null);
                    }}
                    className={`rounded-lg px-4 py-2.5 text-sm transition ${
                      swapMode === "sell"
                        ? "bg-violet-600 text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    APXS → WETH
                  </button>
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    value={swapAmount}
                    onChange={(event) =>
                      setSwapAmount(
                        event.target.value
                      )
                    }
                    inputMode="decimal"
                    placeholder={
                      swapMode === "buy"
                        ? "WETH amount"
                        : "APXS amount"
                    }
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/50"
                  />

                  <button
                    type="button"
                    onClick={getSwapQuote}
                    disabled={quoteLoading}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {quoteLoading
                      ? "Quoting..."
                      : "Get Quote"}
                  </button>
                </div>

                {swapQuote && (
                  <div className="mt-4 rounded-xl border border-violet-400/20 bg-violet-400/5 p-4">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                      Estimated Output
                    </div>

                    <div className="mt-2 text-lg font-semibold text-violet-200">
                      {swapQuote}
                    </div>

                    {swapQuoteRaw !== null && (
                      <div className="mt-1 text-xs text-white/25">
                        Raw amount:{" "}
                        {swapQuoteRaw.toString()}
                      </div>
                    )}
                  </div>
                )}

                {swapQuote && (
                  <button
                    type="button"
                    onClick={executeSwap}
                    disabled={loading}
                    className="mt-4 w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "Swapping..."
                      : swapMode === "buy"
                        ? "Buy APXS"
                        : "Sell APXS"}
                  </button>
                )}

                <p className="mt-4 text-xs leading-5 text-white/30">
                  Swaps execute through Uniswap v4 on
                  Arbitrum Sepolia. Initial Buy APXS testing
                  is limited to 0.0001 WETH.
                </p>
              </div>
            </>
          )}
        </>
      )}

      {message && (
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-emerald-300">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {txHash && (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-[0.15em] text-white/30">
            Latest transaction
          </div>

          <div className="mt-2 break-all font-mono text-xs text-white/50">
            {txHash}
          </div>
        </div>
      )}

      <div className="mt-7 border-t border-white/10 pt-5">
        <div className="mb-3 text-xs uppercase tracking-[0.15em] text-white/30">
          Swap Contracts
        </div>

        <div className="space-y-2 font-mono text-[11px] leading-5 text-white/30">
          <div>
            APXS: {APXS_CONTRACT_ADDRESS}
          </div>
          <div>
            WETH: {WETH_CONTRACT}
          </div>
          <div>
            Permit2: {PERMIT2_CONTRACT}
          </div>
          <div>
            Universal Router: {UNIVERSAL_ROUTER}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApprovalRow({
  label,
  approved,
  loading,
  onApprove,
}: {
  label: string;
  approved: boolean;
  loading: boolean;
  onApprove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3 md:flex-row md:items-center md:justify-between">
      <span className="text-sm text-white/65">
        {label}
      </span>

      {approved ? (
        <span className="text-xs font-medium text-emerald-300">
          ✓ Approved
        </span>
      ) : (
        <button
          type="button"
          onClick={onApprove}
          disabled={loading}
          className="rounded-lg border border-violet-400/30 px-3 py-2 text-xs font-medium text-violet-200 transition hover:bg-violet-400/10 disabled:opacity-50"
        >
          {loading
            ? "Approving..."
            : "Approve"}
        </button>
      )}
    </div>
  );
}