import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { executeAgentTool } from "@/lib/agents/tools/execute";
import { resolveAgentRuntime } from "@/lib/agents/runtime";

export function createApraxusMcpServer() {
  const server = new McpServer({
    name: "apraxus",
    version: "0.1.0",
  });

  server.registerTool(
    "get_agent_context",
    {
      title: "Get Agent Context",
      description:
        "Retrieve the active Apraxus agent's identity, wallet binding, and policy context.",
      inputSchema: {
        agentId: z.string().min(1),
      },
    },
    async ({ agentId }, extra) => {
      const authInfo = extra.authInfo;

      if (!authInfo) {
        throw new Error("MCP authentication required");
      }

      const developerId = authInfo.extra?.developerId;

      if (typeof developerId !== "string" || !developerId) {
        throw new Error("Authenticated developer identity missing");
      }

      const runtime = resolveAgentRuntime({
        agentId,
        developerId,
      });

      if (!runtime) {
        throw new Error("Agent not found or inactive");
      }

      const result = await executeAgentTool(
        runtime,
        "get_agent_context",
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
        structuredContent: result,
      };
    },
  );

  server.registerTool(
    "create_payment_intent",
    {
      title: "Create Payment Intent",
      description:
        "Create a payment intent after evaluating the active agent's wallet and payment policy.",
      inputSchema: {
        agentId: z.string().min(1),
        token: z.string().min(1),
        amount: z.string().min(1),
        recipient: z.string().min(1),
        chainId: z.number().int(),
        idempotencyKey: z.string().min(1).max(255),
      },
    },
    async ({ agentId, token, amount, recipient, chainId, idempotencyKey }, extra) => {
      const authInfo = extra.authInfo;

      if (!authInfo) {
        throw new Error("MCP authentication required");
      }

      const developerId = authInfo.extra?.developerId;

      if (typeof developerId !== "string" || !developerId) {
        throw new Error("Authenticated developer identity missing");
      }

      const runtime = resolveAgentRuntime({
        agentId,
        developerId,
      });

      if (!runtime) {
        throw new Error("Agent not found or inactive");
      }

      const result = await executeAgentTool(
        runtime,
        "create_payment_intent",
        {
          token,
          amount,
          recipient,
          chainId,
          idempotencyKey,
        },
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
        structuredContent: result,
      };
    },
  );

  return server;
}
