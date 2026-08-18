import React from 'react';
import { BookOpen, FileText, ChevronRight, Terminal, Shield, Key, Cpu, Zap } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';

export const metadata = {
  title: 'Documentation | Apraxus',
  description: 'Complete technical reference and architecture documentation for Apraxus.',
};

const DOC_SECTIONS = [
  {
    title: 'Core Concepts',
    items: ['Protocol Overview', 'Autonomous Agent Thesis', 'Policy Envelope Model', 'Deterministic Verifiability']
  },
  {
    title: 'Architecture',
    items: ['Block Structure (Rust)', 'State Merkle Tree', 'Ed25519 Cryptography', 'Tokio P2P Transport']
  },
  {
    title: 'Agent Infrastructure',
    items: ['Agent Sub-Key Derivation', 'Spending Ceilings & Time-Windows', 'Destination Allowlisting', 'Emergency Revocation']
  },
  {
    title: 'Payments & Channels',
    items: ['M2M Micro-Transactions', 'Agent Escrow Contracts', 'Settlement Receipts', 'Fee Economics (TBD)']
  },
  {
    title: 'Tools & Node Ops',
    items: ['Local Node CLI', 'Rust SDK (Spec)', 'TypeScript SDK (Spec)', 'Single-Node Test Harness']
  },
  {
    title: 'Security & Disclosure',
    items: ['Zero-Trust Threat Model', 'Replay Protection', 'Responsible Vulnerability Disclosure', 'Audit Roadmap']
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <span>Knowledge Base</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Technical Documentation
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            Comprehensive specifications, developer guides, and architecture references for building on the Apraxus protocol.
          </p>
        </div>

        {/* Documentation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOC_SECTIONS.map((sec) => (
            <div key={sec.title} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4">
              <h3 className="text-base font-bold text-white font-mono border-b border-white/5 pb-3">
                {sec.title}
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs font-mono">
                {sec.items.map((item) => (
                  <li key={item} className="flex items-center justify-between text-[#77727D] hover:text-white transition-colors cursor-pointer group">
                    <span className="group-hover:translate-x-1 transition-transform">▹ {item}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
