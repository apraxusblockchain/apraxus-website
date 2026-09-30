import type { AgentRuntimeContext } from "@/lib/agents/runtime";

export type AgentToolName =
  | "get_agent_context"
  | "create_payment_intent";

export type AgentToolRequest = {
  agent: AgentRuntimeContext;
  input: Record<string, unknown>;
};

export type AgentToolResult = {
  success: boolean;
  tool: AgentToolName;
  data?: unknown;
  error?: string;
};

export interface AgentTool {
  readonly name: AgentToolName;
  execute(request: AgentToolRequest): Promise<AgentToolResult>;
}
