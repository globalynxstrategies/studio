'use server';
/**
 * @fileOverview AI News Summarizer flow.
 *
 * - aiNewsSummarizer - A function that summarizes a news article.
 * - AINewsSummarizerInput - The input type for the function.
 * - AINewsSummarizerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AINewsSummarizerInputSchema = z.object({
  newsArticle: z.string().describe('The full text or URL of a financial news article.'),
});
export type AINewsSummarizerInput = z.infer<typeof AINewsSummarizerInputSchema>;

const AINewsSummarizerOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the news article.'),
  keyPoints: z.array(z.string()).describe('A list of the most important key points from the article.'),
  sentiment: z.enum(['Positive', 'Negative', 'Neutral']).describe('The sentiment of the article regarding the main subject.'),
});
export type AINewsSummarizerOutput = z.infer<typeof AINewsSummarizerOutputSchema>;

export async function aiNewsSummarizer(input: AINewsSummarizerInput): Promise<AINewsSummarizerOutput> {
  return aiNewsSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiNewsSummarizerPrompt',
  input: {schema: AINewsSummarizerInputSchema},
  output: {schema: AINewsSummarizerOutputSchema},
  prompt: `You are a financial news analyst. Please summarize the following news article.
Identify the key points and determine the overall sentiment of the article.

Article:
{{{newsArticle}}}
`,
});

const aiNewsSummarizerFlow = ai.defineFlow(
  {
    name: 'aiNewsSummarizerFlow',
    inputSchema: AINewsSummarizerInputSchema,
    outputSchema: AINewsSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
