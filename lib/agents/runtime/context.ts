import { getAgentWallet, type AgentWallet } from "@/lib/agents/wallets";
import { getAgentPolicy, type AgentPolicy } from "@/lib/policy/registry";
import type { AgentRuntimeContext } from "@/lib/agents/runtime";

export type AgentRuntimeState = AgentRuntimeContext & {
  wallet: AgentWallet | null;
  policy: AgentPolicy | null;
};

export function getAgentRuntimeState(
  context: AgentRuntimeContext,
): AgentRuntimeState {
  return {
    ...context,
    wallet: getAgentWallet(context.agent.agentId),
    policy: getAgentPolicy(context.agent.agentId),
  };
}
