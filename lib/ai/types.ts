export type AIProviderName = "openai" | "anthropic" | "google";

export type AIRequest = {
  prompt: string;
  model?: string;
};

export type AIResponse = {
  provider: AIProviderName;
  model: string;
  text: string;
};

export interface AIProvider {
  readonly name: AIProviderName;
  generate(request: AIRequest): Promise<AIResponse>;
}
