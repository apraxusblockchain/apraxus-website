'use client';

import React, { useState } from 'react';
import { Activity, Code2, CreditCard, LockKeyhole, Network, ShieldCheck, Wallet } from 'lucide-react';
import { StatusPill } from './StatusPill';

export const ArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'target'>('current');

  const currentLayers = [
    {
      title: 'Developer SDK & API v1',
      status: 'SHIPPED' as const,
      icon: Code2,
      desc: 'TypeScript client for health, payment intents, quotes, execution intents, and sandbox simulation.',
      code: 'lib/sdk/*',
    },
    {
      title: 'Policy Engine',
      status: 'SHIPPED' as const,
      icon: ShieldCheck,
      desc: 'Validates payment amount, per-transaction limits, daily limits, and destination address validity before execution.',
      code: 'lib/policy/engine.ts',
    },
    {
      title: 'Execution Lifecycle',
      status: 'SHIPPED' as const,
      icon: Activity,
      desc: 'Tracks submitted, confirmed, reverted, and failed execution states with transaction receipts.',
      code: 'lib/execution/*',
    },
    {
      title: 'APXS Payment Engine',
      status: 'SHIPPED' as const,
      icon: CreditCard,
      desc: 'Executes ERC-20 APXS transfers through a connected wallet and waits for on-chain confirmation.',
      code: 'lib/payment/engine.ts',
    },
    {
      title: 'Wallet & EVM Integration',
      status: 'SHIPPED' as const,
      icon: Wallet,
      desc: 'Viem, Wagmi, MetaMask, Arbitrum Sepolia, and BNB Testnet integrations for development and testnet execution.',
      code: 'lib/web3/*',
    },
    {
      title: 'Swap & Liquidity Infrastructure',
      status: 'SHIPPED' as const,
      icon: Network,
      desc: 'APXS/WETH Uniswap v4 quote, router, Permit2, pool state, and liquidity-position integrations on Arbitrum Sepolia.',
      code: 'lib/web3/apxs-swap.ts',
    },
  ];

  const targetLayers = [
    {
      title: 'Autonomous Application Layer',
      status: 'PLANNED' as const,
      desc: 'Agent-driven applications, machine-to-machine services, automated payment workflows, and autonomous economic coordination.',
    },
    {
      title: 'Agent Identity & Delegated Authority',
      status: 'PLANNED' as const,
      desc: 'Cryptographic agent identities, delegated keys, scoped authority, key rotation, and revocation mechanisms.',
    },
    {
      title: 'Policy & Authorization Infrastructure',
      status: 'UNDER_DEVELOPMENT' as const,
      desc: 'Evolving the current policy engine toward richer authorization envelopes, destination controls, escalation rules, and durable policy state.',
    },
    {
      title: 'Autonomous Execution',
      status: 'PLANNED' as const,
      desc: 'Future execution architecture designed to reduce dependence on interactive wallet confirmation while preserving explicit policy boundaries.',
    },
    {
      title: 'Multi-Chain Execution',
      status: 'PLANNED' as const,
      desc: 'Expanded execution and payment infrastructure across additional EVM networks and future supported environments.',
    },
    {
      title: 'Protocol-Owned Network Infrastructure',
      status: 'PLANNED' as const,
      desc: 'Long-term research into dedicated network, node, state, consensus, and protocol execution infrastructure.',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'current'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(107,53,213,0.3)]'
                : 'text-[#77727D] hover:text-white bg-white/[0.02]'
            }`}
          >
            Current Implementation
          </button>

          <button
            onClick={() => setActiveTab('target')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'target'
                ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                : 'text-[#77727D] hover:text-white bg-white/[0.02]'
            }`}
          >
            Target Architecture
          </button>
        </div>

        <span className="hidden sm:inline-block text-xs font-mono text-[#77727D]">
          {activeTab === 'current'
            ? 'Repository-backed implementation surface'
            : 'Long-term protocol direction'}
        </span>
      </div>

      {activeTab === 'current' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentLayers.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-purple-300" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white">
                      {item.title}
                    </span>
                  </div>
                  <StatusPill status={item.status} />
                </div>

                <p className="text-xs text-[#77727D] leading-relaxed">
                  {item.desc}
                </p>

                <div className="text-[11px] font-mono text-purple-300/80 bg-black/40 p-2 rounded border border-white/5">
                  {item.code}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'target' && (
        <div className="flex flex-col gap-3">
          {targetLayers.map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono font-bold text-white">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#77727D] leading-relaxed max-w-4xl">
                  {item.desc}
                </span>
              </div>

              <StatusPill status={item.status} />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.015]">
        <LockKeyhole className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" />
        <p className="text-[11px] text-[#77727D] leading-relaxed">
          Status labels describe the current state of the Apraxus repository and
          product architecture. Target and research items are not represented as
          production functionality.
        </p>
      </div>
    </div>
  );
};
