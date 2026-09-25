import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const baseUrl = request.nextUrl.origin;

    const response = await fetch(`${baseUrl}/api/v1/executions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.APRAXUS_API_KEY ?? ""}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to create execution intent.",
      },
      { status: 500 }
    );
  }
}
