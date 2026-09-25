import { NextResponse } from "next/server";

import { listExecutionRecords } from "@/lib/execution/repository";

export async function GET() {
  return NextResponse.json({
    success: true,
    records: listExecutionRecords(),
  });
}
