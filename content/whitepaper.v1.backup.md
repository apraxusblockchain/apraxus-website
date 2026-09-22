# APRAXUS
## Infrastructure for the Autonomous Economy

**Canonical Protocol Whitepaper — Version 1.0**  
**Publication:** September 2026

---

## Document Status

This document is the canonical protocol-level description of Apraxus at Version 1.0.

Apraxus is currently a **development and testnet project**. The publicly usable environment operates on **Arbitrum Sepolia** and includes APXS testnet infrastructure, wallet connectivity, developer APIs, an SDK foundation, payment and quote workflows, execution-intent interfaces, sandbox tooling, metrics, and testnet APXS/WETH liquidity infrastructure.

The document uses three maturity labels:

- **Verified / Live** — functionality that is deployed or directly verifiable in the current public testnet product.
- **In Development / Prototype** — implementation, source-code prototype, or engineering work that exists but is not a production-network guarantee.
- **Future / Research** — proposed protocol architecture and research direction for a future Apraxus-owned network or broader ecosystem.

The separation is intentional. Architectural concepts in this document must not be interpreted as claims that a native Apraxus mainnet, autonomous production execution network, production consensus system, or production agent economy already exists.

---

# 1. Abstract

Apraxus is an infrastructure project focused on the emerging autonomous economy: an environment in which software agents, automated services, machines, and human-controlled applications can exchange value and perform digitally verifiable actions with limited human intervention.

The central problem is not simply moving tokens between addresses. Autonomous software needs a broader execution model. It needs to express an intended action, operate under explicit authorization boundaries, interact with wallets and assets, submit or request execution, and produce an outcome that can be inspected and attributed to a particular request or policy context.

Apraxus therefore develops a protocol model around several primitives:

**Intent → Agent → Policy → Wallet → Execution → Receipt**

In the current product, these ideas are represented through testnet applications, APIs, wallet interactions, policy-oriented simulators, payment workflows, and developer tooling. The current public network is Arbitrum Sepolia rather than a native Apraxus blockchain.

The longer-term research direction is a dedicated Apraxus network designed around machine-to-machine execution, agent identity, policy-aware authorization, programmable payments, deterministic state, receipts, and autonomous services. That future network is not currently presented as live infrastructure.

---

# 2. Introduction

Software is becoming increasingly capable of taking actions rather than merely returning information. An AI system can select a service, request computation, purchase data, call an API, rebalance a treasury, coordinate with another software agent, or trigger an on-chain transaction.

Traditional blockchain interfaces were primarily designed around human-controlled wallets and manually initiated transactions. That model remains useful, but autonomous software introduces additional requirements.

An autonomous actor may need:

1. a stable identity;
2. delegated authority;
3. explicit spending limits;
4. asset restrictions;
5. destination restrictions;
6. time-bounded permissions;
7. escalation rules;
8. transaction ordering;
9. cryptographic verification;
10. execution outcomes;
11. machine-readable receipts;
12. mechanisms for revocation and recovery.

Apraxus treats these requirements as infrastructure concerns.

The project is not defined by a single application. Its intended role is to provide a developer-facing and protocol-facing foundation through which autonomous software can interact with value and execution systems while preserving operator-defined boundaries.

---

# 3. The Autonomous Economy

## 3.1 Definition

The autonomous economy describes economic activity in which software agents and machines participate directly in the selection, purchase, delivery, and settlement of digital services.

Examples include:

- an AI research agent purchasing inference;
- an automated service paying for API requests;
- one software agent purchasing a task from another;
- autonomous infrastructure paying for compute;
- a machine paying for charging or other machine services;
- automated treasury operations;
- software purchasing data or storage;
- an application executing a bounded liquidity or settlement operation.

These examples are **target use cases**, not statements that every example is currently production-enabled by Apraxus.

## 3.2 Why Existing Wallet Models Are Not Enough

A private key proves control of an account. It does not by itself describe why a transaction is being made, what an agent is allowed to do, how much it can spend, which destinations it can reach, or whether the transaction should require human approval.

Apraxus therefore separates the concepts of:

- identity;
- authorization;
- policy;
- wallet;
- execution;
- settlement;
- receipt.

This separation allows an application to reason about an action before treating the resulting blockchain transaction as the final outcome.

---

# 4. Problem Definition

Autonomous economic systems face several classes of problems.

## 4.1 Unbounded Authority

Giving an autonomous process unrestricted access to a valuable wallet creates a large blast radius. A software error, compromised model, malicious prompt, credential leak, or integration failure can potentially turn into an economic loss.

A policy-aware system should instead define what the actor may do.

## 4.2 Weak Intent-to-Execution Traceability

A raw transaction hash proves that a transaction was submitted and, after confirmation, included by the underlying network. It does not necessarily provide application-level context for the request that caused it.

Autonomous systems benefit from explicit request identifiers, policy references, execution states, and receipts.

## 4.3 Machine-to-Machine Payment Friction

Human wallets are optimized around human interaction. Autonomous software requires programmable interfaces, predictable request formats, machine-readable errors, and integration tooling.

## 4.4 Authorization Complexity

Agent permissions may involve:

- amount ceilings;
- rolling windows;
- destination allowlists;
- asset allowlists;
- time locks;
- escalation thresholds;
- revocation;
- multiple operator approvals.

These constraints are difficult to represent cleanly if every application invents its own incompatible authorization model.

