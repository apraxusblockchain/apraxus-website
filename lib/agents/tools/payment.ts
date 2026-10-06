import { getAgentRuntimeState } from "@/lib/agents/runtime";
import { createExecutionIntent } from "@/lib/execution/service";
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
    const token = request.input.token;
    const amount = request.input.amount;
    const recipient = request.input.recipient;
    const chainId = request.input.chainId;
    const idempotencyKey = request.input.idempotencyKey;

    if (typeof token !== "string" || !token.trim()) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "Token is required",
      };
    }

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

    if (typeof chainId !== "number" || !Number.isInteger(chainId)) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "A valid chainId is required",
      };
    }

    if (
      typeof idempotencyKey !== "string" ||
      !idempotencyKey.trim() ||
      idempotencyKey.length > 255
    ) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "A valid idempotencyKey is required",
      };
    }

    const runtime = getAgentRuntimeState(request.agent);

    if (!runtime.wallet) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "Agent wallet is not configured",
      };
    }

    try {
      const intent = await createExecutionIntent({
        agentId: request.agent.agent.agentId,
        developerId: request.agent.agent.developerId,
        wallet: runtime.wallet.walletAddress,
        token: token.trim(),
        amount: amount.trim(),
        recipient: recipient.trim(),
        chainId,
        idempotencyKey: idempotencyKey.trim(),
      });

      return {
        success: true,
        tool: "create_payment_intent",
        data: intent,
      };
    } catch (error) {
      return {
        success: false,
        tool: "create_payment_intent",
        error:
          error instanceof Error
            ? error.message
            : "Unable to create payment intent",
      };
    }
  },
};
