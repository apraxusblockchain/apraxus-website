import React from 'react';
import { ArchitectureViewer } from '@/components/ui/ArchitectureViewer';
import { StatusPill } from '@/components/ui/StatusPill';
import { Terminal, Shield, Cpu, Network, CheckCircle2, GitBranch, Database, FileCode2, Binary, Lock } from 'lucide-react';

export const metadata = {
  title: 'Technology & Architecture | Apraxus',
  description: 'Technical architecture, Rust blockchain prototype evidence, and protocol design specifications of Apraxus.',
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
            Apraxus is engineered from the ground up in native Rust. We provide total visibility into verified active implementations versus future roadmap architecture.
          </p>
        </div>

        {/* Current Prototype Verification */}
        <div className="glass-card p-8 rounded-3xl border border-white/[0.08] flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div>
              <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-[#7B5CFA]" /> Current Rust Core Prototype Status
              </h2>
              <span className="text-xs text-zinc-400">Verified in single-node testbed harness</span>
            </div>
            <StatusPill status="SHIPPED" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">Language Core</span>
              <span className="text-sm font-bold text-white font-mono">Rust 1.80+ / Tokio</span>
              <span className="text-[11px] text-emerald-400">Zero-cost memory safety</span>
            </div>
            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">Cryptographic Primitives</span>
              <span className="text-sm font-bold text-white font-mono">Ed25519 + SHA3-256</span>
              <span className="text-[11px] text-emerald-400">Deterministic key signatures</span>
            </div>
            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">State Engine</span>
              <span className="text-sm font-bold text-white font-mono">Merkle KV Store</span>
              <span className="text-[11px] text-[#38E8F8]">Sub-second receipt generation</span>
            </div>
            <div className="bg-[#070709]/80 p-4.5 rounded-xl border border-white/5 flex flex-col gap-2">
              <span className="text-xs text-zinc-500 font-mono">Network Transport</span>
              <span className="text-sm font-bold text-white font-mono">TCP Asynchronous</span>
              <span className="text-[11px] text-purple-300">Async stream handshake</span>
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
