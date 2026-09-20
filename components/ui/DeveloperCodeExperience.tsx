'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, ArrowRight, ShieldCheck, Sparkles, Layers, Cpu } from 'lucide-react';
import { StatusPill } from './StatusPill';

const CODE_EXAMPLES = {
  typescript: {
    filename: 'apraxus-client.ts',
    lang: 'TypeScript SDK',
    code: `import { createApraxusClient } from '@apraxus/sdk';

const client = createApraxusClient('apx_your_api_key');

const health = await client.health();

console.log(health);`
  },
  curl: {
    filename: 'health.sh',
    lang: 'API / cURL',
    code: `curl https://apraxus-website.vercel.app/api/v1/health

# {
#   "service": "Apraxus API",
#   "version": "v1",
#   "status": "operational",
#   "network": "arbitrum-sepolia"
# }`
  },
  sandbox: {
    filename: 'sandbox.json',
    lang: 'Sandbox',
    code: `POST /api/v1/sandbox

{
  "action": "payment",
  "agentId": "agent_demo_01",
  "token": "APXS",
  "amount": "10"
}

# Testnet simulation only.`
  }
};

export const DeveloperCodeExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'typescript' | 'curl' | 'sandbox'>('typescript');
  const [copied, setCopied] = useState(false);

  const currentSnippet = CODE_EXAMPLES[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-[#7B5CFA]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left column: Developer messaging */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#38E8F8]" />
              Developer Experience
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Build with the Apraxus Developer Platform
            </h3>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Use the Apraxus API and SDK foundation to build and test agent-oriented payments, quotes and execution workflows on Arbitrum Sepolia.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-[#7B5CFA]/20 text-[#7B5CFA] flex items-center justify-center font-bold text-[11px]">1</span>
              <span>API v1 developer interface</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-[#38E8F8]/20 text-[#38E8F8] flex items-center justify-center font-bold text-[11px]">2</span>
              <span>Testnet payment and quote workflows</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">3</span>
              <span>Sandbox-based integration testing</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="/developers/docs"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#7B5CFA] hover:text-white transition-colors"
            >
              <span>Explore Developer Documentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right column: Interactive Code Terminal */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Terminal Tabs Bar */}
          <div className="flex items-center justify-between bg-[#070709] px-4 py-2.5 rounded-t-2xl border border-white/[0.08] border-b-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>

              {(['typescript', 'curl', 'sandbox'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === tab
                      ? 'bg-[#7B5CFA]/30 text-white border border-[#7B5CFA]/40 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {CODE_EXAMPLES[tab].lang}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
              title="Copy Code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Terminal Code Body */}
          <div className="bg-[#050507] p-5 rounded-b-2xl border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed shadow-inner max-h-[360px]">
            <pre>{currentSnippet.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
