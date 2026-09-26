'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { arbitrumSepolia, bscTestnet } from 'viem/chains';
import { APRAXUS_NETWORKS, type ApraxusNetworkKey } from '@/lib/web3/network-registry';
import { useChainId, useSwitchChain } from 'wagmi';
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  ChevronDown,
  Code2,
  CreditCard,
  GitBranch,
  Layers3,
  Menu,
  Network,
  ShieldCheck,
  X,
} from 'lucide-react';

const NAV_GROUPS = [
  {
    title: 'Protocol',
    items: [
      { name: 'Architecture', href: '/technology', desc: 'How Apraxus is structured', icon: Layers3 },
      { name: 'AI Agents', href: '/agents', desc: 'Identity, policy and execution', icon: Bot },
      { name: 'Payments', href: '/payments', desc: 'Programmable machine payments', icon: CreditCard },
      { name: 'Security', href: '/security', desc: 'Security model and controls', icon: ShieldCheck },
    ],
  },
  {
    title: 'Network',
    items: [
      { name: 'Network', href: '/network', desc: 'Testnet activity and on-chain data', icon: Network },
      { name: 'APXS', href: '/apxs', desc: 'Token and contract information', icon: Layers3 },
      { name: 'Liquidity', href: '/liquidity', desc: 'Testnet liquidity infrastructure', icon: Network },
      { name: 'Ecosystem', href: '/ecosystem', desc: 'Applications and integrations', icon: Layers3 },
    ],
  },
  {
    title: 'Build',
    items: [
      { name: 'Developers', href: '/developers', desc: 'Build with Apraxus', icon: Code2 },
      { name: 'Documentation', href: '/docs', desc: 'Protocol and developer references', icon: BookOpen },
      { name: 'Dashboard', href: '/developers/dashboard', desc: 'Development execution console', icon: Network },
    ],
  },
  {
    title: 'Resources',
    items: [
      { name: 'Whitepaper', href: '/whitepaper', desc: 'Canonical protocol specification', icon: BookOpen },
      { name: 'Roadmap', href: '/roadmap', desc: 'Development direction', icon: GitBranch },
      { name: 'About', href: '/about', desc: 'Vision and mission', icon: Layers3 },
    ],
  },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedNetwork, setSelectedNetwork] =
    useState<ApraxusNetworkKey>('arbitrumSepolia');

  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const pathname = usePathname();

  useEffect(() => {
    if (chainId === arbitrumSepolia.id) {
      setSelectedNetwork('arbitrumSepolia');
    } else if (chainId === bscTestnet.id) {
      setSelectedNetwork('bnbTestnet');
    }
  }, [chainId]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setNetworkOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeNetwork = APRAXUS_NETWORKS[selectedNetwork];
  const networkName = activeNetwork.name;

  async function toggleNetwork() {
    const nextNetwork =
      selectedNetwork === 'arbitrumSepolia'
        ? 'bnbTestnet'
        : 'arbitrumSepolia';

    try {
      await switchChain({
        chainId:
          nextNetwork === 'arbitrumSepolia'
            ? arbitrumSepolia.id
            : bscTestnet.id,
      });

      setSelectedNetwork(nextNetwork);
    } catch {
      // Preserve current network selection when wallet rejects the switch.
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-black/75 py-3 backdrop-blur-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo size="md" withWordmark />

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/technology"
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Protocol
            </Link>

            <Link
              href="/network"
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Network
            </Link>

            <Link
              href="/developers"
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Developers
            </Link>

            <Link
              href="/whitepaper"
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Whitepaper
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setNetworkOpen((value) => !value)}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-300 transition hover:border-white/[0.18] hover:bg-white/[0.06]"
                aria-label="Select testnet"
                aria-expanded={networkOpen}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
                <span>{networkName}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${
                    networkOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {networkOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[340px] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#08080b]/95 p-2 shadow-2xl backdrop-blur-2xl">
                  <div className="px-3 py-2">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                      Execution network
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Select the testnet used by wallet-connected features.
                    </p>
                  </div>

                  {(Object.keys(APRAXUS_NETWORKS) as ApraxusNetworkKey[]).map((key) => {
                    const network = APRAXUS_NETWORKS[key];
                    const selected = key === selectedNetwork;

                    return (
                      <div
                        key={network.key}
                        className={`rounded-xl border p-3 transition ${
                          selected
                            ? 'border-purple-500/30 bg-purple-500/[0.08]'
                            : 'border-transparent hover:border-white/[0.08] hover:bg-white/[0.035]'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={async () => {
                            if (key !== selectedNetwork) {
                              try {
                                await switchChain({ chainId: network.chainId });
                                setSelectedNetwork(key);
                              } catch {
                                return;
                              }
                            }
                            setNetworkOpen(false);
                          }}
                          className="flex w-full items-start justify-between gap-4 text-left"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  selected ? 'bg-emerald-400' : 'bg-zinc-600'
                                }`}
                              />
                              <span className="text-sm font-medium text-white">
                                {network.name}
                              </span>
                            </div>
                            <div className="mt-1 font-mono text-[10px] text-zinc-500">
                              {network.environment} · Chain {network.chainId}
                            </div>
                          </div>

                          {selected && (
                            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                              Active
                            </span>
                          )}
                        </button>

                        <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2">
                          <span className="font-mono text-[9px] text-zinc-600">
                            APXS {network.apxs.slice(0, 6)}…{network.apxs.slice(-4)}
                          </span>

                          <a
                            href={network.apxsExplorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 transition hover:text-white"
                          >
                            Explorer ↗
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <a
              href="https://github.com/apraxusblockchain/apraxus-website"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 text-xs text-zinc-300 transition hover:bg-white/[0.07] hover:text-white md:inline-flex"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white transition hover:border-white/[0.2] hover:bg-white/[0.08]"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/95 pt-28 backdrop-blur-3xl">
          <div className="mx-auto max-w-[1400px] px-4 pb-12 sm:px-8 lg:px-12">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                  APRAXUS / PLATFORM
                </p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Explore the infrastructure.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                  Protocol architecture, network infrastructure, developer tooling and
                  the systems being built for the autonomous economy.
                </p>
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                ESC to close
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {NAV_GROUPS.map((group) => (
                <section key={group.title}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {group.title}
                    </span>
                    <div className="h-px flex-1 bg-white/[0.07]" />
                  </div>

                  <div className="space-y-2">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`group flex gap-3 rounded-2xl border p-3.5 transition ${
                            active
                              ? 'border-white/[0.18] bg-white/[0.07]'
                              : 'border-white/[0.06] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.045]'
                          }`}
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 transition group-hover:text-white">
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-medium text-white">
                              {item.name}
                            </div>
                            <p className="mt-1 text-xs leading-5 text-zinc-500">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  Active execution network
                </span>

                <button
                  type="button"
                  onClick={() => setNetworkOpen((value) => !value)}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-300 transition hover:border-white/[0.16] hover:bg-white/[0.06]"
                  aria-expanded={networkOpen}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]" />
                  {networkName} · Chain {activeNetwork.chainId}
                  <ChevronDown
                    className={`h-3 w-3 text-zinc-500 transition-transform duration-200 ${
                      networkOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {networkOpen && (
                  <div className="flex flex-col gap-2 pt-1">
                    {(Object.keys(APRAXUS_NETWORKS) as ApraxusNetworkKey[]).map((key) => {
                      const network = APRAXUS_NETWORKS[key];
                      const selected = key === selectedNetwork;

                      return (
                        <button
                          key={network.key}
                          type="button"
                          onClick={async () => {
                            if (key !== selectedNetwork) {
                              try {
                                await switchChain({ chainId: network.chainId });
                                setSelectedNetwork(key);
                              } catch {
                                return;
                              }
                            }
                            setNetworkOpen(false);
                          }}
                          className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                            selected
                              ? 'border-purple-500/30 bg-purple-500/[0.08]'
                              : 'border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12]'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-medium text-white">
                              {network.name}
                            </div>
                            <div className="mt-1 font-mono text-[9px] text-zinc-600">
                              {network.environment} · Chain {network.chainId}
                            </div>
                          </div>

                          <span
                            className={`font-mono text-[9px] uppercase tracking-wider ${
                              selected ? 'text-emerald-400' : 'text-zinc-600'
                            }`}
                          >
                            {selected ? 'Active' : 'Switch'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/developers"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white"
              >
                Start building
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
