import { NextRequest, NextResponse } from "next/server";
import { createDeveloperAccount } from "@/lib/developers/accounts";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json(
      { success: false, error: "Developer name is required" },
      { status: 400 },
    );
  }

  const developer = createDeveloperAccount(body.name.trim());

  return NextResponse.json({
    success: true,
    developer,
  });
}
