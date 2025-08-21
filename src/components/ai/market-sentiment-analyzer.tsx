"use client";

import { useActionState, useFormStatus } from "react-dom";
import { getMarketSentiment, type MarketSentimentState } from "@/app/ai-advisor/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bot, Zap } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Analyzing..." : "Analyze Sentiment"}
      <Zap className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function MarketSentimentAnalyzer() {
  const initialState: MarketSentimentState = { data: null, error: null };
  const [state, formAction] = useActionState(getMarketSentiment, initialState);

  const getSentimentVariant = (sentiment: 'Positive' | 'Negative' | 'Neutral' | undefined) => {
    switch (sentiment) {
      case 'Positive':
        return 'default';
      case 'Negative':
        return 'destructive';
      case 'Neutral':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <div className="flex items-center gap-2">
             <Bot className="h-6 w-6 text-primary" />
             <CardTitle className="font-headline">AI Market Sentiment Analyzer</CardTitle>
          </div>
          <CardDescription>Gauge market sentiment by analyzing news and social media data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="market-news">Market News</Label>
              <Textarea 
                id="market-news"
                name="marketNews"
                placeholder="Paste recent news headlines and summaries here..."
                rows={6}
                defaultValue="Tech stocks rally on positive earnings reports. Federal Reserve hints at interest rate stability."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social-media">Social Media Mentions</Label>
              <Textarea 
                id="social-media"
                name="socialMediaMentions"
                placeholder="Paste relevant social media posts or mentions here..."
                rows={6}
                defaultValue="#BullMarket is trending. Retail investors are optimistic about the new tech IPO."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <SubmitButton />
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          {state.data && (
            <div className="space-y-4 rounded-lg border bg-secondary p-4 w-full mt-4">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-primary-foreground/90">Overall Sentiment:</h3>
                <Badge variant={getSentimentVariant(state.data.sentiment)}>{state.data.sentiment}</Badge>
                <span className="text-sm text-muted-foreground">(Confidence: {(state.data.confidenceScore * 100).toFixed(0)}%)</span>
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground/90">Summary</h3>
                <p className="text-sm text-muted-foreground">{state.data.summary}</p>
              </div>
               <div>
                <h3 className="font-semibold text-primary-foreground/90">Key Themes</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                    {state.data.keyThemes.map((theme, index) => (
                        <Badge key={index} variant="outline">{theme}</Badge>
                    ))}
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}