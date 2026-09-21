import { NextResponse } from 'next/server';

const API_URL = 'https://apraxus.onrender.com';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/blocks`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Apraxus blocks API request failed');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Blocks API error:', error);

    return NextResponse.json(
      {
        error: 'Unable to connect to Apraxus blockchain explorer',
      },
      { status: 503 }
    );
  }
}
