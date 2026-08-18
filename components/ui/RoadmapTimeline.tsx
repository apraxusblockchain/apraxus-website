import React from 'react';
import { StatusPill, StatusType } from './StatusPill';
import { CheckCircle, CircleDot, Clock, ShieldCheck, Cpu } from 'lucide-react';

interface PhaseItem {
  number: string;
  title: string;
  status: StatusType;
  desc: string;
  items: string[];
}

const PHASES: PhaseItem[] = [
  {
    number: '01',
    title: 'Foundation',
    status: 'SHIPPED',
    desc: 'Protocol thesis, brand system, cryptographic identity primitives, and architectural specifications.',
    items: ['Protocol Whitepaper & Master Blueprint', 'Brand & Design System Tokens', 'Zero-trust Threat Modeling'],
  },
  {
    number: '02',
    title: 'Core Blockchain Prototype',
    status: 'UNDER_DEVELOPMENT',
    desc: 'Native Rust blockchain core with cryptographic block verification, transaction state tree, and local CLI testbed.',
    items: ['Rust Block & Merkle Tree Data Structures', 'Ed25519 Signature Pipeline & Replay Guard', 'Embedded Key-Value State Persistence', 'Local Single-Node Test Harness'],
  },
  {
    number: '03',
    title: 'Peer-to-Peer Network',
    status: 'UNDER_DEVELOPMENT',
    desc: 'Distributed node discovery, gossipsub mempool propagation, and asynchronous block synchronization.',
    items: ['Tokio-based TCP Socket Transport', 'Mempool Transaction Gossip Protocol', 'Node Peer Discovery & Handshake'],
  },
  {
    number: '04',
    title: 'Consensus & Finality',
    status: 'PLANNED',
    desc: 'Lightweight, machine-optimized Proof-of-Stake consensus designed for high-frequency micro-transactions.',
    items: ['Validator Staking & Slashing Engine', 'Deterministic Sub-Second Finality', 'Fault-Tolerant State Recovery'],
  },
  {
    number: '05',
    title: 'Programmability & Virtual Machine',
    status: 'PLANNED',
    desc: 'High-performance execution environment supporting agent smart contracts, deterministic state transitions, and RPCs.',
    items: ['Agent Smart Contract Runtime (WASM/EVM)', 'JSON-RPC & WebSocket Gateway', 'Rust / TypeScript Developer SDKs'],
  },
  {
    number: '06',
    title: 'Agent Infrastructure Layer',
    status: 'UNDER_DEVELOPMENT',
    desc: 'The defining layer: programmatic spending envelopes, agent wallets, fine-grained access policies, and auto-revocation.',
    items: ['Agent Envelope & Policy Daemon', 'Time-Windowed Budget Enforcers', 'Autonomous Payment Receipts', 'One-Click Emergency Policy Revocation'],
  },
  {
    number: '07',
    title: 'Public Testnet',
    status: 'COMING_SOON',
    desc: 'First public multi-node testnet deployment with interactive block explorer, test token faucet, and node runner docs.',
    items: ['Multi-Region Validator Cluster', 'Live Block Explorer & Metrics Dashboard', 'Public Developer Faucet & Documentation'],
  },
  {
    number: '08',
    title: 'Security Audits & Verification',
    status: 'PLANNED',
    desc: 'Comprehensive third-party security audits, formal verification of consensus and policy contracts, and public bug bounty.',
    items: ['External Cryptographic Audit Review', 'Policy Sandbox Adversarial Fuzzing', 'Public Security Disclosure Bounty'],
  },
  {
    number: '09',
    title: 'Mainnet Genesis',
    status: 'PLANNED',
    desc: 'Production genesis block launch, opening the decentralized operating layer for the autonomous agent economy.',
    items: ['Decentralized Genesis Block Launch', 'Autonomous Settlement Channels Live', 'Global Machine Ecosystem Integration'],
  },
];

export const RoadmapTimeline: React.FC = () => {
  return (
    <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
      {PHASES.map((phase, idx) => (
        <div key={phase.number} className="relative group">
          {/* Node dot on line */}
          <div
            className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              phase.status === 'SHIPPED'
                ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : phase.status === 'UNDER_DEVELOPMENT'
                ? 'bg-purple-600 border-purple-400 animate-pulse shadow-[0_0_15px_rgba(138,92,230,0.6)]'
                : phase.status === 'TESTING'
                ? 'bg-cyan-500 border-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : 'bg-[#111014] border-white/20'
            }`}
          />

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-purple-400">{phase.number}</span>
                <h3 className="text-lg font-bold text-white font-mono">{phase.title}</h3>
              </div>
              <StatusPill status={phase.status} />
            </div>

            <p className="text-xs sm:text-sm text-[#77727D] font-sans leading-relaxed">
              {phase.desc}
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="text-purple-400 text-xs">▹</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
