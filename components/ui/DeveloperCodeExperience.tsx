'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, ArrowRight, ShieldCheck, Sparkles, Layers, Cpu } from 'lucide-react';
import { StatusPill } from './StatusPill';

const CODE_EXAMPLES = {
  rust: {
    filename: 'agent_daemon.rs',
    lang: 'Rust Core SDK',
    code: `use apraxus_sdk::prelude::*;
use apraxus_policy::{PolicyEnvelope, SpendLimit};

#[tokio::main]
async fn main() -> Result<(), ApraxusError> {
    // 1. Connect to local Apraxus testbed node
    let client = ApraxusClient::connect("http://127.0.0.1:8545").await?;

    // 2. Initialize Agent Wallet under Human Operator Root Key
    let operator_key = Keypair::from_secret_env("MASTER_OPERATOR_SECRET")?;
    let mut agent = AgentWallet::new("research-crawler-09", &operator_key);

    // 3. Define and seal strict autonomous policy bounds
    let policy = PolicyEnvelope::builder()
        .max_hourly_spend(25.0) // USDC
        .allow_destination("0x71C...OpenAIComputeGateway")
        .allow_asset("USDC")
        .require_multi_sig_above(100.0)
        .build()?;

    agent.bind_policy(policy).await?;

    // 4. Autonomous Agent executes sub-second M2M micro-payment
    let receipt = agent.transact_m2m(
        "0x71C...OpenAIComputeGateway",
        4.20,
        "BATCH_INFERENCE_PAYMENT",
    ).await?;

    println!("Transaction Committed! TxHash: {}", receipt.tx_hash);
    println!("State Merkle Root Sealed in Block #{}", receipt.block_number);
    Ok(())
}`
  },
  typescript: {
    filename: 'agent-executor.ts',
    lang: 'TypeScript SDK',
    code: `import { ApraxusClient, PolicyEnvelope, AgentWallet } from '@apraxus/sdk';

async function main() {
  // 1. Initialize client gateway
  const client = new ApraxusClient({ rpcUrl: 'https://testnet.apraxus.io' });

  // 2. Derive ephemeral agent wallet bound to human root authority
  const agent = await AgentWallet.derive({
    identity: 'data-harvester-01',
    operatorMasterKey: process.env.OPERATOR_MASTER_KEY!,
  });

  // 3. Cryptographically enforce spending ceiling
  const policy = new PolicyEnvelope({
    dailyCeiling: 50.0, // USDC
    allowedTargets: ['0xOpenAIComputeGateway...'],
    autoRevokeOnAnomaly: true,
  });

  await agent.attachPolicy(policy);

  // 4. Execute machine-to-machine settlement
  const receipt = await agent.executeM2M({
    to: '0xOpenAIComputeGateway...',
    amount: 12.50,
    action: 'INFERENCE_TOKEN_PURCHASE'
  });

  console.log(\`Execution Confirmed in \${receipt.latencyMs}ms! Hash: \${receipt.hash}\`);
}

main();`
  },
  cli: {
    filename: 'bash terminal',
    lang: 'CLI Testbed',
    code: `# 1. Start single-node local Apraxus testbed
$ apraxus-node start --dev --bind 127.0.0.1:8545

# 2. Derive a new autonomous agent envelope with spend constraints
$ apraxus-cli agent create \
    --name "crawler-01" \
    --operator "0xMasterOperator..." \
    --spend-limit "50 USDC/24h" \
    --allowlist "0x71C...OpenAIComputeGateway"

# 3. Simulate and verify policy bounds before block submission
$ apraxus-cli policy verify --agent "crawler-01" --amount 15.0 --to "0x71C...OpenAIComputeGateway"
[OK] Policy Envelope #POL-9921: 200 AUTHORIZED (Latency: 3.2ms)

# 4. Inspect block header and Merkle state receipts
$ apraxus-cli block latest --verbose`
  }
};

export const DeveloperCodeExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rust' | 'typescript' | 'cli'>('rust');
  const [copied, setCopied] = useState(false);

  const currentSnippet = CODE_EXAMPLES[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-[#7B5CFA]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left column: Developer messaging */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7B5CFA] font-semibold flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#38E8F8]" />
              Developer Experience
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Built for Modern Agent Frameworks
            </h3>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            Integrate Apraxus policy-controlled wallets seamlessly into LangChain, AutoGen, CrewAI, or standalone Rust/Python pipelines in less than 10 lines of code.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-[#7B5CFA]/20 text-[#7B5CFA] flex items-center justify-center font-bold text-[11px]">1</span>
              <span>Sub-second cryptographic verification</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-[#38E8F8]/20 text-[#38E8F8] flex items-center justify-center font-bold text-[11px]">2</span>
              <span>Deterministic zero-trust spend ceilings</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">3</span>
              <span>Instant multi-sig human escalation triggers</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="/docs"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#7B5CFA] hover:text-white transition-colors"
            >
              <span>Explore Developer Documentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right column: Interactive Code Terminal */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Terminal Tabs Bar */}
          <div className="flex items-center justify-between bg-[#070709] px-4 py-2.5 rounded-t-2xl border border-white/[0.08] border-b-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>

              {(['rust', 'typescript', 'cli'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === tab
                      ? 'bg-[#7B5CFA]/30 text-white border border-[#7B5CFA]/40 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {CODE_EXAMPLES[tab].lang}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
              title="Copy Code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Terminal Code Body */}
          <div className="bg-[#050507] p-5 rounded-b-2xl border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed shadow-inner max-h-[360px]">
            <pre>{currentSnippet.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
