import type { Address } from "viem";

export async function connectMetaMask(): Promise<{
  provider: any;
  account: Address;
}> {
  if (typeof window === "undefined") {
    throw new Error("Wallet connection is only available in the browser.");
  }

  const ethereum = (window as any).ethereum;

  if (!ethereum) {
    throw new Error("MetaMask is not installed.");
  }

  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!accounts?.length) {
    throw new Error("No wallet account found.");
  }

  return {
    provider: ethereum,
    account: accounts[0] as Address,
  };
}