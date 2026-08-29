"use client";

import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatUnits,
  http,
  type Address,
} from "viem";
import { arbitrumSepolia } from "viem/chains";

import {
  APXS_ABI,
  APXS_CONTRACT_ADDRESS,
} from "@/lib/web3/apxs";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const apxsClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http("https://sepolia-rollup.arbitrum.io/rpc"),
});

export default function APXSWallet() {
  const [address, setAddress] = useState<Address | null>(null);
  const [balance, setBalance] = useState("—");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function connectWallet() {
    try {
      setError("");
      setBalance("—");
      setLoading(true);

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask is not installed.");
      }

      const walletClient = createWalletClient({
        chain: arbitrumSepolia,
        transport: custom(window.ethereum),
      });

      const accounts = await walletClient.requestAddresses();
      const account = accounts[0];

      if (!account) {
        throw new Error("No wallet account found.");
      }

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (chainId !== "0x66eee") {
        throw new Error(
          "Please switch MetaMask to Arbitrum Sepolia."
        );
      }

      setAddress(account);

      const [rawBalance, decimals] = await Promise.all([
        apxsClient.readContract({
          address: APXS_CONTRACT_ADDRESS,
          abi: APXS_ABI,
          functionName: "balanceOf",
          args: [account],
        }),

        apxsClient.readContract({
          address: APXS_CONTRACT_ADDRESS,
          abi: APXS_ABI,
          functionName: "decimals",
        }),
      ]);

      setBalance(formatUnits(rawBalance, decimals));
    } catch (err) {
      console.error(err);

      setBalance("—");

      setError(
        err instanceof Error
          ? err.message
          : "Unable to read APXS balance."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6">
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          APXS Wallet
        </p>

        <h3 className="mt-2 text-xl font-semibold text-white">
          Arbitrum Sepolia APXS Balance
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          APXS testnet token balance
        </p>
      </div>

      {!address ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="rounded-xl bg-[#7B5CFA] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Connecting..." : "Connect MetaMask"}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
            <p className="text-xs text-zinc-500">
              Connected wallet
            </p>

            <p className="mt-2 break-all font-mono text-sm text-zinc-300">
              {address}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
            <p className="text-xs text-zinc-500">
              Network
            </p>

            <p className="mt-2 text-sm font-medium text-emerald-300">
              Arbitrum Sepolia
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
            <p className="text-xs text-zinc-500">
              APXS Balance
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              {loading ? "Loading..." : `${balance} APXS`}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
            <p className="text-xs text-zinc-500">
              APXS Contract
            </p>

            <p className="mt-2 break-all font-mono text-xs text-zinc-400">
              {APXS_CONTRACT_ADDRESS}
            </p>
          </div>

          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Balance"}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4">
          <p className="text-sm text-red-300">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
