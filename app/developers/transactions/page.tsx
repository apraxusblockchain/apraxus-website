import { ExecutionHistory } from "@/components/ui/ExecutionHistory";

export default function DeveloperTransactionsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            Apraxus Developer Platform
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Transactions
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Review execution requests, on-chain settlement status and
            transaction records across your development environment.
          </p>
        </div>

        <ExecutionHistory />
      </div>
    </main>
  );
}