## 4.5 Operational Verification

Developers need to know whether an operation was accepted, simulated, submitted, rejected, or confirmed. A protocol designed for autonomous software must make these states explicit.

---

# 5. Design Objectives

The Apraxus design direction is based on the following objectives.

### 5.1 Explicit Authorization

Authority should be represented as explicit policy rather than assumed from possession of a general-purpose credential.

### 5.2 Deterministic Policy Evaluation

Given the same policy and transaction payload, policy evaluation should produce a deterministic decision.

### 5.3 Cryptographic Identity

Agent and operator identities should ultimately be bound to cryptographic keys rather than informal names.

### 5.4 Bounded Economic Authority

Agents should operate within configurable spending and destination boundaries.

### 5.5 Human Escalation

High-risk operations should be capable of being escalated to additional human authorization.

### 5.6 Revocation

Operators should have a mechanism to invalidate delegated authority.

### 5.7 Traceability

Intent, policy, execution, and outcome should be linkable through identifiers and receipts.

### 5.8 Developer Accessibility

Developers should be able to interact through documented APIs and SDKs rather than implementing the complete protocol stack themselves.

### 5.9 Explicit Maturity Boundaries

Current testnet functionality must remain distinguishable from future protocol research.

---

# 6. Protocol Model

The conceptual Apraxus execution path is:

```text
INTENT
   ↓
AGENT
   ↓
POLICY
   ↓
WALLET
   ↓
EXECUTION
   ↓
RECEIPT
```

Each stage has a different responsibility.

## 6.1 Intent

An intent describes what an application or agent wants to accomplish.

An intent may contain information such as:

- action type;
- asset;
- amount;
- destination;
- agent identifier;
- wallet;
- request identifier;
- application context;
- expiry;
- policy reference.

An intent is not automatically an authorization.

## 6.2 Agent

An agent is the software actor attempting to perform an action.

An agent may be identified by:

- an application-level identifier;
- a public key;
- a delegated key;
- a future protocol-native identity record.

The current product contains agent-oriented interfaces and simulations. A production-native agent identity registry is a future protocol component.

## 6.3 Policy

Policy defines the boundary within which an agent may act.

The prototype policy model includes concepts such as:

- spend ceilings;
- rolling spending windows;
- destination allowlists;
- asset allowlists;
- escalation thresholds;
- expiry;
- anomaly-triggered revocation.

## 6.4 Wallet

A wallet is the mechanism through which assets are ultimately controlled.

In the current testnet product, wallet interaction is performed through EVM-compatible wallet tooling and MetaMask on Arbitrum Sepolia.

The future architecture may introduce more specialized agent wallets and delegated credentials.

## 6.5 Execution

Execution is the process of translating an approved action into an operation.

Today this includes testnet API execution intents and real user-confirmed ERC-20 transfers. A future native network could integrate policy and execution more deeply.

## 6.6 Receipt

A receipt represents the result of an operation.

A future protocol receipt may contain:

- request identifier;
- intent identifier;
- policy identifier;
- agent identity;
- transaction or execution digest;
- status;
- timestamp;
- resource usage;
- settlement information;
- cryptographic proof references.

The exact production receipt schema remains a future specification area.

---

# 7. Agent Identity

Agent identity is a central research area for Apraxus.

A useful identity model must answer:

- Which software actor requested the operation?
- Who authorized that actor?
- Which key signed the action?
- What policy governed it?
- When does that authorization expire?
- Can the authority be revoked?
- Can a different agent be distinguished from the original one?

## 7.1 Operator Identity

A human or organization may act as the root authority.

The prototype policy envelope contains a `master_operator_pubkey` field representing the conceptual root public key.

## 7.2 Delegated Agent Identity

The target architecture contemplates delegated agent keys rather than sharing the operator's root key with an autonomous process.

This reduces the amount of authority exposed to the agent.

## 7.3 Key Rotation

A production implementation should support key rotation and recovery without requiring the entire economic identity to be recreated.

The exact production mechanism is future work.

## 7.4 Revocation

The target policy model contains an `auto_revoke_on_anomaly` concept and an architectural revocation registry.

These are protocol design targets, not claims of a production network-wide revocation service.

---

# 8. Policy Architecture

Policy is the main control layer between an autonomous actor and economic execution.

## 8.1 Policy Envelope

The prototype Rust-oriented specification defines a policy envelope containing:

- `envelope_id`
- `master_operator_pubkey`
- `agent_identity`
- `spend_limit`
- `allowlist_destinations`
- `allowlist_assets`
- `multi_sig_escalation_threshold`
- `time_lock_expires_at`
- `auto_revoke_on_anomaly`

The associated spend-limit structure contains:

- `max_per_transaction`
- `max_per_window`
- `window_duration_seconds`
- `current_window_spent`

The prototype evaluation logic demonstrates checks for transaction ceilings and unauthorized destinations before approving an operation.

## 8.2 Asset Allowlists

An agent can be restricted to a defined set of assets.

For example, a policy may conceptually allow APXS and USDC while blocking other assets.

## 8.3 Destination Allowlists

A policy may restrict an agent to known destinations.

This reduces the risk of an autonomous process transferring value to an arbitrary address.

## 8.4 Spending Windows

A maximum transaction amount and a maximum cumulative amount serve different purposes.

A per-transaction ceiling limits individual losses.

