export type ExecutionSignerConfig = {
  agentId: string;
  privateKey: `0x${string}`;
  chainId: number;
  rpcUrl: string;
};

export function getExecutionSignerConfig(): ExecutionSignerConfig | null {
  const agentId = process.env.APXS_EXECUTION_AGENT_ID;
  const privateKey = process.env.APXS_EXECUTION_PRIVATE_KEY;
  const chainId = process.env.APXS_EXECUTION_CHAIN_ID;
  const rpcUrl = process.env.APXS_EXECUTION_RPC_URL;

  if (!agentId || !privateKey || !chainId || !rpcUrl) {
    return null;
  }

  if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
    throw new Error("APXS_EXECUTION_PRIVATE_KEY is invalid");
  }

  const parsedChainId = Number(chainId);

  if (!Number.isInteger(parsedChainId) || parsedChainId <= 0) {
    throw new Error("APXS_EXECUTION_CHAIN_ID is invalid");
  }

  return {
    agentId,
    privateKey: privateKey as `0x${string}`,
    chainId: parsedChainId,
    rpcUrl,
  };
}
