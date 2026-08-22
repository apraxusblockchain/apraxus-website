"use client";

import { useState } from "react";
import {
  createWalletClient,
  custom,
  formatUnits,
  type Address,
} from "viem";
import { sepolia } from "viem/chains";
import {
  APXS_ABI,
  APXS_CONTRACT_ADDRESS,
  apxsPublicClient,
} from "@/lib/web3/apxs";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function APXSWallet() {
  const [address, setAddress] = useState<Address | null>(null);
  const [balance, setBalance] = useState<string>("—");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function connectWallet() {
    try {
      setError("");

      if (!window.ethereum) {
        setError("MetaMask is not installed.");
        return;
      }

      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      });

      const [account] = await walletClient.requestAddresses();

      setAddress(account);

      setLoading(true);

      const [rawBalance, decimals] = await Promise.all([
        apxsPublicClient.readContract({
          address: APXS_CONTRACT_ADDRESS,
          abi: APXS_ABI,
          functionName: "balanceOf",
          args: [account],
        }),
        apxsPublicClient.readContract({
          address: APXS_CONTRACT_ADDRESS,
          abi: APXS_ABI,
          functionName: "decimals",
        }),
      ]);

      setBalance(formatUnits(rawBalance, decimals));
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the APXS contract.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4">
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          APXS Wallet
        </p>

        <h3 className="mt-2 text-xl font-semibold text-white">
          Sepolia Token Balance
        </h3>
      </div>

      {!address ? (
        <button
          onClick={connectWallet}
          className="rounded-xl bg-[#7B5CFA] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="space-y-3">
          <div>
            <p className="text-xs text-zinc-500">Connected wallet</p>
            <p className="mt-1 break-all font-mono text-sm text-zinc-300">
              {address}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">APXS Balance</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {loading ? "Loading..." : `${balance} APXS`}
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}