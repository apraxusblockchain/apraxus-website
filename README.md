k# Apraxus

> Infrastructure for the Autonomous Economy.

Apraxus is a blockchain infrastructure project designed for autonomous agents, programmable payments, and machine-to-machine transactions.

The project combines a Rust-based blockchain core with a web interface for interacting with the network, monitoring network telemetry, and testing token functionality.

## Overview

Apraxus is being developed as infrastructure for an emerging autonomous economy where software agents can transact, coordinate, and operate programmatically.

The current prototype focuses on:

- Blockchain core infrastructure written in Rust
- Cryptographically signed transactions
- Wallet and balance management
- Programmable payment infrastructure
- Machine-to-machine transaction capabilities
- APXS token functionality
- Web-based network telemetry
- Wallet connectivity through MetaMask
- Sepolia testnet token integration
- Network and explorer interfaces

## Current Status

**Phase:** Prototype / Testnet Infrastructure

The Apraxus core prototype is currently under active development.

The public web interface provides experimental access to network telemetry and wallet functionality while the underlying blockchain infrastructure continues to evolve.

## Architecture

```text
                    ┌──────────────────────┐
                    │     Apraxus Web      │
                    │   Network / Wallet   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Apraxus Node      │
                    │      Rust Core       │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
       Transactions         Balances          Blocks
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    Cryptographic Validation