A rolling or fixed spending window limits cumulative losses.

## 8.5 Expiration

Policy envelopes can contain an expiration timestamp.

An expired authorization should not be treated as a valid long-lived credential.

## 8.6 Escalation

A transaction above a configured threshold can require additional authorization.

The prototype simulator demonstrates a human-escalation threshold concept. The specific multi-signature mechanism is not yet a production Apraxus network guarantee.

## 8.7 Anomaly Revocation

The target model includes automatic revocation on anomaly.

A production implementation would need a formally defined anomaly source, authority model, dispute mechanism, and recovery procedure.

---

# 9. Policy Evaluation

The intended policy evaluation pipeline is:

```text
Receive intent
    ↓
Identify agent
    ↓
Load applicable policy
    ↓
Validate asset
    ↓
Validate destination
    ↓
Validate amount
    ↓
Validate spending window
    ↓
Validate expiration
    ↓
Determine escalation requirement
    ↓
Approve / Reject / Escalate
```

A policy decision should be deterministic for the same input state.

The prototype simulator demonstrates this concept with asset, budget, destination, and escalation checks.

The simulator is explicitly a **concept/demo system** and must not be confused with a production consensus-enforced policy engine.

---

# 10. Wallet Architecture

## 10.1 Current Wallet Model

The current public testnet product uses EVM wallet connectivity.

The APXS Agent Payment Console can:

1. detect a browser wallet;
2. switch to Arbitrum Sepolia;
3. request a connected account;
4. read APXS decimals;
5. read the wallet's APXS balance;
6. construct an ERC-20 transfer;
7. request user confirmation;
8. wait for the transaction receipt;
9. expose the resulting transaction hash and Arbiscan link.

The transaction remains user-confirmed. This is not autonomous production custody.

## 10.2 Future Agent Wallet Model

A future Apraxus network could support wallets specifically designed for delegated autonomous authority.

Such a wallet could bind:

```text
Operator
   ↓
Agent Identity
   ↓
Policy Envelope
   ↓
Delegated Key
   ↓
Allowed Execution
```

The exact wallet implementation remains a research and engineering task.

---

# 11. Execution Model

Execution should distinguish at least four states:

1. **Requested**
2. **Policy Evaluated**
3. **Submitted**
4. **Confirmed / Rejected**

A developer-facing API may create an execution intent without immediately claiming that a blockchain transaction has occurred.

This distinction is already reflected in the current API architecture, where payment and execution endpoints can create testnet-oriented intents and return request identifiers.

Production persistence, durable execution queues, and autonomous execution are future infrastructure.

---

# 12. Payments

Payments are one of the first practical applications of the Apraxus model.

## 12.1 Machine-to-Machine Payments

An autonomous service may need to pay another service without requiring a human to manually approve every low-value operation.

Examples include:

- API calls;
- compute;
- inference;
- data;
- storage;
- software services;
- autonomous task delegation.

These are target use cases.

## 12.2 Payment Intent

A payment intent can represent:

- token;
- amount;
- recipient;
- agent;
- request identifier;
- network;
- status.

The current API includes a payment-intent route and SDK support for creating payment requests.

## 12.3 Current Testnet Payment

The current API is a development/testnet interface. It does not establish that Apraxus currently operates a production autonomous settlement network.

Separately, the website's Agent Payment Console can perform a real user-confirmed APXS ERC-20 transfer on Arbitrum Sepolia after application-level policy checks.

---

# 13. Settlement

Settlement is the point at which an approved economic action becomes final according to the underlying settlement system.

Today, APXS testnet transactions settle on Arbitrum Sepolia.

A future Apraxus-owned network could provide its own settlement layer.

The two environments must not be conflated:

```text
CURRENT
Application
   ↓
Apraxus developer/testnet infrastructure
   ↓
Arbitrum Sepolia
   ↓
EVM settlement

FUTURE
Application / Agent
   ↓
Apraxus protocol
   ↓
Apraxus network
   ↓
Native settlement
```

---

# 14. Receipts and Verification

Receipts are intended to provide machine-readable evidence of an execution outcome.

A future receipt could bind:

- request;
- agent;
- policy;
- action;
- execution digest;
- status;
- settlement reference.

The purpose is to allow another system to answer:

> What was requested, under whose authority, under which policy, and what actually happened?

This becomes increasingly important when machines transact with other machines.

---

# 15. State

A future native Apraxus network requires deterministic state.

The current Rust source contains a state persistence prototype described around an embedded key-value state tree and Merkle-tree direction. Its status is testing rather than production.

Potential state categories include:

- account balances;
- nonces;
- policy envelopes;
- agent identities;
- execution records;
- receipts;
- revocation state.

A production state model must define deterministic transitions, persistence guarantees, recovery, synchronization, and proof semantics.

---

# 16. Cryptography

The prototype architecture includes Ed25519-based signing and verification.

The source describes:

- transaction signing;
- signature verification;
- nonce ordering;
- replay-prevention concepts.

Cryptographic primitives are only one part of system security. Correct key management, domain separation, serialization, nonce handling, recovery, and authorization semantics are equally important.

The exact production cryptographic protocol requires formal review and security testing before mainnet use.

---

# 17. Replay Protection and Nonces

Autonomous systems must prevent an old authorization or transaction from being reused unintentionally.

A nonce model can establish ordering and uniqueness.

A production protocol must specify:

