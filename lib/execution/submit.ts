import { getExecutionRecord } from "@/lib/execution/repository";
import { markExecutionSubmitted } from "@/lib/execution/lifecycle";
import { createEvmExecutionSigner } from "@/lib/execution/signer/evm";

export async function submitExecution(requestId: string) {
  const execution = getExecutionRecord(requestId);

  if (!execution) {
    throw new Error("Execution record not found");
  }

  if (execution.status !== "pending") {
    throw new Error("Execution is not pending");
  }

  const signer = createEvmExecutionSigner(execution.agentId);

  if (!signer) {
    throw new Error("No execution signer is configured for this agent");
  }

  if (
    signer.address.toLowerCase() !== execution.walletAddress.toLowerCase()
  ) {
    throw new Error("Execution signer does not match the execution wallet");
  }

  if (signer.chainId !== execution.chainId) {
    throw new Error("Execution signer chain does not match the execution chain");
  }

  const result = await signer.signAndSend({
    assetKind: execution.assetKind,
    tokenAddress: execution.tokenAddress as `0x${string}` | undefined,
    recipient: execution.recipient as `0x${string}`,
    amount: BigInt(execution.amount),
  });

  const updatedExecution = markExecutionSubmitted(
    requestId,
    result.transactionHash
  );

  return {
    execution: updatedExecution,
    transactionHash: result.transactionHash,
  };
}
