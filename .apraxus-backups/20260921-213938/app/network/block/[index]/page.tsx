
'use client';

import { useEffect, useState } from 'react';

import { Blocks, CheckCircle2, ArrowLeft } from 'lucide-react';

import Link from 'next/link';

type Transaction = {

  hash: string;

  sender: string;

  recipient: string;

  amount: number;

  fee: number;

  nonce: number;

};

type BlockDetails = {

  index: number;

  hash: string;

  previous_hash: string;

  timestamp: string;

  transactions: Transaction[];

  network: string;

  symbol: string;

};

export default function BlockPage({

  params,

}: {

  params: Promise<{ index: string }>;

}) {

  const [block, setBlock] = useState<BlockDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {

    const loadBlock = async () => {

      try {

        const { index } = await params;

        const response = await fetch(`/api/blocks/${index}`, {

          cache: 'no-store',

        });

        const result = await response.json();

        if (!response.ok) {

          throw new Error(

            result?.error || 'Unable to load block.'

          );

        }

        setBlock(result);

      } catch (err) {

        console.error('Block page error:', err);

        setError(

          err instanceof Error

            ? err.message

            : 'Unable to load block.'

        );

      } finally {

        setLoading(false);

      }

    };

    loadBlock();

  }, [params]);

  const formatAPXS = (value: number) =>

    new Intl.NumberFormat('en-US', {

      maximumFractionDigits: 8,

    }).format(value / 100000000);

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white p-8">

        <div className="max-w-5xl mx-auto py-20 text-center">

          <p className="text-zinc-500 font-mono">

            Loading block...

          </p>

        </div>

      </main>

    );

  }

  if (error || !block) {

    return (

      <main className="min-h-screen bg-black text-white p-8">

        <div className="max-w-5xl mx-auto py-20">

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

            <p className="text-red-300 font-mono">

              {error || 'Block not found.'}

            </p>

          </div>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white px-5 py-10 sm:px-8">

      <div className="max-w-5xl mx-auto">

        <Link

          href="/network"

          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition mb-8"

        >

          <ArrowLeft className="w-4 h-4" />

          Back to Network

        </Link>

        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 border-b border-white/5 pb-6 mb-6">

            <div>

              <div className="flex items-center gap-2 text-cyan-400 mb-2">

                <Blocks className="w-4 h-4" />

                <span className="text-xs font-mono uppercase tracking-widest">

                  Block Explorer

                </span>

              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-mono">

                Block #{block.index}

              </h1>

              <p className="text-sm text-zinc-500 mt-2">

                Confirmed on the live Apraxus Rust node.

              </p>

            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-400">

              <CheckCircle2 className="w-3.5 h-3.5" />

              CONFIRMED

            </div>

          </div>

          <div className="grid grid-cols-1 gap-4">

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">

              <span className="text-[10px] text-zinc-600 font-mono block mb-2">

                BLOCK HASH

              </span>

              <span className="text-sm text-cyan-400 font-mono break-all">

                {block.hash}

              </span>

            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">

              <span className="text-[10px] text-zinc-600 font-mono block mb-2">

                PREVIOUS HASH

              </span>

              <span className="text-sm text-zinc-400 font-mono break-all">

                {block.previous_hash}

              </span>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">

              <span className="text-[10px] text-zinc-600 font-mono block mb-2">

                TIMESTAMP

              </span>

              <span className="text-sm text-zinc-300 font-mono">

                {new Date(block.timestamp).toLocaleString()}

              </span>

            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">

              <span className="text-[10px] text-zinc-600 font-mono block mb-2">

                TRANSACTIONS

              </span>

              <span className="text-2xl text-white font-mono font-bold">

                {block.transactions.length}

              </span>

            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-5">

              <span className="text-[10px] text-zinc-600 font-mono block mb-2">

                NETWORK

              </span>

              <span className="text-sm text-emerald-400 font-mono">

                {block.network} · {block.symbol}

              </span>

            </div>

          </div>

          {block.transactions.length > 0 && (

            <div className="mt-8">

              <div className="text-xs text-cyan-400 font-mono uppercase tracking-widest mb-4">

                Confirmed Transactions

              </div>

              <div className="space-y-4">

                {block.transactions.map((tx) => (

                  <div

                    key={tx.hash}

                    className="rounded-xl border border-white/5 bg-black/30 p-5"

                  >

                    <div className="mb-5">

                      <span className="text-[10px] text-zinc-600 font-mono block mb-2">

                        TRANSACTION HASH

                      </span>

                      <Link

                        href={`/network/tx/${tx.hash}`}

                        className="text-sm text-cyan-400 font-mono break-all hover:text-cyan-300 transition"

                      >

                        {tx.hash}

                      </Link>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>

                        <span className="text-[10px] text-zinc-600 font-mono block mb-1">

                          FROM

                        </span>

                        <span className="text-xs text-zinc-400 font-mono break-all">

                          {tx.sender}

                        </span>

                      </div>

                      <div>

                        <span className="text-[10px] text-zinc-600 font-mono block mb-1">

                          TO

                        </span>

                        <span className="text-xs text-zinc-400 font-mono break-all">

                          {tx.recipient}

                        </span>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-8 mt-5 pt-4 border-t border-white/5">

                      <div>

                        <span className="text-[10px] text-zinc-600 font-mono block mb-1">

                          AMOUNT

                        </span>

                        <span className="text-sm text-emerald-400 font-mono">

                          {formatAPXS(tx.amount)} APXS

                        </span>

                      </div>

                      <div>

                        <span className="text-[10px] text-zinc-600 font-mono block mb-1">

                          FEE

                        </span>

                        <span className="text-sm text-zinc-300 font-mono">

                          {formatAPXS(tx.fee)} APXS

                        </span>

                      </div>

                      <div>

                        <span className="text-[10px] text-zinc-600 font-mono block mb-1">

                          NONCE

                        </span>

                        <span className="text-sm text-zinc-300 font-mono">

                          {tx.nonce}

                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </section>

      </div>

    </main>

  );

}

