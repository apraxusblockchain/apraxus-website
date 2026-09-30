import type { AIProviderName } from "@/lib/ai/types";
import { AnthropicProvider } from "@/lib/ai/providers/anthropic";
import { GoogleProvider } from "@/lib/ai/providers/google";
import { OpenAIProvider } from "@/lib/ai/providers/openai";

export function getAIProvider(name: AIProviderName) {
  switch (name) {
    case "openai":
      return new OpenAIProvider();
    case "anthropic":
      return new AnthropicProvider();
    case "google":
      return new GoogleProvider();
  }
}
