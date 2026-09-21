import { NextResponse } from 'next/server';

const API_URL = 'https://apraxus.onrender.com';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ index: string }> }
) {
  try {
    const { index } = await params;

    const response = await fetch(`${API_URL}/block/${index}`, {
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Block API error:', error);

    return NextResponse.json(
      {
        error: 'Unable to connect to Apraxus block API',
      },
      { status: 503 }
    );
  }
}
