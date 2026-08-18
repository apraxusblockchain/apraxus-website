'use client';

import React, { useState } from 'react';
import { Layers, Shield, Cpu, Network, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StatusPill } from './StatusPill';

export const ArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'target'>('current');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab switch */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'current'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(107,53,213,0.3)]'
                : 'text-[#77727D] hover:text-white bg-white/[0.02]'
            }`}
          >
            1. Current Prototype Evidence (Phase 02)
          </button>
          <button
            onClick={() => setActiveTab('target')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'target'
                ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                : 'text-[#77727D] hover:text-white bg-white/[0.02]'
            }`}
          >
            2. Target Protocol Architecture
          </button>
        </div>

        <span className="hidden sm:inline-block text-xs font-mono text-[#77727D]">
          {activeTab === 'current' ? 'Verified in Rust Core Repository' : 'Protocol Specification Blueprint'}
        </span>
      </div>

      {/* Tab 1: Current Real Prototype */}
      {activeTab === 'current' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Rust Blockchain Core</span>
              <StatusPill status="SHIPPED" />
            </div>
            <p className="text-xs text-[#77727D] leading-relaxed">
              Native Rust crate implementing immutable block data structures, cryptographic hashing, and genesis validation.
            </p>
            <div className="text-[11px] font-mono text-purple-300/80 bg-black/40 p-2 rounded border border-white/5">
              `apraxus-core::block::Block`
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Ed25519 Signatures</span>
              <StatusPill status="SHIPPED" />
            </div>
            <p className="text-xs text-[#77727D] leading-relaxed">
              Cryptographic transaction signing and verification pipeline with replay attack prevention and nonce ordering.
            </p>
            <div className="text-[11px] font-mono text-purple-300/80 bg-black/40 p-2 rounded border border-white/5">
              `apraxus-crypto::verify_sig()`
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">State Persistence Engine</span>
              <StatusPill status="TESTING" />
            </div>
            <p className="text-xs text-[#77727D] leading-relaxed">
              Local embedded key-value state tree storing account balances, policy envelopes, and execution receipts.
            </p>
            <div className="text-[11px] font-mono text-cyan-300/80 bg-black/40 p-2 rounded border border-white/5">
              `apraxus-state::merkle_tree`
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">TCP Peer Networking</span>
              <StatusPill status="UNDER_DEVELOPMENT" />
            </div>
            <p className="text-xs text-[#77727D] leading-relaxed">
              Point-to-point node communications, transaction mempool propagation, and block broadcast protocol over asynchronous Tokio runtime.
            </p>
            <div className="text-[11px] font-mono text-purple-300/80 bg-black/40 p-2 rounded border border-white/5">
              `apraxus-net::tokio_tcp`
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Agent Policy Envelope Daemon</span>
              <StatusPill status="UNDER_DEVELOPMENT" />
            </div>
            <p className="text-xs text-[#77727D] leading-relaxed">
              Pre-flight execution layer verifying budget limits, asset allowlists, and execution permissions before submitting block payloads.
            </p>
            <div className="text-[11px] font-mono text-purple-300/80 bg-black/40 p-2 rounded border border-white/5">
              `apraxus-policy::eval_tx()`
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Local Single-Node Testbed</span>
              <StatusPill status="TESTING" />
            </div>
            <p className="text-xs text-[#77727D] leading-relaxed">
              CLI suite and integration test harness validating end-to-end block production and transaction lifecycle locally.
            </p>
            <div className="text-[11px] font-mono text-cyan-300/80 bg-black/40 p-2 rounded border border-white/5">
              `cargo test --package apraxus-node`
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Target Layer Architecture */}
      {activeTab === 'target' && (
        <div className="flex flex-col gap-3 font-mono">
          {[
            {
              layer: 'Layer 7: Application & Autonomous Services',
              status: 'PLANNED' as const,
              desc: 'Autonomous Agent Frameworks, Automated Payment Gateways, Machine Marketplaces, DeFi Relays',
              color: 'border-purple-500/30 bg-purple-950/10 text-purple-300',
            },
            {
              layer: 'Layer 6: Agent Identity & Policy Engine',
              status: 'UNDER_DEVELOPMENT' as const,
              desc: 'Cryptographic Sub-keys, Time-locked Spend Envelopes, Multi-Sig Escalation, Revocation Registry',
              color: 'border-purple-500/40 bg-purple-900/20 text-purple-200',
            },
            {
              layer: 'Layer 5: Smart Contracts & Execution Environment',
              status: 'PLANNED' as const,
              desc: 'WASM / EVM-compatible execution core designed specifically for high-throughput machine-to-machine calls',
              color: 'border-cyan-500/30 bg-cyan-950/10 text-cyan-300',
            },
            {
              layer: 'Layer 4: State & Merkle Storage Layer',
              status: 'UNDER_DEVELOPMENT' as const,
              desc: 'Verifiable state storage with deterministic receipt generation and fast cryptographic proof verification',
              color: 'border-white/10 bg-white/[0.02] text-zinc-300',
            },
            {
              layer: 'Layer 3: Consensus & Finality Engine',
              status: 'PLANNED' as const,
              desc: 'Proof-of-Stake validator consensus with instant machine-level finality guarantees and low latency',
              color: 'border-white/10 bg-white/[0.02] text-zinc-300',
            },
            {
              layer: 'Layer 2: P2P Network & Mempool Gossip',
              status: 'UNDER_DEVELOPMENT' as const,
              desc: 'Libp2p-based gossipsub protocol for sub-second transaction routing across distributed machine nodes',
              color: 'border-white/10 bg-white/[0.02] text-zinc-300',
            },
            {
              layer: 'Layer 1: Node Infrastructure & Hardware Interface',
              status: 'TESTING' as const,
              desc: 'Lightweight node binary runnable on edge devices, cloud servers, and autonomous hardware clusters',
              color: 'border-white/10 bg-white/[0.02] text-zinc-300',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${item.color}`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{item.layer}</span>
                </div>
                <span className="text-[11px] text-[#77727D] font-sans">{item.desc}</span>
              </div>
              <StatusPill status={item.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
