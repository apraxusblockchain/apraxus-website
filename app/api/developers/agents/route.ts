import { NextRequest, NextResponse } from "next/server";
import { getDeveloperFromRequest } from "@/lib/developers/session";

async function proxyAgents(request: NextRequest) {
  try {
    const developer = getDeveloperFromRequest(request);

    if (!developer) {
      return NextResponse.json(
        {
          success: false,
          error: "Developer session required",
        },
        { status: 401 },
      );
    }

    const baseUrl = request.nextUrl.origin;

    const response = await fetch(`${baseUrl}/api/v1/agents`, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.APRAXUS_API_KEY ?? ""}`,
        "x-apraxus-developer-id": developer.developerId,
      },
      ...(request.method === "POST"
        ? { body: await request.text() }
        : {}),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to access agents.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyAgents(request);
}

export async function POST(request: NextRequest) {
  return proxyAgents(request);
}
