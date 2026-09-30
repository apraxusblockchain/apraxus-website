import { getAIProvider } from "@/lib/ai/providers";
import type { AIProviderName, AIRequest } from "@/lib/ai/types";

export async function generateAI(
  providerName: AIProviderName,
  request: AIRequest,
) {
  const provider = getAIProvider(providerName);
  return provider.generate(request);
}
