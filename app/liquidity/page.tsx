'use client';

import { useEffect, useState } from 'react';
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

const Q96 = 2n ** 96n;
const Q32 = 2n ** 32n;
const MAX_UINT256 = (2n ** 256n) - 1n;

function getSqrtRatioAtTick(tick: number): bigint {
  if (tick < -887272 || tick > 887272) {
    throw new Error('Tick out of bounds');
  }

  let absTick = tick < 0 ? -tick : tick;

  let ratio =
    (absTick & 1) !== 0
      ? 0xfffcb933bd6fad37aa2d162d1a594001n
      : 0x100000000000000000000000000000000n;

  if ((absTick & 2) !== 0)
    ratio = (ratio * 0xfff97272373d413259a46990580e213an) >> 128n;
  if ((absTick & 4) !== 0)
    ratio = (ratio * 0xfff2e50f5f656932ef12357cf3c7fdccan) >> 128n;
  if ((absTick & 8) !== 0)
    ratio = (ratio * 0xffe5caca7e10e4e61c3624eaa0941cd0n) >> 128n;
  if ((absTick & 16) !== 0)
    ratio = (ratio * 0xffcb9843d60f6159c9db58835c926644n) >> 128n;
  if ((absTick & 32) !== 0)
    ratio = (ratio * 0xff973b41fa98c081472e6896dfb254c0n) >> 128n;
  if ((absTick & 64) !== 0)
    ratio = (ratio * 0xff2ea16466c96a3843ec78b326b52861n) >> 128n;
  if ((absTick & 128) !== 0)
    ratio = (ratio * 0xfe5dee046a99a2a811c461f1969c3053n) >> 128n;
  if ((absTick & 256) !== 0)
    ratio = (ratio * 0xfcbe86c7900a88aedcffc83b479aa3a4n) >> 128n;
  if ((absTick & 512) !== 0)
    ratio = (ratio * 0xf987a7253ac413176f2b074cf7815e54n) >> 128n;
  if ((absTick & 1024) !== 0)
    ratio = (ratio * 0xf3392b0822b70005940c7a398e4b70f3n) >> 128n;
  if ((absTick & 2048) !== 0)
    ratio = (ratio * 0xe7159475a2c29b7443b29c7fa6e889d9n) >> 128n;
  if ((absTick & 4096) !== 0)
    ratio = (ratio * 0xd097f3bdfd2022b8845ad8f792aa5825n) >> 128n;
  if ((absTick & 8192) !== 0)
    ratio = (ratio * 0xa9f746462d870fdf8a65dc1f90e061e5n) >> 128n;
  if ((absTick & 16384) !== 0)
    ratio = (ratio * 0x70d869a156d2a1b890bb3df62baf32f7n) >> 128n;
  if ((absTick & 32768) !== 0)
    ratio = (ratio * 0x31be135f97d08fd981231505542fcfa6n) >> 128n;
  if ((absTick & 65536) !== 0)
    ratio = (ratio * 0x9aa508b5b7a84e1c677de54f3e99bc9n) >> 128n;
  if ((absTick & 131072) !== 0)
    ratio = (ratio * 0x5d6af8dedb81196699c329225ee604n) >> 128n;
  if ((absTick & 262144) !== 0)
    ratio = (ratio * 0x2216e584f5fa1ea926041bedfe98n) >> 128n;
  if ((absTick & 524288) !== 0)
    ratio = (ratio * 0x48a170391f7dc42444e8fa2n) >> 128n;

  if (tick > 0) {
    ratio = MAX_UINT256 / ratio;
  }

  return (ratio >> 32n) + (ratio % Q32 === 0n ? 0n : 1n);
}

function formatUnits(value: bigint, decimals: number): string {
  const negative = value < 0n;
  const absolute = negative ? -value : value;
  const base = 10n ** BigInt(decimals);

  const whole = absolute / base;
  const fraction = (absolute % base)
    .toString()
    .padStart(decimals, '0')
    .replace(/0+$/, '');

  return `${negative ? '-' : ''}${whole}${
    fraction ? `.${fraction}` : ''
  }`;
}

function calculatePositionAmounts(
  liquidity: bigint,
  currentSqrtPrice: bigint,
  tickLower: number,
  tickUpper: number,
) {
  const sqrtLower = getSqrtRatioAtTick(tickLower);
  const sqrtUpper = getSqrtRatioAtTick(tickUpper);

  let amount0 = 0n;
  let amount1 = 0n;

  if (currentSqrtPrice <= sqrtLower) {
    amount0 =
      (liquidity * (sqrtUpper - sqrtLower) * Q96) /
      (sqrtLower * sqrtUpper);
  } else if (currentSqrtPrice < sqrtUpper) {
    amount0 =
      (liquidity * (sqrtUpper - currentSqrtPrice) * Q96) /
      (currentSqrtPrice * sqrtUpper);

    amount1 =
      (liquidity * (currentSqrtPrice - sqrtLower)) /
      Q96;
  } else {
    amount1 =
      (liquidity * (sqrtUpper - sqrtLower)) /
      Q96;
  }

  return {
    weth: formatUnits(amount0, 18),
    apxs: formatUnits(amount1, 8),
  };
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

      const amounts = calculatePositionAmounts(
        positionLiq,
        currentSqrtPrice,
        tickLower,
        tickUpper,
      );

      setRequiredWeth(amounts.weth);
      setRequiredApxs(amounts.apxs);
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
