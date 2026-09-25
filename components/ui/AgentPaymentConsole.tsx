"use client";

import { useMemo, useState } from "react";
import { useChainId, useSwitchChain } from "wagmi";
import {
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Lock,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import {
  createWalletClient,
  custom,
  formatUnits,
  isAddress,
  parseUnits,
  type Address,
} from "viem";

import { arbitrumSepolia, bscTestnet } from "viem/chains";

import {
  APXS_ABI,
  APXS_CHAINS,
  apxsPublicClient,
  bnbApxsPublicClient,
} from "@/lib/web3/apxs";
import {
  evaluatePaymentPolicy,
} from "@/lib/policy/engine";
import {
  executeApxsPayment,
} from "@/lib/payment/engine";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function AgentPaymentConsole() {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const activeNetworkName =
    chainId === bscTestnet.id
      ? "BNB Testnet"
      : "Arbitrum Sepolia";

  const [amount, setAmount] = useState("0.001");
  const [destination, setDestination] = useState("");

  const [checked, setChecked] = useState(false);
  const [executed, setExecuted] = useState(false);

  const [executing, setExecuting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<Address | null>(null);

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [receiptStatus, setReceiptStatus] = useState<
    "success" | "reverted" | null
  >(null);
  const [receiptBlockNumber, setReceiptBlockNumber] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("—");
  const [decimals, setDecimals] = useState<number | null>(null);

  const [error, setError] = useState("");

  const policy = useMemo(
    () =>
      evaluatePaymentPolicy({
        amount,
        destination,
      }),
    [amount, destination]
  );

  function checkPolicy() {
    setError("");
    setChecked(true);
    setExecuted(false);
    setTransactionHash("");
    setReceiptStatus(null);
    setReceiptBlockNumber("");
  }

  async function executePayment() {
    try {
      setError("");
      setExecuting(true);
      setExecuted(false);
      setTransactionHash("");
      setReceiptStatus(null);
      setReceiptBlockNumber("");

      if (!policy.allowed) {
        setError("Payment is blocked by policy.");
        return;
      }

      if (!window.ethereum) {
        setError("MetaMask is not installed.");
        return;
      }

      const destinationAddress =
        destination.trim() as Address;

      /*
       * Switch MetaMask to the network currently selected
       * in the Apraxus network selector.
       */
      const targetChainId =
        chainId === bscTestnet.id
          ? bscTestnet.id
          : arbitrumSepolia.id;

      if (chainId !== targetChainId) {
        await switchChainAsync({
          chainId: targetChainId,
        });
      }

      /*
       * Detect the active MetaMask network after switching.
       */
      const detectedChainId = await new Promise<number>((resolve) => {
        window.ethereum.request({
          method: "eth_chainId",
        }).then((value: string) => resolve(Number(value)))
         .catch(() => resolve(0));
      });

      const activeChain =
        detectedChainId === bscTestnet.id
          ? bscTestnet
          : arbitrumSepolia;

      const activeApxsAddress =
        detectedChainId === bscTestnet.id
          ? APXS_CHAINS.bnbTestnet.address
          : APXS_CHAINS.arbitrumSepolia.address;

      const activePublicClient =
        detectedChainId === bscTestnet.id
          ? bnbApxsPublicClient
          : apxsPublicClient;

      /*
       * Create MetaMask wallet client for the detected network.
       */
      const walletClient = createWalletClient({
        chain: activeChain,
        transport: custom(window.ethereum),
      });

      /*
       * Only allow the two supported APXS testnets.
       */
      const currentChainId =
        await walletClient.getChainId();

      if (
        currentChainId !== arbitrumSepolia.id &&
        currentChainId !== bscTestnet.id
      ) {
        setError(
          "Please switch MetaMask to Arbitrum Sepolia or BNB Testnet and try again."
        );
        return;
      }

      /*
       * Request the connected MetaMask account.
       */
      const [account] =
        await walletClient.requestAddresses();

      if (!account) {
        setError("No MetaMask account found.");
        return;
      }

      setWalletAddress(account);

      /*
       * Read token decimals and current APXS balance.
       */
      const [tokenDecimals, rawBalance] =
        await Promise.all([
          activePublicClient.readContract({
            address: activeApxsAddress,
            abi: APXS_ABI,
            functionName: "decimals",
          }),

          activePublicClient.readContract({
            address: activeApxsAddress,
            abi: APXS_ABI,
            functionName: "balanceOf",
            args: [account],
          }),
        ]);

      setDecimals(tokenDecimals);

      const formattedBalance = formatUnits(
        rawBalance,
        tokenDecimals
      );

      setTokenBalance(formattedBalance);

      /*
       * Convert human-readable APXS amount
       * into ERC-20 base units.
       */
      const transferAmount = parseUnits(
        amount,
        tokenDecimals
      );

      /*
       * Make sure the connected wallet actually
       * has enough APXS before opening MetaMask.
       */
      if (rawBalance < transferAmount) {
        setError(
          `Insufficient APXS balance. Available: ${formattedBalance} APXS.`
        );
        return;
      }

      /*
       * REAL ERC-20 TRANSFER
       *
       * This opens MetaMask.
       *
       * The user must manually confirm the transaction.
       */
      

const block = await activePublicClient.getBlock();

if (block.baseFeePerGas == null) {
  throw new Error('Unable to read current network base fee.');
}

const maxPriorityFeePerGas =
  activeChain.id === bscTestnet.id
    ? BigInt(100000000)
    : BigInt(1000000);
const maxFeePerGas =
  block.baseFeePerGas * BigInt(2) + maxPriorityFeePerGas;
const {
        transactionHash: hash,
        status,
        blockNumber,
      } = await executeApxsPayment({
          walletClient,
          publicClient: activePublicClient,
          account,
          tokenAddress: activeApxsAddress,
          destination: destination.trim() as Address,
          amount: transferAmount,
          chainId: activeChain.id,
          maxFeePerGas,
          maxPriorityFeePerGas,
        });

      setTransactionHash(hash);
      setReceiptStatus(status);
      setReceiptBlockNumber(blockNumber.toString());

      setExecuted(true);
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Transaction failed or was rejected."
        );
      }
    } finally {
      setExecuting(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-white/[0.08]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7B5CFA] mb-3">
              <Bot className="w-4 h-4" />
              LIVE PRODUCT DEMO
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              APXS Agent Payment Console
            </h2>

            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Test a policy-controlled payment flow where an AI
              agent can only spend within operator-defined
              boundaries.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {activeNetworkName}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Agent + Policy */}
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          <div className="flex items-center gap-2 text-sm font-semibold mb-5">
            <ShieldCheck className="w-4 h-4 text-[#7B5CFA]" />
            Agent Policy
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                Agent
              </div>

              <div className="mt-1 font-mono text-sm">
                Agent-001
              </div>

              <div className="mt-2 text-xs text-emerald-400">
                ● Active
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                Connected Wallet
              </div>

              <div className="mt-1 font-mono text-xs text-zinc-300 break-all">
                {walletAddress || "Connect via MetaMask when executing"}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <Clock3 className="w-4 h-4 text-[#38E8F8] mb-3" />

                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Daily limit
                </div>

                <div className="mt-1 font-mono text-lg">
                  100 APXS
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <Lock className="w-4 h-4 text-emerald-400 mb-3" />

                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Per transaction
                </div>

                <div className="mt-1 font-mono text-lg">
                  10 APXS
                </div>
              </div>
            </div>

            {tokenBalance !== "—" && (
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Available APXS
                </div>

                <div className="mt-1 font-mono text-lg">
                  {tokenBalance} APXS
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold mb-5">
            <CircleDollarSign className="w-4 h-4 text-[#7B5CFA]" />
            Payment Request
          </div>

          <div className="space-y-4">
            {/* Amount */}
            <div>
              <label className="block text-xs text-zinc-500 mb-2">
                Amount
              </label>

              <div className="flex items-center rounded-xl border border-white/[0.09] bg-black/20 overflow-hidden">
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setChecked(false);
                    setExecuted(false);
                    setError("");
                    setTransactionHash("");
                  }}
                  type="number"
                  min="0"
                  step="0.001"
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                />

                <span className="px-4 text-xs font-mono text-zinc-400">
                  APXS
                </span>
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs text-zinc-500 mb-2">
                Destination
              </label>

              <input
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setChecked(false);
                  setExecuted(false);
                  setError("");
                  setTransactionHash("");
                }}
                placeholder="0x..."
                className="w-full rounded-xl border border-white/[0.09] bg-black/20 px-4 py-3 text-xs font-mono outline-none"
              />
            </div>

            {/* Policy button */}
            <button
              onClick={checkPolicy}
              disabled={executing}
              className="w-full rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-zinc-200 transition disabled:opacity-50"
            >
              Check Policy
            </button>

            {/* Policy evaluation */}
            {checked && (
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4 space-y-3">
                <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Policy evaluation
                </div>

                <PolicyRow
                  label="Amount within limit"
                  passed={policy.withinTxLimit}
                />

                <PolicyRow
                  label="Daily limit available"
                  passed={policy.withinDailyLimit}
                />

                <PolicyRow
                  label="Destination approved"
                  passed={policy.approvedDestination}
                />

                <PolicyRow
                  label="APXS token approved"
                  passed={true}
                />

                <div
                  className={`mt-4 rounded-xl p-3 text-sm font-semibold ${
                    policy.allowed
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "bg-red-400/10 text-red-300"
                  }`}
                >
                  {policy.allowed
                    ? "✓ Payment authorized by policy"
                    : "✕ Payment blocked by policy"}
                </div>

                {/* Execute */}
                {policy.allowed && !executed && (
                  <button
                    onClick={executePayment}
                    disabled={executing}
                    className="w-full rounded-xl bg-[#7B5CFA] text-white py-3 text-sm font-semibold hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {executing
                      ? "Waiting for MetaMask..."
                      : "Execute APXS Payment"}
                  </button>
                )}

                {/* Receipt */}
                {executed && transactionHash && (
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Payment confirmed
                    </div>

                    <div className="mt-3 space-y-3 text-xs">
                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-500">
                          Amount
                        </span>

                        <span className="font-mono">
                          {amount} APXS
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-500">
                          Status
                        </span>

                        <span
                          className={
                            receiptStatus === "success"
                              ? "text-emerald-300"
                              : "text-red-300"
                          }
                        >
                          {receiptStatus === "success"
                            ? "Confirmed"
                            : "Reverted"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-500">
                          Block
                        </span>

                        <span className="font-mono">
                          {receiptBlockNumber || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-500">
                          Network
                        </span>

                        <span>
                          {activeNetworkName}
                        </span>
                      </div>

                      <div>
                        <div className="text-zinc-500 mb-1">
                          Transaction
                        </div>

                        <div className="font-mono text-zinc-300 break-all">
                          {transactionHash}
                        </div>
                      </div>

                      <a
                        href={
                          chainId === bscTestnet.id
                            ? `https://testnet.bscscan.com/tx/${transactionHash}`
                            : `https://sepolia.arbiscan.io/tx/${transactionHash}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-[#A78BFA] hover:underline"
                      >
                        View on {chainId === bscTestnet.id ? "BscScan" : "Arbiscan"} →
                      </a>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-300 mt-0.5 shrink-0" />

                      <div>
                        <p className="text-sm font-semibold text-red-300">
                          Transaction not completed
                        </p>

                        <p className="mt-1 text-xs text-red-200/80 break-words">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyRow({
  label,
  passed,
}: {
  label: string;
  passed: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="text-zinc-400">
        {label}
      </span>

      {passed ? (
        <span className="inline-flex items-center gap-1.5 text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Pass
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-red-300">
          <XCircle className="w-3.5 h-3.5" />
          Block
        </span>
      )}
    </div>
  );
}