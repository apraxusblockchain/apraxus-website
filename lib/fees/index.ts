export type PlatformFeeInput = {
  amount: bigint;
  basisPoints: number;
};

export type PlatformFeeResult = {
  fee: bigint;
  total: bigint;
};

export function calculatePlatformFee(
  input: PlatformFeeInput,
): PlatformFeeResult {
  if (input.amount < 0n) {
    throw new Error("amount must not be negative");
  }

  if (
    !Number.isInteger(input.basisPoints) ||
    input.basisPoints < 0 ||
    input.basisPoints > 10_000
  ) {
    throw new Error("basisPoints must be an integer between 0 and 10000");
  }

  const fee =
    (input.amount * BigInt(input.basisPoints)) / 10_000n;

  return {
    fee,
    total: input.amount + fee,
  };
}
