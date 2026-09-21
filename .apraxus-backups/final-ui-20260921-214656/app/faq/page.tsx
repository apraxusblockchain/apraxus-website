import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const metadata = {
  title: 'FAQ | Apraxus',
  description: 'Frequently asked questions about Apraxus protocol, AI agent policies, and testnet availability.',
};

const FAQS = [
  {
    q: 'What is Apraxus in simple terms?',
    a: 'Apraxus is a blockchain engineered specifically for AI agents. It gives autonomous software the ability to hold controlled wallets, make machine-to-machine payments, and call smart contracts within strict, cryptographically enforced spending limits.'
  },
  {
    q: 'Why not just use Ethereum, Solana, or Base for agents?',
    a: 'Existing general-purpose L1s/L2s treat all private key holders the same — either you have full signing authority or none. Apraxus implements native policy envelopes directly at the protocol validation layer, allowing time-windowed spending ceilings, asset allowlists, and automatic key revocation if an agent acts erratically.'
  },
  {
    q: 'Is Apraxus currently live on Mainnet?',
    a: 'No. Apraxus is in active development (Phase 02: Core Prototype). We are building in public and rigorously testing the Rust core and state persistence before deploying a multi-node testnet.'
  },
  {
    q: 'How does the Agent Policy Simulator work?',
    a: 'The policy simulator on this website is a concept demonstration showing how our policy envelope engine evaluates parameters (spend limits, allowlisted destinations, allowed assets) before generating a valid transaction payload.'
  },
  {
    q: 'Is there a token available for purchase?',
    a: 'No. Token economics and utility parameters will only be finalized and published once the core protocol architecture is completed and audited. Beware of fraudulent tokens on decentralized exchanges.'
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <span>Clarifications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-[#77727D] leading-relaxed font-sans">
            Clear, honest answers regarding the protocol thesis, current implementation status, and roadmap.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col gap-3">
              <h3 className="text-base sm:text-lg font-bold font-mono text-white flex items-start gap-3">
                <span className="text-purple-400">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#77727D] leading-relaxed pl-7 font-sans">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
