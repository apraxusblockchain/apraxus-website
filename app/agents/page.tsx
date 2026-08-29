import React from 'react';
import { AgentEnvelopeArchitecture } from '@/components/ui/AgentEnvelopeArchitecture';
import { AgentPaymentConsole } from '@/components/ui/AgentPaymentConsole';
import { Bot, Key, Shield, Clock, AlertTriangle, CheckCircle, Lock, Fingerprint, Code2, Database } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';

export const metadata = {
  title: 'AI Agent Infrastructure | Apraxus',
  description: 'Cryptographic policy envelopes, delegated key hierarchies, and mathematical spend boundaries for autonomous AI agents on Apraxus.',
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#030305] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7B5CFA]/15 border border-[#7B5CFA]/30 text-xs font-mono text-[#7B5CFA] mb-4">
            <span>Agent Governance Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            AI Agent Policy Infrastructure
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed font-sans">
            Giving autonomous software unconstrained custody of private keys is a catastrophic design flaw. Apraxus wraps agent wallets in cryptographically enforced policy envelopes with deterministic spend ceilings.
          </p>
        </div>

        {/* Deep Dive Architecture Component */}
        <AgentEnvelopeArchitecture />

        {/* APXS Agent Payment Console */}
        <AgentPaymentConsole />

        {/* Technical Core Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/[0.08] flex flex-col gap-3">
            <Fingerprint className="w-6 h-6 text-[#7B5CFA]" />
            <h3 className="text-base font-bold text-white font-mono">Delegated Key Hierarchy</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Human operators hold sovereign master keys. Ephemeral agent sub-keys are derived using Ed25519 scalar multiplication bound to a cryptographic policy envelope digest.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/[0.08] flex flex-col gap-3">
            <Clock className="w-6 h-6 text-[#38E8F8]" />
            <h3 className="text-base font-bold text-white font-mono">Rolling Time Windows</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Spending limits are tracked via rolling epoch accumulators. Even if an agent loops infinitely, cumulative expenditures cannot exceed the operator’s predefined ceiling.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/[0.08] flex flex-col gap-3">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-mono">Deterministic Revocation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Single-byte emergency revocation payloads propagate through the mempool instantly, rendering rogue sub-keys invalid across all active validators in &lt;100ms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
