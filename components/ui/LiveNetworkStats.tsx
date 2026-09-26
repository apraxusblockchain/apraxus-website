'use client';

import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Blocks, Database } from 'lucide-react';

type NetworkData = {
  blockchain: {
    blocks: number;
    total_supply: number;
    max_supply: number;
    valid: boolean;
  };
  health: {
    network: string;
    status: string;
    token: string;
  };
};

export const LiveNetworkStats: React.FC = () => {
  const [data, setData] = useState<NetworkData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNetwork = async () => {
      try {
        const response = await fetch('/api/network', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Network request failed');
        }

        const result = await response.json();
        setData(result);
        setError(false);
      } catch {
        setError(true);
      }
    };

    loadNetwork();

    const interval = setInterval(loadNetwork, 10000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: 'LATEST BLOCK',
      value: data ? data.blockchain.blocks.toLocaleString() : '—',
      sub: 'Apraxus backend height',
      accent: 'text-[#38E8F8]',
      icon: Blocks,
    },
    {
      label: 'TOTAL SUPPLY',
      value: data
        ? `${(data.blockchain.total_supply / 100_000_000).toLocaleString()} APXS`
        : '—',
      sub: 'Current backend supply',
      accent: 'text-[#9B7CFF]',
      icon: Database,
    },
    {
      label: 'NETWORK STATUS',
      value: data
        ? data.health.status.toUpperCase()
        : error
          ? 'OFFLINE'
          : 'LOADING',
      sub: data?.health.network || 'Apraxus backend',
      accent:
        data?.health.status === 'ok'
          ? 'text-emerald-400'
          : 'text-zinc-400',
      icon: Activity,
    },
    {
      label: 'CHAIN VALIDITY',
      value: data
        ? data.blockchain.valid
          ? 'VALID'
          : 'INVALID'
        : '—',
      sub: 'Backend chain verification',
      accent: data?.blockchain.valid
        ? 'text-emerald-400'
        : 'text-red-400',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative z-20 px-4 sm:px-6 lg:px-8 pt-10 pb-4">
      <div className="apx-container">
        <div className="flex items-end justify-between gap-6 mb-5">
          <div>
            <div className="apx-eyebrow">Live Protocol State</div>
            <p className="mt-2 text-sm text-zinc-500">
              Real-time telemetry from the Apraxus Core API.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            Refreshing · 10s
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06]">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative min-h-[178px] bg-[#0A0A0D] p-5 sm:p-6 transition-colors duration-300 hover:bg-[#0D0D12]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-zinc-600">
                    {stat.label}
                  </span>

                  <Icon
                    className={`h-4 w-4 ${stat.accent} opacity-70 transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>

                <div className="mt-8">
                  <div
                    className={`font-mono text-2xl sm:text-[28px] font-medium tracking-tight ${stat.accent}`}
                  >
                    {stat.value}
                  </div>

                  <p className="mt-2 text-xs text-zinc-600">
                    {stat.sub}
                  </p>
                </div>

                <div className="absolute bottom-0 left-5 right-5 h-px bg-white/[0.04]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
