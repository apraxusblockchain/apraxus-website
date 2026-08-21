'use client';

import React, { useEffect, useState } from 'react';
import {
  Activity,
  Blocks,
  CheckCircle2,
  RefreshCw,
  Server,
  ShieldCheck,
  Coins,
  Search,
  Wallet,
  Copy,
} from 'lucide-react';

type NetworkData = {
  blockchain: {
    blocks: number;
    max_supply: number;
    total_supply: number;
    valid: boolean;
  };
  health: {
    network: string;
    status: string;
    token: string;
  };
};

type BalanceData = {
  address: string;
  balance: number;
  symbol: string;
};

type ExplorerBlock = {
  index: number;
  hash: string;
  previous_hash: string;
  timestamp: string;
  transactions: number;
};

type ExplorerTransaction = {
  hash: string;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  nonce: number;
};

type ExplorerBlockDetails = {
  index: number;
  hash: string;
  previous_hash: string;
  timestamp: string;
  transactions: ExplorerTransaction[];
};

type ExplorerTransactionDetails = {
  hash: string;
  block: number;
  block_hash: string;
  timestamp: string;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  nonce: number;
  status: string;
  network: string;
  symbol: string;
};

const DEFAULT_ADDRESS =
  '58a627da735820758f2945632b21f5d10d29aecf08f03231a4737ac539e1036d';

