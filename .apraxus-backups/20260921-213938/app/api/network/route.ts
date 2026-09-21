import { NextResponse } from 'next/server';

const API_URL = 'https://apraxus.onrender.com';

export async function GET() {
  try {
    const [blockchainRes, healthRes] = await Promise.all([
      fetch(`${API_URL}/blockchain`, {
        cache: 'no-store',
      }),
      fetch(`${API_URL}/health`, {
        cache: 'no-store',
      }),
    ]);

    if (!blockchainRes.ok || !healthRes.ok) {
      throw new Error('Apraxus API request failed');
    }

    const blockchain = await blockchainRes.json();
    const health = await healthRes.json();

    return NextResponse.json({
      blockchain,
      health,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unable to connect to Apraxus network',
      },
      { status: 503 }
    );
  }
}