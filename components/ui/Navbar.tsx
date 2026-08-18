'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { 
  MoreHorizontal, 
  X, 
  ArrowUpRight, 
  Terminal, 
  Layers, 
  Bot, 
  CreditCard, 
  Code2, 
  BookOpen, 
  GitBranch, 
  Globe2, 
  ShieldCheck, 
  Activity,
  HelpCircle,
  Info,
  Sparkles
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Technology', href: '/technology', desc: 'Rust Blockchain Core & Target Architecture', icon: Layers, tag: 'Phase 02' },
  { name: 'AI Agent Infrastructure', href: '/agents', desc: 'Delegated Keys, Envelopes & Spend Bounds', icon: Bot, tag: 'Core Thesis' },
  { name: 'Programmable Payments', href: '/payments', desc: 'M2M Settlement & Micro-Escrow Channels', icon: CreditCard, tag: 'Sub-Second' },
  { name: 'Developers', href: '/developers', desc: 'CLI Testbed & Rust / TypeScript SDKs', icon: Code2, tag: 'Builder Hub' },
  { name: 'Documentation', href: '/docs', desc: 'Protocol Reference, Specifications & Guides', icon: BookOpen, tag: 'Knowledge' },
  { name: 'Roadmap & Build Log', href: '/roadmap', desc: '9-Phase Engineering Trajectory & Commits', icon: GitBranch, tag: 'Live Proof' },
  { name: 'Ecosystem', href: '/ecosystem', desc: 'Autonomous Agent Categories & Integrations', icon: Globe2, tag: 'Directory' },
  { name: 'Security & Disclosure', href: '/security', desc: 'Zero-Trust Threat Modeling & Audit Protocol', icon: ShieldCheck, tag: 'Trust' },
  { name: 'Network & Explorer', href: '/network', desc: 'Pre-Testnet Telemetry & Chain Status', icon: Activity, tag: 'Planned' },
  { name: 'About & Vision', href: '/about', desc: 'The Autonomous Economy Thesis', icon: Info, tag: 'Manifesto' },
  { name: 'FAQ', href: '/faq', desc: 'Direct Answers to Technical Questions', icon: HelpCircle, tag: 'Support' },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close overlay on route change or ESC
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Ultra-Clean Minimal Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030305]/70 backdrop-blur-2xl border-b border-white/[0.06] py-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Exact Brand Logo & Typography */}
          <Logo size="md" withWordmark={true} />

          {/* Right Floating Trigger Hub */}
          <div className="flex items-center gap-3">
            {/* Quick Live Status Beacon */}
            <Link
              href="/roadmap#build-log"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0C11]/80 border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-[#7B5CFA]/40 transition-all backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Core Prototype Shipped</span>
            </Link>

            {/* GitHub Primary Action */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-full transition-all backdrop-blur-md"
            >
              <Terminal className="w-3.5 h-3.5 text-[#7B5CFA]" />
              <span>GitHub</span>
            </a>

            {/* The Signature 3-Dots Navigation Trigger (Menu Portal) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative flex items-center justify-center w-11 h-11 rounded-2xl border transition-all duration-300 cursor-pointer ${
                menuOpen
                  ? 'bg-[#7B5CFA] border-[#7B5CFA] text-white shadow-[0_0_30px_rgba(123,92,250,0.7)] rotate-90'
                  : 'bg-[#0D0C11]/90 hover:bg-[#15141D] border-white/[0.12] hover:border-[#7B5CFA]/50 text-white shadow-xl hover:shadow-[0_0_20px_rgba(123,92,250,0.35)]'
              }`}
              aria-label="Open Navigation Hub"
              title="Open Navigation Hub"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MoreHorizontal className="w-6 h-6 text-[#7B5CFA] animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cinematic Fullscreen Portal Menu Overlay (Triggered by 3-Dots) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030305]/96 backdrop-blur-3xl flex flex-col justify-between pt-24 pb-10 px-4 sm:px-8 lg:px-16 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Subtle Ambient Violet Underglow */}
          <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7B5CFA]/15 blur-[160px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto w-full relative z-10 my-auto py-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#38E8F8]" />
                  Apraxus Protocol Navigation Matrix
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 font-sans">
                  Explore Architecture & Specifications
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Press <kbd className="px-2 py-1 bg-white/10 rounded text-zinc-300">ESC</kbd> to close
              </span>
            </div>

            {/* Grid of Distinct Destination Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`glass-card p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 group ${
                      isActive
                        ? 'bg-[#7B5CFA]/20 border-[#7B5CFA]/60 shadow-[0_0_25px_rgba(123,92,250,0.35)]'
                        : 'border-white/[0.06] hover:border-[#7B5CFA]/40 hover:bg-[#0E0D13]/90 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-[#7B5CFA] text-white' : 'bg-white/[0.04] text-[#7B5CFA] group-hover:bg-[#7B5CFA]/20'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white font-mono group-hover:text-[#7B5CFA] transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 font-sans leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5 shrink-0 group-hover:border-[#7B5CFA]/30 group-hover:text-zinc-300">
                      {item.tag}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Overlay Footer Bar */}
          <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Network: Phase 02 Prototype
              </span>
              <span>•</span>
              <span>License: Apache-2.0 / MIT</span>
            </div>
            <div>
              &copy; {new Date().getFullYear()} Apraxus Protocol. Built in public for autonomous systems.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
