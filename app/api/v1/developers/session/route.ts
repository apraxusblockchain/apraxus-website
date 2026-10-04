import { NextRequest, NextResponse } from "next/server";
import { getDeveloperAccount } from "@/lib/developers/accounts";
import { DEVELOPER_SESSION_COOKIE } from "@/lib/developers/session";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.developerId !== "string" || !body.developerId.trim()) {
    return NextResponse.json(
      { success: false, error: "Developer ID is required" },
      { status: 400 },
    );
  }

  const developer = getDeveloperAccount(body.developerId.trim());

  if (!developer) {
    return NextResponse.json(
      { success: false, error: "Developer account not found" },
      { status: 404 },
    );
  }

  const response = NextResponse.json({
    success: true,
    developer,
  });

  response.cookies.set({
    name: DEVELOPER_SESSION_COOKIE,
    value: developer.developerId,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
