import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  ExternalLink,
  FlaskConical,
  Network,
  ShieldCheck,
} from 'lucide-react';

export const metadata = {
  title: 'APXS | Apraxus',
  description:
    'APXS token overview, Arbitrum Sepolia testnet deployment, contract information and developing utility.',
};

const CONTRACT =
  '0xFE16213961cb4f9B15301f730a5977b9A145add5';

const ARBISCAN =
  `https://sepolia.arbiscan.io/token/${CONTRACT}`;

const facts = [
  ['Token', 'APXS'],
  ['Network', 'Arbitrum Sepolia'],
  ['Chain ID', '421614'],
  ['Decimals', '8'],
  ['Maximum Supply', '1,000,000,000 APXS'],
  ['Environment', 'Testnet'],
];

export default function ApxsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0D] px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <header className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-950/30 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-purple-300">
            <Coins className="h-3.5 w-3.5" />
            APXS Token
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            APXS
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
            The native token being developed for the Apraxus ecosystem,
            currently deployed for development and testing on Arbitrum Sepolia.
          </p>
        </header>

        <section className="mt-10 rounded-2xl border border-purple-500/20 bg-purple-500/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10">
                <FlaskConical className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-300">
                  Testnet Status
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  APXS is currently a testnet deployment
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  The current APXS contract runs on Arbitrum Sepolia and is
                  intended for development, integration and protocol testing.
                  It should not be treated as the production APXS deployment.
                </p>
              </div>
            </div>

            <a
              href={ARBISCAN}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.05]"
            >
              View Contract
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-500">
                  {label}
                </p>
                <p className="mt-3 text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-purple-300" />
              <h2 className="text-2xl font-semibold">Contract & Network</h2>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-500">
                  Contract Address
                </p>
                <p className="mt-2 break-all font-mono text-sm text-zinc-300">
                  {CONTRACT}
                </p>
              </div>

              <div>
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-500">
                  Explorer
                </p>
                <a
                  href={ARBISCAN}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white"
                >
                  Arbiscan Token Page
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div>
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-500">
                  Current Network
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  Arbitrum Sepolia · Chain ID 421614
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <h2 className="text-2xl font-semibold">Current Token Facts</h2>
            </div>

            <ul className="mt-7 space-y-4">
              {[
                'Fixed maximum supply of 1 billion APXS.',
                '8 decimal places.',
                'Deployed on Arbitrum Sepolia for testnet use.',
                'Used in current testnet payment and liquidity workflows.',
                'Contract information is publicly verifiable on Arbiscan.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-zinc-400"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-400">
              Developing Utility
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Designed for the Apraxus economy
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Apraxus is exploring APXS as an economic asset within a broader
              autonomous software infrastructure. The current testnet provides
              the foundation for validating payments, liquidity and developer
              integrations before any production economic design is finalized.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Payments',
                text: 'Test machine-to-machine payment and payment-intent workflows using APXS.',
              },
              {
                title: 'Liquidity',
                text: 'Test APXS/WETH liquidity and swap infrastructure on Arbitrum Sepolia.',
              },
              {
                title: 'Future Utility',
                text: 'Additional protocol utility and economic mechanisms remain under development.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-amber-400/15 bg-amber-400/[0.03] p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-amber-300">
            Token Economics
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Production tokenomics are not finalized
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-400">
            Production allocation, distribution schedules, treasury policy,
            staking or other economic mechanisms should not be inferred from
            the current testnet deployment. These parameters will be
            documented separately when formally defined.
          </p>
        </section>

        <section className="mt-16 flex flex-col gap-5 rounded-2xl border border-white/10 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
              Continue
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Explore APXS on the live testnet
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/network"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Open Testnet
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/liquidity"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/[0.05]"
            >
              Explore Liquidity
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
