import { Token, Percent } from '@uniswap/sdk-core';
import { Pool, Position } from '@uniswap/v4-sdk';
import { V4PositionManager } from '@uniswap/v4-sdk';
import type { BatchPermitOptions } from '@uniswap/v4-sdk';

import {
  APXS_SEPOLIA_ADDRESS,
  WETH_SEPOLIA_ADDRESS,
  POSITION_MANAGER_ADDRESS,
  APXS_WETH_POOL_ID,
} from './apxs-liquidity';

import { arbitrumSepolia } from 'viem/chains';

export const APXS_TOKEN = new Token(
  arbitrumSepolia.id,
  APXS_SEPOLIA_ADDRESS,
  8,
  'APXS',
  'Apraxus',
);

export const WETH_TOKEN = new Token(
  arbitrumSepolia.id,
  WETH_SEPOLIA_ADDRESS,
  18,
  'WETH',
  'Wrapped Ether',
);

export function buildIncreaseLiquidityCall(
  sqrtPriceX96: bigint,
  poolLiquidity: bigint,
  currentTick: number,
  tickLower: number,
  tickUpper: number,
  positionLiquidity: bigint,
  tokenId: bigint,
  slippageBps = 50,
  batchPermit?: BatchPermitOptions,
) {
  const pool = new Pool(
    WETH_TOKEN,
    APXS_TOKEN,
    3000,
    60,
    '0x0000000000000000000000000000000000000000',
    sqrtPriceX96.toString(),
    poolLiquidity.toString(),
    currentTick,
  );

  const position = new Position({
    pool,
    liquidity: positionLiquidity.toString(),
    tickLower,
    tickUpper,
  });

  const slippageTolerance = new Percent(
    slippageBps,
    10_000,
  );

  const deadline =
    Math.floor(Date.now() / 1000) + 1200;

  const maximumAmounts =
    position.mintAmountsWithSlippage(
      slippageTolerance,
    );

  const result =
    V4PositionManager.addCallParameters(
      position,
      {
        tokenId: tokenId.toString(),
        slippageTolerance,
        deadline: deadline.toString(),
        ...(batchPermit
          ? { batchPermit }
          : {}),
      },
    );

  return {
    calldata: result.calldata,
    value: BigInt(result.value),
    amount0Max: maximumAmounts.amount0.toString(),
    amount1Max: maximumAmounts.amount1.toString(),
    poolId: APXS_WETH_POOL_ID,
    positionManager: POSITION_MANAGER_ADDRESS,
  };
}
