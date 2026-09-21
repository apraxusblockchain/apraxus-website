"use client";

import { useEffect, useState } from "react";

type Metric = {
  endpoint: string;
  timestamp: string;
};

type MetricsResponse = {
  success: boolean;
  environment?: string;
  totalRequests?: number;
  metrics?: Metric[];
  error?: {
    message?: string;
  };
};

export default function DeveloperMetricsPage() {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/developers/metrics")
      .then((response) => response.json())
      .then(setData)
      .catch(() =>
        setData({
          success: false,
          error: { message: "Unable to load metrics." },
        })
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.25em] text-white/40">
          Developer Platform
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          API Metrics
        </h1>

        <p className="mt-5 max-w-2xl text-white/60">
          Development request activity for the Apraxus API on Arbitrum Sepolia.
        </p>

        {loading ? (
          <div className="mt-10 rounded-2xl border border-white/10 p-6 text-white/50">
            Loading metrics...
          </div>
        ) : !data?.success ? (
          <div className="mt-10 rounded-2xl border border-white/10 p-6 text-white/60">
            {data?.error?.message ?? "Unable to load metrics."}
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 p-6">
                <p className="text-sm text-white/40">Total Requests</p>
                <p className="mt-3 text-3xl font-semibold">
                  {data.totalRequests ?? 0}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-6">
                <p className="text-sm text-white/40">Environment</p>
                <p className="mt-3 text-xl font-medium">
                  {data.environment ?? "development"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-6">
                <p className="text-sm text-white/40">Network</p>
                <p className="mt-3 text-xl font-medium">
                  Arbitrum Sepolia
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-medium">Recent Requests</h2>

              <div className="mt-6 space-y-3">
                {(data.metrics ?? []).length === 0 ? (
                  <p className="text-white/40">No requests recorded yet.</p>
                ) : (
                  data.metrics?.map((metric, index) => (
                    <div
                      key={`${metric.timestamp}-${index}`}
                      className="flex flex-col gap-2 rounded-xl border border-white/10 p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <span className="font-mono text-sm text-white/80">
                        {metric.endpoint}
                      </span>

                      <span className="text-sm text-white/40">
                        {new Date(metric.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
