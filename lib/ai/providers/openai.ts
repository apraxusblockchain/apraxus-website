import { getOpenAIClient } from "@/lib/openai/client";
import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "@/lib/ai/types";

export class OpenAIProvider implements AIProvider {
  readonly name = "openai" as const;

  async generate(request: AIRequest): Promise<AIResponse> {
    const model = request.model ?? "gpt-5.6";
    const openai = getOpenAIClient();

    const toolOutputs = request.toolResults?.map((toolResult) => ({
      type: "function_call_output" as const,
      call_id: toolResult.toolCallId,
      output: JSON.stringify(toolResult.result),
    })) ?? [];

    const input = request.previousResponseId
      ? toolOutputs
      : [
          {
            role: "user" as const,
            content: request.prompt,
          },
          ...toolOutputs,
        ];

    const response = await openai.responses.create({
      model,
      input,
      ...(request.previousResponseId
        ? { previous_response_id: request.previousResponseId }
        : {}),
      ...(request.tools?.length
        ? {
            tools: request.tools.map((tool) => ({
              type: "function" as const,
              name: tool.name,
              description: tool.description,
              parameters: tool.inputSchema,
              strict: true,
            })),
          }
        : {}),
    });

    const toolCalls = response.output
      .filter((item) => item.type === "function_call")
      .map((item) => ({
        id: item.call_id,
        name: item.name,
        input: JSON.parse(item.arguments) as Record<string, unknown>,
      }));

    return {
      provider: this.name,
      model,
      text: response.output_text,
      responseId: response.id,
      ...(toolCalls.length ? { toolCalls } : {}),
    };
  }
}