- nonce ownership;
- whether nonces are per account or per agent;
- handling of concurrent requests;
- failed transaction behavior;
- replacement rules;
- persistence;
- replay behavior across chains.

The prototype source identifies nonce ordering and replay prevention as part of the cryptographic transaction design.

---

# 18. APXS

## 18.1 Token Identity

**Name:** Apraxus  
**Symbol:** APXS  
**Network:** Arbitrum Sepolia testnet  
**Decimals:** 8  
**Maximum supply:** 1,000,000,000 APXS

**Testnet contract:**

`0xFE16213961cb4f9B15301f730a5977b9A145add5`

**Explorer:**

https://sepolia.arbiscan.io/token/0xFE16213961cb4f9B15301f730a5977b9A145add5

These parameters describe the current testnet deployment.

## 18.2 Current Token Role

APXS currently serves as the project's testnet token and is integrated into the public testnet product.

The current code exposes standard ERC-20 operations including:

- name;
- symbol;
- decimals;
- total supply;
- balance;
- allowance;
- transfer;
- approval.

## 18.3 Future Utility

The long-term utility model is expected to be defined alongside the future Apraxus protocol and network architecture.

Potential areas of protocol utility may include:

- network resource payments;
- execution fees;
- settlement;
- service payments;
- machine-to-machine economic activity;
- ecosystem participation.

These are future design directions and should not be interpreted as current mainnet utility.

## 18.4 Token Economics

This Version 1.0 document does **not** invent a final distribution schedule, founder allocation, treasury allocation, investor allocation, or liquidity allocation.

Those figures require an approved tokenomics specification.

Testnet deployment parameters and future economic policy are separate matters.

---

# 19. Current Testnet

## 19.1 Network

**Network:** Arbitrum Sepolia  
**Chain ID:** 421614

The current public product uses Arbitrum Sepolia as its execution and settlement environment.

## 19.2 APXS Testnet Contract

`0xFE16213961cb4f9B15301f730a5977b9A145add5`

## 19.3 WETH Testnet Asset

`0x980B62Da83eFf3D4576C647993b0c1D7faf17c73`

## 19.4 Developer Environment

The public testnet environment provides:

- wallet connectivity;
- APXS balance and transfer interaction;
- APXS/WETH swap infrastructure;
- developer API v1;
- API authentication;
- SDK foundation;
- payment intents;
- quotes;
- execution intents;
- webhooks;
- sandbox;
- metrics;
- developer documentation.

---

# 20. APXS/WETH Liquidity Infrastructure

The testnet contains an APXS/WETH Uniswap v4 integration.

Relevant deployed testnet infrastructure includes:

**Quoter**

`0x7de51022d70a725b508085468052e25e22b5c4c9`

**Universal Router**

`0xefd1d4bd4cf1e86da286bb4cb1b8bced9c10ba47`

**PoolManager**

`0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317`

**StateView**

`0x9d467fa9062b6e9b1a46e26007ad82db116c67cb`

**PositionManager**

`0xAc631556d3d4019C95769033B5E719dD77124BAc`

The configured testnet pool uses:

- WETH;
- APXS;
- fee tier: 3000;
- tick spacing: 60;
- no hook.

The project source also records a testnet APXS/WETH pool identifier and liquidity position identifier.

This infrastructure is testnet liquidity infrastructure and is not a statement about mainnet liquidity, market depth, or token value.

---

# 21. Developer Platform

Apraxus provides a developer-facing layer around the protocol concepts.

## 21.1 API Version

Current API version:

`v1`

Current network identifier:

`arbitrum-sepolia`

## 21.2 Health

The health endpoint exposes service status and network context.

Conceptually:

```json
{
  "service": "Apraxus API",
  "version": "v1",
  "status": "operational",
  "network": "arbitrum-sepolia"
}
```

## 21.3 Payments

The SDK provides a payment method accepting:

```text
token
amount
recipient
agentId
```

The current endpoint is intended for development/testnet workflows.

## 21.4 Quotes

The SDK provides quote functionality accepting:

```text
tokenIn
tokenOut
amountIn
```

## 21.5 Executions

The SDK provides an execution-intent method accepting:

```text
agentId
wallet
token
amount
recipient
```

## 21.6 Authentication

Protected API routes use bearer authentication.

The current development implementation compares the supplied bearer token with a server-configured API key.

This is a development/testnet authentication foundation, not a complete production identity and key-management system.

## 21.7 API Keys

The current development API key generator produces random keys with an `apx_` prefix.

Production-grade key management requires:

- persistent storage;
- hashing;
- rotation;
- revocation;
- scoped permissions;
- audit logging;
- rate limiting;
- organizational ownership.

Those are future production requirements.

## 21.8 Metrics

The current API records endpoint-level request metrics in an in-memory development structure.

This is useful for testnet observability but is not a production telemetry architecture.

---

# 22. SDK

The project contains an SDK foundation under `@apraxus/sdk`.

The current client provides:

```ts
createApraxusClient(apiKey)
```

and methods including:

```ts
client.health()
client.createPayment(...)
client.getQuote(...)
client.createExecution(...)
```

The SDK is currently a development/testnet foundation.

Future SDK work may include:

- typed policy objects;
- agent identity helpers;
- wallet adapters;
- receipt verification;
- event subscriptions;
- retries;
- execution lifecycle tracking;
- native network RPC support;
- multi-chain abstractions.

