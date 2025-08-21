"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function PositionSizer() {
  const [accountSize, setAccountSize] = useState("100000");
  const [riskPercentage, setRiskPercentage] = useState("2");
  const [stopLoss, setStopLoss] = useState("10");
  const [positionSize, setPositionSize] = useState<number | null>(null);

  const calculateSize = () => {
    const riskAmount = (parseFloat(accountSize) * parseFloat(riskPercentage)) / 100;
    const size = riskAmount / parseFloat(stopLoss);
    if (!isNaN(size) && isFinite(size)) {
      setPositionSize(Math.floor(size));
    } else {
      setPositionSize(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Position Size Calculator</CardTitle>
        <CardDescription>Calculate the optimal position size based on your risk parameters.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account-size">Account Size ($)</Label>
          <Input id="account-size" value={accountSize} onChange={(e) => setAccountSize(e.target.value)} type="number" placeholder="e.g., 100000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="risk-percentage">Risk per Trade (%)</Label>
          <Input id="risk-percentage" value={riskPercentage} onChange={(e) => setRiskPercentage(e.target.value)} type="number" placeholder="e.g., 2" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stop-loss">Stop-Loss ($ per share)</Label>
          <Input id="stop-loss" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} type="number" placeholder="e.g., 10" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={calculateSize}>Calculate</Button>
        {positionSize !== null && (
          <div className="text-lg font-bold">
            Optimal Position Size: <span className="text-primary">{positionSize} shares</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
