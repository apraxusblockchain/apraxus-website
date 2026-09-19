'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import {
  Menu,
  X,
  ArrowUpRight,
  Network,
  Bot,
  CreditCard,
  Code2,
  BookOpen,
  Layers,
  Globe2,
  ShieldCheck,
  GitBranch,
  Info,
  HelpCircle,

} from 'lucide-react';

const NAV_GROUPS = [
  {
    title: 'Product',
    items: [
      {
        name: 'Network',
        href: '/network',
        desc: 'Wallet, APXS & testnet swap',
        icon: Network,
      },
      {
        name: 'AI Agents',
        href: '/agents',
        desc: 'Infrastructure for autonomous execution',
        icon: Bot,
      },
      {
        name: 'Payments',
        href: '/payments',
        desc: 'Programmable machine-to-machine payments',
        icon: CreditCard,
      },
    ],
  },
  {
    title: 'Technology',
    items: [
      {
        name: 'Technology',
        href: '/technology',
        desc: 'Architecture, primitives & implementation',
        icon: Layers,
      },
      {
        name: 'Developers',
        href: '/developers',
        desc: 'Tools, SDKs & builder resources',
        icon: Code2,
      },
      {
        name: 'Documentation',
        href: '/docs',
        desc: 'Technical references and guides',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'Ecosystem',
    items: [
      {
        name: 'Ecosystem',
        href: '/ecosystem',
        desc: 'Applications, integrations & categories',
        icon: Globe2,
      },
      {
        name: 'Security',
        href: '/security',
        desc: 'Security model and disclosure',
        icon: ShieldCheck,
      },
      {
        name: 'Roadmap',
        href: '/roadmap',
        desc: 'Development progress and milestones',
        icon: GitBranch,
      },
    ],
  },
  {
    title: 'About',
    items: [
      {
        name: 'About',
        href: '/about',
        desc: 'Apraxus vision and mission',
        icon: Info,
      },
      {
        name: 'FAQ',
        href: '/faq',
        desc: 'Answers to common questions',
        icon: HelpCircle,
      },
    ],
  },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030305]/85 backdrop-blur-2xl border-b border-white/[0.07] py-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.55)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo size="md" withWordmark={true} />

          <div className="flex items-center gap-2.5">
            <Link
              href="/network"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B5CFA]/10 border border-[#7B5CFA]/30 text-xs font-mono text-[#C7BCFF] hover:bg-[#7B5CFA]/20 hover:border-[#7B5CFA]/50 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Network
            </Link>

            <a
              href="https://github.com/apraxusblockchain/apraxus-website"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-zinc-200 transition-all"
            >
              <GitBranch className="w-3.5 h-3.5" />
              GitHub
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative flex items-center justify-center w-11 h-11 rounded-2xl border transition-all duration-300 ${
                menuOpen
                  ? 'bg-[#7B5CFA] border-[#7B5CFA] text-white shadow-[0_0_25px_rgba(123,92,250,0.45)]'
                  : 'bg-[#0D0C11]/90 hover:bg-[#15141D] border-white/[0.12] hover:border-[#7B5CFA]/50 text-white'
              }`}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5 text-[#7B5CFA]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div data-lenis-prevent-wheel className="fixed inset-0 z-40 bg-[#030305]/97 backdrop-blur-3xl overflow-y-auto overscroll-contain touch-pan-y">
          <div className="min-h-full pt-28 pb-10 px-4 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-7 mb-8 border-b border-white/[0.08]">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#7B5CFA] mb-2">
                    Apraxus
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    Explore the platform
                  </h2>

                  <p className="text-sm text-zinc-500 mt-2 max-w-xl">
                    Infrastructure, products, technology and development progress
                    across the Apraxus ecosystem.
                  </p>
                </div>

                <div className="text-xs font-mono text-zinc-600">
                  Press <span className="text-zinc-300">ESC</span> to close
                </div>
              </div>

              <div className="space-y-10">
                {NAV_GROUPS.map((group) => (
                  <section key={group.title}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                        {group.title}
                      </span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                              isActive
                                ? 'bg-[#7B5CFA]/12 border-[#7B5CFA]/45'
                                : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.045] hover:border-[#7B5CFA]/30'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isActive
                                  ? 'bg-[#7B5CFA] text-white'
                                  : 'bg-white/[0.05] text-[#9A86FF] group-hover:bg-[#7B5CFA]/15'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm font-semibold ${
                                    isActive
                                      ? 'text-white'
                                      : 'text-zinc-200 group-hover:text-white'
                                  }`}
                                >
                                  {item.name}
                                </span>

                                {isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                )}
                              </div>

                              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
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

              <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Arbitrum Sepolia Testnet</span>
                </div>

                <a
                  href="https://github.com/apraxusblockchain/apraxus-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  View source on GitHub
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
