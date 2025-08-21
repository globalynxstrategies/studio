"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getSwingSuggestion, type SwingSuggesterState } from "@/app/ai-advisor/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Zap } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Analyzing..." : "Get Suggestion"}
      <Zap className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function SwingSuggester() {
  const initialState: SwingSuggesterState = { data: null, error: null };
  const [state, formAction] = useActionState(getSwingSuggestion, initialState);
  const { pending } = useFormStatus();

  return (
    <Card className="h-full">
      <form action={formAction}>
        <CardHeader>
          <div className="flex items-center gap-2">
             <Bot className="h-6 w-6 text-primary" />
             <CardTitle className="font-headline">AI Swing Suggester</CardTitle>
          </div>
          <CardDescription>Find promising stock swing setups using the Swing Spectrum.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="swing-spectrum">Swing Spectrum Data</Label>
            <Textarea 
              id="swing-spectrum"
              name="swingSpectrumData"
              placeholder="Paste Swing Spectrum analysis data here..."
              required
              defaultValue="Relative Volume > 2, Price above 50-day MA, Bullish MACD crossover."
            />
          </div>
          <div className="space-y-2">
            <Label>Market Conditions</Label>
            <Select name="marketConditions" required defaultValue="Uptrend">
              <SelectTrigger>
                <SelectValue placeholder="Select market conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uptrend">Uptrend</SelectItem>
                <SelectItem value="Downtrend">Downtrend</SelectItem>
                <SelectItem value="Consolidating">Consolidating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Risk Tolerance</Label>
            <Select name="riskTolerance" required defaultValue="Medium">
              <SelectTrigger>
                <SelectValue placeholder="Select risk tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <SubmitButton />
          {pending && (
            <div className="space-y-4 w-full">
              <Skeleton className="h-8 w-1/2" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          )}
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          {state.data && !pending && (
            <div className="space-y-4 rounded-lg border bg-card p-4 w-full">
              <h3 className="font-semibold text-accent">Swing Trade Suggestion: ${state.data.stockSymbol}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Entry Price:</p>
                  <p className="text-muted-foreground">${state.data.entryPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-medium">Target Price:</p>
                  <p className="text-muted-foreground">${state.data.targetPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-medium">Stop-Loss:</p>
                  <p className="text-muted-foreground">${state.data.stopLossPrice.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Rationale</h3>
                <p className="text-sm text-muted-foreground">{state.data.rationale}</p>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}