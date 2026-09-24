import { arbitrumSepolia, bscTestnet } from "viem/chains";

export const APXS_CHAINS = {
  arbitrumSepolia: {
    chain: arbitrumSepolia,
    address:
      "0xFE16213961cb4f9B15301f730a5977b9A145add5" as `0x${string}`,
  },
  bnbTestnet: {
    chain: bscTestnet,
    address:
      "0xEf55E41d5F5473BECAC8f7116654eB3CD571447e" as `0x${string}`,
  },
} as const;
