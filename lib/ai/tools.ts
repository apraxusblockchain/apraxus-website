import {
  executeAgentTool,
  type AgentRuntimeContext,
} from "@/lib/agents/runtime";
import { isAgentToolName } from "@/lib/agents/tools";
import type {
  AIToolCall,
  AIToolResult,
} from "@/lib/ai/types";

export async function executeAIToolCalls(
  agent: AgentRuntimeContext,
  toolCalls: AIToolCall[],
): Promise<AIToolResult[]> {
  const results: AIToolResult[] = [];

  for (const toolCall of toolCalls) {
    if (!isAgentToolName(toolCall.name)) {
      results.push({
        toolCallId: toolCall.id,
        name: toolCall.name,
        result: {
          success: false,
          error: "Unknown agent tool",
        },
      });
      continue;
    }

    const result = await executeAgentTool(
      agent,
      toolCall.name,
      toolCall.input,
    );

    results.push({
      toolCallId: toolCall.id,
      name: toolCall.name,
      result,
    });
  }

  return results;
}
