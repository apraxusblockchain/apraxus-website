'use client';

import React, { useState } from 'react';
import { Milestone } from '@/lib/constants';
import { StatusPill } from './StatusPill';
import { GitCommit, ExternalLink, Calendar, Filter, Sparkles } from 'lucide-react';

const MILESTONES: Milestone[] = [
  {
    id: 'dev-03',
    number: 'Development #03',
    title: 'Ed25519 Cryptographic Verification Pipeline & Replay Defense',
    date: 'August 2026',
    summary: 'Implemented deterministic signature verification routines and sequential nonce ordering inside the transaction validation pool to eliminate replay vectors.',
    status: 'SHIPPED',
    evidenceUrl: 'https://github.com/apraxusblockchain/apraxus-website',
    nextStep: 'Complete asynchronous TCP peer handshake protocol in Tokio.',
    category: 'Cryptography',
  },
  {
    id: 'dev-02',
    number: 'Development #02',
    title: 'Immutable Block Data Structures & Merkle Tree Root Hashing',
    date: 'July 2026',
    summary: 'Built the core Rust block header representation, bincode transaction serializer, and Merkle tree state accumulator for sub-second receipt generation.',
    status: 'SHIPPED',
    evidenceUrl: 'https://github.com/apraxusblockchain/apraxus-website',
    nextStep: 'Integrate cryptographic transaction verification.',
    category: 'Core',
  },
  {
    id: 'dev-01',
    number: 'Development #01',
    title: 'Genesis Architecture & Protocol Master Specification',
    date: 'June 2026',
    summary: 'Authored the formal Apraxus technical blueprint detailing autonomous agent policy bounds, tokenless initial testbed, and M2M settlement thesis.',
    status: 'SHIPPED',
    evidenceUrl: 'https://github.com/apraxusblockchain/apraxus-website',
    nextStep: 'Initialize core Rust blockchain repository.',
    category: 'Specification',
  },
];

export const BuildTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Core', 'Cryptography', 'Specification'];

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
                  <span>View Commit Evidence</span>
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
