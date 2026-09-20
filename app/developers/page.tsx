const capabilities = [
  {
    label: "API",
    title: "API v1",
    description: "Payments, quotes, executions and webhook infrastructure.",
  },
  {
    label: "SDK",
    title: "@apraxus/sdk",
    description: "Developer client foundation for integrating Apraxus.",
  },
  {
    label: "Network",
    title: "Arbitrum Sepolia",
    description: "Current testnet environment for development and integration.",
  },
];

export default function DevelopersPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.25em] text-white/50">
          Apraxus Developer Platform
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Build with Apraxus
        </h1>

        <p className="mt-4 max-w-2xl text-white/60">
          Infrastructure for applications and autonomous software to interact
          with wallets, policies, payments and blockchain execution.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((item) => (
            <section
              key={item.title}
              className="rounded-2xl border border-white/10 p-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                {item.label}
              </p>

              <h2 className="mt-3 text-xl font-medium">{item.title}</h2>

              <p className="mt-3 text-sm leading-6 text-white/60">
                {item.description}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Developer workflow
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            {[
              "Intent",
              "Agent",
              "Policy",
              "Wallet",
              "Execution",
              "Receipt",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-lg border border-white/10 px-4 py-2">
                  {step}
                </span>

                {index < 5 && (
                  <span className="text-white/30">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/developers/docs"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm transition hover:bg-white/5"
          >
            API Documentation
          </a>

          <a
            href="/network"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm transition hover:bg-white/5"
          >
            Open Testnet
          </a>

          <a
            href="/developers/sandbox"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm transition hover:bg-white/5"
          >
            Developer Sandbox
          </a>
        <div className="mt-10">
          <a
            href="/developers/keys"
            className="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm transition hover:bg-white/5"
          >
            Manage API Keys
          </a>
        </div>

        </div>
      </div>
    </main>
  );
}
