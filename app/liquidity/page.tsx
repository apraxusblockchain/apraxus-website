'use client';

import { useEffect, useState } from 'react';
import { Token } from '@uniswap/sdk-core';
import { Pool, Position } from '@uniswap/v4-sdk';
import Link from 'next/link';
import {
  APXS_SEPOLIA_ADDRESS,
  WETH_SEPOLIA_ADDRESS,
  STATE_VIEW_ADDRESS,
  POSITION_MANAGER_ADDRESS,
  APXS_WETH_POOL_ID,
  APXS_LP_TOKEN_ID,
  apxsLiquidityClient,
} from '@/lib/web3/apxs-liquidity';

const client = apxsLiquidityClient;

const STATE_VIEW = STATE_VIEW_ADDRESS;
const POSITION_MANAGER = POSITION_MANAGER_ADDRESS;
const POOL_ID = APXS_WETH_POOL_ID;
const APXS = APXS_SEPOLIA_ADDRESS;
const WETH = WETH_SEPOLIA_ADDRESS;
const TOKEN_ID = APXS_LP_TOKEN_ID;

const stateViewAbi = [
  {
    type: 'function',
    name: 'getSlot0',
    stateMutability: 'view',
    inputs: [{ name: 'poolId', type: 'bytes32' }],
    outputs: [
      { name: 'sqrtPriceX96', type: 'uint160' },
      { name: 'tick', type: 'int24' },
      { name: 'protocolFee', type: 'uint24' },
      { name: 'lpFee', type: 'uint24' },
    ],
  },
  {
    type: 'function',
    name: 'getLiquidity',
    stateMutability: 'view',
    inputs: [{ name: 'poolId', type: 'bytes32' }],
    outputs: [{ name: 'liquidity', type: 'uint128' }],
  },
] as const;

const positionAbi = [
  {
    type: 'function',
    name: 'ownerOf',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    type: 'function',
    name: 'getPositionLiquidity',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: 'liquidity', type: 'uint128' }],
  },
  {
    type: 'function',
    name: 'getPoolAndPositionInfo',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      {
        name: 'poolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', type: 'address' },
          { name: 'currency1', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'tickSpacing', type: 'int24' },
          { name: 'hooks', type: 'address' },
        ],
      },
      { name: 'info', type: 'uint256' },
    ],
  },
] as const;

