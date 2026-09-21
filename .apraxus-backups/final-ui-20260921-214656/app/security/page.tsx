import React from 'react';
import { Shield, Lock, AlertTriangle, FileCode, CheckCircle, RefreshCcw } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';

export const metadata = {
  title: 'Security & Threat Model | Apraxus',
  description: 'Zero-trust security architecture, policy safety boundaries, and responsible vulnerability disclosure.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-300 mb-4">
            <span>Trust & Verification</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Security & Threat Architecture
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            Security is not an afterthought. In an autonomous economy where machines move value, cryptographic constraints must be rigorous and verifiable.
          </p>
        </div>

        {/* Security Rule / Anti-Hallucination Disclaimer */}
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-xs">
            <span className="font-bold text-amber-300 font-mono">Current Audit Disclosure Status</span>
            <p className="text-[#77727D] leading-relaxed font-sans">
              Apraxus is currently in active prototype development (Phase 02). Formal third-party security audits will be commissioned and published prior to public testnet and mainnet genesis (Phase 08). We do not claim completed audits before verified completion.
            </p>
          </div>
        </div>

        {/* Threat Vectors & Mitigations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" /> Agent Key Compromise
            </h3>
            <p className="text-xs text-[#77727D] leading-relaxed">
              If an agent's sub-key is leaked or hallucinated into prompt logs, attacker damage is mathematically bounded by the remaining time-window spend budget and allowlist destinations.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-cyan-400" /> Replay & Double-Spend
            </h3>
            <p className="text-xs text-[#77727D] leading-relaxed">
              Every signed transaction payload includes deterministic nonce tracking and chain ID validation enforced directly at the Rust transaction verification pipeline.
            </p>
          </div>
        </div>

        {/* Responsible Disclosure */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-white font-mono">Responsible Vulnerability Disclosure</h3>
          <p className="text-xs text-[#77727D] leading-relaxed font-sans">
            If you discover a security vulnerability in any Apraxus core repository or prototype, please disclose it responsibly to <code className="text-purple-300">security@apraxus.io</code>. We prioritize rapid patch review and triage.
          </p>
        </div>
      </div>
    </div>
  );
}
