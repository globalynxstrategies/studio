'use server';
/**
 * @fileOverview AI Swing Suggester flow.
 *
 * - aiSwingSuggester - A function that suggests promising stock swing setups using the Swing Spectrum.
 * - AiSwingSuggesterInput - The input type for the aiSwingSuggester function.
 * - AiSwingSuggesterOutput - The return type for the aiSwingSuggester function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSwingSuggesterInputSchema = z.object({
  swingSpectrumData: z
    .string()
    .describe('The data from the Swing Spectrum analysis tool.'),
  marketConditions: z.string().describe('Current market conditions and trends.'),
  riskTolerance: z.string().describe('The swing trader’s risk tolerance level (e.g., low, medium, high).'),
});
export type AiSwingSuggesterInput = z.infer<typeof AiSwingSuggesterInputSchema>;

const AiSwingSuggesterOutputSchema = z.object({
  stockSymbol: z.string().describe('The stock symbol of the suggested swing trade.'),
  entryPrice: z.number().describe('The suggested entry price for the swing trade.'),
  stopLossPrice: z.number().describe('The suggested stop-loss price for risk management.'),
  targetPrice: z.number().describe('The suggested target price for profit-taking.'),
  rationale: z.string().describe('The AI’s rationale for suggesting this swing trade setup.'),
});
export type AiSwingSuggesterOutput = z.infer<typeof AiSwingSuggesterOutputSchema>;

export async function aiSwingSuggester(input: AiSwingSuggesterInput): Promise<AiSwingSuggesterOutput> {
  return aiSwingSuggesterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSwingSuggesterPrompt',
  input: {schema: AiSwingSuggesterInputSchema},
  output: {schema: AiSwingSuggesterOutputSchema},
  prompt: `You are an AI-powered swing trade advisor. Analyze the provided Swing Spectrum data,
considering current market conditions and the trader's risk tolerance, to suggest promising
stock swing setups with refined results for maximum trading safety.

Swing Spectrum Data: {{{swingSpectrumData}}}
Market Conditions: {{{marketConditions}}}
Risk Tolerance: {{{riskTolerance}}}

Based on your analysis, provide the following:
- Stock Symbol: The stock symbol of the suggested swing trade.
- Entry Price: The suggested entry price for the swing trade.
- Stop-Loss Price: The suggested stop-loss price for risk management.
- Target Price: The suggested target price for profit-taking.
- Rationale: Your AI rationale for suggesting this swing trade setup.
`,
});

const aiSwingSuggesterFlow = ai.defineFlow(
  {
    name: 'aiSwingSuggesterFlow',
    inputSchema: AiSwingSuggesterInputSchema,
    outputSchema: AiSwingSuggesterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
