"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getOptionAdvice, type OptionAdvisorState } from "@/app/ai-advisor/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bot, Zap } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Analyzing..." : "Get Advice"}
      <Zap className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function OptionAdvisor() {
  const initialState: OptionAdvisorState = { data: null, error: null };
  const [state, formAction] = useActionState(getOptionAdvice, initialState);
  const { pending } = useFormStatus();

  return (
    <Card className="h-full">
      <form action={formAction}>
        <CardHeader>
          <div className="flex items-center gap-2">
             <Bot className="h-6 w-6 text-primary" />
             <CardTitle className="font-headline">AI Option Advisor</CardTitle>
          </div>
          <CardDescription>Get timely trade recommendations using the Option Clock and TradingView data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tradingview-data">TradingView Data</Label>
            <Textarea 
              id="tradingview-data"
              name="tradingViewData"
              placeholder="Paste technical analysis summary from TradingView here..."
              required
              defaultValue="Overall Rating: Strong Buy. Moving Averages: Buy. Oscillators: Neutral."
            />
          </div>
          <div className="space-y-2">
            <Label>Trading Window</Label>
            <Select name="tradingWindow" required defaultValue="Peak">
              <SelectTrigger>
                <SelectValue placeholder="Select trading window" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Early">Early</SelectItem>
                <SelectItem value="Peak">Peak</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Market Conditions</Label>
            <Select name="marketConditions" required defaultValue="Bullish">
              <SelectTrigger>
                <SelectValue placeholder="Select market conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bullish">Bullish</SelectItem>
                <SelectItem value="Bearish">Bearish</SelectItem>
                <SelectItem value="Sideways">Sideways</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <SubmitButton />
          {pending && (
            <div className="space-y-4 w-full">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-16 w-full" />
            </div>
          )}
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          {state.data && !pending && (
            <div className="space-y-4 rounded-lg border bg-secondary p-4 w-full">
              <div>
                <h3 className="font-semibold text-primary-foreground/90">Recommendation</h3>
                <p>{state.data.recommendation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground/90">Rationale</h3>
                <p className="text-sm text-muted-foreground">{state.data.rationale}</p>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
