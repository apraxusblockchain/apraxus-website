import {
  createAgentPaymentIntent,
} from "@/lib/agents/runtime";
import { getApraxusAssetBySymbol } from "@/lib/web3/assets/registry";
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

    const targetChainId = chainId;

    if (typeof targetChainId !== "number" || !Number.isInteger(targetChainId)) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "A valid chainId is required",
      };
    }

    const asset = getApraxusAssetBySymbol(token, targetChainId);

    if (!asset) {
      return {
        success: false,
        tool: "create_payment_intent",
        error: "Asset is not supported on the requested chain",
      };
    }

    const intent = createAgentPaymentIntent(request.agent, {
      assetId: asset.id,
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
