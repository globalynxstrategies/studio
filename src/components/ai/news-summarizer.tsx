"use client";

import { useActionState, useFormStatus } from "react";
import { getNewsSummary, type NewsSummarizerState } from "@/app/news-summarizer/actions";
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
    <Button type="submit" disabled={pending}>
      {pending ? "Summarizing..." : "Summarize News"}
      <Zap className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function NewsSummarizer() {
  const initialState: NewsSummarizerState = { data: null, error: null };
  const [state, formAction] = useActionState(getNewsSummary, initialState);
  const { pending } = useFormStatus();

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
    <Card className="h-full w-full">
      <form action={formAction}>
        <CardHeader>
          <div className="flex items-center gap-2">
             <Bot className="h-6 w-6 text-primary" />
             <CardTitle className="font-headline">AI News Summarizer</CardTitle>
          </div>
          <CardDescription>Paste the full text of a financial news article or a URL to get a quick summary, key points, and sentiment analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="news-article">News Article or URL</Label>
            <Textarea 
              id="news-article"
              name="newsArticle"
              placeholder="Paste the full article text or a URL here..."
              rows={10}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <SubmitButton />
          {pending && (
            <div className="space-y-4 w-full">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          )}
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          {state.data && !pending && (
            <div className="space-y-4 rounded-lg border bg-secondary p-4 w-full">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-primary-foreground/90">Sentiment:</h3>
                <Badge variant={getSentimentVariant(state.data.sentiment)}>{state.data.sentiment}</Badge>
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground/90">Summary</h3>
                <p className="text-sm text-muted-foreground">{state.data.summary}</p>
              </div>
               <div>
                <h3 className="font-semibold text-primary-foreground/90">Key Points</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
                    {state.data.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
