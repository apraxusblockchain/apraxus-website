"use client";

import { useEffect, useState } from "react";

const DEVELOPER_ID_KEY = "apraxus_developer_id";

export default function DeveloperKeysPage() {
  const [developerId, setDeveloperId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function initializeDeveloper() {
      const existingId = window.localStorage.getItem(DEVELOPER_ID_KEY);

      if (existingId) {
        setDeveloperId(existingId);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/v1/developers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Apraxus Development",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.developer?.developerId) {
        setError(data.error ?? "Failed to create developer account");
        setLoading(false);
        return;
      }

      const id = data.developer.developerId;
      window.localStorage.setItem(DEVELOPER_ID_KEY, id);
      setDeveloperId(id);
      setLoading(false);
    }

    initializeDeveloper().catch(() => {
      setError("Failed to initialize developer account");
      setLoading(false);
    });
  }, []);

  async function createKey() {
    if (!developerId) return;

    setError("");

    const response = await fetch("/api/v1/keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ developerId }),
    });

    const data = await response.json();

    if (!response.ok || !data.key?.apiKey) {
      setError(data.error ?? "Failed to create API key");
      return;
    }

    setApiKey(data.key.apiKey);
    setCopied(false);
  }

  async function copyKey() {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.25em] text-white/50">
          Developer Platform
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          API Keys
        </h1>

        <p className="mt-4 max-w-2xl text-white/60">
          Create a development API key for integrating with the Apraxus API.
        </p>

        <section className="mt-10 rounded-2xl border border-white/10 p-6">
          <button
            onClick={createKey}
            disabled={loading || !developerId}
            className="rounded-xl border border-white/15 px-5 py-3 text-sm transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Initializing..." : "Create API Key"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          {apiKey && (
            <div className="mt-6">
              <p className="text-sm text-white/50">
                Store this key securely. It will only be shown here once.
              </p>

              <code className="mt-3 block overflow-x-auto rounded-xl border border-white/10 p-4 text-sm">
                {apiKey}
              </code>

              <button
                onClick={copyKey}
                className="mt-4 rounded-xl border border-white/15 px-4 py-2 text-sm transition hover:bg-white/5"
              >
                {copied ? "Copied" : "Copy API Key"}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
