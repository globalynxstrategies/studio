"use server"

import { aiChatbot, type AIChatbotInput, type AIChatbotOutput } from "@/ai/flows/ai-chatbot";

export async function getChatbotResponse(input: AIChatbotInput): Promise<AIChatbotOutput> {
  try {
    const result = await aiChatbot(input);
    return result;
  } catch (e: any) {
    return { response: e.message || "An unexpected error occurred." };
  }
}
