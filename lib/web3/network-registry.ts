import type { Address } from 'viem';

export type ApraxusNetworkKey = 'arbitrumSepolia' | 'bnbTestnet';

export type ApraxusNetworkConfig = {
  key: ApraxusNetworkKey;
  name: string;
  shortName: string;
  chainId: number;
  environment: 'TESTNET';
  nativeCurrency: string;
  apxs: Address;
  explorer: string;
  apxsExplorer: string;
};

export const APRAXUS_NETWORKS: Record<
  ApraxusNetworkKey,
  ApraxusNetworkConfig
> = {
  arbitrumSepolia: {
    key: 'arbitrumSepolia',
    name: 'Arbitrum Sepolia',
    shortName: 'ARB SEPOLIA',
    chainId: 421614,
    environment: 'TESTNET',
    nativeCurrency: 'ETH',
    apxs: '0xFE16213961cb4f9B15301f730a5977b9A145add5',
    explorer: 'https://sepolia.arbiscan.io',
    apxsExplorer:
      'https://sepolia.arbiscan.io/token/0xFE16213961cb4f9B15301f730a5977b9A145add5',
  },

  bnbTestnet: {
    key: 'bnbTestnet',
    name: 'BNB Testnet',
    shortName: 'BNB TESTNET',
    chainId: 97,
    environment: 'TESTNET',
    nativeCurrency: 'tBNB',
    apxs: '0xEf55E41d5F5473BECAC8f7116654eB3CD571447e',
    explorer: 'https://testnet.bscscan.com',
    apxsExplorer:
      'https://testnet.bscscan.com/token/0xEf55E41d5F5473BECAC8f7116654eB3CD571447e',
  },
};

export const getApraxusNetwork = (
  key: ApraxusNetworkKey,
): ApraxusNetworkConfig => APRAXUS_NETWORKS[key];
