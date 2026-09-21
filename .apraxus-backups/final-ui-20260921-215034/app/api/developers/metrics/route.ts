import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.APRAXUS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: { message: "API authentication is not configured" } },
      { status: 500 }
    );
  }

  const response = await fetch(
    new URL("/api/v1/metrics", request.url),
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
