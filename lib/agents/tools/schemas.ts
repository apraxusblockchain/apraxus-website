import type { AgentToolSchema } from "@/lib/agents/tools/schema";

export const agentToolSchemas: AgentToolSchema[] = [
  {
    name: "get_agent_context",
    description:
      "Retrieve the active agent's identity, wallet binding, and policy context.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "create_payment_intent",
    description:
      "Create a payment intent after evaluating the agent's wallet and payment policy.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description: "Supported asset symbol registered by Apraxus, such as APXS, ETH, or BNB.",
        },
        amount: {
          type: "string",
          description: "Payment amount.",
        },
        recipient: {
          type: "string",
          description: "Destination wallet address.",
        },
        chainId: {
          type: "number",
          description: "Target EVM chain ID for the payment.",
        },
        idempotencyKey: {
          type: "string",
          description: "Unique key used to safely retry the same payment intent without creating a duplicate.",
        },
      },
      required: ["token", "amount", "recipient", "chainId", "idempotencyKey"],
    },
  },
];
