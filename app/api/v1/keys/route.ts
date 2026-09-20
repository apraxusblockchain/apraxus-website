import { NextResponse } from "next/server";
import { generateApiKey } from "@/lib/api/keys";

export async function POST() {
  const apiKey = generateApiKey();

  return NextResponse.json({
    success: true,
    apiKey,
    network: "arbitrum-sepolia",
    warning: "Store this key securely. It will only be shown once.",
  });
}
