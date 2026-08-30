'use client';

import { createEVMClient } from '@metamask/connect-evm';

const DAPP_NAME = 'Apraxus';

const DAPP_URL =
  process.env.NEXT_PUBLIC_DAPP_URL ||
  'https://apraxus-website.vercel.app';

const ARBITRUM_SEPOLIA_CHAIN_ID = '0x66eee';

let clientPromise: ReturnType<typeof createEVMClient> | null = null;

export function getMetaMaskClient() {
  if (typeof window === 'undefined') {
    throw new Error('MetaMask client can only run in the browser.');
  }

  if (!clientPromise) {
    clientPromise = createEVMClient({
      dapp: {
        name: DAPP_NAME,
        url: DAPP_URL,
      },
      api: {
        supportedNetworks: {
          [ARBITRUM_SEPOLIA_CHAIN_ID]:
            'https://sepolia-rollup.arbitrum.io/rpc',
        },
      },
    });
  }

  return clientPromise;
}

export async function connectMetaMask() {
  const client = await getMetaMaskClient();

  const { accounts, chainId } = await client.connect({
    chainIds: [ARBITRUM_SEPOLIA_CHAIN_ID],
  });

  const provider = client.getProvider();

  return {
    client,
    provider,
    account: accounts[0] ?? null,
    chainId,
  };
}
