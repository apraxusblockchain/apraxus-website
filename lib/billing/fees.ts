export type UsageFeeConfig = {
  enabled: boolean;
  rateBps: number;
  minimumFee?: number;
  maximumFee?: number;
};

export type UsageFeeInput = {
  amount: number;
  config: UsageFeeConfig;
};

export type UsageFeeResult = {
  applicable: boolean;
  fee: number;
  currency: string;
};

export function calculateUsageFee(
  input: UsageFeeInput
): UsageFeeResult {
  const { amount, config } = input;

  if (
    !config.enabled ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !Number.isFinite(config.rateBps) ||
    config.rateBps < 0
  ) {
    return {
      applicable: false,
      fee: 0,
      currency: "APXS",
    };
  }

  let fee = (amount * config.rateBps) / 10_000;

  if (config.minimumFee !== undefined) {
    fee = Math.max(fee, config.minimumFee);
  }

  if (config.maximumFee !== undefined) {
    fee = Math.min(fee, config.maximumFee);
  }

  return {
    applicable: fee > 0,
    fee,
    currency: "APXS",
  };
}
