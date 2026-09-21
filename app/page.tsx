'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Code2,
  FileText,
  Fingerprint,
  GitBranch,
  LockKeyhole,
  Network,
  ReceiptText,
  ShieldCheck,
  Wallet,
  Zap,
} from 'lucide-react';

import { WebGLScene } from '@/components/canvas/WebGLScene';
import { SectionRail } from '@/components/ui/SectionRail';

const EXECUTION_STEPS = [
  {
    number: '01',
    title: 'Intent',
    description: 'A human or system defines the objective.',
    icon: Fingerprint,
  },
  {
    number: '02',
    title: 'Agent',
    description: 'Autonomous software plans the required actions.',
    icon: Bot,
  },
  {
    number: '03',
    title: 'Policy',
    description: 'Rules define what the agent is authorized to do.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Wallet',
    description: 'Controlled value is exposed through wallet authority.',
    icon: Wallet,
  },
  {
    number: '05',
    title: 'Execution',
    description: 'The authorized action is submitted to the execution layer.',
    icon: Zap,
  },
  {
    number: '06',
    title: 'Receipt',
    description: 'The resulting action and outcome become traceable.',
    icon: ReceiptText,
  },
];

const CURRENT_CAPABILITIES = [
  'APXS deployed on Arbitrum Sepolia',
  'APXS / WETH test liquidity and verified swaps',
  'API v1 for development and testnet workflows',
  'TypeScript SDK foundation',
  'Simulation sandbox and developer dashboard',
  'Wallet-connected APXS testnet interactions',
];

