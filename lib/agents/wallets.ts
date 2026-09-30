import { isAddress, type Address } from "viem";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { agentWallets } from "@/lib/db/schema";
import { getAgent } from "@/lib/agents/registry";

export type AgentWallet = {
  agentId: string;
  walletAddress: Address;
  chainId: number;
  boundAt: string;
};

function toAgentWallet(
  row: typeof agentWallets.$inferSelect,
): AgentWallet {
  return {
    agentId: row.agentId,
    walletAddress: row.walletAddress as Address,
    chainId: row.chainId,
    boundAt: row.boundAt,
  };
}

export function getAgentWallet(agentId: string): AgentWallet | null {
  const row = db
    .select()
    .from(agentWallets)
    .where(eq(agentWallets.agentId, agentId))
    .get();

  return row ? toAgentWallet(row) : null;
}

export function bindAgentWallet(
  agentId: string,
  input: {
    walletAddress: string;
    chainId: number;
  },
): AgentWallet | null {
  const agent = getAgent(agentId);

  if (!agent || agent.status !== "active") {
    return null;
  }

  if (!isAddress(input.walletAddress)) {
    return null;
  }

  if (!Number.isInteger(input.chainId) || input.chainId <= 0) {
    return null;
  }

  if (getAgentWallet(agentId)) {
    return null;
  }

  const existingWallet = db
    .select()
    .from(agentWallets)
    .where(
      and(
        eq(agentWallets.walletAddress, input.walletAddress),
        eq(agentWallets.chainId, input.chainId),
      ),
    )
    .get();

  if (existingWallet) {
    return null;
  }

  const wallet: AgentWallet = {
    agentId,
    walletAddress: input.walletAddress as Address,
    chainId: input.chainId,
    boundAt: new Date().toISOString(),
  };

  db.insert(agentWallets)
    .values({
      agentId: wallet.agentId,
      walletAddress: wallet.walletAddress,
      chainId: wallet.chainId,
      boundAt: wallet.boundAt,
    })
    .run();

  return wallet;
}

export function unbindAgentWallet(agentId: string): boolean {
  const result = db
    .delete(agentWallets)
    .where(eq(agentWallets.agentId, agentId))
    .run();

  return result.changes > 0;
}
