'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  FileText,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Network,
  ReceiptText,
  ShieldCheck,
  Terminal,
  Wallet,
  Zap,
} from 'lucide-react';

import { WebGLScene } from '@/components/canvas/WebGLScene';

const architecture = [
  ['01', 'Intent', 'A human or system defines the objective.', Fingerprint],
  ['02', 'Agent', 'Software plans the actions required to achieve it.', Bot],
  ['03', 'Policy', 'Rules determine what the agent is authorized to do.', ShieldCheck],
  ['04', 'Wallet', 'Controlled value is exposed through explicit authority.', Wallet],
  ['05', 'Execution', 'Authorized actions move through execution systems.', Zap],
  ['06', 'Receipt', 'Actions and outcomes become traceable and verifiable.', ReceiptText],
] as const;

const current = [
  'APXS deployed on Arbitrum Sepolia',
  'APXS / WETH test liquidity and verified swaps',
  'Developer API v1',
  'TypeScript SDK foundation',
  'Simulation sandbox',
  'Developer dashboard and metrics',
];

const building = [
  'Protocol-level agent identity',
  'Policy-aware execution',
  'Native network architecture',
  'Native state and consensus',
  'Machine-to-machine economic primitives',
  'Broader cross-network execution',
];

const surfaces = [
  {
    href: '/network',
    label: 'NETWORK',
    title: 'Execution infrastructure',
    text: 'Explore the current APXS testnet environment, network telemetry and on-chain activity.',
    icon: Network,
  },
  {
    href: '/developers',
    label: 'DEVELOPERS',
    title: 'Build with Apraxus',
    text: 'API, SDK, sandbox, keys, metrics and technical documentation for development workflows.',
    icon: Code2,
  },
  {
    href: '/agents',
    label: 'AGENTS',
    title: 'Agent infrastructure',
    text: 'Understand the execution model connecting intent, policy, wallets and actions.',
    icon: Bot,
  },
  {
    href: '/payments',
    label: 'PAYMENTS',
    title: 'Machine payments',
    text: 'Explore the primitives required for software to coordinate value and payment flows.',
    icon: Wallet,
  },
];