---

# 23. Sandbox

The developer sandbox provides a safe environment for testing workflow shapes without presenting simulation as real settlement.

A sandbox request can model actions such as payment.

The sandbox is intentionally separated from production execution.

This distinction is important because autonomous software should be testable before it is granted economic authority.

---

# 24. Agent Payment Console

The current website includes an APXS Agent Payment Console.

The console performs application-level checks including:

- positive amount;
- per-transaction limit;
- daily limit;
- destination address validation;
- APXS balance validation.

After checks pass, it uses an EVM wallet client and requires the user to confirm the ERC-20 transfer.

The current demonstration limits are:

- 100 APXS daily;
- 10 APXS per transaction.

These are **application demo limits**, not claims that these values are protocol-native limits.

---

# 25. Policy Simulator

The website also contains a deterministic policy simulator.

It demonstrates:

- asset allowlists;
- budget limits;
- destination allowlists;
- human-escalation thresholds;
- policy decisions.

The simulator is explicitly a **concept demo**.

It can produce synthetic transaction hashes and receipt-like output for demonstration. Those simulated hashes must not be treated as blockchain transactions.

This distinction is critical for accurate protocol documentation.

---

# 26. Current Rust Prototype Architecture

The source repository contains an experimental Rust-oriented architecture.

The current prototype viewer identifies components including:

### Rust Blockchain Core — Shipped Prototype

The source describes immutable block data structures, cryptographic hashing, and genesis validation.

### Ed25519 Signatures — Shipped Prototype

The source describes cryptographic signing and verification with replay-prevention and nonce-ordering concepts.

### State Persistence Engine — Testing

The source describes local embedded state storage for balances, policy envelopes, and execution receipts.

### Peer Networking — Under Development

The source describes point-to-point node communication, transaction mempool propagation, and block broadcast concepts.

### Agent Policy Envelope — Under Development

The source describes pre-flight checks for budget limits, asset allowlists, and execution permissions.

### Local Single-Node Testbed — Testing

The source describes local end-to-end block and transaction lifecycle testing.

These components should be interpreted as prototype engineering evidence rather than a deployed decentralized network.

---

# 27. Future Native Apraxus Network

The long-term architecture may evolve from using an external EVM settlement environment to operating an Apraxus-owned network.

The proposed layered model contains:

```text
Layer 7 — Application & Autonomous Services
Layer 6 — Agent Identity & Policy
Layer 5 — Execution Environment
Layer 4 — State & Merkle Storage
Layer 3 — Consensus & Finality
Layer 2 — P2P Network & Mempool
Layer 1 — Node Infrastructure
```

The current roadmap intentionally keeps the native-chain phase frozen while testnet product and developer infrastructure are prioritized.

---

# 28. Layer 1 — Node Infrastructure

A future node implementation may need to run on:

- cloud servers;
- dedicated infrastructure;
- edge devices;
- autonomous hardware clusters.

A production node would require:

- state synchronization;
- peer discovery;
- block validation;
- transaction validation;
- consensus participation;
- storage;
- cryptographic key management;
- telemetry;
- resource management.

The current prototype is not a production node network.

---

# 29. Layer 2 — P2P Network

The prototype architecture includes TCP peer communication concepts and asynchronous Tokio networking.

The longer-term architecture contemplates more robust peer-to-peer networking.

A production P2P layer would need:

- peer discovery;
- authenticated connections;
- transaction propagation;
- block propagation;
- peer scoring;
- denial-of-service resistance;
- bandwidth controls;
- network partition handling.

The exact production protocol remains future work.

---

# 30. Layer 3 — Consensus and Finality

The architecture viewer identifies Proof-of-Stake consensus as a planned direction.

A production consensus protocol must define:

- validator registration;
- stake;
- proposer selection;
- block voting;
- finality;
- slashing;
- validator liveness;
- network recovery;
- fork choice;
- governance of consensus parameters.

Apraxus does not currently claim to operate this native PoS network.

---

# 31. Layer 4 — State and Merkle Storage

A future state layer may combine deterministic execution with Merkle-based verification.

Potential state categories include:

```text
Accounts
Balances
Nonces
Policies
Agent identities
Execution records
Receipts
Revocations
Application state
```

A Merkle structure can provide compact commitments to a larger state set.

A production implementation would need to specify:

- state root construction;
- proof format;
- update semantics;
- storage layout;
- pruning;
- snapshots;
- synchronization;
- recovery.

---

# 32. Layer 5 — Execution Environment

The target architecture identifies a WASM/EVM-compatible execution direction.

The design goal is to support programmable execution while remaining suitable for machine-to-machine calls.

A future execution environment must address:

- deterministic computation;
- gas/resource accounting;
- contract isolation;
- execution limits;
- failure semantics;
- state access;
- upgrades;
- compatibility;
- security.

The exact VM architecture is not finalized in this whitepaper.

---

# 33. Layer 6 — Agent Identity and Policy

The agent layer is intended to make autonomous authority a first-class protocol concern.

A future network could maintain:

```text
Operator identity
      ↓
Agent identity
      ↓
Policy envelope
      ↓
Delegated key
      ↓
Transaction intent
      ↓
Policy evaluation
```

This creates a separation between the identity that ultimately controls authority and the software process that uses delegated authority.

---

# 34. Layer 7 — Autonomous Services

The top layer is intended to support applications including:

