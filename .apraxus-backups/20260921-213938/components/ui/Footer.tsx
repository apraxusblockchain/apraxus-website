'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Terminal, Shield, Code, MessageSquare, Globe, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-20 bg-[#030305] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/[0.08]">
          {/* Brand Identity */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo size="md" withWordmark={true} />
          </div>

          {/* Architecture Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">Architecture</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono text-zinc-400">
              <li><Link href="/technology" className="hover:text-white transition-colors">Rust Blockchain Core</Link></li>
              <li><Link href="/technology#target-arch" className="hover:text-white transition-colors">7-Layer Protocol Spec</Link></li>
              <li><Link href="/agents" className="hover:text-white transition-colors">Cryptographic Policy Envelopes</Link></li>
              <li><Link href="/payments" className="hover:text-white transition-colors">Sub-Second M2M Channels</Link></li>
              <li><Link href="/network" className="hover:text-white transition-colors">Telemetry & Explorer Preview</Link></li>
            </ul>
          </div>

          {/* Developers Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">Developers</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono text-zinc-400">
              <li><Link href="/developers" className="hover:text-white transition-colors">Rust & TypeScript SDKs</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Protocol Documentation</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition-colors">Engineering Milestone Log</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Zero-Trust Threat Model</Link></li>
              <li><Link href="/ecosystem" className="hover:text-white transition-colors">Ecosystem Directory</Link></li>
            </ul>
          </div>

          {/* Community & Ecosystem */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white font-mono">Community</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono text-zinc-400">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <Code className="w-3.5 h-3.5 text-[#7B5CFA]" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <Globe className="w-3.5 h-3.5 text-[#38E8F8]" />
                  <span>Official Updates (X)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Builder Discord</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li><Link href="/about" className="hover:text-white transition-colors">About & Thesis</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Protocol FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Clean, Modern Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Apraxus Protocol. Built in public for autonomous systems.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/security" className="hover:text-zinc-300 transition-colors">
              Security
            </Link>
            <Link href="/docs" className="hover:text-zinc-300 transition-colors">
              Docs
            </Link>
            <Link href="/roadmap" className="hover:text-zinc-300 transition-colors">
              Roadmap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
