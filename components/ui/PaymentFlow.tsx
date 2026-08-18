import React from 'react';
import { Bot, Server, ArrowRight, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';

export const PaymentFlow = () => {
  const flows = [
    {
      title: 'Agent → API Service',
      desc: 'Autonomous compute and LLM token purchases governed by per-hour micro-budget policies.',
      from: 'AI Research Agent',
      to: 'Inference Gateway',
      policy: 'Max 10 USDC/hr • Auto-Revoke on Error',
      status: 'Designed for M2M',
      color: 'border-purple-500/30 text-purple-300'
    },
    {
      title: 'Agent → Autonomous Agent',
      desc: 'Decentralized task delegation where one orchestrator agent subcontracts work to specialized worker nodes.',
      from: 'Orchestrator Agent',
      to: 'Data Scraper Agent',
      policy: 'Milestone Escrow • Cryptographic Proof',
      status: 'Designed for M2M',
      color: 'border-cyan-500/30 text-cyan-300'
    },
    {
      title: 'Agent → Smart Contract',
      desc: 'Automated treasury rebalancing, liquidity provision, and protocol interactions under multi-sig thresholds.',
      from: 'Treasury Agent',
      to: 'DEX Router Contract',
      policy: 'Slippage < 0.5% • Allowlisted Pools Only',
      status: 'Designed for M2M',
      color: 'border-purple-500/30 text-purple-300'
    },
    {
      title: 'Machine → Machine (Hardware)',
      desc: 'Edge compute nodes, IoT devices, and autonomous hardware executing trustless settlement over native channels.',
      from: 'Autonomous Drone',
      to: 'Charging Station',
      policy: 'Hardware Attestation • Pay-per-Watt',
      status: 'Designed for M2M',
      color: 'border-emerald-500/30 text-emerald-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      {flows.map((f, idx) => (
        <div 
          key={idx} 
          className="glass-card glass-card-hover p-7 rounded-2xl border border-white/[0.09] flex flex-col justify-between gap-6 relative overflow-hidden group shadow-2xl"
        >
          {/* Card Header */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">{f.title}</h3>
              <span className="text-[10px] font-mono text-purple-300 bg-[#7B5CFA]/15 px-2.5 py-0.5 rounded-full border border-[#7B5CFA]/30 font-semibold">
                {f.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-normal">
              {f.desc}
            </p>
          </div>

          {/* Interactive Node Path Container */}
          <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08] flex items-center justify-between gap-3 text-xs font-mono shadow-inner">
            {/* Sender Node */}
            <div className="flex items-center gap-2.5 text-zinc-100 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/5">
              <Bot className="w-4 h-4 text-[#7B5CFA]" />
              <span className="font-semibold">{f.from}</span>
            </div>
            
            {/* Directed Flow Arrow */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-zinc-400 font-mono tracking-wider">Signed Policy</span>
              <div className="flex items-center text-[#38E8F8]">
                <span className="h-[1px] w-6 bg-[#38E8F8]/50" />
                <ArrowRight className="w-4 h-4 -ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Recipient Node */}
            <div className="flex items-center gap-2.5 text-zinc-100 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/5">
              <Server className="w-4 h-4 text-[#38E8F8]" />
              <span className="font-semibold">{f.to}</span>
            </div>
          </div>

          {/* Guardrail Policy Footer */}
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1 border-t border-white/[0.06]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">Policy: {f.policy}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
