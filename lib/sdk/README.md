# @apraxus/sdk

Developer SDK foundation for Apraxus.

## Network

Current environment:

- Arbitrum Sepolia
- API version: v1

## Client

```ts
import { ApraxusClient } from "./";

const apraxus = new ApraxusClient();

await apraxus.health();


- Payment intents
- Token quotes
- Execution intents

The current SDK is a development/testnet foundation. Production execution,
authentication, persistence and mainnet infrastructure are not yet enabled.

## Agent Flow Example

```ts
import { ApraxusClient } from "@apraxus/sdk";

const apraxus = new ApraxusClient({
  baseUrl: "/api/v1",
});

const quote = await apraxus.getQuote({
  tokenIn: "WETH",
  tokenOut: "APXS",
  amountIn: "0.0001",
});

const payment = await apraxus.createPayment({
  token: "APXS",
  amount: "10",
  recipient: "0x...",
  agentId: "agent_demo_01",
});

const execution = await apraxus.createExecution({
  agentId: "agent_demo_01",
  wallet: "0x...",
  token: "APXS",
  amount: "10",
  recipient: "0x...",
});
This flow creates API intents only. It does not represent a production
autonomous payment or mainnet execution.
