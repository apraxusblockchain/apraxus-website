import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    service: "Apraxus API",
    version: "v1",
    status: "operational",
    network: "arbitrum-sepolia",
  });
}
