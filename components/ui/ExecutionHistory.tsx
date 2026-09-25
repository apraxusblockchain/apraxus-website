"use client";

import { useEffect, useState } from "react";

type ExecutionRecord = {
  requestId: string;
  agentId: string;
  walletAddress: string;
  chainId: number;
  amount: string;
  recipient: string;
  transactionHash?: string;
  blockNumber?: string;
  status: "pending" | "submitted" | "confirmed" | "failed" | "reverted";
  createdAt: string;
  confirmedAt?: string;
};

export function ExecutionHistory() {
  const [records, setRecords] = useState<ExecutionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/developers/executions/list")
      .then((response) => response.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.records)) {
          setRecords(data.records);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mt-12 rounded-2xl border border-white/10 p-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-white/40">
          Execution History
        </p>

        <p className="mt-2 text-sm leading-6 text-white/50">
          Development-session execution records and settlement status.
        </p>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-white/40">
          Loading execution records...
        </p>
      ) : records.length === 0 ? (
        <p className="mt-6 text-sm text-white/40">
          No execution records in the current development session.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {records.map((record) => (
            <div
              key={record.requestId}
              className="rounded-xl border border-white/10 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-white/50">
                  {record.requestId}
                </span>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                  {record.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                <div>
                  <p className="text-white/30">Agent</p>
                  <p className="mt-1 text-white/70">{record.agentId}</p>
                </div>

                <div>
                  <p className="text-white/30">Amount</p>
                  <p className="mt-1 text-white/70">
                    {record.amount} APXS
                  </p>
                </div>

                <div>
                  <p className="text-white/30">Chain</p>
                  <p className="mt-1 text-white/70">
                    {record.chainId === 97
                      ? "BNB Testnet"
                      : "Arbitrum Sepolia"}
                  </p>
                </div>

                <div>
                  <p className="text-white/30">Block</p>
                  <p className="mt-1 text-white/70">
                    {record.blockNumber ?? "—"}
                  </p>
                </div>
              </div>

              {record.transactionHash && (
                <p className="mt-4 break-all font-mono text-xs text-white/40">
                  {record.transactionHash}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
