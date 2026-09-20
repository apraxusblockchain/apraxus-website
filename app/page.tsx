'use client';

import React from 'react';
import Link from 'next/link';
import { WebGLScene } from '@/components/canvas/WebGLScene';
import { LiveNetworkStats } from '@/components/ui/LiveNetworkStats';
import { AgentEnvelopeArchitecture } from '@/components/ui/AgentEnvelopeArchitecture';
import { ArchitectureViewer } from '@/components/ui/ArchitectureViewer';
import { DeveloperCodeExperience } from '@/components/ui/DeveloperCodeExperience';
import { PaymentFlow } from '@/components/ui/PaymentFlow';
import { BuildTimeline } from '@/components/ui/BuildTimeline';
import { StatusPill } from '@/components/ui/StatusPill';
import { 
  Bot, 
  Shield, 
  Cpu, 
  Zap, 
  Layers, 
  Terminal, 
  ArrowRight, 
  ChevronRight, 
  GitBranch, 
  Lock, 
  Sparkles,
  ArrowUpRight,
  Code2,
  Workflow,
  Network,
  KeyRound,
  FileCheck2,
  Fingerprint,
  Activity,
  Server,
  Database,
  Binary
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-[#7B5CFA] selection:text-white">
      {/* 1. Precision Static Ambient Architectural Backdrop */}
      <WebGLScene />

      {/* 2. Semantic Protocol Layer */}
      <div className="relative z-10">
        
        {/* ============================================================ */}
        {/* 01. HERO SECTION (100vh) */}
        {/* ============================================================ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-[#0D0C11]/90 px-4 py-2 text-xs font-mono backdrop-blur-xl shadow-2xl">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">TESTNET</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400">ARBITRUM SEPOLIA</span>
          </div>

          <p className="mt-10 text-xs font-mono uppercase tracking-[0.35em] text-zinc-500">
            APRAXUS
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-bold tracking-tight leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl font-sans">
            Infrastructure for the{' '}
            <span className="text-gradient-brand">Autonomous</span> Economy.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-xl">
            Infrastructure for autonomous software and machine-to-machine
            value, with agent-focused execution primitives, EVM wallet
            connectivity, and a live Arbitrum Sepolia testnet.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/network"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7B5CFA] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(123,92,250,0.35)] transition-all duration-300 hover:bg-[#6343EB] hover:shadow-[0_0_45px_rgba(123,92,250,0.55)] sm:w-auto"
            >
              <span>Explore Testnet</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/developers"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#0D0C11]/80 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:bg-[#14131A] sm:w-auto"
            >
              <Code2 className="h-4 w-4 text-[#7B5CFA]" />
              <span>Build with Apraxus</span>
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-500">
            <span>APXS TESTNET</span>
            <span>CHAIN ID 421614</span>
            <span>API v1</span>
            <span>DEVELOPER SANDBOX</span>
          </div>
        </section>

{/* 01.5 LIVE PROTOCOL METRICS & BENCHMARK BAR */}
        {/* ============================================================ */}
        <LiveNetworkStats />

        {/* ============================================================ */}
        {/* 02. WHAT IS APRAXUS */}
        {/* ============================================================ */}
        <section id="problem" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#7B5CFA] font-semibold">
                02 / What is Apraxus?
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Giving autonomous software a clearer path from intent to action.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                AI systems are becoming capable of planning and operating across
                complex workflows. Apraxus is being built as infrastructure for
                the next layer: helping autonomous software interact with wallets,
                payments and execution systems through defined interfaces and
                policy-aware workflows.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500">
                Today, Apraxus is available as a development and testnet
                environment on Arbitrum Sepolia, with APIs, SDK foundations,
                wallet connectivity and developer tooling available for testing.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7B5CFA]/30 bg-[#7B5CFA]/10 text-[#7B5CFA]">
                    <Fingerprint className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    Agent-aware infrastructure
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Interfaces designed around autonomous software, wallets,
                  payments and machine-to-machine workflows.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#38E8F8]/30 bg-[#38E8F8]/10 text-[#38E8F8]">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    Policy-aware execution
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  A foundation for expressing boundaries around how autonomous
                  workflows can interact with execution and payment systems.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                    <FileCheck2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    Developer-first tooling
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Testnet APIs, SDK foundations, sandbox tooling and wallet
                  connectivity for developers building and evaluating integrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 03. THE PROTOCOL THESIS */}
        {/* ============================================================ */}
        <section id="thesis" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold">
              03 / Protocol Thesis · Target Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
              The Autonomous Execution Pipeline
            </h2>
            <p className="text-sm text-zinc-400 mt-3">
              A target architecture for translating human intent into policy-aware machine actions and traceable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { step: '01', name: 'INTENT', desc: 'Human defines objective & budget', color: 'text-purple-200' },
              { step: '02', name: 'AGENT', desc: 'Autonomous loop generates steps', color: 'text-[#7B5CFA]' },
              { step: '03', name: 'POLICY', desc: 'Envelope validates spend ceiling', color: 'text-[#38E8F8]' },
              { step: '04', name: 'WALLET', desc: 'Ephemeral sub-key signs digest', color: 'text-cyan-300' },
              { step: '05', name: 'EXECUTION', desc: 'Execution layer processes the action', color: 'text-emerald-400' },
              { step: '06', name: 'RECEIPT', desc: 'Receipt records the execution outcome', color: 'text-emerald-300' },
            ].map((node) => (
              <div
                key={node.step}
                className="glass-card glass-card-hover p-5 rounded-2xl border border-white/[0.09] flex flex-col justify-between min-h-[150px] relative overflow-hidden group shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">{node.step}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7B5CFA]" />
                </div>
                <div className="my-2">
                  <span className={`text-sm font-bold font-mono block ${node.color}`}>{node.name}</span>
                  <span className="text-[11px] text-zinc-400 leading-tight block mt-1.5 font-sans">{node.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 04. AGENT INFRASTRUCTURE ARCHITECTURE */}
        {/* ============================================================ */}
        <section id="agents" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold">
              04 / Agent Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
              Policy-Aware Agent Workflows
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              Explore the target policy and wallet model for giving autonomous software defined boundaries around actions, spending and execution.
            </p>
          </div>

          <AgentEnvelopeArchitecture />
        </section>

        {/* ============================================================ */}
        {/* 05. PROGRAMMABLE PAYMENTS */}
        {/* ============================================================ */}
        <section id="payments" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#38E8F8] font-semibold">
              05 / Machine-to-Machine Payments
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
              Programmable Payments
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              A foundation for machine-to-machine value flows, with payment intents and testnet API infrastructure available for development.
            </p>
          </div>

          <PaymentFlow />
        </section>

        {/* ============================================================ */}
        {/* 06 & 07. TECHNOLOGY PROOF & ARCHITECTURE */}
        {/* ============================================================ */}
        <section id="tech" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold">
                06 / Technology
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
                Built Today. Designed for What Comes Next.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
                Apraxus separates verified testnet infrastructure from its longer-term protocol architecture, so developers can see what is available today and what is being designed next.
              </p>
            </div>
            <Link
              href="/technology"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7B5CFA] hover:text-white transition-colors"
            >
              <span>Full Technical Breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <ArchitectureViewer />
        </section>

        {/* ============================================================ */}
        {/* 08. DEVELOPER CODE EXPERIENCE */}
        {/* ============================================================ */}
        <section id="developers" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DeveloperCodeExperience />
        </section>

        {/* ============================================================ */}
        {/* 09 & 10. ROADMAP & BUILDING IN PUBLIC */}
        {/* ============================================================ */}
        <section id="build-log" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold">
                09 & 10 / Building in Public
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
                Engineering Milestone Evidence
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
                Every release links directly to commits, PRs, and verifiable technical deliverables.
              </p>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7B5CFA] hover:text-white transition-colors"
            >
              <span>View Full 9-Phase Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <BuildTimeline />
        </section>

        {/* ============================================================ */}
        {/* 11, 12, 13. SECURITY, ECOSYSTEM & FINAL CTA */}
        {/* ============================================================ */}
        <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-10 sm:p-18 rounded-3xl border border-white/[0.09] text-center relative overflow-hidden flex flex-col items-center shadow-2xl">
            {/* Ambient Radial Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7B5CFA]/15 blur-[140px] pointer-events-none rounded-full" />

            <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold mb-4">
              Build with Apraxus
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl font-sans mb-6">
              Build the infrastructure for autonomous software.
            </h2>

            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-10">
              Explore the live testnet, use the developer platform, and follow the work as Apraxus moves from testnet infrastructure toward a broader autonomous economy stack.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://github.com/apraxusblockchain/apraxus-website"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#7B5CFA] hover:bg-[#6343EB] text-white font-semibold text-sm transition-all shadow-[0_0_30px_rgba(123,92,250,0.5)] cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Explore on GitHub</span>
              </a>

              <Link
                href="/developers/docs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0D0C11]/80 hover:bg-[#14131A] text-white border border-white/10 font-semibold text-sm transition-all backdrop-blur-xl cursor-pointer"
              >
                <span>Read Developer Docs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
