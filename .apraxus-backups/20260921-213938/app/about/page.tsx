import React from 'react';
import { Bot, Shield, Terminal, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About & Thesis | Apraxus',
  description: 'The vision, thesis, and principles behind the Apraxus blockchain protocol.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <span>Protocol Thesis</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Building the Infrastructure for Autonomous Systems
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            Apraxus was born from a fundamental observation: as autonomous software agents proliferate, they require a native economic operating system that combines cryptographic authority with strict policy boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col gap-4">
            <h2 className="text-xl font-bold font-mono text-white">Our Principles</h2>
            <ul className="flex flex-col gap-3 text-sm text-[#77727D] font-sans">
              <li><strong className="text-white">Real Engineering as Proof:</strong> We build in public and link directly to code. We never invent fake metrics or hype speculative partnerships.</li>
              <li><strong className="text-white">Zero-Trust Agent Guardrails:</strong> Autonomous systems should never hold unbounded financial authority. Every action is enveloped in deterministic policy.</li>
              <li><strong className="text-white">Sub-Second Machine Settlement:</strong> Payment rails built from scratch for low-latency machine-to-machine interactions.</li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold font-mono text-white mb-2">Join the Movement</h2>
              <p className="text-sm text-[#77727D] leading-relaxed">
                Whether you are developing autonomous agent frameworks, researching cryptographic spend policies, or building machine infrastructure, we welcome your contributions.
              </p>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#6B35D5] hover:bg-[#8A5CE6] text-white font-semibold text-sm transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Contribute on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
