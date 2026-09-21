import Link from 'next/link';

type TransactionDetails = {
  amount: number;
  block: number;
  block_hash: string;
  fee: number;
  hash: string;
  network: string;
  nonce: number;
  recipient: string;
  sender: string;
  status: string;
  symbol: string;
  timestamp: string;
};

const API_URL = 'https://apraxus.onrender.com';

function formatAPXS(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(value / 100000000);
}

async function getTransaction(hash: string) {
  const response = await fetch(`${API_URL}/transaction/${hash}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<TransactionDetails>;
}

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;
  const transaction = await getTransaction(hash);

  if (!transaction) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/network"
            className="text-sm text-cyan-400 hover:text-cyan-300 font-mono"
          >
            ← Back to Network
          </Link>

          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
            <h1 className="text-2xl font-bold">Transaction Not Found</h1>
            <p className="text-zinc-500 mt-2 font-mono">
              Unable to find this transaction on the Apraxus network.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <Link
          href="/network"
          className="text-sm text-zinc-500 hover:text-white transition font-mono"
        >
          ← Back to Network
        </Link>

        <div className="mt-8 mb-6">
          <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest">
            Transaction Explorer
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Transaction Details
          </h1>

          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {transaction.status}
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="sm:col-span-2 rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                TRANSACTION HASH
              </span>

              <span className="text-xs text-cyan-400 font-mono break-all">
                {transaction.hash}
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                FROM
              </span>

              <span className="text-xs text-zinc-400 font-mono break-all">
                {transaction.sender}
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                TO
              </span>

              <span className="text-xs text-zinc-400 font-mono break-all">
                {transaction.recipient}
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                AMOUNT
              </span>

              <span className="text-xl text-emerald-400 font-mono">
                {formatAPXS(transaction.amount)} {transaction.symbol}
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                FEE
              </span>

              <span className="text-xl text-zinc-300 font-mono">
                {formatAPXS(transaction.fee)} {transaction.symbol}
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                BLOCK
              </span>

              <Link
                href={`/network/block/${transaction.block}`}
                className="text-lg text-cyan-400 hover:text-cyan-300 font-mono"
              >
                #{transaction.block}
              </Link>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                NONCE
              </span>

              <span className="text-lg text-white font-mono">
                {transaction.nonce}
              </span>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                TIMESTAMP
              </span>

              <span className="text-sm text-zinc-300 font-mono">
                {new Date(transaction.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="sm:col-span-2 rounded-xl border border-white/5 bg-black/30 p-5">
              <span className="text-[10px] text-zinc-600 font-mono block mb-2">
                BLOCK HASH
              </span>

              <span className="text-xs text-cyan-400 font-mono break-all">
                {transaction.block_hash}
              </span>
            </div>

          </div>

        </section>
      </div>
    </main>
  );
}
