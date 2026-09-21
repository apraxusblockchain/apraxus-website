import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://apraxus.onrender.com';

export async function GET(request: NextRequest) {
  try {
    const hash = request.nextUrl.searchParams.get('hash')?.trim();

    if (!hash) {
      return NextResponse.json(
        { error: 'Transaction hash is required.' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${API_URL}/transaction/${encodeURIComponent(hash)}`,
      {
        cache: 'no-store',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.error || 'Transaction not found.',
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Transaction API error:', error);

    return NextResponse.json(
      {
        error: 'Unable to connect to Apraxus transaction explorer.',
      },
      { status: 503 }
    );
  }
}
