"use client";

import { FormEvent, useEffect, useState } from "react";
import { APRAXUS_NETWORKS } from "@/lib/web3/network-registry";
import { APRAXUS_ASSETS } from "@/lib/web3/assets/registry";
import { AgentPaymentConsole } from "@/components/ui/AgentPaymentConsole";

type Agent = {
  agentId: string;
  name: string;
  description?: string | null;
  status: string;
  createdAt: string;
};

type Wallet = {
  agentId: string;
  walletAddress: string;
  chainId: number;
  boundAt: string;
};

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const [agentId, setAgentId] = useState("");
  const [agent, setAgent] = useState<Agent | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [chainId, setChainId] = useState(
    String(APRAXUS_NETWORKS.arbitrumSepolia.chainId),
  );
  const [loading, setLoading] = useState(true);
  const [walletLoading, setWalletLoading] = useState(true);
  const [binding, setBinding] = useState(false);
  const [error, setError] = useState("");
  const [walletError, setWalletError] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [perTxLimit, setPerTxLimit] = useState("");
  const [spent, setSpent] = useState(0);
  const [policyLoading, setPolicyLoading] = useState(true);
  const [policySaving, setPolicySaving] = useState(false);
  const [policyError, setPolicyError] = useState("");
  const [policyMessage, setPolicyMessage] = useState("");
  const [executionRecords, setExecutionRecords] = useState<
    Array<{
      requestId: string;
      assetId: string;
      assetKind: string;
      amount: string;
      recipient: string;
      status: string;
      transactionHash?: string;
      createdAt: string;
    }>
  >([]);
  const [executionLoading, setExecutionLoading] = useState(true);
  const [executionError, setExecutionError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const resolved = await params;
        setAgentId(resolved.agentId);

        const response = await fetch(
          `/api/developers/agents/${encodeURIComponent(resolved.agentId)}`,
          { cache: "no-store" },
        );

        const data = await response.json();

        if (!response.ok || !data.agent) {
          throw new Error(
            data?.error?.message ?? data?.error ?? "Unable to load agent.",
          );
        }

        setAgent(data.agent);

        const walletResponse = await fetch(
          `/api/developers/agents/${encodeURIComponent(resolved.agentId)}/wallet`,
          { cache: "no-store" },
        );

        const walletData = await walletResponse.json();

        if (walletResponse.ok && walletData.wallet) {
          setWallet(walletData.wallet);
        }

        const policyResponse = await fetch(
          `/api/developers/agents/${encodeURIComponent(resolved.agentId)}/policy`,
          { cache: "no-store" },
        );

        const policyData = await policyResponse.json();

        if (!policyResponse.ok || !policyData.policy) {
          throw new Error(
            policyData?.error?.message ??
              policyData?.error ??
              "Unable to load agent policy.",
          );
        }

        setDailyLimit(String(policyData.policy.dailyLimit));
        setPerTxLimit(String(policyData.policy.perTxLimit));
        setSpent(Number(policyData.accounting?.spent ?? 0));

        const executionResponse = await fetch(
          `/api/developers/agents/${encodeURIComponent(resolved.agentId)}/executions`,
          { cache: "no-store" },
        );

        const executionData = await executionResponse.json();

        if (executionResponse.ok && Array.isArray(executionData.records)) {
          setExecutionRecords(executionData.records);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load agent.",
        );
      } finally {
        setLoading(false);
        setWalletLoading(false);
        setPolicyLoading(false);
        setExecutionLoading(false);
      }
    }

    load();
  }, [params]);

  async function savePolicy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPolicyError("");
    setPolicyMessage("");
    setPolicySaving(true);

    const daily = Number(dailyLimit);
    const perTx = Number(perTxLimit);

    if (
      !Number.isFinite(daily) ||
      !Number.isFinite(perTx) ||
      daily <= 0 ||
      perTx <= 0 ||
      perTx > daily ||
      !Number.isInteger(daily) ||
      !Number.isInteger(perTx)
    ) {
      setPolicyError(
        "Daily limit and per-transaction limit must be positive integers, with per-transaction limit no greater than daily limit.",
      );
      setPolicySaving(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/developers/agents/${encodeURIComponent(agentId)}/policy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dailyLimit: daily,
            perTxLimit: perTx,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.policy) {
        throw new Error(
          data?.error?.message ??
            data?.error ??
            "Unable to save policy.",
        );
      }

      setDailyLimit(String(data.policy.dailyLimit));
      setPerTxLimit(String(data.policy.perTxLimit));
      setPolicyMessage("Policy updated.");
    } catch (err) {
      setPolicyError(
        err instanceof Error ? err.message : "Unable to save policy.",
      );
    } finally {
      setPolicySaving(false);
    }
  }

  async function bindWallet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWalletError("");

    if (!walletAddress.trim()) {
      setWalletError("Wallet address is required.");
      return;
    }

    setBinding(true);

    try {
      const response = await fetch(
        `/api/developers/agents/${encodeURIComponent(agentId)}/wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: walletAddress.trim(),
            chainId: Number(chainId),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.wallet) {
        throw new Error(
          data?.error?.message ??
            data?.error ??
            "Unable to bind wallet.",
        );
      }

      setWallet(data.wallet);
      setWalletAddress("");
    } catch (err) {
      setWalletError(
        err instanceof Error ? err.message : "Unable to bind wallet.",
      );
    } finally {
      setBinding(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-white/50">
          Loading agent…
        </div>
      </main>
    );
  }

  if (error || !agent) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            Developer Platform
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Agent unavailable</h1>
          <p className="mt-4 text-white/50">
            {error || "The requested agent could not be loaded."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.25em] text-white/40">
          Developer Platform / Agents
        </p>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight">
              {agent.name}
            </h1>
            <p className="mt-3 max-w-2xl text-white/50">
              {agent.description || "Autonomous agent infrastructure."}
            </p>
          </div>

          <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60">
            {agent.status}
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                Execution Wallet
              </p>
              <h2 className="mt-2 text-2xl font-medium">Wallet</h2>
            </div>

            {wallet && (
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                Bound
              </span>
            )}
          </div>

          {walletLoading ? (
            <p className="mt-6 text-sm text-white/40">
              Loading wallet…
            </p>
          ) : wallet ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Address
                </p>
                <p className="mt-2 break-all font-mono text-sm text-white/70">
                  {wallet.walletAddress}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Network
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {Object.values(APRAXUS_NETWORKS).find(
                    (network) => network.chainId === wallet.chainId,
                  )?.name ?? `Chain ${wallet.chainId}`}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={bindWallet} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-white/60">
                  Wallet address
                </label>
                <input
                  value={walletAddress}
                  onChange={(event) => setWalletAddress(event.target.value)}
                  placeholder="0x..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                />
              </div>

              <div>
                <label className="text-sm text-white/60">
                  Network
                </label>
                <select
                  value={chainId}
                  onChange={(event) => setChainId(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none"
                >
                  {Object.values(APRAXUS_NETWORKS).map((network) => (
                    <option key={network.chainId} value={network.chainId}>
                      {network.name} · {network.chainId}
                    </option>
                  ))}
                </select>
              </div>

              {walletError && (
                <p className="text-sm text-red-400">{walletError}</p>
              )}

              <button
                type="submit"
                disabled={binding}
                className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {binding ? "Binding…" : "Bind Wallet"}
              </button>
            </form>
          )}
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Authorization Policy
          </p>
          <h2 className="mt-2 text-2xl font-medium">Policy</h2>

          {policyLoading ? (
            <p className="mt-6 text-sm text-white/40">
              Loading policy…
            </p>
          ) : (
            <>
              <form onSubmit={savePolicy} className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm text-white/60">
                    Daily limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={dailyLimit}
                    onChange={(event) => setDailyLimit(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white/25"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/60">
                    Per-transaction limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={perTxLimit}
                    onChange={(event) => setPerTxLimit(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white/25"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/40">
                    Current daily spend:{" "}
                    <span className="text-white/70">{spent}</span>
                  </p>

                  <button
                    type="submit"
                    disabled={policySaving}
                    className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {policySaving ? "Saving…" : "Save Policy"}
                  </button>
                </div>
              </form>

              {policyError && (
                <p className="mt-4 text-sm text-red-400">{policyError}</p>
              )}

              {policyMessage && (
                <p className="mt-4 text-sm text-white/50">{policyMessage}</p>
              )}
            </>
          )}
        </section>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:col-span-1">
            <p className="text-lg font-medium">Assets & Chains</p>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Registered assets and networks currently available through Apraxus.
            </p>

            <div className="mt-6 space-y-3">
              {Object.values(APRAXUS_ASSETS)
                .filter((asset) => asset.enabled)
                .map((asset) => {
                  const network = Object.values(APRAXUS_NETWORKS).find(
                    (item) => item.chainId === asset.chainId,
                  );

                  return (
                    <div
                      key={asset.id}
                      className="rounded-xl border border-white/10 bg-black/40 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">{asset.symbol}</p>
                          <p className="mt-1 text-xs text-white/40">
                            {asset.name}
                          </p>
                        </div>

                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white/40">
                          {asset.kind}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/35">
                        <span>
                          {network?.name ?? `Chain ${asset.chainId}`}
                        </span>
                        <span>{asset.decimals} decimals</span>
                        <span>Chain {asset.chainId}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-medium">Execution</p>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Create a controlled execution intent for this agent.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Execution intent</p>
                  <p className="mt-1 text-xs text-white/35">
                    Intent-only mode. No blockchain transaction is submitted here.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Controlled
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className="text-xs text-white/40">Asset</span>
                  <select
                    id="execution-asset"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none"
                    defaultValue={wallet ? `apxs:${wallet.chainId}` : ""}
                  >
                    <option value="">Select asset</option>
                    {Object.values(APRAXUS_ASSETS)
                      .filter((asset) => asset.enabled)
                      .map((asset) => (
                        <option key={asset.id} value={asset.id}>
                          {asset.symbol} · Chain {asset.chainId}
                        </option>
                      ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs text-white/40">Amount</span>
                  <input
                    id="execution-amount"
                    inputMode="decimal"
                    placeholder="0.00"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none placeholder:text-white/20"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-white/40">Recipient</span>
                  <input
                    id="execution-recipient"
                    placeholder="0x..."
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none placeholder:text-white/20"
                  />
                </label>
              </div>

              {executionError && (
                <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/60">
                  {executionError}
                </p>
              )}

              <button
                type="button"
                className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5"
                onClick={async () => {
                  const assetId = (
                    document.getElementById("execution-asset") as HTMLSelectElement
                  )?.value;
                  const amount = (
                    document.getElementById("execution-amount") as HTMLInputElement
                  )?.value.trim();
                  const recipient = (
                    document.getElementById("execution-recipient") as HTMLInputElement
                  )?.value.trim();

                  if (!assetId || !amount || !recipient) {
                    setExecutionError(
                      "Asset, amount, and recipient are required.",
                    );
                    return;
                  }

                  const asset = APRAXUS_ASSETS[
                    assetId as keyof typeof APRAXUS_ASSETS
                  ];

                  if (!asset) {
                    setExecutionError("Selected asset is not registered.");
                    return;
                  }

                  try {
                    setExecutionError("");

                    const response = await fetch("/api/developers/executions", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Idempotency-Key": crypto.randomUUID(),
                      },
                      body: JSON.stringify({
                        agentId,
                        wallet: wallet?.walletAddress ?? "",
                        token: asset.symbol,
                        amount,
                        recipient,
                        chainId: asset.chainId,
                      }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                      throw new Error(
                        data?.error?.message ??
                          data?.error ??
                          "Unable to create execution intent.",
                      );
                    }

                    const historyResponse = await fetch(
                      `/api/developers/agents/${encodeURIComponent(agentId)}/executions`,
                      { cache: "no-store" },
                    );
                    const historyData = await historyResponse.json();

                    if (
                      historyResponse.ok &&
                      Array.isArray(historyData.records)
                    ) {
                      setExecutionRecords(historyData.records);
                    }
                  } catch (err) {
                    setExecutionError(
                      err instanceof Error
                        ? err.message
                        : "Unable to create execution intent.",
                    );
                  }
                }}
              >
                Create execution intent
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Recent activity</p>
                  <p className="mt-1 text-xs text-white/35">
                    Latest execution activity for this agent.
                  </p>
                </div>

                <a
                  href="/developers/transactions"
                  className="text-xs text-white/50 transition hover:text-white"
                >
                  View all →
                </a>
              </div>

              {executionLoading ? (
                <p className="mt-4 text-sm text-white/35">
                  Loading recent activity…
                </p>
              ) : executionRecords.length === 0 ? (
                <p className="mt-4 text-sm text-white/35">
                  No execution activity yet.
                </p>
              ) : (
                <div className="mt-4 space-y-2">
                  {executionRecords.slice(0, 3).map((record) => (
                    <div
                      key={record.requestId}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-white/55">
                            {record.assetId}
                          </span>
                          <span className="text-sm text-white/75">
                            {record.amount}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-white/30">
                          {new Date(record.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white/45">
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="mt-8">
          <AgentPaymentConsole agentId={agentId} agentName={agent?.name ?? ""} />
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Agent ID
          </p>
          <p className="mt-3 break-all font-mono text-sm text-white/60">
            {agentId}
          </p>
        </section>
      </div>
    </main>
  );
}
