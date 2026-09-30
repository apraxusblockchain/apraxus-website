import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { agents, billingCustomers } from "@/lib/db/schema";

export type AgentStatus = "active" | "revoked";

export type AgentRecord = {
  agentId: string;
  developerId: string;
  name: string;
  description?: string;
  billingCustomerId?: string;
  status: AgentStatus;
  createdAt: string;
};

function toAgentRecord(
  row: typeof agents.$inferSelect,
): AgentRecord {
  return {
    agentId: row.agentId,
    developerId: row.developerId,
    name: row.name,
    description: row.description ?? undefined,
    billingCustomerId: row.billingCustomerId ?? undefined,
    status: row.status as AgentStatus,
    createdAt: row.createdAt,
  };
}

export function createAgent(
  developerId: string,
  input: Pick<AgentRecord, "name" | "description" | "billingCustomerId">,
): AgentRecord | null {
  if (input.billingCustomerId) {
    const customer = db
      .select()
      .from(billingCustomers)
      .where(eq(billingCustomers.customerId, input.billingCustomerId))
      .get();

    if (!customer || customer.developerId !== developerId) {
      return null;
    }
  }

  const agent = {
    agentId: `agent_${randomUUID()}`,
    developerId,
    name: input.name,
    description: input.description,
    billingCustomerId: input.billingCustomerId,
    status: "active" as const,
    createdAt: new Date().toISOString(),
  };

  db.insert(agents).values(agent).run();

  return agent;
}

export function getAgent(
  agentId: string,
  developerId?: string,
): AgentRecord | null {
  const row = db
    .select()
    .from(agents)
    .where(eq(agents.agentId, agentId))
    .get();

  if (!row) {
    return null;
  }

  if (developerId && row.developerId !== developerId) {
    return null;
  }

  return toAgentRecord(row);
}

export function listAgents(developerId?: string): AgentRecord[] {
  const rows = db.select().from(agents).all();

  return rows
    .filter((row) => !developerId || row.developerId === developerId)
    .map(toAgentRecord);
}

export function revokeAgent(
  agentId: string,
  developerId?: string,
): AgentRecord | null {
  const agent = getAgent(agentId, developerId);

  if (!agent) {
    return null;
  }

  const revokedAt = new Date().toISOString();

  db.update(agents)
    .set({ status: "revoked" })
    .where(eq(agents.agentId, agentId))
    .run();

  return {
    ...agent,
    status: "revoked",
  };
}
