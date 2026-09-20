"use client";

import { useState } from "react";

export default function DeveloperKeysPage() {
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  async function createKey() {
    const response = await fetch("/api/v1/keys", {
      method: "POST",
    });

    const data = await response.json();

    if (data.apiKey) {
      setApiKey(data.apiKey);
      setCopied(false);
    }
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
            className="rounded-xl border border-white/15 px-5 py-3 text-sm transition hover:bg-white/5"
          >
            Create API Key
          </button>

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
