import { createAgentRuntime, type AgentRuntimeContext } from "@/lib/agents/runtime";

export type AgentRuntimeInput = {
  agentId: string;
  developerId?: string;
};

export function resolveAgentRuntime(
  input: AgentRuntimeInput,
): AgentRuntimeContext | null {
  return createAgentRuntime(input.agentId, input.developerId);
}
