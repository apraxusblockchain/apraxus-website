import { getAgent, type AgentRecord } from "@/lib/agents/registry";

export type AgentRuntimeContext = {
  agent: AgentRecord;
};

export function createAgentRuntime(
  agentId: string,
  developerId?: string,
): AgentRuntimeContext | null {
  const agent = getAgent(agentId, developerId);

  if (!agent || agent.status !== "active") {
    return null;
  }

  return { agent };
}

export { getAgentRuntimeState } from "@/lib/agents/runtime/context";
export type { AgentRuntimeState } from "@/lib/agents/runtime/context";
export {
  createAgentPaymentIntent,
  type AgentPaymentIntent,
} from "@/lib/agents/runtime/payment";
export {
  resolveAgentRuntime,
  type AgentRuntimeInput,
} from "@/lib/agents/runtime/run";
