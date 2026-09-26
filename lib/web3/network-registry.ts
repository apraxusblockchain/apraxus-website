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
  liquidity?: {
    weth: Address;
    quoter?: Address;
    universalRouter?: Address;
    permit2: Address;
    poolManager?: Address;
    stateView?: Address;
    positionManager?: Address;
    poolId?: `0x${string}`;
    lpTokenId?: bigint;
  };
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
    liquidity: {
      weth: '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
      quoter: '0x7de51022d70a725b508085468052e25e22b5c4c9',
      universalRouter: '0xefd1d4bd4cf1e86da286bb4cb1b8bced9c10ba47',
      permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
      poolManager: '0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317',
      stateView: '0x9D467FA9062b6e9B1a46E26007aD82db116c67cB',
      positionManager: '0xAc631556d3d4019C95769033B5E719dD77124BAc',
      poolId:
        '0x40c82be5ba64731e3396bdaab91434a64b89f3cdf80ec493d0a5fafa28f1ae24',
      lpTokenId: BigInt(502),
    },
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
