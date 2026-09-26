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
import { APRAXUS_NETWORKS } from "@/lib/web3/network-registry";
import CopyAddressButton from "@/components/ui/CopyAddressButton";

export const metadata = {
  title: 'APXS | Apraxus',
  description:
    'APXS token overview, Arbitrum Sepolia testnet deployment, contract information and developing utility.',
};

const facts = [
  ['Token', 'APXS'],
  ['Deployments', 'Arbitrum Sepolia · BNB Testnet'],
  ['Chain IDs', '421614 · 97'],
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
                  APXS is currently deployed on testnets
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  APXS is currently deployed on Arbitrum Sepolia and BNB
                  Testnet for development, integration and protocol testing.
                  These deployments should not be treated as production APXS
                  deployments.
                </p>
              </div>
            </div>

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

        <section className="mt-16">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-400">
              Deployments
            </p>
            <h2 className="text-3xl font-semibold">
              APXS testnet contracts
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-zinc-500">
              Current APXS deployments configured in the shared Apraxus network
              registry. Each address can be verified directly on its network
              explorer.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {Object.values(APRAXUS_NETWORKS).map((network) => (
              <div
                key={network.key}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-white/[0.035] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" />
                      <h3 className="text-xl font-semibold">{network.name}</h3>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                      {network.environment} · Chain {network.chainId}
                    </p>
                  </div>

                  <span className="rounded-full border border-purple-400/15 bg-purple-400/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-purple-300">
                    APXS
                  </span>
                </div>

                <div className="mt-7 rounded-xl border border-white/[0.07] bg-black/20 p-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-600">
                    Contract Address
                  </p>
                  <p className="mt-2 break-all font-mono text-xs leading-6 text-zinc-300">
                    {network.apxs}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <CopyAddressButton address={network.apxs} />

                  <a
                    href={network.apxsExplorer}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    Explorer
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
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
