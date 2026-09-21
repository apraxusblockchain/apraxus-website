import React from 'react';
import { Bot, Cpu, Layers, Workflow, Shield, Globe } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';

export const metadata = {
  title: 'Ecosystem | Apraxus',
  description: 'Projects, integrations, and categories building on the Apraxus autonomous economy layer.',
};

const CATEGORIES = [
  { name: 'Autonomous Agents', icon: Bot, count: 'Early Builders' },
  { name: 'Machine Payments & APIs', icon: Cpu, count: 'Spec Stage' },
  { name: 'DeFi & Escrow Relays', icon: Layers, count: 'Planned' },
  { name: 'Developer Tooling & SDKs', icon: Workflow, count: 'Prototype' },
  { name: 'Autonomous Hardware / IoT', icon: Globe, count: 'Research' },
  { name: 'Security & Verification', icon: Shield, count: 'Active' },
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <span>Ecosystem Matrix</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Autonomous Ecosystem
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            We are designing the protocol foundation to support thousands of interoperable machine agents, payment gateways, and autonomous service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[160px]">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#77727D] bg-white/5 px-2 py-1 rounded">{cat.count}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono">{cat.name}</h3>
                  <p className="text-xs text-[#77727D] mt-1">Ecosystem application category ready for public testnet integration.</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
