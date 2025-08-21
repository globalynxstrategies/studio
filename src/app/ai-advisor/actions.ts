"use server"

import { aiOptionAdvisor, type AIOptionAdvisorInput, type AIOptionAdvisorOutput } from "@/ai/flows/ai-option-advisor";
import { aiSwingSuggester, type AiSwingSuggesterInput, type AiSwingSuggesterOutput } from "@/ai/flows/ai-swing-suggester";

export interface OptionAdvisorState {
  data: AIOptionAdvisorOutput | null;
  error: string | null;
}

export async function getOptionAdvice(
  prevState: OptionAdvisorState,
  formData: FormData
): Promise<OptionAdvisorState> {
  const input: AIOptionAdvisorInput = {
    tradingWindow: formData.get("tradingWindow") as string,
    marketConditions: formData.get("marketConditions") as string,
  };

  if (!input.tradingWindow || !input.marketConditions) {
    return { data: null, error: "Please provide all required inputs." };
  }

  try {
    const result = await aiOptionAdvisor(input);
    return { data: result, error: null };
  } catch (e: any) {
    return { data: null, error: e.message || "An unexpected error occurred." };
  }
}


export interface SwingSuggesterState {
    data: AiSwingSuggesterOutput | null;
    error: string | null;
}
  
export async function getSwingSuggestion(
    prevState: SwingSuggesterState,
    formData: FormData
): Promise<SwingSuggesterState> {
    const input: AiSwingSuggesterInput = {
        swingSpectrumData: formData.get("swingSpectrumData") as string,
        marketConditions: formData.get("marketConditions") as string,
        riskTolerance: formData.get("riskTolerance") as string,
    };

    if (!input.swingSpectrumData || !input.marketConditions || !input.riskTolerance) {
        return { data: null, error: "Please provide all required inputs." };
    }

    try {
        const result = await aiSwingSuggester(input);
        return { data: result, error: null };
    } catch (e: any) {
        return { data: null, error: e.message || "An unexpected error occurred." };
    }
}
