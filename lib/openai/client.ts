import OpenAI from "openai";

export function getOpenAIClient() {
  return new OpenAI();
}
