import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { agentPolicies } from "@/lib/db/schema";
import { getAgent } from "@/lib/agents/registry";

export type AgentPolicy = {
  agentId: string;
  dailyLimit: number;
  perTxLimit: number;
  updatedAt: string;
};

const DEFAULT_DAILY_LIMIT = 100;
const DEFAULT_PER_TX_LIMIT = 10;

function toAgentPolicy(
  row: typeof agentPolicies.$inferSelect,
): AgentPolicy {
  return {
    agentId: row.agentId,
    dailyLimit: row.dailyLimit,
    perTxLimit: row.perTxLimit,
    updatedAt: row.updatedAt,
  };
}

export function getAgentPolicy(agentId: string): AgentPolicy | null {
  const agent = getAgent(agentId);

  if (!agent) {
    return null;
  }

  const existing = db
    .select()
    .from(agentPolicies)
    .where(eq(agentPolicies.agentId, agentId))
    .get();

  if (existing) {
    return toAgentPolicy(existing);
  }

  const policy = {
    agentId,
    dailyLimit: DEFAULT_DAILY_LIMIT,
    perTxLimit: DEFAULT_PER_TX_LIMIT,
    updatedAt: new Date().toISOString(),
  };

  db.insert(agentPolicies).values(policy).run();

  return policy;
}

export function setAgentPolicy(
  agentId: string,
  input: Pick<AgentPolicy, "dailyLimit" | "perTxLimit">,
): AgentPolicy | null {
  const agent = getAgent(agentId);

  if (!agent) {
    return null;
  }

  if (
    !Number.isFinite(input.dailyLimit) ||
    !Number.isFinite(input.perTxLimit) ||
    input.dailyLimit <= 0 ||
    input.perTxLimit <= 0 ||
    input.perTxLimit > input.dailyLimit ||
    !Number.isInteger(input.dailyLimit) ||
    !Number.isInteger(input.perTxLimit)
  ) {
    return null;
  }

  const updatedAt = new Date().toISOString();

  db.insert(agentPolicies)
    .values({
      agentId,
      dailyLimit: input.dailyLimit,
      perTxLimit: input.perTxLimit,
      updatedAt,
    })
    .onConflictDoUpdate({
      target: agentPolicies.agentId,
      set: {
        dailyLimit: input.dailyLimit,
        perTxLimit: input.perTxLimit,
        updatedAt,
      },
    })
    .run();

  const policy = db
    .select()
    .from(agentPolicies)
    .where(eq(agentPolicies.agentId, agentId))
    .get();

  return policy ? toAgentPolicy(policy) : null;
}