export default function NetworkPage() {
  const [data, setData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState('');

  const [explorerBlocks, setExplorerBlocks] = useState<ExplorerBlock[]>([]);
const [explorerLoading, setExplorerLoading] = useState(false);
const [explorerError, setExplorerError] = useState('');

const [selectedBlock, setSelectedBlock] =
  useState<ExplorerBlockDetails | null>(null);

const [selectedBlockLoading, setSelectedBlockLoading] = useState(false);

  const [transactionHash, setTransactionHash] = useState('');
  const [transactionDetails, setTransactionDetails] =
    useState<ExplorerTransactionDetails | null>(null);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactionError, setTransactionError] = useState('');

  const loadNetwork = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch('/api/network', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Network API failed');
      }

      const result: NetworkData = await response.json();

      setData(result);
    } catch (err) {
      console.error('Apraxus network error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

    const loadExplorerBlocks = async () => {
    try {
      setExplorerLoading(true);
      setExplorerError('');

      const response = await fetch(
        '/api/blocks',
        {
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error('Explorer API request failed');
      }

      const result = await response.json();

      setExplorerBlocks(result.blocks ?? []);
    } catch (err) {
      console.error('Apraxus explorer error:', err);
      setExplorerError('Unable to load blockchain blocks.');
    } finally {
      setExplorerLoading(false);
    }
  };

  const loadTransaction = async (hash: string) => {
    const trimmedHash = hash.trim();

    if (!trimmedHash) {
      setTransactionError('Enter a transaction hash.');
      setTransactionDetails(null);
      return;
    }

    try {
      setTransactionLoading(true);
      setTransactionError('');
      setTransactionDetails(null);

      const response = await fetch(
        `/api/transaction?hash=${encodeURIComponent(trimmedHash)}`,
        {
          cache: 'no-store',
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || 'Transaction not found.'
        );
      }

      setTransactionDetails(result);
    } catch (err) {
      console.error('Apraxus transaction error:', err);

      setTransactionError(
        err instanceof Error
          ? err.message
          : 'Unable to load transaction.'
      );
    } finally {
      setTransactionLoading(false);
    }
  };

  const handleTransactionSearch = (event: React.FormEvent) => {
    event.preventDefault();
    loadTransaction(transactionHash);
  };

  const loadBalance = async (walletAddress: string) => {
    const trimmedAddress = walletAddress.trim();

    if (!trimmedAddress) {
      setBalanceError('Enter a wallet address.');
      setBalance(null);
      return;
    }

    try {
      setBalanceLoading(true);
      setBalanceError('');
      setBalance(null);

      const response = await fetch(
        `/api/balance?address=${encodeURIComponent(trimmedAddress)}`,
        {
          cache: 'no-store',
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || 'Unable to fetch wallet balance.'
        );
      }

      setBalance(result);
    } catch (err) {
      console.error('Apraxus balance error:', err);

      setBalanceError(
        err instanceof Error
          ? err.message
          : 'Unable to fetch wallet balance.'
      );
    } finally {
      setBalanceLoading(false);
    }
  };

  useEffect(() => {
  loadNetwork();
  loadBalance(DEFAULT_ADDRESS);
  loadExplorerBlocks();

  const interval = setInterval(() => {
    loadNetwork();
    loadExplorerBlocks();
  }, 10000);

  return () => clearInterval(interval);
}, []);

  const formatSupply = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value / 100000000);
  };

  const formatAPXS = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 8,
    }).format(value / 100000000);
  };

  const isOnline =
    !loading &&
    !error &&
    data?.health.status?.toLowerCase() === 'ok';

  const isValid =
    !loading &&
    !error &&
    data?.blockchain.valid === true;

  const handleBalanceSearch = (event: React.FormEvent) => {
    event.preventDefault();
    loadBalance(address);
  };

  const copyAddress = async () => {
    if (!balance?.address) return;

    try {
      await navigator.clipboard.writeText(balance.address);
    } catch {
      console.error('Unable to copy address.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOnline
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-zinc-500'
              }`}
            />

            {isOnline
              ? 'Live Network Telemetry'
              : 'Network Telemetry'}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Network & Explorer
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">
            Live telemetry from the Apraxus blockchain node. Monitor
            chain height, supply, network health, cryptographic validity,
            and wallet balances in real time.
          </p>
        </div>

        {/* ========================================================= */}
        {/* STATUS BAR */}
        {/* ========================================================= */}

        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">

          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                isOnline
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <Server
                className={`w-6 h-6 ${
                  isOnline
                    ? 'text-emerald-400'
                    : 'text-zinc-500'
                }`}
              />
            </div>

            <div>
              <h2 className="text-lg font-bold font-mono">
                {loading
                  ? 'Connecting to Apraxus...'
                  : error
                    ? 'Network Unavailable'
                    : 'Apraxus Network Online'}
              </h2>

              <p className="text-xs text-zinc-500 mt-1">
                {loading
                  ? 'Fetching live network telemetry...'
                  : error
                    ? 'Unable to reach the live network API.'
                    : 'Connected to the live Apraxus Rust node.'}
              </p>
            </div>
          </div>

          <button
            onClick={loadNetwork}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition text-xs font-mono disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${
                loading ? 'animate-spin' : ''
              }`}
            />

            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {/* ========================================================= */}
        {/* LIVE METRICS */}
        {/* ========================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* BLOCK HEIGHT */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                BLOCK HEIGHT
              </span>

              <Blocks className="w-5 h-5 text-cyan-400" />
            </div>

            <div className="text-3xl font-bold font-mono text-cyan-400">
              {loading
                ? '—'
                : data?.blockchain.blocks ?? '—'}
            </div>

            <p className="text-xs text-zinc-500 mt-2">
              Current blockchain height
            </p>
          </div>

          {/* TOTAL SUPPLY */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                TOTAL SUPPLY
              </span>

              <Coins className="w-5 h-5 text-purple-400" />
            </div>

            <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-400 break-words">
              {loading
                ? '—'
                : data
                  ? `${formatSupply(
                      data.blockchain.total_supply
                    )} APXS`
                  : '—'}
            </div>

            <p className="text-xs text-zinc-500 mt-2">
              Current protocol supply
            </p>
          </div>

          {/* NETWORK STATUS */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                NETWORK STATUS
              </span>

              <Activity className="w-5 h-5 text-emerald-400" />
            </div>

            <div
              className={`text-3xl font-bold font-mono ${
                isOnline
                  ? 'text-emerald-400'
                  : 'text-zinc-500'
              }`}
            >
              {loading
                ? '—'
                : error
                  ? 'OFFLINE'
                  : data?.health.status?.toUpperCase() ?? '—'}
            </div>

            <p className="text-xs text-zinc-500 mt-2">
              {data?.health.network ?? 'Apraxus'}
            </p>
          </div>

          {/* CHAIN VALIDITY */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                CHAIN VALIDITY
              </span>

              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <div
              className={`text-3xl font-bold font-mono ${
                isValid
                  ? 'text-emerald-400'
                  : error
                    ? 'text-zinc-500'
                    : 'text-red-400'
              }`}
            >
              {loading
                ? '—'
                : error
                  ? '—'
                  : data?.blockchain.valid
                    ? 'VALID'
                    : 'INVALID'}
            </div>

            <p className="text-xs text-zinc-500 mt-2">
              Cryptographic chain verification
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* WALLET BALANCE EXPLORER */}
        {/* ========================================================= */}

        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 border-b border-white/5 pb-6 mb-6">

            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Wallet className="w-4 h-4" />

                <span className="text-xs font-mono uppercase tracking-widest">
                  Wallet Explorer
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                Check APXS Balance
              </h2>

              <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
                Query the live Apraxus Rust node for the balance of any
                wallet address.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE RPC
            </div>
          </div>

          <form
            onSubmit={handleBalanceSearch}
            className="flex flex-col lg:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Enter Apraxus wallet address..."
                spellCheck={false}
                className="w-full h-12 rounded-xl border border-white/10 bg-black/30 pl-11 pr-4 text-sm font-mono text-white placeholder:text-zinc-600 outline-none focus:border-[#7B5CFA]/60 focus:ring-1 focus:ring-[#7B5CFA]/30 transition"
              />
            </div>

            <button
              type="submit"
              disabled={balanceLoading}
              className="h-12 px-6 rounded-xl bg-[#7B5CFA] hover:bg-[#6343EB] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {balanceLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}

              {balanceLoading ? 'Checking...' : 'Check Balance'}
            </button>
          </form>

          {/* BALANCE RESULT */}
          {balance && (
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    Wallet Balance
                  </span>

                  <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 mt-2">
                    {formatAPXS(balance.balance)} {balance.symbol}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  VERIFIED BY NODE
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div className="min-w-0">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-1">
                    ADDRESS
                  </span>

                  <span className="text-xs text-zinc-400 font-mono break-all">
                    {balance.address}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-xs font-mono text-zinc-400 hover:text-white transition shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>

              </div>
            </div>
          )}

          {/* BALANCE ERROR */}
          {balanceError && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300 font-mono">
              {balanceError}
            </div>
          )}

        </section>

                {/* ========================================================= */}
        {/* TRANSACTION EXPLORER */}
        {/* ========================================================= */}

        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 border-b border-white/5 pb-6 mb-6">

            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Search className="w-4 h-4" />

                <span className="text-xs font-mono uppercase tracking-widest">
                  Transaction Explorer
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                Search Transaction
              </h2>

              <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
                Search the live Apraxus blockchain using a transaction hash.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE RPC
            </div>
          </div>

          <form
            onSubmit={handleTransactionSearch}
            className="flex flex-col lg:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                value={transactionHash}
                onChange={(event) =>
                  setTransactionHash(event.target.value)
                }
                placeholder="Enter transaction hash..."
                spellCheck={false}
                className="w-full h-12 rounded-xl border border-white/10 bg-black/30 pl-11 pr-4 text-sm font-mono text-white placeholder:text-zinc-600 outline-none focus:border-[#7B5CFA]/60 focus:ring-1 focus:ring-[#7B5CFA]/30 transition"
              />
            </div>

            <button
              type="submit"
              disabled={transactionLoading}
              className="h-12 px-6 rounded-xl bg-[#7B5CFA] hover:bg-[#6343EB] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {transactionLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}

              {transactionLoading ? 'Searching...' : 'Search TX'}
            </button>
          </form>

          {transactionError && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300 font-mono">
              {transactionError}
            </div>
          )}

          {transactionDetails && !transactionLoading && (
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

                <div>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest">
                    TRANSACTION STATUS
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />

                    <span className="text-xl font-bold font-mono text-emerald-400">
                      {transactionDetails.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-zinc-500 font-mono">
                  Block #{transactionDetails.block}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="bg-black/30 p-4 rounded-xl border border-white/5 sm:col-span-2">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    TRANSACTION HASH
                  </span>

                  <span className="text-xs text-cyan-400 font-mono break-all">
                    {transactionDetails.hash}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    FROM
                  </span>

                  <span className="text-xs text-zinc-400 font-mono break-all">
                    {transactionDetails.sender}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    TO
                  </span>

                  <span className="text-xs text-zinc-400 font-mono break-all">
                    {transactionDetails.recipient}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    AMOUNT
                  </span>

                  <span className="text-lg text-emerald-400 font-mono">
                    {formatAPXS(transactionDetails.amount)} APXS
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    FEE
                  </span>

                  <span className="text-lg text-zinc-300 font-mono">
                    {formatAPXS(transactionDetails.fee)} APXS
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    NONCE
                  </span>

                  <span className="text-sm text-white font-mono">
                    {transactionDetails.nonce}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    TIMESTAMP
                  </span>

                  <span className="text-xs text-zinc-300 font-mono">
                    {new Date(
                      transactionDetails.timestamp
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5 sm:col-span-2">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    BLOCK HASH
                  </span>

                  <span className="text-xs text-cyan-400 font-mono break-all">
                    {transactionDetails.block_hash}
                  </span>
                </div>

              </div>

            </div>
          )}

        </section>

        {/* ========================================================= */}
        {/* BLOCK EXPLORER */}
        {/* ========================================================= */}

        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 border-b border-white/5 pb-6 mb-6">

            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Blocks className="w-4 h-4" />

                <span className="text-xs font-mono uppercase tracking-widest">
                  Block Explorer
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                Live Blockchain
              </h2>

              <p className="text-sm text-zinc-500 mt-2">
                Browse blocks confirmed by the live Apraxus Rust node.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </div>
          </div>

          {explorerLoading && explorerBlocks.length === 0 && (
            <div className="py-10 text-center text-sm text-zinc-500 font-mono">
              Loading blockchain...
            </div>
          )}

          {explorerError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300 font-mono">
              {explorerError}
            </div>
          )}

          {!explorerLoading &&
            !explorerError &&
            explorerBlocks.length > 0 && (
              <div className="space-y-3">

                {[...explorerBlocks]
                  .reverse()
                  .map((block) => (
                    <button
                      key={block.hash}
                      type="button"
                      onClick={() => {
                        setSelectedBlockLoading(true);
                        setSelectedBlock(null);

                        fetch(
                          `https://apraxus.onrender.com/block/${block.index}`,
                          {
                            cache: 'no-store',
                          }
                        )
                          .then(async (response) => {
                            if (!response.ok) {
                              throw new Error(
                                'Unable to load block details.'
                              );
                            }

                            return response.json();
                          })
                          .then((result: ExplorerBlockDetails) => {
                            setSelectedBlock(result);
                          })
                          .catch((err) => {
                            console.error(
                              'Block details error:',
                              err
                            );

                            setExplorerError(
                              'Unable to load block details.'
                            );
                          })
                          .finally(() => {
                            setSelectedBlockLoading(false);
                          });
                      }}
                      className="w-full text-left rounded-xl border border-white/5 bg-black/30 hover:bg-white/[0.04] hover:border-cyan-500/20 p-5 transition"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        <div className="flex items-center gap-4">

                          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                            <Blocks className="w-5 h-5 text-cyan-400" />
                          </div>

                          <div>
                            <div className="text-xs text-zinc-500 font-mono">
                              BLOCK
                            </div>

                            <div className="text-lg font-bold font-mono text-white">
                              #{block.index}
                            </div>
                          </div>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">

                          <div>
                            <div className="text-[10px] text-zinc-600 font-mono">
                              TRANSACTIONS
                            </div>

                            <div className="text-sm text-zinc-300 font-mono mt-1">
                              {block.transactions}
                            </div>
                          </div>

                          <div>
                            <div className="text-[10px] text-zinc-600 font-mono">
                              TIME
                            </div>

                            <div className="text-sm text-zinc-300 font-mono mt-1">
                              {new Date(block.timestamp).toLocaleString()}
                            </div>
                          </div>

                          <div className="max-w-[260px]">
                            <div className="text-[10px] text-zinc-600 font-mono">
                              HASH
                            </div>

                            <div className="text-xs text-cyan-400 font-mono mt-1 truncate">
                              {block.hash}
                            </div>
                          </div>

                        </div>

                      </div>
                    </button>
                  ))}

              </div>
            )}

          {/* BLOCK DETAILS */}

          {selectedBlockLoading && (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-500 font-mono">
              Loading block details...
            </div>
          )}

          {selectedBlock && !selectedBlockLoading && (
            <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03] p-5">

              <div className="flex items-center justify-between gap-4 mb-5">

                <div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    BLOCK DETAILS
                  </span>

                  <h3 className="text-xl font-bold font-mono mt-1">
                    Block #{selectedBlock.index}
                  </h3>
                </div>

                <CheckCircle2 className="w-5 h-5 text-emerald-400" />

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    HASH
                  </span>

                  <span className="text-xs text-cyan-400 font-mono break-all">
                    {selectedBlock.hash}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    PREVIOUS HASH
                  </span>

                  <span className="text-xs text-zinc-400 font-mono break-all">
                    {selectedBlock.previous_hash}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    TIMESTAMP
                  </span>

                  <span className="text-xs text-zinc-300 font-mono">
                    {new Date(
                      selectedBlock.timestamp
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                    TRANSACTIONS
                  </span>

                  <span className="text-sm text-white font-mono">
                    {selectedBlock.transactions.length}
                  </span>
                </div>

              </div>

              {selectedBlock.transactions.length > 0 && (
                <div className="mt-5">

                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                    Confirmed Transactions
                  </span>

                  <div className="mt-3 space-y-3">

                    {selectedBlock.transactions.map((tx) => (
                      <div
                        key={tx.hash}
                        className="rounded-xl border border-white/5 bg-black/30 p-4"
                      >

                        <div className="flex flex-col gap-3">

                          <div>
                            <span className="text-[10px] text-zinc-600 font-mono block mb-1">
                              TRANSACTION HASH
                            </span>

                            <span className="text-xs text-cyan-400 font-mono break-all">
                              {tx.hash}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <div>
                              <span className="text-[10px] text-zinc-600 font-mono block mb-1">
                                FROM
                              </span>

                              <span className="text-xs text-zinc-400 font-mono break-all">
                                {tx.sender}
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] text-zinc-600 font-mono block mb-1">
                                TO
                              </span>

                              <span className="text-xs text-zinc-400 font-mono break-all">
                                {tx.recipient}
                              </span>
                            </div>

                          </div>

                          <div className="flex flex-wrap gap-5 pt-3 border-t border-white/5">

                            <div>
                              <span className="text-[10px] text-zinc-600 font-mono block mb-1">
                                AMOUNT
                              </span>

                              <span className="text-sm text-emerald-400 font-mono">
                                {formatAPXS(tx.amount)} APXS
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] text-zinc-600 font-mono block mb-1">
                                FEE
                              </span>

                              <span className="text-sm text-zinc-300 font-mono">
                                {formatAPXS(tx.fee)} APXS
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] text-zinc-600 font-mono block mb-1">
                                NONCE
                              </span>

                              <span className="text-sm text-zinc-300 font-mono">
                                {tx.nonce}
                              </span>
                            </div>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              )}

            </div>
          )}

        </section>


        {/* ========================================================= */}
        {/* NETWORK DETAILS */}
        {/* ========================================================= */}

        <div className="glass-panel p-8 rounded-2xl border border-white/10">

          <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">

            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Network Details
              </span>

              <h2 className="text-2xl font-bold mt-2">
                Apraxus Core
              </h2>
            </div>

            {isOnline ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <Server className="w-6 h-6 text-zinc-500" />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* TOKEN */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 font-mono block mb-2">
                TOKEN
              </span>

              <span className="text-white font-mono">
                {data?.health.token ?? 'APXS'}
              </span>
            </div>

            {/* MAX SUPPLY */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 font-mono block mb-2">
                MAX SUPPLY
              </span>

              <span className="text-white font-mono">
                {loading
                  ? '—'
                  : data
                    ? `${formatSupply(
                        data.blockchain.max_supply
                      )} APXS`
                    : '—'}
              </span>
            </div>

            {/* NODE */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 font-mono block mb-2">
                NODE
              </span>

              <span
                className={`font-mono ${
                  isOnline
                    ? 'text-emerald-400'
                    : 'text-zinc-500'
                }`}
              >
                {loading
                  ? 'CHECKING'
                  : isOnline
                    ? 'ONLINE'
                    : 'OFFLINE'}
              </span>
            </div>

            {/* DATA SOURCE */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 font-mono block mb-2">
                DATA SOURCE
              </span>

              <span className="text-white font-mono">
                Live Rust API
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* ERROR */}
        {/* ========================================================= */}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300 font-mono">
            Unable to connect to the Apraxus network. Try refreshing the
            page or use the Refresh button above.
          </div>
        )}

        {/* ========================================================= */}
        {/* FOOTER */}
        {/* ========================================================= */}

        <div className="text-center">
          <p className="text-xs text-zinc-600 font-mono">
            Network telemetry refreshes automatically every 10 seconds.
            Wallet queries are fetched on demand from the live Rust API.
          </p>
        </div>

      </div>
    </div>
  );
}