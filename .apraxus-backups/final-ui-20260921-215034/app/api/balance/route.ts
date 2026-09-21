import { NextRequest, NextResponse } from 'next/server';

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