const examples = [
  {
    title: "Authentication",
    method: "HEADER",
    path: "Authorization",
    body: `Authorization: Bearer apx_your_api_key`,
  },
  {
    title: "Create payment intent",
    method: "POST",
    path: "/api/v1/payments",
    body: `{
  "token": "APXS",
  "amount": "10",
  "recipient": "0x...",
  "agentId": "agent_demo_01"
}`,
  },
  {
    title: "Request quote",
    method: "POST",
    path: "/api/v1/quotes",
    body: `{
  "tokenIn": "WETH",
  "tokenOut": "APXS",
  "amountIn": "0.0001"
}`,
  },
  {
    title: "Webhook receiver",
    method: "POST",
    path: "/api/v1/webhooks",
    body: `{
  "event": "payment.completed",
  "status": "completed"
}`,
  },
  {
    title: "Create execution",
    method: "POST",
    path: "/api/v1/executions",
    body: `{
  "agentId": "agent_demo_01",
  "wallet": "0x...",
  "token": "APXS",
  "amount": "10",
  "recipient": "0x..."
}`,
  },
];

export default function DeveloperDocsPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.25em] text-white/50">
          Apraxus Developer Platform
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          API Documentation
        </h1>

        <p className="mt-4 max-w-2xl text-white/60">
          Integrate agents, payments and blockchain execution through the
          Apraxus API.
        </p>

        <div className="mt-12 space-y-8">
          {examples.map((example) => (
            <section
              key={example.path}
              className="rounded-2xl border border-white/10 p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-white/10 px-2 py-1 text-xs font-medium">
                  {example.method}
                </span>

                <code className="text-sm text-white/80">
                  {example.path}
                </code>
              </div>

              <h2 className="mt-5 text-xl font-medium">{example.title}</h2>

              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                <code>{example.body}</code>
              </pre>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Response Tracking
          </p>

          <p className="mt-4 text-white/60">
            Payment, quote and execution requests return a unique requestId
            for tracking and future webhook reconciliation.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Environment
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-white/40">Network</p>
              <p className="mt-1">Arbitrum Sepolia</p>
            </div>

            <div>
              <p className="text-sm text-white/40">API Version</p>
              <p className="mt-1">v1</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
