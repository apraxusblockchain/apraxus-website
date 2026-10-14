import { NextRequest, NextResponse } from 'next/server';
import { formatEther, isAddress } from 'viem';
import { getApraxusPublicClient } from '@/lib/web3/public-clients';

const API_URL = 'https://apraxus.onrender.com';

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        {
          error: 'Wallet address is required',
        },
        { status: 400 }
      );
    }

    const chainIdParam = request.nextUrl.searchParams.get('chainId');

    if (chainIdParam === '46630') {
      if (!isAddress(address)) {
        return NextResponse.json(
          { error: 'A valid EVM wallet address is required for Robinhood Chain Testnet' },
          { status: 400 }
        );
      }

      const client = getApraxusPublicClient(46630);

      if (!client) {
        return NextResponse.json(
          { error: 'Robinhood Chain Testnet RPC is not configured' },
          { status: 503 }
        );
      }

      const rawBalance = await client.getBalance({ address });

      return NextResponse.json({
        address,
        balance: formatEther(rawBalance),
        symbol: 'ETH',
        chainId: 46630,
        decimals: 18,
        network: 'robinhood-testnet',
      });
    }

    if (chainIdParam && chainIdParam !== '46630') {
      return NextResponse.json(
        { error: 'Unsupported balance chain' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${API_URL}/balance/${encodeURIComponent(address)}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Apraxus balance API request failed');
    }

    const balance = await response.json();

    return NextResponse.json(balance);
  } catch (error) {
    console.error('Balance API error:', error);

    return NextResponse.json(
      {
        error: 'Unable to connect to Apraxus balance API',
      },
      { status: 503 }
    );
  }
}