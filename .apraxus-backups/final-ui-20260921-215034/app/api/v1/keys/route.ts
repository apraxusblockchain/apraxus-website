import { NextResponse } from "next/server";
import { generateApiKey } from "@/lib/api/keys";

export async function POST() {
  const apiKey = generateApiKey();

  return NextResponse.json({
    success: true,
    apiKey,
    network: "arbitrum-sepolia",
    environment: "development",
    warning: "Development/testnet key only. Production key management is not enabled yet.",
  });
}
