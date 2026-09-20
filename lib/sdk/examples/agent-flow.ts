import { ApraxusClient } from "../index";

const apraxus = new ApraxusClient({
  baseUrl: "/api/v1",
});

async function main() {
  const quote = await apraxus.getQuote({
    tokenIn: "WETH",
    tokenOut: "APXS",
    amountIn: "0.0001",
  });

  console.log("Quote:", quote);

  const payment = await apraxus.createPayment({
    token: "APXS",
    amount: "10",
    recipient: "0x...",
    agentId: "agent_demo_01",
  });

  console.log("Payment:", payment);

  const execution = await apraxus.createExecution({
    agentId: "agent_demo_01",
    wallet: "0x...",
    token: "APXS",
    amount: "10",
    recipient: "0x...",
  });

  console.log("Execution:", execution);
}

main().catch(console.error);
