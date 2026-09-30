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

    const response = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: request.prompt,
        },
      ],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    return {
      provider: this.name,
      model,
      text,
    };
  }
}
