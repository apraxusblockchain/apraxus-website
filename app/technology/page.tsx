import React from 'react';
import { ArchitectureViewer } from '@/components/ui/ArchitectureViewer';
import { StatusPill } from '@/components/ui/StatusPill';
import { Terminal, Shield, Cpu, Network, CheckCircle2, GitBranch, Database, FileCode2, Binary, Lock } from 'lucide-react';

export const metadata = {
  title: 'Technology & Architecture | Apraxus',
  description: 'Technical architecture, verified implementation surfaces, and future protocol design of Apraxus.',
};

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7B5CFA]/15 border border-[#7B5CFA]/30 text-xs font-mono text-[#7B5CFA] mb-4">
            <span>Protocol Engineering Layer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Technology & System Architecture
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed font-sans">
            Apraxus combines a developer API, policy engine, payment execution layer, EVM infrastructure, and SDK to provide programmable infrastructure for autonomous software. Current implementation and future architecture are clearly separated below.
          </p>
        </div>

        {/* Current Implementation */}
        <div className="glass-card p-8 rounded-3xl border border-white/[0.08] flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div>
              <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-[#7B5CFA]" /> Current Implementation Surface
              </h2>
              <span className="text-xs text-zinc-400">
                Repository-backed capabilities currently implemented for development and testnet use
              </span>
            </div>
            <StatusPill status="SHIPPED" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">Developer Interface</span>
              <span className="text-sm font-bold text-white font-mono">API v1 + TypeScript SDK</span>
              <span className="text-[11px] text-emerald-400">Intent and sandbox workflows</span>
            </div>

            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">Policy Layer</span>
              <span className="text-sm font-bold text-white font-mono">Payment Policy Engine</span>
              <span className="text-[11px] text-emerald-400">Transaction + daily limits</span>
            </div>

            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">Execution Layer</span>
              <span className="text-sm font-bold text-white font-mono">Wallet-Signed APXS</span>
              <span className="text-[11px] text-[#38E8F8]">Receipt-confirmed testnet execution</span>
            </div>

            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">EVM Infrastructure</span>
              <span className="text-sm font-bold text-white font-mono">EVM + Uniswap v4</span>
              <span className="text-[11px] text-purple-300">APXS / WETH testnet infrastructure</span>
            </div>
          </div>
        </div>

        {/* Architecture Comparison Component */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold font-mono text-white">Full Architectural Stack</h2>
          <ArchitectureViewer />
        </div>
      </div>
    </div>
  );
}
