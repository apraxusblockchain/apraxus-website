import { randomUUID } from "crypto";

export type AgentStatus = "active" | "revoked";

export type AgentRecord = {
  agentId: string;
  name: string;
  description?: string;
  status: AgentStatus;
  createdAt: string;
};

const agents = new Map<string, AgentRecord>();

export function createAgent(
  input: Pick<AgentRecord, "name" | "description">
): AgentRecord {
  const agent: AgentRecord = {
    agentId: `agent_${randomUUID()}`,
    name: input.name,
    description: input.description,
    status: "active",
    createdAt: new Date().toISOString(),
  };

  agents.set(agent.agentId, agent);
  return agent;
}

export function getAgent(agentId: string): AgentRecord | null {
  return agents.get(agentId) ?? null;
}

export function listAgents(): AgentRecord[] {
  return Array.from(agents.values());
}

export function revokeAgent(agentId: string): AgentRecord | null {
  const agent = agents.get(agentId);

  if (!agent) {
    return null;
  }

  const revoked = {
    ...agent,
    status: "revoked" as const,
  };

  agents.set(agentId, revoked);
  return revoked;
}
