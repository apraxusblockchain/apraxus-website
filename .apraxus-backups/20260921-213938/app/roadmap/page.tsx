import React from 'react';
import { RoadmapTimeline } from '@/components/ui/RoadmapTimeline';
import { BuildTimeline } from '@/components/ui/BuildTimeline';
import { GitBranch, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Roadmap & Build In Public | Apraxus',
  description: '9-phase engineering roadmap and transparent build-in-public milestone timeline for Apraxus.',
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <span>Engineering Trajectory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Roadmap & Development Log
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            We do not publish speculative launch dates. Instead, we track milestone completion against concrete engineering deliverables and commit evidence.
          </p>
        </div>

        {/* Build in Public Section */}
        <div id="build-log" className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <GitBranch className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold font-mono text-white">Shipped Milestone Evidence</h2>
          </div>
          <BuildTimeline />
        </div>

        {/* 9-Phase Master Roadmap */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Sparkles className="w-5 h-5 text-[#8A5CE6]" />
            <h2 className="text-xl font-bold font-mono text-white">9-Phase Protocol Roadmap</h2>
          </div>
          <RoadmapTimeline />
        </div>
      </div>
    </div>
  );
}
