export default function DeveloperDashboardPage() {
  const tools = [
    {
      title: "API Documentation",
      description: "Explore Apraxus API v1 endpoints, authentication and integration examples.",
      href: "/developers/docs",
      action: "Open Docs",
    },
    {
      title: "API Keys",
      description: "Generate and manage development API keys for testnet integrations.",
      href: "/developers/keys",
      action: "Manage Keys",
    },
    {
      title: "Developer Sandbox",
      description: "Simulate payment, quote and execution flows without a blockchain transaction.",
      href: "/developers/sandbox",
      action: "Open Sandbox",
    },
    {
      title: "API Metrics",
      description: "View development request activity and API usage tracking.",
      href: "/developers/metrics",
      action: "View Metrics",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            Apraxus Developer Platform
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Developer Dashboard
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Build, test and integrate programmable payment infrastructure for
            the autonomous economy on Arbitrum Sepolia.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {tools.map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              className="group rounded-2xl border border-white/10 p-6 transition hover:border-white/20 hover:bg-white/[0.03]"
            >
              <h2 className="text-xl font-medium">{tool.title}</h2>

              <p className="mt-3 leading-7 text-white/50">
                {tool.description}
              </p>

              <span className="mt-6 inline-flex text-sm text-white/80 transition group-hover:text-white">
                {tool.action} →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Get Started
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Read the Docs", "/developers/docs"],
              ["02", "Create API Key", "/developers/keys"],
              ["03", "Run Sandbox", "/developers/sandbox"],
              ["04", "Build Integration", "/developers/docs"],
            ].map(([number, title, href]) => (
              <a
                key={number}
                href={href}
                className="rounded-xl border border-white/10 p-4 transition hover:border-white/20 hover:bg-white/[0.03]"
              >
                <span className="text-xs text-white/30">{number}</span>
                <p className="mt-3 text-sm font-medium">{title}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Network
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
              Arbitrum Sepolia
            </span>
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
              API v1
            </span>
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
              Testnet
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
