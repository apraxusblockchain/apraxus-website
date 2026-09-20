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
    title: "Webhook receiver / acknowledgement",
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
          Build and test agent-oriented payment, quote and execution workflows
          through the Apraxus API.
        </p>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Testnet Quickstart
          </p>

          <h2 className="mt-4 text-2xl font-medium">
            Start building on Apraxus
          </h2>

          <p className="mt-3 max-w-2xl text-white/60">
            Follow these steps to connect a wallet, access the Arbitrum
            Sepolia testnet and start testing Apraxus developer tools.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 p-4">
              <span className="text-xs font-mono text-white/40">01</span>
              <h3 className="mt-2 font-medium">Connect a wallet</h3>
              <p className="mt-2 text-sm text-white/50">
                Connect an EVM wallet through the Apraxus Network page.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <span className="text-xs font-mono text-white/40">02</span>
              <h3 className="mt-2 font-medium">Use Arbitrum Sepolia</h3>
              <p className="mt-2 text-sm text-white/50">
                Testnet Chain ID: 421614.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <span className="text-xs font-mono text-white/40">03</span>
              <h3 className="mt-2 font-medium">Get testnet ETH</h3>
              <p className="mt-2 text-sm text-white/50">
                Get Arbitrum Sepolia ETH for testnet transaction fees.
              </p>
              <a
                href="https://ethglobal.com/faucet/arbitrum-sepolia-421614"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-white underline underline-offset-4"
              >
                Open faucet →
              </a>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <span className="text-xs font-mono text-white/40">04</span>
              <h3 className="mt-2 font-medium">Create an API key</h3>
              <p className="mt-2 text-sm text-white/50">
                Generate a development key from the Apraxus API Keys page.
              </p>
            </div>
          </div>
        </section>

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
            Sandbox
          </p>

          <p className="mt-4 text-white/60">
            Test payment, quote and execution flows without submitting a real
            blockchain transaction. Sandbox responses are simulations only.
          </p>

          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            <code>{`POST /api/v1/sandbox

{
  "action": "payment",
  "agentId": "agent_demo_01",
  "token": "APXS",
  "amount": "10"
}`}</code>
          </pre>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Request Tracking
          </p>

          <p className="mt-4 text-white/60">
            Payment, quote and execution requests return a unique requestId that
            can be used to identify the request during development and testing.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-[#7B5CFA]/20 bg-[#7B5CFA]/[0.04] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#7B5CFA]">
            Development Status
          </p>

          <p className="mt-4 text-white/60">
            Apraxus is currently a development and testnet platform on
            Arbitrum Sepolia. API payment and execution endpoints create
            intents for testing, while the sandbox provides simulation-only
            workflows. Production execution and mainnet infrastructure are
            not enabled.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            Current Environment
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
