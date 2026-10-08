import { NextRequest, NextResponse } from "next/server";

import { getDeveloperFromRequest } from "@/lib/developers/session";
import { listExecutionRecordsByDeveloper } from "@/lib/execution/repository";

export async function GET(request: NextRequest) {
  const developer = getDeveloperFromRequest(request);

  if (!developer) {
    return NextResponse.json(
      { success: false, error: "Developer session required" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);

  const limitParam = Number(searchParams.get("limit") ?? "20");
  const offsetParam = Number(searchParams.get("offset") ?? "0");

  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(Math.floor(limitParam), 1), 100)
    : 20;

  const offset = Number.isFinite(offsetParam)
    ? Math.max(Math.floor(offsetParam), 0)
    : 0;

  const records = listExecutionRecordsByDeveloper(developer.developerId, limit + 1, offset);
  const hasMore = records.length > limit;
  const pageRecords = records.slice(0, limit);

  return NextResponse.json({
    success: true,
    records: pageRecords,
    hasMore,
    nextOffset: hasMore ? offset + limit : null,
  });
}
