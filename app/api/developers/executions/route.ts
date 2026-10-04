import { NextRequest, NextResponse } from "next/server";
import { getDeveloperFromRequest } from "@/lib/developers/session";

export async function POST(request: NextRequest) {
  try {
    const developer = getDeveloperFromRequest(request);

    if (!developer) {
      return NextResponse.json(
        { success: false, error: "Developer session required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const baseUrl = request.nextUrl.origin;

    const response = await fetch(`${baseUrl}/api/v1/executions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.APRAXUS_API_KEY ?? ""}`,
        "x-apraxus-developer-id": developer.developerId,
        "Idempotency-Key": request.headers.get("Idempotency-Key") ?? "",
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
      { status: 500 },
    );
  }
}
