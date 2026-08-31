import { NextResponse } from "next/server";
import { buildWethToApxsSwap } from "@/lib/web3/apxs-swap";
import { apxsSwapPublicClient } from "@/lib/web3/apxs-swap";

export async function GET() {
  try {
    const wallet =
      "0x06433691c0AfD0341Df3F31a6C31637F7f86eE71" as `0x${string}`;

    const swap = buildWethToApxsSwap(
      1_000_000_000_000n,
      0n,
      wallet,
      BigInt(Math.floor(Date.now() / 1000) + 1800),
    );

    const result = await apxsSwapPublicClient.call({
      account: wallet,
      to: swap.router,
      data: swap.data,
      value: 0n,
    });

    return NextResponse.json({
      ok: true,
      router: swap.router,
      commands: swap.commands,
      selector: swap.data.slice(0, 10),
      inputsCount: swap.inputs.length,
      calldataLength: swap.data.length,
      simulation: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
