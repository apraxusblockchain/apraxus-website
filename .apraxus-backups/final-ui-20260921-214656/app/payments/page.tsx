import React from 'react';
import { PaymentFlow } from '@/components/ui/PaymentFlow';
import { Zap, ShieldCheck, ArrowRightLeft, FileCheck, Layers } from 'lucide-react';

export const metadata = {
  title: 'Programmable Payments | Apraxus',
  description: 'Machine-to-machine settlement, autonomous escrow, and policy-governed payment channels on Apraxus.',
};

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <span>Autonomous Settlement Rails</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Programmable Machine Payments
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            Standard payment rails are built for human checkout screens. Apraxus is designed for sub-second programmatic transactions between machines, APIs, and smart contracts.
          </p>
        </div>

        {/* Payment Flow Visualizations */}
        <PaymentFlow />

        {/* Controls Specification */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Granular Policy Controls
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#0A0A0D]/70 p-4 rounded-xl border border-white/5">
              <span className="text-[#77727D] block mb-1">01. Dynamic Allowlisting</span>
              <span className="text-white">Strict contract & recipient address filters</span>
            </div>
            <div className="bg-[#0A0A0D]/70 p-4 rounded-xl border border-white/5">
              <span className="text-[#77727D] block mb-1">02. Rate-Limiting</span>
              <span className="text-white">Throttles transactions per second or epoch</span>
            </div>
            <div className="bg-[#0A0A0D]/70 p-4 rounded-xl border border-white/5">
              <span className="text-[#77727D] block mb-1">03. Escalation Thresholds</span>
              <span className="text-white">Requires human multi-sig above $X limit</span>
            </div>
            <div className="bg-[#0A0A0D]/70 p-4 rounded-xl border border-white/5">
              <span className="text-[#77727D] block mb-1">04. Receipt Seals</span>
              <span className="text-white">Cryptographically verifiable execution receipts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
