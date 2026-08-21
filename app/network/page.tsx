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

export default function NetworkPage() {
  const [data, setData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    loadNetwork();

    const interval = setInterval(() => {
      loadNetwork();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatSupply = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value / 100000000);
  };

  const isOnline =
    !loading &&
    !error &&
    data?.health.status?.toLowerCase() === 'ok';

  const isValid =
    !loading &&
    !error &&
    data?.blockchain.valid === true;

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

            {isOnline ? 'Live Network Telemetry' : 'Network Telemetry'}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Network & Explorer
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">
            Live telemetry from the Apraxus blockchain node. Monitor chain
            height, supply, network health, and cryptographic validity in
            real time.
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
              Current circulating protocol supply
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
        {/* FOOTER NOTE */}
        {/* ========================================================= */}

        <div className="text-center">
          <p className="text-xs text-zinc-600 font-mono">
            Live data refreshes automatically every 10 seconds.
          </p>
        </div>

      </div>
    </div>
  );
}