- autonomous agents;
- payment gateways;
- machine marketplaces;
- service-to-service payments;
- DeFi automation;
- data markets;
- compute markets;
- autonomous infrastructure.

These are target applications, not current mainnet capabilities.

---

# 35. Native Network Execution Flow

A future native execution flow could be:

```text
Agent
  ↓
Intent
  ↓
Authentication
  ↓
Policy Evaluation
  ↓
Wallet Authorization
  ↓
Mempool
  ↓
Consensus
  ↓
Execution
  ↓
State Update
  ↓
Settlement
  ↓
Receipt
```

The major architectural objective is that policy and identity are not merely external application conventions but can become verifiable protocol primitives.

---

# 36. Machine-to-Machine Markets

A mature autonomous economy requires more than payments.

It requires markets in which machines can discover and purchase services.

A potential interaction could be:

```text
Agent A
  ↓
Service discovery
  ↓
Price / terms
  ↓
Intent
  ↓
Policy check
  ↓
Payment
  ↓
Service execution
  ↓
Proof / receipt
```

Potential service categories include compute, inference, storage, data, APIs, software tasks, and physical machine services.

The protocol would need standardized service descriptions and settlement semantics before such markets could be considered production infrastructure.

---

# 37. Autonomous Agent-to-Agent Commerce

Agent-to-agent commerce introduces additional requirements.

A buyer agent must know:

- who the seller agent is;
- what service is offered;
- how much it costs;
- what policy applies;
- how the service is verified;
- when payment is released.

An escrow or milestone architecture may be useful for higher-risk work.

The current website contains conceptual examples such as agent-to-agent delegation and milestone escrow, but these are target architecture rather than deployed production mechanisms.

---

# 38. Cross-Chain Strategy

The current product intentionally uses Arbitrum Sepolia.

A future Apraxus network may need interoperability with other chains.

Potential mechanisms include:

- canonical bridges;
- messaging protocols;
- wrapped assets;
- cross-chain intent settlement;
- external liquidity;
- oracle or proof systems.

Cross-chain systems introduce additional trust assumptions.

A production Apraxus design should prefer cryptographically verifiable messages and explicitly document any external trust assumptions.

---

# 39. Security Model

Security must be considered at multiple layers.

## 39.1 Key Compromise

If an operator or agent key is compromised, an attacker may attempt to exercise its authority.

Mitigations include:

- delegated keys;
- spending ceilings;
- destination allowlists;
- expiry;
- revocation;
- escalation.

## 39.2 Agent Compromise

An AI model or autonomous process can behave incorrectly without its cryptographic keys being stolen.

Policy should therefore constrain the consequences of incorrect behavior.

## 39.3 Prompt Injection

Prompt injection is an application-level threat in which external content manipulates an agent's reasoning.

The protocol cannot determine whether a model's reasoning is malicious or correct.

It can, however, limit what the resulting agent identity is authorized to execute.

## 39.4 Replay

Signed requests must not be reusable beyond their intended scope.

Nonce and expiry mechanisms are therefore important.

## 39.5 Unauthorized Destinations

Destination allowlists can reduce the impact of compromised agents.

## 39.6 Spend Exhaustion

A malicious process may attempt many individually valid transactions.

Rolling limits and cumulative windows address this class of risk.

## 39.7 Smart Contract Risk

Using external smart contracts introduces risks including:

- bugs;
- unexpected behavior;
- upgrades;
- dependency failures;
- liquidity issues;
- malicious contracts.

The testnet environment must not be treated as a security-audited production financial system.

---

# 40. Operational Security

Production infrastructure would require:

- secure secret storage;
- API key hashing;
- key rotation;
- rate limits;
- request authentication;
- audit logs;
- monitoring;
- incident response;
- dependency management;
- deployment controls;
- rollback procedures.

The current developer platform is a foundation rather than a complete production security stack.

---

# 41. Privacy

Autonomous economic systems can expose sensitive operational information.

Potentially sensitive data includes:

- agent identities;
- payment relationships;
- service usage;
- transaction frequency;
- policy structure;
- application metadata.

A production protocol should consider:

- data minimization;
- selective disclosure;
- encryption;
- off-chain metadata;
- privacy-preserving proofs.

No final privacy architecture is claimed in Version 1.0.

---

# 42. Economic Security

A future native network must consider:

- validator incentives;
- fee markets;
- spam resistance;
- denial-of-service economics;
- token liquidity;
- MEV;
- agent collusion;
- malicious service providers;
- sybil resistance.

The economic model cannot be finalized independently from the consensus and execution architecture.

---

# 43. Governance

A future protocol requires a method for changing:

- consensus parameters;
- network parameters;
- execution rules;
- policy standards;
- token parameters;
- emergency mechanisms.

Governance may eventually involve on-chain mechanisms, operator processes, or a hybrid approach.

No final governance mechanism is claimed by this Version 1.0 document.

---

# 44. Human Oversight

Autonomous does not have to mean uncontrolled.

A central design principle is bounded autonomy:

```text
Human authority
      ↓
Policy
      ↓
Delegated agent
      ↓
Restricted execution
```

This model allows an operator to define boundaries before allowing software to act.

For high-value or unusual actions, escalation can return control to a human.

---

# 45. Failure Modes

A production system must explicitly model failure.

Possible states include:

