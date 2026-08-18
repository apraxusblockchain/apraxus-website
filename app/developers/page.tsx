import React from 'react';
import Link from 'next/link';
import { Terminal, Code2, Cpu, ExternalLink, ArrowRight, ShieldAlert, BookOpen } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';

export const metadata = {
  title: 'Developers | Apraxus',
  description: 'Developer documentation, CLI tooling, and SDK architecture for building autonomous agent workflows on Apraxus.',
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <span>Developer Stack</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Build for Autonomous Systems
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            Everything you need to equip AI models with safe financial agency, programmatic wallets, and on-chain policy enforcement.
          </p>
        </div>

        {/* Developer Step Flow */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col gap-6">
          <h2 className="text-lg font-bold font-mono text-white">The 9-Step Builder Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#0A0A0D]/70 p-4 rounded-xl border border-white/5 flex flex-col gap-1.5">
              <span className="text-purple-400 font-bold">01. LEARN & INSTALL</span>
              <p className="text-[#77727D] text-[11px] font-sans">Read protocol specifications and install local node binaries.</p>
            </div>
            <div className="bg-[#0A0A0D]/70 p-4 rounded-xl border border-white/5 flex flex-col gap-1.5">
              <span className="text-cyan-400 font-bold">02. DEFINE POLICY</span>
              <p className="text-[#77727D] text-[11px] font-sans">Draft spend limits, destination allowlists, and execution parameters.</p>
            </div>
            <div className="bg-[#0A0A0D]/70 p-4 rounded-xl border border-white/5 flex flex-col gap-1.5">
              <span className="text-emerald-400 font-bold">03. SHIP & MONITOR</span>
              <p className="text-[#77727D] text-[11px] font-sans">Run autonomous agent routines with automated receipt audits.</p>
            </div>
          </div>
        </div>

        {/* Quickstart Code Preview */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#77727D] uppercase">Illustrative Agent Wallet Setup (TypeScript SDK)</span>
            <StatusPill status="COMING_SOON" />
          </div>

          <pre className="bg-[#050507] p-4 sm:p-6 rounded-xl border border-white/5 font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto leading-relaxed">
{`import { ApraxusAgentWallet, PolicyEnvelope } from '@apraxus/sdk';

// 1. Initialize controlled agent wallet under master operator key
const agent = await ApraxusAgentWallet.create({
  identity: 'data-harvester-01',
  operatorAddress: '0xHumanMasterKey...',
});

// 2. Attach strict policy bounds
const policy = new PolicyEnvelope({
  dailySpendCeiling: 50.0, // USDC
  allowedDestinations: ['0xOpenAIComputeGateway...'],
  allowedTokens: ['USDC', 'APX'],
  autoRevokeOnError: true,
});

await agent.attachPolicy(policy);

// 3. Agent attempts autonomous execution
const receipt = await agent.executeM2MTransaction({
  to: '0xOpenAIComputeGateway...',
  amount: 12.5,
  action: 'BATCH_INFERENCE_PAYMENT'
});

console.log(\`Execution Confirmed! TxHash: \${receipt.txHash}\`);`}
          </pre>
        </div>
      </div>
    </div>
  );
}
