import { NextRequest, NextResponse } from "next/server";
import { getDeveloperFromRequest } from "@/lib/developers/session";

async function proxyAgent(
  request: NextRequest,
  agentId: string,
) {
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

    const response = await fetch(
      `${baseUrl}/api/v1/agents/${encodeURIComponent(agentId)}`,
      {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.APRAXUS_API_KEY ?? ""}`,
          "x-apraxus-developer-id": developer.developerId,
        },
        cache: "no-store",
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to access agent.",
      },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  return proxyAgent(request, agentId);
}
