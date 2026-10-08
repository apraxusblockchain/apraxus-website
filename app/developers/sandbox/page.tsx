"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  LockKeyhole,
  Network,
  ShieldCheck,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";

type SandboxResult = {
  success: boolean;
  requestId: string;
  action: string;
  status: string;
  network: string;
  agentId: string;
  token: string;
  amount: string;
  recipient: string;
  policy: {
    validAmount: boolean;
    withinTxLimit: boolean;
    withinDailyLimit: boolean;
    approvedDestination: boolean;
    allowed: boolean;
    dailyLimit: number;
    perTxLimit: number;
    spent: number;
  };
  authorization: {
    status: "authorized" | "denied";
    allowed: boolean;
    checks: Array<{
      id: string;
      label: string;
      passed: boolean;
    }>;
  };
  execution: {
    mode: "simulation_only";
    transactionSubmitted: false;
    transactionHash: null;
    status: "simulated" | "blocked";
  };
  verification: {
    status: "simulated" | "not_executed";
    onChain: false;
  };
  receipt: {
    requestId: string;
    status: string;
    assetId: string;
    asset: string;
    amount: string;
    recipient: string;
    network: string;
  };
};

const defaultRecipient =
  "0x0000000000000000000000000000000000000001";

export default function SandboxPage() {
  const [agentId, setAgentId] = useState("agent_sandbox");
  const [action, setAction] = useState<
    "payment" | "quote" | "execution"
  >("payment");
  const [amount, setAmount] = useState("10");
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [chainId, setChainId] = useState("421614");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SandboxResult | null>(null);
  const [error, setError] = useState("");

  async function runSimulation() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/developers/sandbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          agentId: agentId.trim(),
          token: "APXS",
          amount: amount.trim(),
          recipient: recipient.trim(),
          chainId: Number(chainId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ??
            data?.error ??
            "Unable to run simulation.",
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to run simulation.",
      );
    } finally {
      setLoading(false);
    }
  }

  const networkName =
    chainId === "97" ? "BNB Testnet" : "Arbitrum Sepolia";

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7B5CFA]/20 bg-[#7B5CFA]/[0.06] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-[#A78BFA]">
            <Zap className="h-3.5 w-3.5" />
            Apraxus Execution Playground
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            See how an agent earns the right to act.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
            Simulate an autonomous payment through the same policy and
            authorization concepts that control Apraxus execution.
            No blockchain transaction is submitted.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-3xl border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                <CircleDollarSign className="h-5 w-5 text-[#A78BFA]" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Create an intent
                </p>
                <p className="text-xs text-white/35">
                  Define what the agent wants to do.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-[0.16em] text-white/35">
                  Agent ID
                </label>

                <input
                  value={agentId}
                  onChange={(event) => setAgentId(event.target.value)}
                  placeholder="agent_..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-[#7B5CFA]/50"
                />

                <p className="mt-2 text-xs text-white/30">
                  Use an existing Apraxus agent ID.
                </p>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.16em] text-white/35">
                  Action
                </label>

                <select
                  value={action}
                  onChange={(event) =>
                    setAction(
                      event.target.value as
                        | "payment"
                        | "quote"
                        | "execution",
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="payment">Payment</option>
                  <option value="quote">Quote</option>
                  <option value="execution">Execution</option>
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Asset
                  </label>

                  <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <span className="font-medium">APXS</span>
                    <span className="text-xs text-white/35">
                      Testnet
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Amount
                  </label>

                  <input
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    inputMode="decimal"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none focus:border-[#7B5CFA]/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.16em] text-white/35">
                  Network
                </label>

                <select
                  value={chainId}
                  onChange={(event) =>
                    setChainId(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="421614">
                    Arbitrum Sepolia · 421614
                  </option>
                  <option value="97">
                    BNB Testnet · 97
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.16em] text-white/35">
                  Recipient
                </label>

                <input
                  value={recipient}
                  onChange={(event) =>
                    setRecipient(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-white outline-none focus:border-[#7B5CFA]/50"
                />
              </div>

              <button
                type="button"
                onClick={runSimulation}
                disabled={
                  loading ||
                  !agentId.trim() ||
                  !amount.trim() ||
                  !recipient.trim()
                }
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading
                  ? "Evaluating authorization..."
                  : "Run authorization simulation"}

                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] p-4">
                  <div className="flex gap-3">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                    <p className="text-sm leading-6 text-red-200/80">
                      {error}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Authorization pipeline
                </p>
                <p className="mt-2 text-xl font-medium">
                  Apraxus Control Layer
                </p>
              </div>

              <ShieldCheck className="h-6 w-6 text-[#A78BFA]" />
            </div>

            <div className="mt-8 space-y-3">
              <PipelineStep
                icon={<LockKeyhole className="h-4 w-4" />}
                label="Intent"
                description="Define the requested action"
                active
              />

              <PipelineStep
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Policy"
                description="Evaluate operator-defined limits"
                active
              />

              <PipelineStep
                icon={<Wallet className="h-4 w-4" />}
                label="Authorization"
                description="Decide whether the agent may act"
                active
              />

              <PipelineStep
                icon={<Zap className="h-4 w-4" />}
                label="Execution"
                description="Simulation only in this environment"
                active
              />

              <PipelineStep
                icon={<FileCheck2 className="h-4 w-4" />}
                label="Verification"
                description="Validate the simulated outcome"
                active
              />

              <PipelineStep
                icon={<CircleDollarSign className="h-4 w-4" />}
                label="Receipt"
                description="Return a structured execution record"
                active
              />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Network className="h-3.5 w-3.5" />
                Target network
              </div>

              <p className="mt-2 text-sm font-medium">
                {networkName}
              </p>

              <p className="mt-1 text-xs text-white/30">
                Simulation mode · No transaction submitted
              </p>
            </div>
          </section>
        </div>

        {result && (
          <section className="mt-6 rounded-3xl border border-white/[0.09] bg-white/[0.025] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Simulation result
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  {result.authorization.allowed
                    ? "Authorization approved"
                    : "Authorization denied"}
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  Request {result.requestId}
                </p>
              </div>

              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                  result.authorization.allowed
                    ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                    : "border-red-400/20 bg-red-400/[0.08] text-red-300"
                }`}
              >
                {result.authorization.allowed ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <XCircle className="h-3.5 w-3.5" />
                )}

                {result.authorization.status.toUpperCase()}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.authorization.checks.map((check) => (
                <div
                  key={check.id}
                  className="rounded-2xl border border-white/[0.08] bg-black/25 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-white/65">
                      {check.label}
                    </span>

                    {check.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-300" />
                    )}
                  </div>

                  <p
                    className={`mt-2 text-xs ${
                      check.passed
                        ? "text-emerald-300/70"
                        : "text-red-300/70"
                    }`}
                  >
                    {check.passed ? "PASS" : "BLOCKED"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <ResultCard
                title="Policy"
                icon={<ShieldCheck className="h-4 w-4" />}
              >
                <ResultRow
                  label="Daily limit"
                  value={`${result.policy.dailyLimit} APXS`}
                />
                <ResultRow
                  label="Spent"
                  value={`${result.policy.spent} APXS`}
                />
                <ResultRow
                  label="Per transaction"
                  value={`${result.policy.perTxLimit} APXS`}
                />
              </ResultCard>

              <ResultCard
                title="Execution"
                icon={<Zap className="h-4 w-4" />}
              >
                <ResultRow
                  label="Mode"
                  value="Simulation only"
                />
                <ResultRow
                  label="Submitted"
                  value="No"
                />
                <ResultRow
                  label="Network"
                  value={result.receipt.network}
                />
              </ResultCard>

              <ResultCard
                title="Verification"
                icon={<FileCheck2 className="h-4 w-4" />}
              >
                <ResultRow
                  label="Status"
                  value={result.verification.status}
                />
                <ResultRow
                  label="On-chain"
                  value="No"
                />
                <ResultRow
                  label="Receipt"
                  value={result.receipt.status}
                />
              </ResultCard>
            </div>

            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-black/25 p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileCheck2 className="h-4 w-4 text-[#A78BFA]" />
                Execution receipt
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultRow
                  label="Asset"
                  value={`${result.receipt.asset} · ${result.receipt.assetId}`}
                />
                <ResultRow
                  label="Amount"
                  value={`${result.receipt.amount} ${result.receipt.asset}`}
                />
                <ResultRow
                  label="Network"
                  value={result.receipt.network}
                />
                <ResultRow
                  label="Status"
                  value={result.receipt.status}
                />
              </div>

              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/25">
                  Recipient
                </p>

                <p className="mt-2 break-all font-mono text-xs text-white/50">
                  {result.receipt.recipient}
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="mt-6 text-center text-xs text-white/25">
          Sandbox simulation only · No blockchain transaction is submitted
        </div>
      </div>
    </main>
  );
}

function PipelineStep({
  icon,
  label,
  description,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-4 ${
        active
          ? "border-white/[0.08] bg-black/25"
          : "border-white/[0.04] bg-black/10"
      }`}
    >
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-[#A78BFA]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-white/30">
          {description}
        </p>
      </div>

      <span className="h-2 w-2 rounded-full bg-emerald-400" />
    </div>
  );
}

function ResultCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-[#A78BFA]">{icon}</span>
        {title}
      </div>

      <div className="mt-5 space-y-3">{children}</div>
    </div>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs">
      <span className="text-white/30">{label}</span>
      <span className="text-right font-mono text-white/65">
        {value}
      </span>
    </div>
  );
}
