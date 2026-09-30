import { evaluatePaymentPolicy, type PaymentPolicyResult } from "@/lib/policy/engine";
import { getAgentWallet } from "@/lib/agents/wallets";
import type { AgentRuntimeContext } from "@/lib/agents/runtime";

export type AgentPaymentIntent = {
  agentId: string;
  wallet: string;
  chainId: number;
  amount: string;
  recipient: string;
  allowed: boolean;
  policy: PaymentPolicyResult;
};

export function createAgentPaymentIntent(
  context: AgentRuntimeContext,
  input: {
    amount: string;
    recipient: string;
  },
): AgentPaymentIntent | null {
  const wallet = getAgentWallet(context.agent.agentId);

  if (!wallet) {
    return null;
  }

  const policy = evaluatePaymentPolicy({
    agentId: context.agent.agentId,
    amount: input.amount,
    destination: input.recipient,
  });

  return {
    agentId: context.agent.agentId,
    wallet: wallet.walletAddress,
    chainId: wallet.chainId,
    amount: input.amount,
    recipient: input.recipient,
    allowed: policy.allowed,
    policy,
  };
}
