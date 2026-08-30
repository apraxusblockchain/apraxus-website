'use client';

import { useMemo, useState } from 'react';
import {
  createWalletClient,
  custom,
  formatUnits,
  parseUnits,
  type Address,
} from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import {
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Lock,
  ShieldCheck,
  XCircle,
} from 'lucide-react';

import {
  APXS_ABI,
  APXS_CONTRACT_ADDRESS,
  apxsPublicClient,
} from '@/lib/web3/apxs';

import { connectMetaMask } from '@/lib/web3/metamask';

const DAILY_LIMIT = 100;
const PER_TX_LIMIT = 10;

const APPROVED_DESTINATION =
  process.env.NEXT_PUBLIC_APXS_APPROVED_DESTINATION as Address;

export function AgentPaymentConsole() {
  const [amount, setAmount] = useState('0.001');
  const [destination, setDestination] = useState('');
  const [checked, setChecked] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<Address | null>(null);
  const [walletBalance, setWalletBalance] = useState<string>('—');
  const [decimals, setDecimals] = useState<number>(18);
  const [dailySpent, setDailySpent] = useState(0);

  const numericAmount = Number(amount);

  const policy = useMemo(() => {
    const validAmount =
      Number.isFinite(numericAmount) &&
      numericAmount > 0;

    const withinTxLimit =
      validAmount &&
      numericAmount <= PER_TX_LIMIT;

    const withinDailyLimit =
      validAmount &&
      numericAmount + dailySpent <= DAILY_LIMIT;

    const validDestination =
      /^0x[a-fA-F0-9]{40}$/.test(destination.trim());

    const approvedDestination =
      validDestination &&
      destination.trim().toLowerCase() ===
        APPROVED_DESTINATION?.toLowerCase();

    return {
      validAmount,
      withinTxLimit,
      withinDailyLimit,
      validDestination,
      approvedDestination,
      allowed:
        validAmount &&
        withinTxLimit &&
        withinDailyLimit &&
        approvedDestination,
    };
  }, [numericAmount, destination, dailySpent]);

  async function connectWallet() {
    const {
      provider,
      account,
      chainId,
    } = await connectMetaMask();

    if (!account) {
      throw new Error('No wallet account found.');
    }

    if (chainId.toLowerCase() !== '0x66eee') {
      throw new Error(
        'Please connect to Arbitrum Sepolia.'
      );
    }

    const walletClient = createWalletClient({
      account,
      chain: arbitrumSepolia,
      transport: custom(provider),
    });

    const [rawBalance, tokenDecimals] = await Promise.all([
      apxsPublicClient.readContract({
        address: APXS_CONTRACT_ADDRESS,
        abi: APXS_ABI,
        functionName: 'balanceOf',
        args: [account],
      }),
      apxsPublicClient.readContract({
        address: APXS_CONTRACT_ADDRESS,
        abi: APXS_ABI,
        functionName: 'decimals',
      }),
    ]);

    setWalletAddress(account);
    setDecimals(tokenDecimals);
    setWalletBalance(
      formatUnits(rawBalance, tokenDecimals)
    );

    return {
      walletClient,
      account,
      rawBalance,
      tokenDecimals,
    };
  }

  async function checkPolicy() {
    try {
      setError('');
      setExecuted(false);
      setTxHash('');
      setLoading(true);

      await connectWallet();

      setChecked(true);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect wallet.'
      );
      setChecked(false);
    } finally {
      setLoading(false);
    }
  }

  async function executePayment() {
    if (!policy.allowed) return;

    try {
      setError('');
      setLoading(true);
      setExecuted(false);
      setTxHash('');

      const {
        walletClient,
        account,
        rawBalance,
        tokenDecimals,
      } = await connectWallet();

      const value = parseUnits(
        amount.trim(),
        tokenDecimals
      );

      if (value > rawBalance) {
        throw new Error(
          `Insufficient APXS balance. Available: ${formatUnits(
            rawBalance,
            tokenDecimals
          )} APXS`
        );
      }

      const hash = await walletClient.writeContract({
        account,
        address: APXS_CONTRACT_ADDRESS,
        abi: APXS_ABI,
        functionName: 'transfer',
        args: [
          destination.trim() as Address,
          value,
        ],
        chain: arbitrumSepolia,
      });

      setTxHash(hash);

      await apxsPublicClient.waitForTransactionReceipt({
        hash,
      });

      setDailySpent((previous) => previous + numericAmount);
      setExecuted(true);

      const updatedBalance =
        await apxsPublicClient.readContract({
          address: APXS_CONTRACT_ADDRESS,
          abi: APXS_ABI,
          functionName: 'balanceOf',
          args: [account],
        });

      setWalletBalance(
        formatUnits(updatedBalance, tokenDecimals)
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : 'APXS transaction failed.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-white/[0.08]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7B5CFA] mb-3">
              <Bot className="w-4 h-4" />
              LIVE PRODUCT DEMO
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              APXS Agent Payment Console
            </h2>

            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Test a policy-controlled APXS payment flow on
              Arbitrum Sepolia.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Arbitrum Sepolia
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          <div className="flex items-center gap-2 text-sm font-semibold mb-5">
            <ShieldCheck className="w-4 h-4 text-[#7B5CFA]" />
            Agent Policy
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                Agent
              </div>
              <div className="mt-1 font-mono text-sm">
                Agent-001
              </div>
              <div className="mt-2 text-xs text-emerald-400">
                ● Active
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                Agent Wallet
              </div>

              <div className="mt-1 font-mono text-xs text-zinc-300 break-all">
                {walletAddress ?? 'Connect wallet to load'}
              </div>

              {walletAddress && (
                <div className="mt-2 text-xs text-zinc-500">
                  Balance: {walletBalance} APXS
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <Clock3 className="w-4 h-4 text-[#38E8F8] mb-3" />

                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Daily limit
                </div>

                <div className="mt-1 font-mono text-lg">
                  {DAILY_LIMIT - dailySpent} APXS
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                <Lock className="w-4 h-4 text-emerald-400 mb-3" />

                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  Per transaction
                </div>

                <div className="mt-1 font-mono text-lg">
                  {PER_TX_LIMIT} APXS
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                Approved destination
              </div>

              <div className="mt-1 font-mono text-xs text-zinc-300 break-all">
                {APPROVED_DESTINATION}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold mb-5">
            <CircleDollarSign className="w-4 h-4 text-[#7B5CFA]" />
            Payment Request
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-2">
                Amount
              </label>

              <div className="flex items-center rounded-xl border border-white/[0.09] bg-black/20 overflow-hidden">
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setChecked(false);
                    setExecuted(false);
                    setError('');
                    setTxHash('');
                  }}
                  type="number"
                  min="0"
                  step="0.001"
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                />

                <span className="px-4 text-xs font-mono text-zinc-400">
                  APXS
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-2">
                Destination
              </label>

              <input
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setChecked(false);
                  setExecuted(false);
                  setError('');
                  setTxHash('');
                }}
                placeholder="0x..."
                className="w-full rounded-xl border border-white/[0.09] bg-black/20 px-4 py-3 text-xs font-mono outline-none"
              />

              <button
                type="button"
                onClick={() => {
                  setDestination(APPROVED_DESTINATION);
                  setChecked(false);
                  setExecuted(false);
                  setError('');
                }}
                className="mt-2 text-xs text-[#9B86FF] hover:text-white transition"
              >
                Use approved destination
              </button>
            </div>

            <button
              onClick={checkPolicy}
              disabled={loading}
              className="w-full rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-zinc-200 transition disabled:opacity-60"
            >
              {loading ? 'Checking...' : 'Check Policy'}
            </button>

            {checked && (
              <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4 space-y-3">
                <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Policy evaluation
                </div>

                <PolicyRow
                  label="Amount within transaction limit"
                  passed={policy.withinTxLimit}
                />

                <PolicyRow
                  label="Daily limit available"
                  passed={policy.withinDailyLimit}
                />

                <PolicyRow
                  label="Destination approved"
                  passed={policy.approvedDestination}
                />

                <PolicyRow
                  label="APXS token approved"
                  passed={true}
                />

                <div
                  className={`mt-4 rounded-xl p-3 text-sm font-semibold ${
                    policy.allowed
                      ? 'bg-emerald-400/10 text-emerald-300'
                      : 'bg-red-400/10 text-red-300'
                  }`}
                >
                  {policy.allowed
                    ? '✓ Payment authorized by policy'
                    : '✕ Payment blocked by policy'}
                </div>

                {policy.allowed && !executed && (
                  <button
                    onClick={executePayment}
                    disabled={loading}
                    className="w-full rounded-xl bg-[#7B5CFA] text-white py-3 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
                  >
                    {loading
                      ? 'Waiting for transaction...'
                      : 'Execute APXS Payment'}
                  </button>
                )}

                {executed && txHash && (
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Payment confirmed on-chain
                    </div>

                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-500">
                          Amount
                        </span>

                        <span className="font-mono">
                          {numericAmount} APXS
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-500">
                          Status
                        </span>

                        <span className="text-emerald-300">
                          Confirmed
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-500">
                          Network
                        </span>

                        <span>
                          Arbitrum Sepolia
                        </span>
                      </div>

                      <div className="pt-2 border-t border-white/[0.08]">
                        <div className="text-zinc-500 mb-1">
                          Transaction hash
                        </div>

                        <a
                          href={`https://sepolia.arbiscan.io/tx/${txHash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[#9B86FF] break-all hover:underline"
                        >
                          {txHash}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-3">
                <p className="text-sm text-red-300 break-words">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyRow({
  label,
  passed,
}: {
  label: string;
  passed: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="text-zinc-400">
        {label}
      </span>

      {passed ? (
        <span className="inline-flex items-center gap-1.5 text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Pass
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-red-300">
          <XCircle className="w-3.5 h-3.5" />
          Block
        </span>
      )}
    </div>
  );
}
