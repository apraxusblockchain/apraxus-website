import { ApraxusClient } from "../index";

const apraxus = new ApraxusClient({
  baseUrl: "/api/v1",
});

async function main() {
  const payment = await apraxus.createPayment({
    token: "APXS",
    amount: "10",
    recipient: "0x...",
    agentId: "agent_demo_01",
  });

  console.log(payment);
}

main().catch(console.error);
