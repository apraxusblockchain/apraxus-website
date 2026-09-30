import type { AgentTool, AgentToolName } from "@/lib/agents/tools/types";
import { getAgentContextTool } from "@/lib/agents/tools/context";
import { createPaymentIntentTool } from "@/lib/agents/tools/payment";

const tools: Record<AgentToolName, AgentTool> = {
  get_agent_context: getAgentContextTool,
  create_payment_intent: createPaymentIntentTool,
};

export function getAgentTool(name: AgentToolName): AgentTool {
  return tools[name];
}

export function listAgentTools(): AgentToolName[] {
  return Object.keys(tools) as AgentToolName[];
}
