import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { FunctionDeclarationSchema } from "@google/generative-ai";
import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "@/lib/ai/types";

export class GoogleProvider implements AIProvider {
  readonly name = "google" as const;

  async generate(request: AIRequest): Promise<AIResponse> {
    const modelName = request.model ?? "gemini-2.5-flash";
    const google = new GoogleGenerativeAI(
      process.env.GOOGLE_AI_API_KEY ?? "",
    );

    const model = google.getGenerativeModel({
      model: modelName,
      ...(request.tools?.length
        ? {
            tools: [
              {
                functionDeclarations: request.tools.map((tool) => ({
                  name: tool.name,
                  description: tool.description,
                  parameters: {
                    type: SchemaType.OBJECT,
                    properties: tool.inputSchema.properties as FunctionDeclarationSchema["properties"],
                    required: tool.inputSchema.required,
                  },
                })),
              },
            ],
          }
        : {}),
    });

    const contents = request.messages?.length
      ? {
          contents: request.messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [
              ...(message.content
                ? [{ text: message.content }]
                : []),
              ...(message.toolCalls?.map((toolCall) => ({
                functionCall: {
                  name: toolCall.name,
                  args: toolCall.input,
                },
              })) ?? []),
              ...(message.toolResults?.map((toolResult) => ({
                functionResponse: {
                  name: toolResult.name,
                  response:
                    typeof toolResult.result === "object" &&
                    toolResult.result !== null
                      ? toolResult.result
                      : { result: toolResult.result },
                },
              })) ?? []),
            ],
          })),
        }
      : request.toolResults?.length
        ? {
            contents: [
              {
                role: "user" as const,
                parts: request.toolResults.map((toolResult) => ({
                  functionResponse: {
                    name: toolResult.name,
                    response:
                      typeof toolResult.result === "object" &&
                      toolResult.result !== null
                        ? toolResult.result
                        : { result: toolResult.result },
                  },
                })),
              },
            ],
          }
        : request.prompt;

    const result = await model.generateContent(contents);
    const text = result.response.text();

    const toolCalls = result.response
      .functionCalls?.()
      ?.map((call) => ({
        id: call.name,
        name: call.name,
        input: call.args as Record<string, unknown>,
      })) ?? [];

    return {
      provider: this.name,
      model: modelName,
      text,
      ...(toolCalls.length ? { toolCalls } : {}),
    };
  }
}
