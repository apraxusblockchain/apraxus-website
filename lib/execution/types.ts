export type ExecutionStatus =
  | "pending"
  | "submitted"
  | "confirmed"
  | "failed"
  | "reverted";

export type ExecutionRecord = {
  requestId: string;
  agentId: string;
  walletAddress: string;
  chainId: number;
  tokenAddress: string;
  amount: string;
  recipient: string;
  transactionHash?: string;
  blockNumber?: string;
  status: ExecutionStatus;
  createdAt: string;
  confirmedAt?: string;
};
