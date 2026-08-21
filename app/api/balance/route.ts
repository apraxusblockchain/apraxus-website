import { NextResponse } from 'next/server';

const API_URL = 'https://apraxus.onrender.com';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/balance`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Apraxus balance API request failed');
    }

    const balance = await response.json();

    return NextResponse.json({
      balance,
    });
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