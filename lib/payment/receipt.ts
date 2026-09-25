export type PaymentReceipt = {
  transactionHash: `0x${string}`;
  status: "success" | "reverted";
  blockNumber: bigint;
};
