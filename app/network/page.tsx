import React from 'react';
import { Network, Activity, Server, Cpu, Clock, Terminal } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';

export const metadata = {
  title: 'Network & Explorer | Apraxus',
  description: 'Apraxus testnet metrics, node status, and block explorer telemetry.',
};

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <span>Operational Telemetry</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Network & Explorer
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            Telemetry and live block exploration for Apraxus networks. Public testnet telemetry will populate here upon multi-node testnet release (Phase 07).
          </p>
        </div>

        {/* Pre-Testnet Status Banner */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-white">Local Testbed Active (Phase 02)</h2>
              <p className="text-xs text-[#77727D] mt-1">Multi-node public testnet RPC and live block feed are scheduled for Phase 07.</p>
            </div>
          </div>
          <StatusPill status="UNDER_DEVELOPMENT" />
        </div>

        {/* Explorer IA Preview */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4 opacity-75">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-[#77727D] uppercase">Future Explorer Architecture Preview</span>
            <span className="text-[11px] font-mono text-cyan-400">Chain ID: apraxus-testnet-1 (Planned)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-[#77727D] block text-[10px]">CONSENSUS</span>
              <span className="text-white">PoS Machine-BFT</span>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-[#77727D] block text-[10px]">TARGET FINALITY</span>
              <span className="text-white">&lt; 1000ms</span>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-[#77727D] block text-[10px]">RPC PROTOCOL</span>
              <span className="text-white">JSON-RPC / WS</span>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-[#77727D] block text-[10px]">FAUCET DISPENSE</span>
              <span className="text-white">50 APX / 24h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
