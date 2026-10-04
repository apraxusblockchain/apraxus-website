"use client";

import { FormEvent, useEffect, useState } from "react";

type Agent = {
  agentId: string;
  name: string;
  description?: string | null;
  status: string;
  createdAt: string;
};

export default function DeveloperAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function loadAgents() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/developers/agents", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message ?? data?.error ?? "Unable to load agents.");
      }

      setAgents(data?.agents ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load agents.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAgents();
  }, []);

  async function createAgent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Agent name is required.");
      return;
    }

    setCreating(true);
    setError("");

    try {
      const response = await fetch("/api/developers/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message ?? data?.error ?? "Unable to create agent.");
      }

      setName("");
      setDescription("");
      await loadAgents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create agent.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            Apraxus Developer Platform
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Agents
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Create and manage the autonomous agents that operate through
            Apraxus policy, wallet and execution infrastructure.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <section className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Create Agent
            </p>

            <form onSubmit={createAgent} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Name
                </label>

                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Treasury Agent"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-white/25"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="What should this agent do?"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-white/25"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={creating}
                className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating ? "Creating Agent..." : "Create Agent"}
              </button>
            </form>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                  Your Agents
                </p>

                <p className="mt-2 text-sm text-white/40">
                  {agents.length} agent{agents.length === 1 ? "" : "s"}
                </p>
              </div>

              <button
                onClick={loadAgents}
                disabled={loading}
                className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-white/20 hover:text-white disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <div className="rounded-2xl border border-white/10 p-6 text-sm text-white/40">
                  Loading agents...
                </div>
              ) : agents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
                  <p className="text-sm text-white/60">
                    No agents created yet.
                  </p>

                  <p className="mt-2 text-xs text-white/35">
                    Create your first agent to start configuring its
                    wallet and execution policy.
                  </p>
                </div>
              ) : (
                agents.map((agent) => (
                  <a
                    key={agent.agentId}
                    href={`/developers/agents/${encodeURIComponent(agent.agentId)}`}
                    className="block rounded-2xl border border-white/10 p-5 transition hover:border-white/20 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-medium">
                          {agent.name}
                        </h2>

                        <p className="mt-2 text-sm text-white/45">
                          {agent.description || "No description provided."}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                        {agent.status}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/35">
                      <span className="font-mono">
                        {agent.agentId}
                      </span>

                      <span>
                        Created {new Date(agent.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-5 text-sm text-white/70">
                      Open Agent →
                    </div>
                  </a>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