function shorten(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function decodeInt24(raw: bigint) {
  return raw >= 0x800000n
    ? Number(raw - 0x1000000n)
    : Number(raw);
}

export default function LiquidityPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tick, setTick] = useState<number | null>(null);
  const [lower, setLower] = useState<number | null>(null);
  const [upper, setUpper] = useState<number | null>(null);
  const [poolLiquidity, setPoolLiquidity] = useState<bigint | null>(null);
  const [positionLiquidity, setPositionLiquidity] =
    useState<bigint | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [requiredWeth, setRequiredWeth] = useState('—');
  const [requiredApxs, setRequiredApxs] = useState('—');

  async function loadData() {
    try {
      setLoading(true);
      setError('');

      const [slot0, liquidity, positionOwner, positionLiq, packed] =
        await Promise.all([
          client.readContract({
            address: STATE_VIEW,
            abi: stateViewAbi,
            functionName: 'getSlot0',
            args: [POOL_ID],
          }),
          client.readContract({
            address: STATE_VIEW,
            abi: stateViewAbi,
            functionName: 'getLiquidity',
            args: [POOL_ID],
          }),
          client.readContract({
            address: POSITION_MANAGER,
            abi: positionAbi,
            functionName: 'ownerOf',
            args: [TOKEN_ID],
          }),
          client.readContract({
            address: POSITION_MANAGER,
            abi: positionAbi,
            functionName: 'getPositionLiquidity',
            args: [TOKEN_ID],
          }),
          client.readContract({
            address: POSITION_MANAGER,
            abi: positionAbi,
            functionName: 'getPoolAndPositionInfo',
            args: [TOKEN_ID],
          }),
        ]);

      const currentSqrtPrice = slot0[0];
      const currentTick = Number(slot0[1]);
      const info = packed[1];

      const tickLower = decodeInt24(
        (info >> 8n) & 0xffffffn,
      );

      const tickUpper = decodeInt24(
        (info >> 32n) & 0xffffffn,
      );

      setTick(currentTick);
      setLower(tickLower);
      setUpper(tickUpper);
      setPoolLiquidity(liquidity);
      setPositionLiquidity(positionLiq);
      setOwner(positionOwner);

      const wethToken = new Token(
        421614,
        WETH,
        18,
        'WETH',
      );

      const apxsToken = new Token(
        421614,
        APXS,
        8,
        'APXS',
      );

      const pool = new Pool(
        wethToken,
        apxsToken,
        3000,
        60,
        '0x0000000000000000000000000000000000000000',
        currentSqrtPrice.toString(),
        liquidity.toString(),
        currentTick,
      );

      const position = new Position({
        pool,
        liquidity: positionLiq.toString(),
        tickLower,
        tickUpper,
      });

      setRequiredWeth(position.amount0.toExact());
      setRequiredApxs(position.amount1.toExact());
    } catch (err) {
      console.error(err);
      setError('Unable to read Arbitrum Sepolia liquidity data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#030305] text-white px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <Link
            href="/"
            className="text-xs font-mono text-zinc-500 hover:text-white transition"
          >
            ← APRAXUS
          </Link>
        </div>

        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-[#7B5CFA]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ARBITRUM SEPOLIA · UNISWAP V4
          </div>

          <h1 className="mt-7 text-5xl sm:text-7xl font-bold tracking-tight">
            APXS / WETH
          </h1>

          <p className="mt-5 text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Live decentralized liquidity infrastructure for the
            Apraxus ecosystem. On-chain pool and LP position data
            refresh automatically.
          </p>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-mono tracking-widest text-zinc-500">
              POOL
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              APXS / WETH
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Uniswap v4 · 0.30%
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-mono tracking-widest text-zinc-500">
              CURRENT TICK
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              {loading ? 'Loading...' : tick ?? '—'}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Spacing: 60
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-mono tracking-widest text-zinc-500">
              POOL LIQUIDITY
            </p>
            <h2 className="mt-4 text-2xl font-semibold break-all">
              {loading
                ? 'Loading...'
                : poolLiquidity?.toLocaleString() ?? '—'}
            </h2>
            <p className="mt-2 text-sm text-emerald-400">
              Live on-chain
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-mono tracking-widest text-zinc-500">
              LP POSITION
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              #502
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              {positionLiquidity !== null
                ? `Liquidity ${positionLiquidity.toLocaleString()}`
                : 'Loading position...'}
            </p>
          </div>

        </section>

        <section className="mt-5 rounded-3xl border border-[#7B5CFA]/20 bg-gradient-to-br from-[#7B5CFA]/10 to-white/[0.02] p-7 sm:p-10">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-7 border-b border-white/10">
            <div>
              <p className="text-xs font-mono tracking-widest text-[#7B5CFA]">
                ACTIVE LIQUIDITY POSITION
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">
                APXS / WETH · Position #502
              </h2>
            </div>

            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-mono text-emerald-400">
              ✓ VERIFIED ON-CHAIN
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-7 overflow-hidden rounded-2xl border border-white/10 bg-white/10">

            <div className="bg-[#09090d] p-5">
              <p className="text-xs text-zinc-500">POSITION RANGE</p>
              <p className="mt-2 font-mono text-lg">
                {lower !== null && upper !== null
                  ? `${lower} → ${upper}`
                  : '—'}
              </p>
            </div>

            <div className="bg-[#09090d] p-5">
              <p className="text-xs text-zinc-500">POSITION OWNER</p>
              <p className="mt-2 font-mono text-lg break-all">
                {owner ? shorten(owner) : '—'}
              </p>
            </div>

            <div className="bg-[#09090d] p-5">
              <p className="text-xs text-zinc-500">LIQUIDITY</p>
              <p className="mt-2 font-mono text-lg break-all">
                {positionLiquidity?.toLocaleString() ?? '—'}
              </p>
            </div>

            <div className="bg-[#09090d] p-5">
              <p className="text-xs text-zinc-500">WETH AMOUNT</p>
              <p className="mt-2 font-mono text-lg">
                {requiredWeth}
              </p>
            </div>

            <div className="bg-[#09090d] p-5">
              <p className="text-xs text-zinc-500">APXS AMOUNT</p>
              <p className="mt-2 font-mono text-lg">
                {requiredApxs}
              </p>
            </div>

            <div className="bg-[#09090d] p-5">
              <p className="text-xs text-zinc-500">NETWORK</p>
              <p className="mt-2 font-mono text-lg">
                Chain ID 421614
              </p>
            </div>

          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-xs font-mono tracking-widest text-zinc-500 mb-5">
            VERIFIED CONTRACTS
          </p>

          <div className="space-y-4 text-sm font-mono">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <span className="text-zinc-500">APXS</span>
              <span className="text-[#8f93ff] break-all">{APXS}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <span className="text-zinc-500">WETH</span>
              <span className="text-[#8f93ff] break-all">{WETH}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <span className="text-zinc-500">Position Manager</span>
              <span className="text-[#8f93ff] break-all">
                {POSITION_MANAGER}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <span className="text-zinc-500">Pool ID</span>
              <span className="text-[#8f93ff] break-all">
                {POOL_ID}
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
