'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { arbitrumSepolia, bscTestnet } from 'viem/chains';
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
  const [scrolled, setScrolled] = useState(false);
  const [selectedNetwork, setSelectedNetwork] =
    useState<'arbitrumSepolia' | 'bnbTestnet'>('arbitrumSepolia');

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
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const networkName =
    selectedNetwork === 'arbitrumSepolia'
      ? 'Arbitrum Sepolia'
      : 'BNB Testnet';

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
            <button
              type="button"
              onClick={toggleNetwork}
              className="hidden items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-300 transition hover:border-white/[0.18] hover:bg-white/[0.06] sm:inline-flex"
              aria-label="Switch testnet"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
              {networkName}
              <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
            </button>

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
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                {networkName} / TESTNET
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
