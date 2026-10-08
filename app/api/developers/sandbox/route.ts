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

    const baseUrl = request.nextUrl.origin;

    const response = await fetch(`${baseUrl}/api/v1/sandbox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.APRAXUS_API_KEY ?? ""}`,
        "x-apraxus-developer-id": developer.developerId,
      },
      body: await request.text(),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to access sandbox." },
      { status: 500 },
    );
  }
}
