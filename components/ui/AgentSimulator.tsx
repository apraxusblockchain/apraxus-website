'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Bot, 
  Wallet, 
  RefreshCw, 
  Key, 
  ArrowRight, 
  Zap, 
  FileCode2, 
  FileText, 
  Copy, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

interface SimulationResult {
  allowed: boolean;
  reason: string;
  txHash?: string;
  gasCost?: string;
  requiresMultiSig?: boolean;
}

export const AgentSimulator: React.FC = () => {
  const [agentName, setAgentName] = useState('DataCrawler_Alpha');
  const [budgetLimit, setBudgetLimit] = useState(50);
  const [timeWindow, setTimeWindow] = useState<'hourly' | 'daily' | 'monthly'>('daily');
  const [selectedAsset, setSelectedAsset] = useState('USDC');
  const [targetDestination, setTargetDestination] = useState('0x71C...OpenAI_Gateway');
  const [attemptedAmount, setAttemptedAmount] = useState(25);
  const [attemptedAction, setAttemptedAction] = useState('API_QUERY_PAYMENT');
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'ui' | 'json'>('ui');
  const [copied, setCopied] = useState(false);

  // Policy restrictions
  const [allowlistAssets] = useState(['USDC', 'APX']);
  const [allowlistDestinations] = useState(['0x71C...OpenAI_Gateway', '0x99A...Anthropic_Relay']);
  const [allowedActions] = useState(['API_QUERY_PAYMENT', 'CONTRACT_CALL']);

  const policyJson = {
    agent_id: agentName,
    policy_version: "1.0.0",
    envelope: {
      budget_ceiling: budgetLimit,
      currency: selectedAsset,
      time_window: timeWindow,
      allowed_destinations: allowlistDestinations,
      allowed_assets: allowlistAssets,
      human_escalation_threshold: 100.0,
      auto_revoke_on_exception: true
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(policyJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setIsProcessing(true);
    setSimResult(null);

    setTimeout(() => {
      setIsProcessing(false);

      // 1. Asset Check
      if (!allowlistAssets.includes(selectedAsset)) {
        setSimResult({
          allowed: false,
          reason: `Policy Violation: Asset '${selectedAsset}' is not on the agent's allowlist.`,
        });
        return;
      }

      // 2. Budget Limit Check
      if (attemptedAmount > budgetLimit) {
        setSimResult({
          allowed: false,
          reason: `Spend Limit Exceeded: Attempted amount (${attemptedAmount} ${selectedAsset}) exceeds ${timeWindow} limit of ${budgetLimit} ${selectedAsset}.`,
        });
        return;
      }

      // 3. Destination Check
      if (!allowlistDestinations.includes(targetDestination)) {
        setSimResult({
          allowed: false,
          reason: `Destination Blocked: Target address '${targetDestination}' is not in approved policy registry.`,
        });
        return;
      }

      // 4. Escalation Trigger ($100+ requires Human Multi-Sig)
      if (attemptedAmount >= 100) {
        setSimResult({
          allowed: true,
          requiresMultiSig: true,
          reason: `Human Multi-Sig Required: Transaction amount (${attemptedAmount} ${selectedAsset}) meets or exceeds the escalation threshold ($100.00). Pending 2-of-3 operator approval.`,
          txHash: `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
          gasCost: '0.00045 APX',
        });
        return;
      }

      // 5. Standard Autonomous Execution Pass
      setSimResult({
        allowed: true,
        reason: `Policy Approved: Autonomous execution authorized under envelope #POL-9921.`,
        txHash: `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        gasCost: '0.00021 APX',
      });
    }, 350);
  };

  const handleReset = () => {
    setAttemptedAmount(25);
    setSelectedAsset('USDC');
    setTargetDestination('0x71C...OpenAI_Gateway');
    setSimResult(null);
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
      {/* Disclaimer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-300">
            Deterministic Policy Engine Simulator
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Toggle between UI and JSON */}
          <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10 text-[11px] font-mono">
            <button
              onClick={() => setViewMode('ui')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'ui' ? 'bg-[#6B35D5] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Controls UI
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                viewMode === 'json' ? 'bg-[#6B35D5] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileCode2 className="w-3 h-3" /> Policy JSON
            </button>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-amber-500/30 text-[11px] font-mono text-amber-300">
            ⚠️ Concept Demo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Policy Configuration (Agent Spec) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center justify-between text-white font-mono text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#8A5CE6]" />
              <span>1. Agent Envelope & Policy Bounds</span>
            </div>
            {viewMode === 'json' && (
              <button
                onClick={handleCopyJson}
                className="text-[11px] font-mono text-purple-300 hover:text-white flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            )}
          </div>

          {viewMode === 'ui' ? (
            <div className="bg-[#0A0A0D]/70 rounded-xl p-4 border border-white/5 flex flex-col gap-4 text-xs font-mono">
              {/* Agent ID */}
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-zinc-400">Agent Identifier:</span>
                <span className="text-white bg-white/5 px-2 py-1 rounded">{agentName}</span>
              </div>

              {/* Spend limit slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-400">Spending Ceiling ({timeWindow}):</span>
                  <span className="text-[#8A5CE6] font-bold">{budgetLimit} USDC</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="w-full accent-[#8A5CE6] bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Allowed destinations list */}
              <div>
                <span className="text-zinc-400 block mb-1">Approved Target Destinations:</span>
                <div className="flex flex-col gap-1 text-[11px]">
                  {allowlistDestinations.map((dest) => (
                    <div key={dest} className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{dest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <pre className="bg-[#050507] p-4 rounded-xl border border-white/5 text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed max-h-[190px]">
              {JSON.stringify(policyJson, null, 2)}
            </pre>
          )}

          {/* Transaction Attempt Box */}
          <div className="flex items-center gap-2 text-white font-mono text-sm font-semibold pt-2">
            <Zap className="w-4 h-4 text-[#38BDF8]" />
            <span>2. Autonomous Transaction Attempt</span>
          </div>

          <div className="bg-[#0A0A0D]/70 rounded-xl p-4 border border-white/5 flex flex-col gap-3.5 text-xs font-mono">
            <div>
              <label className="text-zinc-400 block mb-1">Select Target Destination:</label>
              <select
                value={targetDestination}
                onChange={(e) => setTargetDestination(e.target.value)}
                className="w-full bg-[#1A1820] text-white p-2 rounded-lg border border-white/10 focus:border-[#8A5CE6] focus:outline-none"
              >
                <option value="0x71C...OpenAI_Gateway">0x71C...OpenAI_Gateway (Allowlisted)</option>
                <option value="0x99A...Anthropic_Relay">0x99A...Anthropic_Relay (Allowlisted)</option>
                <option value="0xBAD...Unknown_External_Wallet">0xBAD...Unknown_External_Wallet (Unauthorized)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-400 block mb-1">Asset:</label>
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full bg-[#1A1820] text-white p-2 rounded-lg border border-white/10 focus:border-[#8A5CE6] focus:outline-none"
                >
                  <option value="USDC">USDC (Allowed)</option>
                  <option value="APX">APX (Allowed)</option>
                  <option value="ETH">ETH (Blocked Asset)</option>
                </select>
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Amount to Spend:</label>
                <input
                  type="number"
                  value={attemptedAmount}
                  onChange={(e) => setAttemptedAmount(Number(e.target.value))}
                  className="w-full bg-[#1A1820] text-white p-2 rounded-lg border border-white/10 focus:border-[#8A5CE6] focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isProcessing}
              className="mt-2 w-full py-2.5 rounded-lg bg-[#6B35D5] hover:bg-[#8A5CE6] text-white font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#6B35D5]/30"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Evaluating Policy...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" /> Evaluate & Execute Transaction
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Policy Decision & Execution Receipt */}
        <div className="lg:col-span-6 flex flex-col gap-4 justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Protocol Verification Terminal
              </span>
              <button
                onClick={handleReset}
                className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Terminal Window */}
            <div className="bg-[#050507] rounded-xl p-5 border border-white/10 font-mono text-xs text-left min-h-[310px] flex flex-col justify-between shadow-inner">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-zinc-500 border-b border-white/5 pb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] ml-2 text-zinc-500">apraxus-policy-daemon v0.2.1-prototype</span>
                </div>

                <div className="text-zinc-500 text-[11px]">
                  [SYS] Agent: <span className="text-zinc-300">{agentName}</span>
                </div>
                <div className="text-zinc-500 text-[11px]">
                  [POL] Envelope Budget: <span className="text-zinc-300">{budgetLimit} USDC / {timeWindow}</span>
                </div>
                <div className="text-zinc-500 text-[11px]">
                  [REQ] Action: <span className="text-purple-300">{attemptedAction}</span> ({attemptedAmount} {selectedAsset})
                </div>
                <div className="text-zinc-500 text-[11px] truncate">
                  [REQ] Dest: <span className="text-zinc-300">{targetDestination}</span>
                </div>

                {/* Simulated Result Output */}
                {simResult && (
                  <div
                    className={`mt-4 p-3 rounded-lg border transition-all ${
                      simResult.requiresMultiSig
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                        : simResult.allowed
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1 text-xs">
                      {simResult.requiresMultiSig ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>ESCALATION: MULTI-SIG APPROVAL REQUIRED</span>
                        </>
                      ) : simResult.allowed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>STATUS: EXECUTION AUTHORIZED (200 OK)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>STATUS: TRANSACTION REJECTED (403 FORBIDDEN)</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">{simResult.reason}</p>

                    {simResult.allowed && (
                      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-zinc-400 flex flex-col gap-1">
                        <div>TxHash: <span className="text-emerald-300 font-mono">{simResult.txHash}</span></div>
                        <div>Protocol Fee: <span className="text-zinc-300">{simResult.gasCost}</span></div>
                        <div>Receipt: <span className="text-zinc-300">Cryptographically Sealed in State Tree</span></div>
                      </div>
                    )}
                  </div>
                )}

                {!simResult && !isProcessing && (
                  <div className="mt-6 text-center text-zinc-600 text-xs italic">
                    Configure policy bounds on the left and click "Evaluate" to run verification.
                  </div>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
                <span>Deterministic Zero-Trust Sandbox</span>
                <span>Latency: ~3.8ms</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 font-sans leading-relaxed">
            * This simulator demonstrates how Apraxus enables fine-grained spending limits, asset allowlists, and execution boundaries for autonomous agents before smart contract transactions touch the network.
          </div>
        </div>
      </div>
    </div>
  );
};
