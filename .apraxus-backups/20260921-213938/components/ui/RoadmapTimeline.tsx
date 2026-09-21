import React from 'react';
import { StatusPill, StatusType } from './StatusPill';


interface PhaseItem {
  number: string;
  title: string;
  status: StatusType;
  desc: string;
  items: string[];
}

const PHASES: PhaseItem[] = [
  {
    number: '01',
    title: 'Foundation',
    status: 'SHIPPED',
    desc: 'Established the Apraxus product foundation, brand system, protocol thesis and initial technical direction.',
    items: ['Protocol Thesis & Product Direction', 'Website & Brand System', 'Initial Architecture Documentation'],
  },
  {
    number: '02',
    title: 'Native Chain Exploration',
    status: 'PLANNED',
    desc: 'Exploration of a future Apraxus-owned blockchain architecture. This track is intentionally frozen while the testnet product is developed on Arbitrum.',
    items: ['Native Chain Architecture Research', 'Consensus & Network Design', 'Future Execution Layer Exploration'],
  },
  {
    number: '03',
    title: 'Agent Economy Architecture',
    status: 'PLANNED',
    desc: 'Longer-term agent economy and autonomous execution architecture. Productization is deferred while the current developer and testnet foundation is validated.',
    items: ['Agent Policy Model', 'Autonomous Execution Architecture', 'Machine-to-Machine Economy Design'],
  },
  {
    number: '04',
    title: 'APXS Testnet & Liquidity',
    status: 'SHIPPED',
    desc: 'Deployed APXS on Arbitrum Sepolia and established testnet liquidity and swap infrastructure for development and integration testing.',
    items: ['APXS Testnet Contract', 'APXS/WETH Test Liquidity', 'Verified Testnet Swap Flows'],
  },
  {
    number: '05',
    title: 'Developer Platform',
    status: 'SHIPPED',
    desc: 'Built the first developer-facing platform with API v1, SDK foundations, API keys, sandbox workflows, metrics and developer dashboard tooling.',
    items: ['API v1 & Authentication', 'SDK Foundation', 'Developer Sandbox & Metrics'],
  },
  {
    number: '06',
    title: 'Public Testnet Readiness',
    status: 'UNDER_DEVELOPMENT',
    desc: 'Improve onboarding and documentation around the live Arbitrum Sepolia environment so developers can discover, test and integrate Apraxus.',
    items: ['Testnet Quickstart', 'Wallet & Network Onboarding', 'Developer Documentation & Evidence'],
  },
  {
    number: '07',
    title: 'Funding & Ecosystem',
    status: 'PLANNED',
    desc: 'Prepare the project for external funding, strategic partnerships and broader developer adoption using the verified testnet foundation.',
    items: ['Investor Materials', 'Technical & Product Evidence', 'Early Ecosystem Outreach'],
  },
  {
    number: '08',
    title: 'Security & Production Readiness',
    status: 'PLANNED',
    desc: 'Strengthen the platform through security review, infrastructure hardening, operational controls and production readiness work.',
    items: ['Security Review', 'Infrastructure Hardening', 'Production Controls'],
  },
  {
    number: '09',
    title: 'Mainnet & Scale',
    status: 'PLANNED',
    desc: 'Future production expansion, subject to technical validation, security review, funding and ecosystem readiness.',
    items: ['Production Network Strategy', 'Mainnet Infrastructure', 'Ecosystem Expansion'],
  },
];

export const RoadmapTimeline: React.FC = () => {
  return (
    <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
      {PHASES.map((phase, idx) => (
        <div key={phase.number} className="relative group">
          {/* Node dot on line */}
          <div
            className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              phase.status === 'SHIPPED'
                ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : phase.status === 'UNDER_DEVELOPMENT'
                ? 'bg-purple-600 border-purple-400 animate-pulse shadow-[0_0_15px_rgba(138,92,230,0.6)]'
                : phase.status === 'TESTING'
                ? 'bg-cyan-500 border-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : 'bg-[#111014] border-white/20'
            }`}
          />

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-purple-400">{phase.number}</span>
                <h3 className="text-lg font-bold text-white font-mono">{phase.title}</h3>
              </div>
              <StatusPill status={phase.status} />
            </div>

            <p className="text-xs sm:text-sm text-[#77727D] font-sans leading-relaxed">
              {phase.desc}
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="text-purple-400 text-xs">▹</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
