import type { AgentRuntimeContext } from "@/lib/agents/runtime";
import { executeAIToolCalls } from "@/lib/ai/tools";
import { generateAI } from "@/lib/ai";
import type {
  AIProviderName,
  AIResponse,
} from "@/lib/ai/types";
import { agentToolSchemas } from "@/lib/agents/tools";

export type AgentAIRequest = {
  agent: AgentRuntimeContext;
  provider: AIProviderName;
  prompt: string;
  model?: string;
  maxToolRounds?: number;
};

export type AgentAIResponse = {
  ai: AIResponse;
  toolResults: Awaited<ReturnType<typeof executeAIToolCalls>>;
};

export async function runAgentAI(
  request: AgentAIRequest,
): Promise<AgentAIResponse> {
  const maxToolRounds = request.maxToolRounds ?? 5;

  let currentAI = await generateAI(request.provider, {
    prompt: request.prompt,
    model: request.model,
    tools: agentToolSchemas,
  });

  let toolResults: Awaited<ReturnType<typeof executeAIToolCalls>> = [];
  let rounds = 0;

  while (currentAI.toolCalls?.length && rounds < maxToolRounds) {
    rounds += 1;
    toolResults = await executeAIToolCalls(
      request.agent,
      currentAI.toolCalls,
    );

    if (!currentAI.responseId) {
      break;
    }

    currentAI = await generateAI(request.provider, {
      prompt: request.prompt,
      model: request.model,
      tools: agentToolSchemas,
      toolResults,
      previousResponseId: currentAI.responseId,
    });
  }

  return {
    ai: currentAI,
    toolResults,
  };
}
