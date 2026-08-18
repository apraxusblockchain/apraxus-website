'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  Clock, 
  Cpu, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Lock, 
  AlertTriangle,
  ArrowRight,
  Database,
  FileCode2,
  Copy,
  Check
} from 'lucide-react';
import { StatusPill } from './StatusPill';

export const AgentEnvelopeArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'envelope' | 'rust_spec' | 'guardrails'>('envelope');
  const [copied, setCopied] = useState(false);

  const rustCodeSnippet = `// Apraxus Protocol Native Rust Policy Envelope Definition
// Crate: apraxus-policy::envelope

use apraxus_crypto::{Ed25519Signature, PublicKey};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct PolicyEnvelope {
    pub envelope_id: [u8; 32],
    pub master_operator_pubkey: PublicKey,
    pub agent_identity: String,
    pub spend_limit: SpendLimit,
    pub allowlist_destinations: Vec<[u8; 32]>,
    pub allowlist_assets: Vec<AssetId>,
    pub multi_sig_escalation_threshold: u64, // Micro-units
    pub time_lock_expires_at: u64,           // Unix epoch timestamp
    pub auto_revoke_on_anomaly: bool,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SpendLimit {
    pub max_per_transaction: u64,
    pub max_per_window: u64,
    pub window_duration_seconds: u32,
    pub current_window_spent: u64,
}

impl PolicyEnvelope {
    pub fn evaluate_transaction(&self, tx: &TransactionPayload) -> Result<PolicyReceipt, PolicyViolation> {
        // Enforce deterministic sub-second boundary validation
        if tx.amount > self.spend_limit.max_per_transaction {
            return Err(PolicyViolation::TransactionCeilingExceeded);
        }
        if !self.allowlist_destinations.contains(&tx.recipient) {
            return Err(PolicyViolation::UnauthorizedRecipient);
        }
        Ok(PolicyReceipt::approved(self.envelope_id, tx.digest()))
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rustCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Navigation Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('envelope')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'envelope'
                ? 'bg-[#7B5CFA]/25 text-white border border-[#7B5CFA]/50 shadow-[0_0_20px_rgba(123,92,250,0.25)]'
                : 'text-zinc-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            1. Cryptographic Policy Envelope Model
          </button>
          <button
            onClick={() => setActiveTab('rust_spec')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'rust_spec'
                ? 'bg-[#38E8F8]/20 text-[#38E8F8] border border-[#38E8F8]/40 shadow-[0_0_20px_rgba(56,232,248,0.2)]'
                : 'text-zinc-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" /> 2. Native Rust Crate Specification
          </button>
          <button
            onClick={() => setActiveTab('guardrails')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'guardrails'
                ? 'bg-purple-900/30 text-purple-300 border border-purple-500/40'
                : 'text-zinc-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            3. Autonomous Guardrail Hierarchy
          </button>
        </div>

        <StatusPill status="UNDER_DEVELOPMENT" />
      </div>

      {/* Tab 1: Envelope Structure */}
      {activeTab === 'envelope' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Node 1 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7B5CFA]/15 border border-[#7B5CFA]/30 flex items-center justify-center text-[#7B5CFA]">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-mono text-white">Delegated Key Derivation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Human master operators sign cryptographic root delegations. The agent executes via ephemeral Ed25519 sub-keys with cryptographic boundaries bound to its public key digest.
              </p>
            </div>
            <div className="text-[11px] font-mono text-purple-300/90 bg-black/40 p-2.5 rounded-lg border border-white/5">
              `master_key.derive_agent_envelope()`
            </div>
          </div>

          {/* Node 2 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#38E8F8]/15 border border-[#38E8F8]/30 flex items-center justify-center text-[#38E8F8]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-mono text-white">Time-Lock Spending Ceilings</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Prevents infinite drain loops. Each envelope limits maximum cumulative spending across rolling windows (e.g. 50 USDC/hr), validated deterministically on-chain before transaction queueing.
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#38E8F8]/90 bg-black/40 p-2.5 rounded-lg border border-white/5">
              `spend_window.enforce_ceiling()`
            </div>
          </div>

          {/* Node 3 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-mono text-white">Instant State Revocation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                In the event of an anomalous prompt injection or aberrant model behavior, operators broadcast a single-byte revocation payload that instantly invalidates the envelope across all active network nodes.
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-300/90 bg-black/40 p-2.5 rounded-lg border border-white/5">
              `revocation_registry.invalidate_id()`
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Rust Specification */}
      {activeTab === 'rust_spec' && (
        <div className="glass-card p-6 rounded-2xl border border-white/[0.08] flex flex-col gap-4 relative shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#7B5CFA]" />
              apraxus-core/crates/policy/src/envelope.rs
            </span>
            <button
              onClick={handleCopy}
              className="text-xs font-mono text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Spec'}
            </button>
          </div>

          <pre className="bg-[#050507] p-5 rounded-xl border border-white/5 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed max-h-[380px]">
            {rustCodeSnippet}
          </pre>
        </div>
      )}

      {/* Tab 3: Guardrail Hierarchy */}
      {activeTab === 'guardrails' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-5 rounded-xl border border-white/[0.08] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Tier 1: Autonomous Micro-Transactions</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">Auto-Pass</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Transactions under the configured limit ($0.001 to $50.00) targeting allowlisted inference endpoints or compute contracts execute autonomously with sub-second receipt generation.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-white/[0.08] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Tier 2: Multi-Sig Operator Escalation</span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">Escalate</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              High-value settlements ($\ge \$100.00$) or unindexed contract interactions trigger a temporary escrow lock until 2-of-3 human master keys provide cryptographic cosignatures.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
