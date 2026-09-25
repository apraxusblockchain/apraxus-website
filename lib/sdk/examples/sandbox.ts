import { ApraxusClient } from "../index";

const apraxus = new ApraxusClient({
  baseUrl: "/api/v1",
});

async function main() {
  const result = await apraxus.sandbox({
    action: "payment",
    agentId: "agent_sandbox_01",
    token: "APXS",
    amount: "10",
  });

  console.log("Sandbox:", result);
}

main().catch(console.error);
