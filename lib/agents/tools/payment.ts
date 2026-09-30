import {
  createAgentPaymentIntent,
} from "@/lib/agents/runtime";
import type {
  AgentTool,
  AgentToolRequest,
  AgentToolResult,
} from "@/lib/agents/tools/types";

export const createPaymentIntentTool: AgentTool = {
  name: "create_payment_intent",

  async execute(
    request: AgentToolRequest,
  ): Promise<AgentToolResult> {
    const amount = request.input.amount;
    const recipient = request.input.recipient;

    if (typeof amount !== "string" || !amount.trim()) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "Amount is required",
      };
    }

    if (typeof recipient !== "string" || !recipient.trim()) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "Recipient is required",
      };
    }

    const intent = createAgentPaymentIntent(request.agent, {
      amount: amount.trim(),
      recipient: recipient.trim(),
    });

    if (!intent) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "Agent wallet is not configured",
      };
    }

    return {
      success: true,
      tool: "create_payment_intent",
      data: intent,
    };
  },
};
