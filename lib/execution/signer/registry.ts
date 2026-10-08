import type { ExecutionSigner } from "./types";

const signers = new Map<string, ExecutionSigner>();

export function registerExecutionSigner(
  agentId: string,
  signer: ExecutionSigner,
): void {
  signers.set(agentId, signer);
}

export function getExecutionSigner(
  agentId: string,
): ExecutionSigner | null {
  return signers.get(agentId) ?? null;
}

export function removeExecutionSigner(agentId: string): boolean {
  return signers.delete(agentId);
}