- invalid intent;
- invalid signature;
- expired policy;
- insufficient balance;
- unauthorized asset;
- unauthorized destination;
- spend limit exceeded;
- nonce conflict;
- wallet rejection;
- execution failure;
- consensus rejection;
- timeout;
- service failure.

A receipt should distinguish these outcomes rather than collapsing every failure into a generic error.

---

# 46. Developer Experience Principles

The developer platform is intended to make protocol integration progressively easier.

The desired path is:

```text
Read documentation
      ↓
Create API key
      ↓
Run sandbox
      ↓
Test payment / quote / execution
      ↓
Connect wallet
      ↓
Use testnet
      ↓
Build integration
```

The current dashboard follows this onboarding structure.

---

# 47. Versioning

This whitepaper is intended to remain a canonical reference for the Version 1.0 protocol model.

Future changes should distinguish between:

- correction of an existing statement;
- clarification;
- implementation update;
- additive protocol specification;
- breaking protocol change.

A future protocol specification should maintain explicit versions so that historical implementations remain understandable.

No document can guarantee that a protocol will never evolve. The goal is instead to keep the core model stable and make changes explicit and versioned.

---

# 48. Roadmap

The development roadmap is organized into nine phases.

## Phase 1 — Foundation

**Status: Shipped**

Core project foundation, initial architecture, website, and protocol research groundwork.

## Phase 2 — Native Chain Exploration

**Status: Planned / Frozen**

Future Apraxus-owned blockchain architecture.

This phase is intentionally frozen while testnet product and developer infrastructure are prioritized.

## Phase 3 — Agent Economy Architecture

**Status: Planned / Frozen**

Future deeper protocol-level agent economy architecture.

## Phase 4 — APXS Testnet & Liquidity

**Status: Shipped**

APXS deployment, testnet token interaction, APXS/WETH liquidity infrastructure, and verified testnet swap workflows.

## Phase 5 — Developer Platform

**Status: Shipped**

API v1, SDK foundation, API authentication, API keys, sandbox, metrics, dashboard, and documentation.

## Phase 6 — Public Testnet Readiness

**Status: Under Development**

Improved public onboarding, documentation, credibility, testing, and developer experience.

## Phase 7 — Funding & Ecosystem

**Status: Planned**

Funding, partnerships, ecosystem development, and broader integrations.

## Phase 8 — Security & Production Readiness

**Status: Planned**

Formal security review, production infrastructure, persistent systems, monitoring, incident response, and network readiness.

## Phase 9 — Mainnet & Scale

**Status: Planned**

Future production network and ecosystem scale.

No speculative launch date is defined by this document.

---

# 49. Current Limitations

Apraxus Version 1.0 has important limitations.

1. The public environment is a testnet environment.
2. APXS is currently deployed on Arbitrum Sepolia.
3. The native Apraxus blockchain is not the current production settlement network.
4. Autonomous production custody is not enabled.
5. The developer API is a testnet/development foundation.
6. API metrics are currently in-memory development telemetry.
7. API key management is not a complete production key-management service.
8. The policy simulator is a demonstration.
9. Some Rust network components remain prototypes or under development.
10. Native consensus is planned rather than deployed.
11. Final tokenomics beyond current testnet parameters are not established in this document.
12. Security audits for a future mainnet are not implied.

---

# 50. Risk Disclosure

Users and developers should treat the current environment as experimental testnet infrastructure.

Do not assume:

- testnet token value;
- testnet liquidity;
- prototype policy behavior;
- simulator output;
- API execution intents;
- future network architecture;
- target token utility;

represent production financial guarantees.

Any future mainnet deployment would require independent engineering validation, security review, economic analysis, operational testing, and explicit release documentation.

---

# 51. Research Directions

Future research may include:

### 51.1 Agent Identity Standards

Portable identities that allow agents to maintain verifiable authority across applications.

### 51.2 Delegated Cryptography

Hierarchical keys that preserve operator control while limiting agent authority.

### 51.3 Verifiable Agent Actions

Cryptographic evidence linking an action to a particular intent and policy.

### 51.4 Service Markets

Machine-readable discovery and settlement for autonomous services.

### 51.5 Proof-Carrying Execution

Receipts that prove not only that an action occurred but which policy and execution rules were applied.

### 51.6 Autonomous Escrow

Payment release based on milestones or verifiable service outcomes.

### 51.7 Cross-Chain Agent Settlement

Agents operating across multiple settlement environments while maintaining policy continuity.

### 51.8 Privacy-Preserving Policies

Allowing verification of authorization without unnecessarily exposing sensitive policy information.

---

# 52. Reference Architecture

The conceptual architecture can be summarized as:

```text
┌───────────────────────────────────────────────┐
│ Applications / Autonomous Software            │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ Intent / API / SDK Layer                       │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ Agent Identity & Policy                        │
│                                                │
│ Identity • Spend Limits • Allowlists • Expiry │
│ Escalation • Revocation                        │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ Wallet / Authorization                         │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ Execution                                      │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ Settlement                                     │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│ Receipt / Verification                         │
└───────────────────────────────────────────────┘
```

Today, parts of this architecture exist as application, API, wallet, testnet, and prototype components.

The fully integrated version is a future protocol objective.

---

# 53. Current vs Future Architecture

## Current

```text
Developer / Application
        ↓
Apraxus API / SDK
        ↓
Wallet / Testnet Application
        ↓
Arbitrum Sepolia
        ↓
APXS / EVM Settlement
```

