'use server';
/**
 * @fileOverview AI Market Sentiment Analyzer flow.
 *
 * - aiMarketSentimentAnalyzer - Analyzes market sentiment based on news and social media.
 * - AIMarketSentimentAnalyzerInput - The input type for the function.
 * - AIMarketSentimentAnalyzerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMarketSentimentAnalyzerInputSchema = z.object({
  marketNews: z.string().describe('A collection of recent news headlines and summaries related to the market.'),
  socialMediaMentions: z.string().describe('A collection of recent social media posts and mentions about the market.'),
});
export type AIMarketSentimentAnalyzerInput = z.infer<typeof AIMarketSentimentAnalyzerInputSchema>;

const AIMarketSentimentAnalyzerOutputSchema = z.object({
  sentiment: z.enum(['Positive', 'Negative', 'Neutral']).describe('The overall market sentiment.'),
  confidenceScore: z.number().describe('A confidence score (0-1) for the sentiment analysis.'),
  summary: z.string().describe('A brief summary of the key factors influencing the sentiment.'),
  keyThemes: z.array(z.string()).describe('A list of key themes or topics driving the sentiment.'),
});
export type AIMarketSentimentAnalyzerOutput = z.infer<typeof AIMarketSentimentAnalyzerOutputSchema>;

export async function aiMarketSentimentAnalyzer(input: AIMarketSentimentAnalyzerInput): Promise<AIMarketSentimentAnalyzerOutput> {
  return aiMarketSentimentAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMarketSentimentAnalyzerPrompt',
  input: {schema: AIMarketSentimentAnalyzerInputSchema},
  output: {schema: AIMarketSentimentAnalyzerOutputSchema},
  prompt: `You are an expert financial market sentiment analyst.
Analyze the following market news and social media data to determine the overall market sentiment.
Provide a sentiment classification (Positive, Negative, Neutral), a confidence score, a summary of the reasons for the sentiment, and a list of key themes.

Market News:
{{{marketNews}}}

Social Media Mentions:
{{{socialMediaMentions}}}
`,
});

const aiMarketSentimentAnalyzerFlow = ai.defineFlow(
  {
    name: 'aiMarketSentimentAnalyzerFlow',
    inputSchema: AIMarketSentimentAnalyzerInputSchema,
    outputSchema: AIMarketSentimentAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
