'use client';

import React from 'react';
import { Activity, ShieldCheck, Zap, Server, Clock, Cpu } from 'lucide-react';

export const LiveNetworkStats: React.FC = () => {
  const stats = [
    {
      label: 'TARGET FINALITY',
      value: '< 850 ms',
      sub: 'Deterministic machine execution',
      highlight: 'text-[#38E8F8]',
      badge: 'PoS Core',
      icon: Zap,
    },
    {
      label: 'MICRO-TX FEE TARGET',
      value: '< $0.0001',
      sub: 'Sub-cent autonomous routing',
      highlight: 'text-[#7B5CFA]',
      badge: 'Zero-Bloat',
      icon: Cpu,
    },
    {
      label: 'POLICY VERIFICATION',
      value: '3.8 ms',
      sub: 'Pre-flight sandbox execution',
      highlight: 'text-emerald-400',
      badge: 'Zero-Trust',
      icon: ShieldCheck,
    },
    {
      label: 'ARCHITECTURE CORE',
      value: 'Native Rust',
      sub: 'Tokio async concurrency engine',
      highlight: 'text-white',
      badge: 'Phase 02 Shipped',
      icon: Server,
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
              {/* Subtle top ambient line */}
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
                <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${stat.highlight}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  {stat.sub}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                <Icon className="w-3.5 h-3.5 text-[#7B5CFA]" />
                <span>Protocol Benchmark Spec</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
