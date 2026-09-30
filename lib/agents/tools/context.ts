import type {
  AgentTool,
  AgentToolRequest,
  AgentToolResult,
} from "@/lib/agents/tools/types";
import { getAgentRuntimeState } from "@/lib/agents/runtime";

export const getAgentContextTool: AgentTool = {
  name: "get_agent_context",

  async execute(
    request: AgentToolRequest,
  ): Promise<AgentToolResult> {
    const runtime = getAgentRuntimeState(request.agent);

    return {
      success: true,
      tool: "get_agent_context",
      data: {
        agent: runtime.agent,
        wallet: runtime.wallet,
        policy: runtime.policy,
      },
    };
  },
};
