# @apraxus/sdk

Developer SDK foundation for Apraxus.

## Network

- Arbitrum Sepolia
- API version: v1

> Development/testnet only. Production execution and mainnet infrastructure are not enabled yet.

## Client

```ts
import { createApraxusClient } from "@apraxus/sdk";

const apraxus = createApraxusClient({
  baseUrl: "http://localhost:3000/api/v1",
  apiKey: process.env.APRAXUS_API_KEY,
});
```

## Available Operations

- Health checks
- Payment intents
- Token quote requests
- Execution intents
- Sandbox simulations

> Current quote responses are quote-intent responses, not live DEX pricing.

## Development Status

The current SDK is a development/testnet foundation for building and testing Apraxus integrations on Arbitrum Sepolia.

Production authentication, persistence, autonomous execution, agent wallets, policy enforcement and mainnet infrastructure are planned for later stages.
