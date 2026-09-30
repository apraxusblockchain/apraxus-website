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

    const response = await openai.responses.create({
      model,
      input: request.prompt,
    });

    return {
      provider: this.name,
      model,
      text: response.output_text,
    };
  }
}
