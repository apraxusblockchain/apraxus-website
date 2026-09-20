import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Code2,
  Coins,
  Network,
  ShieldCheck,
  Cpu,
  FlaskConical,
  Route,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Documentation | Apraxus',
  description:
    'Protocol, architecture, APXS, testnet, developer and security documentation for Apraxus.',
};

const SECTIONS = [
  {
    icon: BookOpen,
    eyebrow: 'START HERE',
    title: 'Introduction',
    description:
      'Understand what Apraxus is, why autonomous software needs new infrastructure, and what is available today.',
    links: [
      ['What is Apraxus?', '/'],
      ['Current Status', '/roadmap'],
      ['Testnet Quickstart', '/developers/docs'],
    ],
  },
  {
    icon: Cpu,
    eyebrow: 'PROTOCOL',
    title: 'Protocol Concepts',
    description:
      'The conceptual model behind intent-driven, policy-aware autonomous software workflows.',
    links: [
      ['Protocol Overview', '/technology'],
      ['Agent Infrastructure', '/agents'],
      ['Execution Model', '/technology'],
    ],
  },
  {
    icon: Coins,
    eyebrow: 'APXS',
    title: 'Token & Economics',
    description:
      'APXS token information, testnet deployment, supply and the role of the token within the developing ecosystem.',
    links: [
      ['APXS Testnet', '/network'],
      ['Liquidity & Swaps', '/liquidity'],
      ['Payments', '/payments'],
    ],
  },
  {
    icon: Network,
    eyebrow: 'NETWORK',
    title: 'Architecture',
    description:
      'Separate the infrastructure available today on Arbitrum from the longer-term Apraxus network architecture.',
    links: [
      ['Current Technology', '/technology'],
      ['Network & Testnet', '/network'],
      ['Roadmap', '/roadmap'],
    ],
  },
  {
    icon: Code2,
    eyebrow: 'DEVELOPERS',
    title: 'Developer Platform',
    description:
      'Build and test integrations using API v1, the SDK foundation, sandbox and developer tooling.',
    links: [
      ['Developer Hub', '/developers'],
      ['API Documentation', '/developers/docs'],
      ['Sandbox', '/developers/sandbox'],
      ['API Keys', '/developers/keys'],
    ],
  },
  {
    icon: ShieldCheck,
    eyebrow: 'SECURITY',
    title: 'Security',
    description:
      'Security principles, current controls, limitations and the longer-term verification and audit path.',
    links: [
      ['Security Overview', '/security'],
      ['Roadmap', '/roadmap'],
      ['FAQ', '/faq'],
    ],
  },
  {
    icon: FlaskConical,
    eyebrow: 'RESEARCH',
    title: 'Future Architecture',
    description:
      'Longer-term research around agent economies, autonomous execution, cross-chain infrastructure and a potential native network.',
    links: [
      ['Technology', '/technology'],
      ['Agent Infrastructure', '/agents'],
      ['Roadmap', '/roadmap'],
    ],
  },
  {
    icon: Route,
    eyebrow: 'PROJECT',
    title: 'Project & Ecosystem',
    description:
      'Follow development, understand the project trajectory and explore the broader ecosystem direction.',
    links: [
      ['Roadmap', '/roadmap'],
      ['Ecosystem', '/ecosystem'],
      ['About Apraxus', '/about'],
      ['FAQ', '/faq'],
    ],
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0D] px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-950/30 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-purple-300">
            <BookOpen className="h-3.5 w-3.5" />
            Apraxus Documentation
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Everything you need to understand and build with Apraxus.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
            Protocol concepts, architecture, APXS, testnet infrastructure,
            developer tooling and security documentation — organized around
            what exists today and what Apraxus is designed to become.
          </p>
        </header>

        <section className="mt-10 rounded-2xl border border-[#7B5CFA]/20 bg-[#7B5CFA]/[0.05] p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300">
                Current Environment
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                Arbitrum Sepolia Testnet
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                APXS and the Apraxus developer platform are currently available
                for development and testing. Production mainnet infrastructure
                is not enabled.
              </p>
            </div>

            <Link
              href="/developers/docs"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-400">
              Documentation Map
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Explore the Apraxus stack
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {SECTIONS.map((section) => {
              const Icon = section.icon;

              return (
                <section
                  key={section.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.035]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-purple-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                    {section.eyebrow}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    {section.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {section.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
                    {section.links.map(([label, href]) => (
                      <Link
                        key={`${section.title}-${label}`}
                        href={href}
                        className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                      >
                        <span>{label}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-40 transition group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
              Documentation Principle
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Verified today. Designed for tomorrow.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Apraxus documentation distinguishes deployed testnet
              infrastructure from development work and longer-term protocol
              research. Future architecture is documented as a design
              direction, not as production functionality.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-300">
              Developer Path
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              From first request to testnet integration.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Start with the Quickstart, create a development API key, use the
              sandbox, explore API v1 and connect a wallet to the Arbitrum
              Sepolia testnet.
            </p>
            <Link
              href="/developers/docs"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-purple-300"
            >
              Open Developer Docs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
