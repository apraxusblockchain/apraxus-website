import type { AgentToolSchema } from "@/lib/agents/tools/schema";

export type AIProviderName = "openai" | "anthropic" | "google" | "grok";

export type AIConversationMessage = {
  role: "user" | "assistant";
  content: string;
  toolCalls?: AIToolCall[];
  toolResults?: AIToolResult[];
};

export type AIRequest = {
  prompt: string;
  messages?: AIConversationMessage[];
  model?: string;
  tools?: AgentToolSchema[];
  toolResults?: AIToolResult[];
  previousResponseId?: string;
};

export type AIToolCall = {
  id: string;
  name: string;
  input: Record<string, unknown>;
};

export type AIToolResult = {
  toolCallId: string;
  name: string;
  result: unknown;
};

export type AIResponse = {
  provider: AIProviderName;
  model: string;
  text: string;
  responseId?: string;
  toolCalls?: AIToolCall[];
};

export interface AIProvider {
  readonly name: AIProviderName;
  generate(request: AIRequest): Promise<AIResponse>;
}
