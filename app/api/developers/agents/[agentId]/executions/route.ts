import { NextRequest, NextResponse } from "next/server";
import { getDeveloperFromRequest } from "@/lib/developers/session";
import { getAgent } from "@/lib/agents/registry";
import { listExecutionRecordsByAgent } from "@/lib/execution/repository";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> },
) {
  try {
    const developer = getDeveloperFromRequest(request);

    if (!developer) {
      return NextResponse.json(
        { success: false, error: "Developer session required" },
        { status: 401 },
      );
    }

    const { agentId } = await params;
    const agent = getAgent(agentId, developer.developerId);

    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Agent not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      records: listExecutionRecordsByAgent(agentId),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to load execution history." },
      { status: 500 },
    );
  }
}
