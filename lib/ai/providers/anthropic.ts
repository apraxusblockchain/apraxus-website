import Anthropic from "@anthropic-ai/sdk";
import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "@/lib/ai/types";

export class AnthropicProvider implements AIProvider {
  readonly name = "anthropic" as const;

  async generate(request: AIRequest): Promise<AIResponse> {
    const model = request.model ?? "claude-sonnet-4-5";
    const anthropic = new Anthropic();

    const toolResults = request.toolResults?.map((toolResult) => ({
      type: "tool_result" as const,
      tool_use_id: toolResult.toolCallId,
      content: JSON.stringify(toolResult.result),
    })) ?? [];

    const messages = request.messages?.length
      ? request.messages.map((message) => ({
          role: message.role,
          content: [
            ...(message.content
              ? [{ type: "text" as const, text: message.content }]
              : []),
            ...(message.toolCalls?.map((toolCall) => ({
              type: "tool_use" as const,
              id: toolCall.id,
              name: toolCall.name,
              input: toolCall.input,
            })) ?? []),
            ...(message.toolResults?.map((toolResult) => ({
              type: "tool_result" as const,
              tool_use_id: toolResult.toolCallId,
              content: JSON.stringify(toolResult.result),
            })) ?? []),
          ],
        }))
      : request.toolResults?.length
        ? [
            {
              role: "user" as const,
              content: toolResults,
            },
          ]
        : [
            {
              role: "user" as const,
              content: request.prompt,
            },
          ];

    const response = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      messages,
      ...(request.tools?.length
        ? {
            tools: request.tools.map((tool) => ({
              name: tool.name,
              description: tool.description,
              input_schema: tool.inputSchema,
              strict: true,
            })),
          }
        : {}),
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    const toolCalls = response.content
      .filter((block) => block.type === "tool_use")
      .map((block) => ({
        id: block.id,
        name: block.name,
        input: block.input as Record<string, unknown>,
      }));

    return {
      provider: this.name,
      model,
      text,
      ...(toolCalls.length ? { toolCalls } : {}),
    };
  }
}
