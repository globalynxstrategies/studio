"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState("100");
  const [stopLossPrice, setStopLossPrice] = useState("95");
  const [targetPrice, setTargetPrice] = useState("115");
  const [ratio, setRatio] = useState<number | null>(null);

  const calculateRatio = () => {
    const risk = parseFloat(entryPrice) - parseFloat(stopLossPrice);
    const reward = parseFloat(targetPrice) - parseFloat(entryPrice);
    if (risk > 0) {
      const calculatedRatio = reward / risk;
      if (!isNaN(calculatedRatio) && isFinite(calculatedRatio)) {
        setRatio(parseFloat(calculatedRatio.toFixed(2)));
      } else {
        setRatio(null);
      }
    } else {
      setRatio(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk/Reward Calculator</CardTitle>
        <CardDescription>Assess the risk-to-reward ratio of a potential trade.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="entry-price">Entry Price ($)</Label>
          <Input id="entry-price" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} type="number" placeholder="e.g., 100" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stop-loss-price">Stop-Loss Price ($)</Label>
          <Input id="stop-loss-price" value={stopLossPrice} onChange={(e) => setStopLossPrice(e.target.value)} type="number" placeholder="e.g., 95" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="target-price">Target Price ($)</Label>
          <Input id="target-price" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} type="number" placeholder="e.g., 115" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={calculateRatio}>Calculate</Button>
        {ratio !== null && (
          <div className="text-lg font-bold">
            Risk/Reward Ratio: <span className={ratio >= 2 ? "text-accent" : ratio < 1 ? "text-destructive" : "text-primary"}>1 : {ratio}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
