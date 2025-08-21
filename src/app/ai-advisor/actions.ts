"use server"

import { aiOptionAdvisor, type AIOptionAdvisorInput, type AIOptionAdvisorOutput } from "@/ai/flows/ai-option-advisor";
import { aiSwingSuggester, type AiSwingSuggesterInput, type AiSwingSuggesterOutput } from "@/ai/flows/ai-swing-suggester";
import { aiMarketSentimentAnalyzer, type AIMarketSentimentAnalyzerInput, type AIMarketSentimentAnalyzerOutput } from "@/ai/flows/ai-market-sentiment-analyzer";


export interface OptionAdvisorState {
  data: AIOptionAdvisorOutput | null;
  error: string | null;
}

export async function getOptionAdvice(
  prevState: OptionAdvisorState,
  formData: FormData
): Promise<OptionAdvisorState> {
  const input: AIOptionAdvisorInput = {
    tradingViewData: formData.get("tradingViewData") as string,
    tradingWindow: formData.get("tradingWindow") as string,
    marketConditions: formData.get("marketConditions") as string,
  };

  if (!input.tradingViewData || !input.tradingWindow || !input.marketConditions) {
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


export interface MarketSentimentState {
  data: AIMarketSentimentAnalyzerOutput | null;
  error: string | null;
}

export async function getMarketSentiment(
  prevState: MarketSentimentState,
  formData: FormData
): Promise<MarketSentimentState> {
  const input: AIMarketSentimentAnalyzerInput = {
    marketNews: formData.get("marketNews") as string,
    socialMediaMentions: formData.get("socialMediaMentions") as string,
  };

  if (!input.marketNews && !input.socialMediaMentions) {
    return { data: null, error: "Please provide market news or social media mentions." };
  }

  try {
    const result = await aiMarketSentimentAnalyzer(input);
    return { data: result, error: null };
  } catch (e: any) {
    return { data: null, error: e.message || "An unexpected error occurred." };
  }
}
