'use client';

import React, { useState } from 'react';
import { Milestone } from '@/lib/constants';
import { StatusPill } from './StatusPill';
import { GitCommit, ExternalLink, Calendar, Filter } from 'lucide-react';

const MILESTONES: Milestone[] = [
  {
    id: 'testnet-01',
    number: 'Milestone #01',
    title: 'APXS Testnet Deployment',
    date: 'August 2026',
    summary: 'Deployed the APXS testnet token on Arbitrum Sepolia with a fixed 1 billion token supply and developer-facing contract verification.',
    status: 'SHIPPED',
    evidenceUrl: 'https://sepolia.arbiscan.io/token/0xFE16213961cb4f9B15301f730a5977b9A145add5',
    nextStep: 'Expand public testnet onboarding and developer documentation.',
    category: 'Network',
  },
  {
    id: 'liquidity-01',
    number: 'Milestone #02',
    title: 'Testnet Liquidity & Swap Infrastructure',
    date: 'August 2026',
    summary: 'Established APXS/WETH testnet liquidity and verified token swap flows on Arbitrum Sepolia for development and integration testing.',
    status: 'SHIPPED',
    evidenceUrl: 'https://sepolia.arbiscan.io/token/0xFE16213961cb4f9B15301f730a5977b9A145add5',
    nextStep: 'Continue testnet integration and developer workflow validation.',
    category: 'Core',
  },
  {
    id: 'platform-01',
    number: 'Milestone #03',
    title: 'Developer Platform & API v1',
    date: 'September 2026',
    summary: 'Released the Apraxus API v1 foundation, SDK foundation, developer sandbox, API key flow, metrics tooling and testnet documentation.',
    status: 'SHIPPED',
    evidenceUrl: 'https://github.com/apraxusblockchain/apraxus-website',
    nextStep: 'Improve developer onboarding and prepare the platform for broader testnet usage.',
    category: 'Core',
  },
];

export const BuildTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Core', 'Network'];

  const filtered = selectedCategory === 'ALL' 
    ? MILESTONES 
    : MILESTONES.filter(m => m.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* Category filter pills */}
      <div className="flex items-center gap-2 pb-2">
        <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-[#7B5CFA] text-white font-semibold shadow-[0_0_12px_rgba(123,92,250,0.4)]'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between gap-5 relative group"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#7B5CFA]">{m.number}</span>
                <StatusPill status={m.status} />
              </div>

              <h3 className="text-sm font-bold text-white font-mono leading-snug group-hover:text-purple-300 transition-colors">
                {m.title}
              </h3>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{m.date}</span>
                </div>
                <span className="bg-white/5 px-2 py-0.5 rounded text-zinc-400">{m.category}</span>
              </div>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
                {m.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
              <div className="text-[11px] font-mono text-zinc-400">
                <span className="text-[#7B5CFA]">Next step:</span> {m.nextStep}
              </div>

              {m.evidenceUrl && (
                <a
                  href={m.evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#38E8F8] hover:text-cyan-300 transition-colors pt-1"
                >
                  <GitCommit className="w-3.5 h-3.5" />
                  <span>View Evidence</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
