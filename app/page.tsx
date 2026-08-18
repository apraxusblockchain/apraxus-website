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
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          {/* Active Phase Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D0C11]/90 border border-white/[0.1] text-xs font-mono text-[#7B5CFA] mb-8 backdrop-blur-xl shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-200 font-semibold">Phase 02: Core Blockchain Prototype</span>
            <span className="text-zinc-500">•</span>
            <span className="text-emerald-400 font-semibold">Building in Public</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-[1.05] mb-7 font-sans">
            Infrastructure for the{' '}
            <span className="text-gradient-brand">Autonomous</span> Economy.
          </h1>

          {/* Subtitle / Positioning Thesis */}
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl font-sans font-normal leading-relaxed mb-10">
            A high-throughput blockchain engineered in native Rust for AI agents, programmable payments, and secure machine-to-machine transactions under deterministic cryptographic policy bounds.
          </p>

          {/* Master Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#thesis"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#7B5CFA] hover:bg-[#6343EB] text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(123,92,250,0.4)] hover:shadow-[0_0_45px_rgba(123,92,250,0.7)] cursor-pointer"
            >
              <span>Explore the Protocol Thesis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/technology"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0D0C11]/80 hover:bg-[#14131A] text-white border border-white/10 font-semibold text-sm transition-all backdrop-blur-xl shadow-lg cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[#7B5CFA]" />
              <span>Rust Core Prototype</span>
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 01.5 LIVE PROTOCOL METRICS & BENCHMARK BAR */}
        {/* ============================================================ */}
        <LiveNetworkStats />

        {/* ============================================================ */}
        {/* 02. THE PROBLEM (High Contrast Industrial Framing) */}
        {/* ============================================================ */}
        <section id="problem" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 sm:p-14 rounded-3xl border border-white/[0.09] relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold">
                02 / The Core Problem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-3 mb-6 font-sans">
                AI can think. But it still lacks infrastructure to act safely.
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-10">
                Today’s AI models can plan multi-step workflows, generate software, and orchestrate complex tasks. But when given a private key or API token, existing blockchains provide binary authority — either total access or none. If an agent experiences a prompt injection or hallucinates, funds are irreversibly drained.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
              <div className="flex flex-col gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#7B5CFA]/15 border border-[#7B5CFA]/30 flex items-center justify-center text-[#7B5CFA] mb-1">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white font-mono">Agent Identity Primitives</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Cryptographic sub-identities derived via Ed25519 linked to human master keys with mathematical boundaries on authorized signing domains.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#38E8F8]/15 border border-[#38E8F8]/30 flex items-center justify-center text-[#38E8F8] mb-1">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white font-mono">Deterministic Envelopes</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Hard protocol bounds enforcing spend rates, destination address allowlists, asset constraints, and auto-revocation triggers.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white font-mono">Verifiable State Receipts</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Cryptographic execution proofs and audit logs sealed directly into the Apraxus Merkle state tree for offline dispute resolution.
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
              03 / Protocol Thesis
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
              The Autonomous Execution Pipeline
            </h2>
            <p className="text-sm text-zinc-400 mt-3">
              How human intent safely translates into verifiable, bounded machine execution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { step: '01', name: 'INTENT', desc: 'Human defines objective & budget', color: 'text-purple-200' },
              { step: '02', name: 'AGENT', desc: 'Autonomous loop generates steps', color: 'text-[#7B5CFA]' },
              { step: '03', name: 'POLICY', desc: 'Envelope validates spend ceiling', color: 'text-[#38E8F8]' },
              { step: '04', name: 'WALLET', desc: 'Ephemeral sub-key signs digest', color: 'text-cyan-300' },
              { step: '05', name: 'EXECUTION', desc: 'Rust validator verifies & commits', color: 'text-emerald-400' },
              { step: '06', name: 'RECEIPT', desc: 'State Merkle proof generated', color: 'text-emerald-300' },
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
              04 / Agent Infrastructure Layer
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
              Cryptographic Policy Envelopes
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              Inspect the native cryptographic primitives, delegated key hierarchies, and deterministic spend ceilings powering Apraxus agent sandboxes.
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
              05 / Programmable Settlement
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
              Machine-to-Machine Payment Channels
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              High-throughput, sub-second payment primitives designed for autonomous agent delegation and hardware settlement.
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
                06 & 07 / Technology & Architecture
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 font-sans">
                Real Engineering vs Target Architecture
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
                We strictly separate completed Rust prototype deliverables from the long-term protocol specification.
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
              13 / Final Principle
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl font-sans mb-6">
              The autonomous economy needs infrastructure.
            </h2>

            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-10">
              Apraxus is being engineered in public, one layer at a time. Join the developers, researchers, and builders shaping the machine layer.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#7B5CFA] hover:bg-[#6343EB] text-white font-semibold text-sm transition-all shadow-[0_0_30px_rgba(123,92,250,0.5)] cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Follow Development on GitHub</span>
              </a>

              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0D0C11]/80 hover:bg-[#14131A] text-white border border-white/10 font-semibold text-sm transition-all backdrop-blur-xl cursor-pointer"
              >
                <span>Read Architecture Docs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
