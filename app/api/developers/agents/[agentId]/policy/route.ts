import { NextRequest, NextResponse } from "next/server";
import { getDeveloperFromRequest } from "@/lib/developers/session";

async function proxyPolicy(
  request: NextRequest,
  agentId: string,
) {
  try {
    const developer = getDeveloperFromRequest(request);

    if (!developer) {
      return NextResponse.json(
        { success: false, error: "Developer session required" },
        { status: 401 },
      );
    }

    const baseUrl = request.nextUrl.origin;

    const response = await fetch(
      `${baseUrl}/api/v1/agents/${encodeURIComponent(agentId)}/policy`,
      {
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
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to access agent policy." },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  return proxyPolicy(request, agentId);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  return proxyPolicy(request, agentId);
}
