import { GoogleGenerativeAI } from "@google/generative-ai";
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
    });

    const result = await model.generateContent(request.prompt);
    const text = result.response.text();

    return {
      provider: this.name,
      model: modelName,
      text,
    };
  }
}