export default function HomePage() {
  return (
    <main className="apx-shell overflow-hidden">
      <section className="relative min-h-[850px] border-b border-white/[.06]">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <WebGLScene />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,.14),transparent_34%),linear-gradient(to_bottom,transparent_45%,#070709_92%)]" />

        <div className="apx-container relative z-10 flex min-h-[850px] items-center justify-center py-32 text-center">
          <div className="max-w-5xl">
            <div className="apx-status mx-auto">
              <span className="apx-status-dot" />
              <span>Development &amp; Testnet</span>
              <span className="text-zinc-700">/</span>
              <span>Arbitrum Sepolia</span>
            </div>

            <p className="mt-10 font-mono text-[10px] uppercase tracking-[.32em] text-zinc-600">
              APRAXUS PROTOCOL
            </p>

            <h1 className="apx-display mt-6 text-[52px] sm:text-[72px] md:text-[92px]">
              Infrastructure for the
              <span className="block bg-gradient-to-r from-white via-zinc-200 to-violet-400 bg-clip-text text-transparent">
                Autonomous Economy.
              </span>
            </h1>

            <p className="mx-auto mt-9 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Apraxus is building infrastructure for autonomous software to
              interact with wallets, policies, payments and execution systems
              through defined and verifiable interfaces.
            </p>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-600">
              Today the project is focused on development infrastructure and
              APXS testnet experimentation. The broader protocol remains under
              active development.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/network" className="apx-button-primary">
                Explore Testnet
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="/developers" className="apx-button-secondary">
                <Code2 className="h-4 w-4" />
                Build with Apraxus
              </Link>

              <Link href="/whitepaper" className="apx-button-secondary">
                <FileText className="h-4 w-4" />
                Whitepaper
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[.14em] text-zinc-600">
              <span>APXS TESTNET</span>
              <span>CHAIN 421614</span>
              <span>API V1</span>
              <span>DEVELOPER PLATFORM</span>
            </div>
          </div>
        </div>
      </section>

      <section className="apx-section border-b border-white/[.06]">
        <div className="apx-container">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <span className="apx-eyebrow">01 / The problem</span>
              <h2 className="apx-heading mt-5 text-4xl sm:text-5xl">
                Software can act.
                <span className="block text-zinc-600">It still needs infrastructure.</span>
              </h2>
            </div>

            <div className="space-y-7 text-base leading-8 text-zinc-400">
              <p>
                Autonomous software increasingly needs to do more than generate
                information. It needs to coordinate actions, access controlled
                value, follow explicit policies and interact with external
                execution systems.
              </p>
              <p>
                Apraxus approaches this as an infrastructure problem:
                interfaces between intent, agents, authorization, wallets,
                execution and verifiable outcomes.
              </p>
              <div className="apx-divider" />
              <p className="font-mono text-xs uppercase tracking-[.14em] text-zinc-600">
                Infrastructure first. Autonomy follows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="apx-section relative border-b border-white/[.06]">
        <div className="apx-container">
          <div className="mb-14 max-w-3xl">
            <span className="apx-eyebrow">02 / Execution model</span>
            <h2 className="apx-heading mt-5 text-4xl sm:text-6xl">
              From intent to
              <span className="text-zinc-600"> verifiable execution.</span>
            </h2>
          </div>

          <div className="grid border-l border-t border-white/[.07] sm:grid-cols-2 lg:grid-cols-3">
            {architecture.map(([number, title, text, Icon]) => (
              <div key={number} className="border-b border-r border-white/[.07] p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="apx-number">{number}</span>
                  <Icon className="h-5 w-5 text-violet-400/80" strokeWidth={1.5} />
                </div>
                <h3 className="mt-14 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="apx-section border-b border-white/[.06]">
        <div className="apx-container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="apx-card p-7 sm:p-10">
              <span className="apx-eyebrow">03 / Current</span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">What exists today</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500">
                Verified development and testnet capabilities currently available
                across the Apraxus platform.
              </p>

              <div className="mt-8 space-y-4">
                {current.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="apx-card p-7 sm:p-10">
              <span className="apx-eyebrow">04 / Development</span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">What comes next</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500">
                Research and development directions are intentionally separated
                from currently deployed functionality.
              </p>

              <div className="mt-8 space-y-4">
                {building.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-zinc-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="apx-section border-b border-white/[.06]">
        <div className="apx-container">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="apx-eyebrow">05 / Protocol surfaces</span>
              <h2 className="apx-heading mt-5 text-4xl sm:text-6xl">
                Explore the system.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-zinc-500">
              Move from the network layer to developer infrastructure, agents,
              payments and the technical protocol work behind them.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {surfaces.map(({ href, label, title, text, icon: Icon }) => (
              <Link key={href} href={href} className="apx-card group p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[.18em] text-violet-400">
                    {label}
                  </span>
                  <Icon className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-violet-400" />
                </div>

                <h3 className="mt-16 text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-500">{text}</p>

                <div className="mt-8 flex items-center gap-2 text-xs font-medium text-zinc-400 group-hover:text-white">
                  Explore
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="apx-section border-b border-white/[.06]">
        <div className="apx-container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="apx-eyebrow">06 / Developer layer</span>
              <h2 className="apx-heading mt-5 text-4xl sm:text-6xl">
                Infrastructure developers can actually use.
              </h2>
            </div>

            <div className="rounded-3xl border border-white/[.08] bg-[#0d0d11] p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-white/[.07] pb-5">
                <Terminal className="h-4 w-4 text-violet-400" />
                <span className="font-mono text-[10px] uppercase tracking-[.16em] text-zinc-500">
                  apraxus / developer workflow
                </span>
              </div>

              <pre className="mt-7 overflow-x-auto text-xs leading-7 text-zinc-400">
{`const execution = await apraxus.execute({
  agent: agentId,
  intent: "authorized action",
  policy: policyId,
  wallet: walletId,
});

console.log(execution.receipt);`}
              </pre>

              <div className="mt-7 flex flex-wrap gap-2">
                {['API v1', 'TypeScript SDK', 'Sandbox', 'API Keys', 'Metrics'].map((item) => (
                  <span key={item} className="rounded-full border border-white/[.08] px-3 py-1.5 font-mono text-[9px] text-zinc-500">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="apx-section">
        <div className="apx-container">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[.1] bg-[#0d0d11] px-7 py-16 text-center sm:px-12 sm:py-24">
            <div className="apx-glow left-1/2 top-1/2 h-80 w-[38rem] -translate-x-1/2 -translate-y-1/2" />

            <div className="relative">
              <span className="apx-eyebrow">07 / Build with Apraxus</span>

              <h2 className="apx-heading mx-auto mt-6 max-w-4xl text-4xl sm:text-6xl">
                The autonomous economy needs infrastructure.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                Explore the testnet, inspect the technical architecture, use the
                developer platform and follow the protocol as it evolves.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/developers" className="apx-button-primary">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link href="/whitepaper" className="apx-button-secondary">
                  <FileText className="h-4 w-4" />
                  Read the Whitepaper
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 font-mono text-[9px] uppercase tracking-[.15em] text-zinc-700">
                <span>Policy</span>
                <span>Wallets</span>
                <span>Execution</span>
                <span>Payments</span>
                <span>Receipts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
