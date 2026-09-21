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
      label: 'LATEST BLOCKS',
      value: data ? data.blockchain.blocks.toLocaleString() : '—',
      sub: 'Apraxus backend height',
      highlight: 'text-[#38E8F8]',
      badge: 'LIVE',
      icon: Blocks,
    },
    {
      label: 'TOTAL SUPPLY',
      value: data
         ? `${(data.blockchain.total_supply / 100_000_000).toLocaleString()} APXS`
        : '—',
      sub: 'APXS token supply',
      highlight: 'text-[#7B5CFA]',
      badge: data?.health.token || 'APXS',
      icon: Database,
    },
    {
      label: 'NETWORK STATUS',
      value: data
        ? data.health.status.toUpperCase()
        : error
          ? 'OFFLINE'
          : 'LOADING',
      sub: data?.health.network || 'Apraxus backend status',
      highlight:
        data?.health.status === 'ok'
          ? 'text-emerald-400'
          : 'text-zinc-400',
      badge: 'LIVE API',
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
      highlight: data?.blockchain.valid
        ? 'text-emerald-400'
        : 'text-red-400',
      badge: 'VERIFIED',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7B5CFA]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
                  {stat.label}
                </span>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-zinc-400 group-hover:text-white transition-colors">
                  {stat.badge}
                </span>
              </div>

              <div>
                <div
                  className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${stat.highlight}`}
                >
                  {stat.value}
                </div>

                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  {stat.sub}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                <Icon className="w-3.5 h-3.5 text-[#7B5CFA]" />
                <span>Apraxus Core API</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};