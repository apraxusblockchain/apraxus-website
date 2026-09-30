import type { AgentToolName } from "@/lib/agents/tools/types";

export type AgentToolSchema = {
  name: AgentToolName;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required: string[];
  };
};