## Future

```text
AI / Agent
    ↓
Intent
    ↓
Agent Identity
    ↓
Policy
    ↓
Agent Wallet
    ↓
Execution
    ↓
Apraxus Network
    ↓
Consensus / State / Settlement
    ↓
Receipt
```

The second diagram is a protocol direction, not the current deployment.

---

# 54. Appendix A — Current APXS Parameters

| Parameter | Current Testnet Value |
|---|---|
| Name | Apraxus |
| Symbol | APXS |
| Network | Arbitrum Sepolia |
| Chain ID | 421614 |
| Decimals | 8 |
| Maximum supply | 1,000,000,000 |
| APXS contract | `0xFE16213961cb4f9B15301f730a5977b9A145add5` |
| WETH | `0x980B62Da83eFf3D4576C647993b0c1D7faf17c73` |

---

# 55. Appendix B — Testnet Swap Infrastructure

| Component | Address |
|---|---|
| APXS | `0xFE16213961cb4f9B15301f730a5977b9A145add5` |
| WETH | `0x980B62Da83eFf3D4576C647993b0c1D7faf17c73` |
| Quoter | `0x7de51022d70a725b508085468052e25e22b5c4c9` |
| Universal Router | `0xefd1d4bd4cf1e86da286bb4cb1b8bced9c10ba47` |
| PoolManager | `0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317` |
| StateView | `0x9d467fa9062b6e9b1a46e26007ad82db116c67cb` |
| PositionManager | `0xAc631556d3d4019C95769033B5E719dD77124BAc` |

---

# 56. Appendix C — Policy Envelope Reference

The prototype Rust-oriented model contains:

```rust
pub struct PolicyEnvelope {
    pub envelope_id: [u8; 32],
    pub master_operator_pubkey: PublicKey,
    pub agent_identity: String,
    pub spend_limit: SpendLimit,
    pub allowlist_destinations: Vec<[u8; 32]>,
    pub allowlist_assets: Vec<AssetId>,
    pub multi_sig_escalation_threshold: u64,
    pub time_lock_expires_at: u64,
    pub auto_revoke_on_anomaly: bool,
}

pub struct SpendLimit {
    pub max_per_transaction: u64,
    pub max_per_window: u64,
    pub window_duration_seconds: u32,
    pub current_window_spent: u64,
}
```

This is a prototype specification and not a claim that every field is already enforced by a public native Apraxus network.

---

# 57. Appendix D — Developer SDK Reference

Current SDK foundation:

```ts
import { createApraxusClient } from '@apraxus/sdk';

const client = createApraxusClient('apx_your_api_key');

const health = await client.health();

const payment = await client.createPayment({
  token: 'APXS',
  amount: '10',
  recipient: '0x...',
  agentId: 'agent_demo_01',
});

const quote = await client.getQuote({
  tokenIn: 'WETH',
  tokenOut: 'APXS',
  amountIn: '0.0001',
});

const execution = await client.createExecution({
  agentId: 'agent_demo_01',
  wallet: '0x...',
  token: 'APXS',
  amount: '10',
  recipient: '0x...',
});
```

This SDK is a development/testnet foundation.

---

# 58. Appendix E — Terminology

**Agent**  
Software capable of initiating or coordinating actions.

**Intent**  
A structured description of an action an application or agent wants to perform.

**Policy**  
Rules defining which actions are authorized.

**Policy Envelope**  
A bounded authorization structure containing identity and execution constraints.

**Delegated Key**  
A cryptographic key granted limited authority on behalf of a higher-level operator.

**Execution**  
The process of carrying an approved action into effect.

**Settlement**  
The system in which the resulting economic state becomes final.

**Receipt**  
Machine-readable evidence describing an execution outcome.

**Testnet**  
A development network used for experimentation and validation.

**Native Network**  
The future Apraxus-owned blockchain architecture described as a research direction.

---

# 59. Conclusion

Apraxus is being developed around a simple architectural idea:

**Autonomous software needs bounded authority, programmable value transfer, and verifiable execution outcomes.**

The current project establishes this direction through an Arbitrum Sepolia testnet environment, APXS infrastructure, wallet connectivity, payment and quote interfaces, SDK foundations, developer tooling, liquidity infrastructure, and Rust-oriented protocol prototypes.

The longer-term objective is to evolve these components into a coherent infrastructure layer for autonomous economic activity.

That evolution requires careful separation between what exists today and what is being researched for tomorrow.

Version 1.0 therefore defines the protocol direction without presenting future architecture as completed infrastructure.

The intended progression is:

```text
Testnet Infrastructure
        ↓
Developer Platform
        ↓
Agent / Policy Research
        ↓
Native Network Engineering
        ↓
Security & Production Readiness
        ↓
Mainnet Infrastructure
        ↓
Autonomous Economy
```

Apraxus is designed to build toward that progression with explicit engineering evidence, versioned specifications, bounded claims, and a clear distinction between implementation and research.

---

## Canonical Status

**Document:** Apraxus Canonical Protocol Whitepaper  
**Version:** 1.0  
**Network:** Arbitrum Sepolia testnet  
**Status:** Development / Testnet  
**Native Apraxus Mainnet:** Not deployed  
**Production autonomous execution:** Not enabled  
**Final mainnet tokenomics:** Not specified in Version 1.0
