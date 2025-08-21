"use server"

import { aiNewsSummarizer, type AINewsSummarizerInput, type AINewsSummarizerOutput } from "@/ai/flows/ai-news-summarizer";

export interface NewsSummarizerState {
  data: AINewsSummarizerOutput | null;
  error: string | null;
}

export async function getNewsSummary(
  prevState: NewsSummarizerState,
  formData: FormData
): Promise<NewsSummarizerState> {
  const input: AINewsSummarizerInput = {
    newsArticle: formData.get("newsArticle") as string,
  };

  if (!input.newsArticle) {
    return { data: null, error: "Please provide a news article or URL." };
  }

  try {
    const result = await aiNewsSummarizer(input);
    return { data: result, error: null };
  } catch (e: any) {
    return { data: null, error: e.message || "An unexpected error occurred." };
  }
}