const FUTURE_CAPABILITIES = [
  'Native Apraxus network',
  'Protocol-level agent identity',
  'Policy-aware execution at the protocol layer',
  'Native consensus and state architecture',
  'Autonomous machine-to-machine economy',
  'Broader cross-network execution',
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[#0A0A0D] text-white">
      {/* ============================================================
          SIGNATURE BACKGROUND
      ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[900px]"
      >
        <WebGLScene />
      </div>

      <SectionRail />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[900px] bg-[radial-gradient(circle_at_50%_25%,rgba(107,53,213,0.13),transparent_36%),linear-gradient(to_bottom,rgba(10,10,13,0.12),#0A0A0D_92%)]"
      />

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative z-10 min-h-[calc(100vh-76px)] pt-32 sm:pt-36 lg:pt-40">
        <div className="apx-container">
          <div className="mx-auto flex max-w-[1120px] flex-col items-center text-center">
            <div className="apx-status">
              <span className="apx-status-dot" />
              <span>Development &amp; Testnet</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-400">
                Arbitrum Sepolia
              </span>
            </div>

            <p className="mt-9 text-[10px] font-mono font-medium uppercase tracking-[0.32em] text-zinc-600 sm:text-[11px]">
              APRAXUS PROTOCOL
            </p>

            <h1 className="apx-display mt-6 max-w-[1080px] text-[48px] sm:text-[64px] md:text-[78px] lg:text-[96px]">
              Infrastructure for the
              <span className="block bg-gradient-to-r from-white via-[#D8C8FF] to-[#8A5CE6] bg-clip-text text-transparent">
                Autonomous Economy.
              </span>
            </h1>

            <p className="mt-8 max-w-[700px] text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              Apraxus is building infrastructure for autonomous software to
              interact with wallets, policies, payments and execution systems
              through defined and verifiable interfaces.
            </p>

            <p className="mt-4 max-w-[650px] text-sm leading-6 text-zinc-600">
              Today: development infrastructure and APXS testnet on Arbitrum
              Sepolia. The broader autonomous economy protocol remains under
              development.
            </p>

            <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/network"
                className="apx-button-primary w-full sm:w-auto"
              >
                Explore Testnet
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/developers"
                className="apx-button-secondary w-full sm:w-auto"
              >
                Build with Apraxus
                <Code2 className="h-4 w-4 text-[#9C7BEA]" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[10px] font-mono uppercase tracking-[0.12em] text-zinc-600">
              <span>APXS</span>
              <span>CHAIN 421614</span>
              <span>API V1</span>
              <span>SDK</span>
              <span>SANDBOX</span>
            </div>
          </div>

          {/* Hero protocol visual */}
          <div className="relative mx-auto mt-20 max-w-[1080px]">
            <div
              aria-hidden="true"
              className="apx-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
            />

            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0D0C10]/80 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-zinc-700" />
                    <span className="h-2 w-2 rounded-full bg-zinc-700" />
                    <span className="h-2 w-2 rounded-full bg-zinc-700" />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-600">
                    execution model
                  </span>
                </div>

                <span className="text-[10px] font-mono text-zinc-700">
                  TARGET ARCHITECTURE
                </span>
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-6">
                {EXECUTION_STEPS.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="relative min-h-[150px] border-b border-white/[0.06] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-zinc-700">
                          {step.number}
                        </span>

                        <Icon className="h-4 w-4 text-[#6B35D5]" />
                      </div>

                      <div className="mt-9">
                        <div className="text-sm font-semibold text-zinc-200">
                          {step.title}
                        </div>

                        <p className="mt-2 text-[10px] leading-5 text-zinc-600">
                          {step.description}
                        </p>
                      </div>

                      {index < EXECUTION_STEPS.length - 1 && (
                        <ChevronRight className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full border border-white/[0.08] bg-[#111014] p-0.5 text-zinc-600 md:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROBLEM / THESIS
      ============================================================ */}
      <section id="authority-gap" className="apx-section relative z-10">
        <div className="apx-container">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
            <div>
              <span className="apx-eyebrow">01 / The authority gap</span>

              <h2 className="apx-heading mt-6 max-w-[650px] text-4xl sm:text-5xl lg:text-6xl">
                Software can reason.
                <span className="mt-2 block text-zinc-500">
                  It still needs bounded authority to act.
                </span>
              </h2>
            </div>

            <div className="lg:pt-10">
              <p className="apx-body max-w-[680px] text-base sm:text-lg">
                Autonomous software is becoming capable of planning complex
                workflows, coordinating services and making decisions.
                The harder problem begins when those decisions need to
                interact with value, wallets or external execution systems.
              </p>

              <p className="mt-5 max-w-[680px] text-sm leading-7 text-zinc-500">
                The missing layer is not simply intelligence. It is a
                structured boundary between what an agent intends to do and
                what it is actually authorized to do.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-4 lg:grid-cols-3">
            {[
              {
                index: "01",
                title: "Autonomy",
                subtitle: "Intent & coordination",
                text: "Agents can reason about objectives, coordinate workflows and determine the next action required to complete a task.",
                icon: Bot,
              },
              {
                index: "02",
                title: "Authority",
                subtitle: "Bounded permission",
                text: "Execution requires explicit boundaries around assets, spending, destinations and permitted actions.",
                icon: LockKeyhole,
              },
              {
                index: "03",
                title: "Verification",
                subtitle: "Traceable execution",
                text: "Systems need clear outcomes and receipts so operators and software can understand what was requested and what actually happened.",
                icon: ReceiptText,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.index}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0C10] p-7 transition-colors duration-300 hover:border-[#6B35D5]/30 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600">
                      {item.index}
                    </span>

                    <Icon className="h-5 w-5 text-[#8A5CE6]" />
                  </div>

                  <div className="mt-14">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A5CE6]">
                      {item.subtitle}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-zinc-500">
                      {item.text}
                    </p>
                  </div>

                  <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#6B35D5]/[0.06] blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                The boundary
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Intent alone should not become unrestricted execution.
              </p>
            </div>

            <div className="hidden h-px w-16 bg-gradient-to-r from-transparent via-[#6B35D5]/60 to-transparent lg:block" />

            <div className="lg:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Apraxus direction
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Connect intent to controlled, policy-aware execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CURRENT / FUTURE SPLIT
      ============================================================ */}
      <section id="current-state" className="relative z-10 pb-28 sm:pb-36">
        <div className="apx-container">
          <div className="apx-divider" />

          <div className="grid gap-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#6B35D5]/20 bg-[#100D17] p-7 sm:p-9 lg:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6B35D5]/10 blur-3xl"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="apx-eyebrow text-[#B79AF4]">
                    Current / verified
                  </span>

                  <span className="apx-status">
                    <span className="apx-status-dot" />
                    Testnet
                  </span>
                </div>

                <h2 className="apx-heading mt-6 max-w-xl text-3xl sm:text-4xl">
                  Infrastructure you can
                  <span className="block text-zinc-400">
                    actually interact with today.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">
                  Apraxus currently operates as a development and testnet
                  environment on Arbitrum Sepolia. The components below
                  represent implemented infrastructure rather than claims
                  about a production autonomous economy.
                </p>

                <div className="mt-9 space-y-2.5">
                  {CURRENT_CAPABILITIES.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3.5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6B35D5]/15 text-[#B79AF4]">
                        <Check className="h-3 w-3" />
                      </span>

                      <div className="min-w-0">
                        <span className="font-mono text-[10px] tracking-[0.12em] text-zinc-700">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-0.5 text-sm leading-6 text-zinc-300">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/network"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#B79AF4] transition-colors hover:text-white"
                >
                  Inspect the testnet
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0D0C10] p-7 sm:p-9 lg:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(138,92,230,0.06),transparent_34%)]"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="apx-eyebrow text-zinc-500">
                    Future / research
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                    Not live
                  </span>
                </div>

                <h2 className="apx-heading mt-6 max-w-xl text-3xl text-zinc-400 sm:text-4xl">
                  Architecture being designed
                  <span className="block text-zinc-600">
                    beyond the current testnet.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">
                  These capabilities describe the longer-term Apraxus
                  protocol direction. They are separated from the current
                  implementation and should not be interpreted as deployed
                  production functionality.
                </p>

                <div className="mt-9 space-y-2.5">
                  {FUTURE_CAPABILITIES.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-xl border border-white/[0.055] bg-white/[0.012] px-4 py-3.5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/[0.09]">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                      </span>

                      <div className="min-w-0">
                        <span className="font-mono text-[10px] tracking-[0.12em] text-zinc-800">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-0.5 text-sm leading-6 text-zinc-600">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/technology"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
                >
                  Explore the architecture
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
            {[
              {
                label: "Environment",
                value: "Arbitrum Sepolia",
              },
              {
                label: "APXS",
                value: "Testnet asset",
              },
              {
                label: "Protocol status",
                value: "Development",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#0B0A0E] px-5 py-5 sm:px-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-300">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          AGENT INFRASTRUCTURE
      ============================================================ */}
      <section id="agent-infrastructure" className="relative z-10 overflow-hidden border-y border-white/[0.07] bg-[#0D0C10] py-28 sm:py-36">
        <div
          aria-hidden="true"
          className="apx-grid absolute inset-x-0 top-0 h-[560px] opacity-40"
        />

        <div className="apx-container relative">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="apx-eyebrow">
                  Agent infrastructure
                </span>

                <span className="apx-status">
                  Target architecture
                </span>
              </div>

              <h2 className="apx-heading mt-6 text-4xl sm:text-5xl">
                Give autonomous software
                <span className="block text-zinc-500">
                  boundaries before authority.
                </span>
              </h2>

              <p className="apx-body mt-6 max-w-xl text-base">
                The longer-term Apraxus model explores how an autonomous agent
                can receive explicit, bounded authority without turning its
                ability to act into unrestricted control over value.
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">
                The policy envelope is a target architecture: identity,
                spending limits, asset and destination allowlists, permitted
                actions, escalation thresholds and revocation can define the
                boundary around execution.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2.5">
                {[
                  "Cryptographic identity",
                  "Bounded spending",
                  "Asset controls",
                  "Destination controls",
                  "Action permissions",
                  "Human escalation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 text-[11px] text-zinc-500"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/agents"
                className="apx-button-secondary mt-9"
              >
                Explore agent architecture
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-[28px] border border-white/[0.09] bg-[#0A0A0D] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-7">
                <div className="flex items-start justify-between gap-5 border-b border-white/[0.07] pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#8A5CE6]" />
                      <div className="text-sm font-semibold text-white">
                        Agent Policy Envelope
                      </div>
                    </div>

                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-700">
                      Conceptual / target architecture
                    </div>
                  </div>

                  <span className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-600">
                    Not live
                  </span>
                </div>

                <div className="mt-7">
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      ["01", "Identity"],
                      ["02", "Policy"],
                      ["03", "Authority"],
                    ].map(([number, label], index) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
                          <span className="font-mono text-[9px] text-[#8A5CE6]">
                            {number}
                          </span>
                          <span className="text-xs text-zinc-300">
                            {label}
                          </span>
                        </div>

                        {index < 2 && (
                          <ArrowRight className="h-3 w-3 text-zinc-800" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="my-6 h-px bg-gradient-to-r from-[#6B35D5]/40 via-white/[0.08] to-transparent" />

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Identity", "Agent-specific authority"],
                      ["Spend", "Bounded limits"],
                      ["Assets", "Allowlist"],
                      ["Destinations", "Allowlist"],
                      ["Actions", "Defined permissions"],
                      ["Escalation", "Approval threshold"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="group rounded-xl border border-white/[0.07] bg-white/[0.018] p-4 transition-colors hover:border-[#6B35D5]/20"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700">
                            {label}
                          </span>

                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 transition-colors group-hover:bg-[#8A5CE6]" />
                        </div>

                        <div className="mt-2 text-sm text-zinc-300">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#6B35D5]/20 bg-[#6B35D5]/[0.06] p-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#B79AF4]">
                        <LockKeyhole className="h-3.5 w-3.5" />
                        Constrained authority
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-zinc-600">
                        Execution remains bounded by the defined policy.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Revoke / escalate
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-zinc-600">
                        Exceptional actions can move toward additional
                        approval or authority revocation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-[#6B35D5]/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PAYMENTS
      ============================================================ */}
      <section id="payments" className="apx-section relative z-10">
        <div className="apx-container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="apx-eyebrow">
                Machine-to-machine payments
              </span>

              <h2 className="apx-heading mt-6 text-4xl sm:text-5xl lg:text-6xl">
                Value should move with
                <span className="block text-zinc-500">
                  the software that uses it.
                </span>
              </h2>
            </div>

            <div>
              <p className="apx-body max-w-2xl text-base sm:text-lg">
                Autonomous software needs more than the ability to initiate
                a payment. A useful payment layer needs intent, authorization,
                execution and a traceable result to fit into the workflow.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-600">
                Apraxus is developing this model around programmable payment
                infrastructure, while the current public environment provides
                a testnet foundation for payment intents, quotes, executions
                and simulation.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-[#6B35D5]/20 bg-[#100D17] p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="apx-eyebrow text-[#B79AF4]">
                  Current / verified
                </span>

                <span className="apx-status">
                  Testnet
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                Payment infrastructure already available.
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-500">
                The development platform exposes the primitives needed to
                experiment with payment workflows on the current testnet
                environment.
              </p>

              <div className="mt-7 space-y-2.5">
                {[
                  ["01", "Payment intents", "Create structured payment requests"],
                  ["02", "Quotes", "Retrieve payment and execution quotes"],
                  ["03", "Executions", "Create execution requests"],
                  ["04", "Sandbox", "Simulate workflows without production execution"],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="rounded-xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[#8A5CE6]">
                        {number}
                      </span>
                      <span className="text-sm font-medium text-zinc-300">
                        {title}
                      </span>
                    </div>
                    <p className="mt-2 pl-7 text-xs leading-5 text-zinc-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/developers"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#B79AF4] hover:text-white"
              >
                Open payment APIs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/[0.07] bg-[#0D0C10] p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="apx-eyebrow text-zinc-500">
                  Protocol direction
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                  Development
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-300">
                Payments designed for machine relationships.
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                The longer-term architecture explores payment flows between
                autonomous software, services and contracts, with policy and
                authorization forming the control layer around value movement.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ["Agent → API", "Service access and usage-based workflows"],
                  ["Agent → Agent", "Machine-to-machine value exchange"],
                  ["Agent → Contract", "Programmatic on-chain execution"],
                  ["Machine → Machine", "Automated service settlement"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 transition-colors hover:border-[#6B35D5]/20"
                  >
                    <div className="flex items-center justify-between">
                      <Zap className="h-4 w-4 text-[#8A5CE6]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-800">
                        Target
                      </span>
                    </div>

                    <h4 className="mt-6 text-sm font-semibold text-zinc-300">
                      {title}
                    </h4>

                    <p className="mt-2 text-xs leading-6 text-zinc-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.018] px-6 py-5 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                  Execution principle
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Intent → Authorization → Execution → Receipt
                </p>
              </div>

              <span className="text-xs text-zinc-600">
                Current environment: Arbitrum Sepolia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DEVELOPER ENTRY
      ============================================================ */}
      <section id="developer-platform" className="relative z-10 border-y border-white/[0.07] bg-[#0D0C10] py-28 sm:py-36">
        <div className="apx-container">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <div>
              <span className="apx-eyebrow">
                Developer platform
              </span>

              <h2 className="apx-heading mt-6 text-4xl sm:text-5xl">
                From first request
                <span className="block text-zinc-500">
                  to testnet execution.
                </span>
              </h2>

              <p className="apx-body mt-6 max-w-xl text-base">
                Build against the current Apraxus development platform using
                the API, SDK foundation, sandbox and wallet-connected testnet
                workflows.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/developers"
                  className="apx-button-primary"
                >
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/developers/docs"
                  className="apx-button-secondary"
                >
                  Read docs
                  <FileText className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.07] pt-7">
                {[
                  ["API", "v1"],
                  ["SDK", "TypeScript"],
                  ["Sandbox", "Simulation"],
                  ["Network", "Arbitrum Sepolia"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-700">
                      {label}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0A0A0D] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Code2 className="h-4 w-4 text-[#8A5CE6]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-500">
                      TypeScript · API v1
                    </span>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700">
                    Testnet
                  </span>
                </div>

                <pre className="overflow-x-auto p-6 text-[11px] leading-7 text-zinc-400 sm:p-7 sm:text-xs">
                  <code>{`const payment = await apraxus.createPayment({
  agentId: "agent_demo_01",
  token: "APXS",
  amount: "10",
  recipient: "0x...",
});

console.log(payment.status);
// pending

console.log(payment.network);
// arbitrum-sepolia`}</code>
                </pre>

                <div className="border-t border-white/[0.07] px-5 py-4 text-[10px] text-zinc-600">
                  Development / testnet example
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["01", "Discover", "Read concepts and API documentation"],
                  ["02", "Connect", "Use the API or TypeScript SDK foundation"],
                  ["03", "Simulate", "Test workflows in the development sandbox"],
                  ["04", "Execute", "Interact with supported testnet flows"],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-[#8A5CE6]">
                        {number}
                      </span>

                      <span className="text-sm font-medium text-zinc-300">
                        {title}
                      </span>
                    </div>

                    <p className="mt-2 pl-6 text-xs leading-5 text-zinc-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.018] px-6 py-5 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                  Developer environment
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Designed for experimentation, integration and testnet
                  development — not production autonomous execution.
                </p>
              </div>

              <Link
                href="/developers/dashboard"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#B79AF4] hover:text-white"
              >
                Open dashboard
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          RESEARCH / TRUST
      ============================================================ */}
      <section id="engineering" className="apx-section relative z-10">
        <div className="apx-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="apx-eyebrow">
                Public engineering
              </span>

              <h2 className="apx-heading mt-6 text-4xl sm:text-5xl">
                Read the work.
                <span className="block text-zinc-500">
                  Verify the progress.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                Apraxus separates implemented infrastructure from protocol
                research and future architecture. The public record is where
                the technical direction, security assumptions and development
                progress can be examined.
              </p>
            </div>

            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#B79AF4] hover:text-white"
            >
              Follow the roadmap
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {[
              {
                number: "01",
                label: "Specification",
                title: "Canonical whitepaper",
                description:
                  "The comprehensive protocol document covering architecture, agents, policies, payments, security, current testnet infrastructure and future research.",
                meta: "VERSION 1.0",
                href: "/whitepaper",
                icon: FileText,
              },
              {
                number: "02",
                label: "Assurance",
                title: "Security model",
                description:
                  "Threat models, security assumptions, operational considerations and the work required before production-scale infrastructure.",
                meta: "SECURITY WORK",
                href: "/security",
                icon: ShieldCheck,
              },
              {
                number: "03",
                label: "Execution",
                title: "Development roadmap",
                description:
                  "A public separation between shipped infrastructure, active development, planned architecture and longer-term research.",
                meta: "PUBLIC STATUS",
                href: "/roadmap",
                icon: GitBranch,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.number}
                  href={item.href}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0C10] p-7 transition-colors duration-300 hover:border-[#6B35D5]/25 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-zinc-700">
                      {item.number}
                    </span>

                    <Icon className="h-5 w-5 text-[#8A5CE6]" />
                  </div>

                  <div className="mt-12">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8A5CE6]">
                      {item.label}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-zinc-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-700">
                      {item.meta}
                    </span>

                    <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors group-hover:text-white">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>

                  <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#6B35D5]/[0.05] blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">
            <div className="grid sm:grid-cols-3">
              {[
                ["Implementation", "What exists today"],
                ["Development", "What is actively being built"],
                ["Research", "What remains future direction"],
              ].map(([title, text], index) => (
                <div
                  key={title}
                  className={`px-6 py-5 sm:px-7 ${
                    index > 0 ? "border-t border-white/[0.07] sm:border-l sm:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        index === 0
                          ? "bg-[#8A5CE6]"
                          : "bg-zinc-700"
                      }`}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                      {title}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-zinc-700">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
      ============================================================ */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="apx-container">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.09] bg-[#111014] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[360px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6B35D5]/[0.12] blur-[120px]"
            />

            <div className="relative">
              <span className="apx-eyebrow">
                Build the next layer
              </span>

              <h2 className="apx-heading mx-auto mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
                Explore what is already here.
                <span className="block text-zinc-500">
                  Help define what comes next.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                Use the testnet, read the technical work, explore the developer
                platform and follow Apraxus as the protocol evolves.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/network"
                  className="apx-button-primary"
                >
                  Explore Testnet
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/whitepaper"
                  className="apx-button-secondary"
                >
                  Read Whitepaper
                  <FileText className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
