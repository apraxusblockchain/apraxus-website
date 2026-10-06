import { isAddress, parseUnits } from "viem";
import { createRequestId } from "@/lib/api/request-id";
import {
  createExecutionRecord,
  getExecutionRecordByIdempotencyKey,
} from "@/lib/execution/repository";
import { getAgent } from "@/lib/agents/registry";
import { getAgentWallet } from "@/lib/agents/wallets";
import { evaluatePaymentPolicy } from "@/lib/policy/engine";
import { getApraxusAssetBySymbol } from "@/lib/web3/assets/registry";
import type { ExecutionRecord } from "@/lib/execution/types";

export type CreateExecutionIntentInput = {
  agentId: string;
  wallet: string;
  token: string;
  amount: string;
  recipient: string;
  chainId: number;
  idempotencyKey: string;
  developerId?: string;
};

export type CreateExecutionIntentResult = {
  execution: ExecutionRecord;
  network: "arbitrum-sepolia" | "bnb-testnet";
  existing: boolean;
};

export async function createExecutionIntent(
  input: CreateExecutionIntentInput,
): Promise<CreateExecutionIntentResult> {
  const agentId = input.agentId.trim();
  const wallet = input.wallet.trim();
  const token = input.token.trim();
  const amount = input.amount.trim();
  const recipient = input.recipient.trim();
  const idempotencyKey = input.idempotencyKey.trim();

  if (!idempotencyKey || idempotencyKey.length > 255) {
    throw new Error("idempotencyKey must be between 1 and 255 characters");
  }

  if (!isAddress(wallet)) {
    throw new Error("Execution wallet must be a valid EVM address");
  }

  if (!isAddress(recipient)) {
    throw new Error("Recipient must be a valid EVM address");
  }

  const asset = getApraxusAssetBySymbol(token, input.chainId);

  if (!asset || !asset.enabled) {
    throw new Error("Asset is not supported on the requested chain");
  }

  const amountPattern = new RegExp(
    `^\\d+(\\.\\d{1,${asset.decimals}})?$`,
  );

  if (!amountPattern.test(amount) || parseUnits(amount, asset.decimals) <= 0n) {
    throw new Error(
      `amount must be a positive decimal string with at most ${asset.decimals} decimals`,
    );
  }

  const agent = getAgent(agentId, input.developerId);

  if (!agent) {
    throw new Error("Agent not found");
  }

  if (agent.status !== "active") {
    throw new Error("Agent is not active");
  }

  const policy = evaluatePaymentPolicy({
    agentId,
    assetId: asset.id,
    amount,
    destination: recipient,
  });

  if (!policy.allowed) {
    throw new Error("Execution violates the agent policy");
  }

  const boundWallet = getAgentWallet(agentId);

  if (!boundWallet) {
    throw new Error("Agent wallet is not bound");
  }

  if (boundWallet.walletAddress.toLowerCase() !== wallet.toLowerCase()) {
    throw new Error("Execution wallet does not match the agent wallet");
  }

  if (asset.chainId !== input.chainId) {
    throw new Error("Asset is not supported on the requested chain");
  }

  if (boundWallet.chainId !== input.chainId) {
    throw new Error("Execution chain does not match the agent wallet chain");
  }

  const existingExecution = getExecutionRecordByIdempotencyKey(
    agentId,
    idempotencyKey,
  );

  if (existingExecution) {
    const sameRequest =
      existingExecution.walletAddress.toLowerCase() === wallet.toLowerCase() &&
      existingExecution.chainId === input.chainId &&
      existingExecution.assetId === asset.id &&
      existingExecution.assetKind === asset.kind &&
      existingExecution.tokenAddress?.toLowerCase() ===
        asset.address?.toLowerCase() &&
      existingExecution.amount === amount &&
      existingExecution.recipient.toLowerCase() === recipient.toLowerCase();

    if (!sameRequest) {
      throw new Error(
        "Idempotency-Key has already been used for a different execution request",
      );
    }

    return {
      execution: existingExecution,
      network: input.chainId === 97 ? "bnb-testnet" : "arbitrum-sepolia",
      existing: true,
    };
  }

  const requestId = createRequestId("exec");

  const execution = createExecutionRecord({
    requestId,
    agentId,
    idempotencyKey,
    walletAddress: wallet,
    chainId: input.chainId,
    assetId: asset.id,
    assetKind: asset.kind,
    tokenAddress: asset.address,
    amount,
    recipient,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  return {
    execution,
    network: input.chainId === 97 ? "bnb-testnet" : "arbitrum-sepolia",
    existing: false,
  };
}
