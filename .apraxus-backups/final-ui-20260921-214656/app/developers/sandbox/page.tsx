"use client";

import { useState } from "react";

export default function SandboxPage() {
  const [action, setAction] = useState("payment");
  const [result, setResult] = useState("");

  async function runSimulation() {
    setResult("Running simulation...");

    const response = await fetch("/api/developers/sandbox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        agentId: "agent_demo_01",
        token: "APXS",
        amount: "10",
      }),
    });

    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-white/40">
          Developer Sandbox
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Test Apraxus flows
        </h1>

        <p className="mt-4 text-white/60">
          Simulate payment, quote, and execution flows without submitting a
          real blockchain transaction.
        </p>

        <div className="mt-10 space-y-4">
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3"
          >
            <option value="payment">Payment</option>
            <option value="quote">Quote</option>
            <option value="execution">Execution</option>
          </select>

          <button
            onClick={runSimulation}
            className="rounded-xl border border-white/15 px-5 py-3 transition hover:bg-white/5"
          >
            Run Simulation
          </button>

          {result && (
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-5 text-sm text-white/70">
              {result}
            </pre>
          )}
        </div>
      </div>
    </main>
  );
}
