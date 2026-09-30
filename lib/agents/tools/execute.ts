import type {
  AgentRuntimeContext,
} from "@/lib/agents/runtime";
import { getAgentTool } from "@/lib/agents/tools";
import type {
  AgentToolName,
  AgentToolResult,
} from "@/lib/agents/tools/types";

export async function executeAgentTool(
  agent: AgentRuntimeContext,
  name: AgentToolName,
  input: Record<string, unknown> = {},
): Promise<AgentToolResult> {
  const tool = getAgentTool(name);

  return tool.execute({
    agent,
    input,
  });
}
